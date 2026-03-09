"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useAppStore } from "@/lib/app-store";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import path from "path";
import { LenisLink } from "../common/LenisLink";

export const NavMenu = () => {
  const [actualScroll, setActualScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  useLenis((lenis) => {
    if (!lenis) return;
    setActualScroll(lenis.actualScroll);

    if (lenis.actualScroll <= 20) {
      setMenuOpen(false);
    }
  });

  const pathname = usePathname();

  const menuLinks = [
    {
      title: "Home",
      href: pathname === "/" ? "#hero" : "/",
    },
    {
      title: "Actividades",
      href: pathname === "/" ? "#activities" : "/#activities",
    },
    {
      title: "Instalaciones",
      href: pathname === "/" ? "#facilities" : "/#facilities",
    },
    {
      title: "Servicios",
      href: pathname === "/" ? "#services" : "/#services",
    },
    {
      title: "Planes",
      href: pathname === "/" ? "#plans" : "/#plans",
    },
    {
      title: "Ubicación y Contacto",
      href: pathname === "/" ? "#contact" : "/#contact",
    },
    {
      title: "Quienes Somos",
      href: "/quienes-somos",
    },
    {
      title: "Capacitaciones",
      href: "/capacitaciones",
    },
  ];

  const { preloaderComplete } = useAppStore();

  return (
    <div
      style={{
        opacity: pathname === "/" ? (preloaderComplete ? 1 : 0) : 1,
        transform:
          actualScroll <= 20
            ? "translateY(var(--y-mobile))"
            : "translateY(0px)",
        transition: "all 0.3s ease-in-out",
        width: menuOpen ? "var(--menu-width-from)" : "var(--menu-width)",
      }}
      className="fixed bottom-4 py-1 [--menu-width-from:200px] md:[--menu-width-from:250px] lg:[--menu-width-from:300px] [--menu-width:120px]   md:[--menu-width:200px] border-white bg-white/20 backdrop-blur-sm md:sbackdrop-blur-none md:border-none md:sbg-efi-red [--y-mobile:0px] lg:[--y-mobile:80px]   group left-1/2 -translate-x-1/2 z-50 rounded flex flex-col items-center justify-center px-2 md:px-4  h-auto "
    >
      <div
        style={{
          height: menuOpen ? "310px" : 0,
          transition: "all 1s ease-in-out",
        }}
        className="w-full overflow-hidden  "
      >
        <ul className="flex flex-col items-center  justify-center px-2 md:px-0  py-4">
          {menuLinks.map(({ title, href }) => (
            <li
              className="overflow-hidden w-full    text-center flex flex-col gap-2 pt-2 first:pt-0"
              key={title}
              onClick={() => setMenuOpen(false)}
            >
              <LenisLink
                title={title}
                href={href}
                style={{
                  transform: menuOpen ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "transform 0.8s 0.3s ease-in-out, color 0.3s ease-in-out",
                }}
                className="text-white text-sm   block font-bold uppercase hover:text-efi-red  h-5  "
              >
                {title}
              </LenisLink>

              <div
                style={{
                  transform: menuOpen ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 0.8s 0.3s ease-in-out",
                }}
                className="w-full h-px bg-white origin-center"
              ></div>
            </li>
          ))}
        </ul>
      </div>

      <div
        onClick={() => {
          setMenuOpen((prev) => !prev);
        }}
        className="flex w-full group items-center justify-evenly md:justify-between cursor-pointer"
      >
        <button 
        title="Navigation Menu"
        
        className="size-8   rounded ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            className="size-6 mx-auto stroke-white group-hover:stroke-efi-red transition-colors duration-500"
          >
            <g
              style={{
                opacity: menuOpen ? 0 : 1,
                transition: "opacity .3s ease-in-out",
              }}
              id="open"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                className="group-hover:scale-x-75 transition-all duration-300 origin-center"
              />
              <line x1="3" y1="18" x2="21" y2="18" />
            </g>
            <g
              style={{
                opacity: menuOpen ? 1 : 0,
                transition: "opacity .3s ease-in-out",
              }}
              id="close"
            >
              <line x1="6" y1="6" x2="18" y2="18" />

              <line x1="6" y1="18" x2="18" y2="6" />
            </g>
          </svg>
        </button>

        <div className="text-center  relative text-white group-hover:text-efi-red transition-colors duration-500 text-sm font-bold overflow-hidden w-16">
          <span
            style={{
              transform: menuOpen ? "translateY(120%)" : "translateY(0%)",
              transition: "all 0.3s ease-in-out",
            }}
            className="block"
          >
            MENU
          </span>
          <span
            style={{
              transform: menuOpen ? "translateY(0%)" : "translateY(120%)",
              transition: "all 0.3s ease-in-out",
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
          >
            CERRAR
          </span>
        </div>

        <svg
          id="Capa_1"
          data-name="Capa 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 884.29 908.99"
          className="size-6 fill-white group-hover:fill-efi-red transition-colors duration-500 hidden md:block"
        >
          <g id="E">
            <path d="M89.04,908.99h488.85s11.94-2.39,20.7-17.52l50.16-152.07s2.39-16.49-13.53-16.2c-15.92.28-412.41,0-412.41,0l-133.76,185.79Z" />
            <path
              className="group-hover:animate-pulse-fast"
              d="M208.88.1h171.7c33.97,6.37,18.05,38.22,18.05,38.22l-153.93,318.47h139.06c13.8,2.12,7.43,10.62,7.43,10.62L15.41,899.24c-7.04,9.96-13.8,6.37-15.39,0-1.59-6.37,88.64-351.35,88.64-351.35,0,0-50.9-.03-73.25-.03s-13.8-31.85-13.8-31.85c0,0,134.82-403.39,151.8-461.78C170.4-4.14,207.05.07,207.05.07l1.83.04Z"
            />
            <path d="M755.44,415.63c24.68-55.73,0-55.73,0-55.73h-296.17c-.8,35.83-22.29,58.12-22.29,58.12l-91.56,131.37h348.98s15.66,1.34,32.05-44.71c18.26-51.29,29-89.05,29-89.05Z" />
            <path d="M872.47,2.35s15.13.86,11.15,23.95l-47.77,148.09s-7.17,17.52-23.89,15.13h-414.01l66.01-134.89s8.76-30.51.53-52.28h407.98Z" />
          </g>
        </svg>
      </div>
    </div>
  );
};
