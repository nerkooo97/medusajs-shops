import { clx } from "@modules/common/components/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
  className,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  className?: string
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-muted/40 animate-pulse rounded-md" />
  }

  return (
    <div className={clx("flex flex-col gap-1", className)}>
      <div className="flex items-baseline gap-2.5 flex-wrap">
        {!variant && <span className="text-sm font-medium text-muted-foreground">Od</span>}
        <span
          className="text-2xl sm:text-3xl font-black text-foreground tracking-tight"
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>

        {selectedPrice.price_type === "sale" && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-destructive/10 text-destructive">
            -{selectedPrice.percentage_diff}%
          </span>
        )}
      </div>

      {selectedPrice.price_type === "sale" && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Stara cijena:</span>
          <span
            className="line-through text-muted-foreground/80"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        </div>
      )}
    </div>
  )
}
