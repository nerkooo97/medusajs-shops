import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const statusMap: Record<string, string> = {
      not_fulfilled: "Nije isporučeno",
      partially_fulfilled: "Djelimično isporučeno",
      fulfilled: "Isporučeno",
      partially_shipped: "Djelimično poslano",
      shipped: "Poslano",
      partially_returned: "Djelimično vraćeno",
      returned: "Vraćeno",
      canceled: "Otkazano",
      not_paid: "Nije plaćeno",
      awaiting: "Na čekanju",
      authorized: "Autorizovano",
      partially_authorized: "Djelimično autorizovano",
      captured: "Plaćeno",
      partially_captured: "Djelimično plaćeno",
      refunded: "Refundirano",
      partially_refunded: "Djelimično refundirano",
      requires_action: "Potrebna radnja",
    }

    if (statusMap[str]) {
      return statusMap[str]
    }

    const formatted = str.split("_").join(" ")
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text>
        Poslali smo detalje potvrde narudžbe na email adresu{" "}
        <span
          className="text-ui-fg-medium-plus font-semibold"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2">
        Datum narudžbe:{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toLocaleDateString("bs-BA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        Broj narudžbe: <span data-testid="order-id">#{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              Status isporuke:{" "}
              <span className="text-ui-fg-subtle " data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              Status plaćanja:{" "}
              <span
                className="text-ui-fg-subtle "
                sata-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
