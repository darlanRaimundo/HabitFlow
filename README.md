# HabitFlow — FullStack Moderno (scaffold & learning project)

Este repositório é um scaffold e roteiro para atualizar habilidades em desenvolvimento web full‑stack. Ele contém um backend em TypeScript (Fastify scaffold) e um frontend que atualmente usa Vite + React + TypeScript. Durante desenvolvimento houveram experimentos com Next.js; por isso alguns artefatos remanescentes podem existir. Este README unifica todas as informações importantes — não há mais README duplicados em subpastas.

Sumário rápido

- Frontend: Vite + React + TypeScript (padrão atual).
- Backend: Fastify + TypeScript (scaffold em `backend/`).
- DB: PostgreSQL (via Docker Compose para desenvolvimento).
- Dev flow: Docker Compose para dev integrado; também é possível rodar frontend e backend localmente.

Status da migração Vite ⇄ Next

- O repositório foi ajustado para usar Vite como toolchain principal do frontend. Em alguns commits/experimentos foram adicionados arquivos do Next.js (`src/app/*`, `next-env.d.ts`, etc.). Essas entradas podem permanecer como placeholders ou serem removidas definitivamente.
- Ferramentas do VS Code ou extensões que geram mensagens de commit automaticamente podem rotular um commit grande de remoção/adaptação como "migrate Next -> Vite" — isso é apenas uma inferência do diff.

Quickstart (recomendado — Docker Compose)

Pré-requisitos

- Docker Desktop (Windows) ou Docker/Compose instalados
- Node.js (local runs only)

Subir a stack de desenvolvimento (db + backend + frontend):

```powershell
# do diretório raiz do repositório
docker compose up --build
```

Notas:

- O arquivo `docker-compose.override.yml` é usado para development e permite hot-reload nos serviços.
- Ver logs do frontend: `docker compose logs -f frontend`.

Rodando localmente sem Docker

Backend (dev):

```powershell
cd backend
npm install
npm run dev
# espera-se que o backend fique em http://localhost:4000 (ver `backend/src/index.ts`)
```

Frontend (Vite):

```powershell
cd frontend
npm install
npm run dev
# Vite abre normalmente em http://localhost:5173 (ou outra porta se configurada)
```

Arquivos e comandos importantes

- `frontend/package.json` — scripts: `dev` (vite), `build`, `preview`.
- `frontend/index.html`, `frontend/vite.config.ts`, `frontend/src/main.tsx` — entradas do Vite.
- `frontend/scripts/prepare-husky.cjs` — instala Husky a partir do root quando um `.git` é detectado em diretórios pais (monorepo-safe).
- `backend/Dockerfile`, `backend/src/index.ts` — servidor Fastify, scripts `dev`, `build` no `backend/package.json`.
- `docker-compose.yml` + `docker-compose.override.yml` — orquestram `db`, `backend`, `frontend` para desenvolvimento.

Banco de dados (Postgres)

- O compose traz um serviço `db` (Postgres). Por padrão a compose pode usar `POSTGRES_DB` como `habitflow_dev` nos dev overrides. Se algum serviço logar `FATAL: database \"habitflow\" does not exist`, crie o banco esperado ou alinhe `POSTGRES_DB` / `DATABASE_URL`.

Exemplo: criar o DB dentro do container

```powershell
docker compose exec db psql -U habitflow -c "CREATE DATABASE habitflow;"
```

Husky, hooks e monorepo

- Para evitar falhas de `npm install` em subpastas, o `frontend` usa `prepare` que roda `scripts/prepare-husky.cjs`. Esse script procura `.git` nas pastas ancestrais e roda `husky install` a partir do root quando encontrado.
- Recomenda-se, em projetos maiores, mover `.husky/` para o root do repositório e ter hooks centralizados (opcional).

Limpeza dos artefatos do Next.js (opções)

Se você escolher que o frontend será apenas Vite, eu recomendo os seguintes passos (posso aplicar automaticamente):

1. Remover arquivos Next.js não usados: `frontend/src/app/*`, `frontend/next-env.d.ts`, `frontend/next.config.js` (se existir).
2. Remover dependências `next` do `frontend/package.json`.
3. Rodar `npm install` em `frontend` e validar `npm run dev`.
4. Commitar as mudanças em um único commit claro: `chore(frontend): remove Next.js leftovers` ou `chore(frontend): migrate Next.js -> Vite`.

Commit message recomendada

- Para mudanças de toolchain ou limpeza: `chore(frontend): migrate Next.js -> Vite` ou `chore(frontend): remove Next.js leftovers`.

Onde estavam os READMEs antigos

- Antes desta consolidação havia README separados em `frontend/`, `starter/frontend/`, `starter/backend/` e `dev/`. Todas as informações essenciais foram movidas para este README e os arquivos duplicados foram removidos para evitar inconsistência.

Contribuindo

- Abra issues para grandes mudanças ou planos de migração.
- Use mensagens de commit claras e preferencialmente Conventional Commits (opcional).

Próximos passos que eu posso executar (escolha)

1. Remover definitivamente os arquivos Next.js restantes e criar o commit de limpeza.
2. Rodar `npm install` em `frontend` e iniciar Vite para validar.
3. Atualizar `docker-compose.override.yml` para forçar Vite a uma porta fixa para evitar conflitos com o backend.

Escolha a ação (1/2/3) ou peça uma combinação; eu executo para você.

---

Licensed under MIT — see LICENSE or add one if needed.
