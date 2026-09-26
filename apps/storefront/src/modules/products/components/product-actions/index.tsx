"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { ShoppingCart, Heart, Check } from "lucide-react"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>(() => {
    if (!product.variants?.length) return {}
    const vId = searchParams.get("v_id")
    const targetVariant = vId
      ? product.variants.find((v) => v.id === vId) || product.variants[0]
      : product.variants[0]
    return optionsAsKeymap(targetVariant?.options) ?? {}
  })

  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const countryCode = useParams().countryCode as string

  // Preselect options from url param v_id, or first variant by default
  useEffect(() => {
    if (!product.variants?.length) return

    const vId = searchParams.get("v_id")
    const targetVariant = vId
      ? product.variants.find((v) => v.id === vId) || product.variants[0]
      : product.variants[0]

    if (targetVariant) {
      const variantOptions = optionsAsKeymap(targetVariant.options)
      setOptions((prev) => {
        if (Object.keys(prev).length === 0) {
          return variantOptions ?? {}
        }
        return prev
      })
    }
  }, [product.variants, searchParams])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  // check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    if (selectedVariant?.allow_backorder) {
      return true
    }

    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity,
        countryCode,
      })
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 2500)
    } catch (err) {
      console.error("Greška pri dodavanju u korpu:", err)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-y-4" ref={actionsRef}>
        {/* Buy Box Card */}
        <div className="rounded-xl border border-border/80 bg-card p-5 shadow-xs flex flex-col gap-4">
          {/* Top row: Price on left, Wishlist on right */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-muted-foreground block mb-0.5">
                Cijena:
              </span>
              <ProductPrice product={product} variant={selectedVariant} />
            </div>

            {/* Dodaj u omiljene */}
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0 mt-1"
            >
              <span>Dodaj u omiljene</span>
              <Heart
                className={`size-4 transition-colors ${
                  isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            </button>
          </div>

          {/* Variant selection if available */}
          {(product.variants?.length ?? 0) > 1 && (
            <div className="pt-2 border-t border-border/60">
              {(product.options || []).map((option) => (
                <div key={option.id} className="mb-3">
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={setOptionValue}
                    title={option.title ?? ""}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Action Controls: Quantity stepper + DODAJ U KORPU */}
          <div className="flex items-center gap-2.5 pt-1">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-border/80 rounded-lg overflow-hidden h-11 w-20 shrink-0 bg-background">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center font-bold text-sm bg-transparent outline-none"
                aria-label="Količina"
              />
              <div className="flex flex-col border-l border-border/80 h-full w-8 justify-between">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-1/2 flex items-center justify-center hover:bg-muted text-xs font-bold border-b border-border/80 cursor-pointer"
                  aria-label="Povećaj količinu"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-1/2 flex items-center justify-center hover:bg-muted text-xs font-bold cursor-pointer"
                  aria-label="Smanji količinu"
                >
                  -
                </button>
              </div>
            </div>

            {/* DODAJ U KORPU (Primary button) */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={
                !inStock ||
                !selectedVariant ||
                !!disabled ||
                isAdding ||
                !isValidVariant
              }
              className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors px-4"
              data-testid="add-product-button"
            >
              {justAdded ? (
                <>
                  <Check className="size-4 stroke-[2.5]" />
                  <span>Dodano u korpu!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="size-4 stroke-[2.2]" />
                  <span>{isAdding ? "Dodavanje..." : "Dodaj u korpu"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sticky Bar */}
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
