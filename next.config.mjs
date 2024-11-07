/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'zh', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};

export default nextConfig;
