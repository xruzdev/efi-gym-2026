import { LenisLink } from "@/components/common/LenisLink";
import { SectionHeader } from "@/components/common/SectionHeader";
import { IoCaretDownCircleOutline } from "react-icons/io5";
import Card from "@/components/home/activities/Card";
import { activities } from "@/lib/data/activities.data";

export const Activities = () => {
  return (
    <section
      id="activities"
      className="w-full    flex  flex-col  justify-center items-center gap-4 xl:gap-12 mt-4  xl:mt-12"
    >
      <div className="w-full ">
        <SectionHeader
          title="Todo para tu"
          resaltedTitle="Entrenamiento"
          subtitle="Descubrí nuestras actividades diseñadas para potenciar tu rendimiento y bienestar integral."
        />
      </div>

      <div className="w-full mt-8  flex flex-col  justify-start items-start gap-4 md:gap-10 lg:gap-4 xl:gap-2  lg:flex-row   overflow-x-hidden">
        {activities.map((a, i) => (
          <Card index={i + 1} key={i} activity={a} />
        ))}
      </div>

      <div className="flex mt-8  justify-between items-center gap-4 group text-white uppercase group text-center font-bold rounded      px-3 py-1 lg:px-4 lg:py-2 active:scale-95 border hover:border-efi-red  transition-all duration-300">
        <LenisLink
          href="#plans"
          title="Planes y horarios"
          className="flex items-center gap-4"
        >
          <span className="text-sm">Ver Planes & Horarios</span>

          <IoCaretDownCircleOutline className="text-white text-5xl group-hover:text-efi-red transition-colors duration-300 cursor-pointer " />
        </LenisLink>
      </div>
    </section>
  );
};
