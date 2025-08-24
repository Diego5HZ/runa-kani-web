// app/[locale]/page.tsx
export const dynamic = 'force-static';

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import rkLogin from "@/public/images/RK_LoginPage.png";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;               // 👈 toma el locale del segmento
  const t = await getTranslations({ locale });   // 👈 carga mensajes de ese locale

  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-rk-gold">
            {t("hero.title.1")}<br />
            {t("hero.title.2")}<br />
            {t("hero.title.3")}
          </h1>
          <p className="mt-6 text-lg text-zinc-300">{t("hero.subtitle")}</p>
          <div className="mt-8 flex gap-4">
            <a href="#cta" className="px-6 py-3 rounded-xl bg-rk-gold text-black font-semibold shadow hover:opacity-90 transition">
              {t("hero.cta")}
            </a>
            <a href="#features" className="px-6 py-3 rounded-xl border border-rk-gold text-rk-gold font-semibold hover:bg-rk-gold hover:text-black transition">
              {t("hero.features")}
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-rk-gold/25 bg-rk-gray-dark aspect-[4/3] shadow-[0_0_0_1px_rgba(212,175,55,0.05)] flex items-center justify-center p-6">
          <Image
            src={rkLogin}
            alt="Runa Kani login"
            width={280}
            height={560}
            className="rounded-2xl shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-y border-rk-gold/15 bg-[linear-gradient(180deg,rgba(212,175,55,0.06),transparent)]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-2xl bg-rk-gray-dark/60 border border-rk-gold/15">
            <h3 className="text-lg font-semibold text-rk-gold">{t("features.security.title")}</h3>
            <p className="mt-2 text-zinc-300">{t("features.security.desc")}</p>
          </div>
          <div className="p-6 rounded-2xl bg-rk-gray-dark/60 border border-rk-gold/15">
            <h3 className="text-lg font-semibold text-rk-gold">{t("features.simplicity.title")}</h3>
            <p className="mt-2 text-zinc-300">{t("features.simplicity.desc")}</p>
          </div>
          <div className="p-6 rounded-2xl bg-rk-gray-dark/60 border border-rk-gold/15">
            <h3 className="text-lg font-semibold text-rk-gold">{t("features.trust.title")}</h3>
            <p className="mt-2 text-zinc-300">{t("features.trust.desc")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 bg-gradient-to-r from-black via-zinc-900 to-black">
        <div className="max-w-3xl mx-auto text-center px-8 py-12 rounded-3xl border border-rk-gold/40 bg-black/70 shadow-lg">
          <h2 className="text-4l font-extrabold text-rk-gold drop-shadow-md">{t("cta.title")}</h2>
          <p className="mt-6 text-xl text-zinc-200">{t("cta.subtitle", { brand: "Runa Kani" })}</p>
          <a href="#" className="inline-block mt-10 px-8 py-4 rounded-xl bg-rk-gold text-black font-bold shadow-md hover:scale-105 hover:shadow-lg transition transform">
            {t("cta.button")}
          </a>
        </div>
      </section>
    </main>
  );
}
