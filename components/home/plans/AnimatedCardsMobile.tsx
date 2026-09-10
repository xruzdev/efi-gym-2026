"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { useWindowWidth } from "@/lib/hooks/useWindowWidth";
import { tabsData } from "@/lib/data/plans";
import { gsap, useGSAP } from "@/lib/gsap";

type TabKey = keyof typeof tabsData;

export default function AnimatedCardsMobile() {
  const container = useRef<HTMLDivElement>(null);
  const hasPlayedInitial = useRef(false);
  const [activeTab, setActiveTab] = useState<TabKey>("Musculación");
  const [isAnimating, setIsAnimating] = useState(false);

  const windowWidth = useWindowWidth();
  // Mostrar solo en pantallas menores a 1024px
  const isMobile = windowWidth < 1024;

  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      // Si no estamos en mobile o el contenedor aún no existe, no hacemos nada
      if (!isMobile || !container.current) return;

      if (!hasPlayedInitial.current) {
        // Primera vez: Animamos al hacer scroll (cuando el contenedor entra al viewport)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%", // Inicia cuando el 80% del componente entra en pantalla
            onEnter: () => {
              hasPlayedInitial.current = true;
            },
          },
        });

        // Entrada suave de botones
        tl.fromTo(
          ".mobile-tab-btn",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        );

        // Entrada desde la izquierda de las tarjetas
        tl.fromTo(
          ".mobile-card-element",
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.3",
        );
      } else {
        // Segunda vez en adelante: Animación de entrada tras cambio de tab (vienen desde la derecha)
        gsap.fromTo(
          ".mobile-card-element",
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: () => setIsAnimating(false),
          },
        );
      }
    },
    { scope: container, dependencies: [isMobile, activeTab] },
  );

  const handleTabChange = contextSafe((newTab: TabKey) => {
    if (newTab === activeTab || isAnimating) return;

    setIsAnimating(true);

    // Animación de salida: Las tarjetas actuales se van hacia la izquierda
    gsap.to(".mobile-card-element", {
      opacity: 0,
      x: -30,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // Cuando termina la salida, cambiamos el estado para triggerar el fade-in de las nuevas
        setActiveTab(newTab);
      },
    });
  });

  // Importante: El return null lo colocamos DESPUÉS de los hooks para no romper las reglas de React
  if (!isMobile) return null;

  const currentCards = tabsData[activeTab];

  return (
    <div
      ref={container}
      className="relative flex flex-col items-center w-full px-4 py-8 lg:hidden"
    >
      {/* Botones de Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 z-30">
        {(Object.keys(tabsData) as TabKey[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`mobile-tab-btn opacity-0 px-4 sm:px-6 py-2 cursor-pointer text-xl sm:text-2xl tracking-wide leading-5 pb-2.5 rounded uppercase font-header transition-colors ${
              activeTab === tab
                ? "bg-efi-red text-white"
                : "bg-black text-neutral-400 hover:bg-neutral-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Lista de Tarjetas Compactas */}
      <div className="flex flex-col gap-3 w-full max-w-md mx-auto mt-8 relative">
        {currentCards.map((card) => (
          <Link
            target="_blank"
            href={`https://wa.me/5492915049564/?text=Hola, estoy interesado en el plan ${card.title} de ${activeTab}`}
            key={card.id}
            className="mobile-card-element opacity-0 flex items-center p-3 sm:p-4 bg-neutral-950 rounded-xl shadow-lg border border-neutral-900 text-white relative overflow-hidden active:scale-[0.98]  "
            style={{
              boxShadow: "0 10px 20px -5px rgba(0,0,0,0.5)",
            }}
          >
            {/* Imagen 3D / Icono (Layout horizontal para ahorrar altura) */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 relative mr-4 flex items-center justify-center rounded-full bg-white">
              <Image
                src={card.icon}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 64px, 80px"
                className="z-10 object-contain p-2"
              />
            </div>

            {/* Información del Plan */}
            <div className="flex flex-col grow pr-10">
              <h3 className="text-2xl sm:text-3xl font-header uppercase tracking-wide">
                {card.title}
              </h3>
              <p className="text-[11px] sm:text-xs font-medium leading-tight whitespace-pre-line text-neutral-300 mt-1">
                {card.description}
              </p>
            </div>

            {/* Icono de WhatsApp flotante a la derecha */}
            <FaWhatsapp className="text-3xl sm:text-4xl text-green-500 absolute right-4 top-1/2 -translate-y-1/2 opacity-80" />
          </Link>
        ))}
      </div>
    </div>
  );
}
