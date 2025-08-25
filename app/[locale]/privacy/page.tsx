// app/[locale]/privacy/page.tsx
export const dynamic = 'force-static';
export const dynamicParams = false;

import Link from "next/link";
import { getTranslations } from "next-intl/server";

const LAST_UPDATED = "2025-08-25"; // 👈 cambia la fecha cuando actualices

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  const sections = [
    { id: "collect", title: t("collectTitle") },
    { id: "use", title: t("useTitle") },
    { id: "rights", title: t("rightsTitle") },
    { id: "contact", title: t("contactTitle") }
  ];

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-400">
        <ol className="flex items-center gap-2">
          <li>
            <Link href={`/${locale}`} className="hover:text-rk-gold">Home</Link>
          </li>
          <li aria-hidden>›</li>
          <li className="text-zinc-200">{t("title")}</li>
        </ol>
      </nav>

      {/* Título + última actualización */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-sm text-zinc-400">
          {t("updatedOn")} <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time>
        </p>
        <p className="mt-4 text-zinc-200">{t("intro")}</p>
      </header>

      {/* Tabla de contenidos */}
      <aside aria-label={t("toc")} className="mb-8 rounded-2xl border border-rk-gold/20 bg-black/30 p-4">
        <h2 className="text-sm font-medium mb-3">{t("toc")}</h2>
        <ul className="space-y-2 text-sm">
          {sections.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-rk-gold underline-offset-4 hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Contenido */}
      <section id="collect" className="prose prose-invert prose-zinc max-w-none">
        <h2>{t("collectTitle")}</h2>
        <p>{t("collectText")}</p>
      </section>

      <section id="use" className="prose prose-invert prose-zinc max-w-none mt-10">
        <h2>{t("useTitle")}</h2>
        <p>{t("useText")}</p>
      </section>

      <section id="rights" className="prose prose-invert prose-zinc max-w-none mt-10">
        <h2>{t("rightsTitle")}</h2>
        <p>{t("rightsText")}</p>
      </section>

      <section id="contact" className="prose prose-invert prose-zinc max-w-none mt-10">
        <h2>{t("contactTitle")}</h2>
        <p>{t("contactText")}</p>
        <p className="mt-2">
          <span className="text-sm text-zinc-400">{t("contactEmailLabel")} </span>
          <a className="underline underline-offset-4 hover:text-rk-gold" href={`mailto:${t("contactEmail")}`}>
            {t("contactEmail")}
          </a>
        </p>
      </section>
    </article>
  );
}
