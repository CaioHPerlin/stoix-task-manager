FROM node:20-alpine AS base

WORKDIR /app
RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml ./

FROM base AS development
EXPOSE 5000
CMD [ -d "node_modules" ] && pnpm start:dev || pnpm i && pnpm start:dev