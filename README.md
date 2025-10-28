# Projeto de atualização tecnológica — "FullStack Moderno"

Este repositório é um scaffold e roteiro para você, dev pleno, atualizar-se com tecnologias modernas de desenvolvimento web full-stack.

Objetivo

- Construir um aplicativo full-stack como projeto-guia, cobrindo frontend moderno, backend em TypeScript, banco de dados relacional, autenticação, testes, CI/CD e deploy em ambiente conteinerizado.
- Aprender conceitos práticos: arquitetura, observability, segurança, performance e práticas de engenharia (testing, code review, pipelines).

Ideia sugerida (MVP)

- "HabitFlow": um app para gestão de hábitos com cronograma, estatísticas, badges e sincronização em tempo real entre dispositivos.
- MVP mínimo: cadastro/login, criação/remoção de hábitos, registro diário de conclusão, dashboard com estatísticas básicas.

Stack recomendado (opções; escolha 1 por área)

- Frontend: Next.js (App Router) + React + TypeScript + Tailwind CSS
  - Alternativa leve: Vite + React + TypeScript + Tailwind
- Backend: Node.js + TypeScript + tRPC ou REST (Express/Fastify)
- DB: PostgreSQL + Prisma (ORM)
- Autenticação: NextAuth.js / Clerk / Magic.link ou JWT + bcrypt
- Realtime: WebSockets (Socket.io) ou Supabase Realtime
- Tests: Vitest/Jest (unit), Playwright (E2E)
- Infra/DevOps: Docker, Docker Compose, GitHub Actions (CI), deploy em Vercel (frontend) + Railway/Heroku/DigitalOcean (backend) or full container in AWS/GCP

Marcos e roteiro de estudos (sugestão 8–12 semanas)

- Semana 1 — Preparação e fundamentos
  - Objetivo: configurar o monorepo, entender TypeScript, linters e formatação.
  - Tarefas: iniciar repositório, configurar ESLint + Prettier + Husky, scripts npm/yarn.
- Semana 2 — Frontend: layout e routing
  - Objetivo: criar layout responsivo com Tailwind e rotas principais.
  - Tarefas: criar páginas: home, auth, dashboard, habit detail.
- Semana 3 — Backend: API básica + DB
  - Objetivo: criar API para CRUD de hábitos e usuários, integrar Prisma + Postgres (local via Docker).
- Semana 4 — Autenticação e autorização
  - Objetivo: proteger rotas, sessão persistente (NextAuth ou JWT).
- Semana 5 — Integração frontend/backend
  - Objetivo: conectar frontend com API (fetch/tRPC), tratar estados e validações.
- Semana 6 — Testes unitários e E2E
  - Objetivo: escrever testes para componentes críticos e fluxos E2E (registro, login, criar hábito).
- Semana 7 — Realtime e notificações
  - Objetivo: adicionar sincronização em tempo real quando um hábito é marcado.
- Semana 8 — Observability e deploy
  - Objetivo: configurar logging/monitoring básico, criar pipeline CI e rodar deploy em ambiente cloud.

Tarefas práticas por marco (exemplos)

- Configurar TypeScript com paths e builds separados para frontend/backend.
- Criar modelo Prisma para User, Habit, HabitEntry.
- Endpoint: POST /api/habits — cria hábito com validação.
- Endpoint: PATCH /api/habits/:id/toggle — alterna estado do hábito no dia atual.
- Teste unitário: garantir que a lógica de cálculo de streaks (sequência) funcione.
- Playwright: fluxo de registro -> criar hábito -> marcar conclusão.

Critérios de aceitação (exemplo de definição)

- Autenticação: usuário consegue registrar e manter sessão; rotas privadas retornam 401 quando não autenticado.
- Consistência: criar/editar/excluir hábito reflete no dashboard em <2s em local.
- Testes: pelo menos 70% coverage nas funções críticas; 2 testes E2E cobrindo os fluxos principais.

Exercícios de aprofundamento (extra)

- Implementar fila para processamento de relatórios (BullMQ + Redis).
- Migrar partes do backend para serverless (Edge Functions) e comparar latência.
- Implementar análise de performance com Web Vitals e Lighthouse.

Recursos recomendados

- TypeScript Handbook
- Next.js docs (App Router)
- Prisma docs + exemplos
- tRPC docs (se optar por tRPC)
- Testing Library, Vitest, Playwright
- Docker docs

Próximos passos imediatos (para começar hoje)

1. Clonar este repositório localmente.
2. Abrir `starter/` e escolher a abordagem frontend/backend preferida.
3. Executar os tutoriais dos READMEs em `starter/frontend` e `starter/backend` para criar o primeiro MVP mínimo.

Se quiser, eu posso:

- Gerar o scaffold de código inicial (monorepo com `frontend/` e `backend/`).
- Criar os modelos Prisma e um script Docker Compose para Postgres.
- Gerar um roadmap ainda mais detalhado por semana/dia com links de aprendizado.

Diga qual stack prefere (Next.js + tRPC + Prisma, ou Vite + REST + Prisma, etc.) e eu gero o scaffold de código pronto com scripts para rodar localmente e CI básico.
