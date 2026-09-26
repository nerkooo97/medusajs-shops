import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Headphones, Sparkles, LayoutGrid } from "lucide-react"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-16 sm:py-24 px-4 flex flex-col items-center justify-center text-center"
      data-testid="empty-cart-message"
    >
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Animated / styled Icon Badge */}
        <div className="relative mb-6">
          <div className="size-20 sm:size-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ShoppingBag className="size-10 sm:size-11 stroke-[1.7]" />
          </div>
          <span className="absolute -bottom-1 -right-1 size-7 sm:size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
            <Sparkles className="size-3.5 sm:size-4" />
          </span>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
          Vaša korpa je prazna
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
          Trenutno nemate dodanih artikala u korpi. Pregledajte naš asortiman i pronađite vrhunske proizvode za vaše potrebe.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center mb-12">
          <LocalizedClientLink
            href="/store"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-xs transition-all hover:gap-3 cursor-pointer"
          >
            <span>Započni kupovinu</span>
            <ArrowRight className="size-4" />
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/categories"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-input bg-background hover:bg-accent font-medium text-sm text-foreground transition-colors cursor-pointer"
          >
            <LayoutGrid className="size-4 text-muted-foreground" />
            <span>Kategorije</span>
          </LocalizedClientLink>
        </div>

        {/* Feature / Trust Badges - seamless without card borders */}
        <div className="w-full pt-10 border-t border-border/80 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Truck className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Brza dostava</h4>
              <p className="text-[11px] text-muted-foreground">Sigurna isporuka na adresu</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Sigurna kupovina</h4>
              <p className="text-[11px] text-muted-foreground">100% originalni proizvodi</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Headphones className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Podrška korisnicima</h4>
              <p className="text-[11px] text-muted-foreground">Tu smo za sva vaša pitanja</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCartMessage
