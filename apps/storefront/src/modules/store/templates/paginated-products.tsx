import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { OptionValueIds } from "@lib/util/product-option-filters"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import CategorySortDropdown from "@modules/categories/components/category-sort-dropdown"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
    optionValueIds,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <div className="w-full">
      {/* Products Toolbar Header - Sort button on the right */}
      <div className="flex items-center justify-between gap-3 mb-4 w-full">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {count > 0 ? (
            <>
              Prikazano <span className="font-semibold text-foreground">{products.length}</span> od{" "}
              <span className="font-semibold text-foreground">{count}</span>{" "}
              {count === 1 ? "artikla" : "artikala"}
            </>
          ) : (
            <span>Nema rezultata</span>
          )}
        </p>
        <CategorySortDropdown sortBy={sortBy} />
      </div>

      {!products.length ? (
        <div
          className="py-20 text-center flex flex-col items-center justify-center bg-card border border-border/60 rounded-xl p-8 my-4 w-full"
          data-testid="no-products"
        >
          <p className="text-base font-semibold text-foreground mb-1">
            Trenutno nema dostupnih artikala u ovoj kategoriji
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Pokušajte odabrati drugu kategoriju ili provjerite kompletnu ponudu u našem katalogu.
          </p>
          <LocalizedClientLink
            href="/store"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0053E2] text-white text-xs font-semibold hover:bg-[#0046c0] transition-colors"
          >
            Pregledaj sve artikle
          </LocalizedClientLink>
        </div>
      ) : (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 w-full"
          data-testid="products-list"
        >
          {products.map((p) => {
            return (
              <li key={p.id}>
                <ProductPreview product={p} region={region} />
              </li>
            )
          })}
        </ul>
      )}

      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}
