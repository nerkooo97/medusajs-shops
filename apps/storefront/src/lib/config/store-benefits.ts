export type StoreBenefit = {
  id: string
  title: string
  description: string
  icon: "payment" | "delivery" | "returns"
}

export const storeBenefitsConfig: StoreBenefit[] = [
  {
    id: "payment-methods",
    title: "Način plaćanja",
    description: "Gotovina (pouzećem), internet bankarstvom, virmanom i kreditnim karticama.",
    icon: "payment",
  },
  {
    id: "delivery-pricing",
    title: "Cijena dostave",
    description: "12,00 KM po narudžbi (Besplatna dostava za iznose preko 100,00 KM).",
    icon: "delivery",
  },
  {
    id: "returns-policy",
    title: "Povrat robe",
    description: "Moguć unutar 15 dana od prijema pošiljke.",
    icon: "returns",
  },
]
