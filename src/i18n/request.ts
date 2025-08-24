// // src/i18n/request.ts
// import {getRequestConfig} from 'next-intl/server';
// import {hasLocale} from 'next-intl';
// import {routing} from './routing';

// export default getRequestConfig(async ({requestLocale}) => {
//   const req = await requestLocale;
//   const locale = hasLocale(routing.locales, req) ? req : routing.defaultLocale;

//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default
//   };
// });

// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const l = locale ?? 'en'; // fallback por si viene undefined
  const messages = (await import(`../../messages/${l}.json`)).default;
  return {locale: l, messages};
});

