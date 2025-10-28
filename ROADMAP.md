# Roadmap detalhado — HabitFlow (Roteiro de estudos)

Este documento é um roteiro prático em português para você, dev pleno, implementar o projeto "HabitFlow" e aprender tecnologias modernas (Next.js, Fastify, TypeScript, Prisma, Docker, testes, CI/CD, etc.). O roteiro principal está pensado para 8 semanas, com extensão até 12 semanas para aprofundamentos.

---

## Visão geral

Objetivo: construir um MVP full-stack e progredir para autenticação, realtime, testes, observability e deploy. Cada semana traz entregáveis, tarefas, exercícios práticos e critérios de aceitação.

Stack recomendada (sugerida):

- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS
- Backend: Node.js + TypeScript + Fastify
- ORM: Prisma + PostgreSQL
- Realtime: Socket.io (self-host) ou Supabase Realtime
- Tests: Vitest (unit), Testing Library (componentes), Playwright (E2E)
- Infra: Docker + Docker Compose; deploy: Vercel (frontend) + Railway/Render/Container Registry (backend)

---

## Semana 0 — Preparação (0.5–1 dia)

Entregáveis:

- Definir stack (já decidido: Fastify + monorepo).
- Repositório com README inicial e estrutura `frontend/` + `backend/`.
  Tarefas:
- Criar issues iniciais para cada marco no repo.
  Critério de aceite:
- Stack definida e repositório com `starter/` pronto.

---

## Semana 1 — Monorepo e ambiente básico (3–5 dias)

Entregáveis:

- Pastas `frontend/` e `backend/` com package.json, tsconfig, ESLint/Prettier.
- `docker-compose.yml` para desenvolvimento (Postgres + backend + frontend opcional).
  Tarefas:
- Inicializar workspaces (npm/yarn/pnpm).
- Configurar ESLint + Prettier + husky + lint-staged.
  Exercício:
- Rodar `npm run dev` em ambos e garantir que iniciam sem erros.
  Critério:
- Dev scripts funcionam localmente; db rodando via Docker Compose.

---

## Semana 2 — Frontend: layout e rotas (4–6 dias)

Entregáveis:

- Next.js app com Tailwind e páginas: `/`, `/auth`, `/dashboard`, `/habit/[id]`.
  Tarefas:
- Criar design system mínimo (Button, Card, Input, Modal).
- Configurar React Hook Form + Zod.
  Exercício:
- Implementar e testar componente de formulário com validação.
  Critério:
- Navegação entre páginas funciona; componentes reutilizáveis prontos.

---

## Semana 3 — Backend: DB e API básica (5–7 dias)

Entregáveis:

- Prisma schema (User, Habit, HabitEntry), migrations e seeds.
- Endpoints CRUD básicos: /api/habits, /api/habits/:id, /api/auth.
  Tarefas:
- Implementar endpoints REST em Fastify (ou tRPC se preferir tipagem ponta a ponta).
- Criar scripts seed com dados de exemplo.
  Exercício:
- Rodar migrations e seed; testar endpoints via Postman/Insomnia.
  Critério:
- Endpoints operam corretamente com Postgres local.

---

## Semana 4 — Autenticação e autorização (4–6 dias)

Entregáveis:

- Registro/login e proteção de rotas (middleware).
  Tarefas:
- Implementar autenticação JWT com refresh tokens ou NextAuth (se Next.js).
- Proteger endpoints de CRUD (usuário só acessa seus recursos).
  Exercício:
- Escrever teste rápido que chama endpoint privado sem token e obtém 401.
  Critério:
- Fluxo registro/login funcionando; rotas privadas retornam 401 quando não autenticado.

---

## Semana 5 — Integração frontend/backend (4–6 dias)

Entregáveis:

- Dashboard funcional consumindo a API.
  Tarefas:
- Integrar chamadas com React Query / tRPC.
- Implementar invalidation de cache e optimistic updates ao marcar hábito.
  Exercício:
- Implementar toggle otimista e fallback on-error.
  Critério:
- CRUD refletido na UI e persistido no backend.

---

## Semana 6 — Testes (5–8 dias)

Entregáveis:

- Suite de testes: vitest (unit), testing-library (component), Playwright (E2E).
  Tarefas:
- Escrever testes unitários da lógica (ex.: cálculo de streaks).
- Component tests para componentes críticos.
- Playwright: E2E cobrindo registro → login → criar hábito → marcar como feito.
  Exercício:
- Criar teste de unit que valida cálculo de streaks com casos borda.
  Critério:
- Testes locais passam; coverage apropriada para funções críticas.

---

## Semana 7 — Realtime e notificações (4–6 dias)

Entregáveis:

- Sincronização em tempo real entre clientes.
  Tarefas:
- Implementar Socket.io no backend + adapter Redis se necessário.
- Frontend escuta eventos e atualiza cache.
  Exercício:
- Abrir duas abas e garantir que marcar hábito em uma atualiza a outra automaticamente.
  Critério:
- Atualizações em tempo real com latência pequena; reconexão ok.

---

## Semana 8 — Observability, CI/CD e deploy (4–6 dias)

Entregáveis:

- Pipeline CI básico; deploy do frontend e backend.
  Tarefas:
- Criar GitHub Actions: lint, build, test.
- Dockerfile multi-stage para backend; registrar imagem em registry.
- Deploy frontend (Vercel) e backend (Render/Railway/Container)
- Logging estruturado (pino) e monitoramento básico (Sentry/Logflare).
  Exercício:
- Abrir PR, verificar CI e fazer deploy automático do branch `main`.
  Critério:
- CI passando; app acessível e healthcheck respondendo 200.

---

## Extensões opcionais (Semanas 9–12)

- Semana 9: Segurança e hardening (rate limiting, helmet, validações avançadas).
- Semana 10: Performance e caching (Redis, PgBouncer, Prisma Data Proxy).
- Semana 11: Infra as Code (Terraform), deploy em Kubernetes.
- Semana 12: Observability avançada (Prometheus, Grafana, tracing), A/B tests.

---

## Entregáveis por checkpoints

- Checkpoint 1 (fim Semana 2): frontend protótipo + backend inicial + DB local.
- Checkpoint 2 (fim Semana 4): autenticação + rotas privadas + CRUD completo.
- Checkpoint 3 (fim Semana 6): integração completa + testes automatizados.
- Checkpoint 4 (fim Semana 8): realtime + CI + deploy.

---

## Exercícios práticos e critérios (exemplos)

- Modelagem: escrever 3 queries Prisma (ex.: hábitos ativos, streak atual, longest streak).
- Lógica: função pura para calcular streak — 5 testes cobrindo bordas (dias faltantes, múltiplos dias feitos).
- UI: implementar componente com acessibilidade (axe) e testes de keyboard navigation.
- Realtime: usar adapter Redis para Socket.io quando for escalar múltiplas réplicas.
- CI: proibir merge se testes falharem; rodar lint + build + tests no PR.

---

## Checklist mínima antes do primeiro deploy

- [ ] Dockerfile multi-stage por serviço
- [ ] Health & ready endpoints no backend
- [ ] Graceful shutdown no backend conectando ao Prisma/Redis
- [ ] Pool de conexões do Postgres controlado (usar PgBouncer/Prisma Data Proxy quando escalar)
- [ ] Variáveis de ambiente documentadas em `.env.example`
- [ ] Secrets armazenados no provedor de deploy
- [ ] Pipeline CI que builda e testa

---

## Plano diário sugerido (por semana)

- Segunda: setup + leitura (1–2h teoria)
- Terça–Quinta: implementação (4–6h por dia)
- Sexta: testes, refatoração e revisão de PRs (2–4h)
- Final de semana: extras, deploy ou explorar extensão opcional

---

## Recursos recomendados (links oficiais)

- TypeScript Handbook
- Next.js Docs (App Router)
- Prisma Docs
- Fastify Docs
- Tailwind CSS
- React Query (TanStack Query)
- Zod
- Vitest / Testing Library
- Playwright
- Docker / Docker Compose
- GitHub Actions

---

## Próximos passos imediatos que eu posso fazer por você

- Gerar o scaffold completo do monorepo (frontend + backend) com scripts e `docker-compose.yml`.
- Criar `ROADMAP.md` (feito) e issues automáticas para cada tarefa do roadmap.
- Gerar exemplos de testes e um workflow GitHub Actions.

Se quiser, eu já crio as issues correspondentes aos checkpoints e tarefas da Semana 1–3 (cada issue = tarefa do roadmap). Diga se quer que eu gere as issues ou se prefere que eu comece a scaffoldar o frontend/back-end agora.
