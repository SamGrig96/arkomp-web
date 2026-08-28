import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone so the Docker image can run without node_modules.
  // Vercel ignores this; it only matters for self-hosting.
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add the CDN/host that serves product images here, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "cdn.buy.am" }],
    remotePatterns: [],
  },
};

export default nextConfig;
