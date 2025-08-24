// app/[locale]/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "../../src/i18n/routing";

export const metadata: Metadata = {
  title: "Runa Kani",
  description: "Reportes seguros. Acceso protegido. Confianza real.",
  icons: { icon: "/favicon.ico" }
};

export function generateStaticParams(): { locale: string }[] {
  // Exporta páginas estáticas por cada locale
  return (routing.locales as readonly string[]).map((loc) => ({ locale: loc }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  // 👇 Next 15: params es una Promise y locale es string (no unión)
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Valida que el locale exista
  if (!hasLocale(routing.locales, locale)) {
    // opcional: throw notFound();
  }

  // next-intl: fija el locale de la request
  setRequestLocale(locale);

  // Carga mensajes del idioma actual
  const messages = await getMessages({ locale });

  // Nada de <html> ni <body> aquí
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar locale={locale as "en" | "es"} />
      {children}

      <footer className="mt-20 border-t border-rk-gold/20 bg-[rgba(23,23,23,0.8)]">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-zinc-300">
            © {new Date().getFullYear()} Runa Kani
          </span>
          <nav className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-rk-gold transition">
              {locale === "en" ? "Privacy" : "Privacidad"}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-rk-gold transition">
              {locale === "en" ? "Terms" : "Términos"}
            </Link>
          </nav>
        </div>
      </footer>
    </NextIntlClientProvider>
  );
}
