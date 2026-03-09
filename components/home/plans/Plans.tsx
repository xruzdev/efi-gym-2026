import { SectionHeader } from "@/components/common/SectionHeader";
import AnimatedCards from "./AnimatedCardsDesktop";
import AnimatedCardsMobile from "./AnimatedCardsMobile";
import Schedules from "./Schedules";

export const Plans = () => {
  return (
    <section
      id="plans"
      className="w-full min-h-140 overflow-hidden relative lg:pb-15"
    >
      <SectionHeader
        title="nuestros"
        resaltedTitle="planes"
        subtitle="Elegí el que mejor se adapte a ti"
      />

      <AnimatedCards />
      <AnimatedCardsMobile />
      <Schedules />
    </section>
  );
};

/**
 * 
 *  <div className="w-full flex border border-efi-red h-150">
          <div className="info w-1/2"></div>

          <div className="img  relative w-1/2 h-full">
            <div className="layer absolute top-0 left-0 w-60 h-full bg-linear-to-r from-neutral-950  to-transparent z-20"></div>
            <Image
              src="/musculacion.jpeg"
              alt="plan1"
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>
 */
