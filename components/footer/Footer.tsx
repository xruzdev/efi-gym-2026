import Link from "next/link";
import { footerLinks } from "../../lib/data/footer-links";
import { LogoFlex } from "../common/LogoFlex";

export const Footer = () => {
  return (
    <footer className="w-full relative z-60 bg-zinc-950 border-t border-zinc-800 mt-8  pt-16 pb-8 px-4 md:px-10 lg:px-10 xl:px-16 2xl:px-48 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 ">
        {/* Brand Section */}
        <div className="lg:col-span-2 overflow-hidden flex flex-col  h-full">
          <svg
            id="Capa_1"
            data-name="Capa 1"
           
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 477.08 226.07"
            className="w-44 fill-efi-red"
          >
            <g id="E">
              <path
                d="M22.12,225.83h121.45s2.97-.59,5.14-4.35l12.46-37.78s.59-4.1-3.36-4.03-102.46,0-102.46,0l-33.23,46.16Z"
                
              />
              <path
                d="M51.9.03h42.66c8.44,1.58,4.48,9.49,4.48,9.49l-38.24,79.12h34.55c3.43.53,1.85,2.64,1.85,2.64L3.83,223.41c-1.75,2.47-3.43,1.58-3.82,0s22.02-87.29,22.02-87.29c0,0-12.65,0-18.2,0s-3.43-7.91-3.43-7.91c0,0,33.49-100.22,37.71-114.73S51.44.02,51.44.02h.46Z"
                
              />
              <path
                d="M187.68,103.26c6.13-13.85,0-13.85,0-13.85h-73.58c-.2,8.9-5.54,14.44-5.54,14.44l-22.75,32.64h86.7s3.89.33,7.96-11.11c4.54-12.74,7.2-22.12,7.2-22.12Z"
                
              />
              <path
                d="M216.76.58s3.76.21,2.77,5.95l-11.87,36.79s-1.78,4.35-5.93,3.76h-102.86l16.4-33.51s2.18-7.58.13-12.99h101.36Z"
                
              />
            </g>
            <path
              id="F"
              d="M277.09.6l118.68-.32s7.07.31,3.96,8.83l-11.7,33.22s-1.4,4.83-12.82,4.82h-83.88l-13.83,42.27h68.04s6.43-.48,2.77,9.89l-10.29,32.04s-1.77,4.63-6.26,5.35l-70.49-.2-25.3,79.11s-3.6,10.61-11.24,10.46-37.43-.04-37.43-.04c0,0-5.3.85-4.78-5.8L252.56,7.92s4.02-7.3,8.77-7.32,15.76,0,15.76,0"
              
            />
            <path
              id="I"
              d="M358.92,226.07h38.51s7.12.02,8.7-7.11L476.28,8.77s3.43-6.08-3.96-8.18h-38.87s-5.74,2.42-8.01,8.05l-69.96,211.18s-.77,5.25,3.43,6.26Z"
              
            />
          </svg>

          <p className="text-white font-text mt-4 max-w-sm leading-relaxed">
            Entrenamiento Funcional Integral
          </p>
  
        </div>

        {/* Links Sections */}
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h3 className="text-2xl md:text-3xl  uppercase font-header mb-6 tracking-wide">
              {section.title}
            </h3>
            <ul className="space-y-4">
              {section.links.map((link, linkIndex) => {
                const isExternal =
                  link.href.startsWith("http") ||
                  link.href.startsWith("mailto:") ||
                  link.href.startsWith("tel:");
                return (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className=" text-white font-text hover:text-efi-red transition-colors duration-300 text-sm  relative group inline-block"
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : ""}
                    >
                      {link.title}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-efi-red transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white font-text text-sm">
          &copy; {new Date().getFullYear()} EFI GYM. Todos los derechos
          reservados.
        </p>

        <LogoFlex />
      </div>
    </footer>
  );
};
