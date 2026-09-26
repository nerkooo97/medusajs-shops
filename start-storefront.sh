#!/bin/sh
cd /server/apps/storefront

if [ -z "$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY" ]; then
  echo "=================================================================="
  echo "⚠️  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is empty."
  echo "Waiting for Medusa backend to finish migrations and seed..."
  echo "Checking again in 10 seconds..."
  echo "=================================================================="
  sleep 10
fi

export HOSTNAME="0.0.0.0"
echo "Starting Next.js Starter Storefront development server on 0.0.0.0:8000..."
pnpm exec next dev -H 0.0.0.0 -p 8000