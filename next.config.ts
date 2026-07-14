import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "wallpaperaccess.com",
      },
      {
        protocol: "https",
        hostname: "w0.peakpx.com",
      },
      {
        protocol: "https",
        hostname: "c0.wallpaperflare.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.csohate.org",
      },
      {
        protocol: "https",
        hostname: "economymiddleeast.com",
      },
      {
        protocol: "https",
        hostname: "www.rasameel.com",
      },
      {
        protocol: "https",
        hostname: "vergiler.az",
      },
      {
        protocol: "https",
        hostname: "www.mindinventory.com",
      },
    ],
  },
};

export default nextConfig;