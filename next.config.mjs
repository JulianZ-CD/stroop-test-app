/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'zh', 'fr'],  // 支持的语言
    defaultLocale: 'en',          // 默认语言
    localeDetection: true,        // 自动检测浏览器语言
  },
};

export default nextConfig;
