import { Activities } from "@/components/home/activities/Activities";
import { Contact } from "@/components/home/Contact";
import { FollowUs } from "@/components/home/FollowUs";
import { Hero } from "@/components/home/hero/Hero";
import { Instalaciones } from "@/components/home/instalaciones/Instalaciones";
import { Plans } from "@/components/home/plans/Plans";
import { Servicios } from "@/components/home/servicios/Servicios";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="space-x-wrapper px-4 md:px-10 lg:px-4 xl:px-16 2xl:px-48 flex flex-col gap-8  md:gap-20 xl:gap-25 ">
        <Activities />

        <Instalaciones />

        <Servicios />

        <Plans />
      </div>

      <FollowUs />
      <Contact />
    </>
  );
}
