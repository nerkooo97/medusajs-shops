import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import TrustBar from "@modules/home/components/trust-bar"
import CategoryShowcase from "@modules/home/components/category-showcase"
import FeaturedLatestProducts from "@modules/home/components/featured-latest"
import FeaturedProducts from "@modules/home/components/featured-products"
import BrandStrip from "@modules/home/components/brand-strip"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Alati & Mašine | Profesionalni alati, mašine i oprema",
  description:
    "Kupite profesionalne akumulatorske, električne i ručne alate, radioničku opremu i mašine uz garanciju i brzu dostavu.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  }).catch(() => ({ collections: [] }))

  if (!region) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-2 sm:gap-y-4">
      {/* 1. Hero Section with Placeholders */}
      <Hero />

      {/* 2. Key Trust Highlights (Dostava, Garancija, Podrška) */}
      <TrustBar />

      {/* 3. Category Showcase with Placeholders */}
      <CategoryShowcase />

      {/* 4. Featured Products Showcase */}
      <FeaturedLatestProducts region={region} />

      {/* 5. Collections (if any exist) */}
      {collections && collections.length > 0 && (
        <ul className="flex flex-col">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      )}

      {/* 6. Trusted Brands Bar */}
      <BrandStrip />
    </div>
  )
}
