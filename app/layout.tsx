import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Lenis } from "@/components/common/Lenis";
import { NavBar } from "@/components/nav/NavBar";
import { NavMenu } from "@/components/nav/NavMenu";
import { Footer } from "@/components/footer/Footer";
import WhatsApp from "@/components/common/WhatsApp";
import { TransitionWrapper } from "@/components/common/TransitionWrapper";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    template: "%s | EFI Gym",
    absolute: "EFI Gym",
    default: "EFI Gym",
  },
  description:
    "Gimnacio ubicado en la ciudad de Bahía Blanca, Argentina. Entrenamiento personalizado y online.",
  openGraph: {
    title: "Entrenamiento Fisico Integral",
    description:
      "Gimnacio ubicado en la ciudad de Bahía Blanca, Argentina. Entrenamiento personalizado y online.",
    type: "website",
    locale: "es_AR",
    url: "https://www.gimnasioefi.com.ar",
    images:
      "/og-image.jpg",
  },
  keywords: [
    "gym",
    "entrenamiento",
    "fuerza",
    "bien estar",
    "salud",
    "futbol",
    "deportes",
    "nutricion",
    "neurociencia",
    "entrenamiento personalizado",
    "entrenamiento online",
    "entrenamiento fisico integral",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={` ${monserrat.className}  bg-neutral-950 overflow-x-hidden  `}
      >
        <TransitionWrapper>
          <Lenis>
            <NavBar />
            <NavMenu />
            <main>{children}</main>

            <Footer />
            <WhatsApp />
          </Lenis>
        </TransitionWrapper>
      </body>
    </html>
  );
}
