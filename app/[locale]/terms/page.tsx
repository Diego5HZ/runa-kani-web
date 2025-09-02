export const dynamic = 'force-static';
export const dynamicParams = false;

import Link from "next/link";
import { getTranslations } from "next-intl/server";

const LAST_UPDATED = "2025-08-25";

export default async function TermsPage({
  params,
  searchParams, // 👈 agrega esto
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const sp = (await searchParams) || {};
  const embed = String(sp.embed ?? "") === "1"; // 👈 si ?embed=1, modo "solo contenido"

  const t = await getTranslations({ locale, namespace: "terms" });

  const sections = [
    { id: "use", title: t("useTitle"), text: t("useText") },
    { id: "account", title: t("accountTitle"), text: t("accountText") },
    { id: "liability", title: t("liabilityTitle"), text: t("liabilityText") },
    // { id: "controller", title: t("controllerTitle"), text: t("controllerText") }, // si lo agregas luego
  ];

  const Article = (
    <article
      className={embed ? "max-w-3xl mx-auto px-6 py-6" : "max-w-3xl mx-auto px-6 py-16"}
      data-terms-root
    >
      {/* Título + última actualización */}
      <header className={embed ? "mb-4" : "mb-8"}>
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-sm text-zinc-400">
          {t("updatedOn")} <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time>
        </p>
        {!embed && <p className="mt-4 text-zinc-200">{t("intro")}</p>}
      </header>

      {/* Tabla de contenidos (solo en modo normal) */}
      {!embed && (
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
      )}

      {/* Contenido */}
      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={
            "prose prose-invert prose-zinc max-w-none " + (i === 0 ? "" : "mt-10")
          }
        >
          <h2>{s.title}</h2>
          <p>{s.text}</p>
        </section>
      ))}
    </article>
  );

  if (embed) {
    // 👇 Entrega SOLO el artículo, sin breadcrumb ni TOC ni wrappers extra
    return Article;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
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
      {Article}
    </div>
  );
}
