import { retrieveCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CircleUser } from "lucide-react"
import HeaderAccountDropdown from "./dropdown"

export default async function HeaderAccount() {
  const customer = await retrieveCustomer().catch(() => null)

  if (customer) {
    return <HeaderAccountDropdown customer={customer} />
  }

  return (
    <LocalizedClientLink
      href="/account"
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-white font-semibold text-sm shrink-0"
      data-testid="nav-account-link"
    >
      <CircleUser className="size-6 text-white stroke-[1.8]" />
      <span className="hidden sm:inline text-sm font-semibold text-white truncate max-w-[120px]">
        Prijava
      </span>
    </LocalizedClientLink>
  )
}
