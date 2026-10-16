import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import imageWidths from "./lib/image-widths.json";
import imageManifest from "./lib/image-manifest.json";

/**
 * Las variantes de `public/_img` no se versionan: las genera
 * `scripts/optimize-images.mjs` (vía `npm run build`). Si se corre
 * `next build` directo, el sitio saldría sin imágenes, así que cortamos acá.
 */
function assertImagesGenerated() {
  const missing = Object.values(imageManifest).filter(
    ({ base, widths }) =>
      !fs.existsSync(path.join(process.cwd(), "public", `${base}-${widths[0]}.webp`)),
  );
  if (missing.length > 0) {
    throw new Error(
      `[images] Faltan ${missing.length} imágenes en public/_img. ` +
        `Usá "npm run build" (no "next build") como build command.`,
    );
  }
}

const nextConfig = (phase: string): NextConfig => {
  if (phase === PHASE_PRODUCTION_BUILD) assertImagesGenerated();

  return {
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
};

export default nextConfig;
