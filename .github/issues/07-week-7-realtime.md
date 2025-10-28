---
title: Semana 7 — Realtime e notificações
---

Descrição

Adicionar sincronização em tempo real entre clientes quando um hábito é marcado (Socket.io ou um serviço gerenciado). Considerar adapter Redis se planejar escalar.

Tarefas

- [ ] Implementar Socket.io no backend
- [ ] Integrar cliente Socket.io no frontend e atualizar cache/estado
- [ ] Implementar reconexão e tratamento de falhas
- [ ] (Opcional) Notificações Web ou emails

Critérios de aceite

- Marcar hábito em uma aba atualiza automaticamente em outra
- Conexão reconecta automaticamente após perda
- Se escalando, usar adapter Redis para pub/sub
