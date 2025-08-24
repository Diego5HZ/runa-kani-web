// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';

const isGH = process.env.GITHUB_ACTIONS === 'true';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl({
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGH ? `/${repo}` : '',
  assetPrefix: isGH ? `/${repo}/` : '',
});
