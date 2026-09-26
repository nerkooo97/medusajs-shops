import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

export const metadata: Metadata = {
  title: "Narudžbe",
  description: "Pregled vaših prethodnih narudžbi.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-2">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Narudžbe
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Pregledajte sve vaše prethodne narudžbe i njihov status. Ovdje također možete pratiti dostavu ili zatražiti prenos narudžbe na vaš račun.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <Divider className="mb-8 mt-8" />
        <TransferRequestForm />
      </div>
    </div>
  )
}
