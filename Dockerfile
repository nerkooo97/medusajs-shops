FROM node:20-alpine

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate

WORKDIR /server

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/storefront/package.json ./apps/storefront/
COPY apps/storefront-beauty/package.json ./apps/storefront-beauty/

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 9000 5173 8000 8001

ENTRYPOINT ["./start.sh"]