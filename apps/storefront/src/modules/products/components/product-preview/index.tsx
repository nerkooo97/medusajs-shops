import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { ShoppingBag } from "lucide-react"

export default async function ProductPreview({
  product,
  isFeatured: _isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const isOnSale = cheapestPrice?.price_type === "sale"

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group flex flex-col h-full bg-card rounded-2xl border border-border/80 hover:border-[#0053E2]/50 hover:shadow-md transition-all duration-200 p-3 sm:p-4 justify-between"
    >
      <div data-testid="product-wrapper" className="flex flex-col flex-1 justify-between">
        {/* Product Image Area */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/20 mb-3 flex items-center justify-center">
          {isOnSale && (
            <span className="absolute top-2 left-2 z-10 bg-rose-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow-2xs uppercase tracking-wider">
              Akcija
            </span>
          )}
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            className="!p-0 !rounded-none !shadow-none !border-none !bg-transparent group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-1 justify-between gap-2">
          {product.collection?.title && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80 line-clamp-1">
              {product.collection.title}
            </span>
          )}

          <h3
            className="text-xs sm:text-sm font-bold text-foreground group-hover:text-[#0053E2] transition-colors line-clamp-2 leading-snug"
            data-testid="product-title"
          >
            {product.title}
          </h3>

          {/* Pricing & CTA Button */}
          <div className="pt-2.5 mt-auto border-t border-border/50 flex items-center justify-between gap-2">
            <div className="flex flex-col">
              {cheapestPrice ? (
                <PreviewPrice price={cheapestPrice} />
              ) : (
                <span className="text-xs text-muted-foreground">Cijena na upit</span>
              )}
            </div>

            <div className="size-8 sm:size-9 rounded-lg bg-[#0053E2]/10 text-[#0053E2] group-hover:bg-[#0053E2] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
              <ShoppingBag className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
