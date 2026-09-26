import { Heading } from "@modules/common/components/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

import { CheckCircle2 } from "lucide-react"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10"
          data-testid="order-complete-container"
        >
          <div className="flex items-center gap-3.5 mb-2">
            <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-7 text-emerald-600" />
            </div>
            <Heading
              level="h1"
              className="flex flex-col gap-y-1 text-ui-fg-base text-2xl sm:text-3xl font-bold"
            >
              <span>Hvala vam!</span>
              <span className="text-sm sm:text-base font-normal text-muted-foreground">
                Vaša narudžba je uspješno kreirana.
              </span>
            </Heading>
          </div>
          <OrderDetails order={order} />
          <Heading level="h2" className="flex flex-row text-2xl font-bold mt-6">
            Pregled narudžbe
          </Heading>
          <Items order={order} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}
