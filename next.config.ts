import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  /**
   * paddockpro.ca previously hosted a site built by another company. Whatever
   * of it Google still has indexed will 404 on launch unless it is redirected,
   * and a wall of 404s on a domain with existing local authority is a real,
   * avoidable ranking loss.
   *
   * ⛔ TODO before launch — build the map:
   *   1. web.archive.org/web/*\/paddockpro.ca/*  lists the old URLs.
   *   2. Search Console (old property, if the shop can get access) → Pages,
   *      for anything that actually earned impressions.
   *   3. Add a 301 here for each, pointing at the closest new equivalent.
   *      Only fall back to "/" for pages with no real match — mass-redirecting
   *      everything to the homepage is treated as a soft 404.
   *
   * Example shape:
   *   { source: "/services/car-wraps", destination: "/services/colour-change-wraps", permanent: true },
   */
  async redirects() {
    return [];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
