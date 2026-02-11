// src/components/features/FeaturesLayout.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import {
  Brain,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Github,
  GraduationCap,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  ArrowRight,
  Home,
  CreditCard,
  BarChart3,
  Target,
  Zap,
  ShieldCheck,
  Cpu,
  Database,
  BookOpen,
  Award,
  Users,
  Globe,
  FileText,
  CheckCircle,
  LineChart,
  PieChart,
  Filter,
  Download,
  Calendar,
  Bell,
  Lightbulb,
  Eye,
} from "lucide-react";
import FeaturesHero from "./FeaturesHero";
import ResearchMethodology from "./ResearchMethodology";
import FeatureCategory from "./FeatureCategory";
import FeatureDetail from "./FeatureDetail";
import FeaturesStats from "./FeaturesStats";
import MLDemo from "./MLDemo";

const FeaturesLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  // Efecto para detectar sección activa en scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "methodology",
        "categories",
        "details",
        "demos",
        "stats",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Funciones de navegación
  const handleNavigateToHome = () => {
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToGithub = () => {
    window.open(
      "https://github.com/juandgg1611/React-Interactive-Dashboard",
      "_blank",
    );
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToUniversity = () => {
    window.open("https://www.urbe.edu/", "_blank");
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Componentes de navegación
  const NavigationItems = [
    {
      id: "methodology",
      label: "Metodología",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "categories",
      label: "Categorías",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    { id: "details", label: "Detalles", icon: <Cpu className="h-4 w-4" /> },
    { id: "demos", label: "Demos", icon: <Eye className="h-4 w-4" /> },
    { id: "stats", label: "Resultados", icon: <Award className="h-4 w-4" /> },
  ];

  // Mobile Menu Component
  const MobileMenu = () => {
    useEffect(() => {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isMobileMenuOpen]);

    return (
      <>
        {/* Botón hamburguesa con efectos espectaculares */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed top-6 right-4 z-50 p-3 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 text-white shadow-2xl shadow-primary-200/30 hover:shadow-primary-300/40 transition-all duration-500 transform hover:scale-110 active:scale-95 group backdrop-blur-md border border-primary-300/30"
          aria-label="Menú de navegación"
        >
          <div className="relative">
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-300 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Icono animado */}
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 relative z-10 transition-all duration-500 rotate-180 scale-125" />
            ) : (
              <Menu className="h-6 w-6 relative z-10 transition-all duration-300 group-hover:rotate-90" />
            )}
          </div>

          {/* Indicadores animados */}
          <div className="absolute -top-1 -right-1">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
              <div className="relative w-3 h-3 bg-accent-200 rounded-full"></div>
            </div>
          </div>
        </button>

        {/* Overlay con efectos */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out",
            isMobileMenuOpen
              ? "opacity-100 visible backdrop-blur-sm"
              : "opacity-0 invisible pointer-events-none",
          )}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />

          {/* Partículas en el fondo */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary-300/20 rounded-full animate-float"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${8 + Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Sidebar con diseño premium */}
        <div
          className={cn(
            "lg:hidden fixed inset-y-0 right-0 z-50 w-80 transform transition-all duration-500 ease-in-out",
            isMobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fondo del sidebar */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-neutral-900/95 backdrop-blur-xl border-l border-primary-300/30 shadow-2xl shadow-black/50">
            {/* Línea de luz lateral */}
            <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-primary-100 via-primary-300 to-primary-200 opacity-60" />

            {/* Efecto de brillo interno */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-300/10 via-transparent to-accent-100/5" />
          </div>

          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="p-6 pt-8 border-b border-primary-300/20">
              <div className="flex items-center space-x-3 mb-4">
                {/* Logo con efectos */}
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-300 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-100/30 group-hover:shadow-primary-300/40 transition-all duration-300">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-300 rounded-full animate-pulse" />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-text-100">
                    FinanzasIA
                  </h2>
                  <p className="text-sm text-primary-300/80 flex items-center">
                    <span className="w-2 h-2 bg-primary-300 rounded-full mr-2 animate-pulse" />
                    Características
                  </p>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-primary-300/10 hover:bg-primary-300/20 transition-colors duration-300 hover:scale-110"
                >
                  <X className="h-5 w-5 text-primary-300" />
                </button>
              </div>

              {/* Estado del sistema */}
              <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-primary-100/15 to-primary-300/10 border border-primary-300/20 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                      <div className="relative w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-xs text-text-100/90">
                      Sistema Activo
                    </span>
                  </div>
                  <span className="text-xs font-medium text-primary-300 bg-primary-300/10 px-2 py-1 rounded-full">
                    v2.1.0
                  </span>
                </div>
              </div>
            </div>

            {/* Navegación */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-text-200/60 uppercase tracking-wider mb-4 px-2">
                  Explorar Secciones
                </h3>

                {NavigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-text-100 hover:text-primary-300 hover:bg-primary-300/10 group rounded-xl py-5 mb-2 transition-all duration-300",
                      activeSection === item.id &&
                        "bg-gradient-to-r from-primary-100/20 to-primary-200/20 text-primary-300",
                    )}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <div className="relative flex items-center w-full">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center mr-3 transition-all duration-300",
                          activeSection === item.id
                            ? "bg-gradient-to-br from-primary-100 to-primary-200"
                            : "bg-gradient-to-br from-primary-100/20 to-primary-300/10",
                        )}
                      >
                        {React.cloneElement(item.icon, {
                          className: cn(
                            "h-5 w-5",
                            activeSection === item.id
                              ? "text-white"
                              : "text-primary-300",
                          ),
                        })}
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-text-200/50 group-hover:text-primary-300 transition-all duration-300" />
                    </div>
                  </Button>
                ))}
              </div>

              {/* Separador decorativo */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary-300/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 text-xs text-primary-300/50 bg-neutral-900/50 rounded-full backdrop-blur-sm">
                    Acciones Directas
                  </span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white group rounded-xl py-6 shadow-xl hover:shadow-primary-200/40 transition-all duration-300 relative overflow-hidden"
                  onClick={handleNavigateToLogin}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-300 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Rocket className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                      <div className="text-left">
                        <span className="font-semibold">Probar Demo</span>
                        <p className="text-xs opacity-90 mt-0.5">
                          Acceso interactivo
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-primary-300/30 text-primary-300 hover:bg-primary-300/10 hover:border-primary-300 group rounded-xl py-6 transition-all duration-300"
                  onClick={handleNavigateToGithub}
                >
                  <span className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Github className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <span className="font-semibold">Código Abierto</span>
                        <p className="text-xs text-primary-300/80 mt-0.5">
                          GitHub Repository
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </span>
                </Button>
              </div>

              {/* Información adicional */}
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-bg-300/30 to-bg-300/10 border border-bg-300/20 backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="h-5 w-5 text-primary-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-text-100/90">
                      <span className="font-semibold text-primary-300">
                        100% Académico
                      </span>
                      <br />
                      <span className="text-xs text-text-200/70">
                        Proyecto de investigación universitario
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-primary-300/20">
              <div className="text-center">
                <p className="text-xs text-text-200/50">
                  © 2026 FinanzasIA • Características
                </p>
                <p className="text-[10px] text-text-200/30 mt-1">
                  Ingeniería en Informática • URBE
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-text-100 overflow-hidden">
      {/* Efectos de fondo globales */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary-300/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-60 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-accent-100/10 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-primary-200/5 rounded-full blur-3xl animate-pulse-glow animation-delay-4000" />
      </div>

      {/* Navbar Premium */}
      <nav className="sticky top-0 z-40 bg-gradient-to-b from-neutral-950/95 via-neutral-900/90 to-transparent backdrop-blur-xl border-b border-primary-300/20 shadow-lg shadow-primary-100/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo con efectos */}
            <div
              className="flex items-center space-x-4 group cursor-pointer"
              onClick={handleNavigateToHome}
            >
              <div className="relative">
                {/* Efectos alrededor del logo */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-200/10 to-primary-300/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-primary-100/5 rounded-2xl blur-md"></div>

                {/* Logo principal */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-300 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-100/30 group-hover:shadow-primary-300/40 transition-all duration-500 group-hover:scale-110">
                  <Brain className="h-6 w-6 text-white" />

                  {/* Indicador animado */}
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-30"></div>
                      <div className="relative w-4 h-4 bg-primary-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Texto del logo */}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  FinanzasIA
                </h1>
                <p className="text-sm text-text-200/80 flex items-center">
                  <span className="w-2 h-2 bg-primary-300 rounded-full mr-2 animate-pulse" />
                  Características Avanzadas
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {NavigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "text-text-200 hover:text-primary-300 hover:bg-primary-300/10 transition-all duration-300 group relative px-4 py-2 rounded-xl",
                    activeSection === item.id &&
                      "text-primary-300 bg-primary-300/10",
                  )}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="relative flex items-center">
                    {React.cloneElement(item.icon, {
                      className: "h-4 w-4 mr-2",
                    })}
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-100 to-primary-300 transition-all duration-300 transform",
                        activeSection === item.id
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100",
                      )}
                    />
                  </span>
                </Button>
              ))}

              <div className="flex items-center space-x-3">
                {/* Indicador de tiempo */}
                <div className="flex items-center gap-3 text-sm bg-bg-200/40 backdrop-blur-md rounded-xl px-4 py-2.5 border border-bg-300/50 shadow-lg hover:shadow-primary-200/10 transition-all duration-300">
                  <div className="flex items-center gap-2 text-text-100">
                    <Calendar className="h-4 w-4 text-primary-200" />
                    <span className="font-medium">
                      {time.toLocaleDateString("es-ES", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="h-4 w-px bg-bg-300/50"></div>
                  <div className="text-text-200">
                    {time.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* Botón CTA */}
                <Button
                  className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 shadow-lg shadow-primary-200/30 hover:shadow-primary-300/40 transition-all duration-300 group"
                  onClick={handleNavigateToLogin}
                >
                  <span className="flex items-center">
                    <Rocket className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    Probar Demo
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden">
          <FeaturesHero />
        </section>

        {/* Sección de Metodología */}
        <section id="methodology" className="relative py-20">
          {/* Fondo de sección */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-300/5 to-transparent" />
          <div className="relative container mx-auto px-6">
            <ResearchMethodology />
          </div>
        </section>

        {/* Sección de Categorías */}
        <section
          id="categories"
          className="relative py-20 bg-gradient-to-b from-primary-300/3 via-primary-200/2 to-transparent"
        >
          {/* Efectos decorativos */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-primary-100/5 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-accent-100/5 rounded-full blur-2xl" />

          <div className="relative container mx-auto px-6">
            {/* Header de sección */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-primary-300 rounded-full animate-pulse" />
                <h2 className="text-4xl font-bold text-text-100">
                  Categorías de
                  <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent ml-3">
                    Investigación
                  </span>
                </h2>
                <div className="w-3 h-3 bg-accent-200 rounded-full animate-pulse animation-delay-1000" />
              </div>
              <p className="text-text-200 text-lg max-w-3xl mx-auto">
                Descubre las áreas multidisciplinarias que hacen único nuestro
                sistema de gestión financiera inteligente
              </p>
            </div>

            {/* Grid de categorías */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCategory
                title="Inteligencia Artificial"
                description="Modelos avanzados de ML para análisis predictivo y clasificación automática"
                icon={<Brain className="h-8 w-8" />}
                color="from-primary-100 to-primary-200"
                features={[
                  "Clasificación automática NLP",
                  "Predicción de series temporales",
                  "Detección de anomalías",
                  "Recomendaciones personalizadas",
                ]}
              />
              <FeatureCategory
                title="Economía Conductual"
                description="Intervenciones basadas en ciencia para transformar hábitos financieros"
                icon={<TrendingUp className="h-8 w-8" />}
                color="from-accent-100 to-accent-200"
                features={[
                  "Sistema de nudges inteligentes",
                  "Gamificación científica",
                  "Feedback personalizado",
                  "Análisis de patrones",
                ]}
              />
              <FeatureCategory
                title="Ingeniería de Software"
                description="Arquitectura escalable y patrones modernos de desarrollo"
                icon={<Cpu className="h-8 w-8" />}
                color="from-primary-200 to-primary-300"
                features={[
                  "Microservicios en contenedores",
                  "CI/CD automatizado",
                  "Testing exhaustivo",
                  "Despliegue en la nube",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Sección de Detalles Técnicos */}
        <section id="details" className="relative py-20">
          <div className="relative container mx-auto px-6">
            {/* Header de sección */}
            <div className="text-center mb-16">
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-100/20 to-primary-300/10 rounded-2xl blur-xl"></div>
                <h2 className="text-4xl font-bold relative">
                  <span className="text-text-100">Detalles</span>
                  <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent ml-3">
                    Técnicos
                  </span>
                </h2>
              </div>
              <p className="text-text-200 text-lg max-w-3xl mx-auto">
                Profundiza en la implementación técnica y arquitectura de
                nuestros sistemas inteligentes
              </p>
            </div>

            <FeatureDetail />
          </div>
        </section>

        {/* Sección de Demostraciones */}
        <section
          id="demos"
          className="relative py-20 bg-gradient-to-b from-transparent via-primary-300/5 to-transparent"
        >
          {/* Efectos de fondo */}
          <div className="absolute inset-0">
            <div className="absolute top-40 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-100/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-gradient-to-br from-accent-100/10 to-transparent rounded-full blur-2xl" />
          </div>

          <div className="relative container mx-auto px-6">
            {/* Header de sección */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Sparkles className="h-8 w-8 text-primary-300 animate-spin-slow" />
                <h2 className="text-4xl font-bold">
                  <span className="text-text-100">Demostraciones</span>
                  <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent ml-3">
                    Interactivas
                  </span>
                </h2>
                <Sparkles className="h-8 w-8 text-primary-300 animate-spin-slow animation-delay-1000" />
              </div>
              <p className="text-text-200 text-lg max-w-3xl mx-auto">
                Experimenta con nuestros modelos de IA en tiempo real. Cada demo
                muestra algoritmos reales en funcionamiento
              </p>
            </div>

            <MLDemo />
          </div>
        </section>

        {/* Sección de Resultados */}
        <section id="stats" className="relative py-20">
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-100/20 to-accent-100/20 border border-primary-300/30 mb-6">
                <Award className="h-5 w-5 text-primary-300 mr-3" />
                <span className="text-primary-300 font-semibold">
                  Resultados Validados Experimentalmente
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-text-100">Métricas de</span>
                <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent ml-3">
                  Investigación
                </span>
              </h2>
              <p className="text-text-200 text-lg max-w-3xl mx-auto">
                Datos cuantitativos y hallazgos cualitativos que demuestran la
                efectividad de nuestro sistema
              </p>
            </div>

            <FeaturesStats />
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-20 overflow-hidden">
          {/* Fondo espectacular */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/10 via-accent-100/8 to-primary-300/6">
            {/* Partículas animadas */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary-300/20 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${15 + Math.random() * 10}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Contenido */}
          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badge animado */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-100/20 to-primary-300/20 border border-primary-300/30 mb-8 animate-float">
                <Sparkles className="h-5 w-5 text-primary-300 mr-3" />
                <span className="text-primary-300 font-semibold">
                  ¿Listo para transformar tus finanzas?
                </span>
              </div>

              {/* Título principal */}
              <h2 className="text-5xl font-bold mb-8">
                <span className="text-text-100">Comienza tu viaje hacia</span>
                <span className="block bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 bg-clip-text text-transparent mt-3">
                  la libertad financiera
                </span>
              </h2>

              {/* Descripción */}
              <p className="text-xl text-text-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                Únete a cientos de usuarios que ya están transformando sus
                hábitos financieros con inteligencia artificial y ciencia de
                datos aplicada.
              </p>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button
                  size="lg"
                  className="px-14 py-8 text-xl font-bold bg-gradient-to-r from-primary-100 to-primary-200 hover:shadow-2xl hover:shadow-primary-100/40 transition-all duration-300 group relative overflow-hidden"
                  onClick={handleNavigateToLogin}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-300 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center">
                    <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                    <span className="hidden sm:inline">
                      Comenzar Gratis Ahora
                    </span>
                    <span className="sm:hidden">Comenzar Ahora</span>
                    <ArrowRight className="ml-3 h-6 w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="px-14 py-8 text-xl font-bold border-2 border-primary-300 text-primary-300 hover:bg-primary-300/10 hover:shadow-lg hover:shadow-primary-300/20 transition-all duration-300 group"
                  onClick={handleNavigateToGithub}
                >
                  <span className="flex items-center">
                    <Github className="mr-3 h-6 w-6" />
                    <span className="hidden sm:inline">
                      Explorar Código Fuente
                    </span>
                    <span className="sm:hidden">Ver Código</span>
                    <Sparkles className="ml-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </span>
                </Button>
              </div>

              {/* Estadísticas finales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-300/10 hover:border-primary-300/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-primary-300 mb-2">
                    95%
                  </div>
                  <div className="text-sm text-text-200">Precisión IA</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-300/10 hover:border-primary-300/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-primary-300 mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-text-200">Disponibilidad</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-300/10 hover:border-primary-300/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-primary-300 mb-2">
                    100%
                  </div>
                  <div className="text-sm text-text-200">Seguridad</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-300/10 hover:border-primary-300/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-primary-300 mb-2">
                    $0
                  </div>
                  <div className="text-sm text-text-200">Costo Inicial</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Premium */}
      <footer className="border-t border-primary-300/20 pt-12 pb-8 backdrop-blur-sm bg-gradient-to-b from-transparent to-neutral-950/80">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Logo y descripción */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-300 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200/20">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-300 rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-100 group-hover:text-primary-300 transition-colors duration-300">
                    FinanzasIA Research
                  </h3>
                  <p className="text-sm text-text-200/70 flex items-center">
                    <span className="w-2 h-2 bg-primary-300 rounded-full mr-2 animate-pulse" />
                    Proyecto de Investigación
                  </p>
                </div>
              </div>
              <p className="text-text-200/60 text-sm max-w-md">
                Aplicación Web Multidispositivo para la Administración de
                Finanzas Personales Empleando Inteligencia Artificial.
                Desarrollo académico 2026.
              </p>
            </div>

            {/* Enlaces rápidos */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-text-100 mb-4 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary-300" />
                  Equipo
                </h4>
                <ul className="space-y-2 text-text-200/70 text-sm">
                  <li className="hover:text-primary-300 transition-colors duration-300 cursor-pointer">
                    Oberto - Frontend & ML
                  </li>
                  <li className="hover:text-primary-300 transition-colors duration-300 cursor-pointer">
                    Nuñez - Backend & BD
                  </li>
                  <li className="hover:text-primary-300 transition-colors duration-300 cursor-pointer">
                    Albarrán - ML & DevOps
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-text-100 mb-4 flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-primary-300" />
                  Contacto
                </h4>
                <ul className="space-y-2 text-text-200/70 text-sm">
                  <li className="hover:text-primary-300 transition-colors duration-300 cursor-pointer">
                    investigacion@finanzas-ia.edu
                  </li>
                  <li className="hover:text-primary-300 transition-colors duration-300 cursor-pointer">
                    +58 412-XXX-XXXX
                  </li>
                  <li className="hover:text-primary-300 transition-colors duration-300 cursor-pointer">
                    URBE • Maracaibo
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Separador */}
          <div className="my-8 border-t border-primary-300/10"></div>

          {/* Información final */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-text-200/50 text-sm">
              <p>
                © 2026 Finanzas Inteligentes con IA • Proyecto de Investigación
              </p>
              <p className="text-xs text-text-200/30 mt-1">
                Ingeniería en Informática • Universidad Privada Rafael Belloso
                Chacín
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                onClick={handleNavigateToUniversity}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Universidad
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                onClick={handleNavigateToGithub}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesLayout;
