"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import { useRef } from "react";

export default function Slider({ images, delay = 6 }: { images: string[], delay?: number }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);

 

  useGSAP(
    () => {
      if (!sliderRef.current || images.length === 0 ) return;

      // 1. IMPORTANTE: Reiniciar el índice siempre que el componente se remonte o cambien las imágenes.
      currentIndex.current = 0;

      // Selector con scope explícito para evitar seleccionar otras imágenes en el DOM
      const slides = gsap.utils.toArray<HTMLImageElement>(
        "img",
        sliderRef.current,
      );
      const totalSlides = slides.length;
      let timer: gsap.core.Tween;

      // 2. Estado inicial: OCULTAR TODO
      gsap.set(slides, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        zIndex: 0,
        scale: 1.1,
        filter: "blur(10px)",
        opacity: 1, // Aseguramos opacidad base por si CSS falla
      });

      // 3. Estado inicial: MOSTRAR PRIMERO INMEDIATAMENTE
      gsap.set(slides[0], {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        zIndex: 1,
        scale: 1,
        filter: "blur(0px)",
      });

      const animateSlide = () => {
        const prevIndex = currentIndex.current;
        const nextIndex = (prevIndex + 1) % totalSlides;

        const prevSlide = slides[prevIndex];
        const nextSlide = slides[nextIndex];

        const tl = gsap.timeline({
          onComplete: () => {
            currentIndex.current = nextIndex;
            // Recursión segura
            timer = gsap.delayedCall(delay, animateSlide);
          },
        });

        tl.set(nextSlide, {
          zIndex: 2,
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          scale: 1.1,
          filter: "blur(10px)",
          opacity: 1,
        })
          .to(nextSlide, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.inOut",
          })
          .to(
            prevSlide,
            {
              y: -100,
              opacity: 0,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "<",
          )
          .set(prevSlide, {
            y: 0,
            zIndex: 0,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            opacity: 1, // Reseteamos opacidad para el próximo ciclo
          });
      };

      // Inicio del loop
      timer = gsap.delayedCall(delay, animateSlide);

      // Cleanup manual extra, aunque useGSAP lo hace por defecto con los timers creados en contexto
      return () => {
        timer?.kill();
      };
    },
    // Quitamos 'revertOnUpdate' para evitar el flash negro al volver.
    // Solo necesitamos que se ejecute al montar o cambiar dependencias.
    { scope: sliderRef, dependencies: [images] },
  );

  return (
    <div
      ref={sliderRef}
     
      className=" relative w-full h-full overflow-hidden   z-0 bg-black"
    >
      {images.map((imgSrc, index) => (
        <Image
          key={index}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          priority={index === 0}
          fill
          src={imgSrc}
          alt={`Slide ${index}`}
          className="absolute inset-0 size-full object-cover block"
        />
      ))}
    </div>
  );
}
