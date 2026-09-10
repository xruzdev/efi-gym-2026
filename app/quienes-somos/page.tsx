import type { Metadata } from "next";
import { Section } from "@/components/about/Section";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";

const title = "Quiénes Somos";
const description =
  "Conocé la historia, el equipo y las instalaciones de EFI Gym en Bahía Blanca: musculación, funcional, alto rendimiento, nutrición y kinesiología.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/quienes-somos",
  },
  openGraph: {
    title: `${title} | EFI Gym`,
    description,
    url: "/quienes-somos",
    type: "website",
    locale: "es_AR",
    images: [{ ...OG_IMAGE, alt: "EFI Gym - Quiénes Somos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | EFI Gym`,
    description,
    images: [OG_IMAGE.url],
  },
};

export default function QuienesSomosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Quiénes Somos", path: "/quienes-somos" },
        ])}
      />
      <Section />
    </>
  );
}
