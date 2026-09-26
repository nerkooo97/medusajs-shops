"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import { Button, clx } from "@modules/common/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Check, CheckCircle2, Store, Truck, Zap } from "lucide-react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => (sm as unknown as { service_zone?: { fulfillment_set?: { type?: string; location?: { address: HttpTypes.StoreCartAddress } } } }).service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => (sm as unknown as { service_zone?: { fulfillment_set?: { type?: string; location?: { address: HttpTypes.StoreCartAddress } } } }).service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => {
              if (p.value?.id) {
                pricesMap[p.value.id] = p.value.amount ?? 0
              }
            })

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const isCompleted = !isOpen && (cart.shipping_methods?.length ?? 0) > 0

  return (
    <div className="bg-card rounded-2xl border border-border/80 p-5 sm:p-7 shadow-xs">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2
          className={clx(
            "flex flex-row text-xl sm:text-2xl font-extrabold text-foreground gap-x-2.5 items-center",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          <span>2. Način dostave</span>
          {isCompleted && <CheckCircle2 className="size-5 text-emerald-600 stroke-[2.2]" />}
        </h2>
        {isCompleted && (
          <button
            onClick={handleEdit}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
            data-testid="edit-delivery-button"
          >
            Izmijeni
          </button>
        )}
      </div>

      {isOpen ? (
        <div className="space-y-4 pt-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-foreground">
              Odaberite opciju dostave
            </span>
            <span className="text-xs text-muted-foreground">
              Kako želite da vam narudžba bude dostavljena?
            </span>
          </div>

          <div data-testid="delivery-options-container" className="pt-2">
            {hasPickupOptions && (
              <div className="mb-3.5">
                <RadioGroup
                  value={showPickupOptions}
                  onChange={(_value) => {
                    const id = _pickupMethods.find(
                      (option) => !option.insufficient_inventory
                    )?.id

                    if (id) {
                      handleSetShippingMethod(id, "pickup")
                    }
                  }}
                >
                  <Radio
                    value={PICKUP_OPTION_ON}
                    data-testid="delivery-option-radio"
                    className={clx(
                      "relative p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between group select-none min-h-[140px]",
                      showPickupOptions === PICKUP_OPTION_ON
                        ? "border-[#0053E2] bg-[#0053E2]/5 shadow-xs ring-1 ring-[#0053E2]/20"
                        : "border-border/80 bg-background hover:bg-muted/30 hover:border-[#0053E2]/40 shadow-2xs"
                    )}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={clx(
                              "size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                              showPickupOptions === PICKUP_OPTION_ON
                                ? "bg-[#0053E2]/10 text-[#0053E2]"
                                : "bg-muted text-muted-foreground group-hover:text-foreground"
                            )}
                          >
                            <Store className="size-4.5 stroke-[2]" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-foreground group-hover:text-[#0053E2] transition-colors block">
                              Lično preuzimanje u trgovini
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Preuzmite narudžbu lično u našoj poslovnici
                            </span>
                          </div>
                        </div>

                        <div
                          className={clx(
                            "size-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                            showPickupOptions === PICKUP_OPTION_ON
                              ? "border-[#0053E2] bg-[#0053E2] text-white"
                              : "border-muted-foreground/30 bg-card group-hover:border-[#0053E2]/50"
                          )}
                        >
                          {showPickupOptions === PICKUP_OPTION_ON && (
                            <Check className="size-3 stroke-[3]" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between pt-3 border-t border-border/50 mt-3">
                      <span className="text-xs text-muted-foreground">Cijena</span>
                      <span className="text-base font-extrabold text-emerald-600">
                        Besplatno
                      </span>
                    </div>
                  </Radio>
                </RadioGroup>
              </div>
            )}

            <RadioGroup
              value={shippingMethodId}
              onChange={(v) => {
                if (v) {
                  return handleSetShippingMethod(v, "shipping")
                }
              }}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                {_shippingMethods?.map((option) => {
                  const isDisabled =
                    option.price_type === "calculated" &&
                    !isLoadingPrices &&
                    typeof calculatedPricesMap[option.id] !== "number"

                  const isSelected = option.id === shippingMethodId
                  const isExpress =
                    option.name.toLowerCase().includes("express") ||
                    option.name.toLowerCase().includes("brz")

                  return (
                    <Radio
                      key={option.id}
                      value={option.id}
                      data-testid="delivery-option-radio"
                      disabled={isDisabled}
                      className={clx(
                        "relative p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[140px] group select-none",
                        isSelected
                          ? "border-[#0053E2] bg-[#0053E2]/5 shadow-xs ring-1 ring-[#0053E2]/20"
                          : "border-border/80 bg-background hover:bg-muted/30 hover:border-[#0053E2]/40 shadow-2xs",
                        {
                          "opacity-50 cursor-not-allowed": isDisabled,
                        }
                      )}
                    >
                      <div>
                        {/* Header: Icon + Name + Selection Check */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={clx(
                                "size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                isSelected
                                  ? "bg-[#0053E2]/10 text-[#0053E2]"
                                  : "bg-muted text-muted-foreground group-hover:text-foreground"
                              )}
                            >
                              {isExpress ? (
                                <Zap className="size-4.5 stroke-[2.2]" />
                              ) : (
                                <Truck className="size-4.5 stroke-[2]" />
                              )}
                            </div>
                            <div>
                              <span className="text-sm font-bold text-foreground group-hover:text-[#0053E2] transition-colors block">
                                {option.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {isExpress
                                  ? "Brza dostava (1-2 radna dana)"
                                  : "Standardna dostava (2-4 radna dana)"}
                              </span>
                            </div>
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
                      </div>

                      {/* Bottom Price */}
                      <div className="flex items-baseline justify-between pt-3 border-t border-border/50 mt-3">
                        <span className="text-xs text-muted-foreground">
                          Cijena dostave
                        </span>
                        <span className="text-base font-extrabold text-foreground">
                          {option.price_type === "flat" ? (
                            option.amount === 0 ? (
                              <span className="text-emerald-600 font-bold">
                                Besplatno
                              </span>
                            ) : (
                              convertToLocale({
                                amount: option.amount!,
                                currency_code: cart?.currency_code,
                              })
                            )
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart?.currency_code,
                            })
                          ) : isLoadingPrices ? (
                            <Loader className="animate-spin size-4" />
                          ) : (
                            "-"
                          )}
                        </span>
                      </div>
                    </Radio>
                  )
                })}
              </div>
            </RadioGroup>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="pt-3">
              <span className="text-xs font-bold text-foreground block mb-2">
                Dostupne lokacije za preuzimanje:
              </span>
              <div className="space-y-2">
                {_pickupMethods?.map((option) => (
                  <div
                    key={option.id}
                    className="p-3 bg-muted/20 border border-border/60 rounded-xl text-xs flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-foreground">{option.name}</p>
                      <p className="text-muted-foreground mt-0.5">
                        {formatAddress(
                          (option as unknown as { service_zone?: { fulfillment_set?: { location?: { address: HttpTypes.StoreCartAddress } } } }).service_zone?.fulfillment_set?.location?.address as HttpTypes.StoreCartAddress
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              className="w-full sm:w-auto h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-xs cursor-pointer transition-all mt-2"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cart.shipping_methods?.[0]}
              data-testid="submit-delivery-option-button"
            >
              Nastavi na plaćanje
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
            <div className="bg-muted/20 rounded-xl p-4 border border-border/60 flex items-center justify-between text-xs sm:text-sm">
              <div>
                <p className="font-bold text-foreground text-xs uppercase tracking-wide">
                  Odabrani način dostave
                </p>
                <p className="text-foreground/90 font-medium mt-0.5">
                  {cart.shipping_methods!.at(-1)!.name}
                </p>
              </div>
              <span className="font-extrabold text-foreground text-sm">
                {convertToLocale({
                  amount: cart.shipping_methods!.at(-1)!.amount!,
                  currency_code: cart?.currency_code,
                })}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Shipping
