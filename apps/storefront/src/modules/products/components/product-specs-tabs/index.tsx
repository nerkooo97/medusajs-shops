"use client"

import React, { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Star, Truck, RefreshCcw, CreditCard, ShieldCheck } from "lucide-react"

type ProductSpecsTabsProps = {
  product: HttpTypes.StoreProduct
}

export default function ProductSpecsTabs({ product }: ProductSpecsTabsProps) {
  const [activeTab, setActiveTab] = useState<"opis" | "recenzije" | "placanje" | "dostava" | "povrat">("opis")

  const defaultVariant = product.variants?.[0]

  // Only extract real attributes that exist in the database
  const specs: { label: string; value: string }[] = []

  const brand = product.collection?.title || (product.metadata?.brand as string)
  if (brand) {
    specs.push({ label: "Brand", value: brand })
  }

  const barcode = (defaultVariant?.barcode as string) || (product.metadata?.barcode as string)
  if (barcode) {
    specs.push({ label: "Bar kod", value: barcode })
  }

  if (product.type?.value) {
    specs.push({ label: "Tip proizvoda", value: product.type.value })
  }

  const sku = defaultVariant?.sku || (product.metadata?.sku as string)
  if (sku) {
    specs.push({ label: "Model / Šifra", value: sku })
  }

  const color = product.metadata?.color as string
  if (color) {
    specs.push({ label: "Boja", value: color })
  }

  if (product.weight) {
    specs.push({ label: "Težina", value: `${product.weight} kg` })
  }

  if (product.length && product.width) {
    specs.push({
      label: "Dimenzije",
      value: `${product.length} x ${product.width}${product.height ? ` x ${product.height}` : ""} cm`,
    })
  }

  if (product.material) {
    specs.push({ label: "Materijal", value: product.material })
  }

  if (product.origin_country) {
    specs.push({ label: "Zemlja porijekla", value: product.origin_country.toUpperCase() })
  }

  if (product.metadata?.warranty) {
    specs.push({ label: "Garancija", value: String(product.metadata.warranty) })
  }

  // Any other string metadata attributes
  if (product.metadata) {
    const knownKeys = ["brand", "barcode", "sku", "color", "dimensions", "weight", "material", "origin", "warranty"]
    Object.entries(product.metadata).forEach(([k, v]) => {
      if (typeof v === "string" && !knownKeys.includes(k.toLowerCase()) && v.trim()) {
        const formattedLabel = k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        specs.push({ label: formattedLabel, value: v })
      }
    })
  }

  return (
    <div id="product-specs-tabs" className="mt-8 pt-2 w-full">
      {/* Tab Navigation Header */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-border overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab("opis")}
          className={`pb-3 text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "opis"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Opis
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("recenzije")}
          className={`pb-3 text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "recenzije"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Recenzije
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("placanje")}
          className={`pb-3 text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "placanje"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Načini plaćanja
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("dostava")}
          className={`pb-3 text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "dostava"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Dostava
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("povrat")}
          className={`pb-3 text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "povrat"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Povrat
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="py-6">
        {activeTab === "opis" && (
          <div className="space-y-4">
            {/* Key-Value Specs Table - ONLY Real Attributes */}
            {specs.length > 0 && (
              <div className="space-y-2 text-xs sm:text-sm">
                {specs.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 py-1.5 border-b border-border/40">
                    <span className="col-span-4 sm:col-span-3 font-bold text-foreground">{item.label}</span>
                    <span className="col-span-8 sm:col-span-9 text-foreground/90 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Description from Database */}
            {product.description ? (
              <div className={`text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line ${specs.length > 0 ? "pt-4" : ""}`}>
                {specs.length > 0 && <h4 className="font-bold text-foreground mb-2">Detaljan opis:</h4>}
                <p>{product.description}</p>
              </div>
            ) : specs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nema dodatnih specifikacija za ovaj proizvod.</p>
            ) : null}
          </div>
        )}

        {activeTab === "recenzije" && (
          <div className="py-8 text-center space-y-3">
            <div className="flex items-center justify-center gap-1 text-muted-foreground/30">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-5" />
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground">Još nema recenzija za ovaj proizvod.</p>
            <p className="text-xs text-muted-foreground">Budite prvi koji će ocijeniti ovaj proizvod nakon kupovine.</p>
          </div>
        )}

        {activeTab === "placanje" && (
          <div className="space-y-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <CreditCard className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-foreground">Plaćanje pouzećem (gotovinom kuriru)</h4>
                <p className="mt-1">Plaćanje se vrši gotovinom dostavljaču prilikom preuzimanja narudžbe na vašoj adresi.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-foreground">Kartično plaćanje i rate</h4>
                <p className="mt-1">Mogućnost plaćanja na rate bez kamata za podržane kartice vodećih banaka.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dostava" && (
          <div className="space-y-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Truck className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-foreground">Dostava brzom poštom širom Bosne i Hercegovine</h4>
                <p className="mt-1">Rok isporuke je 24 do 48 radnih sati. Cijena dostave iznosi 12,00 KM po narudžbi. Za sve narudžbe u vrijednosti preko 100,00 KM dostava je besplatna.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "povrat" && (
          <div className="space-y-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <RefreshCcw className="size-primary shrink-0 mt-0.5 text-primary" />
              <div>
                <h4 className="font-bold text-foreground">Povrat robe unutar 15 dana</h4>
                <p className="mt-1">Kupac ima pravo na jednostavan povrat robe unutar 15 dana od prijema, ukoliko je proizvod nekorišten, u originalnoj ambalaži sa priloženim računom.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
