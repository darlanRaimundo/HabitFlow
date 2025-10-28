Backend — guia rápido

Stack sugerido

- Node.js + TypeScript
- Framework: Fastify ou Express
- ORM: Prisma
- DB: PostgreSQL (local via Docker Compose)
- Autenticação: JWT ou NextAuth (se usar Next.js no frontend)

Objetivo do starter

- Fornecer endpoints CRUD para User, Habit e HabitEntry.
- Conectar com PostgreSQL via Prisma.
- Expor scripts para rodar localmente com Docker Compose.

Passos iniciais (manual)

1. Criar pasta `backend` e inicializar package.json
   - `npm init -y`
2. Instalar dependências principais
   - `npm i express cors` (ou `fastify`)
   - `npm i -D typescript ts-node-dev @types/node @types/express`
   - `npm i prisma @prisma/client`
3. Inicializar TypeScript
   - `npx tsc --init`
4. Configurar Prisma
   - `npx prisma init` -> editar `prisma/schema.prisma` com datasource Postgres
5. Criar Docker Compose (Postgres) e rodar `docker compose up -d`
6. Criar servidor básico `src/index.ts` e endpoints de exemplo

Scripts úteis (package.json)

- `dev`: `ts-node-dev --respawn --transpile-only src/index.ts`
- `build`: `tsc`
- `start`: `node dist/index.js`

## Como rodar (com Docker Compose)

Se o repositório contiver `docker-compose.yml` e `docker-compose.override.yml`, use os comandos abaixo para subir os serviços:

```powershell
# Subir todos os serviços (dev com overrides):
docker compose up --build

# Subir em background:
docker compose up -d --build

# Parar e remover containers (mantém volume do DB):
docker compose down

# Parar e remover containers + volumes (apaga dados do DB):
docker compose down -v
```

## Testes rápidos

- Verificar o banco está saudável:

```powershell
docker compose logs db
```

- Acessar o Postgres no container:

```powershell
docker compose exec db psql -U habitflow -d habitflow_dev -c "SELECT 1;"
```

- Verificar o backend (smoke test):

```powershell
Invoke-RestMethod -Uri http://localhost:4000/healthz
```

## Migrações e seeds

Se usar Prisma ou outra ferramenta de migração, rode as migrações dentro do container backend:

```powershell
docker compose run --rm backend npm run migrate
```

## Ambiente e secrets

Evite deixar senhas no `docker-compose.yml`. Prefira `.env` + `env_file` e não comite arquivos com credenciais reais.

Modelo Prisma sugerido (resumo)
model User {
id Int @id @default(autoincrement())
email String @unique
name String?
habits Habit[]
}

model Habit {
id Int @id @default(autoincrement())
title String
user User @relation(fields: [userId], references: [id])
userId Int
entries HabitEntry[]
}

model HabitEntry {
id Int @id @default(autoincrement())
date DateTime
done Boolean @default(false)
habit Habit @relation(fields: [habitId], references: [id])
habitId Int
}

Sugestão: mais tarde, adicionar testes unitários com Vitest e endpoints E2E com Playwright.
