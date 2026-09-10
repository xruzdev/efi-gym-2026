"use client";

import Link from "next/link";

import Copy from "@/components/common/Copy";
import Slider from "./Slider";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

import { useRef } from "react";

interface CardProps {
  title: string;
  text: string;
  profesional: string;

  images: string[];
}

export const Card = ({ title, text, profesional, images }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const mm = gsap.matchMedia();

      gsap.to(".cta", {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        delay: 0.6,
        duration: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          end: "top 50%",

          toggleActions: "play none none reverse",
        },
      });

      //Mobiles

      mm.add("(max-width: 1023px)", () => {
        const tweenMobile = gsap.to(cardRef.current, {
          x: 0,
          opacity: 1,
        });

        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "top 90%",
          end: "top 50%",

          scrub: 1,
          animation: tweenMobile,
        });
      });

      const tweenDesktop = gsap.to(cardRef.current, {
        x: 0,
        scale: 1,
        opacity: 1,
      });
      //Desktop lg
      mm.add("(min-width: 1024px) and (max-width: 1279px)", () => {
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "-20% 90%",
          end: "40% 50%",

          scrub: 1,
          toggleActions: "play none none reverse",
          animation: tweenDesktop,
        });
      });

      //Desktop xl
      mm.add("(min-width: 1280px)", () => {
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "-20% 90%",
          end: "50% 50%",

          scrub: 1,
          toggleActions: "play none none reverse",
          animation: tweenDesktop,
        });
      });
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      className=" will-change-transform -translate-x-full odd:translate-x-full lg:scale-50 opacity-0   bg-linear-to-r rounded from-efi-red via-efi-red/40 to-efi-red   p-px w-full md:w-[95%] lg:w-full   mx-auto "
    >
      <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-16 items-start bg-neutral-950 rounded p-6 lg:p-10 xl:p-16">
        {images.length > 0 && (
          <div className="mb-4 aspect-3/4 md:aspect-square xl:aspect-4/3 w-full lg:flex-1 relative">
            <Slider images={images} label={title} />
          </div>
        )}
        <div className="flex flex-col w-full lg:flex-1">
          <Copy delay={0.5}>
            <h3 className="text-5xl xl:text-6xl 2xl:text-7xl font-header text-white uppercase tracking-wide  mb-4">
              {title}
            </h3>{" "}
            <p className="text-gray-50 mb-4 xl:text-lg">{text}</p>
            <p className="text-gray-400 italic">
              Profesional a cargo: {profesional}
            </p>
          </Copy>

          <Link
            href={`https://wa.me/5492915049564?text=Hola!%20Quiero%20pedir%20un%20turno%20con%20${encodeURIComponent(profesional)}.`}
            className=" cta mt-4 opacity-0 scale-0 lg:mt-10 2xl:mt-18 w-full text-center uppercase  inline-block self-center border border-efi-red text-white px-4 py-2 rounded hover:bg-efi-red/90 transition-colors duration-300"
          >
            Pedir turno
          </Link>
        </div>
      </div>
    </div>
  );
};

/**
 * 
 * 
export const Card = ({ title, text, profesional, images }: CardProps) => {
  return (
    <div className=" border-efi-red border rounded shadow-ef shadow-md p-6 w-full lg:w-2/3  mx-auto flex flex-col items-start">
      {images.length > 0 && (
        <div className="mb-4 aspect-square w-full relative">
          {images.map((image, index) => (
            <Image
              key={index}
              fill
              src={image}
              alt={`${title} en EFI Gym - imagen ${index + 1}`}
              className="w-full object-cover h-auto mb-2 rounded"
            />
          ))}
        </div>
      )}
      <h3 className="text-5xl font-header text-white uppercase tracking-wide  mb-4">
        {title}
      </h3>
      <Copy>
        {" "}
        <p className="text-gray-50 mb-4">{text}</p>
      </Copy>
      <p className="text-gray-400 italic">Profesional a cargo: {profesional}</p>

      <Link
        href={`https://wa.me/5492915049564?text=Hola!%20Quiero%20pedir%20un%20turno%20con%20${encodeURIComponent(profesional)}.`}
        className="mt-4  inline-block self-center border border-efi-red text-white px-4 py-2 rounded hover:bg-efi-red/90 transition-colors duration-300"
      >
        Pedir turno
      </Link>
    </div>
  );
};
 */

/**
 * 
 * export const Card = ({ title, text, profesional, images }: CardProps) => {
  return (
    <div className="w-full justify-evenly flex gap-0 odd:flex-row-reverse   ">

        <div className="hidden  lg:flex h-auto rounded w-50 border-efi-red border  "></div>
      <div className=" border-efi-red border rounded shadow-ef shadow-md p-6 w-full lg:w-2/3  flex flex-col items-start">
        {images.length > 0 && (
          <div className="mb-4 aspect-video w-full relative">
            {images.map((image, index) => (
              <Image
                key={index}
                fill
                src={image}
                alt={`${title} en EFI Gym - imagen ${index + 1}`}
                className="w-full object-cover h-auto mb-2 rounded"
              />
            ))}
          </div>
        )}
        <h3 className="text-5xl font-header text-white uppercase tracking-wide  mb-4">
          {title}
        </h3>
        <Copy>
          {" "}
          <p className="text-gray-50 mb-4">{text}</p>
        </Copy>
        <p className="text-gray-400 italic">
          Profesional a cargo: {profesional}
        </p>

        <Link
          href={`https://wa.me/5492915049564?text=Hola!%20Quiero%20pedir%20un%20turno%20con%20${encodeURIComponent(profesional)}.`}
          className="mt-4  inline-block self-center border border-efi-red text-white px-4 py-2 rounded hover:bg-efi-red/90 transition-colors duration-300"
        >
          Pedir turno
        </Link>
      </div>
    </div>
  );
};
 */
