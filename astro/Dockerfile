FROM node:20-bullseye AS builder

WORKDIR /app

# strapi URL at build time for static site generation
ARG STRAPI_URL
ARG STRAPI_TOKEN

ENV STRAPI_URL=$STRAPI_URL
ENV STRAPI_TOKEN=$STRAPI_TOKEN

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]