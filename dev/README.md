# Development with Docker Compose

This folder contains instructions to start the HabitFlow development stack using Docker Compose.

Services included

- Postgres (db)
- Backend (Fastify) — uses `backend/Dockerfile` for production-style build; in dev the service runs `npm run dev` and uses a bind mount.
- Frontend (Next.js) — runs `npm run dev` in dev with a bind mount.

Quick start (development)

From the repository root:

```powershell
# build images and start services (uses docker-compose.override.yml automatically for dev)
docker compose up --build

# run in background
docker compose up -d --build

# stop and remove containers (keeps DB volume by default)
docker compose down

# stop and remove containers + remove volumes (will erase db data)
docker compose down -v
```

Notes

- The `db` service exposes port 5432 to the host. Use `postgres://habitflow:secret@localhost:5432/habitflow_dev` locally if you need to connect from the host.
- The `backend` service in dev uses the bind mount `./backend` so file changes are picked up by the dev server. If you prefer to run the backend locally outside Docker, you can still use the `db` service only: `docker compose up -d db` and then run `npm run dev` in `backend/`.
- If you use a migration tool (Prisma, Knex, TypeORM), run migrations before starting the backend in production mode. Example:

```powershell
docker compose run --rm backend npm run migrate
```

Environment variables

- This compose file uses a simple example password and credentials (`habitflow` / `secret`). For real development, create `.env` files and set `env_file` in the compose services or use Docker secrets.

Troubleshooting

- If ports are in use, stop the conflicting services or change the `ports` mapping in the compose files.
- On Windows with WSL2, bind mounts work best when repository files are inside the WSL filesystem or when using Docker Desktop with file sharing enabled.
