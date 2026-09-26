import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { footerConfig } from "@/config/footer"
import { PaymentBadge } from "@modules/layout/components/footer-payment-badges"
import FooterNewsletter from "@modules/layout/components/footer-newsletter"

export default async function Footer() {
  const config = footerConfig

  return (
    <footer className="border-t border-border bg-white text-foreground">
      <div className="content-container py-12 sm:py-16">
        {/* Top Section: 4 Link Columns + 1 Newsletter Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-8 mb-12">
          {/* Navigation link columns (span 7 or 8 on desktop) */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {config.columns.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col">
                <h3 className="text-sm font-bold text-foreground mb-4 tracking-tight">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <LocalizedClientLink
                          href={link.href}
                          className="hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </LocalizedClientLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Newsletter Card (span 4 on desktop) */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-4">
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom Section: Legal Disclaimer + Copyright on Left, Payment Badges on Right */}
        <div className="border-t border-border/80 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Info & Copyright */}
          <div className="flex flex-col gap-2 max-w-2xl text-[11px] text-muted-foreground leading-relaxed">
            <p>
              {config.disclaimer.textBeforeEmail}{" "}
              <a
                href={`mailto:${config.disclaimer.contactEmail}`}
                className="text-foreground hover:underline font-medium"
              >
                {config.disclaimer.contactEmail}
              </a>
              {config.disclaimer.textAfterEmail}
            </p>
            <p className="text-foreground/80 font-normal">
              Copyright &copy; {config.copyright.year}. {config.copyright.companyName}.{" "}
              <span>{config.copyright.credits}</span>
            </p>
          </div>

          {/* Right: Payment Provider Badges (replacing support number) */}
          <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2.5">
            {config.paymentBadges.map((badge) => (
              <PaymentBadge key={badge.id} id={badge.id} name={badge.name} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
