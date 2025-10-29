# Frontend — HabitFlow (scaffold)

````markdown
# Frontend — HabitFlow (estado atual)

Este README documenta como o frontend está configurado atualmente e como lidar com os dois toolchains que apareceram durante o desenvolvimento: Vite (atual) e artefatos do Next.js (restos da migração).

Resumo atual

- Toolchain principal: Vite + React + TypeScript (dev com `vite`).
- Motivo da confusão: o repositório teve arquivos/trechos de Next.js criados anteriormente; alguns foram removidos, outros ainda aparecem como "remnants". Isso pode gerar mensagens de commit que parecem "migrar Next -> Vite" porque o diff mostra exclusões de arquivos Next e adição de arquivos Vite.

Arquivos importantes (frontend/)

- `package.json` — scripts `dev`, `build`, `preview` estão configurados para Vite.
- `index.html`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx` — entradas do Vite.
- `src/app/*` e `next-env.d.ts` — arquivos gerados por Next.js; alguns foram neutralizados ou deixados como placeholders para evitar erros de import durante edição. Podem ser removidos definitivamente se você não pretende usar Next.
- `scripts/prepare-husky.cjs` — script que instala Husky apenas quando encontra `.git` no diretório pai (monorepo-safe).

Como rodar localmente (PowerShell)

1. Instalar dependências (na pasta `frontend`):

```powershell
cd frontend
npm install
```
````

2. Rodar em modo desenvolvimento (Vite):

```powershell
npm run dev
# abre em http://localhost:5173 por padrão (ou 3000 se `--port` configurado/forçado)
```

3. Build de produção e preview:

```powershell
npm run build
npm run preview
```

Como rodar com Docker Compose (dev com backend + db)

No diretório raiz do repositório:

```powershell
# sobe db, backend e frontend em modo dev (override usado para hot-reload)
docker compose up --build
```

Observações sobre portas e containers

- O Vite normalmente usa a porta 5173 (mas pode ser forçado para 3000); o frontend container foi configurado para executar `npm install && npm run dev` no startup em dev override.
- Se o Vite escolher a porta 3000 e o backend também ouvir em 3000, o Vite vai procurar uma porta alternativa (ex.: 3001). Verifique `docker compose logs -f frontend` para ver a porta usada.

Por que o VS Code/Extensões sugerem "migração Next -> Vite"

- Ferramentas que geram mensagens de commit (extensões como Copilot for Commit Messages, GitLens, ou o próprio Summary do Git do VS Code) baseiam-se no diff entre estados do repositório. Se o diff remove muitos arquivos com padrão Next.js e adiciona arquivos típicos do Vite, a sugestão natural será "migrate Next to Vite". Isso é apenas um resumo do diff — não uma alteração forçada.

Como limpar os restos do Next.js (opções)

- Opção A — remover definitivamente: apagar `src/app/*`, `next-env.d.ts`, `next.config.js` (se existir) e qualquer dependência `next` em `package.json` e commitar como `chore(frontend): remove Next.js leftovers`.
- Opção B — manter placeholders (atualmente feito): arquive/neutralize arquivos para não quebrar imports mas não os utilize.
- Posso aplicar a limpeza automática para você e gerar um commit único de limpeza.

Husky / prepare script

- O `prepare` do `frontend/package.json` aponta para `scripts/prepare-husky.cjs` que procura `.git` em diretórios pais e roda `husky install` a partir do root do repositório quando apropriado. Isso evita falhas de `npm install` em CI ou quando instalando apenas subpacotes.

Sugestões finais

- Se o objetivo é usar Vite permanentemente, recomendo:
  1.  Remover dependências Next e arquivos relacionados.
  2.  Rodar `npm install` e `npm run dev` para confirmar que o Vite sobe.
  3.  Commitar as mudanças com uma mensagem clara: `chore(frontend): migrate Next.js -> Vite` ou `chore(frontend): remove Next.js leftovers`.
- Se você prefere manter a opção de usar Next no futuro, mantenha os placeholders e documente a intenção no README.

Se quiser, eu faço a limpeza (remover arquivos Next definitivamente) e crio o commit de limpeza — diga se prefere que eu execute isso agora.

```

```
