"use client";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import Copy from "../common/Copy";
import { SectionHeader } from "../common/SectionHeader";

export const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contactRef.current) return;

 
      gsap
        .timeline({
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          defaults: {
            duration: 2,
            ease: "power4.out",
          },
        })
        .to(".card", {
          x: 0,
        })
        .to(
          ".icon",
          {
            y: 0,
            stagger: 0.02,
            opacity: 1,
          },
          "<",
        );
    },
    {
      scope: contactRef,
    },
  );

  return (
    <section
      ref={contactRef}
      id="contact"
      className="w-full min-h-100 mt-8 md:mt-20 xl:mt-25 px-4 md:px-10 lg:px-4 xl:px-16 2xl:px-48 text-white overflow-x-hidden   "
    >
      <SectionHeader title="Ubicación y" resaltedTitle="Contacto" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Contact Info Card */}
        <div className=" -translate-x-250 card bg-zinc-900 border border-zinc-800 rounded  p-8 md:p-12 flex flex-col justify-center space-y-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-efi-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10">
            <Copy>
              <h3 className="text-3xl font-header mb-2 lg:text-4xl uppercase  tracking-wide">
                Visítanos
              </h3>
              <p className="text-zinc-400 font-text">
                Estamos ubicados sobre el paseo de la mujer. Veni a conocer
                nuestras instalaciones y comienza tu transformación hoy mismo.
              </p>
            </Copy>
          </div>

          <div className="space-y-6 relative z-10">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="icon opacity-0 translate-y-20 bg-efi-red/10 p-3 rounded-xl text-efi-red">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <Copy>
                  <h4 className="font-header tracking-wide text-lg lg:text-2xl uppercase">
                    Dirección
                  </h4>
                  <p className="text-zinc-400 font-text">
                    Jorge Waish 31, Bahía Blanca
                    <br />
                    Buenos Aires, CP 8000
                  </p>
                </Copy>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="icon opacity-0 translate-y-20 bg-efi-red/10 p-3 rounded-xl text-efi-red">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <Copy>
                  <h4 className="font-header tracking-wide text-lg lg:text-2xl  uppercase">
                    Teléfono
                  </h4>

                  <p className="text-zinc-400 font-text">+54 9 2915 04-9564</p>
                </Copy>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="icon opacity-0 translate-y-20 bg-efi-red/10 p-3 rounded-xl text-efi-red">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </div>
              <div>
                <Copy>
                  <h4 className="font-header tracking-wide text-lg lg:text-2xl  uppercase">
                    Correo Electrónico
                  </h4>

                  <p className="text-zinc-400 font-text">gimnasioefi@hotmail.com</p>
                </Copy>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-4">
              <div className="icon opacity-0 translate-y-20 bg-efi-red/10 p-3 rounded-xl text-efi-red">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <Copy>
                  <h4 className="font-header tracking-wide text-lg lg:text-2xl  uppercase">
                    Horarios
                  </h4>
                  <p className="text-zinc-400 font-text">
                    Lunes a Viernes: 07:00 - 22:00
                  </p>
                  <p className="text-zinc-400 font-text">
                    Sábados: 09:00 - 13:00
                  </p>
                </Copy>
              </div>
            </div>
          </div>
        </div>

        {/* Map Card */}
        <div className=" translate-x-250  card w-full grayscale brightness-90 min-h-100 lg:min-h-full rounded  overflow-hidden border border-zinc-800 shadow-xl relative">
          <iframe
           title="Mapa de google"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.7037310372675!2d-62.28903510000001!3d-38.7016492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbb2de788b265%3A0x61fb79f6c4fdddb7!2sGimnasio%20EFI!5e0!3m2!1ses!2sar!4v1772997676959!5m2!1ses!2sar"
            width="100%"
            height="100%"
            className="absolute inset-0"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
