FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

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

HEALTHCHECK --interval=10s --timeout=5s --retries=5 --start-period=30s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:1337/admin || exit 1

CMD ["npm", "start"]
