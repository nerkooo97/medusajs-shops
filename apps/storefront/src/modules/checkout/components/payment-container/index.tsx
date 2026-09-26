import { Radio as RadioGroupOption } from "@headlessui/react"
import { Text, clx } from "@modules/common/components/ui"
import React, { useContext, type JSX } from "react"
import { isManual, isStripeLike } from "@lib/constants"
import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details"
import { PaymentElement } from "@stripe/react-stripe-js"
import PaymentTest from "../payment-test"
import { StripeContext } from "../payment-wrapper/stripe-wrapper"
import { Banknote, Check, CreditCard, Wallet } from "lucide-react"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
  children?: React.ReactNode
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const isSelected = selectedPaymentOptionId === paymentProviderId
  const isCashOnDelivery = isManual(paymentProviderId)
  const isCard = isStripeLike(paymentProviderId)

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "relative p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[140px] group select-none h-full",
        isSelected
          ? "border-[#0053E2] bg-[#0053E2]/5 shadow-xs ring-1 ring-[#0053E2]/20"
          : "border-border/80 bg-background hover:bg-muted/30 hover:border-[#0053E2]/40 shadow-2xs",
        {
          "opacity-50 cursor-not-allowed": disabled,
        }
      )}
    >
      <div>
        {/* Header: Icon + Title/Subtitle + Selection Check */}
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
              {isCashOnDelivery ? (
                <Banknote className="size-4.5 stroke-[2]" />
              ) : isCard ? (
                <CreditCard className="size-4.5 stroke-[2]" />
              ) : (
                <Wallet className="size-4.5 stroke-[2]" />
              )}
            </div>
            <div>
              <span className="text-sm font-bold text-foreground group-hover:text-[#0053E2] transition-colors block">
                {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
              </span>
              <span className="text-xs text-muted-foreground">
                {isCashOnDelivery
                  ? "Plaćanje gotovinom prilikom preuzimanja"
                  : isCard
                  ? "Sigurno online kartično plaćanje"
                  : "Elektronsko plaćanje"}
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

        {/* Development badge if test mode */}
        {isCashOnDelivery && isDevelopment && (
          <div className="mt-2">
            <PaymentTest className="text-[11px]" />
          </div>
        )}
      </div>

      {children}

      {!children && (
        <div className="flex items-baseline justify-between pt-3 border-t border-border/50 mt-3 text-xs text-muted-foreground">
          <span>{isCashOnDelivery ? "Način preuzimanja" : "Način naplate"}</span>
          <span className="font-semibold text-foreground">
            {isCashOnDelivery ? "Pouzećem" : "Odmah / Online"}
          </span>
        </div>
      )}
    </RadioGroupOption>
  )
}

export default PaymentContainer

export const StripePaymentContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setError,
  setPaymentComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setError: (error: string | null) => void
  setPaymentComplete: (complete: boolean) => void
}) => {
  const stripeReady = useContext(StripeContext)

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="my-3 pt-3 border-t border-border/60 transition-all duration-150 ease-in-out">
            <Text className="text-xs font-bold text-foreground mb-2">
              Unesite podatke vaše kartice:
            </Text>
            <PaymentElement
              options={{ layout: "accordion" }}
              onChange={(e) => {
                setError(null)
                setPaymentComplete(e.complete)
              }}
              onLoadError={(e) => {
                setPaymentComplete(false)
                setError(
                  e.error?.message ?? "Nije moguće učitati forme za plaćanje."
                )
              }}
            />
          </div>
        ) : (
          <SkeletonCardDetails />
        ))}
    </PaymentContainer>
  )
}
