"use client";

import type { ImageLoaderProps } from "next/image";
import manifest from "./image-manifest.json";

type Entry = { base: string; widths: number[] };
const images = manifest as Record<string, Entry>;

/**
 * Loader de next/image para el static export (Cloudflare Pages no tiene el
 * optimizador de Vercel). Los `src` son rutas relativas a `assets/images/`
 * (p. ej. "/gym.webp") y apuntan a las variantes pre-generadas por
 * `scripts/optimize-images.mjs`. Devuelve la variante más chica que cubra el
 * ancho pedido; si no hay ninguna, la más grande (el original).
 */
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const entry = images[src];
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[image-loader] "${src}" no está en assets/images. Corré "npm run images".`);
    }
    return src;
  }
  const w = entry.widths.find((x) => x >= width) ?? entry.widths[entry.widths.length - 1];
  return `${entry.base}-${w}.webp`;
}
