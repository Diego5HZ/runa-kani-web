// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// ⬇️ antes: import LanguageSwitcher from "../components/LocaleSwitcher";
import LocaleSwitcher from "./LocaleSwitcher"; // o "@/components/LocaleSwitcher"


type Locale = "es" | "en";

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rk-gold/20 bg-[rgba(10,10,10,0.85)] backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Name */}
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src="/rk-logo.png"
            alt="Runa Kani"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-semibold text-rk-gold">Runa Kani</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-rk-gold transition">
            {locale === "en" ? "Features" : "Características"}
          </a>
          <a href="#cta" className="hover:text-rk-gold transition">
            {locale === "en" ? "Get started" : "Comenzar"}
          </a>
          <Link
            href={`/${locale}/privacy`}
            className="text-zinc-300 hover:text-rk-gold transition"
          >
            {locale === "en" ? "Privacy" : "Privacidad"}
          </Link>
          <Link
            href={`/${locale}/terms`}
            className="text-zinc-300 hover:text-rk-gold transition"
          >
            {locale === "en" ? "Terms" : "Términos"}
          </Link>

          {/* Language Switcher */}
          <LocaleSwitcher locale={locale} />
        </nav>

        {/* Hamburger button (mobile) */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10"
          aria-label={locale === "en" ? "Open menu" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-[2px] w-6 bg-rk-gold transition ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-rk-gold my-1 transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-rk-gold transition ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-rk-gold/20 bg-[rgba(23,23,23,0.95)]">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 text-sm">
            <a
              href="#features"
              className="hover:text-rk-gold transition"
              onClick={() => setOpen(false)}
            >
              {locale === "en" ? "Features" : "Características"}
            </a>
            <a
              href="#cta"
              className="hover:text-rk-gold transition"
              onClick={() => setOpen(false)}
            >
              {locale === "en" ? "Get started" : "Comenzar"}
            </a>
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-rk-gold transition"
              onClick={() => setOpen(false)}
            >
              {locale === "en" ? "Privacy" : "Privacidad"}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-rk-gold transition"
              onClick={() => setOpen(false)}
            >
              {locale === "en" ? "Terms" : "Términos"}
            </Link>

            {/* Language Switcher */}
            <div className="pt-2">
              <LocaleSwitcher locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
