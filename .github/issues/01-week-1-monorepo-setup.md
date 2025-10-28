---
title: Semana 1 — Monorepo & ambiente básico
---

Descrição

Configurar o monorepo com `frontend/` e `backend/`, TypeScript, ESLint + Prettier, husky e um `docker-compose.yml` para desenvolvimento (Postgres + backend). Garantir scripts `dev`, `build` e `start` em ambos os pacotes.

Tarefas

- [ ] Criar pastas `frontend/` e `backend/` com `package.json` inicial
- [ ] Configurar `tsconfig.json` em ambos
- [ ] Adicionar ESLint + Prettier + husky + lint-staged
- [ ] Criar `docker-compose.yml` com Postgres e backend
- [ ] Documentar comandos no `starter/*/README.md`

Critérios de aceite

- `npm run dev` inicia frontend e backend (separado)
- Postgres acessível via Docker Compose
- Hooks de commit funcionando (lint-staged)

Notas

- Use workspaces (pnpm/yarn/npm) conforme preferência do time.
