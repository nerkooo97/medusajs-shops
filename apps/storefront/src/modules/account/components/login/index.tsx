"use client"

import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="w-full flex flex-col" data-testid="login-page">
      {message?.state === "verification_required" && (
        <div
          className="w-full mb-5 text-center text-xs text-foreground bg-muted border border-border rounded-xl p-3.5"
          data-testid="login-verification-message"
        >
          Poslali smo verifikacijski link na <strong>{message.email}</strong>.
          Molimo potvrdite vašu email adresu, a zatim se prijavite.
        </div>
      )}

      <form className="w-full flex flex-col gap-y-4" action={formAction}>
        <div className="flex flex-col w-full gap-y-3.5">
          <div>
            <Input
              label="Email adresa"
              name="email"
              type="email"
              title="Unesite važeću email adresu."
              autoComplete="email"
              required
              data-testid="email-input"
            />
          </div>

          <div>
            <Input
              label="Lozinka"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              data-testid="password-input"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-muted-foreground">
              <input
                type="checkbox"
                name="remember_me"
                className="size-3.5 rounded border-input text-primary focus:ring-ring"
              />
              <span>Zapamti me</span>
            </label>

            <LocalizedClientLink
              href="/customer-service"
              className="text-foreground hover:underline underline-offset-2 font-medium transition-colors"
            >
              Zaboravili ste lozinku?
            </LocalizedClientLink>
          </div>
        </div>

        <ErrorMessage
          error={
            message?.state === "error"
              ? message.error === "Invalid email or password"
                ? "Pogrešna email adresa ili lozinka."
                : message.error
              : null
          }
          data-testid="login-error-message"
        />

        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-2 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all shadow-xs flex items-center justify-center cursor-pointer"
        >
          <span>Prijavite se</span>
        </SubmitButton>
      </form>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        Nemate korisnički račun?{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-foreground hover:underline font-semibold ml-1 cursor-pointer"
          data-testid="register-button"
        >
          Registrujte se
        </button>
      </div>
    </div>
  )
}

export default Login

