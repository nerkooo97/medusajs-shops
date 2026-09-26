/**
 * Centralizovana konfiguracija za sve banere i vizuelne sekcije na web shopu.
 *
 * Ovaj fajl se koristi za definisanje slika i pratećih tekstova na specifičnim
 * pozicijama stranice (npr. login stranica, hero baneri, promo baneri itd.).
 *
 * Kada želite postaviti sliku, jednostavno navedite putanju (npr. '/images/login-banner.jpg')
 * ili eksterni URL u polje 'imageUrl'. Ako je polje prazno ili null, automatski se
 * prikazuje moderni sivi placeholder.
 */

export interface BannerConfig {
  /**
   * Putanja do slike (npr. "/banners/login.jpg" ili puni URL).
   * Ako je null ili undefined, prikazuje se sivi placeholder.
   */
  imageUrl?: string | null

  /**
   * Alt tekst za sliku radi SEO i pristupačnosti
   */
  alt?: string

  /**
   * Glavni naslov koji se ispisuje preko banera (opcionalno)
   */
  title?: string

  /**
   * Podnaslov ili prateći opis preko banera (opcionalno)
   */
  subtitle?: string

  /**
   * Mali bedž / oznaka iznad naslova (opcionalno)
   */
  badge?: string

  /**
   * Opcionalni link ukoliko je cijeli baner klikabilan
   */
  link?: string

  /**
   * Stepen zatamnjenja preko slike (od 0 do 1) radi bolje čitljivosti teksta
   * Default: 0.3
   */
  overlayOpacity?: number

  /**
   * Poravnanje teksta unutar banera
   */
  align?: "left" | "center" | "right"
}

export interface SiteBannersConfig {
  /**
   * Baneri za korisničke račune i autentifikaciju
   */
  auth: {
    /**
     * Baner na desnoj strani stranice za prijavu i registraciju
     */
    loginBanner: BannerConfig
  }

  /**
   * Baneri za početnu stranicu (Home)
   */
  home: {
    /**
     * Glavni hero baner na vrhu početne stranice
     */
    heroBanner?: BannerConfig

    /**
     * Sekundarni promotivni baner
     */
    promoBanner?: BannerConfig
  }

  /**
   * Baneri za korpu i checkout
   */
  checkout: {
    /**
     * Baner ili promo poruka u korpi/checkoutu
     */
    sidebarBanner?: BannerConfig
  }
}

export const siteBanners: SiteBannersConfig = {
  auth: {
    loginBanner: {
      imageUrl: null, // Postavite putanju do slike ovdje (npr. "/banners/auth-banner.jpg")
      alt: "Korisnički nalog baner",
      badge: "Korisnički Portal",
      title: "Vaš pouzdan partner za profesionalnu opremu",
      subtitle:
        "Prijavite se za jednostavan uvid u narudžbe, brzu ponovnu kupovinu i ekskluzivne pogodnosti.",
      overlayOpacity: 0.25,
      align: "left",
    },
  },
  home: {
    heroBanner: {
      imageUrl: null,
      alt: "Glavni baner",
      title: "Vrhunski alati i mašine za profesionalce",
      subtitle: "Kompletna ponuda ručnih, akumulatorskih i električnih alata na jednom mjestu.",
    },
    promoBanner: {
      imageUrl: null,
      alt: "Sezonska akcija",
      title: "Sezonska rasprodaja radioničke opreme",
      subtitle: "Iskoristite popuste do 30% na odabrani asortiman.",
    },
  },
  checkout: {
    sidebarBanner: {
      imageUrl: null,
      alt: "Sigurna kupovina",
      title: "100% Sigurna kupovina",
      subtitle: "Besplatan povrat u roku 14 dana i osigurana dostava širom BiH.",
    },
  },
}

export default siteBanners
