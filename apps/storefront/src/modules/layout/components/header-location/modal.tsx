"use client"

import React, { useState, useEffect, useActionState } from "react"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { MapPin, Check, Plus, ArrowLeft, LogIn, Building, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { addCustomerAddress } from "@lib/data/customer"

type CountryOption = {
  value: string
  label: string
}

type HeaderLocationModalProps = {
  customer: HttpTypes.StoreCustomer | null
  countries: CountryOption[]
}

export default function HeaderLocationModal({
  customer,
  countries,
}: HeaderLocationModalProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const addresses = customer?.addresses || []
  const defaultAddress =
    addresses.find((a) => a.is_default_shipping) || addresses[0] || null

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    defaultAddress?.id || null
  )

  useEffect(() => {
    if (!selectedAddressId && defaultAddress) {
      setSelectedAddressId(defaultAddress.id)
    }
  }, [defaultAddress, selectedAddressId])

  // Active address selected for display
  const activeAddress = addresses.find((a) => a.id === selectedAddressId) || defaultAddress

  // Add address form state
  const [formState, formAction, isPending] = useActionState(addCustomerAddress, {
    success: false,
    error: null,
  } as { success: boolean; error: string | null })

  useEffect(() => {
    if (formState?.success) {
      setIsAddingNew(false)
      setIsOpen(false)
      router.refresh()
    }
  }, [formState, router])

  // Select an address and close
  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id)
    setIsOpen(false)
  }

  // Header display label
  const locationHeaderTitle = activeAddress
    ? `Dostava za ${activeAddress.city}`
    : "Dostava za Sarajevo"

  const locationHeaderSubtitle = activeAddress
    ? activeAddress.address_1
    : customer
    ? "Dodaj adresu"
    : "Promijeni lokaciju"

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          setIsAddingNew(false)
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left shrink-0 cursor-pointer text-white"
          data-testid="header-location-trigger"
        >
          <MapPin className="size-5 text-white/80 stroke-[1.8] shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[11px] text-white/80 font-normal leading-tight">
              {locationHeaderTitle}
            </span>
            <span className="text-xs font-semibold text-white leading-tight truncate max-w-[140px]">
              {locationHeaderSubtitle}
            </span>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg p-6">
        {/* CASE 1: USER NOT LOGGED IN */}
        {!customer ? (
          <div className="flex flex-col gap-5 py-2">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                <MapPin className="size-5 text-primary" />
                Lokacija za dostavu
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1">
                Prijavite se na vaš korisnički račun za odabir i upravljanje adresama.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl border border-border bg-muted/40 p-5 flex flex-col items-center text-center gap-3">
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <LogIn className="size-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">
                  Potrebna je prijava
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                  Kako biste mogli odabrati ili spremiti adrese za brzu i tačnu dostavu, molimo prijavite se na vaš korisnički račun.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <Button asChild className="w-full h-11 font-medium cursor-pointer">
                <LocalizedClientLink
                  href="/account"
                  onClick={() => setIsOpen(false)}
                >
                  Prijavite se na račun
                </LocalizedClientLink>
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Nemate račun?{" "}
                <LocalizedClientLink
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="font-semibold text-foreground hover:underline"
                >
                  Registrujte se
                </LocalizedClientLink>
              </p>
            </div>
          </div>
        ) : isAddingNew || addresses.length === 0 ? (
          /* CASE 3: USER LOGGED IN, ADDING NEW ADDRESS OR NO ADDRESSES EXIST */
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Plus className="size-5 text-primary" />
                  Nova adresa za dostavu
                </DialogTitle>
                {addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <ArrowLeft className="size-3.5" />
                    Nazad na adrese
                  </button>
                )}
              </div>
              <DialogDescription className="text-xs text-muted-foreground">
                Unesite tražene podatke za kreiranje nove adrese za dostavu.
              </DialogDescription>
            </DialogHeader>

            <form action={formAction} className="flex flex-col gap-3 pt-2">
              <input type="hidden" name="isDefaultShipping" value="true" />

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Ime *</label>
                  <Input
                    name="first_name"
                    required
                    placeholder="Ime"
                    defaultValue={customer.first_name || ""}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Prezime *</label>
                  <Input
                    name="last_name"
                    required
                    placeholder="Prezime"
                    defaultValue={customer.last_name || ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Firma / Kompanija</label>
                  <Input name="company" placeholder="Naziv firme (opcionalno)" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Broj telefona *</label>
                  <Input
                    name="phone"
                    required
                    type="tel"
                    placeholder="+387 61 000 000"
                    defaultValue={customer.phone || ""}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Ulica i kućni broj *</label>
                <Input name="address_1" required placeholder="npr. Maršala Tita 24" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Broj stana, sprat, ulaz</label>
                <Input name="address_2" placeholder="Sprat 3, stan 12 (opcionalno)" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Grad *</label>
                  <Input name="city" required placeholder="Sarajevo" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground">Poštanski broj *</label>
                  <Input name="postal_code" required placeholder="71000" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground">Država *</label>
                <select
                  name="country_code"
                  required
                  defaultValue={countries[0]?.value || "ba"}
                  className="w-full h-10 px-3 py-2 text-xs rounded-md border border-input bg-background text-foreground outline-none focus:ring-1 focus:ring-ring"
                >
                  {countries.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {formState?.error && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {formState.error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 mt-2 font-medium cursor-pointer"
              >
                {isPending ? "Spremanje adrese..." : "Spasi i postavi adresu"}
              </Button>
            </form>
          </div>
        ) : (
          /* CASE 2: USER LOGGED IN WITH SAVED ADDRESSES */
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                <MapPin className="size-5 text-primary" />
                Odaberite adresu za dostavu
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Odaberite jednu od vaših spremljenih adresa za brzu i tačnu isporuku:
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1 py-1">
              {addresses.map((addr) => {
                const isSelected = addr.id === activeAddress?.id

                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelectAddress(addr.id)}
                    className={`relative p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-2xs"
                        : "border-border bg-card hover:bg-muted/40 hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">
                            {addr.first_name} {addr.last_name}
                          </span>
                          {addr.is_default_shipping && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                              Zadana
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-foreground font-medium">
                          {addr.address_1}
                          {addr.address_2 ? `, ${addr.address_2}` : ""}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {addr.postal_code}, {addr.city} &bull;{" "}
                          {addr.country_code?.toUpperCase()}
                        </p>

                        {addr.phone && (
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-0.5">
                            <Phone className="size-3" />
                            <span>{addr.phone}</span>
                          </div>
                        )}
                      </div>

                      <div
                        className={`size-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground/40"
                        }`}
                      >
                        {isSelected && <Check className="size-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingNew(true)}
                className="w-full flex items-center justify-center gap-2 text-xs font-medium cursor-pointer"
              >
                <Plus className="size-4" />
                Dodaj novu adresu
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
