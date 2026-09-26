import React from "react"
import { Banknote, Truck, RotateCcw } from "lucide-react"
import { storeBenefitsConfig, StoreBenefit } from "@lib/config/store-benefits"

const getBenefitIcon = (iconType: StoreBenefit["icon"]) => {
  switch (iconType) {
    case "payment":
      return <Banknote className="size-4.5 stroke-[1.8]" />
    case "delivery":
      return <Truck className="size-4.5 stroke-[1.8]" />
    case "returns":
      return <RotateCcw className="size-4.5 stroke-[1.8]" />
    default:
      return null
  }
}

export default function ProductBenefits({ benefits = storeBenefitsConfig }: { benefits?: StoreBenefit[] }) {
  if (!benefits || benefits.length === 0) {
    return null
  }

  return (
    <div className="w-full divide-y divide-border/70 border-t border-b border-border/70 my-2">
      {benefits.map((benefit) => (
        <div key={benefit.id} className="flex items-start gap-3.5 py-3.5">
          <div className="size-8 rounded-lg bg-muted/50 flex items-center justify-center text-foreground shrink-0 mt-0.5">
            {getBenefitIcon(benefit.icon)}
          </div>
          <div className="text-xs leading-snug">
            <p className="font-bold text-foreground">{benefit.title}</p>
            <p className="text-muted-foreground mt-0.5">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
