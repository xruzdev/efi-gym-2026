import { Section } from "@/components/about/Section";


export const metadata = {
  title: "Quiénes Somos - EFI Gym",
  description: "Conoce la historia, misión y valores de EFI Gym. Somos un gimnasio comprometido con tu bienestar y transformación física. Descubre por qué somos la mejor opción para alcanzar tus objetivos de fitness.",
  
  openGraph: {
    title: "Quiénes Somos - EFI Gym",
    description: "Conoce la historia, misión y valores de EFI Gym. Somos un gimnasio comprometido con tu bienestar y transformación física. Descubre por qué somos la mejor opción para alcanzar tus objetivos de fitness.",
    url: "https://www.efigym.com/quienes-somos",
    siteName: "EFI Gym",
    images: [
      {
        url: "https://www.efigym.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EFI Gym - Quiénes Somos",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};


export default function QuienesSomosPage() {
  return <Section />;
}
