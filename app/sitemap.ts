import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Solo URLs canónicas e indexables.
  // `/capacitaciones` queda fuera a propósito: es un placeholder con `noindex`.
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/quienes-somos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
