"use client"

import { useState } from "react"
import Image from "next/image"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import { siteBanners } from "@/config/banners"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)
  const banner = siteBanners.auth.loginBanner

  return (
    <div className="w-full">
      <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Forms */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          {/* Header without icons or tools references */}
          <div className="flex flex-col text-left mb-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {currentView === LOGIN_VIEW.SIGN_IN
                ? "Prijava na račun"
                : "Kreirajte račun"}
            </h1>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              {currentView === LOGIN_VIEW.SIGN_IN
                ? "Unesite vaše pristupne podatke za prijavu na korisnički račun."
                : "Unesite tražene podatke za kreiranje novog korisničkog računa."}
            </p>
          </div>

          {/* Clean Tab Switcher using shadcn muted/background tokens */}
          <div className="grid grid-cols-2 p-1 bg-muted rounded-xl mb-6 text-xs font-medium">
            <button
              type="button"
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className={`py-2 rounded-lg transition-all text-center cursor-pointer ${
                currentView === LOGIN_VIEW.SIGN_IN
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Prijava
            </button>
            <button
              type="button"
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className={`py-2 rounded-lg transition-all text-center cursor-pointer ${
                currentView === LOGIN_VIEW.REGISTER
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Registracija
            </button>
          </div>

          {/* Form view */}
          {currentView === LOGIN_VIEW.SIGN_IN ? (
            <Login setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </div>

        {/* Right Side: Configurable Banner (Placeholder using shadcn muted tokens) */}
        <div className="relative hidden lg:flex flex-col justify-between p-8 sm:p-10 overflow-hidden bg-muted border-l border-border min-h-[560px]">
          {banner.imageUrl ? (
            <>
              <Image
                src={banner.imageUrl}
                alt={banner.alt || "Baner"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: banner.overlayOpacity ?? 0.35 }}
              />
            </>
          ) : (
            /* Subtle minimal placeholder background using theme tokens */
            <div className="absolute inset-0 bg-muted flex items-center justify-center pointer-events-none">
              <span className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest select-none">
                Placeholder banera
              </span>
            </div>
          )}

          {/* Top Tag / Badge */}
          <div className="relative z-10">
            {banner.badge ? (
              <span
                className={`inline-flex items-center text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-md ${
                  banner.imageUrl
                    ? "bg-white/20 text-white backdrop-blur-xs border border-white/20"
                    : "bg-background/80 text-foreground border border-border"
                }`}
              >
                {banner.badge}
              </span>
            ) : null}
          </div>

          {/* Overlay Text from Configuration */}
          {(banner.title || banner.subtitle) && (
            <div className="relative z-10 mt-auto flex flex-col gap-y-2">
              {banner.title && (
                <h2
                  className={`text-xl font-bold tracking-tight leading-snug ${
                    banner.imageUrl ? "text-white" : "text-foreground"
                  }`}
                >
                  {banner.title}
                </h2>
              )}
              {banner.subtitle && (
                <p
                  className={`text-xs leading-relaxed max-w-sm ${
                    banner.imageUrl ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {banner.subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate

