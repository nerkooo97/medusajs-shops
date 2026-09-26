"use client"

import { clx } from "@modules/common/components/ui"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { ShieldCheck } from "lucide-react"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards && ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && cart?.total === 0
  )

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-card rounded-2xl border border-border/80 p-5 sm:p-7 shadow-xs">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2
          className={clx(
            "flex flex-row text-xl sm:text-2xl font-extrabold text-foreground gap-x-2.5 items-center",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          <span>4. Pregled i potvrda narudžbe</span>
        </h2>
      </div>

      {isOpen && previousStepsCompleted && (
        <div className="space-y-6 pt-1">
          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-xs text-muted-foreground leading-relaxed flex items-start gap-3">
            <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
            <p>
              Klikom na dugme <strong>&quot;Potvrdi narudžbu&quot;</strong>, potvrđujete da ste pregledali detalje narudžbe,
              te da prihvatate naše Uslove kupovine, Politiku privatnosti i Pravo na povrat u roku od 15 dana.
            </p>
          </div>

          <div className="w-full">
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Review
