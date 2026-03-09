import { SectionHeader } from "@/components/common/SectionHeader";
import { services } from "@/lib/data/services";
import { Card } from "./Card";

export const Servicios = () => {
  return (
    <section id="services" className="w-full relative  ">
      <SectionHeader
        title="Más que un"
        resaltedTitle="Gimnasio"
        subtitle="Además de nuestras instalaciones, ofrecemos servicios de kinesiología y nutrición para un enfoque integral de tu bienestar."
      />

      <div className="flex flex-col  items-center relative  gap-4 md:gap-10  2xl:gap-20  mt-10  w-full overflow-x-hidden lg:overflow-x-visible ">
        {services.map((service, index) => (
          <Card
            key={index}
            title={service.title}
            text={service.text}
            profesional={service.profesional}
            images={service.images}
          />
        ))}
      </div>
    </section>
  );
};

/**
 * 
 * <div className="flex flex-col lg:flex-row  relative  gap-4 md:gap-10 lg:gap-4 xl:gap-14 2xl:gap-36   mt-10  w-full  ">
        {services.map((service, index) => (
          <Card
            key={index}
            title={service.title}
            text={service.text}
            profesional={service.profesional}
            images={service.images}
          />
        ))}
      <svg
        viewBox="0 0 449.87 1012.35"
        xmlns="http://www.w3.org/2000/svg"
        height={200}
        width={200}
        className="     will-change-transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 "
      >
        <path
          d="M99.12,612.58s-56.22-.03-81.9-.03-15.43-35.61-15.43-35.61c0,0,150.74-451.02,169.73-516.3C190.52-4.63,231.5.07,231.5.07l2.05.04h191.97c37.98,7.12,20.18,42.73,20.18,42.73l-172.1,356.07h155.48c15.43,2.37,8.31,11.87,8.31,11.87L17.23,1005.42c-7.87,11.14-15.43,7.12-17.21,0-1.78-7.12,99.1-392.84,99.1-392.84Z"
          fill="#fff"
        />
      </svg>
      </div>
 */
