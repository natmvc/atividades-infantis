"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe2, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/data/site";
import { checkoutLinks, routes } from "@/data/site";
import { Button } from "./Button";

const nav = {
  pt: [
    ["Inicio", routes.pt.home],
    ["Todos os temas", routes.pt.themes],
    ["Datas comemorativas", routes.pt.seasonal],
    ["Pack completo", routes.pt.pack],
    ["Sobre", routes.pt.about],
    ["Contato", routes.pt.contact]
  ],
  en: [
    ["Home", routes.en.home],
    ["All themes", routes.en.themes],
    ["Seasonal", routes.en.seasonal],
    ["Complete pack", routes.en.pack],
    ["About", routes.en.about],
    ["Contact", routes.en.contact]
  ]
};

export function Header({ locale }: { locale: Locale }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const alternate = locale === "pt" ? routes.en.home : routes.pt.home;
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/86 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={routes[locale].home} className="flex items-center gap-3" aria-label="Atividades Infantis">
          <Image
            src="/images/logo-atividades-infantis.png"
            alt="Atividades Infantis"
            width={54}
            height={54}
            className="h-12 w-12 rounded-2xl object-cover shadow-soft"
            priority
          />
          <span className="hidden text-lg font-black leading-tight text-ink sm:block">
            Atividades
            <span className="block text-candy">Infantis</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {nav[locale].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-3 py-2 text-sm font-extrabold text-ink/75 transition hover:bg-skywash hover:text-ink"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={alternate}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-skywash px-3 text-sm font-black text-ink ring-1 ring-sky-100 sm:inline-flex"
            aria-label={locale === "pt" ? "Switch to English" : "Mudar para portugues"}
          >
            <Globe2 size={17} aria-hidden />
            PT | EN
          </Link>
          <div className="hidden sm:block">
            <Button href={checkoutLinks.completePack} ariaLabel={locale === "pt" ? "Quero o Pack Completo" : "Get the Complete Pack"}>
              {locale === "pt" ? "Quero o Pack Completo" : "Get the Complete Pack"}
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white lg:hidden"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}
      >
        <nav
          className="mx-auto grid max-w-7xl gap-2 border-t border-sky-100 bg-white px-4 py-4 shadow-soft sm:px-6"
          aria-label="Menu principal mobile"
        >
          {nav[locale].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="rounded-2xl px-4 py-3 text-base font-black text-ink transition hover:bg-skywash"
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 grid gap-2 border-t border-sky-100 pt-4 sm:hidden">
            <Link
              href={alternate}
              onClick={closeMenu}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-skywash px-4 text-sm font-black text-ink ring-1 ring-sky-100"
              aria-label={locale === "pt" ? "Switch to English" : "Mudar para portugues"}
            >
              <Globe2 size={17} aria-hidden />
              PT | EN
            </Link>
            <Button href={checkoutLinks.completePack} ariaLabel={locale === "pt" ? "Quero o Pack Completo" : "Get the Complete Pack"}>
              {locale === "pt" ? "Quero o Pack Completo" : "Get the Complete Pack"}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-3">
            <ShoppingBag aria-hidden className="text-sunny" />
            <span className="text-xl font-black">Atividades Infantis</span>
          </div>
          <p className="max-w-xl text-white/72">
            {locale === "pt"
              ? "PDFs educativos, coloridos e prontos para imprimir para qualquer tema infantil."
              : "Colorful educational PDFs ready to print for any kids theme."}
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-sunny">Menu</h2>
          <div className="grid gap-2">
            {nav[locale].slice(1).map(([label, href]) => (
              <Link key={href} href={href} className="text-white/72 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-sunny">Links</h2>
          <div className="grid gap-2 text-white/72">
            <a href="#LINK_INSTAGRAM">Instagram</a>
            <a href="#LINK_PINTEREST">Pinterest</a>
            <a href="#LINK_WHATSAPP">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <>
      <Header locale={locale} />
      <main className="pt-20">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
