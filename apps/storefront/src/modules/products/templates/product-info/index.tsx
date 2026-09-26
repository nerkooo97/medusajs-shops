"use client"

import React, { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Mail, Share2, Check } from "lucide-react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

// Inline SVGs for social sharing
const FacebookIcon = () => (
  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const TwitterIcon = () => (
  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const CommunityIcon = () => (
  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

export default function ProductInfo({ product }: ProductInfoProps) {
  const [copied, setCopied] = useState(false)

  const defaultVariant = product.variants?.[0]
  const brand = product.collection?.title || (product.metadata?.brand as string)
  const sku = defaultVariant?.sku || (product.metadata?.sku as string)
  const inStock = defaultVariant?.manage_inventory
    ? (defaultVariant.inventory_quantity || 0) > 0
    : true

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Only construct summary specs from real properties present in the DB
  const summaryParts: string[] = []
  if (product.type?.value) {
    summaryParts.push(`Tip: ${product.type.value}`)
  }
  if (sku) {
    summaryParts.push(`Model: ${sku}`)
  }
  if (product.metadata?.color) {
    summaryParts.push(`Boja: ${product.metadata.color}`)
  }
  if (product.length && product.width) {
    summaryParts.push(`Dimenzije: ${product.length} x ${product.width} cm`)
  }
  if (product.material) {
    summaryParts.push(`Materijal: ${product.material}`)
  }
  const summaryText = summaryParts.join("; ")

  return (
    <div id="product-info" className="flex flex-col gap-y-2.5 w-full">
      {/* 1. Brand name - ONLY if exists in database */}
      {brand && (
        <div>
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-primary">
            {brand}
          </span>
        </div>
      )}

      {/* 2. Product Title */}
      <h1
        className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {/* 3. SKU & Stock status row */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-0.5">
        {sku && (
          <>
            <span>
              Šifra artikla: <strong className="text-foreground font-semibold">{sku}</strong>
            </span>
            <span className="text-border">|</span>
          </>
        )}
        <span className="flex items-center gap-1.5">
          Stanje:{" "}
          {inStock ? (
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              Dostupno <span className="size-2 rounded-full bg-emerald-500 inline-block" />
            </span>
          ) : (
            <span className="font-semibold text-rose-600 flex items-center gap-1.5">
              Rasprodano <span className="size-2 rounded-full bg-rose-500 inline-block" />
            </span>
          )}
        </span>
      </div>

      {/* 4. Social Share Circles */}
      <div className="flex items-center gap-2 pt-1 pb-1">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Podijeli na Facebooku"
          className="size-7 rounded-full border border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/40 flex items-center justify-center transition-colors"
        >
          <FacebookIcon />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Podijeli na Twitteru / X"
          className="size-7 rounded-full border border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/40 flex items-center justify-center transition-colors"
        >
          <TwitterIcon />
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            handleShare()
          }}
          aria-label="Zajednica i forum"
          className="size-7 rounded-full border border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/40 flex items-center justify-center transition-colors"
        >
          <CommunityIcon />
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(product.title)}&body=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
          aria-label="Podijeli putem Emaila"
          className="size-7 rounded-full border border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/40 flex items-center justify-center transition-colors"
        >
          <Mail className="size-3.5" />
        </a>
        <button
          type="button"
          onClick={handleShare}
          title="Kopiraj link"
          className="size-7 rounded-full border border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/40 flex items-center justify-center transition-colors cursor-pointer ml-1"
        >
          {copied ? <Check className="size-3.5 text-emerald-600" /> : <Share2 className="size-3.5" />}
        </button>
      </div>

      {/* 5. Summary snippet (only real data) + Opširnije link */}
      {(summaryText || product.description) && (
        <div className="text-xs text-foreground/80 leading-relaxed pt-1">
          <p className="line-clamp-2">
            {summaryText || product.description}
          </p>
          <a
            href="#product-specs-tabs"
            className="inline-block mt-1 font-semibold text-primary hover:underline text-xs"
          >
            Opširnije
          </a>
        </div>
      )}
    </div>
  )
}
