import React, { Suspense } from "react"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductSpecsTabs from "@modules/products/components/product-specs-tabs"
import ProductBenefits from "@modules/products/components/product-benefits"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { activeShop } from "@/config/shop"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const primaryCategory = product.categories?.[0]
  const rootCategory = activeShop?.rootCategory
  const showRoot = rootCategory && (!primaryCategory || primaryCategory.handle !== rootCategory.handle)

  return (
    <>
      <div
        className="content-container py-6 sm:py-8"
        data-testid="product-container"
      >
        {/* Full Path Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground pb-6 overflow-x-auto no-scrollbar">
          <LocalizedClientLink href="/" className="hover:text-foreground transition-colors shrink-0">
            Naslovna
          </LocalizedClientLink>
          <span>/</span>

          {showRoot && (
            <>
              <LocalizedClientLink
                href={`/categories/${rootCategory.handle}`}
                className="hover:text-foreground transition-colors shrink-0"
              >
                {rootCategory.name}
              </LocalizedClientLink>
              <span>/</span>
            </>
          )}

          {primaryCategory && (
            <>
              <LocalizedClientLink
                href={`/categories/${primaryCategory.handle}`}
                className="hover:text-foreground transition-colors shrink-0 font-medium"
              >
                {primaryCategory.name}
              </LocalizedClientLink>
              <span>/</span>
            </>
          )}

          {product.collection && !primaryCategory && (
            <>
              <LocalizedClientLink
                href={`/collections/${product.collection.handle}`}
                className="hover:text-foreground transition-colors shrink-0 font-medium"
              >
                {product.collection.title}
              </LocalizedClientLink>
              <span>/</span>
            </>
          )}

          <span className="text-foreground font-semibold truncate shrink-0 max-w-[280px]">
            {product.title}
          </span>
        </nav>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LIJEVO: Slike proizvoda + Tabovi specifikacija */}
          <div className="lg:col-span-7 w-full flex flex-col">
            <ImageGallery images={images} />
            <ProductSpecsTabs product={product} />
          </div>

          {/* DESNO: Informacije o proizvodu, Cijena/Kupovina i Konfigurisani benefiti */}
          <div className="lg:col-span-5 flex flex-col gap-y-4">
            {/* 1. Header: Brand, Title, SKU/Stock, Social Shares, Summary specs */}
            <ProductInfo product={product} />

            {/* 2. Buy Box Card: Cijena, Dodaj u omiljene, Količina, DODAJ U KORPU */}
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>

            {/* 3. Konfigurisani benefiti: Način plaćanja, Cijena dostave, Povrat robe */}
            <ProductBenefits />
          </div>
        </div>
      </div>

      {/* Slični proizvodi */}
      <div
        className="content-container my-16 small:my-28"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
