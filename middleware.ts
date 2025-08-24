import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher recomendado en docs (puedes usar el tuyo si prefieres)
  matcher: ['/', '/(es|en)/:path*']
};
