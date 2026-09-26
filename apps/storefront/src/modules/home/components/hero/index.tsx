import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ImagePlaceholder from "@modules/common/components/image-placeholder"
import { homeConfig } from "@/config/home"

const Hero = () => {
  const { hero } = homeConfig

  return (
    <section className="content-container pt-4 pb-8 sm:pt-6 sm:pb-10">
      <div className="bg-[#0053E2] text-white rounded-2xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {hero.badge && (
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90 bg-white/15 px-3 py-1 rounded-md w-fit mb-4">
                {hero.badge}
              </span>
            )}

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {hero.title}
            </h1>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/85 max-w-xl leading-relaxed">
              {hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {hero.primaryCta && (
                <LocalizedClientLink
                  href={hero.primaryCta.link}
                  className="px-6 py-3 rounded-lg bg-white text-[#0053E2] font-bold text-sm shadow-xs hover:bg-white/95 active:scale-[0.98] transition-all"
                >
                  {hero.primaryCta.text}
                </LocalizedClientLink>
              )}

              {hero.secondaryCta && (
                <LocalizedClientLink
                  href={hero.secondaryCta.link}
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm transition-all"
                >
                  {hero.secondaryCta.text}
                </LocalizedClientLink>
              )}
            </div>
          </div>

          {/* Right: Clean Visual / Placeholder */}
          <div className="lg:col-span-5">
            <ImagePlaceholder
              imageUrl={hero.imageUrl}
              alt={hero.imageAlt || hero.title}
              label={hero.placeholderLabel || "Placeholder: Glavna hero slika"}
              aspectRatio="aspect-[4/3]"
              className="!bg-white/10 !border-white/25 !text-white/80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
