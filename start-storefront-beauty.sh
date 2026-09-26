#!/bin/sh
cd /server/apps/storefront-beauty

if [ -z "$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY" ]; then
  echo "=================================================================="
  echo "⚠️  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is empty for storefront-beauty."
  echo "Waiting for Medusa backend to finish migrations and seed..."
  echo "Checking again in 10 seconds..."
  echo "=================================================================="
  sleep 10
fi

echo "Starting Beauty Storefront development server on port 8001..."
pnpm dev
