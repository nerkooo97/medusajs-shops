import React from "react"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@/components/ui/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div
      className="flex-1 min-h-[calc(100vh-200px)] bg-background flex flex-col justify-between"
      data-testid="account-page"
    >
      <div className="content-container max-w-5xl mx-auto flex-1 w-full">
        {customer ? (
          <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-8 sm:py-12 gap-8">
            <div>
              <AccountNav customer={customer} />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center py-8 sm:py-12 w-full">
            {children}
          </div>
        )}
      </div>

      {/* Support Section - Full width with background, no card / border around itself */}
      <section className="w-full bg-muted/60 py-8 sm:py-10 mt-8">
        <div className="content-container max-w-5xl mx-auto flex flex-col small:flex-row items-start small:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              Trebate pomoć ili imate pitanja?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Naša korisnička podrška stoji vam na raspolaganju za sva vaša pitanja.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="shrink-0 cursor-pointer bg-background hover:bg-accent font-medium shadow-2xs"
          >
            <LocalizedClientLink href="/customer-service">
              Korisnička podrška
            </LocalizedClientLink>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default AccountLayout
