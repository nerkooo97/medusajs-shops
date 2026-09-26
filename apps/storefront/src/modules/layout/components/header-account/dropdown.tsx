"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUser, ChevronDown, User, MapPin, Package, LogOut } from "lucide-react"

export default function HeaderAccountDropdown({
  customer,
}: {
  customer: HttpTypes.StoreCustomer
}) {
  const { countryCode } = useParams() as { countryCode: string }
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signout(countryCode)
  }

  const displayName = customer.first_name || "Moj Račun"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-white font-semibold text-sm shrink-0 outline-none cursor-pointer"
          data-testid="nav-account-dropdown-trigger"
        >
          <CircleUser className="size-6 text-white stroke-[1.8]" />
          <span className="hidden sm:inline text-sm font-semibold text-white truncate max-w-[120px]">
            {displayName}
          </span>
          <ChevronDown className="size-3.5 text-white/80 stroke-[2.2] hidden sm:inline" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-md border border-border bg-popover">
        {/* User Info Header */}
        <div className="px-2.5 py-2 text-left">
          <p className="text-xs font-bold text-foreground truncate">
            {customer.first_name
              ? `${customer.first_name} ${customer.last_name || ""}`.trim()
              : "Korisnički račun"}
          </p>
          {customer.email && (
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              {customer.email}
            </p>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* Profil */}
        <DropdownMenuItem asChild>
          <LocalizedClientLink
            href="/account/profile"
            className="w-full flex items-center gap-2.5 py-2 px-2.5 rounded-md text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
            data-testid="header-profile-link"
          >
            <User className="size-4 text-muted-foreground" />
            <span>Profil</span>
          </LocalizedClientLink>
        </DropdownMenuItem>

        {/* Adrese */}
        <DropdownMenuItem asChild>
          <LocalizedClientLink
            href="/account/addresses"
            className="w-full flex items-center gap-2.5 py-2 px-2.5 rounded-md text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
            data-testid="header-addresses-link"
          >
            <MapPin className="size-4 text-muted-foreground" />
            <span>Adrese</span>
          </LocalizedClientLink>
        </DropdownMenuItem>

        {/* Narudžbe */}
        <DropdownMenuItem asChild>
          <LocalizedClientLink
            href="/account/orders"
            className="w-full flex items-center gap-2.5 py-2 px-2.5 rounded-md text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
            data-testid="header-orders-link"
          >
            <Package className="size-4 text-muted-foreground" />
            <span>Narudžbe</span>
          </LocalizedClientLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-2.5 py-2 px-2.5 rounded-md text-xs font-medium text-destructive hover:bg-destructive/10 focus:text-destructive focus:bg-destructive/10 transition-colors cursor-pointer"
          data-testid="header-logout-button"
        >
          <LogOut className="size-4" />
          <span>{isLoggingOut ? "Odjavljujem..." : "Odjavi se"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
