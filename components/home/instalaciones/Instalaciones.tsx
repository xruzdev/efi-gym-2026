"use client";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import { instalaciones } from "@/lib/data/instalaciones";
import Slider from "./Slider";
import { SectionHeader } from "@/components/common/SectionHeader";

export const Instalaciones = () => {
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sliderContainerRef.current) return;

    ScrollTrigger.create({
      trigger: sliderContainerRef.current,
      start: "top 80%",
      toggleActions: "play none none reverse",
      animation: gsap.to(sliderContainerRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }),
    });

    ScrollTrigger.create({
      trigger: sliderContainerRef.current,
      start: "top 60%",
      end: "bottom 20%",
      scrub: 1,
      animation: gsap.to(sliderContainerRef.current, {
        rotate: 0,
        scale: 1,
        y: 0,
        ease: "none",
      }),
    });
  });

  return (
    <section
      id="facilities"
      className="w-full flex flex-col gap-8   "
    >
      <SectionHeader title="Nuestras" resaltedTitle="Instalaciones"  />
      <div
        ref={sliderContainerRef}
        className="opacity-0 will-change-transform w-full h-50 md:h-120 xl:h-150 2xl:h-200 -translate-y-50 md:-translate-y-80 xl:-translate-y-95 2xl:-translate-y-122 scale-70 md:scale-35 2xl:scale-25  -rotate-4 -z-20 "
      >
        <Slider images={instalaciones} />
      </div>
    </section>
  );
};
