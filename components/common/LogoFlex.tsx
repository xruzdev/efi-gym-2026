"use client";
import { gsap, useGSAP } from "@/lib/gsap";
import { horizontalLoop } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Oswald } from "next/font/google";
import { useRef } from "react";
import { FaAsterisk } from "react-icons/fa";

 const oswald = Oswald({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-efi",
  });

export const LogoFlex = () => {
  const containerRef = useRef<HTMLAnchorElement>(null),
    tlRef = useRef<gsap.core.Timeline>(null);

 

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = gsap.utils.toArray<HTMLElement>(".marquee .item");

      tlRef.current = horizontalLoop(items, {
        repeat: -1,
        paddingRight: "4px",
        speed: 0.3,
      });
    },
    {
      scope: containerRef,
    },
  );

  return (
    <Link
      ref={containerRef}
      target="_blank"
      href="https://www.flexmkt.com.ar"
      className={`flex items-center gap-4 text-white group  border border-white/10 py-3 px-4 roundsed ${oswald.className}`}
    >
      <Image
        src="/logoflex.webp"
        width={36}
        height={36}
        alt="Flex MKT Agency Logo"
        className="group-hover:rotate-y-360 transition-transform duration-500 ease-out "
      />

      <div className="marquee flex items-center  gap-1 overflow-hidden whitespace-nowrap w-50 relative">
        <div className="layer absolute w-5   h-full bg-linear-to-r z-10 from-black to-transparent"></div>
        <div className="layer absolute w-5   h-full bg-linear-to-l right-0 z-10 from-black to-transparent"></div>
        <span className="item">FLEX</span>
        <span className="item">MKT</span>
        <span className="item">AGENCY</span>
        <span className="item">
          <FaAsterisk color="white" className="  size-3" />
        </span>
        <span className="item">SOMOS</span>
        <span className="item">TU</span>
        <span className="item">DEPARTAMENTO</span>
        <span className="item">DE</span>
        <span className="item">MARKETING</span>
        <span className="item">
          <FaAsterisk color="white" className="  size-3" />
        </span>
      </div>
    </Link>
  );
};
