#!/bin/sh
set -e

cd /server/apps/backend

echo "Waiting for PostgreSQL at postgres:5432..."
until nc -z -w 3 postgres 5432; do
  echo "PostgreSQL is not ready yet - waiting 2 seconds..."
  sleep 2
done
echo "PostgreSQL connection confirmed!"

echo "Running database migrations..."
pnpm exec medusa db:migrate

echo "Creating default admin user if not exists..."
pnpm exec medusa user -e admin@test.com -p supersecret || true

echo "Starting Medusa development server on 0.0.0.0:9000..."
exec pnpm exec medusa develop -H 0.0.0.0 -p 9000