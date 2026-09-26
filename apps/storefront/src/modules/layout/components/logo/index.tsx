import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { activeShop } from "@/config/shop"

type LogoProps = {
  className?: string
  "data-testid"?: string
}

export default function Logo({
  className = "",
  "data-testid": dataTestId = "store-logo",
}: LogoProps) {
  return (
    <LocalizedClientLink
      href="/"
      className={`flex items-center justify-center w-32 h-10 bg-white hover:bg-white/95 border border-white/20 rounded-lg text-primary font-black tracking-wider text-sm select-none transition-colors shrink-0 shadow-xs ${className}`}
      data-testid={dataTestId}
    >
      {activeShop.branding.logoText || "LOGO"}
    </LocalizedClientLink>
  )
}
