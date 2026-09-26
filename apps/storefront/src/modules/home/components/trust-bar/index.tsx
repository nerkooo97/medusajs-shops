import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react"
import { homeConfig } from "@/config/home"

const iconMap = {
  truck: Truck,
  shield: ShieldCheck,
  creditCard: CreditCard,
  headphones: Headphones,
}

export default function TrustBar() {
  const { trustBar } = homeConfig

  return (
    <section className="content-container py-4 sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {trustBar.map((item, idx) => {
          const Icon = iconMap[item.icon] || ShieldCheck
          return (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/70 shadow-2xs hover:border-[#0053E2]/40 transition-colors"
            >
              <div className="size-11 rounded-lg bg-[#0053E2]/10 text-[#0053E2] flex items-center justify-center shrink-0">
                <Icon className="size-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
