"use client";
import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import { useRef } from "react";
import Copy from "../common/Copy";

import { SectionHeader } from "../common/SectionHeader";

const info = `
Gimnasio EFI es un centro de entrenamiento, preparado y diseñado para deportistas y personas que buscan mejorar su condición física, psíquica y social.
Contamos con profesionales altamente capacitados que van a orientar tu entrenamiento en base a lo que necesites.
Ofrecemos múltiples actividades. Contamos con una sala de musculación, un sector de bicicletas y cintas, y un patio de entrenamiento.
También vas a encontrar la sala de funcional y el área de neurociencias.
El gimnasio cuenta con duchas, baños, y consultorio médico.
Tenemos un departamento de alto rendimiento, compuesto por profesores de Ed física, psicólogo deportivo y nutricionista. Todas las comodidades para que puedas alcanzar el máximo nivel y desarrollarte como deportista. Hacemos evaluaciones físicas, antropometrías, test de visión, y otras evaluaciones funcionales que te van ayudar a crecer en tu deporte. También el gimnasio cuenta con una serie de actividades, direccionadas para mejorar la salud. Funcional, Gap, Cardio, Zumba son actividades que brindamos, te vas a divertir, sentir bien, y mejorar tu condición física. El staff de trabajo está compuesto por Profesores de Ed física, Nutricionistas, Psicólogos.

El gimnasio abrió sus puertas en Marzo del 2020, justo antes de la pandemia. Por ese motivo estuvimos cerrados hasta agosto 2020, donde reabrimos las puertas hasta el día de hoy.
Nuestro enfoque y bases sobre la preparación física siempre fueron y serán las mismas.
Nos preocupamos por un entrenamiento de calidad. Con la salvedad que cuando hablamos de “entrenamiento de calidad” no nos referimos UNICAMENTE a una buena programación de las cargas, a una correcta sentadilla, o una postura adecuada en un LOP.
Siempre tenemos presente, que hay algo mucho más importante en el entrenamiento, y es el de sentirse cómodo en un lugar. La parte psicológica es determinante y es parte del entrenamiento. Entrar a un lugar, sentirte bien, tener ganas de volver. Todo eso, hace a un entrenamiento integral, el cual figura en nuestro nombre, entrenamiento físico integral.
Cuando iniciamos teníamos una idea principal de enfocarnos únicamente en deportistas que busquen el alto rendimiento. Con el paso del tiempo fuimos abriendo nuestro abanico de actividades y enfocarnos en un público más diverso.
Contamos con la infraestructura y la capacidad para que vengas y mejorares tu performance, pero también, si necesitas empezar a mover tu cuerpo por primera vez, tenemos espacio y actividades para que lo hagas.

Eso es EFI, nos transformamos, pero siempre bajo nuestros siglas, INTEGRAL. Lo físico, como lo psíquico y lo social. Te esperamos, te vas a sentir bien.
`;

export const Section = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const images = gsap.utils.toArray(
      ".image-container",
      container.current,
    ) as HTMLElement[];

    images.forEach((image) => {
      gsap.to(image, {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: image,

          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    });
  }, [container]);

  return (
    <section
      ref={container}
      className=" overflow-x-hidden  min-h-screen relative bg-neutral-950 pb-20 "
    >
      <div className="relative w-full h-[60vh]">
        <Image
          fill
          src="/sala-de-musculacion.webp"
          alt="Quienes Somos"
          className="object-cover object-center grayscale brightness-50"
        />

        <div className="absolute inset-0 flex items-center justify-center z-50">
          <SectionHeader title="Sobre" resaltedTitle="EFI" />
        </div>
        <div className="absolute bottom-0 w-full h-60 bg-linear-to-t from-neutral-950 to-transparent z-10" />
      </div>

      <div className=" mx-auto px-4 md:px-10 lg:px-10 xl:px-16 2xl:px-48 mt-20 relative z-20 text-neutral-300 space-y-20 ">
        {info
          .split("\n\n")
          .filter(Boolean)
          .map((paragraph, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <Copy>
                  <p className="text-lg   leading-relaxed whitespace-pre-wrap">
                    {paragraph.trim()}
                  </p>
                </Copy>
              </div>
              <div
                style={{
                  transform:
                    index % 2 === 0 ? "translateX(150%)" : "translateX(-150%)",
                }}
                className="image-container  opacity-0 flex-1 w-full aspect-square   relative   rounded  overflow-hidden flex items-center justify-center"
              >
                <Image
                  fill
                  src={`/about/${index + 1}.webp`}
                  alt="Imagen del gimnasio"
                  className="object-cover object-center"
                />

                <div className="absolute top-0 w-full h-30 bg-linear-to-t from-transparent to-neutral-950 "></div>
                <div className="absolute right-0    h-full w-30 bg-linear-to-r from-transparent to-neutral-950 "></div>
                <div className="absolute bottom-0 w-full h-30 bg-linear-to-b from-transparent to-neutral-950 "></div>
                <div className="absolute left-0 h-full w-30 bg-linear-to-l from-transparent to-neutral-950 "></div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
