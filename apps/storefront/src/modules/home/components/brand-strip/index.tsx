import { homeConfig } from "@/config/home"

export default function BrandStrip() {
  const { brands } = homeConfig

  return (
    <section className="content-container py-8 sm:py-10">
      <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">
          {brands.title}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 items-center">
          {brands.list.map((brand, idx) => (
            <div
              key={idx}
              className="h-14 rounded-xl border border-dashed border-border/80 bg-muted/30 flex items-center justify-center p-2 text-center hover:bg-muted/60 hover:border-[#0053E2]/40 transition-all group"
            >
              <span className="text-xs sm:text-sm font-black tracking-wider text-muted-foreground group-hover:text-foreground transition-colors uppercase select-none">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
