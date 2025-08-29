// app/[locale]/account-deletion/page.tsx
export const dynamic = 'force-static';

import Image from "next/image";
import { getTranslations } from "next-intl/server";

// 👇 importa igual que el RK_LoginPage
import rkDelete from "@/public/images/RK_Delete_Account_Page.jpeg";
import rkHelp from "@/public/images/RK_Help_Center_Page.jpeg";

export default async function AccountDeletionPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "accountDeletion" });

  // FAQ
  const faq: { q: string; a: string }[] = [];
  for (let i = 0; i < 4; i++) {
    const qKey = `faq.${i}.q`;
    const aKey = `faq.${i}.a`;
    try {
      const q = t(qKey);
      const a = t(aKey);
      if (q && a) faq.push({ q, a });
    } catch {
      break;
    }
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-4">{t("title")}</h1>
      <p className="mb-6 text-zinc-200">{t("intro")}</p>

      {/* Pasos in-app */}
      <section>
        <h2 className="text-xl font-semibold mb-3">{t("stepsTitle")}</h2>
        <ol className="list-decimal list-inside space-y-4 text-zinc-200">
          <li>{t("step1")}</li>
          <li>{t("step2")}</li>
          <li>{t("step3")}</li>
        </ol>

        {/* Recuadro con ambas imágenes y flecha, responsive */}
        <div className="mt-6 rounded-2xl border border-rk-gold/20 bg-black/20 p-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            {/* Imagen Delete Account */}
            <Image
                src={rkDelete}
                alt={t("stepImageAlt")}
                width={280}
                height={560}
                sizes="(max-width: 768px) 220px, 280px"
                className="rounded-xl shadow-lg"
                priority
            />

            {/* Flecha vertical en móvil / horizontal en desktop */}
            <span className="text-rk-gold text-3xl md:text-4xl font-bold md:hidden">↓</span>
            <span className="text-rk-gold text-3xl md:text-4xl font-bold hidden md:inline">➜</span>

            {/* Imagen Help Center */}
            <Image
                src={rkHelp}
                alt={t("helpCenterImageAlt")}
                width={280}
                height={560}
                sizes="(max-width: 768px) 220px, 280px"
                className="rounded-xl shadow-lg"
            />
        </div>
      </section>

      {/* Nota de plazos */}
      <p className="mt-8 text-sm text-zinc-400">{t("note")}</p>

      {/* Alternativa: por correo */}
      <section className="mt-10 rounded-2xl border border-rk-gold/30 bg-black/30 p-4">
        <h2 className="text-base font-semibold">{t("startOnlineTitle")}</h2>
        <p className="mt-1 text-sm text-zinc-300">
          {t("startOnlineText")}{" "}
          <a
            href={`mailto:${t("startOnlineEmail")}`}
            className="underline underline-offset-4 hover:text-rk-gold"
          >
            {t("startOnlineEmail")}
          </a>
        </p>
      </section>

      {/* Alcance */}
      <section className="mt-10 prose prose-invert prose-zinc max-w-none">
        <h2>{t("scopeTitle")}</h2>
        <p>{t("scopeText")}</p>
        <p className="text-sm text-zinc-400 mt-2">{t("verificationNote")}</p>
      </section>

      {/* Estado */}
      <section className="mt-10 prose prose-invert prose-zinc max-w-none">
        <h2>{t("statusTitle")}</h2>
        <p>{t("statusText")}</p>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">{t("faqTitle")}</h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-rk-gold/20 bg-black/30 p-3"
              >
                <summary className="flex items-center justify-between cursor-pointer select-none list-none">
                  <span className="text-sm font-medium">{item.q}</span>
                  <span className="ml-2 text-zinc-400 transition-transform group-open:rotate-90">
                    ▶
                  </span>
                </summary>
                <p className="mt-2 text-sm text-zinc-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
