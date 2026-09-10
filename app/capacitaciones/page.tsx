import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";

const title = "Capacitaciones";
const description =
  "Próximamente vas a encontrar acá la información sobre las capacitaciones y cursos de EFI Gym en Bahía Blanca.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/capacitaciones",
  },
  // Página placeholder sin contenido real: se excluye del índice y del sitemap
  // para no sumar "thin content". Quitar este bloque al publicar el contenido.
  robots: {
    index: false,
    follow: true,
  },
};

export default function CapacitacionesPage() {
  return (
    <div className="h-[95vh] flex flex-col items-center justify-center">
      <SectionHeader
        as="h1"
        title="Proximamente"
        resaltedTitle="Más Informacion"
      />
    </div>
  );
}
