# Multi-stage Dockerfile for Saprism production build

FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

ENV NODE_ENV=production

RUN npx prisma generate

RUN npm run build

RUN ls -la dist/ && \
    test -f dist/index.js && \
    test -d dist/assets

FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache dumb-init curl

RUN addgroup -g 1001 -S nodejs && \
    adduser -S saprism -u 1001

COPY package*.json ./

RUN npm ci --only=production && \
    npm cache clean --force

COPY --from=builder --chown=saprism:nodejs /app/dist ./dist

COPY --chown=saprism:nodejs prisma ./prisma

COPY --from=builder --chown=saprism:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=saprism:nodejs /app/node_modules/@prisma ./node_modules/@prisma

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

USER saprism

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/index.js"]