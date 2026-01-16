import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Award,
  Clock,
  TrendingUp,
  Zap,
  Lightbulb,
  ChevronRight,
  CheckCircle,
  PlayCircle,
  BarChart3,
  Target,
  Home,
  CreditCard,
  Settings,
  LucideIcon,
} from "lucide-react";
import { Module } from "../../data/helpData";

export interface PopularGuide {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: string;
}

interface HelpDashboardProps {
  selectedModule: string;
  userProgress: {
    level: string;
    points: number;
    suggestions?: string[];
    tutorialsCompleted: number;

    totalTutorials: number;
    helpSessions: number;
  };
  popularGuides: PopularGuide[];
  modules: Module[];
  onSelectModule: (moduleId: string) => void;
  onSelectGuide?: (guideId: number) => void;
  onViewAllTutorials: () => void;
}

const HelpDashboard: React.FC<HelpDashboardProps> = ({
  selectedModule,
  userProgress,
  onSelectModule,
  onViewAllTutorials,
}) => {
  // Módulos de la aplicación
  const modules = [
    { id: "dashboard", name: "Dashboard", icon: Home, color: "#61bc84" },
    {
      id: "transactions",
      name: "Transacciones",
      icon: CreditCard,
      color: "#8FBC8F",
    },
    { id: "budgets", name: "Presupuestos", icon: TrendingUp, color: "#2E8B57" },
    { id: "goals", name: "Mis Metas", icon: Target, color: "#345e37" },
    { id: "analytics", name: "Analítica", icon: BarChart3, color: "#c6ffe6" },
    { id: "settings", name: "Configuración", icon: Settings, color: "#e0e0e0" },
  ];

  // Tutoriales destacados
  const featuredTutorials = [
    {
      id: 1,
      title: "Primeros 5 minutos",
      description: "Configuración inicial y tour rápido de la plataforma",
      icon: Zap,
      duration: "5 min",
      completed: true,
      difficulty: "Fácil",
    },
    {
      id: 2,
      title: "Dominar el Dashboard",
      description: "Personaliza y entiende todas las métricas principales",
      icon: Home,
      duration: "10 min",
      completed: true,
      difficulty: "Intermedio",
    },
    {
      id: 3,
      title: "Presupuesto Perfecto",
      description:
        "Crea y gestiona presupuestos inteligentes que se ajustan a ti",
      icon: TrendingUp,
      duration: "15 min",
      completed: false,
      difficulty: "Intermedio",
    },
    {
      id: 4,
      title: "Metas Inteligentes",
      description: "Planifica y alcanza tus objetivos financieros paso a paso",
      icon: Target,
      duration: "12 min",
      completed: false,
      difficulty: "Intermedio",
    },
  ];

  // Progreso porcentual
  const progressPercentage = Math.round(
    (userProgress.tutorialsCompleted / userProgress.totalTutorials) * 100
  );

  return (
    <div className="space-y-8">
      {/* Tarjeta de Progreso de Aprendizaje */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 via-bg-200/40 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl overflow-hidden group hover:border-primary-200/30 transition-all duration-500">
        {/* Efecto decorativo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/10 to-primary-200/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700"></div>

        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-200/20 group-hover:scale-105 transition-transform duration-300">
                <Award className="h-7 w-7 text-primary-200" />
              </div>
              <div>
                <CardTitle className="text-text-100 text-2xl">
                  Tu Progreso de Aprendizaje
                </CardTitle>
                <CardDescription className="text-text-200">
                  Continúa aprendiendo para dominar todas las funciones
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-primary-100 to-primary-200 text-white border-0 animate-pulse">
              {progressPercentage}%
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="space-y-6">
            {/* Barra de progreso principal */}
            <div>
              <div className="flex justify-between text-sm text-text-200 mb-3">
                <span>Tutoriales completados</span>
                <span>
                  {userProgress.tutorialsCompleted} de{" "}
                  {userProgress.totalTutorials}
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-2.5 bg-bg-300/50 overflow-hidden"
              >
                <div className="h-full bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 transition-all duration-1000 ease-out rounded-full"></div>
              </Progress>
            </div>

            {/* Mini estadísticas */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-100">
                      Completados
                    </div>
                    <div className="text-xs text-text-200/70">
                      {userProgress.tutorialsCompleted}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <Clock className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-100">
                      En progreso
                    </div>
                    <div className="text-xs text-text-200/70">
                      {userProgress.totalTutorials -
                        userProgress.tutorialsCompleted}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-100">Puntos</div>
                    <div className="text-xs text-text-200/70">
                      {userProgress.points}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Módulos */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-100 flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary-200 animate-pulse" />
              Ayuda por Módulo
            </h2>
            <p className="text-text-200/70 mt-1">
              Selecciona un módulo para ver guías específicas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {modules.map((module) => (
            <Card
              key={module.id}
              className={`border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border transition-all duration-500 cursor-pointer group hover:scale-[1.02] ${
                selectedModule === module.id || selectedModule === "all"
                  ? "border-primary-200/40 shadow-lg shadow-primary-200/10"
                  : "border-bg-300/40 hover:border-primary-200/30"
              }`}
              onClick={() => onSelectModule(module.id)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100/10 to-primary-200/5 rounded-xl blur-md group-hover:blur-lg transition-all duration-500"></div>
                  <div
                    className="relative p-3 rounded-xl border group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: `${module.color}15`,
                      borderColor: `${module.color}30`,
                    }}
                  >
                    <module.icon
                      className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12"
                      style={{ color: module.color }}
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-text-100 mb-1 group-hover:text-primary-200 transition-colors">
                  {module.name}
                </h3>
                <p className="text-xs text-text-200/60">Guías y tutoriales</p>

                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-center text-xs text-primary-200">
                    <span>Ver ayuda</span>
                    <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tutoriales Destacados */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-100 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-primary-200" />
            Tutoriales Destacados
          </h2>
          <Button
            variant="outline"
            className="border-primary-200/40 text-primary-200 hover:bg-primary-100/10 group"
            onClick={onViewAllTutorials}
          >
            Ver todos
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTutorials.map((tutorial) => (
            <Card
              key={tutorial.id}
              className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl hover:shadow-2xl hover:border-primary-200/30 transition-all duration-500 overflow-hidden group"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      tutorial.completed
                        ? "bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/20"
                        : "bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-200/20"
                    } group-hover:scale-105 transition-transform duration-300`}
                  >
                    <tutorial.icon
                      className={`h-6 w-6 ${
                        tutorial.completed
                          ? "text-green-400"
                          : "text-primary-200"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-text-100 text-lg group-hover:text-primary-200 transition-colors">
                        {tutorial.title}
                      </h3>
                      <Badge
                        className={
                          tutorial.completed
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-primary-100/20 text-primary-200 border-primary-100/30"
                        }
                      >
                        {tutorial.duration}
                      </Badge>
                    </div>

                    <p className="text-text-200/80 mb-4">
                      {tutorial.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-xs">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              tutorial.difficulty === "Fácil"
                                ? "bg-green-500"
                                : tutorial.difficulty === "Intermedio"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <span className="text-text-200/70">
                            {tutorial.difficulty}
                          </span>
                        </div>

                        {tutorial.completed && (
                          <div className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle className="h-3 w-3" />
                            <span>Completado</span>
                          </div>
                        )}
                      </div>

                      <Button
                        size="sm"
                        className={`${
                          tutorial.completed
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "bg-gradient-to-r from-primary-100 to-primary-200 text-white hover:from-primary-200 hover:to-primary-300"
                        } group/btn`}
                      >
                        {tutorial.completed ? "Repasar" : "Comenzar"}
                        <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sección de Logros */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-text-100 text-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100/30 to-primary-200/20">
              <PlayCircle className="h-5 w-5 text-primary-200" />
            </div>
            <span>Próximos Logros</span>
          </CardTitle>
          <CardDescription className="text-text-200">
            Desbloquea recompensas completando tutoriales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Principiante Financiero",
                description: "Completa 3 tutoriales básicos",
                progress: 66,
              },
              {
                title: "Usuario Avanzado",
                description: "Domina todas las funciones principales",
                progress: 33,
              },
              {
                title: "Experto en IA",
                description: "Completa módulos de analítica predictiva",
                progress: 10,
              },
            ].map((achievement, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-text-100">
                    {achievement.title}
                  </div>
                  <div className="text-xs text-text-200/70">
                    {achievement.progress}%
                  </div>
                </div>
                <Progress
                  value={achievement.progress}
                  className="h-1.5 bg-bg-300/50"
                >
                  <div className="h-full bg-gradient-to-r from-primary-100 to-primary-200 rounded-full"></div>
                </Progress>
                <div className="text-xs text-text-200/60">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpDashboard;
