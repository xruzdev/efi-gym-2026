"use client";

import { useRef } from "react";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={preloaderRef}
      className="preloader absolute inset-0 h-dvh md:h-screen w-screen z-100  bg-neutral-950  flex flex-col gap-0 items-center justify-center"
    >
      <svg
        id="Capa_1"
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 477.08 226.07"
        className="efi-icon w-36 h-16  md:w-48 md:h-24 overflow-hidden   translate-y-10"
      >
        <g className="translate-y-[105%] will-change-transform" id="E">
          <path
            d="M22.12,225.83h121.45s2.97-.59,5.14-4.35l12.46-37.78s.59-4.1-3.36-4.03-102.46,0-102.46,0l-33.23,46.16Z"
            fill="#e51734"
          />
          <path
            d="M51.9.03h42.66c8.44,1.58,4.48,9.49,4.48,9.49l-38.24,79.12h34.55c3.43.53,1.85,2.64,1.85,2.64L3.83,223.41c-1.75,2.47-3.43,1.58-3.82,0s22.02-87.29,22.02-87.29c0,0-12.65,0-18.2,0s-3.43-7.91-3.43-7.91c0,0,33.49-100.22,37.71-114.73S51.44.02,51.44.02h.46Z"
            fill="#e51734"
            className=" will-change-transform animate-pulse-fast "
          />
          <path
            d="M187.68,103.26c6.13-13.85,0-13.85,0-13.85h-73.58c-.2,8.9-5.54,14.44-5.54,14.44l-22.75,32.64h86.7s3.89.33,7.96-11.11c4.54-12.74,7.2-22.12,7.2-22.12Z"
            fill="#e51734"
          />
          <path
            d="M216.76.58s3.76.21,2.77,5.95l-11.87,36.79s-1.78,4.35-5.93,3.76h-102.86l16.4-33.51s2.18-7.58.13-12.99h101.36Z"
            fill="#e51734"
          />
        </g>

        <path
          className="translate-y-[105%]"
          id="F"
          d="M277.09.6l118.68-.32s7.07.31,3.96,8.83l-11.7,33.22s-1.4,4.83-12.82,4.82h-83.88l-13.83,42.27h68.04s6.43-.48,2.77,9.89l-10.29,32.04s-1.77,4.63-6.26,5.35l-70.49-.2-25.3,79.11s-3.6,10.61-11.24,10.46-37.43-.04-37.43-.04c0,0-5.3.85-4.78-5.8L252.56,7.92s4.02-7.3,8.77-7.32,15.76,0,15.76,0"
          fill="#e51734"
        />
        <path
          className="translate-y-[105%]"
          id="I"
          d="M358.92,226.07h38.51s7.12.02,8.7-7.11L476.28,8.77s3.43-6.08-3.96-8.18h-38.87s-5.74,2.42-8.01,8.05l-69.96,211.18s-.77,5.25,3.43,6.26Z"
          fill="#e51734"
        />
      </svg>
     
        <p
          className="text-white   overflow-hidden uppercase translate-y-full flex items-center justify-center gap-2 text-center font-header text-3xl md:text-4xl"
          id="preloader-title"
        >
          <span className="block translate-y-full">Entrenamiento</span>
          <span className="block translate-y-full">Físico</span>
          <span className="block translate-y-full">Integral</span>

        </p>
    
    </div>
  );
}
