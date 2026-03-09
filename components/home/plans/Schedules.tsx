"use client";

import { useLenis } from "lenis/react";
import { useState, useEffect, Fragment } from "react";
import { FaTimes, FaCalendarAlt, FaClock } from "react-icons/fa";

const legends = [
  { name: "FUNCIONAL", color: "bg-red-600" },
  { name: "ZUMBA", color: "bg-green-500" },
  { name: "CROSS", color: "bg-purple-600" },
  { name: "GAP", color: "bg-yellow-500" },
  { name: "CARDIO", color: "bg-blue-500" },
  { name: "STRETCHING", color: "bg-orange-500" },
];

const scheduleData = [
  {
    time: "8AM",
    days: [
      "bg-purple-600",
      "bg-purple-600",
      "bg-purple-600",
      "bg-purple-600",
      "bg-purple-600",
    ],
  },
  {
    time: "9AM",
    days: [
      "bg-red-600",
      "bg-red-600",
      "bg-yellow-500",
      "bg-red-600",
      "bg-blue-500",
    ],
  },
  {
    time: "10AM",
    days: [
      "bg-purple-600",
      "bg-gradient-to-r from-purple-600 from-50% to-orange-500 to-50%",
      "bg-purple-600",
      "bg-gradient-to-r from-purple-600 from-50% to-orange-500 to-50%",
      "bg-purple-600",
    ],
  },
  {
    time: "17PM",
    days: [
      "bg-red-600",
      "bg-red-600",
      "bg-yellow-500",
      "bg-red-600",
      "bg-blue-500",
    ],
  },
  {
    time: "18PM",
    days: [
      "bg-purple-600",
      "bg-purple-600",
      "bg-purple-600",
      "bg-purple-600",
      "bg-purple-600",
    ],
  },
  {
    time: "19PM",
    days: [
      "bg-red-600",
      "bg-red-600",
      "bg-yellow-500",
      "bg-red-600",
      "bg-blue-500",
    ],
  },
  {
    time: "20PM",
    days: [
      "bg-green-500",
      "bg-orange-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-green-500",
    ],
  },
];

const daysHeaders = ["LUN", "MAR", "MIE", "JUE", "VIE"];

export default function Schedules() {
  const [isOpen, setIsOpen] = useState(false);

  const lenis = useLenis();

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isOpen, lenis]);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        title="ver horarios"
        className="lg:absolute  cursor-pointer mx-auto lg:bottom-20 lg:left-10 lg:translate-x-0 z-40 flex items-center gap-2 px-6 py-3 pb-4 bg-efi-red text-white font-header uppercase tracking-wider text-xl rounded-full shadow-lg shadow-efi-red/30 hover:scale-105 hover:bg-red-700 transition-all duration-300"
      >
        <FaCalendarAlt className="text-xl" />
        Ver Horarios
      </button>
      {/* Modal Overlay */}(
      <div
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.5s ease-in-out",
        }}
        className=" fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        {/* Modal Content */}
        <div
          className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del Modal */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-800 bg-neutral-900/50">
            <div>
              <h2 className="text-3xl sm:text-4xl font-header uppercase text-white tracking-wide leading-none">
                Horarios
              </h2>
              <p className="text-efi-red font-medium text-sm sm:text-base mt-1">
                Grupales y Generales
              </p>
            </div>
            <button
              title="cerrar ventana"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors p-2 cursor-pointer"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Contenido scrolleable del Modal */}
          <div
            className="p-5 sm:p-6 overflow-y-auto  custom-scrollbar overscroll-contain"
            data-lenis-prevent="true"
          >
            {/* Horarios Generales */}
            <div className="mb-8 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
              <div className="flex items-center gap-3 mb-3 text-white">
                <FaClock className="text-efi-red text-xl" />
                <h3 className="font-header text-xl sm:text-2xl uppercase tracking-wide">
                  Horarios del Gimnasio
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-neutral-300">
                <div className="flex items-center gap-2 p-3 bg-black/40 rounded-lg">
                  <span className="font-bold text-white">Lunes a Viernes:</span>
                  <span>7:00 a 22:00 HS.</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-black/40 rounded-lg">
                  <span className="font-bold text-white">Sábados:</span>
                  <span>9:00 a 13:00 HS.</span>
                </div>
              </div>
            </div>

            {/* Clases Grupales - Grilla */}
            <div className="mb-6">
              <h3 className="font-header text-2xl uppercase text-white mb-4 text-center">
                Clases Grupales
              </h3>

              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 overflow-hidden">
                <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] gap-x-2 gap-y-3 sm:gap-4 w-full">
                  {/* Headers Días */}
                  <div></div> {/* Espacio vacío esquina superior izquierda */}
                  {daysHeaders.map((day) => (
                    <div
                      key={day}
                      className="text-center font-header text-sm sm:text-lg text-white uppercase"
                    >
                      {day}
                    </div>
                  ))}
                  {/* Filas de la grilla */}
                  {scheduleData.map((row, i) => (
                    <Fragment key={i}>
                      {/* Horario */}
                      <div className="flex items-center justify-end pr-2 font-bold text-xs sm:text-base text-neutral-300">
                        <span
                          className={`px-2 py-1 rounded bg-black/50 ${["8AM", "9AM", "10AM"].includes(row.time) ? "text-efi-red" : "text-blue-400"}`}
                        >
                          {row.time}
                        </span>
                      </div>

                      {/* Celdas (días) */}
                      {row.days.map((bg, j) => (
                        <div
                          key={j}
                          className="flex justify-center items-center"
                        >
                          <div
                            className={`w-8 h-8 sm:w-12 sm:h-12 rounded-sm sm:rounded-md shadow-md shadow-black/50 ${bg} hover:scale-110 transition-transform cursor-pointer`}
                          ></div>
                        </div>
                      ))}

                      {/* Separador visual después horario de mañana */}
                      {i === 2 && (
                        <div className="col-span-6 flex justify-center my-1 sm:my-2">
                          <div className="h-px w-full bg-neutral-700/50"></div>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Leyenda de Colores */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {legends.map((legend, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded bg-neutral-900/50 border border-neutral-800/50"
                >
                  <div
                    className={`w-4 h-4 rounded-sm shadow-sm ${legend.color}`}
                  ></div>
                  <span className="text-xs sm:text-sm font-bold text-neutral-300 uppercase tracking-wide">
                    {legend.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
}
