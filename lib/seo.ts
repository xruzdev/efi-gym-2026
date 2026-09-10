/**
 * Configuración SEO centralizada.
 *
 * IMPORTANTE: `SITE_URL` debe coincidir EXACTAMENTE con el dominio que sirve el
 * sitio en producción (con o sin `www`, según cómo esté configurado el DNS /
 * hosting). Si el hosting redirige de `www` a no-`www` (o al revés), usar acá
 * el destino final del redirect: de lo contrario los canonicals y el sitemap
 * apuntan a URLs que redirigen y Google descarta la señal.
 */
export const SITE_URL = "https://gimnasioefi.com.ar";

export const SITE_NAME = "EFI Gym";
export const SITE_LEGAL_NAME = "EFI - Entrenamiento Físico Integral";

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "EFI Gym - Gimnasio en Bahía Blanca",
} as const;

export const BUSINESS = {
  phone: "+5492915049564",
  phoneDisplay: "+54 9 2915 04-9564",
  email: "gimnasioefi@gmail.com",
  street: "Jorge Waish 31",
  city: "Bahía Blanca",
  region: "Buenos Aires",
  postalCode: "8000",
  country: "AR",
  latitude: -38.7016492,
  longitude: -62.289035,
  instagram: "https://www.instagram.com/gymefi/",
  whatsapp: "https://wa.me/5492915049564",
  maps: "https://goo.gl/maps/1ZtLh7n2mLZzjvVb9",
} as const;

/** Devuelve una URL absoluta a partir de un path relativo. */
export const absoluteUrl = (path = "/") =>
  new URL(path, SITE_URL).toString().replace(/\/$/, "") || SITE_URL;
