// src/components/landing/LandingPage.tsx - VERSIÓN CON NAVBAR UNIFICADO
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Brain,
  TrendingUp,
  Target,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  Smartphone,
  Monitor,
  Tablet,
  PieChart,
  LineChart,
  CreditCard,
  Wallet,
  Cloud,
  Home,
  User,
  RefreshCcw,
  Calendar,
  Github,
  HelpCircle,
  GraduationCap,
  Menu,
  ExternalLink,
  ShieldCheck,
  Rocket,
  X,
  ChevronRight,
  BookOpen,
  BarChart3,
  Cpu,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

// URLs de imágenes para el carrusel (temáticas de finanzas)
const carouselImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2000&q=80",
  },
];

const LandingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "IA Predictiva",
      description: "Modelos de ML que pronostican gastos con 95% de precisión",
      color: "from-primary-100 to-primary-200",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Dashboard Avanzado",
      description: "Visualización interactiva con gráficos en tiempo real",
      color: "from-accent-100 to-accent-200",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Metas Inteligentes",
      description: "Planificación automática basada en tus patrones",
      color: "from-primary-200 to-primary-300",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Seguro y Privado",
      description: "Tus datos financieros protegidos con encriptación",
      color: "from-bg-300 to-accent-200",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Rápido y Eficiente",
      description: "Procesamiento en tiempo real de tus transacciones",
      color: "from-primary-300 to-accent-100",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Multi-moneda",
      description: "Soporte para USD, EUR, VES y más con tasas actualizadas",
      color: "from-accent-200 to-primary-100",
    },
  ];

  // Efecto para el carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(
        (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Funciones de navegación
  const handleNavigateToFeatures = () => {
    navigate("/features");
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToHelp = () => {
    navigate("/help");
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

  const handleNavigateToRegister = () => {
    navigate("/register");
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToUniversity = () => {
    window.open("https://www.urbe.edu/", "_blank");
    setIsMobileMenuOpen(false);
  };

  // Navigation Items - Adaptados para landing page
  const NavigationItems = [
    {
      id: "features",
      label: "Características",
      icon: <Sparkles className="h-4 w-4" />,
      action: handleNavigateToFeatures,
    },
    {
      id: "help",
      label: "Ayuda & Soporte",
      icon: <HelpCircle className="h-4 w-4" />,
      action: handleNavigateToHelp,
    },
    {
      id: "github",  
      label: "GitHub",
      icon: <Github className="h-4 w-4" />,
      action: handleNavigateToGithub,
    },
  ];

  // Mobile Menu Component - IDÉNTICO AL DE FEATURES
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
                    Inteligencia Financiera
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
                  Navegación
                </h3>

                {NavigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-text-100 hover:text-primary-300 hover:bg-primary-300/10 group rounded-xl py-5 mb-2 transition-all duration-300",
                    )}
                    onClick={item.action}
                  >
                    <div className="relative flex items-center w-full">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center mr-3 transition-all duration-300",
                          "bg-gradient-to-br from-primary-100/20 to-primary-300/10 group-hover:bg-gradient-to-br group-hover:from-primary-100 group-hover:to-primary-200",
                        )}
                      >
                        {React.cloneElement(item.icon, {
                          className: cn(
                            "h-5 w-5",
                            "text-primary-300 group-hover:text-white",
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
                        <span className="font-semibold">Comenzar Ahora</span>
                        <p className="text-xs opacity-90 mt-0.5">
                          Acceso gratuito inmediato
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
                        Proyecto de tesis universitaria
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
                  © 2026 FinanzasIA • Landing
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-text-100">
      {/* Efectos de fondo globales (igual que features) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary-300/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-60 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-accent-100/10 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-primary-200/5 rounded-full blur-3xl animate-pulse-glow animation-delay-4000" />
      </div>

      {/* Navbar Premium (IDÉNTICO al de features) */}
      <nav className="sticky top-0 z-40 bg-gradient-to-b from-neutral-950/95 via-neutral-900/90 to-transparent backdrop-blur-xl border-b border-primary-300/20 shadow-lg shadow-primary-100/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo con efectos */}
            <div
              className="flex items-center space-x-4 group cursor-pointer"
              onClick={() => navigate("/")}
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
                  Inteligencia Financiera
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
                  )}
                  onClick={item.action}
                >
                  <span className="relative flex items-center">
                    {React.cloneElement(item.icon, {
                      className: "h-4 w-4 mr-2",
                    })}
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-100 to-primary-300 transition-all duration-300 transform",
                        "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100",
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
                    Comenzar Ahora
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

      {/* Hero Section con Carrusel de Fondo */}
      <div className="relative min-h-[90vh] overflow-hidden">
        {/* Carrusel solo en esta sección */}
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-30" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url('${image.url}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay para oscurecer y mejorar legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/80 via-neutral-900/70 to-neutral-800/60" />
            </div>
          ))}

          {/* Efecto de partículas */}
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

        {/* Indicadores del carrusel */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentSlide(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary-300 w-8"
                  : "bg-text-200/30 hover:bg-text-200/50"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100/20 to-accent-100/20 border border-primary-300/30 mb-8 animate-float hover:scale-105 transition-transform duration-300 cursor-pointer group">
              <div className="w-2 h-2 bg-primary-300 rounded-full mr-2 animate-pulse" />
              <Award className="h-4 w-4 text-primary-300 mr-2 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-semibold text-primary-300">
                🎓 Proyecto de Tesis Universitaria
              </span>
              <ChevronRight className="h-4 w-4 ml-2 text-primary-300 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>

            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
              <span className="block text-text-100">Domina tus</span>
              <span className="bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 bg-clip-text text-transparent animate-gradient-x relative inline-block">
                Finanzas con IA
                <Sparkles className="absolute -top-4 -right-6 h-6 w-6 lg:h-8 lg:w-8 text-primary-300 animate-spin-slow" />
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg md:text-xl text-text-200 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-500">
              Sistema inteligente que combina{" "}
              <span className="text-primary-300 font-semibold relative inline-block">
                Machine Learning
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-300/50 animate-pulse" />
              </span>{" "}
              y análisis predictivo para transformar tu salud financiera.
              Desarrollado como proyecto de tesis con tecnología de vanguardia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-16 animate-fade-in-up animation-delay-700">
              <Button
                size="lg"
                className="px-6 md:px-10 py-6 md:py-7 text-lg font-semibold bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 shadow-2xl shadow-primary-100/30 hover:shadow-primary-200/40 transition-all duration-300 group relative overflow-hidden"
                onClick={handleNavigateToRegister}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-300 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center">
                  <User className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline">Registrate y Ahorra</span>
                  <span className="sm:hidden">Regístrate</span>
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 md:px-10 py-6 md:py-7 text-lg font-semibold border-2 border-primary-300/50 text-primary-300 hover:bg-primary-300/10 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-300/20 transition-all duration-300 group"
                onClick={handleNavigateToUniversity}
              >
                <GraduationCap className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">
                  Conoce Nuestra Universidad
                </span>
                <span className="sm:hidden">Universidad</span>
                <TrendingUp className="ml-3 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-900">
              <div className="text-center p-4 md:p-6 rounded-2xl bg-bg-300/30 backdrop-blur-sm hover:bg-bg-300/50 transition-all duration-300 group">
                <div className="text-2xl md:text-3xl font-bold text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                  95%
                </div>
                <div className="text-xs md:text-sm text-text-200 group-hover:text-text-100 transition-colors">
                  Precisión IA
                </div>
              </div>
              <div className="text-center p-4 md:p-6 rounded-2xl bg-bg-300/30 backdrop-blur-sm hover:bg-bg-300/50 transition-all duration-300 group">
                <div className="text-2xl md:text-3xl font-bold text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div className="text-xs md:text-sm text-text-200 group-hover:text-text-100 transition-colors">
                  Monitoreo
                </div>
              </div>
              <div className="text-center p-4 md:p-6 rounded-2xl bg-bg-300/30 backdrop-blur-sm hover:bg-bg-300/50 transition-all duration-300 group">
                <div className="text-2xl md:text-3xl font-bold text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                  100%
                </div>
                <div className="text-xs md:text-sm text-text-200 group-hover:text-text-100 transition-colors">
                  Privacidad
                </div>
              </div>
              <div className="text-center p-4 md:p-6 rounded-2xl bg-bg-300/30 backdrop-blur-sm hover:bg-bg-300/50 transition-all duration-300 group">
                <div className="text-2xl md:text-3xl font-bold text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                  0$
                </div>
                <div className="text-xs md:text-sm text-text-200 group-hover:text-text-100 transition-colors">
                  Costo Inicial
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resto de la landing - Todo negro */}
      <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 relative overflow-hidden">
        {/* Fondos animados para toda la sección */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary-300/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute top-60 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-accent-100/10 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
          <div className="absolute -bottom-40 left-1/3 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-primary-200/5 rounded-full blur-3xl animate-pulse-glow animation-delay-4000" />
        </div>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-4 h-4 bg-primary-300 rounded-full animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-text-100">Tecnología </span>
                <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent">
                  Avanzada
                </span>
              </h2>
              <div className="w-4 h-4 bg-accent-200 rounded-full animate-pulse animation-delay-1000" />
            </div>
            <p className="text-text-200 max-w-2xl mx-auto text-base md:text-lg">
              Combinamos las mejores herramientas para ofrecerte una experiencia
              única en gestión financiera personal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm hover:from-bg-200 hover:to-bg-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-100/20 relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={handleNavigateToFeatures}
              >
                {/* Línea animada superior */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300/0 via-primary-200/0 to-accent-100/0 group-hover:from-primary-300/5 group-hover:via-primary-200/10 group-hover:to-accent-100/5 transition-all duration-500 rounded-xl" />

                <CardHeader className="relative z-10">
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden`}
                  >
                    {/* Efecto de brillo interno */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="text-white relative z-10">
                      {React.cloneElement(feature.icon, {
                        className: "h-6 w-6 md:h-8 md:w-8",
                      })}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-text-100 group-hover:text-primary-300 transition-colors duration-300 flex items-center">
                    {feature.title}
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-text-200 mb-4 md:mb-6 group-hover:text-text-100/90 transition-colors duration-300 text-sm md:text-base">
                    {feature.description}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 text-primary-300 hover:text-primary-200 group-hover:translate-x-2 transition-transform duration-300 relative overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigateToFeatures();
                    }}
                  >
                    <span className="relative z-10 text-sm md:text-base">
                      Explorar característica →
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-300 group-hover:w-full transition-all duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Demo Section con dispositivos - SOLUCIÓN CORREGIDA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-300/5 to-transparent" />

          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-text-100">Acceso </span>
                <span className="bg-gradient-to-r from-primary-100 to-primary-300 bg-clip-text text-transparent">
                  Multiplataforma
                </span>
              </h2>
              <p className="text-text-200 max-w-2xl mx-auto text-base md:text-lg">
                Utiliza nuestra plataforma desde cualquier dispositivo con
                sincronización en tiempo real y experiencia optimizada
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center space-y-20 lg:space-y-0 lg:space-x-8 xl:space-x-12">
              {/* Mobile - RESPONSIVE */}
              <div className="relative group animate-fade-in-up animation-delay-200">
                <div className="relative">
                  <div className="w-64 md:w-72 h-[500px] rounded-[3.5rem] bg-gradient-to-b from-bg-200 to-bg-300 border-[14px] border-bg-300 shadow-2xl shadow-primary-100/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary-300/40">
                    <div className="w-full h-12 bg-bg-300 rounded-t-[2.8rem] flex items-center justify-between px-8">
                      <div className="w-3 h-3 rounded-full bg-text-100/70" />
                      <div className="w-16 md:w-20 h-4 bg-text-100/30 rounded-full" />
                      <div className="w-6 md:w-8 h-2 bg-text-100/30 rounded-full" />
                    </div>
                    <div className="p-6 md:p-8 h-full">
                      <div className="h-12 w-full rounded-xl bg-gradient-to-r from-primary-100/30 to-primary-300/20 mb-6 flex items-center justify-between px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary-300/30 flex items-center justify-center">
                            <Wallet className="h-4 w-4 text-primary-300" />
                          </div>
                          <div>
                            <div className="h-2 w-12 md:w-16 bg-text-100/40 rounded-full mb-1" />
                            <div className="h-1 w-8 md:w-12 bg-text-100/20 rounded-full" />
                          </div>
                        </div>
                        <div className="h-6 w-10 md:w-12 bg-primary-300/40 rounded-lg" />
                      </div>

                      <div className="space-y-4 mb-6 md:mb-8">
                        <div className="h-8 w-full rounded-lg bg-gradient-to-r from-accent-100/20 to-accent-200/20 flex items-center px-4 justify-between">
                          <div className="h-2 w-16 md:w-24 bg-text-100/40 rounded-full" />
                          <div className="h-4 w-6 md:w-8 bg-text-100/30 rounded" />
                        </div>
                        <div className="h-8 w-full rounded-lg bg-gradient-to-r from-bg-300/50 to-bg-200/30 flex items-center px-4 justify-between">
                          <div className="h-2 w-12 md:w-20 bg-text-100/40 rounded-full" />
                          <div className="h-4 w-4 md:w-6 bg-text-100/30 rounded" />
                        </div>
                      </div>

                      <div className="h-40 md:h-48 rounded-2xl bg-gradient-to-br from-primary-100/10 to-primary-300/5 border border-primary-300/20 p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="h-2 w-12 md:w-16 bg-text-100/30 rounded-full" />
                          <div className="h-6 w-6 rounded-full bg-primary-300/30 flex items-center justify-center">
                            <PieChart className="h-3 w-3 text-primary-300" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="h-14 md:h-16 rounded-lg bg-gradient-to-br from-primary-300/10 to-primary-100/5"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Smartphone className="absolute -top-4 -left-4 md:-top-6 md:-left-6 h-12 w-12 md:h-16 md:w-16 text-primary-300 animate-spin-slow" />

                <div className="absolute -bottom-14 md:-bottom-16 left-1/2 transform -translate-x-1/2 text-center w-40 md:w-48">
                  <p className="text-xs md:text-sm font-semibold text-primary-300 flex items-center justify-center mb-1">
                    <Smartphone className="h-3 w-3 mr-2" />
                    Mobile First
                  </p>
                  <p className="text-xs text-text-200/70">iOS & Android</p>
                </div>
              </div>

              {/* Desktop - SOLUCIÓN CORREGIDA: MÁS PEQUEÑO SOLO EN MÓVIL */}
              <div className="relative group animate-fade-in-up animation-delay-400">
                <div className="relative">
                  {/* VERSIÓN DESKTOP ORIGINAL (≥768px) */}
                  <div className="hidden md:block">
                    <div className="w-[600px] h-[400px] rounded-3xl bg-gradient-to-b from-bg-200 to-bg-300 border-[12px] border-bg-300 shadow-2xl shadow-primary-100/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary-300/40">
                      <div className="w-full h-10 bg-bg-300 rounded-t-2xl flex items-center justify-between px-6">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-accent-200 animate-pulse" />
                          <div className="w-3 h-3 rounded-full bg-primary-300 animate-pulse animation-delay-500" />
                          <div className="w-3 h-3 rounded-full bg-text-200/50 animate-pulse animation-delay-1000" />
                        </div>
                        <div className="w-40 h-2 bg-text-200/30 rounded-full" />
                        <div className="w-20 h-3 bg-text-200/20 rounded-full" />
                      </div>

                      <div className="p-8">
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="h-20 rounded-xl bg-gradient-to-br from-primary-100/15 to-primary-300/10 p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="h-2 w-12 bg-text-100/40 rounded-full" />
                                <div className="h-4 w-4 rounded-full bg-primary-300/30 flex items-center justify-center">
                                  {i === 0 && (
                                    <TrendingUp className="h-2 w-2 text-primary-300" />
                                  )}
                                  {i === 1 && (
                                    <PieChart className="h-2 w-2 text-primary-300" />
                                  )}
                                  {i === 2 && (
                                    <Calendar className="h-2 w-2 text-primary-300" />
                                  )}
                                </div>
                              </div>
                              <div className="h-4 w-16 bg-text-100/30 rounded-full mb-1" />
                              <div className="h-1 w-full bg-text-100/10 rounded-full" />
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="h-48 rounded-2xl bg-gradient-to-br from-accent-100/10 to-accent-200/5 border border-accent-300/20 p-4">
                            <div className="flex justify-between items-center mb-4">
                              <div className="h-2 w-24 bg-text-100/40 rounded-full" />
                              <LineChart className="h-4 w-4 text-accent-300" />
                            </div>
                            <div className="space-y-3">
                              {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center">
                                  <div className="h-2 w-full bg-gradient-to-r from-accent-100/30 to-accent-200/20 rounded-full" />
                                  <div className="ml-2 h-3 w-6 bg-text-100/20 rounded" />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="h-48 rounded-2xl bg-gradient-to-br from-primary-300/10 to-primary-100/5 border border-primary-300/20 p-4">
                            <div className="flex justify-between items-center mb-4">
                              <div className="h-2 w-20 bg-text-100/40 rounded-full" />
                              <BarChart3 className="h-4 w-4 text-primary-300" />
                            </div>
                            <div className="flex items-end justify-between h-32 px-2">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-10 bg-gradient-to-t from-primary-100/40 to-primary-300/30 rounded-t-lg"
                                  style={{
                                    height: `${30 + Math.random() * 70}%`,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VERSIÓN MÓVIL PEQUEÑA (<768px) - SOLO MÁS PEQUEÑA */}
                  <div className="md:hidden w-full max-w-[400px] h-[300px] rounded-2xl bg-gradient-to-b from-bg-200 to-bg-300 border-[10px] border-bg-300 shadow-2xl shadow-primary-100/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary-300/40 mx-auto">
                    <div className="w-full h-8 bg-bg-300 rounded-t-xl flex items-center justify-between px-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-accent-200 animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-primary-300 animate-pulse animation-delay-500" />
                        <div className="w-2 h-2 rounded-full bg-text-200/50 animate-pulse animation-delay-1000" />
                      </div>
                      <div className="w-24 h-1.5 bg-text-200/30 rounded-full" />
                      <div className="w-12 h-2 bg-text-200/20 rounded-full" />
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-12 rounded-lg bg-gradient-to-br from-primary-100/15 to-primary-300/10 p-2"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="h-1.5 w-8 bg-text-100/40 rounded-full" />
                              <div className="h-3 w-3 rounded-full bg-primary-300/30 flex items-center justify-center">
                                {i === 0 && (
                                  <TrendingUp className="h-1.5 w-1.5 text-primary-300" />
                                )}
                                {i === 1 && (
                                  <PieChart className="h-1.5 w-1.5 text-primary-300" />
                                )}
                                {i === 2 && (
                                  <Calendar className="h-1.5 w-1.5 text-primary-300" />
                                )}
                              </div>
                            </div>
                            <div className="h-2 w-10 bg-text-100/30 rounded-full mb-0.5" />
                            <div className="h-0.5 w-full bg-text-100/10 rounded-full" />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-32 rounded-xl bg-gradient-to-br from-accent-100/10 to-accent-200/5 border border-accent-300/20 p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="h-1.5 w-16 bg-text-100/40 rounded-full" />
                            <LineChart className="h-3 w-3 text-accent-300" />
                          </div>
                          <div className="space-y-1.5">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="flex items-center">
                                <div className="h-1 w-full bg-gradient-to-r from-accent-100/30 to-accent-200/20 rounded-full" />
                                <div className="ml-1 h-1.5 w-4 bg-text-100/20 rounded" />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="h-32 rounded-xl bg-gradient-to-br from-primary-300/10 to-primary-100/5 border border-primary-300/20 p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="h-1.5 w-12 bg-text-100/40 rounded-full" />
                            <BarChart3 className="h-3 w-3 text-primary-300" />
                          </div>
                          <div className="flex items-end justify-between h-20 px-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-5 bg-gradient-to-t from-primary-100/40 to-primary-300/30 rounded-t"
                                style={{
                                  height: `${30 + Math.random() * 70}%`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Monitor className="absolute -top-4 -right-4 md:-top-6 md:-right-6 h-12 w-12 md:h-16 md:w-16 text-primary-300 animate-spin-slow" />

                <div className="absolute -bottom-14 md:-bottom-16 left-1/2 transform -translate-x-1/2 text-center w-40 md:w-48">
                  <p className="text-xs md:text-sm font-semibold text-primary-300 flex items-center justify-center mb-1">
                    <Monitor className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                    Web Dashboard
                  </p>
                  <p className="text-xs text-text-200/70">
                    Todos los navegadores
                  </p>
                </div>
              </div>

              {/* Tablet - RESPONSIVE */}
              <div className="relative group animate-fade-in-up animation-delay-600">
                <div className="relative">
                  <div className="w-72 md:w-80 h-[500px] rounded-3xl bg-gradient-to-b from-bg-200 to-bg-300 border-[12px] border-bg-300 shadow-2xl shadow-primary-100/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary-300/40">
                    <div className="w-full h-10 bg-bg-300 rounded-t-2xl flex items-center justify-center">
                      <div className="w-10 md:w-12 h-1 bg-text-200/50 rounded-full" />
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6 md:mb-8">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-100/30 to-primary-300/20 flex items-center justify-center">
                          <Brain className="h-5 w-5 text-primary-300" />
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 w-20 md:w-24 bg-text-100/40 rounded-full" />
                          <div className="h-1 w-12 md:w-16 bg-text-100/20 rounded-full" />
                        </div>
                        <div className="h-8 w-8 rounded-full bg-text-200/10 flex items-center justify-center">
                          <div className="h-4 w-4 rounded-full bg-primary-300/40" />
                        </div>
                      </div>

                      <div className="h-56 md:h-64 rounded-2xl bg-gradient-to-br from-accent-100/10 to-primary-100/5 border border-primary-300/20 p-6 mb-6">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <div className="h-2 w-24 md:w-32 bg-text-100/40 rounded-full mb-2" />
                            <div className="h-4 w-14 md:w-16 bg-primary-300/30 rounded-lg" />
                          </div>
                          <CreditCard className="h-6 w-6 text-primary-300/50" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="h-16 md:h-20 rounded-xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 p-3"
                            >
                              <div className="h-2 w-10 md:w-12 bg-text-100/40 rounded-full mb-2" />
                              <div className="h-4 md:h-6 w-14 md:w-16 bg-primary-300/20 rounded-lg mb-1" />
                              <div className="h-1 w-full bg-text-100/10 rounded-full" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center space-x-6 md:space-x-8">
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-300/10 flex items-center justify-center">
                          <Home className="h-3 w-3 md:h-4 md:w-4 text-primary-300" />
                        </div>
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-accent-100/20 to-accent-200/10 flex items-center justify-center">
                          <PieChart className="h-3 w-3 md:h-4 md:w-4 text-accent-300" />
                        </div>
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-primary-300/20 to-primary-100/10 flex items-center justify-center">
                          <User className="h-3 w-3 md:h-4 md:w-4 text-primary-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Tablet className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 h-12 w-12 md:h-16 md:w-16 text-primary-300 animate-spin-slow" />

                <div className="absolute -bottom-14 md:-bottom-16 left-1/2 transform -translate-x-1/2 text-center w-40 md:w-48">
                  <p className="text-xs md:text-sm font-semibold text-primary-300 flex items-center justify-center mb-1">
                    <Tablet className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                    Tablet Ready
                  </p>
                  <p className="text-xs text-text-200/70">iPad & Android</p>
                </div>
              </div>
            </div>

            {/* Características de sincronización */}
            <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
              <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 backdrop-blur-sm border border-primary-300/10 hover:border-primary-300/30 transition-all duration-300 group">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-300/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <RefreshCcw className="h-6 w-6 md:h-8 md:w-8 text-primary-300" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-text-100 mb-3 md:mb-4">
                  Sincronización Instantánea
                </h3>
                <p className="text-text-200/80 text-sm md:text-base">
                  Cambios reflejados en todos tus dispositivos en tiempo real
                </p>
              </div>

              <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 backdrop-blur-sm border border-accent-300/10 hover:border-accent-300/30 transition-all duration-300 group">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-accent-100/20 to-accent-200/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-accent-300" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-text-100 mb-3 md:mb-4">
                  Seguridad Unificada
                </h3>
                <p className="text-text-200/80 text-sm md:text-base">
                  Misma protección encriptada en todas las plataformas
                </p>
              </div>

              <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 backdrop-blur-sm border border-primary-300/10 hover:border-primary-300/30 transition-all duration-300 group">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-300/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="h-6 w-6 md:h-8 md:w-8 text-primary-300" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-text-100 mb-3 md:mb-4">
                  Backup en la Nube
                </h3>
                <p className="text-text-200/80 text-sm md:text-base">
                  Tus datos seguros y accesibles desde cualquier lugar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-accent-100/10 to-primary-300/10" />

          {/* Partículas */}
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

          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 animate-fade-in-up">
                <span className="text-text-100">¿Listo para transformar </span>
                <span className="bg-gradient-to-r from-primary-100 to-primary-300 bg-clip-text text-transparent">
                  tus finanzas?
                </span>
              </h2>

              <p className="text-lg md:text-xl text-text-200 mb-8 md:mb-12 animate-fade-in-up animation-delay-200">
                Únete al proyecto de tesis que está revolucionando la gestión
                financiera personal con inteligencia artificial y machine
                learning.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center animate-fade-in-up animation-delay-400">
                <Button
                  size="lg"
                  className="px-8 md:px-12 py-6 md:py-8 text-lg md:text-xl font-bold bg-gradient-to-r from-primary-100 to-primary-200 hover:shadow-2xl hover:shadow-primary-100/40 transition-all duration-300 group relative overflow-hidden"
                  onClick={handleNavigateToLogin}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-300 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center">
                    <TrendingUp className="mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:animate-bounce" />
                    <span className="hidden sm:inline">
                      Comenzar Gratis Hoy
                    </span>
                    <span className="sm:hidden">Comenzar</span>
                    <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 md:px-12 py-6 md:py-8 text-lg md:text-xl font-bold border-2 border-primary-300 text-primary-300 hover:bg-primary-300/10 hover:shadow-lg hover:shadow-primary-300/20 transition-all duration-300 group"
                  onClick={handleNavigateToGithub}
                >
                  <span className="flex items-center">
                    <Github className="mr-3 h-5 w-5 md:h-6 md:w-6" />
                    <span className="hidden sm:inline">
                      Ver Código en GitHub
                    </span>
                    <span className="sm:hidden">GitHub</span>
                    <Sparkles className="ml-3 h-5 w-5 md:h-6 md:w-6 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </span>
                </Button>
              </div>

              <p className="mt-6 md:mt-8 text-text-200/70 text-xs md:text-sm animate-fade-in-up animation-delay-600">
                Proyecto Investigativo • Ingeniería en Informática • Universidad
                Privada Rafael Belloso Chacín
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-bg-300/30 pt-12 md:pt-16 pb-6 md:pb-8 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
              <div className="animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-300 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-text-100 group-hover:text-primary-300 transition-colors duration-300">
                      FinanzasIA
                    </h3>
                    <p className="text-xs md:text-sm text-text-200/70 flex items-center">
                      <span className="w-2 h-2 bg-primary-300 rounded-full mr-2 animate-pulse" />
                      Proyecto de Tesis
                    </p>
                  </div>
                </div>
                <p className="text-text-200/60 text-sm md:text-base max-w-md">
                  Aplicación web multidispositivo para la administración de
                  finanzas personales empleando inteligencia artificial.
                  Desarrollo académico 2026.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 md:gap-8 animate-fade-in-up animation-delay-200">
                <div>
                  <h4 className="font-semibold text-text-100 mb-3 md:mb-4 flex items-center">
                    <Users className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary-300" />
                    Equipo
                  </h4>
                  <ul className="space-y-2 text-text-200/70 text-sm">
                    <li className="hover:text-primary-300 transition-colors duration-300">
                      Oberto - Frontend & ML
                    </li>
                    <li className="hover:text-primary-300 transition-colors duration-300">
                      Nuñez - Backend & BD
                    </li>
                    <li className="hover:text-primary-300 transition-colors duration-300">
                      Albarrán - ML & DevOps
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-text-100 mb-3 md:mb-4 flex items-center">
                    <Zap className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary-300" />
                    Tecnologías
                  </h4>
                  <ul className="space-y-2 text-text-200/70 text-sm">
                    <li className="hover:text-primary-300 transition-colors duration-300">
                      React + TypeScript
                    </li>
                    <li className="hover:text-primary-300 transition-colors duration-300">
                      Django REST API
                    </li>
                    <li className="hover:text-primary-300 transition-colors duration-300">
                      Machine Learning
                    </li>
                    <li className="hover:text-primary-300 transition-colors duration-300">
                      Tailwind CSS
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-bg-300/30 text-center animate-fade-in-up animation-delay-400">
              <p className="text-text-200/50 text-xs md:text-sm">
                © 2026 Finanzas Inteligentes con IA - Proyecto de Tesis
                Universitaria. Todos los derechos académicos reservados.
              </p>
              <p className="text-text-200/40 text-xs mt-2">
                Desarrollado con pasión por el aprendizaje y la innovación
                tecnológica.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Componente DollarSign faltante
const DollarSign: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default LandingPage;
