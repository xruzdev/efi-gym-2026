"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
// Importa tu store si lo usas, aquí asumo la estructura de tu snippet

export const TransitionWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Reemplaza esto con tu store si quieres mantener el estado global
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slideInOut = useCallback(() => {
    // 1. Animación de salida (La página actual se desvanece y sube un poco)
    document.documentElement.animate(
      [
        { opacity: 1,   },
        { opacity: 0,  },
      ],
      {
        duration: 1000, // Una duración más rápida suele sentirse mejor para fade
        easing: "ease-in-out",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    // 2. Animación de entrada (La nueva página aparece desde abajo)
    document.documentElement.animate(
      [
        { opacity: 0,  },
        { opacity: 1,   },
      ],
      {
        duration:1000,
        easing: "ease-out",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, []);

  const handleRouteChange = useCallback(
    async (url: string) => {
      setIsTransitioning(true);

      if (!document.startViewTransition) {
        router.push(url);
        setIsTransitioning(false);
        return;
      }

      const transition = document.startViewTransition(async () => {
        router.push(url);
        // Pequeño retardo para que Next.js actualice el DOM
        await new Promise((resolve) => setTimeout(resolve, 50));
      });

      transition.ready.then(() => {
        slideInOut();
      });

      transition.finished.finally(() => {
        setIsTransitioning(false);
      });
    },
    [router, slideInOut]
  );

  const onAnchorClick = useCallback(
    (e: MouseEvent) => {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      const target = e.currentTarget as HTMLAnchorElement;

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || target.target === "_blank") {
        return;
      }

      const href = target.href;
      const urlObj = new URL(href);
      const targetPathname = urlObj.pathname;
      const targetDestination = urlObj.pathname + urlObj.search + urlObj.hash;

      // Si nos estamos moviendo dentro de la misma página (ej. anchor link), 
      // dejamos que el comportamiento por defecto o Lenis se hagan cargo.
      if (targetPathname === pathname) {
        return;
      }

      // Prevenimos la navegación normal SOLO cuando cambiamos de página
      e.preventDefault();
      handleRouteChange(targetDestination);
    },
    [pathname, handleRouteChange, isTransitioning]
  );

  useEffect(() => {
    const links = Array.from(document.querySelectorAll('a[href^="/"]')) as HTMLAnchorElement[];

    links.forEach((link) => {
      link.addEventListener("click", onAnchorClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", onAnchorClick);
      });
    };
  }, [pathname, onAnchorClick]);

  return (
    <div ref={contentRef} className="relative">
      {children}
    </div>
  );
};