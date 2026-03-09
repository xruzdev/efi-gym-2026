import {
  CardioIcon,
  CrossIcon,
  DanceIcon,
  FitnessIcon,
  FunctionalIcon,
  GapIcon,
  StretchingIcon,
} from "@/components/common/Icons";
import { Activity } from "../interfaces/activity.interface";

export const activities: Activity[] = [
  {
    src: "https://res.cloudinary.com/dqbpjov4y/image/upload/f_auto,q_auto/v1723823296/funcional_ims5lz.jpg",
    title: "Funcional",
    text: "Entrenamiento dinámico, multiarticular, que trabaja fuerza, resistencia, coordinación y movilidad. Ideal para mejorar el rendimiento general y moverte mejor en el día a día.",
    icon: <FunctionalIcon color="white" size="60px" />,
  },
  {
    src: "https://res.cloudinary.com/dqbpjov4y/image/upload/f_auto,q_auto/v1723823302/gap_xjqozm.jpg",
    title: "GAP",
    text: "Clase enfocada en glúteos, abdominales y piernas. Trabajo localizado, intenso y efectivo para fortalecer y tonificar el tren inferior.",
    icon: <GapIcon color="white" size="60px" />,
  },
  {
    src: "https://res.cloudinary.com/dqbpjov4y/image/upload/f_auto,q_auto/v1723823298/cardio_oib3gr.jpg",
    title: "Cardio",
    text: "Entrenamiento orientado a mejorar la capacidad cardiovascular y la resistencia. Clases activas, continuas y adaptables a todos los niveles.",
    icon: <CardioIcon color="white" size="60px" />,
  },
  {
    src: "/efi-cross-2.webp",
    title: "EFI Cross",
    text: "Un sistema de entrenamiento que fusiona funcional y cross training, diseñado para quienes buscan un mayor desafío físico y el desarrollo integral de la condición física.",
    icon: <CrossIcon color="white" size="60px" />,
  },
  {
    src: "https://res.cloudinary.com/dqbpjov4y/image/upload/f_auto,q_auto/v1723823301/zumba_bgnfik.jpg",
    title: "Zumba",
    text: "Entrenamiento cardiovascular al ritmo de la música. Divertido, dinámico y efectivo para quemar calorías mientras entrenás y la pasás bien.",
    icon: <DanceIcon color="white" size="60px" />,
  },
  {
    src: "/streching.webp",
    title: "Stretching",
    text: "Clase enfocada en mejorar la movilidad, la flexibilidad y la relajación muscular. Ideal para complementar el entrenamiento, prevenir lesiones y favorecer la recuperación.",
    icon: <StretchingIcon color="white" size="60px" />,
  },
  {
    src: "/musculacion.webp",
    title: "Sala de Musculación",
    text: "Área de entrenamiento de más de 200 m², equipada con más de 15 máquinas y amplio peso libre. Contás con la predisposición de nuestros profes para entrenar en base a tus objetivos y llevar tu entrenamiento a otro nivel.",
    icon: <FitnessIcon color="white" size="60px" />,
  },
];
