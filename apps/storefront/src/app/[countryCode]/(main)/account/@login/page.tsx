import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Prijava na račun",
  description: "Prijavite se na vaš korisnički račun.",
}

export default function Login() {
  return <LoginTemplate />
}
