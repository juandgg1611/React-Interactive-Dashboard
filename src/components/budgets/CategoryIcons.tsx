import React from "react";
import {
  Hamburger,
  Bus,
  Plane,
  BookOpen,
  Dumbbell,
  Bone,
  Gem,
  Popcorn,
  Wifi,
  Car as CarIcon,
} from "lucide-react";

// Iconos SVG personalizados en color verde (tu paleta)
export const CategoryIcons = {
  // REEMPLAZADO: Hamburguesa de Lucide
  food: <Hamburger className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />,

  // REEMPLAZADO: Bus de Lucide
  transport: <Bus className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />,

  entertainment: (
    <Popcorn className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />
  ),

  shopping: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),

  utilities: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),

  health: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),

  // REEMPLAZADO: BookOpen de Lucide
  education: (
    <BookOpen className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />
  ),

  home: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),

  salary: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M8 12h8" />
    </svg>
  ),

  gift: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M7 7h10v5H7z" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>
  ),

  // REEMPLAZADO: Dumbbell de Lucide
  fitness: <Dumbbell className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />,

  // REEMPLAZADO: Plane de Lucide (para travel)
  travel: <Plane className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />,

  savings: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
    </svg>
  ),

  coffee: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <path d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  ),

  // REEMPLAZADO: Wifi de Lucide
  internet: <Wifi className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />,

  // REEMPLAZADO: Bone de Lucide
  pet: <Bone className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />,

  clothing: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.4a2 2 0 00-1.2-1H4.82a2 2 0 00-1.2 1l-2.66 6.55a2 2 0 002.66 1.8L5 11v9a2 2 0 002 2h10a2 2 0 002-2v-9l1.38.75a2 2 0 002.66-1.8z" />
      <path d="M12 1v3" />
    </svg>
  ),

  // REEMPLAZADO: Gem de Lucide
  beauty: <Gem className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />,

  subscription: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
      <path d="M9 9l12-2" />
    </svg>
  ),

  taxes: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      <path d="M3 3l18 18" />
    </svg>
  ),

  // REEMPLAZADO: CarIcon de Lucide (renombrado para evitar conflicto)
  car: <CarIcon className="w-6 h-6" stroke="#2E8B57" strokeWidth="1.5" />,

  investment: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
      <path d="M2 20h20" />
      <path d="M6 16l6-6 6-6" />
    </svg>
  ),

  insurance: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),

  other: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E8B57"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  ),
};

// Tipo para TypeScript
export type CategoryIconType = keyof typeof CategoryIcons;

// Función para obtener icono por nombre
export const getCategoryIcon = (iconName: CategoryIconType) => {
  return CategoryIcons[iconName] || CategoryIcons.other;
};

// Lista de nombres de iconos disponibles
export const iconNames = Object.keys(CategoryIcons) as CategoryIconType[];
