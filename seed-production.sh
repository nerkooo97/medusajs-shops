#!/bin/sh
set -e

echo "=========================================================="
echo "🌱 Pokretanje Seed skripte za MedusaJS..."
echo "=========================================================="

# Ako se skripta pokreće sa VPS hosta a Docker je aktivan:
if [ ! -f "/server/apps/backend/medusa-config.ts" ] && command -v docker >/dev/null 2>&1 && docker ps 2>/dev/null | grep -q medusa_backend; then
  echo "📦 Pokretanje skripti unutar kontejnera medusa_backend..."
  docker exec -it -w /server/apps/backend medusa_backend npx medusa exec ./src/migration-scripts/initial-data-seed.ts
  docker exec -it -w /server/apps/backend medusa_backend npx medusa exec ./src/scripts/setup-multichannel.ts
  docker exec -it -w /server/apps/backend medusa_backend npx medusa exec ./src/scripts/setup-categories.ts
  docker exec -it -w /server/apps/backend medusa_backend npx medusa exec ./src/scripts/seed-category-icons.ts
  docker exec -it -w /server/apps/backend medusa_backend npx medusa exec ./src/scripts/setup-inventory-and-groups.ts
  docker exec -it -w /server/apps/backend medusa_backend npx medusa exec ./src/scripts/seed-demo-products.ts
  echo "=========================================================="
  echo "🎉 SEED USPEŠNO ZAVRŠEN NA PRODUKCIJI!"
  echo "=========================================================="
  exit 0
fi

# Pokretanje direktno u direktoriju backenda (unutar kontejnera ili lokalno)
if [ -d "/server/apps/backend" ]; then
  cd /server/apps/backend
elif [ -d "apps/backend" ]; then
  cd apps/backend
fi

echo "1/6 🌍 Inicijalizacija regija, valuta, poreza i podrazumijevanog skladišta..."
npx medusa exec ./src/migration-scripts/initial-data-seed.ts

echo "2/6 🏪 Postavljanje prodajnih kanala (Alati & Šminka) i Publishable API ključeva..."
npx medusa exec ./src/scripts/setup-multichannel.ts

echo "3/6 📂 Postavljanje kategorija (Alati i Šminka)..."
npx medusa exec ./src/scripts/setup-categories.ts

echo "4/6 ✨ Postavljanje Lucide ikonica za kategorije..."
npx medusa exec ./src/scripts/seed-category-icons.ts

echo "5/6 📦 Postavljanje skladišta i zaliha (Inventory)..."
npx medusa exec ./src/scripts/setup-inventory-and-groups.ts

echo "6/6 🛒 Dodavanje demo proizvoda za katalog..."
npx medusa exec ./src/scripts/seed-demo-products.ts

echo "=========================================================="
echo "🎉 SEED USPEŠNO ZAVRŠEN!"
echo "=========================================================="
