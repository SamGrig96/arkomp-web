import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone so the Docker image can run without node_modules.
  // Vercel ignores this; it only matters for self-hosting.
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  // "/" has no content of its own: both languages are prefixed, matching
  // arkomp.am's own /hy and /ru URLs.
  async redirects() {
    return [{ source: "/", destination: "/hy", permanent: false }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Add the CDN/host that serves product images here, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "cdn.arkomp.am" }],
    remotePatterns: [],
  },
};

export default nextConfig;
