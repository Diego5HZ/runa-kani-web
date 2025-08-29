// app/[locale]/account-deletion/page.tsx
export const dynamic = 'force-static';

import { getTranslations } from "next-intl/server";

export default async function AccountDeletionPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "accountDeletion" });

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-4">{t("title")}</h1>
      <p className="mb-6 text-zinc-200">{t("intro")}</p>

      <ol className="list-decimal list-inside space-y-4 text-zinc-200">
        <li>{t("step1")}</li>
        <li>{t("step2")}</li>
        <li>{t("step3")}</li>
      </ol>

      <p className="mt-8 text-sm text-zinc-400">
        {t("note")}
      </p>
    </article>
  );
}
