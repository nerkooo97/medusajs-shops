/**
 * Centralizovana konfiguracija za Footer web shopa.
 * Sve što se ne nalazi u bazi podataka je u potpunosti podesivo kroz ovaj fajl.
 */

export interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterPaymentBadge {
  id: string
  name: string
  imageUrl?: string | null
}

export interface FooterConfig {
  /**
   * Kolone sa linkovima (npr. Kupovina, Servisi, Informacije, Povežite se)
   */
  columns: FooterColumn[]

  /**
   * Kartica za Newsletter
   */
  newsletter: {
    title: string
    placeholder: string
    buttonAriaLabel: string
    disclaimer: string
    termsText: string
    termsHref: string
  }

  /**
   * Podržani načini plaćanja i certifikati (Monri, Mastercard, Visa, itd.)
   */
  paymentBadges: FooterPaymentBadge[]

  /**
   * Pravna napomena na dnu stranice
   */
  disclaimer: {
    storeName: string
    contactEmail: string
    textBeforeEmail: string
    textAfterEmail: string
  }

  /**
   * Copyright i autorizacija
   */
  copyright: {
    year: number
    companyName: string
    credits: string
  }

  /**
   * Istaknuti bedž za telefonsku podršku
   */
  supportPill: {
    label: string
    phoneNumber: string
    phoneTel: string
  }
}

export const footerConfig: FooterConfig = {
  columns: [
    {
      title: "Kupovina",
      links: [
        { label: "Česta pitanja", href: "/customer-service" },
        { label: "Registracija", href: "/account" },
        { label: "Kako da naručite?", href: "/customer-service" },
        { label: "Sigurnost", href: "/content/security" },
        { label: "Uslovi korištenja", href: "/content/terms-of-use" },
        { label: "Politika privatnosti", href: "/content/privacy-policy" },
      ],
    },
    {
      title: "Servisi",
      links: [
        { label: "Sigurno plaćanje", href: "/customer-service" },
        { label: "Garancija kvalitete", href: "/customer-service" },
        { label: "Reklamacije i povrat", href: "/customer-service" },
        { label: "Dostava", href: "/customer-service" },
        { label: "Načini plaćanja", href: "/customer-service" },
      ],
    },
    {
      title: "Informacije",
      links: [
        { label: "O nama", href: "/about-us" },
        { label: "Kategorije", href: "/store" },
        { label: "Novo u ponudi", href: "/store" },
        { label: "Prodajni centri", href: "/customer-service" },
        { label: "Novosti", href: "/customer-service" },
        { label: "Katalozi", href: "/customer-service" },
      ],
    },
    {
      title: "Povežite se",
      links: [
        { label: "Facebook", href: "https://facebook.com", isExternal: true },
        { label: "Linkedin", href: "https://linkedin.com", isExternal: true },
        { label: "Twitter", href: "https://twitter.com", isExternal: true },
        { label: "Instagram", href: "https://instagram.com", isExternal: true },
        { label: "Goolge Play", href: "https://play.google.com", isExternal: true },
        { label: "Apple App Store", href: "https://apple.com/app-store", isExternal: true },
      ],
    },
  ],

  newsletter: {
    title: "Newsletter",
    placeholder: "Vaša e-mail adresa",
    buttonAriaLabel: "Prijavite se na newsletter",
    disclaimer:
      "Prijavom pristajete da vam povremeno šaljemo akcijske cijene i novitete iz naše ponude. Možete se odjaviti u bilo kojem trenutku. Informacije o načinu korištenja ličnih podataka dostupne su ",
    termsText: "uslovima korištenja",
    termsHref: "/content/terms-of-use",
  },

  paymentBadges: [
    { id: "monri", name: "Monri" },
    { id: "mastercard", name: "Mastercard" },
    { id: "maestro", name: "Maestro" },
    { id: "visa", name: "VISA" },
    { id: "mastercard-securecode", name: "Mastercard SecureCode" },
    { id: "verified-by-visa", name: "Verified by VISA" },
    { id: "diners", name: "Diners Club" },
    { id: "discover", name: "Discover" },
  ],

  disclaimer: {
    storeName: "Online Shop",
    contactEmail: "podrska@shop.ba",
    textBeforeEmail:
      "Internet trgovina nastoji objavljivati samo provjerene i pravilne podatke. Ako na našoj stranici otkrijete neistinite, odnosno neadekvatne informacije, molimo vas da nam to javite na",
    textAfterEmail: ".",
  },

  copyright: {
    year: 2026,
    companyName: "Shop d.o.o.",
    credits: "Sva prava zadržana.",
  },

  supportPill: {
    label: "Besplatna korisnička podrška:",
    phoneNumber: "080 000 000",
    phoneTel: "tel:080000000",
  },
}

export default footerConfig
