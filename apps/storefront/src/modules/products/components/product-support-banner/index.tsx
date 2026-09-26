import React from "react"
import Image from "next/image"
import { Phone, MessageCircle } from "lucide-react"

export default function ProductSupportBanner() {
  const phoneNumber = "080 020 261"
  const cleanPhone = "080020261"

  return (
    <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 shadow-xs mt-3">
      {/* Friendly Agent Photo */}
      <div className="relative size-24 sm:size-28 rounded-lg overflow-hidden shrink-0 border border-border/60 bg-muted/20">
        <Image
          src="/images/support-agent.jpg"
          alt="Korisnička podrška"
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      {/* Text Info & Controls */}
      <div className="flex-1 text-center sm:text-left space-y-1">
        <span className="text-xs font-bold text-foreground tracking-wide">
          Nazovi i kupi
        </span>

        <div>
          <a
            href={`tel:${cleanPhone}`}
            className="text-2xl sm:text-3xl font-black text-primary hover:opacity-90 transition-opacity tracking-tight block"
          >
            {phoneNumber}
          </a>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xs sm:max-w-none">
          Imate li pitanje u vezi ovog proizvoda? Postavite pitanje. Saznajte dostupnost ovoga proizvoda u našim trgovinama pozivom na broj.
        </p>

        {/* WhatsApp & Viber Icons */}
        <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/38761000000?text=Pozdrav,%20zanimam%20se%20za%20proizvod`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kontaktiraj nas na WhatsApp"
            className="size-7 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
          >
            <MessageCircle className="size-4 fill-white text-white" />
          </a>

          {/* Viber */}
          <a
            href={`viber://chat?number=%2B38761000000`}
            aria-label="Kontaktiraj nas na Viber"
            className="size-7 rounded-full bg-[#7360F2] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
          >
            <Phone className="size-3.5 fill-white text-white" />
          </a>
        </div>
      </div>
    </div>
  )
}
