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

HEALTHCHECK --interval=15s --timeout=5s --retries=8 --start-period=120s \
  CMD wget -qO /dev/null http://127.0.0.1:1337/admin || exit 1

CMD ["npm", "start"]
