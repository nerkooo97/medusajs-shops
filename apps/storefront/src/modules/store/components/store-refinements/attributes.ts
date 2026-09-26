import { PRODUCT_INDEX_NAME, priceAttribute } from "@lib/search-client"

export const OPTION_VALUES_ATTRIBUTE = "option_values"
export const CATEGORY_ATTRIBUTE = "category"
// The index calls the product's tags "labels".
export const LABELS_ATTRIBUTE = "labels"

export const getSortOptions = (currencyCode: string) => {
  const minPrice = priceAttribute("min_price", currencyCode)

  return [
    { value: PRODUCT_INDEX_NAME, label: "Relevantnost" },
    {
      value: `${PRODUCT_INDEX_NAME}/sort/created_at:desc`,
      label: "Najnovije",
    },
    {
      value: `${PRODUCT_INDEX_NAME}/sort/${minPrice}:asc`,
      label: "Cijena: Najniža prvo",
    },
    {
      value: `${PRODUCT_INDEX_NAME}/sort/${minPrice}:desc`,
      label: "Cijena: Najviša prvo",
    },
    { value: `${PRODUCT_INDEX_NAME}/sort/title:asc`, label: "Naziv: A - Z" },
    { value: `${PRODUCT_INDEX_NAME}/sort/title:desc`, label: "Naziv: Z - A" },
  ]
}
