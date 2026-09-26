"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CreditCard } from "@medusajs/icons"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripePaymentContainer,
} from "@modules/checkout/components/payment-container"
import {
  Button,
  Container,
  Text,
  clx,
} from "@modules/common/components/ui"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: { id: string }[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards && ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && cart?.total === 0
  )

  const paymentReady =
    (activeSession && (cart?.shipping_methods?.length ?? 0) !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputPaymentDetails =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputPaymentDetails) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const isCompleted = !isOpen && paymentReady

  return (
    <div className="bg-card rounded-2xl border border-border/80 p-5 sm:p-7 shadow-xs">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2
          className={clx(
            "flex flex-row text-xl sm:text-2xl font-extrabold text-foreground gap-x-2.5 items-center",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          <span>3. Način plaćanja</span>
          {isCompleted && <CheckCircle2 className="size-5 text-emerald-600 stroke-[2.2]" />}
        </h2>
        {isCompleted && (
          <button
            onClick={handleEdit}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
            data-testid="edit-payment-button"
          >
            Izmijeni
          </button>
        )}
      </div>

      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <div className="pt-2">
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
                className="w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                  {availablePaymentMethods.map((paymentMethod) => {
                    const isStripe = isStripeLike(paymentMethod.id)
                    const isSelected = selectedPaymentMethod === paymentMethod.id

                    return (
                      <div
                        key={paymentMethod.id}
                        className={clx(
                          isStripe && isSelected ? "sm:col-span-2" : "col-span-1"
                        )}
                      >
                        {isStripe ? (
                          <StripePaymentContainer
                            paymentProviderId={paymentMethod.id}
                            selectedPaymentOptionId={selectedPaymentMethod}
                            paymentInfoMap={paymentInfoMap}
                            setError={setError}
                            setPaymentComplete={setPaymentComplete}
                          />
                        ) : (
                          <PaymentContainer
                            paymentInfoMap={paymentInfoMap}
                            paymentProviderId={paymentMethod.id}
                            selectedPaymentOptionId={selectedPaymentMethod}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>
            </div>
          )}

          {paidByGiftcard && (
            <div className="p-4 bg-muted/20 border border-border/60 rounded-xl">
              <Text className="font-bold text-foreground text-xs uppercase tracking-wide">
                Način plaćanja
              </Text>
              <Text
                className="text-foreground/90 font-medium text-sm mt-0.5"
                data-testid="payment-method-summary"
              >
                Poklon kartica (Gift card)
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <div className="pt-4">
            <Button
              className="w-full sm:w-auto h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-xs cursor-pointer transition-all"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={
                (isStripeLike(selectedPaymentMethod) && !paymentComplete) ||
                (!selectedPaymentMethod && !paidByGiftcard)
              }
              data-testid="submit-payment-button"
            >
              {!activeSession && isStripeLike(selectedPaymentMethod)
                ? "Unesite podatke kartice"
                : "Pregledaj narudžbu"}
            </Button>
          </div>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="bg-muted/20 rounded-xl p-4 border border-border/60 flex items-center justify-between text-xs sm:text-sm">
              <div>
                <p className="font-bold text-foreground text-xs uppercase tracking-wide">
                  Odabrano plaćanje
                </p>
                <p
                  className="text-foreground/90 font-medium mt-0.5"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[activeSession?.provider_id]?.title ||
                    activeSession?.provider_id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Container className="flex items-center size-8 p-1.5 bg-white border border-border/60 rounded-lg justify-center">
                  {paymentInfoMap[selectedPaymentMethod]?.icon || (
                    <CreditCard />
                  )}
                </Container>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="bg-muted/20 rounded-xl p-4 border border-border/60">
              <p className="font-bold text-foreground text-xs uppercase tracking-wide">
                Način plaćanja
              </p>
              <p
                className="text-foreground/90 font-medium mt-0.5"
                data-testid="payment-method-summary"
              >
                Poklon kartica
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Payment
