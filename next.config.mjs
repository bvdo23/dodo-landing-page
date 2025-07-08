import createNextIntlPlugin from "next-intl/plugin";

// Update this path to match your actual file location
const withNextIntl = createNextIntlPlugin("./src/config/i18n.config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
