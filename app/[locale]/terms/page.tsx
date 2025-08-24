// app/[locale]/terms/page.tsx
export const dynamic = 'force-static';
export const dynamicParams = false;

import { getTranslations } from "next-intl/server";

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;                         // 👈 toma el locale
  const t = await getTranslations({ locale, namespace: 'terms' }); // 👈 usa namespace "terms"

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 prose">
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>

      <h2>{t('useTitle')}</h2>
      <p>{t('useText')}</p>

      <h2>{t('accountTitle')}</h2>
      <p>{t('accountText')}</p>

      <h2>{t('liabilityTitle')}</h2>
      <p>{t('liabilityText')}</p>
    </article>
  );
}
