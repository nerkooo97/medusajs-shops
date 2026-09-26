"use client"

import type { SearchClient } from "instantsearch.js"
import { Configure, InstantSearch } from "react-instantsearch"

import { PRODUCT_INDEX_NAME, searchClient } from "@lib/search-client"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import StoreHits from "@modules/store/components/store-hits"
import StoreRefinements from "@modules/store/components/store-refinements"
import { ChevronRight } from "lucide-react"

const PRODUCT_LIMIT = 12

const StoreTemplate = ({ currencyCode }: { currencyCode: string }) => {
  return (
    <div className="py-6 sm:py-8 content-container" data-testid="category-container">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <LocalizedClientLink href="/" className="hover:text-foreground transition-colors">
          Naslovna
        </LocalizedClientLink>
        <ChevronRight className="size-3.5 text-muted-foreground/60" />
        <span className="text-foreground font-medium">Svi proizvodi</span>
      </nav>

      {/* Page Title & Description */}
      <div className="mb-6 sm:mb-8 pb-4 border-b border-border/60">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground" data-testid="store-page-title">
          Svi proizvodi
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-2xl">
          Istražite našu cjelokupnu ponudu alata, mašina i profesionalne opreme uz brzu dostavu i garanciju.
        </p>
      </div>

      <div className="flex flex-col small:flex-row small:items-start gap-2">
        <InstantSearch
          indexName={PRODUCT_INDEX_NAME}
          searchClient={searchClient as unknown as SearchClient}
          routing
          future={{ preserveSharedStateOnUnmount: true }}
        >
          <Configure hitsPerPage={PRODUCT_LIMIT} />
          <StoreRefinements currencyCode={currencyCode} />
          <div className="w-full min-w-0">
            <StoreHits
              hitsPerPage={PRODUCT_LIMIT}
              currencyCode={currencyCode}
            />
          </div>
        </InstantSearch>
      </div>
    </div>
  )
}

export default StoreTemplate
