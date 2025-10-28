# Backend Dockerfile — multi-stage build
# Builder stage (instala todas as deps e compila TypeScript)
FROM node:20-alpine AS builder
WORKDIR /app

# Copia package.json e lock (se existir) e instala dependências de dev para build
COPY package.json package-lock.json* ./
RUN npm ci

# Copia o código e roda o build
COPY . .
RUN npm run build

# Runner stage (imagem final com apenas deps de produção)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Instala apenas dependências de produção
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copia artefato build do builder
COPY --from=builder /app/dist ./dist

# Expor porta padrão (pode ser sobrescrita via env PORT)
EXPOSE 3000
ENV PORT=3000

# Start
CMD ["node", "dist/index.js"]
