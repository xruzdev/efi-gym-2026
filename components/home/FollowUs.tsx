"use client";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import Copy from "../common/Copy";
import { useRef } from "react";

export const FollowUs = () => {
  const container = useRef<HTMLDivElement>(null),
  videoRef = useRef<HTMLVideoElement>(null);



  useGSAP(() => {
    if (!container.current) return;


    ScrollTrigger.create({
      trigger: container.current,
      start: "top 50%",
     
      animation: gsap.to("a > svg",{
        y: 0,
        opacity: 1,
        ease: "power4.out",
        delay: 1.5,
        duration: 1,
      }),
      onEnter: () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      },
    });

  }, [container]);



  return (
    <section
      ref={container}
      className=" h-[60vh]  lg:h-[75vh]  w-screen relative   md:mt-20 xl:mt-25 "
    >
      <div className="absolute top-0 w-full h-60 bg-linear-to-b from-neutral-950 to-transparent z-10" />
      <div className="absolute bottom-0 w-full h-60 bg-linear-to-t from-neutral-950 to-transparent z-10" />

      <div className="absolute  text-white px-4 md:px-10 lg:px-4 xl:px-16 2xl:px-48 inset-0 flex flex-col items-center justify-center z-20">
        <Copy delay={1.5}>
          <h2 className="text-5xl text-center font-header uppercase  tracking-wide   md:text-6xl lg:text-7xl ">
            Seguinos por instagram
          </h2>

          <p className="mt-2 text-center">Enterate de todas las novedades</p>
        </Copy>


        <Link
          href="https://www.instagram.com/gymefi/"
          target="_blank"
          title="Link a instagram"
          className="mt-4  overflow-hidden hover:text-efi-red transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <FaInstagram className="text-4xl translate-y-20" />
        </Link>
      </div>

      <video
        ref={videoRef}
        src="/follow-us.mp4"
        
        muted
        
        className="brightness-50 contrast-105 grayscale w-full h-full object-cover -z-10"
      ></video>
    </section>
  );
};
