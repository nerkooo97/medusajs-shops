import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Logo from "@modules/layout/components/logo"
import { activeShop } from "@/config/shop"
import { ArrowLeft, ShieldCheck } from "lucide-react"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Checkout Header */}
      <header className="h-16 sm:h-20 bg-[#0053E2] text-white sticky top-0 z-40 shadow-xs">
        <nav className="flex h-full items-center content-container justify-between gap-4">
          {/* Back to Cart Link */}
          <LocalizedClientLink
            href="/cart"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-colors flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ArrowLeft className="size-4 text-white" />
            <span className="hidden sm:inline">Nazad u korpu</span>
            <span className="sm:hidden">Nazad</span>
          </LocalizedClientLink>

          {/* Store Logo */}
          <Logo data-testid="store-link" />

          {/* Right Spacer for balanced centering */}
          <div className="flex-1 basis-0" />
        </nav>
      </header>

      {/* Checkout Main Area */}
      <main className="relative flex-1" data-testid="checkout-container">
        {children}
      </main>

      {/* Checkout Footer */}
      <footer className="border-t border-border/60 bg-muted/20 py-6 text-xs text-muted-foreground">
        <div className="content-container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-foreground/80 font-medium">
            <ShieldCheck className="size-4 text-primary shrink-0" />
            <span>100% sigurna kupovina sa zaštitom podataka i prava na povrat u roku od 15 dana.</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} {activeShop.name}. Sva prava zadržana.
          </p>
        </div>
      </footer>
    </div>
  )
}
