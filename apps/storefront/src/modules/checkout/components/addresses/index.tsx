"use client"

import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"
import { CheckCircle2 } from "lucide-react"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  const isCompleted = !isOpen && !!cart?.shipping_address

  return (
    <div className="bg-card rounded-2xl border border-border/80 p-5 sm:p-7 shadow-xs">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="flex flex-row text-xl sm:text-2xl font-extrabold text-foreground gap-x-2.5 items-center">
          <span>1. Adresa za dostavu</span>
          {isCompleted && <CheckCircle2 className="size-5 text-emerald-600 stroke-[2.2]" />}
        </h2>
        {isCompleted && (
          <button
            onClick={handleEdit}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
            data-testid="edit-address-button"
          >
            Izmijeni
          </button>
        )}
      </div>

      {isOpen ? (
        <form action={formAction}>
          <div className="pt-2">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="mt-6 pt-6 border-t border-border/70">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Adresa za račun
                </h3>
                <BillingAddress cart={cart} />
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <SubmitButton
                className="w-full sm:w-auto h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-xs cursor-pointer transition-all"
                data-testid="submit-address-button"
              >
                Nastavi na odabir dostave
              </SubmitButton>
            </div>

            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-xs sm:text-sm text-muted-foreground pt-1">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-muted/20 rounded-xl p-4 border border-border/60">
                {/* Adresa */}
                <div data-testid="shipping-address-summary" className="space-y-0.5">
                  <p className="font-bold text-foreground text-xs uppercase tracking-wide">
                    Adresa za dostavu
                  </p>
                  <p className="text-foreground/90 font-medium">
                    {cart.shipping_address.first_name} {cart.shipping_address.last_name}
                  </p>
                  <p>
                    {cart.shipping_address.address_1} {cart.shipping_address.address_2}
                  </p>
                  <p>
                    {cart.shipping_address.postal_code} {cart.shipping_address.city}
                  </p>
                  <p>{cart.shipping_address.country_code?.toUpperCase()}</p>
                </div>

                {/* Kontakt */}
                <div data-testid="shipping-contact-summary" className="space-y-0.5">
                  <p className="font-bold text-foreground text-xs uppercase tracking-wide">
                    Kontakt
                  </p>
                  <p className="text-foreground/90 font-medium">
                    {cart.shipping_address.phone || "Nije unesen"}
                  </p>
                  <p className="truncate">{cart.email}</p>
                </div>

                {/* Račun */}
                <div data-testid="billing-address-summary" className="space-y-0.5">
                  <p className="font-bold text-foreground text-xs uppercase tracking-wide">
                    Adresa za račun
                  </p>
                  {sameAsBilling ? (
                    <p className="text-muted-foreground italic">
                      Ista kao i adresa za dostavu.
                    </p>
                  ) : (
                    <>
                      <p className="text-foreground/90 font-medium">
                        {cart.billing_address?.first_name} {cart.billing_address?.last_name}
                      </p>
                      <p>
                        {cart.billing_address?.address_1} {cart.billing_address?.address_2}
                      </p>
                      <p>
                        {cart.billing_address?.postal_code} {cart.billing_address?.city}
                      </p>
                      <p>{cart.billing_address?.country_code?.toUpperCase()}</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-2">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Addresses
