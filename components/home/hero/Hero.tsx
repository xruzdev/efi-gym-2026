"use client";

import Copy from "@/components/common/Copy";
import { LenisLink } from "@/components/common/LenisLink";
import { useAppStore } from "@/lib/app-store";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRef } from "react";
import { Background } from "./Background";
import { Marquee } from "./Marquee";
import Preloader from "./Preloader";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null),
    tlRef = useRef<gsap.core.Timeline>(null);

  const lenis = useLenis(
    (lenis) => {
      const actualScroll = lenis.actualScroll;

      if (tlRef.current) {
        if (actualScroll === 0) tlRef.current.play();
        else if (actualScroll > 0) tlRef.current.progress(1);
      }
    },
    [tlRef],
  );

  const { setPreloaderComplete, preloaderComplete } = useAppStore();

  const hasVisited = useRef<boolean | null>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const $h1 = heroRef.current.querySelector("h1"),
        $buttons = heroRef.current.querySelectorAll("a"),
        $sliderItems = gsap.utils.toArray<HTMLElement>(
          ".slider-item",
          heroRef.current,
        ),
        $efiIcon = heroRef.current.querySelector(".efi-icon"),
        $preloaderTitle = heroRef.current.querySelector("#preloader-title"),
        $preloader = heroRef.current.querySelector(".preloader");

      const preloaderChildren = $preloaderTitle ? $preloaderTitle.children : [];
      const efiIconChildren = $efiIcon ? $efiIcon.children : [];

      // Evaluar una sola vez el storage para evadir el doble render de React Strict Mode
      if (hasVisited.current === null) {
        hasVisited.current = !!sessionStorage.getItem("efigym_visited");
      }

      const isVisited = hasVisited.current;

      const tl = gsap.timeline({
        defaults: {
          ease: "hop",
        },
        paused: true,
        onStart: () => {
          if (!isVisited) {
            setPreloaderComplete(false);
            lenis?.stop();
          }
        },
      });

      if (isVisited) {
        // Ocultar preloader directamente y marcar completado
        if ($preloader) gsap.set($preloader, { display: "none" });
        setPreloaderComplete(true);

        // Animación más rápida sólo para los elementos de Hero
        tl.to($sliderItems, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.25,
          stagger: {
            each: 0.18,
            from: "end",
          },
          ease: "back.out",
        })
          .to(
            ".word-into",
            {
              y: 0,
              duration: 0.6,
              stagger: 0.03,
            },
            "-=2",
          )
          .to(
            $h1!.children,
            {
              y: 0,
              duration: 1.5,

              ease: "power4.out",
            },
            "<",
          )

          .to(
            $buttons,
            {
              opacity: 1,
              y: 0,
            },
            "-=1.0",
          );
      } else {
        // Marcar como visitado
        sessionStorage.setItem("efigym_visited", "true");

        // Animación completa original
        tl.to([preloaderChildren, efiIconChildren], {
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        })
          .to([preloaderChildren, efiIconChildren], {
            y: "-105%",
            duration: 0.5,
            delay: 0.2,
            stagger: {
              each: 0.1,
              from: "end",
            },
            ease: "power2.in",
          })
          .to($preloader!, {
            opacity: 0,
            duration: 0.5,
            delay: -0.2,
            display: "none",
          })
          .to($sliderItems, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.25,
            stagger: {
              each: 0.18,
              from: "end",
            },
            delay: -0.7,
            ease: "back.out",
          })
          .to($h1!.children, {
            y: 0,
            duration: 1.5,
            delay: -1.5,
            ease: "power4.out",
          })
          .to(
            ".word-into",
            {
              y: 0,
              duration: 0.6,
              stagger: 0.03,
            },
            "-=1.8",
          )
          .to(
            $buttons,
            {
              opacity: 1,
              y: 0,
              onComplete: () => {
                setPreloaderComplete(true);
                lenis?.start();
              },
            },
            "-=1.5",
          );
      }

      tlRef.current = tl;
    },
    {
      scope: heroRef,
      dependencies: [lenis],
    },
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-screen h-screen flex flex-col items-center justify-start  will-change-transform "
    >
      <Preloader />
      <Background />

      <Marquee />

      {/*bottom gradient layer */}
      <div className="layer absolute bottom-0 left-0 w-full bg-linear-to-t from-neutral-950 to-transparent h-1/2"></div>

      <div className=" pt-8  z-50 text-center flex flex-col   items-center justify-center h-full">
        <h1 className="mask overflow-hidden will-change-transform text-[5.8rem] leading-18 pb-2.5 md:leading-20 md:pb-6  md:text-9xl lg:text-[6.8rem] xl:text-9xl font-header font-medium uppercase flex flex-col lg:flex-row items-center justify-center md:gap-4">
          <span className=" translate-y-full xl:translate-y-[120%]  uppercase text-white  ">
            Tus objetivos
          </span>

          <span className="translate-y-full xl:translate-y-[120%]  text-efi-red ">
            son nuestros
          </span>
        </h1>

        <div className=" mt-4 mb-18 md:mb-10 text-white text-sm md:text-lg lg:text-sm px-2 w-full lg:max-w-3xl sub-headers ">
          <Copy triggerAnimation={preloaderComplete} animateOnScroll={false}>
            <p>
              En EFI gym encontrarás un equipo de profesionales dispuestos a
              ayudarte a alcanzar tus metas. No importa cuánto tiempo lleves sin
              entrenar, siempre es el momento perfecto para empezar.
            </p>
          </Copy>
        </div>

        <div className="flex w-1/2 md:w-3/4 lg:w-3xl justify-evenly flex-col md:flex-row gap-4">
          <LenisLink
            title="Quiero Empezar"
            href="#plans"
            className="flex opacity-0 items-center text-white justify-center gap-4 uppercase text-center text-sm font-bold rounded  my-1 hover:shadow-black hover:shadow-lg px-3 text-nowrap lg:px-4 py-2 active:scale-95  bg-efi-red transition-all duration-500  "
          >
            Comienza ahora
          </LenisLink>

          <Link
            title="Quienes somos"
            href="/quienes-somos"
            className="flex items-center opacity-0 text-white justify-center gap-4 uppercase text-center text-sm font-bold rounded bg-transparent border border-custom-red  hover:shadow-black hover:shadow-md  px-3 lg:px-4  py-2 active:scale-95 hover:border-efi-red  transition-all duration-300"
          >
            Conocenos
          </Link>
        </div>
      </div>
    </section>
  );
};
