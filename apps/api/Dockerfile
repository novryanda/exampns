# ============================================================
# ExamCPNS – Backend API (production image)
# ============================================================

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache wget \
  && addgroup -S exampns \
  && adduser -S exampns -G exampns \
  && mkdir -p uploads/avatars

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./
COPY --from=build /app/node_modules/prisma ./node_modules/prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
  && chown -R exampns:exampns /app

USER exampns

EXPOSE 3001

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/src/main.js"]
