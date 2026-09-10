"use client"; // Necesario en Next.js App Router para usar hooks del lado del cliente

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { useWindowWidth } from "@/lib/hooks/useWindowWidth";
import { tabsData } from "@/lib/data/plans";

 
// Estas son las posiciones base (x, y, rotación) donde descansan las tarjetas
const finalPositions = (length: number) => {
  if (length === 2)
    return [
      { x: -200, y: -20, rotation: -10 },
      { x: 200, y: -15, rotation: 10 },
    ];
  return [
    { x: -300, y: -20, rotation: -12 },
    { x: 0, y: 10, rotation: -4 },
    { x: 300, y: -15, rotation: 4 },
  ];
};

type TabKey = keyof typeof tabsData;

export default function AnimatedCards() {
  const container = useRef(null);
  const [activeTab, setActiveTab] = useState<TabKey>("Musculación");
  const [isAnimating, setIsAnimating] = useState(false);

  // Referencia para saber si ya se hizo la animación inicial
  const hasPlayedInitial = useRef(false);

  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 1024;

  // Extraemos contextSafe de useGSAP.
  // Esto es VITAL para ejecutar animaciones dentro de event listeners en React.
  const { contextSafe } = useGSAP({ scope: container });

  // 1. Animación de Entrada (con ScrollTrigger para la primera vez)
  useGSAP(
    () => {
      if (!isDesktop) return null;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (!hasPlayedInitial.current) {
          // Primera vez: Animamos al hacer scroll
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top 75%", // Se activa cuando el elemento llega al 75% del viewport
              onEnter: () => {
                hasPlayedInitial.current = true;
              },
              toggleActions: "play none none reverse",
            },
          });

          // Animación de los botones
          tl.fromTo(
            ".tab-btn",
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
            },
          );

          // Animación de las tarjetas
          tl.fromTo(
            ".card-element",
            { y: 800, x: 0, rotation: 0, opacity: 0 },
            {
              y: (i) => finalPositions(tabsData[activeTab].length)[i].y,
              x: (i) => finalPositions(tabsData[activeTab].length)[i].x,
              rotation: (i) =>
                finalPositions(tabsData[activeTab].length)[i].rotation,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              stagger: 0.1,
              onComplete: () => setIsAnimating(false),
            },
            "-=0.3", // Empezar un poco antes de que terminen los botones
          );
        } else {
          // Segunda vez en adelante: Animación directa por cambio de tab
          gsap.fromTo(
            ".card-element",
            { y: 800, x: 0, rotation: 0, opacity: 0 },
            {
              y: (i) => finalPositions(tabsData[activeTab].length)[i].y,
              x: (i) => finalPositions(tabsData[activeTab].length)[i].x,
              rotation: (i) =>
                finalPositions(tabsData[activeTab].length)[i].rotation,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              stagger: 0.1,
              onComplete: () => setIsAnimating(false),
            },
          );
        }
      });
    },
    { scope: container, dependencies: [activeTab, isDesktop] },
  );

  if (!isDesktop) return null;

  // Animación de salida y cambio de tab
  const handleTabChange = contextSafe((newTab: TabKey) => {
    if (newTab === activeTab || isAnimating) return;

    setIsAnimating(true);

    gsap.to(".card-element", {
      y: 800,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in",
      stagger: 0.05,
      onComplete: () => {
        setActiveTab(newTab);
      },
    });
  });

  // 2. Interacción: Al entrar el mouse
  const handleMouseEnter = contextSafe((activeIndex: number) => {
    const cards = gsap.utils.toArray(".card-element") as HTMLElement[];

    cards.forEach((card, i) => {
      if (i === activeIndex) {
        // La tarjeta que recibe el hover se agranda, sube y se endereza
        gsap.to(card, {
          scale: 1.1,
          rotation: 0,
          y: finalPositions(tabsData[activeTab].length)[i].y - 30,
          zIndex: 20, // La traemos al frente
          duration: 0.4,
          ease: "power2.out",
          boxShadow: "0 10px 40px -10px #e51734", // Sombra más intensa al hacer hover
          overwrite: "auto",
        });
      } else {
        // Las demás tarjetas se apartan
        const offset = i > activeIndex ? 80 : -80; // Empuja a la derecha o izquierda
        const rotationOffset = i > activeIndex ? 5 : -5;

        gsap.to(card, {
          x: finalPositions(tabsData[activeTab].length)[i].x + offset,
          rotation:
            finalPositions(tabsData[activeTab].length)[i].rotation +
            rotationOffset,
          zIndex: 10,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  });

  // 3. Interacción: Al salir el mouse
  const handleMouseLeave = contextSafe(() => {
    const cards = gsap.utils.toArray(".card-element") as HTMLElement[];

    cards.forEach((card, i) => {
      // Devolvemos todas las tarjetas a sus posiciones originales
      gsap.to(card, {
        scale: 1,
        x: finalPositions(tabsData[activeTab].length)[i].x,
        y: finalPositions(tabsData[activeTab].length)[i].y,
        rotation: finalPositions(tabsData[activeTab].length)[i].rotation,
        zIndex: 10,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
        boxShadow: "0 20px 40px -10px #f5f5f5", // Sombra original //0 20px 40px -10px #f5f5f5
      });
    });
  });
  const currentCards = tabsData[activeTab];

  return (
    // Contenedor principal: usa el mismo color azul de fondo que tu referencia
    <div
      ref={container}
      className=" hidden relative lg:flex flex-col items-center justify-center w-full h-180  overflow-hidden  "
    >
      {/* Botones de Tabs */}
      <div className="flex gap-4 z-30 mt-10">
        {(Object.keys(tabsData) as TabKey[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-2 cursor-pointer text-3xl tracking-wide leading-5 pb-3.5  rounded uppercase font-header transition-colors ${
              activeTab === tab
                ? "bg-efi-red text-white"
                : "bg-black text-neutral-400 hover:bg-neutral-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="relative size-full flex justify-center mt-20  2xl:mt-32    ">
        {currentCards.map((card, index) => (
          <Link
            target="_blank"
            href={`https://wa.me/5492915049564/?text=Hola, estoy interesado en el plan ${card.title} de ${activeTab}`}
            key={card.id}
            className="card-element absolute flex flex-col group  justify-between lg:w-1/4   2xl:w-70  h-95 p-6  bg-neutral-950 rounded shadow-2xl text-white cursor-pointer will-change-transform "
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              // Sombra blanca/clara sutil para separar la tarjeta del fondo, como en la imagen
              boxShadow: "0 20px 40px -10px #f5f5f5",
            }}
          >
            {/* Título de la tarjeta */}
            <h3 className="text-5xl font-header uppercase tracking-wide ">
              {card.title}
            </h3>

            {/* Espacio para la imagen 3D (puedes reemplazar esto con una etiqueta <img /> o componente <Image /> de Next.js) */}
            <div className="grow flex items-center justify-center pointer-events-none">
              <div className="w-30 h-30  relative  group-hover:scale-110 transition-transform duration-300   rounded-full flex items-center justify-center" >
                 <Image src={card.icon} alt={card.title} fill sizes="120px" className="z-1 " />

                 <div className="bg-white absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 w-30 h-30 rounded-4xl group-hover:bg-efi-red transition-colors duration-300   z-0"></div>
              </div>
            </div>

            {/* Texto inferior descriptivo */}
            <p className="text-xs font-medium leading-relaxed whitespace-pre-line opacity-90">
              {card.description}
            </p>

            <FaWhatsapp className="text-4xl text-green-500 opacity-20 group-hover:opacity-100 transition-all hover:scale-105 absolute right-4 bottom-4 duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
