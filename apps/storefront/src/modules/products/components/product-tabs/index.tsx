"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Specifikacije proizvoda",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Dostava i povrat",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-xs text-muted-foreground py-4">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <span className="font-semibold text-foreground block mb-0.5">Materijal</span>
          <p>{product.material ? product.material : "-"}</p>
        </div>
        <div>
          <span className="font-semibold text-foreground block mb-0.5">Zemlja porijekla</span>
          <p>{product.origin_country ? product.origin_country.toUpperCase() : "-"}</p>
        </div>
        <div>
          <span className="font-semibold text-foreground block mb-0.5">Kategorija / Tip</span>
          <p>{product.type ? product.type.value : "-"}</p>
        </div>
        <div>
          <span className="font-semibold text-foreground block mb-0.5">Težina</span>
          <p>{product.weight ? `${product.weight} g` : "-"}</p>
        </div>
        <div>
          <span className="font-semibold text-foreground block mb-0.5">Dimenzije</span>
          <p>
            {product.length && product.width && product.height
              ? `${product.length}L x ${product.width}W x ${product.height}H mm`
              : "-"}
          </p>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-xs text-muted-foreground py-4 space-y-4">
      <div className="flex items-start gap-x-3">
        <FastDelivery />
        <div>
          <span className="font-semibold text-foreground block">Brza dostava</span>
          <p className="mt-0.5 leading-relaxed">
            Isporuka unutar 24-48 sati direktno na vašu adresu širom Bosne i Hercegovine.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-x-3">
        <Refresh />
        <div>
          <span className="font-semibold text-foreground block">Jednostavna zamjena</span>
          <p className="mt-0.5 leading-relaxed">
            Ukoliko artikl ne odgovara vašim zahtjevima, zamjena je brza i jednostavna.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-x-3">
        <Back />
        <div>
          <span className="font-semibold text-foreground block">Povrat novca</span>
          <p className="mt-0.5 leading-relaxed">
            Zagarantovan povrat u roku od 14 dana u skladu sa važećim zakonodavstvom.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
