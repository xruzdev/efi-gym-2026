import {
  carousel1,
  carousel2,
  carousel3,
  carousel4,
} from "@/lib/data/hero-carousel";
import Slider from "./Slider";

export const Background = () => {
  return (
    <div className="absolute top-0 flex  left-0 w-screen h-full brightness-50">
      <div
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        }}
        className="slider-item w-full h-full md:w-1/2  lg:w-1/3 xl:w-1/4 md:h-full"
      >
        <Slider images={carousel1} delay={6} />
      </div>
      <div
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        }}
        className="slider-item hidden md:block md:w-1/2  lg:w-1/3 xl:w-1/4 md:h-full"
      >
        <Slider images={carousel2} delay={2} />
      </div>
      <div
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        }}
        className="slider-item hidden lg:block  lg:w-1/3 xl:w-1/4 h-full"
      >
        <Slider images={carousel3} delay={5} />
      </div>
      <div
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        }}
        className="slider-item hidden xl:block xl:w-1/4 h-full"
      >
        <Slider images={carousel4} delay={3} />
      </div>
    </div>
  );
};
