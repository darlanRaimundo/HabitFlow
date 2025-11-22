import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const server = Fastify({ logger: true });
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Register CORS
server.register(cors, { origin: true });

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

// Health endpoints
server.get("/healthz", async () => ({ status: "ok" }));
server.get("/", async () => ({ ok: true, time: Date.now() }));

// Auth Routes
server.post("/auth/register", async (request, reply) => {
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

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  return { token, user: { id: user.id, email: user.email, name: user.name } };
});

server.post("/auth/login", async (request, reply) => {
  const { email, password } = request.body as any;

  if (!email || !password) {
    return reply.status(400).send({ error: "Email and password required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.status(401).send({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  return { token, user: { id: user.id, email: user.email, name: user.name } };
});

// Habit Routes
server.get("/habits", { preHandler: [server.authenticate] }, async (request: AuthRequest) => {
  const habits = await prisma.habit.findMany({
    where: { userId: request.user!.id },
    include: { entries: true },
  });
  return { habits };
});

server.post("/habits", { preHandler: [server.authenticate] }, async (request: AuthRequest, reply) => {
  const { title } = request.body as any;
  if (!title) return reply.status(400).send({ error: "Title required" });

  const habit = await prisma.habit.create({
    data: { title, userId: request.user!.id },
  });
  return habit;
});

server.patch("/habits/:id", { preHandler: [server.authenticate] }, async (request: AuthRequest, reply) => {
  const { id } = request.params as any;
  const { title } = request.body as any;

  const habit = await prisma.habit.updateMany({
    where: { id, userId: request.user!.id },
    data: { title },
  });

  if (habit.count === 0) return reply.status(404).send({ error: "Not found" });
  return { ok: true };
});

server.delete("/habits/:id", { preHandler: [server.authenticate] }, async (request: AuthRequest, reply) => {
  const { id } = request.params as any;

  const deleted = await prisma.habit.deleteMany({
    where: { id, userId: request.user!.id },
  });

  if (deleted.count === 0) return reply.status(404).send({ error: "Not found" });
  return { ok: true };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3002;
    await server.listen({ port, host: "0.0.0.0" });
    server.log.info(`Server listening on ${port}`);
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
