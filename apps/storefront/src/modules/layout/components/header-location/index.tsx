import { retrieveCustomer } from "@lib/data/customer"
import { listRegions } from "@lib/data/regions"
import HeaderLocationModal from "./modal"

export default async function HeaderLocation() {
  const customer = await retrieveCustomer().catch(() => null)
  const regions = await listRegions().catch(() => [])

  const countries =
    regions
      ?.flatMap((region) =>
        (region.countries || []).map((country) => ({
          value: country.iso_2?.toLowerCase() || "",
          label: country.display_name || country.iso_2?.toUpperCase() || "",
        }))
      )
      .filter((c) => Boolean(c.value)) || []

  // Ensure default fallback if empty
  if (countries.length === 0) {
    countries.push({ value: "ba", label: "Bosna i Hercegovina" })
  }

  return <HeaderLocationModal customer={customer} countries={countries} />
}

