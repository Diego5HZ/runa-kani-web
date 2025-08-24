'use client';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

const locales = [
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'en', label: '🇺🇸 English' }
];

export default function LocaleSwitcher({ locale }: { locale: 'es' | 'en' }) {
  const pathname = usePathname() || '/';

  const getHref = (code: string) => {
    // Replace locale prefix if it exists, otherwise prepend
    if (pathname.match(/^\/(es|en)(\/|$)/)) {
      return pathname.replace(/^\/(es|en)/, `/${code}`);
    }
    return `/${code}${pathname === '/' ? '' : pathname}`;
  };

  return (
    <div className="relative inline-block text-left">
      <details className="group">
        <summary className="list-none px-3 py-1 rounded-lg border border-rk-gold text-rk-gold hover:bg-rk-gold hover:text-black cursor-pointer select-none">
          {locales.find((l) => l.code === locale)?.label ?? locale.toUpperCase()}
        </summary>
        <ul className="absolute mt-2 w-40 rounded-lg border border-rk-gold bg-black shadow-lg z-10">
          {locales.map((l) => (
            <li key={l.code}>
              <Link
                href={getHref(l.code)}
                className="block px-3 py-2 text-sm hover:bg-rk-gold/20"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
