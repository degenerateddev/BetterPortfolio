FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --only=production

FROM node:20-alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

WORKDIR /app

ENV NODE_ENV=production

EXPOSE 1337

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npm run build

CMD ["npm", "start"]
