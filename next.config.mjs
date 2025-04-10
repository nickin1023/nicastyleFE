/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions:
    process.env.NODE_ENV === "development" ? ["tsx", "dev.tsx"] : ["tsx"],
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96],
    remotePatterns: [
      {
        protocol: process.env.PROTOCOL,
        hostname: process.env.HOST,
        port: process.env.PORT,
        pathname: "/api/images/**",
        search: ""
      }
    ]
  }
};

export default nextConfig;
