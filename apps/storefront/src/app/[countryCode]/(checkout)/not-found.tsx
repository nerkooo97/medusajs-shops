import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Home, ShoppingCart, HelpCircle, SearchX } from "lucide-react"

export const metadata: Metadata = {
  title: "Stranica nije pronađena (404) | Alati & Mašine",
  description: "Stranica koju tražite ne postoji ili je premještena.",
}

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full text-center flex flex-col items-center">
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
          Stranica checkout procesa koju tražite ne postoji ili je sesija istekla.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-10">
          <LocalizedClientLink
            href="/cart"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0053E2] hover:bg-[#0046c0] text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            <ShoppingCart className="size-4" />
            <span>Povratak u korpu</span>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card hover:bg-muted text-foreground border border-border font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
          >
            <Home className="size-4 text-muted-foreground" />
            <span>Idi na naslovnu</span>
          </LocalizedClientLink>
        </div>

        {/* Support Link */}
        <LocalizedClientLink
          href="/customer-service"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <HelpCircle className="size-3.5" />
          <span>Trebate pomoć? Kontaktirajte našu podršku</span>
        </LocalizedClientLink>
      </div>
    </div>
  )
}
