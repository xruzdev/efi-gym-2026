/**
 * Valores para el atributo `sizes` de next/image.
 *
 * El wrapper de contenido usa `px-4 md:px-10 lg:px-4 xl:px-16 2xl:px-48`, así
 * que el ancho real de una imagen "a ancho completo" es el viewport MENOS ese
 * padding. Declarar `100vw` hace que el navegador pida el candidato siguiente
 * del srcset (p. ej. 1920px en lugar de 1200px) y se descarguen cientos de KB
 * de más.
 */
export const CONTENT_WIDTH_SIZES = [
  "(max-width: 768px) calc(100vw - 32px)",
  "(max-width: 1024px) calc(100vw - 80px)",
  "(max-width: 1280px) calc(100vw - 32px)",
  "(max-width: 1536px) calc(100vw - 128px)",
  "calc(100vw - 384px)",
].join(", ");
