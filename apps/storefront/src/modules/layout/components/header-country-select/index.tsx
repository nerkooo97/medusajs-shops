"use client"

import { ChevronDown, Check } from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import { useMemo } from "react"
import ReactCountryFlag from "react-country-flag"
import { HttpTypes } from "@medusajs/types"
import { updateRegion } from "@lib/data/cart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type CountryOption = {
  country: string
  region: string
  label: string
}

export default function HeaderCountrySelect({
  regions,
}: {
  regions: HttpTypes.StoreRegion[]
}) {
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1] || ""

  const options = useMemo(() => {
    return (
      regions
        ?.map((r) => {
          return r.countries?.map((c) => ({
            country: c.iso_2 ?? "",
            region: r.id,
            label: c.display_name ?? "",
          }))
        })
        .flat()
        .filter((o): o is CountryOption => !!o)
        .sort((a, b) => a.label.localeCompare(b.label)) || []
    )
  }, [regions])

  const current = options.find((o) => o.country.toLowerCase() === (countryCode as string)?.toLowerCase()) || options[0]

  const handleSelect = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
  }

  const currentCountryCode = current?.country?.toUpperCase() || (countryCode as string)?.toUpperCase() || "BA"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-xs font-semibold text-neutral-800 shrink-0 outline-none"
        >
          {/* Flag circular badge */}
          <div className="size-6 rounded-full overflow-hidden flex items-center justify-center border border-neutral-200 shadow-xs shrink-0">
            <ReactCountryFlag
              svg
              style={{
                width: "24px",
                height: "24px",
                objectFit: "cover",
              }}
              countryCode={currentCountryCode}
            />
          </div>
          <span className="uppercase font-semibold tracking-wide text-xs">
            {currentCountryCode}
          </span>
          <ChevronDown className="size-3.5 text-neutral-500 stroke-[2.2]" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 max-h-72 overflow-y-auto">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Odaberite regiju / državu
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => {
          const isSelected = option.country.toLowerCase() === (countryCode as string)?.toLowerCase()
          return (
            <DropdownMenuItem
              key={option.country}
              onClick={() => handleSelect(option)}
              className="flex items-center justify-between cursor-pointer py-2"
            >
              <div className="flex items-center gap-2.5">
                <div className="size-5 rounded-full overflow-hidden border border-neutral-200 flex items-center justify-center shrink-0">
                  <ReactCountryFlag
                    svg
                    style={{
                      width: "20px",
                      height: "20px",
                      objectFit: "cover",
                    }}
                    countryCode={option.country}
                  />
                </div>
                <span className="text-sm">{option.label}</span>
              </div>
              {isSelected && <Check className="size-4 text-blue-600 stroke-[2.5]" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
