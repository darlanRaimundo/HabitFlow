# Frontend — HabitFlow (scaffold)

Este diretório é um scaffold mínimo para iniciar o frontend do projeto HabitFlow usando Next.js (App Router) + TypeScript + Tailwind.

Opções para iniciar rapidamente

1) Gerar app Next.js (recomendado)

Abra o terminal no diretório raiz do repositório e rode:

```bash
npx create-next-app@latest frontend --typescript --app
```

Em seguida, instale Tailwind (opcional) seguindo a documentação do Tailwind para Next.js.

2) Alternativa com Vite (mais leve)

```bash
npm create vite@latest frontend -- --template react-ts
```

Scripts úteis (após instalar dependências)

- `npm run dev` — inicia o servidor de desenvolvimento (Next.js: `next dev`)
- `npm run build` — compila para produção
- `npm run start` — inicia o servidor de produção (após build)

Sugestões
- Configure ESLint + Prettier e Husky para manter qualidade.
- Use React Query / TanStack Query ou tRPC para integração com o backend.

Para começar agora rapidamente (sem `create-next-app`), você pode editar `src/app/page.tsx` que já contém um componente de exemplo.
