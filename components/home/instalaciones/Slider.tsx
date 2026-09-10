"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import { CONTENT_WIDTH_SIZES } from "@/lib/image-sizes";
import { useRef } from "react";

interface props {
  images: {
    src: string;
    title: string;
  }[];
}

export default function Slider({ images }: props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);

  useGSAP(
    () => {
      if (!sliderRef.current || images.length === 0) return;

      // 1. IMPORTANTE: Reiniciar el índice siempre que el componente se remonte o cambien las imágenes.
      currentIndex.current = 0;

      // Selector con scope explícito para evitar seleccionar otras imágenes en el DOM
      const slides = gsap.utils.toArray<HTMLImageElement>(
        "img",
        sliderRef.current,
      );
      const titles = gsap.utils.toArray<HTMLElement>(
        ".slider-title",
        sliderRef.current,
      );
      const totalSlides = slides.length;
      let timer: gsap.core.Tween;

      // 2. Estado inicial: OCULTAR TODO
      gsap.set(slides, {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        zIndex: 0,
        scale: 1.1,
        filter: "blur(10px)",
        opacity: 1, // Aseguramos opacidad base por si CSS falla
      });

      gsap.set(titles, {
        opacity: 0,
        y: 20,
        zIndex: 10,
      });

      // 3. Estado inicial: MOSTRAR PRIMERO INMEDIATAMENTE
      gsap.set(slides[0], {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        zIndex: 1,
        scale: 1,
        filter: "blur(0px)",
      });

      gsap.set(titles[0], {
        opacity: 1,
        y: 0,
        zIndex: 10,
      });

      const animateSlide = () => {
        const prevIndex = currentIndex.current;
        const nextIndex = (prevIndex + 1) % totalSlides;

        const prevSlide = slides[prevIndex];
        const nextSlide = slides[nextIndex];

        const prevTitle = titles[prevIndex];
        const nextTitle = titles[nextIndex];

        const tl = gsap.timeline({
          onComplete: () => {
            currentIndex.current = nextIndex;
            // Recursión segura
            timer = gsap.delayedCall(6, animateSlide);
          },
        });

        tl.set(nextSlide, {
          zIndex: 2,
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          scale: 1.1,
          filter: "blur(10px)",
          opacity: 1,
        })
          .to(nextSlide, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.inOut",
          })
          .to(
            prevSlide,
            {
              x: 100,
              opacity: 0,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "<",
          )
          .to(
            prevTitle,
            {
              opacity: 0,
              y: -20,
              duration: 0.5,
              ease: "power2.in",
            },
            "<",
          )
          .fromTo(
            nextTitle,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            "-=1", // Comienza un poco antes de que termine la transición de la imagen
          )
          .set(prevSlide, {
            x: 0,
            zIndex: 0,
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            opacity: 1, // Reseteamos opacidad para el próximo ciclo
          });
      };

      // Inicio del loop
      timer = gsap.delayedCall(6, animateSlide);

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
      className="relative w-full h-full overflow-hidden rounded z-0 bg-black"
    >
      {images.map((image, index) => (
        <Image
          key={index}
          sizes={CONTENT_WIDTH_SIZES}
          priority={index === 0}
          fill
          src={image.src}
          alt={image.title}
          className="absolute inset-0 size-full object-cover block"
        />
      ))}

      <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
        <div className="relative overflow-hidden">
        { /* Placeholder invisible para dar altura al contenedor (usamos el titulo mas largo o un div con min-height) */ }
          <h3 className="text-xs md:text-xl font-black uppercase tracking-tighter opacity-0 invisible">
            {images.reduce((a, b) => a.title.length > b.title.length ? a : b).title}
          </h3>
          
          {images.map((image, index) => (
            <h3
              key={`title-${index}`}
              className="slider-title absolute top-0 left-0 text-white text-xs md:text-xl font-black uppercase tracking-tighter drop-shadow-lg opacity-0 w-max"
            >
              {image.title}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
}
