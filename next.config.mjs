/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/api/images/**"
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "",
        pathname: "/api/images/**"
      },
      // Dynmically allow process.env host/port fallbacks if provided
      {
        protocol: (process.env.PROTOCOL || "http").replace(":", ""),
        hostname: process.env.HOST || "localhost",
        port: process.env.PORT || "",
        pathname: "/api/images/**"
      },
      // Try to parse NEXT_PUBLIC_BASE_URL if available
      ...(process.env.NEXT_PUBLIC_BASE_URL
        ? (() => {
            try {
              const url = new URL(process.env.NEXT_PUBLIC_BASE_URL);
              return [
                {
                  protocol: url.protocol.replace(":", ""),
                  hostname: url.hostname,
                  port: url.port || "",
                  pathname: "/api/images/**"
                }
              ];
            } catch {
              return [];
            }
          })()
        : [])
    ]
  }
};

export default nextConfig;
