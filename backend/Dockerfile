FROM node:20-alpine AS base

WORKDIR /app
RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml ./

FROM base AS dependencies
RUN pnpm install --frozen-lockfile

FROM dependencies AS development

COPY . .

EXPOSE 5000

CMD ["pnpm", "run", "start:dev"]