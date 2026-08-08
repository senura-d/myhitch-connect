import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/myhitch-connect",
  compress: true,
  experimental: {
    // Tree-shakes @tabler/icons-react so only the icons you import are bundled
    optimizePackageImports: ["@tabler/icons-react"],
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
