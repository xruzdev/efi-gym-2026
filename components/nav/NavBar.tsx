"use client";

import { EfiIcon, InstagramIcon } from "@/components/common/Icons";
import { useAppStore } from "@/lib/app-store";
import { links, NavLink } from "@/lib/data/nav-links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { LenisLink } from "../common/LenisLink";

const linkClass =
  "uppercase hover:text-efi-red text-white font-bold text-xs  transition-all duration-200 ";

export const NavBar = () => {
  const { preloaderComplete } = useAppStore();

  const pathname = usePathname();

  return (
    <nav
      style={{
        opacity: pathname === "/" ? (preloaderComplete ? 1 : 0) : 1,
        transition: "opacity 0.5s ease-in-out",
      }}
      className="px-6 md:px-10 lg:px-20 xl:px-40 w-full h-12 absolute top-8 flex items-center justify-center lg:justify-between z-100  "
    >
      <Link title="Home page" href="/" className="lg:z-100">
        <EfiIcon bgColor="white" color="black" size="80px" />
      </Link>

      <ul className="hidden lg:flex gap-4 items-center justify-center w-full  absolute left-0 ">
        {links.map(({ href, title, sublinks }) => (
          <li
            key={title}
            className={`${sublinks.length !== 0 && "group relative"}`}
          >
            <LenisLink title={title} href={href} className={linkClass}>
              {title}
            </LenisLink>
            {sublinks.length !== 0 && <SubMenu links={sublinks} />}
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex text-white  gap-4 z-100 mb-4 lg:mb-0 ">
        <Link
          href="https://www.instagram.com/gymefi/"
          target="_blank"
          title="Instagram"
          className={linkClass}
        >
          <InstagramIcon color="currentColor" size="1.2rem" />
        </Link>
        <Link
          href="https://wa.me/5492915049564"
          target="_blank"
          title="WhatsApp"
          className={linkClass}
        >
          <FaWhatsapp color="currentColor" size="1.2rem" />
        </Link>
      </div>
    </nav>
  );
};

const SubMenu = ({ links }: { links: NavLink[] }) => (
  <div className="invisible -translate-x-10  rounded-lg flex flex-col items-start justify-center gap-2  absolute top-full left-0 w-52 p-2  h-auto group-hover:visible  opacity-0 group-hover:translate-x-0  group-hover:opacity-100 transition-all duration-150 bg-[#ffffff5b]">
    {links.map(({ title, href }, i) => (
      <div key={title} className="flex flex-col gap-2 ">
        <LenisLink title={title} href={href} className={linkClass}>
          {title}
        </LenisLink>

        {i !== links.length - 1 && <hr className=" bg-white text-white w-48" />}
      </div>
    ))}
  </div>
);
