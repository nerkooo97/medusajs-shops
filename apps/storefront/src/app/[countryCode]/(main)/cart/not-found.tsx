import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "404",
  description: "Došlo je do greške",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">Stranica nije pronađena</h1>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        Korpa kojoj pokušavate pristupiti ne postoji ili je istekla sesija. Osvježite stranicu ili nastavite kupovinu.
      </p>
      <InteractiveLink href="/">Idi na početnu stranicu</InteractiveLink>
    </div>
  )
}
