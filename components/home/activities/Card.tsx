"use client";
import { gsap, useGSAP } from "@/lib/gsap";
import { Activity } from "@/lib/interfaces/activity.interface";
import Image from "next/image";
import { useRef } from "react";

interface props {
  activity: Activity;
  index: number;
}

const Card = ({ activity, index }: props) => {
  const { src, title, icon, text } = activity;

  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    // Detectamos si es un elemento par o impar en el DOM
    const isEven = element.matches(":nth-child(even)");

    const mm = gsap.matchMedia();

    mm.add("(max-width: 1024px)", () => {
      gsap.fromTo(
        element,
        {
          xPercent: isEven ? -100 : 100,
        },
        {
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
          xPercent: 0,
          duration: 0.5,
          delay: 0,
        },
      );
    });

    mm.add("(min-width: 1024px)", () => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
        clipPath: index === 4 ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,

        delay: index * 0.1,
      });
    });
  });

  return (
    <div
      ref={cardRef}
      
      className="card group h-30 hover:h-90 md:hover:h-150 w-full grayscale hover:grayscale-0 lg:[clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)] 
      md:h-50 bg-slate-600 rounded overflow-hidden duration-1000 ease-out relative lg:w-auto lg:flex-1 lg:h-150 lg:hover:h-150 lg:hover:flex-4 2xl:h-175 2xl:hover:h-175"
    >
      <Image
        src={src}
        fill
        alt={`Imagen de la actividad ${title}`}
        className="absolute top-0 left-0 object-cover object-center  brightness-50  group-hover:brightness-80 "
      />

      <div className="  w-full h-full  absolute top-0 left-0 flex flex-col justify-end items-center text-white lg:pb-8 ">
        <div className=" my-auto  md:mb-4 lg:mb-0 translate-y-0  group-hover:-translate-y-500 transition-transform duration-1000 ease-in-out">
          {icon}
        </div>

        <div
          className={`   absolute bottom-8 text-center  flex flex-col justify-center items-center px-4`}
        >
          <h3 className="text-4xl  font-header   uppercase tracking-wide translate-y-200  group-hover:translate-y-0 transition-transform duration-500 group-hover:delay-400  ease-in-out">
            {title}
          </h3>

          <p className="text-sm  mt-4   leading-relaxed mb-7 opacity-0 group-hover:opacity-100 -translate-x-28 group-hover:translate-x-0 transition-all group-hover:delay-800 group-hover:duration-350 ease-in-out">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;

/**
 * 
 * <div
      className={` group  w-full md:w-1/2 xl:w-[5rem] xl:hover:w-1/5  rounded-lg relative h-[30rem] transition-all delay-75`}
    >
      <Image
        fill
        src={src}
        alt="image"
        className="w-full object-cover brightness-50 rounded-lg transition-all delay-75"
      />
      <div className=" rounded-lg overflow-hidden mb-10 relative h-full py-12">
        <div className="text-center flex flex-col h-full justify-between items-center">
          <h3
            className={` font-semibold block absolute bottom-0 group-hover:opacity-0 bg-[#0000008f] w-full group-hover:-translate-x-28 transition-all 
              delay-75 uppercase text-dark  text-lg py-4 text-gray-300 italic`}
          >
            {icon}
          </h3>
          <h3
            className=" font-semibold opacity-0 group-hover:opacity-100 translate-x-28 group-hover:translate-x-0 transition-all delay-75 uppercase

                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        text-custom-red-1
                        block"
          >
            {title}
          </h3>
          <p className="text-base text-gray-300 leading-relaxed mb-7 opacity-0 group-hover:opacity-100 -translate-x-28 group-hover:translate-x-0 transition-all delay-75">
            {text}
          </p>
        </div>
      </div>
    </div>
 */
