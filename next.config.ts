import type { NextConfig } from "next";

/**
 * next/image refuses any host that is not listed here, so the catalogue API —
 * which serves the product photos under /media — has to be allow-listed from
 * the same variable the front-end calls it with.
 */
function apiUrl() {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return undefined;
  try {
    return new URL(base);
  } catch {
    console.warn(`[next.config] NEXT_PUBLIC_API_URL is not a URL: ${base}`);
    return undefined;
  }
}

const api = apiUrl();

/**
 * The image optimizer refuses to fetch from a host that resolves to a private
 * address — sound protection against SSRF, and exactly what a backend running
 * on localhost looks like. Lower it only for that case.
 */
const apiIsLocal = ["localhost", "127.0.0.1", "[::1]", "::1"].includes(
  api?.hostname ?? "",
);

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
    // The catalogue API's /media folder. Add a CDN host here too if the photos
    // ever move behind one.
    remotePatterns: api ? [new URL("/media/**", api)] : [],
    dangerouslyAllowLocalIP: apiIsLocal,
  },
};

export default nextConfig;
