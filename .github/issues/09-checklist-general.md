---
title: Checklist geral — preparações antes do deploy
---

Descrição

Checklist com itens críticos para evitar problemas no primeiro deploy.

Tarefas

- [ ] Dockerfile multi-stage por serviço
- [ ] `/.env.example` com variáveis obrigatórias documentadas
- [ ] Health & readiness endpoints implementados
- [ ] Graceful shutdown implementado (SIGTERM/SIGINT)
- [ ] Pool de conexões do Postgres configurado (PgBouncer/Prisma Data Proxy quando necessário)
- [ ] Secrets configurados no provedor de deploy
- [ ] CI que builda e executa testes antes de deploy

Critérios de aceite

- Todos os itens checados/documentados no repo
- Deploy em staging realizado sem erros críticos
