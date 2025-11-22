import dotenv from "dotenv";
dotenv.config();

import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

const server = Fastify({ logger: true });
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "dev-refresh-secret";

// Register CORS
server.register(cors, { origin: true });

// Register Swagger
server.register(swagger, {
  swagger: {
    info: {
      title: "HabitFlow API",
      description: "API documentation for HabitFlow backend",
      version: "0.1.0",
    },
    host: "localhost:3002",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
});

server.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

// Types
type AuthRequest = FastifyRequest & { user?: { id: string } };

// Auth Middleware
server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    request.user = { id: decoded.userId };
  } catch (err) {
    reply.status(401).send({ error: "Unauthorized" });
  }
});

// Register routes as a plugin to ensure they're registered after Swagger
server.register(async (fastify) => {
  // Health endpoints
  fastify.get("/healthz", async () => ({ status: "ok" }));
  fastify.get("/", async () => ({ ok: true, time: Date.now() }));

  // Auth Routes
  fastify.post("/auth/register", {
    schema: {
      description: "Register a new user",
      tags: ["auth"],
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          name: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            token: { type: "string" },
            refreshToken: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
  }, async (request, reply) => {
    const { email, password, name } = request.body as any;

    if (!email || !password) {
      return reply.status(400).send({ error: "Email and password required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return reply.status(409).send({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "15m" });

    const refreshToken = crypto.randomUUID();
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      token,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name }
    };
  });

  fastify.post("/auth/login", {
    schema: {
      description: "Login with email and password",
      tags: ["auth"],
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            token: { type: "string" },
            refreshToken: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
  }, async (request, reply) => {
    const { email, password } = request.body as any;

    if (!email || !password) {
      return reply.status(400).send({ error: "Email and password required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "15m" });

    const refreshToken = crypto.randomUUID();
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      token,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name }
    };
  });

  fastify.post("/auth/refresh", {
    schema: {
      description: "Refresh access token",
      tags: ["auth"],
      body: {
        type: "object",
        required: ["refreshToken"],
        properties: {
          refreshToken: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            token: { type: "string" },
          },
        },
      },
    },
  }, async (request, reply) => {
    const { refreshToken } = request.body as any;

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      return reply.status(401).send({ error: "Invalid refresh token" });
    }

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      return reply.status(401).send({ error: "Refresh token expired" });
    }

    const token = jwt.sign({ userId: storedToken.userId }, JWT_SECRET, { expiresIn: "15m" });
    return { token };
  });

  // Habit Routes
  fastify.get("/habits", {
    preHandler: [fastify.authenticate],
    schema: {
      description: "Get all habits for the authenticated user",
      tags: ["habits"],
      security: [{ apiKey: [] }],
      response: {
        200: {
          type: "object",
          properties: {
            habits: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  userId: { type: "string" },
                  createdAt: { type: "string" },
                  entries: { type: "array" },
                },
              },
            },
          },
        },
      },
    },
  }, async (request: AuthRequest) => {
    const habits = await prisma.habit.findMany({
      where: { userId: request.user!.id },
      include: { entries: true },
    });
    return { habits };
  });

  fastify.post("/habits", {
    preHandler: [fastify.authenticate],
    schema: {
      description: "Create a new habit",
      tags: ["habits"],
      security: [{ apiKey: [] }],
      body: {
        type: "object",
        required: ["title"],
        properties: {
          title: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            userId: { type: "string" },
            createdAt: { type: "string" },
          },
        },
      },
    },
  }, async (request: AuthRequest, reply) => {
    const { title } = request.body as any;
    if (!title) return reply.status(400).send({ error: "Title required" });

    const habit = await prisma.habit.create({
      data: { title, userId: request.user!.id },
    });
    return habit;
  });

  fastify.patch("/habits/:id", {
    preHandler: [fastify.authenticate],
    schema: {
      description: "Update a habit",
      tags: ["habits"],
      security: [{ apiKey: [] }],
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      body: {
        type: "object",
        properties: {
          title: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            ok: { type: "boolean" },
          },
        },
      },
    },
  }, async (request: AuthRequest, reply) => {
    const { id } = request.params as any;
    const { title } = request.body as any;

    const habit = await prisma.habit.updateMany({
      where: { id, userId: request.user!.id },
      data: { title },
    });

    if (habit.count === 0) return reply.status(404).send({ error: "Not found" });
    return { ok: true };
  });

  fastify.delete("/habits/:id", {
    preHandler: [fastify.authenticate],
    schema: {
      description: "Delete a habit",
      tags: ["habits"],
      security: [{ apiKey: [] }],
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            ok: { type: "boolean" },
          },
        },
      },
    },
  }, async (request: AuthRequest, reply) => {
    const { id } = request.params as any;

    const deleted = await prisma.habit.deleteMany({
      where: { id, userId: request.user!.id },
    });

    if (deleted.count === 0) return reply.status(404).send({ error: "Not found" });
    return { ok: true };
  });
});

const start = async () => {
  try {
    // Wait for all plugins and routes to be registered
    await server.ready();

    const port = Number(process.env.PORT) || 3002;
    await server.listen({ port, host: "0.0.0.0" });
    server.log.info(`Server listening on ${port}`);
    server.log.info(`Swagger documentation available at http://localhost:${port}/docs`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

// Graceful shutdown
const shutdown = async (signal: string) => {
  try {
    server.log.info(`Received ${signal} - closing server`);
    await server.close();
    await prisma.$disconnect();
    server.log.info("Server closed");
    process.exit(0);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Add type definition for authenticate decorator
declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user?: {
      id: string;
    };
  }
}
