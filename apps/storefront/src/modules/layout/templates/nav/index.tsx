import { Suspense } from "react"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import HeaderSearch from "@modules/layout/components/header-search"
import HeaderLocation from "@modules/layout/components/header-location"
import HeaderCart from "@modules/layout/components/header-cart"
import HeaderAccount from "@modules/layout/components/header-account"
import HeaderSubnav from "@modules/layout/components/header-subnav"
import Logo from "@modules/layout/components/logo"
import { ShoppingCart, CircleUser } from "lucide-react"

import { activeShop } from "@/config/shop"

export default async function Nav() {
  const categories = await listCategories().catch(() => [])


  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-[#0053E2] shadow-xs">
      {/* Top Row: Main Header */}
      <header className="bg-[#0053E2] text-white">
        <div className="content-container flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Gray/White Placeholder Logo */}
          <Logo data-testid="nav-store-link" />

          {/* Center Search Bar on desktop / Mobile Search trigger on mobile */}
          <HeaderSearch />

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1 sm:gap-3 lg:gap-4 shrink-0 text-white">
            {/* Delivery Location Widget */}
            <div className="hidden md:flex">
              <HeaderLocation />
            </div>

            {/* Shopping Cart */}
            <Suspense
              fallback={
                <div className="flex items-center gap-2 px-2.5 py-1.5 text-white/80">
                  <ShoppingCart className="size-6 text-white" />
                  <span className="hidden sm:inline text-sm font-semibold text-white">Korpa</span>
                </div>
              }
            >
              <HeaderCart />
            </Suspense>

            {/* User Account / Sign In */}
            <Suspense
              fallback={
                <div className="flex items-center gap-2 px-2.5 py-1.5 text-white/80">
                  <CircleUser className="size-6 text-white" />
                  <span className="hidden sm:inline text-sm font-semibold text-white">Prijava</span>
                </div>
              }
            >
              <HeaderAccount />
            </Suspense>
          </div>
        </div>
      </header>

      {/* Bottom Row: Sub-navigation Categories & Special Deals */}
      <HeaderSubnav categories={categories} />
    </div>
  )
}

