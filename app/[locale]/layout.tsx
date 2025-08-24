// // app/[locale]/page.tsx
// import Image from "next/image";
// import { useTranslations } from "next-intl";

// export default function HomePage() {
//   const t = useTranslations();

//   return (
//     <main>
//       {/* Hero */}
//       <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight text-rk-gold">
//             {t("hero.title.1")}<br />{t("hero.title.2")}<br />{t("hero.title.3")}
//           </h1>
//           <p className="mt-6 text-lg text-zinc-300">{t("hero.subtitle")}</p>
//           <div className="mt-8 flex gap-4">
//             <a
//               href="#cta"
//               className="px-6 py-3 rounded-xl bg-rk-gold text-black font-semibold shadow hover:opacity-90 transition"
//             >
//               {t("hero.cta")}
//             </a>
//             <a
//               href="#features"
//               className="px-6 py-3 rounded-xl border border-rk-gold text-rk-gold font-semibold hover:bg-rk-gold hover:text-black transition"
//             >
//               {t("hero.features")}
//             </a>
//           </div>
//         </div>

//         <div className="rounded-3xl border border-rk-gold/25 bg-rk-gray-dark aspect-[4/3] shadow-[0_0_0_1px_rgba(212,175,55,0.05)] flex items-center justify-center p-6">
//           <Image
//             src="/images/RK_LoginPage.png"
//             alt="Runa Kani login"
//             width={280}
//             height={560}
//             className="rounded-2xl shadow-lg"
//             priority
//           />
//         </div>
//       </section>

//       {/* Features */}
//       <section
//         id="features"
//         className="py-20 border-y border-rk-gold/15 bg-[linear-gradient(180deg,rgba(212,175,55,0.06),transparent)]"
//       >
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
//           <div className="p-6 rounded-2xl bg-rk-gray-dark/60 border border-rk-gold/15">
//             <h3 className="text-lg font-semibold text-rk-gold">🔒 Seguridad</h3>
//             <p className="mt-2 text-zinc-300">
//               Verificación, PIN y control de sesiones para proteger tu cuenta.
//             </p>
//           </div>
//           <div className="p-6 rounded-2xl bg-rk-gray-dark/60 border border-rk-gold/15">
//             <h3 className="text-lg font-semibold text-rk-gold">⚡ Simplicidad</h3>
//             <p className="mt-2 text-zinc-300">
//               Interfaz clara y mínima para acciones rápidas y confiables.
//             </p>
//           </div>
//           <div className="p-6 rounded-2xl bg-rk-gray-dark/60 border border-rk-gold/15">
//             <h3 className="text-lg font-semibold text-rk-gold">🤝 Confianza</h3>
//             <p className="mt-2 text-zinc-300">
//               Transparencia y control total de tus datos personales.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section
//         id="cta"
//         className="py-24 bg-gradient-to-r from-black via-zinc-900 to-black"
//       >
//         <div className="max-w-3xl mx-auto text-center px-8 py-12 rounded-3xl border border-rk-gold/40 bg-black/70 shadow-lg">
//           <h2 className="text-4xl font-extrabold text-rk-gold drop-shadow-md">
//             ¿Listo para comenzar?
//           </h2>
//           <p className="mt-6 text-xl text-zinc-200">
//             Únete a <span className="font-semibold text-white">Runa Kani</span>{" "}
//             y da el primer paso hacia una experiencia más segura.
//           </p>
//           <a
//             href="#"
//             className="inline-block mt-10 px-8 py-4 rounded-xl bg-rk-gold text-black font-bold shadow-md hover:scale-105 hover:shadow-lg transition transform"
//           >
//             Descargar app
//           </a>
//         </div>
//       </section>
//     </main>
//   );
// }

// app/[locale]/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "../../src/i18n/routing";

type Locale = "es" | "en";

export const metadata: Metadata = {
  title: "Runa Kani",
  description: "Reportes seguros. Acceso protegido. Confianza real.",
  icons: { icon: "/favicon.ico" }
};

export function generateStaticParams(): { locale: Locale }[] {
  // routing.locales suele ser readonly; tipamos explícito para evitar el error.
  return (routing.locales as readonly Locale[]).map((loc) => ({ locale: loc }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    // optional: notFound(); o forzar default
  }

  // Setea el locale para esta request (next-intl)
  setRequestLocale(locale);

  // Carga los mensajes del idioma actual
  const messages = await getMessages({ locale });

  // 👇 Nada de <html> ni <body> aquí
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar locale={locale} />
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
