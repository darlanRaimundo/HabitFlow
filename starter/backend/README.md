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

Modelo Prisma sugerido (resumo)
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
  habits Habit[]
}

model Habit {
  id        Int        @id @default(autoincrement())
  title     String
  user      User       @relation(fields: [userId], references: [id])
  userId    Int
  entries   HabitEntry[]
}

model HabitEntry {
  id      Int      @id @default(autoincrement())
  date    DateTime
  done    Boolean  @default(false)
  habit   Habit    @relation(fields: [habitId], references: [id])
  habitId Int
}

Sugestão: mais tarde, adicionar testes unitários com Vitest e endpoints E2E com Playwright.
