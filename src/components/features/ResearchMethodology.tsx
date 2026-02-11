// src/components/features/ResearchMethodology.tsx
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BookOpen,
  Search,
  FileText,
  Target,
  Cpu,
  Database,
  Code2,
  GitBranch,
  FlaskConical,
  Shield,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  PieChart,
  LineChart,
  BarChart3,
  Award,
  Clock,
  FileCheck,
  GraduationCap,
  Wrench,
  Sparkles,
  Layers,
  GitMerge,
  TestTube,
  Brain,
  TrendingUp,
  ShieldCheck,
  Cloud,
  Server,
  Terminal,
  Layout,
  Smartphone as Mobile,
  Laptop,
  Tablet,
  Network,
  Binary,
  CircuitBoard,
  ChevronRight,
  Cpu as CpuIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

const ResearchMethodology: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  // Fases basadas en el cuadro proporcionado
  const phases = [
    {
      id: 1,
      title: "FASE I: Planificación y Análisis",
      subtitle: "Metodología: Extreme Programming (Beck, 2005)",
      description:
        "Análisis de herramientas existentes y definición de requerimientos",
      icon: (
        <div className="relative">
          {/* Efecto de brillo exterior */}
          <div className="absolute -inset-2 bg-primary-200/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
          {/* Icono con gradiente */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-200 to-primary-300 shadow-lg shadow-primary-200/30 flex items-center justify-center">
            <Search className="h-6 w-6 text-white" />
          </div>
          {/* Partículas flotantes */}
          <div className="absolute -top-1 -right-1">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-30"></div>
              <div className="relative w-3 h-3 bg-primary-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ),
      iconEffect: "animate-pulse-glow",
      color: "from-primary-100 to-primary-200",
      objectives: [
        "Analizar las herramientas y métodos actuales utilizados para el control de finanzas personales",
        "Determinar los requerimientos funcionales y no funcionales necesarios",
      ],
      activities: [
        "Realización de entrevistas con usuarios",
        "Inspección de sistemas financieros existentes",
        "Identificación de requisitos de IA",
        "Release planning y definición de modelos de datos",
        "Estimación de duración del proyecto",
      ],
      resources: [
        "Documentación teórica",
        "Herramientas de análisis",
        "Figma para prototipado",
        "Lucidchart para diagramación",
      ],
      deliverables: [
        "Framework teórico integrado",
        "Especificación de requerimientos",
        "Modelos de datos iniciales",
        "Planificación del proyecto",
      ],
      status: "completed",
      progress: 100,
    },
    {
      id: 2,
      title: "FASE II: Diseño del Sistema",
      subtitle: "Arquitectura y Modelado (Beck, 2005)",
      description: "Diseño de la arquitectura lógica y física de la aplicación",
      icon: (
        <div className="relative">
          {/* Circuito animado alrededor */}
          <div className="absolute -inset-2">
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-primary-300 rounded-full animate-ping"></div>
            <div className="absolute bottom-0 right-1/2 w-1 h-1 bg-primary-300 rounded-full animate-ping animation-delay-300"></div>
          </div>
          {/* Icono con efecto de circuito */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 shadow-lg shadow-primary-100/30 flex items-center justify-center">
            <CircuitBoard className="h-6 w-6 text-white" />
          </div>
          {/* Puntos de conexión */}
          <div className="absolute -top-1 left-1/4 w-2 h-2 bg-accent-100 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 right-1/4 w-2 h-2 bg-primary-300 rounded-full animate-pulse animation-delay-500"></div>
        </div>
      ),
      iconEffect: "animate-spin-slow",
      color: "from-primary-200 to-primary-300",
      objectives: [
        "Diseñar la arquitectura lógica y física de la aplicación web para finanzas personales",
      ],
      activities: [
        "Revisión de los requerimientos establecidos",
        "Diseño de interfaces responsivas multidispositivo",
        "Realización de diagramas de flujo y ERD",
        "Definición de relaciones entre entidades",
        "Especificación de algoritmos de Machine Learning",
        "Diseño de arquitectura Backend/Frontend/ML",
      ],
      resources: [
        "Bocetos de modelados de pantallas",
        "MySQL Workbench para BD",
        "Figma para wireframes",
        "Jupyter Notebook para algoritmos ML",
      ],
      deliverables: [
        "Diagramas de arquitectura",
        "Diseños de interfaz responsiva",
        "Modelo de datos completo",
        "Especificación de algoritmos ML",
      ],
      status: "completed",
      progress: 100,
    },
    {
      id: 3,
      title: "FASE III: Desarrollo y Codificación",
      subtitle: "Implementación Ágil (Beck, 2005)",
      description: "Desarrollo de la aplicación web multidispositivo con IA",
      icon: (
        <div className="relative">
          {/* Efecto de código flotante */}
          <div className="absolute -inset-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary-300 rounded-full animate-float"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          {/* Icono con efecto terminal */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 shadow-lg shadow-primary-100/30 flex items-center justify-center">
            <Terminal className="h-6 w-6 text-white" />
          </div>
          {/* Indicador de ejecución */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
              <div className="relative w-3 h-3 bg-primary-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ),
      iconEffect: "animate-bounce-subtle",
      color: "from-accent-100 to-accent-200",
      objectives: ["Desarrollar la aplicación web multidispositivo"],
      activities: [
        "Selección de tecnologías adecuadas",
        "Uso de estándares de codificación",
        "Programación en parejas (Pair Programming)",
        "Desarrollo de algoritmos de Machine Learning",
        "Desarrollo de arquitectura del sistema",
        "Integración de APIs",
      ],
      resources: [
        "VSCode, Jupyter Notebook",
        "MySQL para gestión de BD",
        "React.js + TypeScript",
        "Python (Flask) para ML",
        "Git y GitHub para control de versiones",
      ],
      deliverables: [
        "Código fuente de la aplicación",
        "Modelos de ML entrenados",
        "APIs funcionales",
        "Base de datos implementada",
      ],
      status: "completed",
      progress: 100,
    },
    {
      id: 4,
      title: "FASE IV: Pruebas y Validación",
      subtitle: "Validación Experimental (Powell, 2001)",
      description: "Pruebas de rendimiento y validación de modelos",
      icon: (
        <div className="relative">
          {/* Efecto de burbujas de laboratorio */}
          <div className="absolute -inset-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-accent-100/30 rounded-full animate-float"
                style={{
                  left: `${15 + i * 25}%`,
                  top: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + i}s`,
                }}
              />
            ))}
          </div>
          {/* Icono con efecto científico */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-accent-100 to-accent-200 shadow-lg shadow-accent-100/30 flex items-center justify-center">
            <TestTube className="h-6 w-6 text-white" />
          </div>
          {/* Indicador de reacción */}
          <div className="absolute -top-2 -right-2">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-200 rounded-full animate-ping opacity-30"></div>
              <Sparkles className="h-4 w-4 text-accent-100" />
            </div>
          </div>
        </div>
      ),
      iconEffect: "animate-shake-subtle",
      color: "from-primary-300 to-accent-100",
      objectives: [
        "Demostrar la funcionalidad de la aplicación multidispositivo por medio de pruebas de rendimiento",
      ],
      activities: [
        "Pruebas de usabilidad multidispositivo",
        "Validación de modelos de IA",
        "Pruebas de integración",
        "Pruebas de seguridad",
      ],
      resources: [
        "Suite de pruebas (Jest)",
        "Datos de prueba sintéticos",
        "Dispositivos múltiples para testing",
        "Usuarios finales para validación",
      ],
      deliverables: [
        "Reporte de pruebas de usabilidad",
        "Métricas de validación de modelos",
        "Certificación de seguridad",
        "Documentación de bugs y mejoras",
      ],
      status: "in-progress",
      progress: 85,
    },
    {
      id: 5,
      title: "FASE V: Documentación y Despliegue",
      subtitle: "Documentación Académica (Kendall y Kendall, 1997)",
      description: "Documentación técnica y manual de usuario",
      icon: (
        <div className="relative">
          {/* Efecto de páginas volando */}
          <div className="absolute -inset-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-1 bg-primary-300/40 rounded-sm animate-float"
                style={{
                  left: `${10 + i * 30}%`,
                  top: `${15 + i * 20}%`,
                  animationDelay: `${i * 0.4}s`,
                  transform: `rotate(${i * 15}deg)`,
                }}
              />
            ))}
          </div>
          {/* Icono con efecto libro */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-200 to-primary-300 shadow-lg shadow-primary-200/30 flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          {/* Indicador de aprobación */}
          <div className="absolute -bottom-2 -right-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
              <CheckCircle className="h-4 w-4 text-primary-200" />
            </div>
          </div>
        </div>
      ),
      iconEffect: "animate-page-flip",
      color: "from-accent-200 to-primary-100",
      objectives: [
        "Explicar el funcionamiento de la aplicación web a través de un manual de usuario intuitivo",
      ],
      activities: [
        "Redacción de manual de usuario",
        "Documentación técnica completa",
        "Documentación de modelos de IA",
        "Despliegue en ambiente de producción",
      ],
      resources: [
        "Microsoft Word para documentación",
        "LaTeX para documentación técnica",
        "GitHub Wiki para colaboración",
        "Servidores de producción",
      ],
      deliverables: [
        "Manual de usuario completo",
        "Documentación técnica detallada",
        "Paper académico",
        "Aplicación desplegada en producción",
      ],
      status: "pending",
      progress: 30,
    },
  ];

  const togglePhase = (id: number) => {
    setExpandedPhase(expandedPhase === id ? null : id);
  };

  // Métodos de investigación con iconos mejorados
  const researchMethods = [
    {
      title: "Metodología XP",
      description: "Extreme Programming (Beck, 2005) para desarrollo ágil",
      icon: (
        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-primary-100/30 to-primary-200/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 shadow-xl shadow-primary-100/30 flex items-center justify-center">
            <div className="relative">
              <GitMerge className="h-8 w-8 text-white animate-spin-slow" />
              {/* Efecto de ramificación */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-300 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary-300 rounded-full animate-pulse animation-delay-300"></div>
            </div>
          </div>
        </div>
      ),
      color: "from-primary-100 to-primary-200",
      features: [
        "Pair Programming",
        "Release Planning",
        "Testing continuo",
        "Integración continua",
      ],
    },
    {
      title: "Validación Experimental",
      description:
        "Pruebas controladas (Powell, 2001) para validación científica",
      icon: (
        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-primary-200/30 to-primary-300/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-200 to-primary-300 shadow-xl shadow-primary-200/30 flex items-center justify-center">
            <div className="relative">
              <ShieldCheck className="h-8 w-8 text-white animate-pulse-glow" />
              {/* Efecto de escudo protector */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      ),
      color: "from-primary-200 to-primary-300",
      features: [
        "Pruebas A/B",
        "Validación estadística",
        "Métricas de precisión",
        "Análisis de resultados",
      ],
    },
    {
      title: "Documentación Científica",
      description: "Metodología estructurada (Kendall y Kendall, 1997)",
      icon: (
        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-accent-100/30 to-accent-200/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 shadow-xl shadow-accent-100/30 flex items-center justify-center">
            <div className="relative">
              <FileCheck className="h-8 w-8 text-white" />
              {/* Efecto de checklist animado */}
              <div className="absolute -top-2 -right-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30"></div>
                  <CheckCircle className="h-4 w-4 text-green-300 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      color: "from-accent-100 to-accent-200",
      features: [
        "Manuales de usuario",
        "Documentación técnica",
        "Papers académicos",
        "Repositorios públicos",
      ],
    },
  ];

  // Iconos para multidisciplinariedad
  const disciplineIcons = [
    {
      icon: <CpuIcon className="h-8 w-8" />,
      color: "from-primary-100 to-primary-200",
      label: "Software",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      color: "from-primary-200 to-primary-300",
      label: "IA",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      color: "from-accent-100 to-accent-200",
      label: "Economía",
    },
    {
      icon: <Layout className="h-8 w-8" />,
      color: "from-primary-300 to-accent-100",
      label: "UX/UI",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6">
      {/* Header con efectos */}
      <div className="text-center mb-16 relative">
        {/* Efectos de fondo animados */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-primary-300/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-20 right-1/4 w-24 h-24 bg-accent-100/5 rounded-full blur-2xl animate-pulse-glow animation-delay-2000"></div>

        <div className="inline-flex items-center gap-4 mb-6 relative flex-col sm:flex-row">
          {/* Icono decorativo izquierdo */}
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary-100/20 to-primary-200/10 rounded-full blur-lg"></div>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <Award className="h-5 w-5 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-text-100 text-center sm:text-left">
            Metodología de
            <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent ml-3">
              Investigación
            </span>
          </h2>

          {/* Icono decorativo derecho */}
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary-300/20 to-accent-100/10 rounded-full blur-lg"></div>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-300 to-accent-100 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        <p className="text-text-200 text-base sm:text-lg max-w-3xl mx-auto mb-8 px-4">
          Proceso sistemático basado en metodologías ágiles (XP), validación
          experimental y documentación científica
        </p>

        {/* Badge de metodología con efectos */}
        <div className="inline-flex items-center mt-6 px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-primary-100/20 to-primary-300/10 border border-primary-300/30 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
          <div className="relative mr-3">
            <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-5 h-5 bg-gradient-to-br from-primary-100 to-primary-300 rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
          <span className="text-sm font-semibold text-primary-300">
            Metodología XP + Validación Experimental
          </span>
          <ChevronRight className="ml-2 h-4 w-4 text-primary-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>

      {/* Timeline vertical mejorada */}
      <div className="relative max-w-6xl mx-auto">
        {/* Línea central con partículas flotantes - solo visible en desktop */}
        <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-100/40 via-primary-200/60 to-accent-200/40 rounded-full"></div>
          {/* Partículas en la línea */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-300 rounded-full animate-float"
              style={{
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          ))}
        </div>

        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className={cn(
              "relative mb-12",
              index % 2 === 0
                ? "md:pr-[calc(50%+2rem)] md:pl-0"
                : "md:pl-[calc(50%+2rem)] md:pr-0",
            )}
            onMouseEnter={() => setHoveredIcon(phase.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            {/* Punto en la línea con efectos */}
            <div
              className={cn(
                "absolute top-6 w-6 h-6 rounded-full border-4 border-neutral-900 z-20 transition-all duration-300 hidden md:block",
                "md:left-1/2 md:transform md:-translate-x-1/2",
                phase.status === "completed" &&
                  "bg-green-500 shadow-lg shadow-green-500/40",
                phase.status === "in-progress" &&
                  "bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50",
                phase.status === "pending" && "bg-gray-500",
                hoveredIcon === phase.id && "scale-125",
              )}
            >
              {/* Anillo exterior animado */}
              <div
                className={cn(
                  "absolute -inset-3 rounded-full transition-all duration-500",
                  phase.status === "completed" &&
                    "border-2 border-green-400/30 animate-ping",
                  phase.status === "in-progress" &&
                    "border-2 border-yellow-400/40 animate-ping",
                  hoveredIcon === phase.id && "scale-150 opacity-0",
                )}
              ></div>
            </div>

            {/* Líneas de conexión animadas - solo mobile */}
            <div
              className={cn(
                "absolute top-6 h-0.5 bg-gradient-to-r from-primary-300/30 to-transparent transition-all duration-500 md:hidden",
                index % 2 === 0 ? "left-6 right-0" : "left-0 right-6",
                hoveredIcon === phase.id &&
                  "bg-gradient-to-r from-primary-300 to-primary-200",
              )}
            ></div>

            {/* Card con diseño premium */}
            <Card
              className={cn(
                "border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm",
                "border border-primary-300/20 hover:border-primary-300/40",
                "transition-all duration-300 cursor-pointer group",
                "shadow-xl hover:shadow-2xl hover:shadow-primary-100/25",
                expandedPhase === phase.id &&
                  "ring-2 ring-primary-300/40 from-bg-200 to-bg-300 scale-[1.02]",
                "transform hover:-translate-y-1",
              )}
              onClick={() => togglePhase(phase.id)}
            >
              {/* Header con gradiente sutil */}
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Icono con efectos especiales */}
                    <div
                      className={cn(
                        "transition-all duration-500",
                        hoveredIcon === phase.id && "scale-110",
                      )}
                    >
                      {phase.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge
                          className={cn(
                            "text-xs font-semibold transition-all duration-300",
                            phase.status === "completed" &&
                              "bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30",
                            phase.status === "in-progress" &&
                              "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30",
                            phase.status === "pending" &&
                              "bg-gray-500/20 text-gray-300 border-gray-500/30 hover:bg-gray-500/30",
                          )}
                        >
                          {phase.status === "completed"
                            ? "✓ Completado"
                            : phase.status === "in-progress"
                              ? "⏳ En Progreso"
                              : "📅 Pendiente"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-primary-300/30 text-primary-300 text-xs hover:bg-primary-300/10"
                        >
                          Fase {phase.id}
                        </Badge>
                      </div>

                      <CardTitle className="text-lg sm:text-xl text-text-100 group-hover:text-primary-300 transition-colors duration-300">
                        {phase.title}
                      </CardTitle>

                      <div className="flex items-center mt-2 text-sm text-primary-300/80 group-hover:text-primary-300 transition-colors duration-300">
                        <div className="mr-2 p-1 rounded bg-primary-300/10">
                          <GraduationCap className="h-3 w-3" />
                        </div>
                        {phase.subtitle}
                      </div>

                      <p className="text-text-200 mt-3 text-sm group-hover:text-text-100 transition-colors duration-300">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary-300/10 group-hover:scale-110 transition-all duration-300 hidden sm:flex"
                  >
                    {expandedPhase === phase.id ? (
                      <ChevronUp className="h-5 w-5 text-primary-300 group-hover:animate-bounce" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary-300 group-hover:animate-bounce" />
                    )}
                  </Button>
                </div>

                {/* Barra de progreso con efectos */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-200/60">
                      Progreso de Implementación
                    </span>
                    <span className="font-semibold text-primary-300 flex items-center">
                      {phase.progress}%
                      <div className="ml-2 relative">
                        <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                        <div className="relative w-2 h-2 bg-primary-300 rounded-full"></div>
                      </div>
                    </span>
                  </div>
                  <div className="h-2.5 bg-bg-300/50 rounded-full overflow-hidden relative">
                    {/* Efecto de brillo en la barra */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                    <div
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r transition-all duration-1000",
                        phase.color,
                        hoveredIcon === phase.id &&
                          "shadow-lg shadow-primary-300/30",
                      )}
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>
              </CardHeader>

              {/* Contenido expandido */}
              {expandedPhase === phase.id && (
                <CardContent className="border-t border-primary-300/20 pt-6 space-y-8">
                  {/* Objetivos con iconos */}
                  <div>
                    <h4 className="font-semibold text-text-100 mb-4 flex items-center">
                      <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                        <Target className="h-5 w-5 text-primary-300" />
                      </div>
                      Objetivos Específicos
                    </h4>
                    <div className="space-y-3">
                      {phase.objectives.map((objective, idx) => (
                        <div
                          key={idx}
                          className="flex items-start p-4 rounded-xl bg-gradient-to-r from-primary-100/10 to-primary-300/5 border border-primary-300/10 hover:border-primary-300/20 transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div className="mr-3 mt-1">
                            <div className="relative">
                              <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                              <div className="relative w-3 h-3 bg-primary-300 rounded-full"></div>
                            </div>
                          </div>
                          <span className="text-sm text-text-200 flex-1">
                            {objective}
                          </span>
                          <ChevronRight className="h-4 w-4 text-primary-300/50 ml-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grid de información con iconos */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Actividades */}
                    <div>
                      <h4 className="font-semibold text-text-100 mb-4 flex items-center">
                        <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                          <Zap className="h-5 w-5 text-primary-300" />
                        </div>
                        Actividades Principales
                      </h4>
                      <ul className="space-y-3">
                        {phase.activities.map((activity, idx) => (
                          <li
                            key={idx}
                            className="flex items-start group/activity hover:translate-x-1 transition-transform duration-300"
                          >
                            <div className="mr-3 mt-1 relative">
                              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-0 group-hover/activity:opacity-20 transition-opacity duration-300"></div>
                              <CheckCircle className="h-4 w-4 text-green-400 relative" />
                            </div>
                            <span className="text-sm text-text-200/80 flex-1">
                              {activity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recursos */}
                    <div>
                      <h4 className="font-semibold text-text-100 mb-4 flex items-center">
                        <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                          <Wrench className="h-5 w-5 text-primary-300" />
                        </div>
                        Recursos Utilizados
                      </h4>
                      <div className="space-y-3">
                        {phase.resources.map((resource, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-bg-300/20 hover:bg-bg-300/30 border border-bg-300/40 hover:border-primary-300/20 transition-all duration-300 group/resource"
                          >
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-primary-300 mr-3 group-hover/resource:animate-pulse"></div>
                              <span className="text-sm text-text-200/80 flex-1">
                                {resource}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Entregables */}
                    <div>
                      <h4 className="font-semibold text-text-100 mb-4 flex items-center">
                        <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                          <FileCheck className="h-5 w-5 text-primary-300" />
                        </div>
                        Entregables
                      </h4>
                      <ul className="space-y-3">
                        {phase.deliverables.map((deliverable, idx) => (
                          <li
                            key={idx}
                            className="flex items-start group/deliverable"
                          >
                            <div className="mr-3 mt-1">
                              <div className="relative">
                                <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-0 group-hover/deliverable:opacity-20 transition-opacity duration-300"></div>
                                <div className="relative w-3 h-3 bg-primary-300 rounded-full"></div>
                              </div>
                            </div>
                            <span className="text-sm text-text-200/80 flex-1 group-hover/deliverable:text-text-100 transition-colors duration-300">
                              {deliverable}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Referencias bibliográficas con efecto libro */}
                  <div className="p-5 rounded-xl bg-gradient-to-br from-primary-100/15 to-primary-300/10 border border-primary-300/20 hover:border-primary-300/30 transition-all duration-300">
                    <h4 className="font-semibold text-text-100 mb-4 flex items-center">
                      <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                        <BookOpen className="h-5 w-5 text-primary-300" />
                      </div>
                      Referencias Bibliográficas
                    </h4>
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10 mr-4">
                        <FileText className="h-6 w-6 text-primary-300" />
                      </div>
                      <p className="text-sm text-text-200/80">
                        {phase.id === 1 || phase.id === 2 || phase.id === 3
                          ? "Beck, K. (2005). Extreme Programming Explained: Embrace Change."
                          : phase.id === 4
                            ? "Powell, T. A. (2001). Web Site Engineering."
                            : "Kendall, K. E., & Kendall, J. E. (1997). Systems Analysis and Design."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        ))}
      </div>

      {/* Metodologías aplicadas */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">
            <span className="text-text-100">Metodologías</span>
            <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent ml-3">
              Aplicadas
            </span>
          </h3>
          <p className="text-text-200 max-w-3xl mx-auto px-4">
            Combinación de metodologías ágiles, validación experimental y
            documentación científica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {researchMethods.map((method, idx) => (
            <Card
              key={idx}
              className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-primary-300/20 hover:border-primary-300/40 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-100/20"
            >
              <CardHeader className="flex flex-col items-center">
                {method.icon}
                <CardTitle className="text-center text-lg text-text-100 mt-4">
                  {method.title}
                </CardTitle>
                <p className="text-center text-text-200/80 text-sm mt-2 px-4">
                  {method.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {method.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-center text-sm text-text-200/80 group/feature hover:text-text-100 transition-colors duration-300"
                    >
                      <div className="mr-3 relative">
                        <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-0 group-hover/feature:opacity-20 transition-opacity duration-300"></div>
                        <div className="relative w-2 h-2 rounded-full bg-primary-300"></div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enfoque multidisciplinario con iconos animados */}
      <Card className="mt-16 border-0 bg-gradient-to-br from-primary-100/15 to-primary-300/10 backdrop-blur-sm border-l-4 border-l-primary-300 shadow-xl hover:shadow-2xl hover:shadow-primary-300/20 transition-all duration-500">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h4 className="text-xl sm:text-2xl font-bold text-text-100 mb-4">
                Enfoque{" "}
                <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent">
                  Multidisciplinario
                </span>
              </h4>
              <p className="text-text-200 mb-8">
                Esta investigación integra conocimientos de Ingeniería de
                Software, Inteligencia Artificial, Economía Conductual y Diseño
                Centrado en el Usuario para crear una solución completa y
                efectiva.
              </p>

              {/* Iconos de disciplinas en grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {disciplineIcons.map((disc, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 border border-primary-300/10 hover:border-primary-300/30 transition-all duration-300 group/disc hover:scale-105"
                  >
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${disc.color} flex items-center justify-center mb-3 shadow-lg group-hover/disc:shadow-xl group-hover/disc:shadow-primary-300/30 transition-all duration-300`}
                    >
                      <div className="text-white">{disc.icon}</div>
                    </div>
                    <span className="text-sm font-medium text-text-100">
                      {disc.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Icono central animado */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Anillos concéntricos */}
                <div className="absolute -inset-8 sm:-inset-8">
                  <div className="absolute inset-0 border-4 border-primary-300/10 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-4 border-4 border-primary-200/15 rounded-full animate-spin-slow animation-delay-1000 reverse"></div>
                  <div className="absolute inset-8 border-4 border-primary-100/20 rounded-full animate-spin-slow animation-delay-2000"></div>
                </div>

                {/* Icono central con efecto de conexión */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center shadow-2xl shadow-primary-300/40">
                  <div className="relative">
                    <Network className="h-16 w-16 sm:h-20 sm:w-20 text-white animate-pulse" />

                    {/* Puntos de conexión animados */}
                    <div className="absolute -top-2 -left-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-30"></div>
                        <div className="relative w-4 h-4 bg-primary-300 rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary-200 rounded-full animate-ping opacity-30 animation-delay-300"></div>
                        <div className="relative w-4 h-4 bg-primary-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -left-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-accent-100 rounded-full animate-ping opacity-30 animation-delay-600"></div>
                        <div className="relative w-4 h-4 bg-accent-100 rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-accent-200 rounded-full animate-ping opacity-30 animation-delay-900"></div>
                        <div className="relative w-4 h-4 bg-accent-200 rounded-full"></div>
                      </div>
                    </div>

                    {/* Líneas de conexión animadas */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-primary-300 to-transparent animate-shimmer"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-1 bg-gradient-to-l from-primary-200 to-transparent animate-shimmer animation-delay-500"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 sm:h-32 w-1 bg-gradient-to-b from-accent-100 to-transparent animate-shimmer animation-delay-1000"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 sm:h-32 w-1 bg-gradient-to-t from-accent-200 to-transparent animate-shimmer animation-delay-1500"></div>
                    </div>
                  </div>
                </div>

                {/* Iconos flotantes alrededor */}
                <div className="absolute -top-4 -left-4 animate-float hidden sm:block">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100/80 to-primary-200/80 flex items-center justify-center shadow-lg">
                    <Server className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 animate-float animation-delay-1000 hidden sm:block">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-200/80 to-primary-300/80 flex items-center justify-center shadow-lg">
                    <Binary className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 animate-float animation-delay-2000 hidden sm:block">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-100/80 to-accent-200/80 flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 animate-float animation-delay-3000 hidden sm:block">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-300/80 to-accent-100/80 flex items-center justify-center shadow-lg">
                    <Layout className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dispositivos compatibles con animaciones */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">
            <span className="text-text-100">Compatibilidad</span>
            <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent ml-3">
              Multidispositivo
            </span>
          </h3>
          <p className="text-text-200 max-w-3xl mx-auto px-4">
            Diseño responsivo optimizado para todos los dispositivos modernos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              device: "Mobile",
              icon: (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary-100/20 to-primary-200/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative w-20 h-32 rounded-[2rem] bg-gradient-to-b from-bg-200 to-bg-300 border-[12px] border-bg-300 shadow-2xl shadow-primary-200/20 group-hover:shadow-primary-300/30 transition-all duration-500 group-hover:scale-105">
                    <div className="w-full h-8 bg-bg-300 rounded-t-[1.8rem] flex items-center justify-center">
                      <div className="w-10 h-1 bg-text-100/30 rounded-full"></div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="h-6 rounded-lg bg-gradient-to-br from-primary-300/20 to-primary-100/10"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Mobile className="absolute -top-4 -right-4 h-8 w-8 text-primary-300 animate-bounce-subtle" />
                </div>
              ),
              description: "Optimizado para iOS & Android",
              color: "from-primary-100 to-primary-200",
            },
            {
              device: "Tablet",
              icon: (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary-200/20 to-primary-300/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative w-32 h-40 rounded-2xl bg-gradient-to-b from-bg-200 to-bg-300 border-[14px] border-bg-300 shadow-2xl shadow-primary-200/20 group-hover:shadow-primary-300/30 transition-all duration-500 group-hover:scale-105">
                    <div className="w-full h-10 bg-bg-300 rounded-t-xl flex items-center justify-center">
                      <div className="w-12 h-1 bg-text-100/30 rounded-full"></div>
                    </div>
                    <div className="p-4">
                      <div className="h-24 rounded-xl bg-gradient-to-br from-primary-300/10 to-primary-100/5 border border-primary-300/20"></div>
                    </div>
                  </div>
                  <Tablet className="absolute -bottom-4 -right-4 h-8 w-8 text-primary-300 animate-bounce-subtle animation-delay-500" />
                </div>
              ),
              description: "iPad & Android Tablets",
              color: "from-primary-200 to-primary-300",
            },
            {
              device: "Desktop",
              icon: (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary-300/20 to-accent-100/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative w-40 h-32 rounded-xl bg-gradient-to-b from-bg-200 to-bg-300 border-[8px] border-bg-300 shadow-2xl shadow-primary-200/20 group-hover:shadow-primary-300/30 transition-all duration-500 group-hover:scale-105">
                    <div className="w-full h-6 bg-bg-300 rounded-t-lg flex items-center justify-between px-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      </div>
                      <div className="w-24 h-1 bg-text-100/30 rounded-full"></div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-2">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="h-8 rounded-lg bg-gradient-to-br from-primary-100/15 to-primary-300/5"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Monitor className="absolute -top-4 -left-4 h-8 w-8 text-primary-300 animate-bounce-subtle animation-delay-1000" />
                </div>
              ),
              description: "Todos los navegadores modernos",
              color: "from-primary-300 to-accent-100",
            },
          ].map((device, idx) => (
            <Card
              key={idx}
              className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-primary-300/20 hover:border-primary-300/40 transition-all duration-300 group hover:scale-[1.02]"
            >
              <CardContent className="p-6 flex flex-col items-center">
                {device.icon}
                <h4 className="text-lg font-bold text-text-100 mt-6 mb-2">
                  {device.device}
                </h4>
                <p className="text-text-200/80 text-sm text-center">
                  {device.description}
                </p>
                <div className="mt-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary-100/10 to-primary-200/5 border border-primary-300/20 text-xs text-primary-300">
                  Optimizado
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Animaciones CSS adicionales para los iconos
const styles = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-slow-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; box-shadow: 0 0 20px currentColor; }
  50% { opacity: 0.8; box-shadow: 0 0 40px currentColor; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes shake-subtle {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

@keyframes page-flip {
  0% { transform: rotateY(0); }
  50% { transform: rotateY(10deg); }
  100% { transform: rotateY(0); }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-spin-slow.reverse {
  animation: spin-slow-reverse 15s linear infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-shake-subtle {
  animation: shake-subtle 0.5s ease-in-out infinite;
}

.animate-page-flip {
  animation: page-flip 3s ease-in-out infinite;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-1000 {
  animation-delay: 1000ms;
}

.animation-delay-1500 {
  animation-delay: 1500ms;
}

.animation-delay-2000 {
  animation-delay: 2000ms;
}

.animation-delay-3000 {
  animation-delay: 3000ms;
}
`;

// Añadir estilos al documento
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default ResearchMethodology;
