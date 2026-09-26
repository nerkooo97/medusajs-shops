/**
 * Konfiguracija za početnu stranicu (Homepage).
 *
 * Ovdje možete mijenjati tekstove, naslove, linkove, kontakt podatke i slike
 * za sve sekcije na početnoj stranici (Hero, Trust bar, Promo baner, Brendovi itd.).
 *
 * Ako je 'imageUrl' null ili undefined, na tom mjestu se automatski prikazuje
 * jednostavan placeholder.
 */

export interface HomeConfig {
  hero: {
    badge?: string
    title: string
    subtitle: string
    primaryCta: {
      text: string
      link: string
    }
    secondaryCta?: {
      text: string
      link: string
    }
    imageUrl?: string | null
    imageAlt?: string
    placeholderLabel?: string
    sideCards?: {
      badge?: string
      title: string
      description: string
      linkText: string
      link: string
      imageUrl?: string | null
      placeholderLabel?: string
    }[]
  }

  trustBar: {
    title: string
    description: string
    icon: "truck" | "shield" | "creditCard" | "headphones"
  }[]

  categoriesSection: {
    badge: string
    title: string
    viewAllText: string
    viewAllLink: string
    items: {
      title: string
      handle: string
      description: string
      icon: "battery" | "zap" | "wrench" | "warehouse" | "trees" | "shield"
      imageUrl?: string | null
    }[]
  }

  featuredSection: {
    badge: string
    title: string
    viewAllText: string
    viewAllLink: string
  }

  promoBanner: {
    badge: string
    title: string
    description: string
    bulletPoints: string[]
    primaryCta: {
      text: string
      link: string
    }
    phone?: string
    imageUrl?: string | null
    placeholderLabel?: string
  }

  brands: {
    title: string
    list: string[]
  }
}

export const homeConfig: HomeConfig = {
  hero: {
    badge: "Profesionalni alati",
    title: "Vrhunski alati i oprema za profesionalce i majstore",
    subtitle:
      "Širok asortiman akumulatorskih mašina, električnog i ručnog alata uz brzu dostavu i garanciju.",
    primaryCta: {
      text: "Pregledaj ponudu",
      link: "/store",
    },
    secondaryCta: {
      text: "Svi proizvodi",
      link: "/store",
    },
    imageUrl: null,
    imageAlt: "Glavna hero slika alata",
    placeholderLabel: "Placeholder: Glavna hero slika alata",
    sideCards: [
      {
        badge: "18V & 36V Pro",
        title: "Akumulatorski alati",
        description: "Maksimalna mobilnost i snaga bez kablova.",
        linkText: "Istraži aku alate",
        link: "/store",
        imageUrl: null,
        placeholderLabel: "Placeholder: Aku bušilice i setovi",
      },
      {
        badge: "Radionica & Garaža",
        title: "Kompletni setovi alata",
        description: "Koferi i garniture alata za servis i radionicu.",
        linkText: "Pregledaj setove",
        link: "/store",
        imageUrl: null,
        placeholderLabel: "Placeholder: Setovi alata u koferu",
      },
    ],
  },

  trustBar: [
    {
      title: "Brza dostava",
      description: "Besplatna dostava za sve narudžbe preko 100,00 KM.",
      icon: "truck",
    },
    {
      title: "Ovlaštena garancija",
      description: "Do 3 godine tvorničke garancije uz osiguran servis.",
      icon: "shield",
    },
    {
      title: "Fleksibilno plaćanje",
      description: "Gotovinom pouzećem, karticama ili virmanom.",
      icon: "creditCard",
    },
    {
      title: "Korisnička podrška",
      description: "Stručni savjeti našeg tima pri odabiru opreme.",
      icon: "headphones",
    },
  ],

  categoriesSection: {
    badge: "Katalog",
    title: "Popularne kategorije",
    viewAllText: "Pogledaj sve kategorije",
    viewAllLink: "/store",
    items: [
      {
        title: "Akumulatorski alati",
        handle: "akumulatorski-alati",
        description: "Bušilice, brusilice i baterijski paketi.",
        icon: "battery",
        imageUrl: null,
      },
      {
        title: "Električni alati",
        handle: "elektricni-alati",
        description: "Ugaone brusilice, testere i čekići.",
        icon: "zap",
        imageUrl: null,
      },
      {
        title: "Ručni alati",
        handle: "rucni-alati",
        description: "Ključevi, nasadni setovi i kliješta.",
        icon: "wrench",
        imageUrl: null,
      },
      {
        title: "Radionica i garaža",
        handle: "radionica-i-garaza",
        description: "Dizalice, radionička kolica i stalci.",
        icon: "warehouse",
        imageUrl: null,
      },
      {
        title: "Vrt i bašta",
        handle: "vrt-i-basta",
        description: "Kosilice, trimeri i perači pod pritiskom.",
        icon: "trees",
        imageUrl: null,
      },
      {
        title: "Zaštitna oprema",
        handle: "zastitna-oprema",
        description: "Zaštitne rukavice, obuća i naočale.",
        icon: "shield",
        imageUrl: null,
      },
    ],
  },

  featuredSection: {
    badge: "Aktuelna ponuda",
    title: "Izdvojeni alati i mašine",
    viewAllText: "Pregledaj sve artikle",
    viewAllLink: "/store",
  },

  promoBanner: {
    badge: "B2B & Majstori",
    title: "Kompletno opremanje radionica i gradilišta",
    description:
      "Za pravna lica i majstore obezbjeđujemo posebne veleprodajne pogodnosti, odgođeno plaćanje i prioritetnu isporuku.",
    bulletPoints: [
      "R1 računi za firme i obrte",
      "Količinski popusti i rabati",
      "Osigurani rezervni dijelovi",
      "Brza isporuka na adresu",
    ],
    primaryCta: {
      text: "Zatražite ponudu",
      link: "/customer-service",
    },
    phone: "080 020 261",
    imageUrl: null,
    placeholderLabel: "Placeholder: Industrijska oprema i radionica",
  },

  brands: {
    title: "Vodeći svjetski brendovi alata",
    list: [
      "BOSCH Professional",
      "MAKITA",
      "DEWALT",
      "MILWAUKEE",
      "METABO",
      "EINHELL",
      "UNIOR",
    ],
  },
}

export default homeConfig
