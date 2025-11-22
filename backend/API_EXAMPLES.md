# HabitFlow API - Exemplos de Requests

Este documento contém exemplos práticos de como usar a API HabitFlow usando cURL e Postman.

**Base URL**: `http://localhost:3002`

---

## 📋 Índice

- [Autenticação](#autenticação)
  - [Registrar Usuário](#registrar-usuário)
  - [Login](#login)
- [Hábitos](#hábitos)
  - [Listar Hábitos](#listar-hábitos)
  - [Criar Hábito](#criar-hábito)
  - [Atualizar Hábito](#atualizar-hábito)
  - [Deletar Hábito](#deletar-hábito)

---

## 🔐 Autenticação

### Registrar Usuário

Cria uma nova conta de usuário.

#### cURL

```bash
curl -X POST http://localhost:3002/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123",
    "name": "João Silva"
  }'
```

#### Postman

```
Method: POST
URL: http://localhost:3002/auth/register
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "João Silva"
}
```

#### Resposta (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "cm3v1234567890abcdefghij",
    "email": "usuario@exemplo.com",
    "name": "João Silva"
  }
}
```

---

### Login

Autentica um usuário existente.

#### cURL

```bash
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

#### Postman

```
Method: POST
URL: http://localhost:3002/auth/login
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

#### Resposta (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "cm3v1234567890abcdefghij",
    "email": "usuario@exemplo.com",
    "name": "João Silva"
  }
}
```

> **⚠️ Importante**: Salve o `token` retornado. Você precisará dele para todas as requisições de hábitos.

---

## 📝 Hábitos

> **🔒 Autenticação Necessária**: Todas as rotas de hábitos requerem o header `Authorization: Bearer <token>`

### Listar Hábitos

Retorna todos os hábitos do usuário autenticado.

#### cURL

```bash
curl -X GET http://localhost:3002/habits \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Postman

```
Method: GET
URL: http://localhost:3002/habits
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Resposta (200 OK)

```json
{
  "habits": [
    {
      "id": "cm3v9876543210zyxwvutsrq",
      "title": "Exercícios matinais",
      "userId": "cm3v1234567890abcdefghij",
      "createdAt": "2025-11-22T10:30:00.000Z",
      "entries": []
    },
    {
      "id": "cm3v5555555555mnopqrstuv",
      "title": "Ler 30 minutos",
      "userId": "cm3v1234567890abcdefghij",
      "createdAt": "2025-11-22T11:15:00.000Z",
      "entries": []
    }
  ]
}
```

---

### Criar Hábito

Cria um novo hábito para o usuário autenticado.

#### cURL

```bash
curl -X POST http://localhost:3002/habits \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meditar 10 minutos"
  }'
```

#### Postman

```
Method: POST
URL: http://localhost:3002/habits
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json
Body (raw JSON):
{
  "title": "Meditar 10 minutos"
}
```

#### Resposta (200 OK)

```json
{
  "id": "cm3v7777777777klmnopqrst",
  "title": "Meditar 10 minutos",
  "userId": "cm3v1234567890abcdefghij",
  "createdAt": "2025-11-22T14:20:00.000Z"
}
```

---

### Atualizar Hábito

Atualiza o título de um hábito existente.

#### cURL

```bash
curl -X PATCH http://localhost:3002/habits/cm3v7777777777klmnopqrst \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meditar 15 minutos"
  }'
```

#### Postman

```
Method: PATCH
URL: http://localhost:3002/habits/cm3v7777777777klmnopqrst
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json
Body (raw JSON):
{
  "title": "Meditar 15 minutos"
}
```

#### Resposta (200 OK)

```json
{
  "ok": true
}
```

---

### Deletar Hábito

Remove um hábito do usuário autenticado.

#### cURL

```bash
curl -X DELETE http://localhost:3002/habits/cm3v7777777777klmnopqrst \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Postman

```
Method: DELETE
URL: http://localhost:3002/habits/cm3v7777777777klmnopqrst
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Resposta (200 OK)

```json
{
  "ok": true
}
```

---

## 🔧 Configuração do Postman

### Variáveis de Ambiente

Para facilitar o uso no Postman, crie as seguintes variáveis de ambiente:

1. **base_url**: `http://localhost:3002`
2. **token**: (será preenchido após login)

### Script de Pós-Requisição (Login/Register)

Adicione este script na aba "Tests" das requisições de login/register para salvar o token automaticamente:

```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("token", response.token);
}
```

### Usando Variáveis

Depois de configurar as variáveis, você pode usar:

- **URL**: `{{base_url}}/habits`
- **Authorization Header**: `Bearer {{token}}`

---

## 📊 Códigos de Status HTTP

| Código | Significado | Quando ocorre |
|--------|-------------|---------------|
| 200 | OK | Requisição bem-sucedida |
| 400 | Bad Request | Dados inválidos ou faltando campos obrigatórios |
| 401 | Unauthorized | Token inválido ou ausente |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Email já cadastrado (register) |

---

## 🧪 Fluxo de Teste Completo

Aqui está um exemplo de fluxo completo para testar a API:

```bash
# 1. Registrar um novo usuário
TOKEN=$(curl -s -X POST http://localhost:3002/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@exemplo.com","password":"senha123","name":"Teste"}' \
  | jq -r '.token')

# 2. Criar um hábito
HABIT_ID=$(curl -s -X POST http://localhost:3002/habits \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Correr 5km"}' \
  | jq -r '.id')

# 3. Listar hábitos
curl -X GET http://localhost:3002/habits \
  -H "Authorization: Bearer $TOKEN"

# 4. Atualizar o hábito
curl -X PATCH http://localhost:3002/habits/$HABIT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Correr 10km"}'

# 5. Deletar o hábito
curl -X DELETE http://localhost:3002/habits/$HABIT_ID \
  -H "Authorization: Bearer $TOKEN"
```

> **Nota**: Este exemplo usa `jq` para extrair valores JSON. Instale com `brew install jq` (macOS) ou `apt-get install jq` (Linux).

---

## 📚 Recursos Adicionais

- **Swagger UI**: [http://localhost:3002/docs](http://localhost:3002/docs)
- **Swagger JSON**: [http://localhost:3002/docs/json](http://localhost:3002/docs/json)

---

## 💡 Dicas

1. **Tokens JWT**: Os tokens expiram em 7 dias. Após isso, você precisará fazer login novamente.
2. **Segurança**: Em produção, sempre use HTTPS e mantenha o `JWT_SECRET` seguro.
3. **Validação**: A API valida automaticamente os dados de entrada conforme os schemas definidos.
4. **CORS**: A API está configurada para aceitar requisições de qualquer origem em desenvolvimento.
