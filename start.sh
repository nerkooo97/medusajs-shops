#!/bin/sh
cd /server/apps/backend

echo "Running database migrations..."
pnpm exec medusa db:migrate

echo "Creating default admin user if not exists..."
pnpm exec medusa user -e admin@test.com -p supersecret || true

echo "Starting Medusa development server on 0.0.0.0:9000..."
pnpm exec medusa develop -H 0.0.0.0 -p 9000