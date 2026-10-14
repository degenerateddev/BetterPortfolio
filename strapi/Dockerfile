FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json* ./
# --include=dev: typescript is needed for `strapi build`, even if NODE_ENV=production leaks in as a build arg
RUN npm ci --include=dev

# ---

FROM node:20-alpine

# wget is needed for the healthcheck
RUN apk add --no-cache wget

WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

EXPOSE 1337

HEALTHCHECK --interval=15s --timeout=5s --retries=8 --start-period=120s \
  CMD wget -qO /dev/null http://127.0.0.1:1337/admin || exit 1

# public/ is a persistent volume that may start empty and hide the image's uploads folder
CMD ["sh", "-c", "mkdir -p public/uploads && npm start"]
