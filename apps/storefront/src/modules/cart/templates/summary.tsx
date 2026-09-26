"use client"

import { Button, Heading } from "@modules/common/components/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col gap-y-5">
      <h2 className="text-lg font-bold text-foreground tracking-tight pb-3 border-b border-border">
        Pregled narudžbe
      </h2>
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="w-full inline-flex items-center justify-center h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all shadow-xs cursor-pointer"
      >
        Nastavi na plaćanje
      </LocalizedClientLink>
      <div className="pt-2 border-t border-border">
        <DiscountCode cart={cart} />
      </div>
    </div>
  )
}

export default Summary
