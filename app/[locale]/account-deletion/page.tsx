// app/[locale]/account-deletion/page.tsx
export const dynamic = 'force-static';

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import RK_Delete_Account_Page from "@/public/images/RK_Delete_Account_Page.png";
import RK_Help_Center_Page from "@/public/images/RK_Help_Center_Page.png";

export default async function AccountDeletionPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "accountDeletion" });

  // FAQ: lee índices 0..N si existen
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

        {/* Imagen de referencia: pantalla Delete Account */}
        <div className="mt-6 border border-rk-gold/20 rounded-xl overflow-hidden">
          <Image
            src={RK_Delete_Account_Page}
            alt={t("stepImageAlt")}
            className="w-full h-auto"
            priority
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

        {/* Imagen de referencia: Help Center */}
        <div className="mt-4 border border-rk-gold/20 rounded-xl overflow-hidden">
          <Image
            src={RK_Help_Center_Page}
            alt={t("helpCenterImageAlt")}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Alcance del borrado */}
      <section className="mt-10 prose prose-invert prose-zinc max-w-none">
        <h2>{t("scopeTitle")}</h2>
        <p>{t("scopeText")}</p>
        <p className="text-sm text-zinc-400 mt-2">{t("verificationNote")}</p>
      </section>

      {/* Estado / tiempos */}
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
