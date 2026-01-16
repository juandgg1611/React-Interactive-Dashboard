import {
  Home,
  CreditCard,
  TrendingUp,
  Target,
  BarChart,
  Settings,
  HelpCircle,
  Brain,
  Award,
  Download,
  Sparkles,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Star,
  Zap,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  FileText,
  Video,
  Bell,
  BookOpen,
  Filter,
  Search as SearchIcon,
  Activity,
  Code,
} from "lucide-react";

// ==================== TIPOS ====================
export interface Module {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  guideCount: number;
  videoCount: number;
  progress: number;
  isNew?: boolean;
  tags: string[];
}

export interface UserProgress {
  level: string;
  points: number;
  tutorialsCompleted: number;
  totalTutorials: number;
  helpSessions: number;
  streak: number;
  nextLevelPoints: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  unlockedDate?: string;
  points: number;
  category: "learning" | "productivity" | "expertise";
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: any;
  helpfulCount: number;
  lastUpdated: string;
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  relatedModules: string[];
  tags: string[];
}

export interface Tutorial {
  id: number;
  title: string;
  description: string;
  icon: any;
  duration: string;
  durationMinutes: number;
  completed: boolean;
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  type: "video" | "guide" | "interactive";
  points: number;
  tags: string[];
  module: string;
  steps: number;
  thumbnailUrl?: string;
  publishedDate: string;
  instructor?: string;
  rating: number;
  reviewCount: number;
}

export interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  buttonText: string;
  status: "online" | "offline" | "busy";
  responseTime: string;
  available: boolean;
  priority: "high" | "medium" | "low";
}

export interface HelpCategory {
  id: string;
  name: string;
  icon: any;
  count: number;
  color: string;
  description: string;
}

export interface QuickLink {
  id: string;
  label: string;
  icon: any;
  url: string;
  description: string;
  isExternal?: boolean;
}

export interface SearchSuggestion {
  id: string;
  query: string;
  category: string;
  icon: any;
  popularity: number;
}

// ==================== DATOS ====================

// Módulos de la aplicación
export const MODULES: Module[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Vista general y métricas principales",
    icon: Home,
    color: "#61bc84",
    guideCount: 8,
    videoCount: 5,
    progress: 85,
    isNew: false,
    tags: ["métricas", "personalización", "widgets"],
  },
  {
    id: "transactions",
    name: "Transacciones",
    description: "Gestión y categorización de gastos",
    icon: CreditCard,
    color: "#8FBC8F",
    guideCount: 12,
    videoCount: 7,
    progress: 60,
    isNew: true,
    tags: ["categorización", "importación", "automatización"],
  },
  {
    id: "budgets",
    name: "Presupuestos",
    description: "Creación y seguimiento de presupuestos",
    icon: TrendingUp,
    color: "#2E8B57",
    guideCount: 10,
    videoCount: 6,
    progress: 45,
    isNew: false,
    tags: ["planificación", "alertas", "ajuste"],
  },
  {
    id: "goals",
    name: "Mis Metas",
    description: "Establecimiento y monitoreo de objetivos",
    icon: Target,
    color: "#345e37",
    guideCount: 9,
    videoCount: 4,
    progress: 30,
    isNew: true,
    tags: ["ahorro", "inversión", "progreso"],
  },
  {
    id: "analytics",
    name: "Analítica",
    description: "Análisis avanzado e informes",
    icon: BarChart,
    color: "#c6ffe6",
    guideCount: 15,
    videoCount: 8,
    progress: 20,
    isNew: false,
    tags: ["IA", "predicciones", "tendencias"],
  },
  {
    id: "settings",
    name: "Configuración",
    description: "Personalización y preferencias",
    icon: Settings,
    color: "#e0e0e0",
    guideCount: 6,
    videoCount: 3,
    progress: 75,
    isNew: false,
    tags: ["cuenta", "seguridad", "preferencias"],
  },
];

// Progreso del usuario
export const USER_PROGRESS: UserProgress = {
  level: "Intermedio",
  points: 150,
  tutorialsCompleted: 3,
  totalTutorials: 8,
  helpSessions: 12,
  streak: 7,
  nextLevelPoints: 200,
  achievements: [
    {
      id: "beginner",
      title: "Primeros Pasos",
      description: "Completa tu primer tutorial",
      icon: Award,
      unlocked: true,
      unlockedDate: "2024-01-10",
      points: 25,
      category: "learning",
    },
    {
      id: "streak_7",
      title: "Constancia",
      description: "7 días consecutivos usando la ayuda",
      icon: Zap,
      unlocked: true,
      unlockedDate: "2024-01-16",
      points: 50,
      category: "productivity",
    },
    {
      id: "expert_ai",
      title: "Experto en IA",
      description: "Completa 5 tutoriales de analítica",
      icon: Brain,
      unlocked: false,
      points: 75,
      category: "expertise",
    },
    {
      id: "helper",
      title: "Ayudante",
      description: "Marca 10 preguntas como útiles",
      icon: Users,
      unlocked: false,
      points: 30,
      category: "productivity",
    },
  ],
};

// Preguntas frecuentes
export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "¿Cómo funciona la IA en la sección de Analítica?",
    answer:
      "Nuestra IA utiliza algoritmos de aprendizaje automático (Prophet y LSTM) para analizar tus patrones de gasto histórico. Genera pronósticos personalizados con hasta 92% de precisión, detecta anomalías en tus transacciones y ofrece recomendaciones inteligentes basadas en tu comportamiento financiero único.",
    category: "analytics",
    icon: Brain,
    helpfulCount: 245,
    lastUpdated: "2024-01-15",
    difficulty: "Intermedio",
    relatedModules: ["analytics", "dashboard"],
    tags: ["IA", "predicciones", "aprendizaje automático"],
  },
  {
    id: 2,
    question: "¿Mis datos financieros están seguros y protegidos?",
    answer:
      "Absolutamente. Utilizamos encriptación de extremo a extremo (AES-256) para todos tus datos. No compartimos información con terceros y cumplimos con las normativas GDPR y CCPA. Tu información bancaria nunca se almacena en nuestros servidores - utilizamos conexiones seguras de solo lectura a través de API encriptadas.",
    category: "security",
    icon: Shield,
    helpfulCount: 189,
    lastUpdated: "2024-01-10",
    difficulty: "Fácil",
    relatedModules: ["settings", "dashboard"],
    tags: ["seguridad", "privacidad", "encriptación"],
  },
  {
    id: 3,
    question: "¿Puedo exportar mis datos para usar en otras aplicaciones?",
    answer:
      "Sí, puedes exportar tus datos en múltiples formatos: CSV para hojas de cálculo, Excel para análisis avanzado, PDF para reportes formales, y JSON para integraciones técnicas. Además, ofrecemos sincronización automática con Google Sheets y la posibilidad de programar exportaciones recurrentes.",
    category: "export",
    icon: Download,
    helpfulCount: 156,
    lastUpdated: "2024-01-08",
    difficulty: "Fácil",
    relatedModules: ["settings", "transactions"],
    tags: ["exportación", "datos", "integración"],
  },
  {
    id: 4,
    question: "¿Cómo se categorizan automáticamente mis transacciones?",
    answer:
      "Usamos un sistema de IA que analiza descripciones, montos, fechas y patrones recurrentes. El sistema aprende de tus categorizaciones manuales y se vuelve más preciso con el tiempo. Puedes entrenar la IA marcando transacciones mal categorizadas, y el sistema aplicará ese aprendizaje a futuras transacciones similares.",
    category: "transactions",
    icon: CreditCard,
    helpfulCount: 198,
    lastUpdated: "2024-01-12",
    difficulty: "Intermedio",
    relatedModules: ["transactions", "budgets"],
    tags: ["categorización", "IA", "automatización"],
  },
  {
    id: 5,
    question:
      "¿Qué diferencia a los presupuestos inteligentes de los normales?",
    answer:
      "Nuestros presupuestos inteligentes utilizan IA para: 1) Ajustarse automáticamente según tus ingresos variables, 2) Predecir gastos estacionales, 3) Sugerir límites realistas basados en tu historial, 4) Alertar sobre desviaciones antes de que ocurran, y 5) Recomendar ajustes basados en tus metas de ahorro.",
    category: "budgets",
    icon: TrendingUp,
    helpfulCount: 167,
    lastUpdated: "2024-01-05",
    difficulty: "Intermedio",
    relatedModules: ["budgets", "goals"],
    tags: ["presupuestos", "IA", "planificación"],
  },
  {
    id: 6,
    question: "¿Cómo funciona el sistema de metas de ahorro con IA?",
    answer:
      "La IA analiza tu capacidad de ahorro, ingresos recurrentes y gastos variables para sugerir metas alcanzables. Luego, crea un plan personalizado que incluye: aportes automáticos, ajustes dinámicos según tu desempeño, alertas de progreso y sugerencias para acelerar el logro de tus objetivos.",
    category: "goals",
    icon: Target,
    helpfulCount: 134,
    lastUpdated: "2024-01-03",
    difficulty: "Intermedio",
    relatedModules: ["goals", "analytics"],
    tags: ["metas", "ahorro", "planificación"],
  },
  {
    id: 7,
    question: "¿Puedo personalizar completamente mi Dashboard?",
    answer:
      "Totalmente. Puedes: 1) Arrastrar y soltar widgets, 2) Elegir entre 15 métricas diferentes, 3) Crear vistas personalizadas por categoría, 4) Programar actualizaciones automáticas, 5) Configurar alertas visuales, y 6) Guardar múltiples layouts para diferentes necesidades.",
    category: "dashboard",
    icon: Home,
    helpfulCount: 178,
    lastUpdated: "2024-01-07",
    difficulty: "Fácil",
    relatedModules: ["dashboard", "settings"],
    tags: ["personalización", "widgets", "dashboard"],
  },
  {
    id: 8,
    question: "¿Qué tipo de alertas predictivas ofrece el sistema?",
    answer:
      "Ofrecemos alertas inteligentes que predicen: 1) Sobregiros 7 días antes, 2) Excesos de presupuesto por categoría, 3) Oportunidades de ahorro, 4) Patrones de gasto riesgosos, 5) Cumplimiento de metas, y 6) Anomalías en transacciones. Todas las alertas incluyen recomendaciones accionables.",
    category: "alerts",
    icon: Bell,
    helpfulCount: 145,
    lastUpdated: "2024-01-06",
    difficulty: "Intermedio",
    relatedModules: ["dashboard", "budgets", "transactions"],
    tags: ["alertas", "predicciones", "notificaciones"],
  },
];

// Tutoriales destacados
export const POPULAR_TUTORIALS: Tutorial[] = [
  {
    id: 1,
    title: "Primeros 5 minutos",
    description:
      "Configuración inicial y tour rápido por las funciones esenciales",
    icon: Zap,
    duration: "5 min",
    durationMinutes: 5,
    completed: true,
    difficulty: "Fácil",
    type: "interactive",
    points: 10,
    tags: ["inicio", "configuración", "esencial"],
    module: "dashboard",
    steps: 4,
    publishedDate: "2024-01-01",
    instructor: "Equipo SuFinanza",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 2,
    title: "Dominar el Dashboard",
    description:
      "Personaliza y entiende todas las métricas y widgets disponibles",
    icon: Home,
    duration: "10 min",
    durationMinutes: 10,
    completed: true,
    difficulty: "Intermedio",
    type: "video",
    points: 25,
    tags: ["dashboard", "métricas", "personalización"],
    module: "dashboard",
    steps: 7,
    thumbnailUrl: "/thumbnails/dashboard-tutorial.jpg",
    publishedDate: "2024-01-05",
    instructor: "Ana López",
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: 3,
    title: "Presupuesto Perfecto",
    description:
      "Crea y gestiona presupuestos inteligentes que se ajustan automáticamente",
    icon: TrendingUp,
    duration: "15 min",
    durationMinutes: 15,
    completed: false,
    difficulty: "Intermedio",
    type: "guide",
    points: 30,
    tags: ["presupuestos", "planificación", "ahorro"],
    module: "budgets",
    steps: 9,
    publishedDate: "2024-01-08",
    instructor: "Carlos Martínez",
    rating: 4.7,
    reviewCount: 67,
  },
  {
    id: 4,
    title: "Metas Inteligentes",
    description:
      "Planifica y alcanza tus objetivos financieros con ayuda de IA",
    icon: Target,
    duration: "12 min",
    durationMinutes: 12,
    completed: false,
    difficulty: "Intermedio",
    type: "interactive",
    points: 35,
    tags: ["metas", "IA", "planificación"],
    module: "goals",
    steps: 6,
    publishedDate: "2024-01-10",
    instructor: "Equipo SuFinanza",
    rating: 4.6,
    reviewCount: 42,
  },
  {
    id: 5,
    title: "Analítica con IA",
    description: "Domina las herramientas de análisis predictivo y tendencias",
    icon: Brain,
    duration: "18 min",
    durationMinutes: 18,
    completed: false,
    difficulty: "Avanzado",
    type: "video",
    points: 50,
    tags: ["IA", "analítica", "predicciones"],
    module: "analytics",
    steps: 11,
    thumbnailUrl: "/thumbnails/analytics-tutorial.jpg",
    publishedDate: "2024-01-12",
    instructor: "Dr. Elena Ruiz",
    rating: 4.9,
    reviewCount: 31,
  },
  {
    id: 6,
    title: "Seguridad Avanzada",
    description: "Configura todas las opciones de seguridad y privacidad",
    icon: Shield,
    duration: "8 min",
    durationMinutes: 8,
    completed: false,
    difficulty: "Fácil",
    type: "guide",
    points: 15,
    tags: ["seguridad", "privacidad", "configuración"],
    module: "settings",
    steps: 5,
    publishedDate: "2024-01-03",
    instructor: "Equipo SuFinanza",
    rating: 4.8,
    reviewCount: 56,
  },
];

// Opciones de soporte
export const SUPPORT_OPTIONS: SupportOption[] = [
  {
    id: "email",
    title: "Correo Electrónico",
    description: "Respuesta detallada en menos de 24 horas",
    icon: Mail,
    buttonText: "Enviar email",
    status: "online",
    responseTime: "24 horas",
    available: true,
    priority: "medium",
  },
  {
    id: "chat",
    title: "Chat en Vivo",
    description: "Disponible 9am - 6pm (GMT-5)",
    icon: MessageSquare,
    buttonText: "Iniciar chat",
    status: "online",
    responseTime: "5 minutos",
    available: true,
    priority: "high",
  },
  {
    id: "community",
    title: "Comunidad",
    description: "Foro de usuarios y preguntas frecuentes",
    icon: Users,
    buttonText: "Visitar foro",
    status: "online",
    responseTime: "Variable",
    available: true,
    priority: "low",
  },
  {
    id: "phone",
    title: "Teléfono",
    description: "Soporte telefónico prioritario",
    icon: Phone,
    buttonText: "Llamar ahora",
    status: "offline",
    responseTime: "Inmediata",
    available: false,
    priority: "high",
  },
];

// Categorías de ayuda
export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: "getting-started",
    name: "Primeros Pasos",
    icon: Zap,
    count: 12,
    color: "#61bc84",
    description: "Guías básicas para comenzar",
  },
  {
    id: "analytics",
    name: "IA & Analítica",
    icon: Brain,
    count: 18,
    color: "#2E8B57",
    description: "Análisis avanzado y predicciones",
  },
  {
    id: "security",
    name: "Seguridad",
    icon: Shield,
    count: 8,
    color: "#8FBC8F",
    description: "Privacidad y protección de datos",
  },
  {
    id: "transactions",
    name: "Transacciones",
    icon: CreditCard,
    count: 24,
    color: "#345e37",
    description: "Gestión y categorización",
  },
  {
    id: "budgets",
    name: "Presupuestos",
    icon: TrendingUp,
    count: 16,
    color: "#61bc84",
    description: "Planificación financiera",
  },
  {
    id: "goals",
    name: "Metas",
    icon: Target,
    count: 12,
    color: "#c6ffe6",
    description: "Objetivos y ahorro",
  },
  {
    id: "settings",
    name: "Configuración",
    icon: Settings,
    count: 10,
    color: "#e0e0e0",
    description: "Personalización y ajustes",
  },
  {
    id: "export",
    name: "Exportación",
    icon: Download,
    count: 6,
    color: "#3b82f6",
    description: "Datos e informes",
  },
];

// Enlaces rápidos
export const QUICK_LINKS: QuickLink[] = [
  {
    id: "documentation",
    label: "Documentación Completa",
    icon: BookOpen,
    url: "/docs",
    description: "Guía oficial detallada",
  },
  {
    id: "api-docs",
    label: "API Developer",
    icon: Code,
    url: "/api-docs",
    description: "Documentación técnica API",
    isExternal: false,
  },
  {
    id: "status",
    label: "Estado del Servicio",
    icon: Activity,
    url: "https://status.sufinanza.com",
    description: "Monitor de disponibilidad",
    isExternal: true,
  },
  {
    id: "updates",
    label: "Novedades",
    icon: Sparkles,
    url: "/updates",
    description: "Últimas actualizaciones",
  },
  {
    id: "blog",
    label: "Blog Educativo",
    icon: FileText,
    url: "/blog",
    description: "Artículos y consejos",
  },
  {
    id: "webinars",
    label: "Webinars",
    icon: Video,
    url: "/webinars",
    description: "Sesiones en vivo",
  },
];

// Sugerencias de búsqueda
export const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  {
    id: "1",
    query: "Cómo crear una meta de ahorro",
    category: "goals",
    icon: Target,
    popularity: 95,
  },
  {
    id: "2",
    query: "Importar transacciones bancarias",
    category: "transactions",
    icon: CreditCard,
    popularity: 88,
  },
  {
    id: "3",
    query: "Configurar presupuesto mensual",
    category: "budgets",
    icon: TrendingUp,
    popularity: 92,
  },
  {
    id: "4",
    query: "Entender analíticas predictivas",
    category: "analytics",
    icon: Brain,
    popularity: 76,
  },
  {
    id: "5",
    query: "Categorizar gastos automáticamente",
    category: "transactions",
    icon: Sparkles,
    popularity: 84,
  },
  {
    id: "6",
    query: "Exportar datos a Excel",
    category: "export",
    icon: Download,
    popularity: 71,
  },
  {
    id: "7",
    query: "Configurar alertas de gasto",
    category: "budgets",
    icon: Bell,
    popularity: 79,
  },
  {
    id: "8",
    query: "Seguridad y privacidad",
    category: "security",
    icon: Shield,
    popularity: 82,
  },
];

// Filtros de dificultad
export const DIFFICULTY_FILTERS = [
  { id: "all", label: "Todos los niveles", icon: Filter },
  { id: "beginner", label: "Principiante", icon: BookOpen },
  { id: "intermediate", label: "Intermedio", icon: GraduationCap },
  { id: "advanced", label: "Avanzado", icon: Award },
];

// Filtros de tipo de contenido
export const CONTENT_TYPE_FILTERS = [
  { id: "all", label: "Todo el contenido", icon: Filter },
  { id: "video", label: "Video", icon: Video },
  { id: "guide", label: "Guía", icon: FileText },
  { id: "interactive", label: "Interactivo", icon: Sparkles },
];

// Tipos de consulta para formulario de soporte
export const INQUIRY_TYPES = [
  {
    value: "problem",
    label: "Problema técnico",
    description: "Errores o fallos en el sistema",
  },
  {
    value: "question",
    label: "Pregunta sobre uso",
    description: "Cómo usar una función específica",
  },
  {
    value: "feature",
    label: "Sugerencia de función",
    description: "Ideas para nuevas características",
  },
  {
    value: "billing",
    label: "Facturación",
    description: "Preguntas sobre pagos y suscripciones",
  },
  {
    value: "account",
    label: "Cuenta",
    description: "Gestión de cuenta y acceso",
  },
  {
    value: "other",
    label: "Otro",
    description: "Otras consultas no categorizadas",
  },
];

// Estadísticas generales del centro de ayuda
export const HELP_STATS = {
  totalGuides: 89,
  totalVideos: 42,
  totalFAQs: 56,
  averageResponseTime: "2.4 horas",
  userSatisfaction: 94.7,
  activeCommunityMembers: 1245,
  articlesUpdatedThisMonth: 23,
};

// Funciones de utilidad
export const getModuleById = (id: string): Module | undefined => {
  return MODULES.find((module) => module.id === id);
};

export const getTutorialsByModule = (moduleId: string): Tutorial[] => {
  return POPULAR_TUTORIALS.filter((tutorial) => tutorial.module === moduleId);
};

export const getFAQsByCategory = (category: string): FAQItem[] => {
  return FAQS.filter((faq) => faq.category === category);
};

export const getTopRatedTutorials = (limit: number = 5): Tutorial[] => {
  return [...POPULAR_TUTORIALS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getRecentlyUpdated = (): FAQItem[] => {
  return [...FAQS]
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )
    .slice(0, 5);
};

export const getInProgressTutorials = (): Tutorial[] => {
  return POPULAR_TUTORIALS.filter((tutorial) => !tutorial.completed);
};

export const getCompletedTutorials = (): Tutorial[] => {
  return POPULAR_TUTORIALS.filter((tutorial) => tutorial.completed);
};

// Exportar todo por defecto también para facilitar importaciones
export default {
  MODULES,
  USER_PROGRESS,
  FAQS,
  POPULAR_TUTORIALS,
  SUPPORT_OPTIONS,
  HELP_CATEGORIES,
  QUICK_LINKS,
  SEARCH_SUGGESTIONS,
  DIFFICULTY_FILTERS,
  CONTENT_TYPE_FILTERS,
  INQUIRY_TYPES,
  HELP_STATS,
  getModuleById,
  getTutorialsByModule,
  getFAQsByCategory,
  getTopRatedTutorials,
  getRecentlyUpdated,
  getInProgressTutorials,
  getCompletedTutorials,
};
