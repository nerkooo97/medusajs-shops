"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { SlidersHorizontal, ChevronDown } from "lucide-react"
import { clx } from "@modules/common/components/ui"

import {
  OPTION_VALUE_QUERY_KEY,
  parseOptionValueIds,
} from "@lib/util/product-option-filters"
import OptionsPicker from "./options-picker"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  hideOptionsPicker?: boolean
  "data-testid"?: string
}

const RefinementList = ({
  sortBy,
  hideOptionsPicker = false,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQueryParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString())
      updater(params)

      params.delete("page")

      const queryString = params.toString()
      const currentQuery = searchParams.toString()
      const nextPath = queryString ? `${pathname}?${queryString}` : pathname
      const currentPath = currentQuery
        ? `${pathname}?${currentQuery}`
        : pathname

      if (nextPath !== currentPath) {
        router.push(nextPath)
      }
    },
    [pathname, router, searchParams]
  )

  const setQueryParams = (name: string, value: string) =>
    updateQueryParams((params) => params.set(name, value))

  const selectedOptionValueIds = useMemo(
    () => parseOptionValueIds(searchParams),
    [searchParams]
  )

  const setOptionValueIds = (valueIds: string[]) =>
    updateQueryParams((params) => {
      params.delete(OPTION_VALUE_QUERY_KEY)
      valueIds.forEach((valueId) =>
        params.append(OPTION_VALUE_QUERY_KEY, valueId)
      )
    })

  const [isOpenMobile, setIsOpenMobile] = useState(false)
  const activeCount = selectedOptionValueIds.length

  return (
    <div className="w-full small:w-[260px] small:shrink-0 small:mr-8 mb-6 small:mb-8">
      {/* Mobile Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpenMobile((prev) => !prev)}
        className="small:hidden flex items-center justify-between w-full p-3.5 bg-card border border-border/80 rounded-xl text-sm font-semibold text-foreground shadow-2xs hover:border-[#0053E2]/50 transition-all active:scale-[0.99]"
        aria-expanded={isOpenMobile}
        aria-label="Filteri i opcije sortiranja"
      >
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-[#0053E2]/10 text-[#0053E2] flex items-center justify-center">
            <SlidersHorizontal className="size-4" />
          </div>
          <span className="font-semibold">Filteri i sortiranje</span>
          {activeCount > 0 && (
            <span className="size-5 rounded-full bg-[#0053E2] text-white text-[11px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-normal">
          <span>{isOpenMobile ? "Sakrij" : "Prikaži"}</span>
          <ChevronDown
            className={clx("size-4 transition-transform duration-200", {
              "rotate-180": isOpenMobile,
            })}
          />
        </div>
      </button>

      {/* Refinements Content Panel */}
      <aside
        className={clx(
          "flex flex-col gap-8 py-4 w-full bg-card border border-border/70 rounded-xl p-5 shadow-2xs mt-3 small:mt-0",
          {
            "hidden small:flex": !isOpenMobile,
            "flex": isOpenMobile,
          }
        )}
      >
        <SortProducts
          sortBy={sortBy}
          setQueryParams={setQueryParams}
          data-testid={dataTestId}
        />
        {!hideOptionsPicker && (
          <OptionsPicker
            selectedValueIds={selectedOptionValueIds}
            setOptionValueIds={setOptionValueIds}
          />
        )}
      </aside>
    </div>
  )
}

export default RefinementList
