import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata = {
  title: "Capacitaciones - EFI Gym",
  description: "Próximamente más información sobre nuestras capacitaciones. Mantente atento para descubrir cómo podemos ayudarte a alcanzar tus objetivos de fitness con nuestros programas de entrenamiento personalizados y online.",
  
  openGraph: {
    title: "Capacitaciones - EFI Gym",
    description: "Próximamente más información sobre nuestras capacitaciones. Mantente atento para descubrir cómo podemos ayudarte a alcanzar tus objetivos de fitness con nuestros programas de entrenamiento personalizados y online.",
    url: "https://www.efigym.com/capacitaciones",
    siteName: "EFI Gym",
    images: [
      {
        url: "https://www.efigym.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EFI Gym - Capacitaciones",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function CapacitacionesPage() {
  return (
    <div className="h-[95vh] flex flex-col items-center justify-center">
       <SectionHeader title="Proximamente" resaltedTitle="Más Informacion" />
    </div>
  );
}