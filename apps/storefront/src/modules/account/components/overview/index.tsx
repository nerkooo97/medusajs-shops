import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@/components/ui/button"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const profileCompletion = getProfileCompletion(customer)
  const addressesCount = customer?.addresses?.length || 0
  const ordersCount = orders?.length || 0

  return (
    <div className="w-full space-y-6" data-testid="overview-page-wrapper">
      {/* Welcome Banner Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-xl sm:text-2xl font-bold tracking-tight text-foreground"
              data-testid="welcome-message"
              data-value={customer?.first_name}
            >
              Dobrodošli nazad, {customer?.first_name || "Korisnik"}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Prijavljeni ste sa email adresom:{" "}
              <span
                className="font-medium text-foreground"
                data-testid="customer-email"
                data-value={customer?.email}
              >
                {customer?.email}
              </span>
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="shrink-0 cursor-pointer">
            <LocalizedClientLink href="/account/profile">
              Uredi profil
            </LocalizedClientLink>
          </Button>
        </div>
      </div>

      {/* Metrics / Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Profile Completion Card */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-2xs flex flex-col justify-between gap-3">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Profil
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span
                className="text-3xl font-bold tracking-tight text-foreground"
                data-testid="customer-profile-completion"
                data-value={profileCompletion}
              >
                {profileCompletion}%
              </span>
              <span className="text-xs text-muted-foreground">popunjeno</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>
          <LocalizedClientLink
            href="/account/profile"
            className="text-xs font-medium text-primary hover:underline self-start pt-1"
          >
            Ažuriraj podatke &rarr;
          </LocalizedClientLink>
        </div>

        {/* Addresses Count Card */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-2xs flex flex-col justify-between gap-3">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Adrese
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span
                className="text-3xl font-bold tracking-tight text-foreground"
                data-testid="addresses-count"
                data-value={addressesCount}
              >
                {addressesCount}
              </span>
              <span className="text-xs text-muted-foreground">spremljeno</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Za bržu naplatu i dostavu paketa
            </p>
          </div>
          <LocalizedClientLink
            href="/account/addresses"
            className="text-xs font-medium text-primary hover:underline self-start pt-1"
          >
            Upravljaj adresama &rarr;
          </LocalizedClientLink>
        </div>

        {/* Orders Count Card */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-2xs flex flex-col justify-between gap-3">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Narudžbe
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {ordersCount}
              </span>
              <span className="text-xs text-muted-foreground">evidentirano</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Pregled svih obavljenih kupovina
            </p>
          </div>
          <LocalizedClientLink
            href="/account/orders"
            className="text-xs font-medium text-primary hover:underline self-start pt-1"
          >
            Pregledaj narudžbe &rarr;
          </LocalizedClientLink>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">
            Nedavne narudžbe
          </h2>
          {orders && orders.length > 0 && (
            <LocalizedClientLink
              href="/account/orders"
              className="text-xs font-medium text-primary hover:underline"
            >
              Vidi sve ({orders.length}) &rarr;
            </LocalizedClientLink>
          )}
        </div>

        <ul className="flex flex-col gap-3" data-testid="orders-wrapper">
          {orders && orders.length > 0 ? (
            orders.slice(0, 5).map((order) => {
              return (
                <li
                  key={order.id}
                  data-testid="order-wrapper"
                  data-value={order.id}
                >
                  <LocalizedClientLink
                    href={`/account/orders/details/${order.id}`}
                    className="group block rounded-lg border border-border bg-background p-4 hover:border-primary/40 hover:bg-muted/40 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground block text-[11px]">
                            Broj narudžbe
                          </span>
                          <span
                            className="font-semibold text-foreground group-hover:text-primary transition-colors"
                            data-testid="order-id"
                            data-value={order.display_id}
                          >
                            #{order.display_id}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[11px]">
                            Datum narudžbe
                          </span>
                          <span
                            className="text-foreground"
                            data-testid="order-created-date"
                          >
                            {new Date(order.created_at).toLocaleDateString("bs-BA", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-muted-foreground block text-[11px]">
                            Ukupan iznos
                          </span>
                          <span
                            className="font-bold text-foreground"
                            data-testid="order-amount"
                          >
                            {convertToLocale({
                              amount: order.total,
                              currency_code: order.currency_code,
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          className="text-xs font-medium text-primary flex items-center gap-1 group-hover:underline cursor-pointer"
                          data-testid="open-order-button"
                        >
                          <span>Detalji</span>
                          <span>&rarr;</span>
                        </button>
                      </div>
                    </div>
                  </LocalizedClientLink>
                </li>
              )
            })
          ) : (
            <div
              className="py-10 text-center flex flex-col items-center justify-center gap-2 text-muted-foreground"
              data-testid="no-orders-message"
            >
              <p className="text-sm font-medium text-foreground">
                Trenutno nemate prethodnih narudžbi
              </p>
              <p className="text-xs max-w-sm">
                Nakon što izvršite kupovinu, sve detalje narudžbi i status dostave moći ćete pratiti ovdje.
              </p>
              <Button variant="outline" size="sm" asChild className="mt-3 cursor-pointer">
                <LocalizedClientLink href="/store">
                  Pregledaj ponudu proizvoda
                </LocalizedClientLink>
              </Button>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return Math.round((count / 4) * 100)
}

export default Overview

