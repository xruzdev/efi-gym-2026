"use client";

import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { useState } from "react";

const WhatsApp = () => {
  const whatsappNumber = "5492915049564"; // Reemplazar con tu número de WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const [actualScroll, setActualScroll] = useState(0);

  useLenis((lenis) => {
    if (!lenis) return;

    setActualScroll(lenis.actualScroll);
  });

  return (
    <Link
      style={{
        transform: actualScroll < 20 ? "translateX(90px)" : "translateX(0px)",
        transition: "transform 0.3s ease-in-out",
      }}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-1 size-12 rounded shadow-lg transition-all duration-300 ease-in-out hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="size-full" />
    </Link>
  );
};

export default WhatsApp;
