import { activities } from "./data/activities.data";
import { services } from "./data/services";
import {
  BUSINESS,
  OG_IMAGE,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./seo";

/**
 * Datos estructurados (JSON-LD). Validar cambios en:
 * https://search.google.com/test/rich-results
 */

const GYM_ID = `${SITE_URL}/#gym`;

/** Negocio local: habilita el panel de conocimiento y el SEO local. */
export const gymSchema = {
  "@context": "https://schema.org",
  "@type": ["ExerciseGym", "SportsActivityLocation", "LocalBusiness"],
  "@id": GYM_ID,
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  alternateName: ["Gimnasio EFI", "EFI Entrenamiento Físico Integral"],
  description:
    "Gimnasio en Bahía Blanca con sala de musculación, clases grupales, área de nutrición y kinesiología. Entrenamiento personalizado y online.",
  url: SITE_URL,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  image: absoluteUrl(OG_IMAGE.url),
  logo: absoluteUrl("/efi logo.svg"),
  priceRange: "$$",
  currenciesAccepted: "ARS",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  hasMap: BUSINESS.maps,
  areaServed: {
    "@type": "City",
    name: BUSINESS.city,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "07:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  sameAs: [BUSINESS.instagram],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS.phone,
    contactType: "customer service",
    availableLanguage: ["Spanish"],
  },
  amenityFeature: [
    "Sala de musculación",
    "Máquinas de cardio",
    "Sala de funcional",
    "Patio de entrenamiento",
    "Área de neurociencias",
    "Duchas y vestuarios",
    "Consultorio médico",
  ].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Actividades y servicios",
    itemListElement: [
      ...activities.map((activity) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: activity.title,
          description: activity.text,
        },
      })),
      ...services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.text,
          provider: { "@type": "Person", name: service.profesional },
        },
      })),
    ],
  },
};

/** Habilita el sitelinks searchbox / identidad del sitio. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "es-AR",
  publisher: { "@id": GYM_ID },
};

export const breadcrumbSchema = (
  items: { name: string; path: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
