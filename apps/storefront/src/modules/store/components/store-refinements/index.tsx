"use client"

import { useState } from "react"
import { useCurrentRefinements } from "react-instantsearch"
import { SlidersHorizontal, ChevronDown } from "lucide-react"
import { clx } from "@modules/common/components/ui"

import {
  CATEGORY_ATTRIBUTE,
  LABELS_ATTRIBUTE,
} from "./attributes"
import CurrentRefinements from "./current-refinements"
import OnSaleToggle from "./on-sale-toggle"
import OptionRefinements from "./option-refinements"
import PriceRange from "./price-range"
import RefinementGroup from "./refinement-group"

type StoreRefinementsProps = {
  currencyCode: string
  hideCategoryFilter?: boolean
}

const StoreRefinements = ({
  currencyCode,
  hideCategoryFilter = false,
}: StoreRefinementsProps) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false)
  const { items: currentRefinementItems } = useCurrentRefinements()
  const activeCount = currentRefinementItems.flatMap(
    (item) => item.refinements
  ).length

  return (
    <div className="w-full small:w-[260px] small:shrink-0 small:mr-8 mb-6 small:mb-8">
      {/* Mobile Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpenMobile((prev) => !prev)}
        className="small:hidden flex items-center justify-between w-full p-3.5 bg-card border border-border/80 rounded-xl text-sm font-semibold text-foreground shadow-2xs hover:border-[#0053E2]/50 transition-all active:scale-[0.99]"
        aria-expanded={isOpenMobile}
        aria-label="Filteri"
      >
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-[#0053E2]/10 text-[#0053E2] flex items-center justify-center">
            <SlidersHorizontal className="size-4" />
          </div>
          <span className="font-semibold">Filteri</span>
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
        <CurrentRefinements currencyCode={currencyCode} />
        <OptionRefinements />
        <PriceRange currencyCode={currencyCode} />
        <OnSaleToggle currencyCode={currencyCode} />
        {!hideCategoryFilter && (
          <RefinementGroup attribute={CATEGORY_ATTRIBUTE} title="Kategorije" />
        )}
        <RefinementGroup attribute={LABELS_ATTRIBUTE} title="Oznake" />
      </aside>
    </div>
  )
}

export default StoreRefinements

