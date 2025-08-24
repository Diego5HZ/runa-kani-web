import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'] as const,
  defaultLocale: 'es'
} satisfies {
  locales: readonly ['es','en'];
  defaultLocale: 'es' | 'en';
});
