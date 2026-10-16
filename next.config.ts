import type { NextConfig } from "next";
import imageWidths from "./lib/image-widths.json";

const nextConfig: NextConfig = {
  // Sitio 100% estático → se publica la carpeta `out/` en Cloudflare Pages.
  output: "export",
  images: {
    // Sin optimizador en runtime: las variantes se generan en build con
    // `scripts/optimize-images.mjs` y el loader arma el srcset.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: imageWidths.deviceSizes,
    imageSizes: imageWidths.imageSizes,
  },
};

export default nextConfig;
