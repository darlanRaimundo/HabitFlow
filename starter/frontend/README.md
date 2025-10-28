Frontend — guia rápido

Stack sugerido

- Next.js (App Router) + TypeScript + Tailwind CSS
- Alternativa: Vite + React + TypeScript + Tailwind
- State: React Query / TanStack Query; ou tRPC para chamadas tipadas

Objetivos do starter

- Criar layout responsivo com Tailwind
- Páginas: / (landing), /auth (login/register), /dashboard, /habit/[id]
- Consumir a API do backend para CRUD

Passos iniciais (Next.js)

1. Criar app Next.js com TypeScript
   - `npx create-next-app@latest frontend --typescript --use-npm`
2. Instalar Tailwind CSS (seguir docs oficiais)
3. Configurar ESLint/Prettier e Husky
4. Consumir API backend via fetch/axios ou integrar tRPC

Scripts úteis

- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`

Boas práticas para aprender aqui

- Componentes atômicos (design system simples)
- Formulários com Zod + React Hook Form
- Gerenciamento de cache com React Query
- Testes de componentes com Testing Library + Vitest
- E2E com Playwright cobrindo fluxos críticos

Para começar rápido sem Next

- `npm init vite@latest frontend -- --template react-ts`

Quando quiser, eu posso gerar o scaffold do frontend (Next.js) e do backend (TypeScript + Prisma + Docker Compose) com scripts prontos para rodar localmente. Diga qual opção prefere e eu gero os arquivos de código iniciais.
