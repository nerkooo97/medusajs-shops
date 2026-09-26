"use client"

import type { Hit } from "instantsearch.js"
import { useEffect, useRef } from "react"
import { useHits, useInstantSearch } from "react-instantsearch"

import useSearchSettled from "@lib/hooks/use-search-settled"
import { priceAttribute } from "@lib/search-client"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@modules/common/components/ui"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import SearchPagination from "./pagination"
import HitPrice, { HitPricing } from "./price"
import StoreSortDropdown from "../store-sort-dropdown"

type ProductHit = Hit<
  {
    title: string | null
    handle: string | null
    thumbnail: string | null
  } & HitPricing
>

type StoreHitsProps = {
  hitsPerPage: number
  currencyCode: string
}

const StoreHits = ({ hitsPerPage, currencyCode }: StoreHitsProps) => {
  const { items } = useHits<ProductHit>()
  const { status, error, indexUiState } = useInstantSearch()
  const { isSearching, hasNoResultsYet } = useSearchSettled()

  const { page, ...refinements } = indexUiState
  const currentPage = page ?? 1
  const refinementKey = JSON.stringify(refinements)

  const settled = useRef({ page: currentPage, refinementKey })

  useEffect(() => {
    if (!isSearching) {
      settled.current = { page: currentPage, refinementKey }
    }
  }, [isSearching, currentPage, refinementKey])

  const isPagingOnly =
    refinementKey === settled.current.refinementKey &&
    currentPage !== settled.current.page

  const showSkeleton = hasNoResultsYet || (isSearching && isPagingOnly)

  if (status === "error") {
    return (
      <div className="py-16 text-center" data-testid="products-error">
        <Text className="text-ui-fg-error font-medium">
          Nije moguće učitati proizvode
          {error?.message ? `: ${error.message}` : "."}
        </Text>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Products Toolbar Header - Sort button on the right */}
      <div className="flex items-center justify-between gap-3 mb-4 w-full">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {!showSkeleton && items.length > 0 ? (
            <>
              Prikazano <span className="font-semibold text-foreground">{items.length}</span>{" "}
              {items.length === 1 ? "artikal" : "artikala"}
            </>
          ) : !showSkeleton ? (
            <span>Nema rezultata</span>
          ) : (
            <span className="inline-block w-24 h-4 bg-muted/50 rounded animate-pulse" />
          )}
        </p>
        <StoreSortDropdown currencyCode={currencyCode} />
      </div>

      {showSkeleton ? (
        <SkeletonProductGrid numberOfProducts={hitsPerPage} />
      ) : !items.length ? (
        <div className="py-20 text-center flex flex-col items-center justify-center bg-card border border-border/60 rounded-xl p-8 my-4" data-testid="no-products">
          <p className="text-base font-semibold text-foreground mb-1">
            Nijedan proizvod ne odgovara odabranim filterima
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Pokušajte prilagoditi kriterije pretrage ili poništite aktivne filtere.
          </p>
        </div>
      ) : (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 w-full"
          data-testid="products-list"
        >
          {items.map((hit) => {
            if (!hit.handle) return null
            const isOnSale = hit[priceAttribute("on_sale", currencyCode)] === true

            return (
              <li key={hit.objectID} className="flex">
                <LocalizedClientLink
                  href={`/products/${hit.handle}`}
                  className="group flex flex-col w-full bg-card rounded-xl border border-border/70 hover:border-[#0053E2]/50 hover:shadow-md transition-all duration-200 overflow-hidden p-3"
                >
                  <div data-testid="product-wrapper" className="flex flex-col flex-1 justify-between">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted/20 mb-3">
                      {isOnSale && (
                        <span className="absolute top-2 left-2 z-10 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                          Akcija
                        </span>
                      )}
                      <Thumbnail
                        thumbnail={hit.thumbnail}
                        size="square"
                        className="!p-0 !rounded-none !shadow-none !border-none !bg-transparent"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 justify-between">
                      <Text
                        className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-[#0053E2] transition-colors line-clamp-2"
                        data-testid="product-title"
                      >
                        {hit.title}
                      </Text>
                      <div className="pt-2 border-t border-border/40 mt-auto">
                        <HitPrice hit={hit} currencyCode={currencyCode} />
                      </div>
                    </div>
                  </div>
                </LocalizedClientLink>
              </li>
            )
          })}
        </ul>
      )}
      <SearchPagination />
    </div>
  )
}

export default StoreHits
