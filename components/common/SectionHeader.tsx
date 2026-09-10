"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

import { useRef } from "react";

import Copy from "./Copy";

export const SectionHeader = ({
  title,
  resaltedTitle,
  subtitle,
  as: Heading = "h2",
}: {
  title: string;
  resaltedTitle?: string;
  subtitle?: string;
  /** Nivel de encabezado. Usar "h1" cuando este es el título principal de la página. */
  as?: "h1" | "h2";
}) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      const container = headerRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(
        ".title, .rt-title",
        {
          x: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        0,
      );

      tl.to(
        ".rt-bg",
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0,
      );
    },
    { scope: headerRef },
  );

  return (
    <div ref={headerRef}>
      <Heading className=" text-7xl md:text-[5rem] overflow-hidden w-fit mx-auto   lg:text-[5.3rem] xl:text-[6.5rem] leading-15 pb-4 pr-4  text-white uppercase tracking-wide 2xl:text-8xl font-header   text-center md:mb-4 ">
        <span className="title translate inline-block -translate-x-[120%]">
          {title}
        </span>
        <div className=" ml-2  rt-container mt-2 md:mt-0 md:ml-4  py-1 md:py-1.5  lg:py-2 xl:py-4 relative inline-block">
          <span className=" rt-title inline-block translate-x-[120%] ">
            {resaltedTitle}
          </span>
          <div className="rt-bg scale-x-0 origin-left absolute -bottom-2 md:-bottom-2.5  lg:-bottom-3  left-1/2 -translate-x-1/2  w-[105%] h-full bg-efi-red rounded -z-10 "></div>
        </div>
      </Heading>

      {subtitle && (
        <Copy>
          <p className="text-center  text-white text-sm xl:text-base   max-w-2xl mx-auto">
            {subtitle}
          </p>
        </Copy>
      )}
    </div>
  );
};
