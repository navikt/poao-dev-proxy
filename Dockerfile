FROM node:14-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:14-alpine

LABEL org.opencontainers.image.source=https://github.com/navikt/poao-dev-proxy
LABEL org.opencontainers.image.title=poao-dev-proxy

WORKDIR /app

COPY --from=builder /app/build .
COPY --from=builder /app/node_modules ./node_modules

USER node

CMD ["node", "/app/server.js"]