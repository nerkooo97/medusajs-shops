import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Define query to fetch related products
  const queryParams: HttpTypes.StoreProductListParams = {
    limit: 12,
    is_giftcard: false,
    region_id: region.id,
  }

  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  } else if (product.categories?.[0]?.id) {
    queryParams.category_id = [product.categories[0].id]
  }

  if (product.tags?.length) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }

  let products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  // Fallback: If no products in same collection/category, fetch general store products
  if (products.length < 2) {
    const fallbackProducts = await listProducts({
      queryParams: {
        limit: 12,
        is_giftcard: false,
        region_id: region.id,
      },
      countryCode,
    }).then(({ response }) => {
      return response.products.filter(
        (responseProduct) => responseProduct.id !== product.id
      )
    })
    products = fallbackProducts
  }

  if (!products.length) {
    return null
  }

  return (
    <div className="w-full">
      {/* Header matching store design */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 pb-4 border-b border-border/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Preporučujemo
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight mt-0.5">
            Slični i povezani artikli
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Pregledajte artikle iz iste ponude
        </p>
      </div>

      {/* Compact Grid: 6 cols on XL, 5 on LG, 4 on MD, 3 on SM, 2 on Mobile */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {products.map((item) => {
          const { cheapestPrice } = getProductPrice({ product: item })

          return (
            <li key={item.id} className="h-full">
              <LocalizedClientLink
                href={`/products/${item.handle}`}
                className="group flex flex-col h-full bg-card rounded-xl border border-border/80 p-2.5 hover:border-primary/50 hover:shadow-xs transition-all"
              >
                {/* Compact Square Image Container - borderless, fully filled & centered */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white mb-2">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center bg-muted/20">
                      <PlaceholderImage size={16} />
                    </div>
                  )}

                  {cheapestPrice?.price_type === "sale" && (
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">
                      -{cheapestPrice.percentage_diff}%
                    </span>
                  )}
                </div>

                {/* Product Title */}
                <h3 className="text-xs font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors flex-1">
                  {item.title}
                </h3>

                {/* Price */}
                <div className="mt-2 pt-1.5 border-t border-border/40 flex items-baseline justify-between gap-1 flex-wrap">
                  <span className="text-xs sm:text-sm font-extrabold text-foreground">
                    {cheapestPrice?.calculated_price}
                  </span>
                  {cheapestPrice?.price_type === "sale" && (
                    <span className="text-[10px] text-muted-foreground line-through">
                      {cheapestPrice.original_price}
                    </span>
                  )}
                </div>
              </LocalizedClientLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
