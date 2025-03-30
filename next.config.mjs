/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions:
    process.env.NODE_ENV === "development" ? ["tsx", "dev.tsx"] : ["tsx"],
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "development" ? "http" : "https",
        hostname: process.env.HOST,
        port: process.env.PORT,
        pathname: "/api/images/**",
        search: ""
      }
    ]
  }
};

export default nextConfig;
