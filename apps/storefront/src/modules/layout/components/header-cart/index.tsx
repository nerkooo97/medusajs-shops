import { retrieveCart } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ShoppingCart } from "lucide-react"

export default async function HeaderCart() {
  const cart = await retrieveCart().catch(() => null)

  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  return (
    <LocalizedClientLink
      href="/cart"
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-white font-semibold text-sm shrink-0"
      data-testid="nav-cart-link"
    >
      <div className="relative flex items-center justify-center">
        <ShoppingCart className="size-6 text-white stroke-[1.8]" />
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-white text-primary text-[10px] font-black min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
            {totalItems}
          </span>
        )}
      </div>
      <span className="hidden sm:inline text-sm font-semibold text-white">Korpa</span>
    </LocalizedClientLink>
  )
}
