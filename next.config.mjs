/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions:
    process.env.NODE_ENV === "development" ? ["tsx", "dev.tsx"] : ["tsx"],
};

export default nextConfig;
