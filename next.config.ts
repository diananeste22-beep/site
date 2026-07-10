import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedHosts: [
  "goncalographics.ru",
  "www.goncalographics.ru",
  "localhost",
  "127.0.0.1",
],
};

export default nextConfig;
