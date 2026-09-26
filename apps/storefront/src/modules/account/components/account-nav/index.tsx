"use client"

import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import { Separator } from "@/components/ui/separator"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div>
      {/* Mobile Account Navigation */}
      <div className="small:hidden mb-6" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="inline-flex items-center gap-2 text-xs font-semibold text-foreground py-2 px-3 rounded-lg bg-muted border border-border"
            data-testid="account-main-link"
          >
            <ChevronDown className="transform rotate-90 size-4 text-muted-foreground" />
            <span>&larr; Nazad na pregled</span>
          </LocalizedClientLink>
        ) : (
          <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
            <div className="text-base font-bold text-foreground mb-3 pb-2 border-b border-border">
              Pozdrav, {customer?.first_name || "Korisnik"}
            </div>
            <ul className="flex flex-col gap-1 text-xs">
              <li>
                <LocalizedClientLink
                  href="/account/profile"
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-accent text-foreground transition-colors"
                  data-testid="profile-link"
                >
                  <div className="flex items-center gap-2.5">
                    <User size={16} className="text-muted-foreground" />
                    <span>Profil</span>
                  </div>
                  <ChevronDown className="transform -rotate-90 size-4 text-muted-foreground" />
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/account/addresses"
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-accent text-foreground transition-colors"
                  data-testid="addresses-link"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span>Adrese</span>
                  </div>
                  <ChevronDown className="transform -rotate-90 size-4 text-muted-foreground" />
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/account/orders"
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-accent text-foreground transition-colors"
                  data-testid="orders-link"
                >
                  <div className="flex items-center gap-2.5">
                    <Package size={16} className="text-muted-foreground" />
                    <span>Narudžbe</span>
                  </div>
                  <ChevronDown className="transform -rotate-90 size-4 text-muted-foreground" />
                </LocalizedClientLink>
              </li>
              <Separator className="my-1.5" />
              <li>
                <button
                  type="button"
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors w-full cursor-pointer"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  <div className="flex items-center gap-2.5">
                    <ArrowRightOnRectangle className="size-4" />
                    <span>Odjavi se</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Desktop Account Sidebar Card */}
      <div className="hidden small:block" data-testid="account-nav">
        <div className="rounded-xl border border-border bg-card p-3 shadow-2xs">
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Korisnički nalog
            </h3>
          </div>
          <ul className="flex flex-col gap-1 text-xs">
            <li>
              <AccountNavLink
                href="/account"
                route={route!}
                data-testid="overview-link"
              >
                Pregled
              </AccountNavLink>
            </li>
            <li>
              <AccountNavLink
                href="/account/profile"
                route={route!}
                data-testid="profile-link"
              >
                Profil
              </AccountNavLink>
            </li>
            <li>
              <AccountNavLink
                href="/account/addresses"
                route={route!}
                data-testid="addresses-link"
              >
                Adrese
              </AccountNavLink>
            </li>
            <li>
              <AccountNavLink
                href="/account/orders"
                route={route!}
                data-testid="orders-link"
              >
                Narudžbe
              </AccountNavLink>
            </li>
            <Separator className="my-2" />
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                data-testid="logout-button"
              >
                <span>Odjavi se</span>
                <ArrowRightOnRectangle className="size-3.5" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
        active
          ? "bg-muted text-foreground font-semibold shadow-2xs"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
      }`}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav

