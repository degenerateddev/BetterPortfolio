FROM node:20-bullseye AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:20-bullseye-slim

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# STRAPI_URL, STRAPI_TOKEN and PUBLIC_STRAPI_URL are read at runtime
EXPOSE 80
CMD ["node", "./dist/server/entry.mjs"]
