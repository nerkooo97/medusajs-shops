import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="w-full flex flex-col rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs">
      <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight pb-3">
        Artikli u narudžbi
      </h2>
      <Divider className="mb-4" />

      {/* Line items preview */}
      <ItemsPreviewTemplate cart={cart} />

      <Divider className="my-4" />

      {/* Cart Totals (Subtotal, Shipping, Tax, Total) */}
      <CartTotals totals={cart} />

      {/* Promo Code Input */}
      <div className="mt-4 pt-2">
        <DiscountCode cart={cart} />
      </div>
    </div>
  )
}

export default CheckoutSummary
