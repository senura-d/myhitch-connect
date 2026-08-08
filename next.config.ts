import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    // Tree-shakes @tabler/icons-react so only the icons you import are bundled
    optimizePackageImports: ["@tabler/icons-react"],
  },
  images: {
    // `next/image` THROWS on any remote host that is not listed here, and an
    // uncaught throw during render takes down the whole client tree — the page
    // renders as "Application error: a client-side exception has occurred".
    // Every remote image in this app is served from Unsplash.
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
