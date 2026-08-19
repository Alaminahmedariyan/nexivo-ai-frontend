import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Fallback for admin-supplied external URLs (thumbnail, avatarUrl,
      // portfolio images) that don't come through Cloudinary — e.g. a
      // client's own CDN. Broad on purpose since these are free-text URL
      // fields in the admin CMS, not a fixed set of sources. Tighten this
      // to specific domains once you know which external hosts are
      // actually used in production.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;