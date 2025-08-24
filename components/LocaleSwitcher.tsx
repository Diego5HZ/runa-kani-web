// components/LocaleSwitcher.tsx
"use client";

import {useRef} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

type Locale = "es" | "en";

const locales: {code: Locale; label: string}[] = [
  { code: "es", label: "🇪🇸 Español" },
  { code: "en", label: "🇺🇸 English" }
];

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Reescribe o inserta el segmento de locale en cualquier estructura, con o sin basePath.
  const getHref = (code: Locale) => {
    const parts = pathname.split("/"); // p.ej. ["", "repo", "es", "privacy"]
    const idx = parts.findIndex((p) => p === "es" || p === "en");
    if (idx >= 0) {
      parts[idx] = code; // reemplaza /es|/en por /code
    } else {
      // Inserta el locale después del primer segmento real si existe (soporta basePath),
      // si no, lo inserta en la raíz.
      const insertPos =
        parts.length > 1 && parts[1] && parts[1] !== "es" && parts[1] !== "en"
          ? 2
          : 1;
      parts.splice(insertPos, 0, code);
    }
    return parts.join("/") || `/${code}`;
  };

  return (
    <div className="relative inline-block text-left">
      <details ref={detailsRef} className="group">
        <summary className="list-none px-3 py-1 rounded-lg border border-rk-gold text-rk-gold hover:bg-rk-gold hover:text-black cursor-pointer select-none">
          {locales.find((l) => l.code === locale)?.label ?? locale.toUpperCase()}
        </summary>
        <ul className="absolute mt-2 w-40 rounded-lg border border-rk-gold bg-black shadow-lg z-10">
          {locales.map((l) => (
            <li key={l.code}>
              <Link
                href={getHref(l.code)}
                className="block px-3 py-2 text-sm hover:bg-rk-gold/20"
                onClick={() => detailsRef.current?.removeAttribute("open")}
                prefetch={false}
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
