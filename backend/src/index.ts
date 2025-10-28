import Fastify from "fastify";
import cors from "@fastify/cors";

const server = Fastify({ logger: true });

// Register CORS — ajustar origin em produção
server.register(cors, { origin: true });

// Health endpoints
server.get("/healthz", async () => ({ status: "ok" }));

// Root
server.get("/", async () => ({ ok: true, time: Date.now() }));

// Example route
server.get("/hello", async (request, reply) => ({ hello: "world" }));

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
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
    // Aqui desconectar DB/Redis se existirem (ex: await prisma.$disconnect())
    server.log.info("Server closed");
    process.exit(0);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
