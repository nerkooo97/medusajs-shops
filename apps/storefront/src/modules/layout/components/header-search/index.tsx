"use client"

import { Sparkles, Search as SearchIcon } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { SearchClient } from "instantsearch.js"
import {
  Configure,
  InstantSearch,
  useHits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch"

import useSearchSettled from "@lib/hooks/use-search-settled"
import useToggleState from "@lib/hooks/use-toggle-state"
import { PRODUCT_INDEX_NAME, searchClient } from "@lib/search-client"
import { Text } from "@modules/common/components/ui"
import SearchDrawer from "../search/drawer"
import SearchHit, { ProductHit } from "../search/hit"

const HITS_PER_PAGE = 12
const DEBOUNCE_MS = 250

const SearchPanel = ({ onNavigate }: { onNavigate: () => void }) => {
  const timer = useRef<number | undefined>(undefined)

  const queryHook = useCallback(
    (nextQuery: string, search: (value: string) => void) => {
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => search(nextQuery), DEBOUNCE_MS)
    },
    []
  )

  const { query, refine } = useSearchBox({ queryHook })
  const { items } = useHits<ProductHit>()
  const { status, error } = useInstantSearch()
  const { isSettled } = useSearchSettled()

  const [inputValue, setInputValue] = useState(query)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const hasInput = Boolean(inputValue.trim())
  const isPending = inputValue.trim() !== query.trim()
  const hasResults = Boolean(query.trim()) && items.length > 0

  return (
    <>
      <div className="flex items-center gap-x-3 border-b border-border px-4">
        <SearchIcon className="size-5 shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value)
            refine(event.target.value)
          }}
          placeholder="Pretraži proizvode, brendove ili kategorije..."
          aria-label="Search products"
          autoFocus
          className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          data-testid="search-input"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {!hasInput ? (
          <Text className="px-4 py-6 text-center text-muted-foreground" data-testid="search-empty">
            Upišite pojam za pretragu proizvoda.
          </Text>
        ) : status === "error" ? (
          <Text className="px-4 py-6 text-center text-destructive" data-testid="search-error">
            Greška pri pretrazi{error?.message ? `: ${error.message}` : "."}
          </Text>
        ) : !isSettled ? (
          <Text className="px-4 py-6 text-center text-muted-foreground" data-testid="search-loading">
            Pretražujem&hellip;
          </Text>
        ) : hasResults ? (
          <ul className="py-2" data-testid="search-results">
            {items.map((hit) => (
              <SearchHit key={hit.objectID} hit={hit} onNavigate={onNavigate} />
            ))}
          </ul>
        ) : isPending || !query.trim() ? (
          <Text className="px-4 py-6 text-center text-muted-foreground" data-testid="search-loading">
            Pretražujem&hellip;
          </Text>
        ) : (
          <Text className="px-4 py-6 text-center text-muted-foreground" data-testid="search-no-results">
            Nema rezultata za &quot;{query}&quot;
          </Text>
        )}
      </div>
    </>
  )
}

export default function HeaderSearch() {
  const { state: isOpen, open, close } = useToggleState()

  return (
    <div className="flex items-center ml-auto md:ml-0 md:flex-1 md:max-w-2xl md:mx-4">
      {/* Mobile Search Icon Trigger (visible only on mobile) */}
      <button
        type="button"
        onClick={open}
        aria-label="Pretraži proizvode"
        className="flex md:hidden items-center justify-center p-2 rounded-lg text-white hover:bg-white/15 transition-colors cursor-pointer"
        data-testid="nav-mobile-search-button"
      >
        <SearchIcon className="size-6 text-white stroke-[2]" />
      </button>

      {/* Desktop Search Input Pill (hidden on mobile, visible on md and up) */}
      <div
        onClick={open}
        className="hidden md:flex group relative items-center w-full h-11 bg-white hover:bg-white/95 border-0 rounded-full px-4 cursor-pointer transition-all duration-200 shadow-xs"
      >
        {/* Search Icon */}
        <div className="flex items-center justify-center mr-2.5 text-muted-foreground">
          <SearchIcon className="size-4 text-muted-foreground" />
        </div>

        {/* Placeholder text */}
        <span className="flex-1 text-sm text-muted-foreground select-none truncate">
          Pretraži proizvode, brendove ili kategorije...
        </span>

        {/* Circular Search Button */}
        <button
          type="button"
          aria-label="Search"
          className="size-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shrink-0 transition-colors shadow-xs ml-2 cursor-pointer"
        >
          <SearchIcon className="size-4 stroke-[2.2]" />
        </button>
      </div>

      {/* InstantSearch Modal Drawer */}
      <SearchDrawer isOpen={isOpen} close={close}>
        <InstantSearch
          indexName={PRODUCT_INDEX_NAME}
          searchClient={searchClient as unknown as SearchClient}
          future={{ preserveSharedStateOnUnmount: true }}
        >
          <Configure hitsPerPage={HITS_PER_PAGE} />
          <SearchPanel onNavigate={close} />
        </InstantSearch>
      </SearchDrawer>
    </div>
  )
}
