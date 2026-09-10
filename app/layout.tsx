import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Lenis } from "@/components/common/Lenis";
import { NavBar } from "@/components/nav/NavBar";
import { NavMenu } from "@/components/nav/NavMenu";
import { Footer } from "@/components/footer/Footer";
import WhatsApp from "@/components/common/WhatsApp";
import { TransitionWrapper } from "@/components/common/TransitionWrapper";
import { JsonLd } from "@/components/common/JsonLd";
import { gymSchema, websiteSchema } from "@/lib/schema";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { montserrat, redig } from "@/lib/fonts";

const description =
  "Gimnasio en Bahía Blanca con sala de musculación, clases grupales, funcional, nutrición y kinesiología. Entrenamiento personalizado y online.";

export const metadata: Metadata = {
  // Base para resolver todas las URLs relativas (og:image, canonicals, etc.).
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: "EFI Gym | Gimnasio en Bahía Blanca",
  },
  description,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: SITE_NAME,
    title: "EFI Gym | Gimnasio en Bahía Blanca",
    description,
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "EFI Gym | Gimnasio en Bahía Blanca",
    description,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  keywords: [
    "gimnasio Bahía Blanca",
    "gym Bahía Blanca",
    "musculación Bahía Blanca",
    "clases grupales",
    "entrenamiento funcional",
    "entrenamiento personalizado",
    "entrenamiento online",
    "entrenamiento físico integral",
    "nutrición deportiva",
    "kinesiología deportiva",
    "crossfit",
    "zumba",
  ],
  category: "fitness",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${montserrat.variable} ${redig.variable}`}>
      <body
        className={` ${montserrat.className}  bg-neutral-950 overflow-x-hidden  `}
      >
        <JsonLd data={[gymSchema, websiteSchema]} />

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
