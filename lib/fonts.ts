import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

/**
 * Fuentes del sitio, cargadas con `next/font`.
 *
 * `next/font/local` genera automáticamente una fuente de respaldo con métricas
 * ajustadas (`size-adjust`, `ascent-override`, etc.) a partir del archivo real.
 * Eso es lo que evita el salto de layout (CLS) cuando la tipografía termina de
 * cargar: el texto ocupa el mismo espacio antes y después del swap.
 */
export const redig = localFont({
  src: [
    { path: "./fonts/Redig-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Redig-Oblique.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-redig",
  display: "swap",
  // Se usa en el h1 del hero: conviene precargarla.
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["system-ui", "arial"],
});
