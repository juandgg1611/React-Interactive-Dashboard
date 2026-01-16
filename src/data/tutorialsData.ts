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
  ChevronRight,
  Play,
  Pause,
  SkipForward,
  Rewind,
  Volume2,
  Maximize2,
  DownloadCloud,
  Printer,
  Share2,
  ThumbsUp,
  Bookmark,
  Eye,
  BarChart2,
  PieChart,
  TrendingDown,
  DollarSign,
  Euro,
  PoundSterling,
  Calendar,
  AlertCircle,
  CheckSquare,
  XCircle,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  RotateCcw,
  Trash2,
  Edit,
  Copy,
  Scissors,
  Link,
  Unlink,
  Lock,
  Unlock,
  Key,
  EyeOff,
  Smartphone,
  Tablet,
  Monitor,
  Server,
  Database,
  Cloud,
  Wifi,
  WifiOff,
  Upload,
  Search as SearchIcon,
} from "lucide-react";

// ==================== TIPOS ====================
export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  duration: number; // en segundos
  completed: boolean;
  type: "video" | "text" | "interactive" | "quiz";
  content?: string; // HTML o markdown
  videoUrl?: string;
  quiz?: QuizQuestion[];
  tips?: string[];
  warning?: string;
  nextStepAction?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TutorialChapter {
  id: number;
  title: string;
  description: string;
  steps: TutorialStep[];
  estimatedDuration: number; // en minutos
  completed: boolean;
  unlockPoints: number; // puntos necesarios para desbloquear
}

export interface TutorialSeries {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  chapters: TutorialChapter[];
  totalSteps: number;
  totalDuration: number; // en minutos
  completedSteps: number;
  instructor: Instructor;
  category: string[];
  tags: string[];
  publishedDate: string;
  lastUpdated: string;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  certificateAvailable: boolean;
  prerequisites?: string[]; // IDs de tutoriales requeridos
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  expertise: string[];
  rating: number;
  tutorialCount: number;
}

export interface UserTutorialProgress {
  tutorialId: string;
  currentChapter: number;
  currentStep: number;
  completedChapters: number[];
  completedSteps: number[];
  totalTimeSpent: number; // en minutos
  lastAccessed: string;
  bookmarked: boolean;
  notes: TutorialNote[];
}

export interface TutorialNote {
  id: number;
  stepId: number;
  content: string;
  timestamp: number; // en segundos del video
  createdAt: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: any;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedDuration: number; // en horas
  tutorials: string[]; // IDs de tutoriales
  order: number;
  completed: boolean;
  rewards: {
    points: number;
    badgeId?: string;
    certificate?: boolean;
  };
}

// ==================== INSTRUCTORES ====================
export const INSTRUCTORS: Instructor[] = [
  {
    id: "ana-lopez",
    name: "Ana López",
    role: "Especialista en Finanzas Personales",
    bio: "Más de 10 años de experiencia en educación financiera. Certificada CFP® y autora de 3 libros sobre finanzas personales.",
    avatarUrl: "/instructors/ana-lopez.jpg",
    expertise: ["Finanzas Personales", "Presupuestos", "Ahorro"],
    rating: 4.9,
    tutorialCount: 15,
  },
  {
    id: "carlos-martinez",
    name: "Carlos Martínez",
    role: "Ingeniero de IA Senior",
    bio: "PhD en Machine Learning. Desarrollador principal del motor de IA predictiva de SuFinanza.",
    avatarUrl: "/instructors/carlos-martinez.jpg",
    expertise: ["IA", "Machine Learning", "Analítica Predictiva"],
    rating: 4.8,
    tutorialCount: 8,
  },
  {
    id: "elena-ruiz",
    name: "Dra. Elena Ruiz",
    role: "Experta en Seguridad Financiera",
    bio: "Ex-directora de seguridad en banco internacional. Especialista en ciberseguridad y protección de datos financieros.",
    avatarUrl: "/instructors/elena-ruiz.jpg",
    expertise: ["Seguridad", "Privacidad", "Ciberseguridad"],
    rating: 4.7,
    tutorialCount: 6,
  },
  {
    id: "miguel-torres",
    name: "Miguel Torres",
    role: "Product Manager Lead",
    bio: "5 años liderando el desarrollo de SuFinanza. Experto en UX y diseño centrado en el usuario.",
    avatarUrl: "/instructors/miguel-torres.jpg",
    expertise: ["UX/UI", "Producto", "Onboarding"],
    rating: 4.6,
    tutorialCount: 12,
  },
];

// ==================== SERIES DE TUTORIALES ====================
export const TUTORIAL_SERIES: TutorialSeries[] = [
  {
    id: "dashboard-mastery",
    title: "Maestría del Dashboard",
    description:
      "Domina todas las funciones del dashboard personalizable de SuFinanza",
    icon: Home,
    color: "#61bc84",
    level: "beginner",
    chapters: [
      {
        id: 1,
        title: "Primeros Pasos",
        description: "Configuración inicial y navegación básica",
        steps: [
          {
            id: 1,
            title: "Bienvenida y Configuración",
            description: "Aprende a configurar tu dashboard por primera vez",
            duration: 180,
            completed: true,
            type: "video",
            videoUrl: "/tutorials/dashboard/welcome.mp4",
            tips: [
              "Usa el modo oscuro para reducir la fatiga visual",
              "Personaliza las notificaciones según tus necesidades",
            ],
          },
          {
            id: 2,
            title: "Navegación Principal",
            description:
              "Conoce todas las secciones y cómo moverte entre ellas",
            duration: 240,
            completed: true,
            type: "interactive",
            content: `La barra superior contiene:\n- Dashboard: Vista principal\n- Transacciones: Historial y gestión\n- Presupuestos: Planificación mensual\n- Metas: Objetivos de ahorro`,
            quiz: [
              {
                id: 1,
                question: "¿Dónde encuentras el historial de transacciones?",
                options: [
                  "Dashboard",
                  "Transacciones",
                  "Configuración",
                  "Analítica",
                ],
                correctAnswer: 1,
                explanation:
                  "La sección 'Transacciones' contiene todo el historial y gestión de tus movimientos.",
              },
            ],
          },
        ],
        estimatedDuration: 7,
        completed: true,
        unlockPoints: 0,
      },
      {
        id: 2,
        title: "Widgets Personalizables",
        description: "Aprende a agregar, eliminar y organizar widgets",
        steps: [
          {
            id: 3,
            title: "Agregar Nuevos Widgets",
            description: "Selecciona entre más de 15 widgets diferentes",
            duration: 300,
            completed: false,
            type: "video",
            videoUrl: "/tutorials/dashboard/widgets.mp4",
          },
          {
            id: 4,
            title: "Organizar Layout",
            description: "Arrastra y suelta para crear tu vista ideal",
            duration: 360,
            completed: false,
            type: "interactive",
          },
        ],
        estimatedDuration: 11,
        completed: false,
        unlockPoints: 50,
      },
    ],
    totalSteps: 4,
    totalDuration: 18,
    completedSteps: 2,
    instructor: INSTRUCTORS[3], // Miguel Torres
    category: ["dashboard", "personalization"],
    tags: ["widgets", "layout", "personalización"],
    publishedDate: "2024-01-01",
    lastUpdated: "2024-01-15",
    rating: 4.8,
    reviewCount: 124,
    enrolledCount: 845,
    certificateAvailable: true,
  },
  {
    id: "smart-budgets",
    title: "Presupuestos Inteligentes",
    description:
      "Crea presupuestos que se adaptan automáticamente a tus finanzas",
    icon: TrendingUp,
    color: "#2E8B57",
    level: "intermediate",
    chapters: [
      {
        id: 1,
        title: "Fundamentos de Presupuestos",
        description: "Conceptos básicos y primera configuración",
        steps: [
          {
            id: 1,
            title: "¿Qué es un Presupuesto Inteligente?",
            description: "Diferencias con los presupuestos tradicionales",
            duration: 420,
            completed: false,
            type: "video",
            videoUrl: "/tutorials/budgets/intro.mp4",
          },
          {
            id: 2,
            title: "Crear tu Primer Presupuesto",
            description: "Configuración paso a paso",
            duration: 600,
            completed: false,
            type: "interactive",
          },
        ],
        estimatedDuration: 17,
        completed: false,
        unlockPoints: 0,
      },
      {
        id: 2,
        title: "Ajustes Automáticos con IA",
        description: "Cómo la IA optimiza tus presupuestos",
        steps: [
          {
            id: 3,
            title: "Análisis de Patrones",
            description: "Cómo la IA identifica tus hábitos de gasto",
            duration: 480,
            completed: false,
            type: "video",
            videoUrl: "/tutorials/budgets/ai-analysis.mp4",
          },
          {
            id: 4,
            title: "Ajustes Predictivos",
            description: "La IA anticipa cambios en tus finanzas",
            duration: 540,
            completed: false,
            type: "interactive",
          },
        ],
        estimatedDuration: 17,
        completed: false,
        unlockPoints: 100,
      },
    ],
    totalSteps: 4,
    totalDuration: 34,
    completedSteps: 0,
    instructor: INSTRUCTORS[0], // Ana López
    category: ["budgets", "ai"],
    tags: ["presupuestos", "IA", "ajuste automático"],
    publishedDate: "2024-01-05",
    lastUpdated: "2024-01-18",
    rating: 4.9,
    reviewCount: 89,
    enrolledCount: 623,
    certificateAvailable: true,
  },
  {
    id: "ai-analytics",
    title: "Analítica con IA",
    description: "Domina las herramientas de análisis predictivo avanzado",
    icon: Brain,
    color: "#8b5cf6",
    level: "advanced",
    chapters: [
      {
        id: 1,
        title: "Introducción a la Analítica Predictiva",
        description: "Conceptos fundamentales de IA aplicada a finanzas",
        steps: [
          {
            id: 1,
            title: "¿Cómo Funciona Nuestra IA?",
            description: "Algoritmos de machine learning explicados",
            duration: 720,
            completed: false,
            type: "video",
            videoUrl: "/tutorials/analytics/ai-explained.mp4",
          },
        ],
        estimatedDuration: 12,
        completed: false,
        unlockPoints: 0,
      },
      {
        id: 2,
        title: "Modelos Predictivos",
        description: "Entiende y utiliza los modelos de predicción",
        steps: [
          {
            id: 2,
            title: "Predicción de Gastos",
            description:
              "Cómo predecir tus gastos futuros con 92% de precisión",
            duration: 900,
            completed: false,
            type: "interactive",
          },
        ],
        estimatedDuration: 15,
        completed: false,
        unlockPoints: 200,
      },
    ],
    totalSteps: 2,
    totalDuration: 27,
    completedSteps: 0,
    instructor: INSTRUCTORS[1], // Carlos Martínez
    category: ["analytics", "ai"],
    tags: ["IA", "predicciones", "machine learning"],
    publishedDate: "2024-01-12",
    lastUpdated: "2024-01-20",
    rating: 4.7,
    reviewCount: 45,
    enrolledCount: 312,
    certificateAvailable: true,
    prerequisites: ["dashboard-mastery"],
  },
];

// ==================== RUTAS DE APRENDIZAJE ====================
export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "beginner-path",
    title: "Ruta para Principiantes",
    description: "Domina los fundamentos de SuFinanza en 4 semanas",
    icon: BookOpen,
    difficulty: "beginner",
    estimatedDuration: 12,
    tutorials: ["dashboard-mastery", "transactions-basics", "simple-budgets"],
    order: 1,
    completed: false,
    rewards: {
      points: 500,
      badgeId: "beginner-master",
      certificate: true,
    },
  },
  {
    id: "intermediate-path",
    title: "Ruta Intermedia",
    description: "Optimiza tus finanzas con herramientas avanzadas",
    icon: GraduationCap,
    difficulty: "intermediate",
    estimatedDuration: 20,
    tutorials: ["smart-budgets", "goals-planning", "basic-analytics"],
    order: 2,
    completed: false,
    rewards: {
      points: 1000,
      badgeId: "finance-optimizer",
      certificate: true,
    },
  },
  {
    id: "advanced-path",
    title: "Ruta Avanzada",
    description: "Conviértete en experto en analítica financiera",
    icon: Award,
    difficulty: "advanced",
    estimatedDuration: 30,
    tutorials: ["ai-analytics", "investment-tracking", "advanced-reports"],
    order: 3,
    completed: false,
    rewards: {
      points: 2000,
      badgeId: "finance-expert",
      certificate: true,
    },
  },
];

// ==================== PROGRESO DEL USUARIO (EJEMPLO) ====================
export const USER_PROGRESS_EXAMPLE: UserTutorialProgress[] = [
  {
    tutorialId: "dashboard-mastery",
    currentChapter: 1,
    currentStep: 2,
    completedChapters: [1],
    completedSteps: [1, 2],
    totalTimeSpent: 15,
    lastAccessed: "2024-01-16T10:30:00Z",
    bookmarked: true,
    notes: [
      {
        id: 1,
        stepId: 1,
        content: "Recordar activar notificaciones para presupuestos",
        timestamp: 120,
        createdAt: "2024-01-15T14:20:00Z",
      },
    ],
  },
];

// ==================== TUTORIALES RÁPIDOS ====================
export const QUICK_TUTORIALS = [
  {
    id: "import-csv",
    title: "Importar CSV en 2 minutos",
    description: "Aprende a importar tus datos bancarios rápidamente",
    icon: Upload,
    duration: 120,
    level: "beginner",
    module: "transactions",
  },
  {
    id: "create-alert",
    title: "Crear Alerta Personalizada",
    description: "Configura alertas para controlar tus gastos",
    icon: Bell,
    duration: 180,
    level: "beginner",
    module: "budgets",
  },
  {
    id: "export-report",
    title: "Exportar Reporte Mensual",
    description: "Genera y comparte reportes profesionales",
    icon: Download,
    duration: 240,
    level: "intermediate",
    module: "analytics",
  },
  {
    id: "two-factor",
    title: "Autenticación de Dos Factores",
    description: "Aumenta la seguridad de tu cuenta",
    icon: Shield,
    duration: 150,
    level: "beginner",
    module: "settings",
  },
];

// ==================== FUNCIONES DE UTILIDAD ====================
export const getTutorialById = (id: string): TutorialSeries | undefined => {
  return TUTORIAL_SERIES.find((tutorial) => tutorial.id === id);
};

export const getTutorialsByLevel = (level: string): TutorialSeries[] => {
  return TUTORIAL_SERIES.filter((tutorial) => tutorial.level === level);
};

export const getTutorialsByCategory = (category: string): TutorialSeries[] => {
  return TUTORIAL_SERIES.filter((tutorial) =>
    tutorial.category.includes(category)
  );
};

export const getNextRecommendedTutorial = (
  completedTutorials: string[]
): TutorialSeries | undefined => {
  // Buscar tutoriales que no estén completados y cuyos prerrequisitos estén satisfechos
  return TUTORIAL_SERIES.find((tutorial) => {
    const notCompleted = !completedTutorials.includes(tutorial.id);
    const prerequisitesMet =
      !tutorial.prerequisites ||
      tutorial.prerequisites.every((prereq) =>
        completedTutorials.includes(prereq)
      );

    return notCompleted && prerequisitesMet;
  });
};

export const calculateProgressPercentage = (
  tutorialId: string,
  userProgress: UserTutorialProgress[]
): number => {
  const progress = userProgress.find((p) => p.tutorialId === tutorialId);
  const tutorial = getTutorialById(tutorialId);

  if (!progress || !tutorial) return 0;

  const totalSteps = tutorial.totalSteps;
  const completedSteps = progress.completedSteps.length;

  return Math.round((completedSteps / totalSteps) * 100);
};

export const getEstimatedCompletionTime = (
  tutorialId: string,
  userProgress: UserTutorialProgress[]
): number => {
  const progress = userProgress.find((p) => p.tutorialId === tutorialId);
  const tutorial = getTutorialById(tutorialId);

  if (!progress || !tutorial) return tutorial?.totalDuration || 0;

  const remainingChapters = tutorial.chapters.filter(
    (chapter) => !progress.completedChapters.includes(chapter.id)
  );

  return remainingChapters.reduce(
    (total, chapter) => total + chapter.estimatedDuration,
    0
  );
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${remainingMinutes} min`;
};

export const getInstructorById = (id: string): Instructor | undefined => {
  return INSTRUCTORS.find((instructor) => instructor.id === id);
};

export const getLearningPathById = (id: string): LearningPath | undefined => {
  return LEARNING_PATHS.find((path) => path.id === id);
};

export const getQuickTutorialsByModule = (moduleId: string) => {
  return QUICK_TUTORIALS.filter((tutorial) => tutorial.module === moduleId);
};

// ==================== ESTADÍSTICAS DE APRENDIZAJE ====================
export const LEARNING_STATS = {
  totalTutorials: TUTORIAL_SERIES.length,
  totalVideoHours: Math.round(
    TUTORIAL_SERIES.reduce(
      (total, tutorial) => total + tutorial.totalDuration,
      0
    ) / 60
  ),
  totalSteps: TUTORIAL_SERIES.reduce(
    (total, tutorial) => total + tutorial.totalSteps,
    0
  ),
  averageRating: parseFloat(
    (
      TUTORIAL_SERIES.reduce((total, tutorial) => total + tutorial.rating, 0) /
      TUTORIAL_SERIES.length
    ).toFixed(1)
  ),
  totalEnrolled: TUTORIAL_SERIES.reduce(
    (total, tutorial) => total + tutorial.enrolledCount,
    0
  ),
  certificatesAvailable: TUTORIAL_SERIES.filter((t) => t.certificateAvailable)
    .length,
};

// ==================== ETIQUETAS POPULARES ====================
export const POPULAR_TAGS = [
  { name: "IA", count: 8, color: "#8b5cf6" },
  { name: "Presupuestos", count: 12, color: "#10b981" },
  { name: "Dashboard", count: 6, color: "#61bc84" },
  { name: "Seguridad", count: 5, color: "#ef4444" },
  { name: "Exportación", count: 4, color: "#3b82f6" },
  { name: "Métricas", count: 7, color: "#f59e0b" },
  { name: "Automatización", count: 9, color: "#8FBC8F" },
  { name: "Ahorro", count: 11, color: "#2E8B57" },
];

// ==================== PREMIOS Y LOGROS ====================
export const ACHIEVEMENTS = [
  {
    id: "speed-learner",
    title: "Aprendiz Rápido",
    description: "Completa 3 tutoriales en menos de 24 horas",
    icon: Zap,
    unlocked: false,
    points: 100,
  },
  {
    id: "note-taker",
    title: "Tomador de Notas",
    description: "Toma 10 notas en tutoriales diferentes",
    icon: FileText,
    unlocked: false,
    points: 75,
  },
  {
    id: "perfect-score",
    title: "Puntuación Perfecta",
    description: "Obtén 100% en todos los quizzes de un tutorial",
    icon: Star,
    unlocked: false,
    points: 150,
  },
  {
    id: "early-bird",
    title: "Madrugador",
    description: "Completa un tutorial antes de las 7 AM",
    icon: Clock,
    unlocked: false,
    points: 50,
  },
];

// ==================== HERRAMIENTAS DE APRENDIZAJE ====================
export const LEARNING_TOOLS = [
  {
    id: "bookmark-manager",
    name: "Gestor de Marcadores",
    description: "Guarda y organiza tus tutoriales favoritos",
    icon: Bookmark,
    available: true,
  },
  {
    id: "progress-tracker",
    name: "Seguimiento de Progreso",
    description: "Visualiza tu avance en tiempo real",
    icon: TrendingUp,
    available: true,
  },
  {
    id: "note-sync",
    name: "Sincronización de Notas",
    description: "Tus notas disponibles en todos tus dispositivos",
    icon: Cloud,
    available: true,
  },
  {
    id: "speed-control",
    name: "Control de Velocidad",
    description: "Ajusta la velocidad de los videos tutoriales",
    icon: Play,
    available: true,
  },
  {
    id: "transcript-search",
    name: "Búsqueda en Transcripciones",
    description: "Encuentra contenido específico en los videos",
    icon: SearchIcon,
    available: false,
    comingSoon: true,
  },
  {
    id: "offline-mode",
    name: "Modo Offline",
    description: "Descarga tutoriales para ver sin conexión",
    icon: WifiOff,
    available: false,
    comingSoon: true,
  },
];

// Exportar todo por defecto también para facilitar importaciones
export default {
  TUTORIAL_SERIES,
  LEARNING_PATHS,
  INSTRUCTORS,
  USER_PROGRESS_EXAMPLE,
  QUICK_TUTORIALS,
  LEARNING_STATS,
  POPULAR_TAGS,
  ACHIEVEMENTS,
  LEARNING_TOOLS,
  getTutorialById,
  getTutorialsByLevel,
  getTutorialsByCategory,
  getNextRecommendedTutorial,
  calculateProgressPercentage,
  getEstimatedCompletionTime,
  formatDuration,
  getInstructorById,
  getLearningPathById,
  getQuickTutorialsByModule,
};
