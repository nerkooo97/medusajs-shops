"use client"

import { LayoutGrid, ChevronDown } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { CategoryIcon } from "@/components/category-icon"
import { activeShop, getAllShopRootHandles } from "@/config/shop"

export default function HeaderSubnav({
  categories = [],
}: {
  categories?: HttpTypes.StoreProductCategory[]
}) {
  const rootHandles = getAllShopRootHandles()

  const displayCategories = categories.length > 0
    ? categories
        .filter((c) => !rootHandles.includes(c.handle))
        .map((c) => ({
          name: c.name,
          handle: c.handle,
          icon: (c.metadata as Record<string, any> | undefined)?.icon as string | undefined,
        }))
    : activeShop.categories

  return (
    <div className="border-t border-white/15 bg-white/10">
      <div className="content-container flex items-center justify-between h-11 text-xs text-white/80">
        {/* Left side: All Categories dropdown + Category Links */}
        <div className="flex items-center gap-3 overflow-hidden">
          {/* All Categories Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 font-semibold text-white transition-colors py-1.5 px-2.5 rounded-md hover:bg-white/15 shrink-0 outline-none cursor-pointer"
              >
                <LayoutGrid className="size-4 stroke-[2.2] text-white" />
                <span className="text-xs font-bold tracking-tight">Sve kategorije</span>
                <ChevronDown className="size-3.5 text-white/80 stroke-[2.2]" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56 py-1.5 bg-popover text-popover-foreground border border-border shadow-md">
              <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {activeShop.branding.subnavLabel}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {displayCategories.map((cat) => (
                <DropdownMenuItem key={cat.handle} asChild>
                  <LocalizedClientLink
                    href={`/categories/${cat.handle}`}
                    className="w-full cursor-pointer py-2 text-xs font-medium text-foreground hover:text-primary flex items-center gap-2.5"
                  >
                    <CategoryIcon name={cat.icon} className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                    <span>{cat.name}</span>
                  </LocalizedClientLink>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LocalizedClientLink
                  href="/store"
                  className="w-full cursor-pointer font-bold text-xs text-primary py-1.5"
                >
                  Pogledaj sve proizvode &rarr;
                </LocalizedClientLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Vertical Separator */}
          <Separator orientation="vertical" className="h-4 bg-white/20 shrink-0" />

          {/* Quick Category Links */}
          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {displayCategories.slice(0, 10).map((cat) => (
              <LocalizedClientLink
                key={cat.handle}
                href={`/categories/${cat.handle}`}
                className="flex items-center gap-1.5 text-xs font-medium text-white/85 hover:text-white hover:bg-white/15 px-2.5 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 group"
              >
                <CategoryIcon name={cat.icon} className="size-3.5 shrink-0 text-white/75 group-hover:text-white transition-colors" />
                <span>{cat.name}</span>
              </LocalizedClientLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
