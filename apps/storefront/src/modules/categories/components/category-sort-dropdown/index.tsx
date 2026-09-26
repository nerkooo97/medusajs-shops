"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ArrowUpDown, Check, ChevronDown } from "lucide-react"
import { clx } from "@modules/common/components/ui"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const sortOptions: { value: SortOptions; label: string }[] = [
  { value: "created_at", label: "Najnovije" },
  { value: "price_asc", label: "Cijena: Najniža prvo" },
  { value: "price_desc", label: "Cijena: Najviša prvo" },
]

export default function CategorySortDropdown({
  sortBy = "created_at",
}: {
  sortBy?: SortOptions
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeOption =
    sortOptions.find((opt) => opt.value === sortBy) || sortOptions[0]

  const handleSelect = (value: SortOptions) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sortBy", value)
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clx(
          "inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-card border text-xs sm:text-sm font-medium transition-all shadow-2xs hover:border-[#0053E2]/50 hover:bg-muted/40",
          isOpen
            ? "border-[#0053E2] ring-1 ring-[#0053E2]/20 text-[#0053E2]"
            : "border-border/80 text-foreground"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sortiraj proizvode"
        title="Sortiraj proizvode"
        data-testid="category-sort-dropdown-trigger"
      >
        <div className="size-6 rounded-md bg-[#0053E2]/10 text-[#0053E2] flex items-center justify-center shrink-0">
          <ArrowUpDown className="size-3.5 stroke-[2.2]" />
        </div>
        <span className="font-medium text-foreground text-xs sm:text-sm">
          {activeOption?.label || "Najnovije"}
        </span>
        <ChevronDown
          className={clx(
            "size-3.5 text-muted-foreground transition-transform duration-200",
            {
              "rotate-180 text-foreground": isOpen,
            }
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Opcije sortiranja"
          className="absolute right-0 top-full mt-2 z-40 min-w-[200px] w-max max-w-[90vw] bg-card border border-border/80 rounded-xl shadow-lg p-1.5 animate-in fade-in zoom-in-95 duration-100"
          data-testid="category-sort-dropdown-menu"
        >
          <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 mb-1">
            Sortiraj po
          </div>
          <div className="flex flex-col gap-0.5">
            {sortOptions.map((item) => {
              const isSelected = item.value === sortBy
              return (
                <button
                  key={item.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item.value)}
                  className={clx(
                    "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left",
                    isSelected
                      ? "bg-[#0053E2]/10 text-[#0053E2] font-semibold"
                      : "text-foreground hover:bg-muted/70 hover:text-[#0053E2]"
                  )}
                >
                  <span>{item.label}</span>
                  {isSelected && (
                    <Check className="size-3.5 text-[#0053E2] shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
