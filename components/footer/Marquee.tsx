"use client";
import { gsap, useGSAP } from "@/lib/gsap";
import { horizontalLoop } from "@/lib/utils";
import { useRef } from "react";

const words = [
   "Te esperamos",
   "Vení a entrenar con nosotros",
   "Transforma tu cuerpo",
   "Alcanza tus metas",
];

export const Marquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null),
    tlRef = useRef<gsap.core.Timeline | null>(null);

 
  useGSAP(
    () => {
      if (!marqueeRef.current) return;

      const words = gsap.utils.toArray<HTMLElement>(
        ".word",
        marqueeRef.current,
      );

      const tl = horizontalLoop(words, {
        repeat: -1,
        speed: 0.15,
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
      className=" marquee w-screen overflow-hidden flex items-center gap-6  opacity-20       z-50    "
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="text-white will-change-transform  flex gap-6 items-center uppercase font-header text-3xl md:text-4xl lg:text-6xl xl:text-9xl word pb-2  whitespace-nowrap"
        >
          <span className="block   word-into will-change-transform">
            {word}
          </span>

          <svg
            viewBox="0 0 449.87 1012.35"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-5 size-4  word-into   "
          >
            <path
              d="M99.12,612.58s-56.22-.03-81.9-.03-15.43-35.61-15.43-35.61c0,0,150.74-451.02,169.73-516.3C190.52-4.63,231.5.07,231.5.07l2.05.04h191.97c37.98,7.12,20.18,42.73,20.18,42.73l-172.1,356.07h155.48c15.43,2.37,8.31,11.87,8.31,11.87L17.23,1005.42c-7.87,11.14-15.43,7.12-17.21,0-1.78-7.12,99.1-392.84,99.1-392.84Z"
              fill="#fff"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};
