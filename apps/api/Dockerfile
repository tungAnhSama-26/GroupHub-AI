FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/

COPY packages/database/prisma/ ./packages/database/prisma/

RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN npm run build -- --filter=api

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built files
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/

# Copy necessary dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/database ./packages/database
COPY --from=builder /app/packages/types ./packages/types

EXPOSE 3001
ENV PORT=3001

CMD ["node", "apps/api/dist/main"]
