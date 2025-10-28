---
title: Semana 3 — Backend: DB e API básica
---

Descrição

Modelar o banco com Prisma (User, Habit, HabitEntry), criar migrations e endpoints CRUD básicos em Fastify (ou tRPC se escolher). Adicionar scripts de seed para popular dados de dev.

Tarefas
- [ ] Definir `prisma/schema.prisma` com modelos essenciais
- [ ] Rodar migrations e criar script `prisma/seed.ts`
- [ ] Implementar endpoints: `POST /auth/register`, `POST /auth/login`, `GET /habits`, `POST /habits`, `PATCH /habits/:id`, `DELETE /habits/:id`
- [ ] Documentar exemplos de requests (cURL/Postman)

Critérios de aceite
- Migrations aplicadas sem erro
- Endpoints respondem com status corretos e formatados
- Banco populado com seed em ambiente dev
