import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Adrese",
  description: "Pregledajte i uredite vaše adrese za dostavu.",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-2">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Adrese za dostavu
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Pregledajte i ažurirajte adrese za dostavu. Možete dodati više adresa po želji.
          Spremljene adrese bit će vam automatski ponuđene tokom procesa kupovine.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
