import React, { useState, useEffect } from "react";
import {
  Search,
  HelpCircle,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Home,
  CreditCard,
  TrendingUp,
  Target,
  BarChart,
  Settings,
  Sparkles,
  Zap,
  Lightbulb,
  Award,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Video,
  Mail,
  ExternalLink,
  Filter,
  Star,
  Brain,
  GraduationCap,
  Download,
  Globe,
  PlayCircle,
  Headphones,
  RefreshCw,
  Ticket,
  Phone,
  LucideIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Importar componentes modulares
import HelpDashboard from "../help/HelpDashboard";
import HelpSearch from "../help/HelpSearch";
import FAQSection from "../help/FAQSection";
import ContactSupport from "../help/ContactSupport";
import type { SupportOption } from "../help/ContactSupport";

// Importar Layout
import Layout from "../layout/Layout";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedModule, setSelectedModule] = useState("all");
  const [time, setTime] = useState(new Date());
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  interface Module {
    id: string;
    name: string;
    icon: LucideIcon;
    color: string;
    description: string;
    guideCount: number;
    videoCount: number;
    progress: number;
    tags: string[];
  }
  // Datos de ejemplo
  const modules: Module[] = [
    {
      id: "documentacion",
      name: "Documentación",
      icon: FileText,
      color: "#2E8B57",
      description: "Guías oficiales y documentación técnica", // Agrega
      guideCount: 15, // Agrega
      videoCount: 8, // Agrega
      progress: 65, // Agrega (porcentaje)
      tags: ["Técnica", "Referencia", "Manuales"], // Agrega
    },
    {
      id: "tutoriales",
      name: "Tutoriales Paso a Paso",
      icon: PlayCircle,
      color: "#61bc84",
      description: "Tutoriales interactivos y guías prácticas",
      guideCount: 25,
      videoCount: 12,
      progress: 40,
      tags: ["Práctico", "Interactivo", "Ejemplos"],
    },
    {
      id: "faq",
      name: "Preguntas Frecuentes",
      icon: HelpCircle,
      color: "#8FBC8F",
      description: "Respuestas a las dudas más comunes",
      guideCount: 42,
      videoCount: 5,
      progress: 80,
      tags: ["FAQ", "Soluciones", "Común"],
    },
    {
      id: "soporte",
      name: "Soporte Técnico",
      icon: Headphones,
      color: "#345e37",
      description: "Asistencia técnica y resolución de problemas",
      guideCount: 18,
      videoCount: 7,
      progress: 30,
      tags: ["Soporte", "Técnico", "Ayuda"],
    },
    {
      id: "comunidad",
      name: "Comunidad",
      icon: Users,
      color: "#2E8B57",
      description: "Foros, discusiones y comunidad de usuarios",
      guideCount: 32,
      videoCount: 15,
      progress: 55,
      tags: ["Comunidad", "Foros", "Discusión"],
    },
    {
      id: "actualizaciones",
      name: "Actualizaciones",
      icon: RefreshCw,
      color: "#61bc84",
      description: "Novedades, actualizaciones y changelogs",
      guideCount: 12,
      videoCount: 6,
      progress: 90,
      tags: ["Novedades", "Updates", "Changelog"],
    },
  ];

  const userProgress = {
    level: "Intermedio",
    points: 150,
    tutorialsCompleted: 3,
    totalTutorials: 8,
    helpSessions: 12,
    modules: modules,
  };

  const popularGuides = [
    {
      id: 1,
      title: "Primeros 5 minutos",
      description: "Configuración inicial y tour rápido",
      icon: Zap,
      duration: "5 min",
      completed: true,
      difficulty: "Fácil",
    },
    {
      id: 2,
      title: "Dominar el Dashboard",
      description: "Personaliza y entiende todas las métricas",
      icon: Home,
      duration: "10 min",
      completed: true,
      difficulty: "Intermedio",
    },
    {
      id: 3,
      title: "Presupuesto Perfecto",
      description: "Crea y gestiona presupuestos inteligentes",
      icon: TrendingUp,
      duration: "15 min",
      completed: false,
      difficulty: "Intermedio",
    },
    {
      id: 4,
      title: "Metas Inteligentes",
      description: "Planifica y alcanza tus objetivos financieros",
      icon: Target,
      duration: "12 min",
      completed: false,
      difficulty: "Intermedio",
    },
  ];

  const supportOptions: SupportOption[] = [
    {
      id: "email",
      title: "Correo Electrónico",
      description: "Respuesta en menos de 24 horas",
      icon: Mail,
      buttonText: "Enviar email",
      status: "online",
      responseTime: "24 horas",
      available: true,
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
    },
    {
      id: "community",
      title: "Comunidad",
      description: "Foro de usuarios y preguntas",
      icon: Globe,
      buttonText: "Visitar foro",
      status: "online",
      responseTime: "Variable",
      available: true,
    },
  ];

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Efecto para sugerencias de búsqueda
  useEffect(() => {
    if (searchQuery.length > 2) {
      const suggestions = [
        "Cómo crear una meta",
        "Importar transacciones",
        "Configurar presupuesto",
        "Entender analíticas",
        "Categorizar gastos",
        "Exportar datos",
      ].filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Buscando:", query);
  };

  const handleViewAllTutorials = () => {
    setActiveTab("tutorials");
  };

  const handleGuideSelect = (guideId: number) => {
    console.log("Guía seleccionada:", guideId);
  };

  const handleSupportSubmit = (data: any) => {
    console.log("Consulta de soporte enviada:", data);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Header con gradiente verde animado */}
        <div className="mb-8 relative">
          {/* Fondo con gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-primary-200/5 to-primary-300/3 rounded-2xl blur-xl"></div>

          {/* Efectos de partículas */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-4 -left-4 w-8 h-8 bg-primary-200/10 rounded-full blur-md animate-pulse"></div>
            <div className="absolute bottom-4 -right-4 w-12 h-12 bg-primary-100/5 rounded-full blur-lg"></div>
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Icono con efectos especiales */}
                  <div className="relative group">
                    {/* Brillos externos */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary-200/20 to-primary-300/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="absolute -inset-1 bg-primary-100/10 rounded-xl blur-md"></div>

                    {/* Icono principal */}
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-primary-300/10 border border-primary-200/30 shadow-lg shadow-primary-200/15 backdrop-blur-sm">
                      <HelpCircle className="h-8 w-8 text-primary-200 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300" />

                      {/* Efecto de ayuda en el icono */}
                      <div className="absolute -top-1 -right-1">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                          <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-200 flex items-center justify-center">
                            <Lightbulb className="h-2.5 w-2.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Títulos con gradiente */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                      Centro de Ayuda
                    </h1>
                    <p className="text-text-200/80 mt-2 max-w-2xl">
                      Encuentra respuestas rápidas, tutoriales y soporte
                      personalizado
                    </p>
                  </div>
                </div>

                {/* Nivel de usuario */}
                <div className="flex items-center gap-4">
                  <Badge className="bg-gradient-to-r from-primary-100 to-primary-200 text-white border-0 animate-pulse-glow">
                    <Award className="h-3.5 w-3.5 mr-1.5" />
                    Nivel {userProgress.level}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-text-200">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400/30" />
                    <span className="font-medium text-text-100">
                      {userProgress.points}
                    </span>
                    <span className="text-text-200/70">puntos de ayuda</span>
                  </div>
                </div>
              </div>

              {/* Stats rápidas mejoradas */}
              <div className="grid grid-cols-2 gap-3 min-w-[200px]">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-200/20 hover:border-primary-200/40 transition-all duration-300 group">
                  <div className="text-2xl font-bold text-primary-200 group-hover:scale-105 transition-transform duration-300">
                    {userProgress.tutorialsCompleted}/
                    {userProgress.totalTutorials}
                  </div>
                  <div className="text-xs text-text-200/70 mt-1">
                    Tutoriales
                  </div>
                  <div className="h-1 bg-bg-300/30 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-100 to-primary-200 rounded-full transition-all duration-1000"
                      style={{
                        width: `${
                          (userProgress.tutorialsCompleted /
                            userProgress.totalTutorials) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-accent-100/10 to-accent-100/5 border border-accent-100/20 hover:border-accent-100/40 transition-all duration-300 group">
                  <div className="text-2xl font-bold text-accent-100 group-hover:scale-105 transition-transform duration-300">
                    {userProgress.helpSessions}
                  </div>
                  <div className="text-xs text-text-200/70 mt-1">Consultas</div>
                  <div className="h-1 bg-bg-300/30 rounded-full mt-2">
                    <div className="h-full bg-gradient-to-r from-accent-100 to-accent-dark rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de búsqueda principal usando HelpSearch */}
            <HelpSearch
              placeholder="Buscar ayuda, tutoriales, preguntas frecuentes..."
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              onSuggestionClick={handleSearch}
            />
          </div>
        </div>

        {/* Pestañas principales con diseño mejorado */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-100/5 to-primary-200/5 rounded-xl blur-md"></div>
            <TabsList className="relative grid w-full grid-cols-4 bg-bg-200/40 backdrop-blur-md border border-bg-300/40 p-1 rounded-xl shadow-lg">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 data-[state=active]:shadow-inner rounded-lg transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100/0 to-primary-200/0 group-hover:from-primary-100/10 group-hover:to-primary-200/10 transition-all duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Inicio</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="tutorials"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 data-[state=active]:shadow-inner rounded-lg transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100/0 to-primary-200/0 group-hover:from-primary-100/10 group-hover:to-primary-200/10 transition-all duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Tutoriales</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="faq"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 data-[state=active]:shadow-inner rounded-lg transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100/0 to-primary-200/0 group-hover:from-primary-100/10 group-hover:to-primary-200/10 transition-all duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Preguntas</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="support"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 data-[state=active]:shadow-inner rounded-lg transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100/0 to-primary-200/0 group-hover:from-primary-100/10 group-hover:to-primary-200/10 transition-all duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Soporte</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ==================== CONTENIDO: INICIO ==================== */}
          <TabsContent value="overview" className="space-y-8 mt-8">
            {/* HelpDashboard incorporado - Incluye: 
                1. Progreso de aprendizaje
                2. Ayuda por Módulo (con título y selector)
                3. Tutoriales destacados */}
            <HelpDashboard
              userProgress={userProgress}
              popularGuides={popularGuides}
              modules={modules}
              selectedModule={selectedModule}
              onSelectModule={setSelectedModule}
              onViewAllTutorials={handleViewAllTutorials}
              onSelectGuide={handleGuideSelect}
            />
          </TabsContent>

          {/* ==================== CONTENIDO: TUTORIALES ==================== */}
          <TabsContent value="tutorials" className="space-y-8 mt-8">
            {/* Header de tutoriales */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-primary-200/10 rounded-xl blur-md"></div>
                      <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary-100/30 to-primary-200/20 border border-primary-200/30">
                        <GraduationCap className="h-7 w-7 text-primary-200" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-text-100 text-2xl">
                        Biblioteca de Tutoriales
                      </CardTitle>
                      <CardDescription className="text-text-200">
                        Aprende a tu propio ritmo con nuestras guías paso a paso
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary-100 to-primary-200 text-white">
                    {popularGuides.filter((g) => !g.completed).length} nuevos
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Tutoriales por módulo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tutoriales en video */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-text-100 flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary-200" />
                  Tutoriales en Video
                </h3>

                <div className="space-y-4">
                  {modules.slice(0, 3).map((module) => (
                    <Card
                      key={module.id}
                      className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300 cursor-pointer group"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative flex-shrink-0">
                            <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-primary-100/10 to-primary-200/5 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                <div className="w-0 h-0 border-y-3 border-l-4 border-y-transparent border-l-white ml-1"></div>
                              </div>
                            </div>
                            <Badge className="absolute -bottom-1 -right-1 bg-black/70 text-white text-xs">
                              5:30
                            </Badge>
                          </div>

                          <div className="flex-1">
                            <h4 className="font-semibold text-text-100 group-hover:text-primary-200 transition-colors">
                              Video: {module.name}
                            </h4>
                            <p className="text-sm text-text-200/70 mt-1">
                              Aprende todas las funciones principales
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Guías escritas */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-text-100 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-200" />
                  Guías Escritas
                </h3>

                <div className="space-y-4">
                  {modules.slice(3).map((module) => (
                    <Card
                      key={module.id}
                      className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300 cursor-pointer group"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="p-3 rounded-lg flex-shrink-0"
                            style={{
                              backgroundColor: `${module.color}15`,
                              border: `1px solid ${module.color}30`,
                            }}
                          >
                            <module.icon
                              className="h-5 w-5"
                              style={{ color: module.color }}
                            />
                          </div>

                          <div className="flex-1">
                            <h4 className="font-semibold text-text-100 group-hover:text-primary-200 transition-colors">
                              Guía: {module.name}
                            </h4>
                            <p className="text-sm text-text-200/70 mt-1">
                              Instrucciones detalladas paso a paso
                            </p>
                          </div>

                          <Badge className="bg-gradient-to-r from-primary-100/20 to-primary-200/20 text-primary-200 border-primary-100/40">
                            8 min
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Progreso general */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text-100">
                      Tu Progreso General
                    </h3>
                    <div className="text-2xl font-bold text-primary-200">
                      {Math.round(
                        (userProgress.tutorialsCompleted /
                          userProgress.totalTutorials) *
                          100
                      )}
                      %
                    </div>
                  </div>

                  <div className="space-y-3">
                    {modules.map((module) => (
                      <div key={module.id} className="flex items-center">
                        <div className="w-40 text-sm text-text-200 flex items-center gap-2">
                          <module.icon
                            className="h-3.5 w-3.5"
                            style={{ color: module.color }}
                          />
                          {module.name}
                        </div>
                        <div className="flex-1 h-2 bg-bg-300/50 rounded-full overflow-hidden mx-4">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              backgroundColor: module.color,
                              width: `${Math.random() * 100}%`,
                            }}
                          />
                        </div>
                        <div className="w-10 text-right text-sm font-medium text-text-100">
                          {Math.floor(Math.random() * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== CONTENIDO: PREGUNTAS FRECUENTES ==================== */}
          <TabsContent value="faq" className="space-y-8 mt-8">
            {/* FAQSection incorporado */}
            <FAQSection selectedModule={selectedModule} />
          </TabsContent>

          {/* ==================== CONTENIDO: SOPORTE ==================== */}
          <TabsContent value="support" className="space-y-8 mt-8">
            {/* ContactSupport incorporado */}
            <ContactSupport
              supportOptions={supportOptions}
              modules={modules}
              onSubmit={handleSupportSubmit}
              estimatedResponseTime={24}
            />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-bg-300/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary-200 rounded-full animate-pulse"></div>
                <span className="text-sm text-text-200">
                  Centro de ayuda activo • {formatDate(time)}
                </span>
              </div>
              <p className="text-sm text-text-200/70">
                ¿No encuentras lo que buscas? Prueba nuestra búsqueda
                inteligente o contáctanos directamente.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
              >
                <Brain className="h-4 w-4 mr-2" />
                Ayuda con IA
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
              >
                <Download className="h-4 w-4 mr-2" />
                Guía PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
                onClick={() => setActiveTab("support")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Componente Play para el icono de video
const Play = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default Help;
