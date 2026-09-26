import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Home, ShoppingBag, ShoppingCart, Headphones, SearchX } from "lucide-react"

export const metadata: Metadata = {
  title: "Stranica nije pronađena (404) | Alati & Mašine",
  description: "Stranica koju tražite ne postoji ili je premještena.",
}

const suggestedLinks = [
  {
    icon: ShoppingBag,
    title: "Svi artikli",
    description: "Kompletna ponuda",
    href: "/store",
  },
  {
    icon: ShoppingCart,
    title: "Vaša korpa",
    description: "Provjerite artikle",
    href: "/cart",
  },
  {
    icon: Headphones,
    title: "Podrška",
    description: "Pomoć i kontakt",
    href: "/customer-service",
  },
]

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full text-center flex flex-col items-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0053E2]/10 border border-[#0053E2]/20 text-[#0053E2] text-xs font-bold uppercase tracking-wider mb-6">
          <SearchX className="size-4" />
          <span>Greška 404</span>
        </div>

        {/* Big stylized 404 watermark */}
        <div className="relative mb-3 flex flex-col items-center justify-center">
          <span className="text-8xl sm:text-9xl font-black text-[#0053E2]/10 select-none tracking-tighter leading-none">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight -mt-6 sm:-mt-8">
            Stranica nije pronađena
          </h1>
        </div>

        {/* Friendly explanation */}
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Nažalost, stranica koju tražite ne postoji, premještena je ili je unesena web adresa pogrešna.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-10">
          <LocalizedClientLink
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0053E2] hover:bg-[#0046c0] text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            <Home className="size-4" />
            <span>Idi na naslovnu</span>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/store"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card hover:bg-muted text-foreground border border-border font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
          >
            <ShoppingBag className="size-4 text-muted-foreground" />
            <span>Pregledaj katalog</span>
          </LocalizedClientLink>
        </div>

        {/* Suggested Links - circular icon with title & subtitle below like empty-cart-message */}
        <div className="w-full border-t border-border/80 pt-8 mt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
            Možda ste tražili:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center w-full">
            {suggestedLinks.map((item, idx) => {
              const Icon = item.icon
              return (
                <LocalizedClientLink
                  key={idx}
                  href={item.href}
                  className="flex flex-col items-center gap-2.5 p-3 rounded-xl hover:bg-muted/50 transition-colors text-center group"
                >
                  <div className="size-11 rounded-full bg-[#0053E2]/10 text-[#0053E2] flex items-center justify-center shrink-0 group-hover:bg-[#0053E2] group-hover:text-white transition-colors">
                    <Icon className="size-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-[#0053E2] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </LocalizedClientLink>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

