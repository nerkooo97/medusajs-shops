import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-8 sm:py-12">
      <div className="flex items-end justify-between mb-6 pb-3 border-b border-border/60">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0053E2]">
            Kolekcija
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
            {collection.title}
          </h2>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          Pogledaj sve
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} />
            </li>
          ))}
      </ul>
    </div>
  )
}
