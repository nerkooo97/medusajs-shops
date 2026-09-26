#!/bin/sh
set -e

# Export default Docker network environment variables
export DATABASE_URL="${DATABASE_URL:-postgres://postgres:postgres@postgres:5432/medusa-store}"
export REDIS_URL="${REDIS_URL:-redis://redis:6379}"
export JWT_SECRET="${JWT_SECRET:-supersecret}"
export COOKIE_SECRET="${COOKIE_SECRET:-supersecret}"
export NODE_ENV="development"

echo "=========================================================="
echo "🌱 Pokretanje Brze Seed skripte za MedusaJS..."
echo "🔌 Povezivanje na bazu: $DATABASE_URL"
echo "=========================================================="

# Prebaci se u backend direktorij
if [ -d "/server/apps/backend" ]; then
  cd /server/apps/backend
elif [ -d "apps/backend" ]; then
  cd apps/backend
fi

# Osiguraj da backend ima .env sa tačnim adresama Docker servisa
if [ ! -f ".env" ] || ! grep -q "DATABASE_URL" .env; then
  echo "DATABASE_URL=$DATABASE_URL" > .env
  echo "REDIS_URL=$REDIS_URL" >> .env
  echo "JWT_SECRET=$JWT_SECRET" >> .env
  echo "COOKIE_SECRET=$COOKIE_SECRET" >> .env
fi

echo "1/5 🌍 Inicijalizacija regija (Europe, DK, BA), valuta (EUR, BAM) i skladišta..."
npx medusa exec ./src/migration-scripts/initial-data-seed.ts || true

echo "2/5 🏪 Postavljanje prodajnih kanala (Alati & Šminka), Publishable ključeva i artikala..."
npx medusa exec ./src/scripts/setup-multichannel.ts

echo "3/5 📂 Postavljanje strukture kategorija (Alati & Šminka)..."
npx medusa exec ./src/scripts/setup-categories.ts

echo "4/5 ✨ Postavljanje Lucide ikonica za kategorije..."
npx medusa exec ./src/scripts/seed-category-icons.ts

echo "5/5 📦 Postavljanje skladišta i zaliha (Inventory)..."
npx medusa exec ./src/scripts/setup-inventory-and-groups.ts

echo "=========================================================="
echo "🎉 SEED USPEŠNO ZAVRŠEN!"
echo "Baza podataka je inicijalizovana i spremna za rad."
echo "=========================================================="
