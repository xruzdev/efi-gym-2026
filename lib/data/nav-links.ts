export interface NavLink {
  href: string;
  title: string;
  sublinks: NavLink[];
}

export const links: NavLink[] = [
  {
    href: "/",
    title: "Home",
    sublinks: [],
  },
  {
    href: "/#facilities",
    title: "Instalaciones",
    sublinks: [],
  },
  {
    href: "/#services",
    title: "Servicios",

    sublinks: [
      {
        href: "/#activities",
        title: "Actividades",

        sublinks: [],
      },
      {
        href: "/#kinesiology",
        title: "Área Kinesiología",

        sublinks: [],
      },
      {
        href: "/#nutricion",
        title: "Área Nutricional",

        sublinks: [],
      },
    ],
  },

  {
    href: "/capacitaciones",
    title: "Capacitaciones",
    sublinks: [],
  },

  {
    href: "/quienes-somos",
    title: "Quienes Somos",
    sublinks: [],
  },
  {
    href: "/#contact",
    title: "Ubicación y Contacto",
    sublinks: [],
  },
];
