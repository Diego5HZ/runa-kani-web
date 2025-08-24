import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(); // usa src/i18n/request.ts por defecto

const nextConfig: NextConfig = {};
export default withNextIntl(nextConfig);
