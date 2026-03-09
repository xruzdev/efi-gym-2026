"use client";

import { EfiElectron } from "@/components/common/EfiElectron";
import { useAppStore } from "@/lib/app-store";
import { gsap, useGSAP } from "@/lib/gsap";

import { horizontalLoop } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { useRef } from "react";

const words = [
  "Entrena con nosotros",
  "Transforma tu cuerpo",
  "Alcanza tus metas",
  "Únete a la comunidad",
  "Siente la energía",
  "Desafía tus límites",
  "Vive el cambio",
  "Supera tus expectativas",
  "Sé tu mejor versión",
  "Inspírate cada día",
];

export const Marquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null),
    tlRef = useRef<gsap.core.Timeline | null>(null);


    const {preloaderComplete} = useAppStore();

  useLenis((lenis) => {
    if (!tlRef.current || !preloaderComplete) return;

    const velocity = lenis.velocity;
    const direction = lenis.direction;


    tlRef.current.timeScale(velocity/4);


    if(Math.abs(velocity) < 1){
        tlRef.current.timeScale(1);
    }
   

    if (direction === -1) {
      tlRef.current.reverse();
    } else {
      tlRef.current.play();
    }
     

  

  },  [preloaderComplete]);

  useGSAP(
    () => {
      if (!marqueeRef.current) return;

      const words = gsap.utils.toArray<HTMLElement>(
        ".word",
        marqueeRef.current,
      );

      const tl = horizontalLoop(words, {
        repeat: -1,
        speed: 0.5,
        paddingRight: 24,
      });

      tlRef.current = tl;
    },
    {
      scope: marqueeRef,
    },
  );

  return (
    <div
      ref={marqueeRef}
      
      className="will-change-transform marquee w-screen overflow-hidden flex items-center gap-6 absolute bottom-6    z-50 bg-efi-red  "
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="text-white will-change-transform  flex gap-6 items-center uppercase font-header text-3xl md:text-4xl xl:text-4xl word pb-2  whitespace-nowrap"
        >
         <span className="block translate-y-[105%] word-into will-change-transform">
           {word} 
          </span> <EfiElectron size={24} />
        </span>
      ))}
    </div>
  );
};

 
