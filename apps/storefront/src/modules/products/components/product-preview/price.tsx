import { Text, clx } from "@modules/common/components/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  const isSale = price.price_type === "sale"

  return (
    <div className="flex flex-wrap items-baseline gap-1.5" data-testid="product-price">
      <Text
        className={clx("text-sm sm:text-base font-black tracking-tight", {
          "text-rose-600": isSale,
          "text-foreground": !isSale,
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
      {isSale && price.original_price && (
        <Text
          className="line-through text-xs text-muted-foreground font-normal"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
    </div>
  )
}
