"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div className="w-full flex flex-col" data-testid="register-page">
      {message?.state === "verification_required" && (
        <div
          className="w-full mb-5 text-center text-xs text-foreground bg-muted border border-border rounded-xl p-3.5"
          data-testid="register-verification-message"
        >
          Poslali smo verifikacijski link na <strong>{message.email}</strong>.
          Molimo provjerite vaš inbox kako biste potvrdili email, a zatim se prijavite.
        </div>
      )}

      <form className="w-full flex flex-col gap-y-4" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Ime"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Prezime"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
          </div>

          <Input
            label="Email adresa"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />

          <Input
            label="Broj telefona"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />

          <Input
            label="Lozinka"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />

        <p className="text-[11px] text-muted-foreground leading-relaxed text-center px-1">
          Kreiranjem računa prihvatate naše{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-foreground underline underline-offset-2 hover:text-primary"
          >
            Uslove korištenja
          </LocalizedClientLink>{" "}
          i{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-foreground underline underline-offset-2 hover:text-primary"
          >
            Politiku privatnosti
          </LocalizedClientLink>
          .
        </p>

        <SubmitButton
          className="w-full mt-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all shadow-xs flex items-center justify-center cursor-pointer"
          data-testid="register-button"
        >
          <span>Kreirajte račun</span>
        </SubmitButton>
      </form>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        Već posjedujete korisnički račun?{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-foreground hover:underline font-semibold ml-1 cursor-pointer"
        >
          Prijavite se
        </button>
      </div>
    </div>
  )
}

export default Register

