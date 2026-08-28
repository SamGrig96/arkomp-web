import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone so the Docker image can run without node_modules.
  // Vercel builds its own server output and its post-build step trips over the
  // standalone tree, so only ask for it off-Vercel (VERCEL is set on every
  // Vercel build).
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
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
