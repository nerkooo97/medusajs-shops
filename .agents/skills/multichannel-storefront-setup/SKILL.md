---
name: multichannel-storefront-setup
description: Vodič i standardizovani postupak za kreiranje i postavljanje novog frontend storefronta (Next.js) i njegovo povezivanje sa Medusa v2 prodajnim kanalom (Sales Channel). Koristi kada korisnik želi dodati novu prodavnicu (npr. auto dijelovi, elektronika), kreirati novi prodajni kanal, povezati Publishable API Key, konfigurisati kategorije sa Lucide ikonicama i povezati skladišta.
---

# Postavljanje Novog Storefronta i Povezivanje sa Prodajnim Kanalom

Ovaj skill pruža kompletan vodič korak-po-korak za dodavanje novog frontend web shopa u monorepo i njegovo potpuno povezivanje sa Medusa v2 backendom.

---

## Arhitektura Multi-Storefront Sistema

Medusa v2 koristi **Multichannel** arhitekturu:
1. **Sales Channel (Prodajni kanal):** Svaka prodavnica ima svoj prodajni kanal (npr. `alati`, `sminka`, `auto`).
2. **Publishable API Key:** Svaki frontend posjeduje svoj javni API ključ koji je u bazi povezan isključivo sa tim prodajnim kanalom. Medusa automatski filtrira proizvode na osnovu poslanog ključa u headeru (`x-publishable-api-key`).
3. **Stock Locations (Magacini):** Svaki prodajni kanal mora biti povezan sa najmanje jednim skladištem kako artikli ne bi imali status "Out of stock".
4. **Kategorije i Ikonice:** Svaka prodavnica ima svoju korijensku kategoriju i podkategorije sa metapodacima (`metadata: { channel: string, icon: string }`).
5. **Centralna Konfiguracija:** Svi podaci o prodavnicama, kategorijama, Lucide ikonama i brendingu nalaze se na jednom mjestu u `packages/shop-config/src/index.ts` i `apps/backend/src/config/shops.ts`.

---

## KORAK 1: Definisanje Novog Shopa u Centralnoj Konfiguraciji

Prvi korak je dodavanje definicije nove trgovine u centralni registar.

U datotekama:
- `packages/shop-config/src/index.ts`
- `apps/backend/src/config/shops.ts`

Dodajte novu definiciju (primjer za Auto dijelove):

```typescript
export const AUTO_SHOP: ShopConfig = {
  id: "auto",
  name: "Auto Dijelovi",
  channel: {
    name: "Auto Dijelovi Shop",
    handle: "auto",
    description: "Prodajni kanal za auto dijelove, ulja i opremu",
  },
  rootCategory: {
    name: "Auto Oprema i Dijelovi",
    handle: "auto-oprema",
  },
  categories: [
    { name: "Motorna ulja i Maziva", handle: "motorna-ulja", icon: "Fuel" },
    { name: "Kočioni sistemi", handle: "kocioni-sistemi", icon: "Disc" },
    { name: "Autokozmetika", handle: "autokozmetika", icon: "Sparkles" },
    { name: "Akumulatori i Struja", handle: "akumulatori", icon: "BatteryCharging" },
    { name: "Filteri i Svjećice", handle: "filteri-svjecice", icon: "Sliders" },
  ],
  branding: {
    logoText: "AUTOPARTS",
    subnavLabel: "Kategorije auto dijelova",
    livePromo: {
      title: "Auto Oprema",
      badge: "Akcija",
      link: "/store",
    },
    dealsLabel: "Top Ponude",
  },
  defaultPort: 8002,
}

// Obavezno registrovati u SHOPS objektu:
export const SHOPS: Record<string, ShopConfig> = {
  alati: ALATI_SHOP,
  sminka: SMINKA_SHOP,
  auto: AUTO_SHOP, // <-- Novi shop
}
```

> [!IMPORTANT]
> Nazivi ikonica u polju `icon` moraju biti tačni nazivi iz biblioteke `lucide-react` (npr. `Fuel`, `Disc`, `BatteryCharging`, `Wrench`, `Sparkles`).

---

## KORAK 2: Kreiranje Kanala, Ključa i Kategorija na Medusa Backend-u

### Opcija A: Automatizovano kroz skripte (Preporučeno)

1. **Kreiranje kanala, Publishable API ključa i dodjela skladišta:**
   U `apps/backend/src/scripts/setup-multichannel.ts`, dodajte kreiranje kanala za novi shop ili pokrenite:
   ```bash
   docker exec -w /server/apps/backend medusa_backend npx medusa exec ./src/scripts/setup-multichannel.ts
   ```
   *Skripta će ispisati novogenerisani Publishable API Key token (npr. `pk_xxxx`). Sačuvajte taj token za `.env` fajl!*

2. **Kreiranje kategorija i postavljanje Lucide ikonica:**
   Pokrenite skriptu koja automatski čita sve shopove iz `shops.ts`:
   ```bash
   docker exec -w /server/apps/backend medusa_backend npx medusa exec ./src/scripts/setup-categories.ts
   docker exec -w /server/apps/backend medusa_backend npx medusa exec ./src/scripts/seed-category-icons.ts
   ```

### Opcija B: Ručno kroz Medusa Admin Dashboard (`http://localhost:9000/app`)

1. **Kreiranje prodajnog kanala:**
   - Idite na **Settings -> Sales Channels** -> kliknite **Add Channel**.
   - Naziv: `Auto Dijelovi Shop`, Handle: `auto`.
2. **Povezivanje skladišta sa kanalom:**
   - Idite na **Settings -> Locations** -> kliknite na lokaciju (npr. Centralno Skladište Sarajevo).
   - Pod **Sales Channels** kliknite **Add** i izaberite novi kanal `Auto Dijelovi Shop`.
   - *Bez ovoga, svi artikli će na novom frontendu imati status "Out of stock"!*
3. **Kreiranje Publishable API ključa:**
   - Idite na **Settings -> Publishable API Keys** -> kliknite **Create API Key**.
   - Naziv: `Auto Storefront Key`.
   - Kada se kreira, otvorite ključ i pod **Sales Channels** dodijelite `Auto Dijelovi Shop`.
   - Kopirajte generisani token (npr. `pk_01J...`).
4. **Kreiranje kategorija i ikonica:**
   - Idite na **Products -> Categories**.
   - Kreirajte korijensku kategoriju (npr. `Auto Oprema i Dijelovi`).
   - Kreirajte podkategorije i u widgetu **Ikonica Kategorije (lucide-react)** unesite tačan naziv ikonice i kliknite **Sačuvaj ikonicu**.

---

## KORAK 3: Kreiranje Novog Storefront Frontend Projekta

1. **Kopirajte postojeći storefront kao bazu:**
   ```bash
   cp -r apps/storefront apps/storefront-auto
   # Očistite privremene cache foldere
   rm -rf apps/storefront-auto/.next apps/storefront-auto/node_modules
   ```

2. **Prilagodite `apps/storefront-auto/package.json`:**
   ```json
   {
     "name": "@dtc/storefront-auto",
     "version": "1.0.0",
     "scripts": {
       "dev": "next dev --turbopack -p 8002",
       "build": "next build",
       "start": "next start -p 8002"
     }
   }
   ```

3. **Prilagodite `apps/storefront-auto/src/config/shop.ts`:**
   Postavite podrazumijevani ID shopa za ovaj frontend:
   ```typescript
   const currentShopId = process.env.NEXT_PUBLIC_SHOP_ID || "auto"
   export const activeShop: ShopConfig = SHOPS[currentShopId] || SHOPS.auto
   ```

4. **Konfigurišite `.env` fajl (`apps/storefront-auto/.env`):**
   ```env
   # Medusa Backend URL
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
   MEDUSA_BACKEND_URL=http://localhost:9000

   # Publishable API Key dobijen u Koraku 2
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_vash_generisani_token_za_novi_kanal

   # Identifikator i kanal za filtriranje kategorija
   NEXT_PUBLIC_SHOP_ID=auto
   NEXT_PUBLIC_STORE_CATEGORY_CHANNEL=auto

   PORT=8002
   ```

---

## KORAK 4: Dodavanje u Docker i Skripte za Pokretanje

1. **Kreirajte skriptu za pokretanje (`start-storefront-auto.sh` u rootu):**
   ```bash
   #!/bin/sh
   cd /server/apps/storefront-auto
   pnpm run dev
   ```
   Postavite izvršna prava:
   ```bash
   chmod +x start-storefront-auto.sh
   ```

2. **Dodajte novi servis u `docker-compose.yml` (ako koristite Docker):**
   ```yaml
   storefront_auto:
     build: .
     container_name: medusa_storefront_auto
     restart: unless-stopped
     depends_on:
       - medusa
     ports:
       - "8002:8002"
     environment:
       - MEDUSA_BACKEND_URL=http://medusa:9000
       - NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
     env_file:
       - apps/storefront-auto/.env
     volumes:
       - .:/server
       - /server/node_modules
       - /server/apps/storefront-auto/node_modules
       - /server/apps/storefront-auto/.next
     entrypoint: ["./start-storefront-auto.sh"]
     networks:
       - medusa_network
   ```

---

## KORAK 5: Provjera i Testiranje (Checklist)

Nakon što pokrenete novi frontend (npr. `pnpm --filter @dtc/storefront-auto dev` na portu `8002`):

1. **Provjera API ključa putem curl komande:**
   ```bash
   curl -H "x-publishable-api-key: pk_vash_token" http://localhost:9000/store/products
   ```
   *U odgovoru moraju biti vraćeni samo artikli koji pripadaju novom prodajnom kanalu.*

2. **Provjera u browseru:**
   - Otvorite `http://localhost:8002/dk` (ili odgovarajući region).
   - U navigaciji provjerite:
     - Da li se u logou prikazuje tekst brenda iz konfiguracije (npr. `AUTOPARTS`).
     - Da li "Sve kategorije" i subnav prikazuju samo kategorije novog shopa.
     - Da li svaka kategorija ima svoju specifičnu Lucide ikonicu.
     - Da li klik na proizvod prikazuje dostupnost zaliha (nije "Out of stock").

---

## Najčešći Problemi i Rješenja (Troubleshooting)

### 1. "Out of stock" poruka na proizvodima
- **Uzrok:** Novi prodajni kanal nije povezan sa skladištem (Stock Location) u kojem se nalaze zalihe.
- **Rješenje:** U Adminu otvorite **Settings -> Locations -> Centralno Skladište -> Sales Channels** i dodajte novi prodajni kanal.

### 2. Prikazuju se kategorije drugog shopa
- **Uzrok:** U `.env` novog frontenda nije postavljen `NEXT_PUBLIC_SHOP_ID` ili `NEXT_PUBLIC_STORE_CATEGORY_CHANNEL`.
- **Rješenje:** Provjerite `.env` fajl i ponovo pokrenite frontend dev server.

### 3. Greška 401 Unauthorized u konzoli
- **Uzrok:** `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` je nevažeći ili prodajni kanal nije dodijeljen tom ključu u Medusa Adminu.
- **Rješenje:** U Adminu otvorite **Settings -> Publishable API Keys**, provjerite ključ i osigurajte da je vaš prodajni kanal označen pod **Sales Channels**.

### 4. Ikonica kategorije se ne prikazuje
- **Uzrok:** Naziv ikonice u `metadata.icon` ne odgovara tačno PascalCase nazivu u biblioteci `lucide-react` (npr. uneseno `wrench` umjesto `Wrench`).
- **Rješenje:** U Adminu otvorite kategoriju, provjerite ikonicu u widgetu i sačuvajte validan Lucide naziv.
