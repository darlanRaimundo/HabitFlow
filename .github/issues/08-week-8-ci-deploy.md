---
title: Semana 8 — Observability, CI/CD e deploy
---

Descrição

Configurar pipeline CI (GitHub Actions), Dockerfile multi-stage, deploy do frontend (Vercel) e backend (Railway/Render) e observability (Sentry/Logflare).

Tarefas
- [ ] Criar workflow GitHub Actions: lint, build, test
- [ ] Configurar Dockerfile multi-stage (já criado) e publicar imagem quando necessário
- [ ] Criar `docker-compose.prod.yml` ou instruções de deploy
- [ ] Configurar Sentry e enviar erros de teste

Critérios de aceite
- CI passando em PRs
- Deploy do frontend em Vercel e backend em um container/serviço acessível
- Healthcheck retorna 200 e logs estruturados enviados
