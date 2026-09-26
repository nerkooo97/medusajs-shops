import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ImagePlaceholder from "@modules/common/components/image-placeholder"
import { homeConfig } from "@/config/home"
import {
  BatteryCharging,
  Zap,
  Wrench,
  Warehouse,
  Trees,
  Shield,
  ArrowRight,
} from "lucide-react"

const iconMap = {
  battery: BatteryCharging,
  zap: Zap,
  wrench: Wrench,
  warehouse: Warehouse,
  trees: Trees,
  shield: Shield,
}

export default function CategoryShowcase() {
  const { categoriesSection } = homeConfig

  return (
    <section className="content-container py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-border/60">
        <div>
          {categoriesSection.badge && (
            <span className="text-xs font-bold uppercase tracking-wider text-[#0053E2]">
              {categoriesSection.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
            {categoriesSection.title}
          </h2>
        </div>
        <LocalizedClientLink
          href={categoriesSection.viewAllLink}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0053E2] hover:underline"
        >
          <span>{categoriesSection.viewAllText}</span>
          <ArrowRight className="size-4" />
        </LocalizedClientLink>
      </div>

      {/* Grid of category cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categoriesSection.items.map((cat, idx) => {
          const Icon = iconMap[cat.icon] || Wrench
          return (
            <LocalizedClientLink
              key={idx}
              href={`/categories/${cat.handle}`}
              className="group flex flex-col bg-card border border-border/70 rounded-xl p-3 sm:p-4 hover:border-[#0053E2]/50 hover:shadow-md transition-all duration-200"
            >
              {/* Category Image Placeholder */}
              <div className="mb-3">
                <ImagePlaceholder
                  imageUrl={cat.imageUrl}
                  alt={cat.title}
                  label={`Placeholder: ${cat.title}`}
                  aspectRatio="aspect-square"
                />
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-2 mb-1">
                <div className="size-6 rounded-md bg-[#0053E2]/10 text-[#0053E2] flex items-center justify-center shrink-0">
                  <Icon className="size-3.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-[#0053E2] transition-colors line-clamp-1">
                  {cat.title}
                </h3>
              </div>

              {/* Short Description */}
              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 mb-2 leading-tight">
                {cat.description}
              </p>

              {/* Action */}
              <div className="mt-auto pt-2 border-t border-border/40 flex items-center justify-between text-[11px] font-semibold text-[#0053E2] group-hover:translate-x-0.5 transition-transform">
                <span>Pregledaj</span>
                <ArrowRight className="size-3" />
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </section>
  )
}
