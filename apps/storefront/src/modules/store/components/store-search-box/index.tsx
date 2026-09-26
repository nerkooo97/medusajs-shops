"use client"

import { MagnifyingGlass, XMarkMini } from "@medusajs/icons"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSearchBox } from "react-instantsearch"

const DEBOUNCE_MS = 250

/**
 * Free-text search over the listing, refining the same InstantSearch state the
 * sidebar filters do. The input is held locally so typing stays responsive
 * while the query itself is debounced.
 */
const StoreSearchBox = () => {
  const timer = useRef<number | undefined>(undefined)

  const queryHook = useCallback(
    (nextQuery: string, search: (value: string) => void) => {
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => search(nextQuery), DEBOUNCE_MS)
    },
    []
  )

  const { query, refine } = useSearchBox({ queryHook })
  const [inputValue, setInputValue] = useState(query)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Follow the query when it changes elsewhere — cleared with the filters, or
  // arriving from the URL on load, which `routing` restores after mount.
  useEffect(() => {
    setInputValue(query)
  }, [query])

  const clear = () => {
    window.clearTimeout(timer.current)
    setInputValue("")
    refine("")
  }

  return (
    <div className="mb-6 relative flex items-center w-full">
      <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-foreground">
        <MagnifyingGlass className="size-4" />
      </div>
      <input
        type="search"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value)
          refine(event.target.value)
        }}
        placeholder="Pretraži ponudu artikala..."
        aria-label="Pretraži proizvode"
        className="w-full bg-card border border-border/80 focus:border-[#0053E2] focus:ring-1 focus:ring-[#0053E2] rounded-xl pl-10 pr-10 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground shadow-2xs [&::-webkit-search-cancel-button]:hidden"
        data-testid="store-search-input"
      />
      {inputValue && (
        <button
          type="button"
          onClick={clear}
          aria-label="Očisti pretragu"
          className="absolute right-3.5 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
          data-testid="store-search-clear"
        >
          <XMarkMini className="size-4" />
        </button>
      )}
    </div>
  )
}

export default StoreSearchBox
