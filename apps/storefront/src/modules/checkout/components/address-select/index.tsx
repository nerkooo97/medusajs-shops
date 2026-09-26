"use client"

import { useMemo } from "react"
import { Check, Phone, Plus } from "lucide-react"
import { clx } from "@modules/common/components/ui"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"

type AddressSelectProps = {
  addresses: HttpTypes.StoreCustomerAddress[]
  addressInput: HttpTypes.StoreCartAddress | null
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void
}

const AddressSelect = ({
  addresses,
  addressInput,
  onSelect,
}: AddressSelectProps) => {
  const selectedAddress = useMemo(() => {
    return addresses.find((a) => addressInput && compareAddresses(a, addressInput))
  }, [addresses, addressInput])

  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)
    if (savedAddress) {
      onSelect(savedAddress as unknown as HttpTypes.StoreCartAddress)
    }
  }

  const handleAddNew = () => {
    onSelect({
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      company: "",
      postal_code: "",
      city: "",
      country_code: "",
      province: "",
      phone: "",
    } as unknown as HttpTypes.StoreCartAddress)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
        {addresses.map((address) => {
          const isSelected = selectedAddress?.id === address.id

          return (
            <div
              key={address.id}
              onClick={() => handleSelect(address.id)}
              className={clx(
                "relative p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[190px] group select-none",
                isSelected
                  ? "border-[#0053E2] bg-[#0053E2]/5 shadow-xs ring-1 ring-[#0053E2]/20"
                  : "border-border/80 bg-background hover:bg-muted/30 hover:border-[#0053E2]/40 shadow-2xs"
              )}
              data-testid="shipping-address-card"
            >
              <div>
                {/* Header: Name, default badge, and selection check */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-foreground group-hover:text-[#0053E2] transition-colors">
                      {address.first_name} {address.last_name}
                    </span>
                    {address.is_default_shipping && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#0053E2]/10 text-[#0053E2]">
                        Zadana
                      </span>
                    )}
                  </div>
                  <div
                    className={clx(
                      "size-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                      isSelected
                        ? "border-[#0053E2] bg-[#0053E2] text-white"
                        : "border-muted-foreground/30 bg-card group-hover:border-[#0053E2]/50"
                    )}
                  >
                    {isSelected && <Check className="size-3 stroke-[3]" />}
                  </div>
                </div>

                {/* Company Name */}
                {address.company && (
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {address.company}
                  </p>
                )}

                {/* Address Details */}
                <div className="text-xs text-muted-foreground flex flex-col gap-0.5 leading-relaxed mt-2">
                  <span className="font-semibold text-foreground">
                    {address.address_1}
                    {address.address_2 ? `, ${address.address_2}` : ""}
                  </span>
                  <span>
                    {address.postal_code}, {address.city}
                  </span>
                  <span>
                    {address.province ? `${address.province}, ` : ""}
                    {address.country_code?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Phone number */}
              {address.phone && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-3 border-t border-border/50">
                  <Phone className="size-3.5 text-muted-foreground/70" />
                  <span>{address.phone}</span>
                </div>
              )}
            </div>
          )
        })}

        {/* Enter new address card button */}
        <div
          onClick={handleAddNew}
          className={clx(
            "p-5 rounded-xl border border-dashed flex flex-col justify-between text-left cursor-pointer transition-all duration-200 min-h-[190px] group select-none",
            !selectedAddress
              ? "border-[#0053E2] bg-[#0053E2]/5 shadow-xs ring-1 ring-[#0053E2]/20"
              : "border-border/80 bg-background hover:border-[#0053E2]/50 hover:bg-[#0053E2]/5"
          )}
          data-testid="enter-new-address-card"
        >
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-sm font-bold text-foreground group-hover:text-[#0053E2] transition-colors">
                Nova adresa
              </span>
              <div
                className={clx(
                  "size-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                  !selectedAddress
                    ? "border-[#0053E2] bg-[#0053E2] text-white"
                    : "border-muted-foreground/30 bg-card group-hover:border-[#0053E2]/50"
                )}
              >
                {!selectedAddress && <Check className="size-3 stroke-[3]" />}
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Želite isporuku na drugu adresu? Odaberite ovu opciju i unesite podatke u formu ispod.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0053E2] pt-3 border-t border-border/40">
            <Plus className="size-4 stroke-[2.5]" />
            <span>Unesi novu adresu</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressSelect
