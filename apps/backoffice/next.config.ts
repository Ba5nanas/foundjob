import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  basePath: "/backoffice",
  turbopack: {
    root: path.resolve(appDir, "../..")
  },
  poweredByHeader: false
};

export default nextConfig;
