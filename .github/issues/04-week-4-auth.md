---
title: Semana 4 — Autenticação e autorização
---

Descrição

Implementar autenticação segura e proteção de rotas. Preferir JWT com refresh tokens ou NextAuth se usar Next.js.

Tarefas

- [ ] Implementar registro com hashing (bcrypt)
- [ ] Implementar login e emissão de access + refresh tokens (ou sessão com cookie seguro)
- [ ] Criar middleware para proteger rotas e verificar ownership
- [ ] Atualizar frontend para login/registro e proteção de rotas

Critérios de aceite

- Endpoints privados retornam 401 sem token
- Usuário só pode acessar/alterar seus próprios hábitos
- Fluxo de login/registro testado manualmente
