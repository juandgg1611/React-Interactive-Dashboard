// src/components/landing/LandingPage.tsx - CARRUSEL SOLO EN HERO
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Brain,
  TrendingUp,
  Target,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  PieChart,
  LineChart,
  CreditCard,
  Wallet,
  Coins,
  Cloud,
  Home,
  User,
  RefreshCcw,
  TrendingDown,
  Calendar,
} from "lucide-react";

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
        (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-text-100">
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

        {/* Controles del carrusel */}
        <div className="absolute inset-0 z-10 flex items-center justify-between px-4 lg:px-8 pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto w-12 h-12 rounded-full bg-bg-300/30 backdrop-blur-sm border border-text-200/30 flex items-center justify-center text-text-200 hover:text-primary-300 hover:border-primary-300 transition-all duration-300 hover:scale-110 hover:bg-bg-300/50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto w-12 h-12 rounded-full bg-bg-300/30 backdrop-blur-sm border border-text-200/30 flex items-center justify-center text-text-200 hover:text-primary-300 hover:border-primary-300 transition-all duration-300 hover:scale-110 hover:bg-bg-300/50"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
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

        {/* Navbar Glassmorphism */}
        <nav className="relative z-30 container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-300 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-100/30 group-hover:shadow-primary-300/40 transition-all duration-500 group-hover:scale-110">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-300 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-300 rounded-full" />
              </div>
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

            <div className="hidden md:flex items-center space-x-6">
              <Button
                variant="ghost"
                className="text-text-200 hover:text-primary-300 hover:bg-bg-300/50 transition-all duration-300 group"
              >
                <span className="relative">
                  Características
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-300 group-hover:w-full transition-all duration-300" />
                </span>
              </Button>
              <Button
                variant="ghost"
                className="text-text-200 hover:text-primary-300 hover:bg-bg-300/50 transition-all duration-300 group"
              >
                <span className="relative">
                  Demo
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-300 group-hover:w-full transition-all duration-300" />
                </span>
              </Button>
              <Button
                variant="ghost"
                className="text-text-200 hover:text-primary-300 hover:bg-bg-300/50 transition-all duration-300 group"
              >
                <span className="relative">
                  Documentación
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-300 group-hover:w-full transition-all duration-300" />
                </span>
              </Button>
              <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 shadow-lg shadow-primary-100/25 hover:shadow-primary-200/35 transition-all duration-300 group">
                <span className="flex items-center">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </nav>

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
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
              <span className="block text-text-100">Domina tus</span>
              <span className="bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 bg-clip-text text-transparent animate-gradient-x relative inline-block">
                Finanzas con IA
                <Sparkles className="absolute -top-4 -right-6 h-8 w-8 text-primary-300 animate-spin-slow" />
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl text-text-200 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-500">
              Sistema inteligente que combina{" "}
              <span className="text-primary-300 font-semibold relative inline-block">
                Machine Learning
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-300/50 animate-pulse" />
              </span>{" "}
              y análisis predictivo para transformar tu salud financiera.
              Desarrollado como proyecto de tesis con tecnología de vanguardia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-700">
              <Button
                size="lg"
                className="px-10 py-7 text-lg font-semibold bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 shadow-2xl shadow-primary-100/30 hover:shadow-primary-200/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-300 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center">
                  <Zap className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Comenzar Demo Gratis
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-10 py-7 text-lg font-semibold border-2 border-primary-300/50 text-primary-300 hover:bg-primary-300/10 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-300/20 transition-all duration-300 group"
              >
                <Lock className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Ver Demo Segura
                <TrendingUp className="ml-3 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-900">
              <div className="text-center p-6 rounded-2xl bg-bg-300/30 backdrop-blur-sm hover:bg-bg-300/50 transition-all duration-300 group">
                <div className="text-3xl font-bold text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                  95%
                </div>
                <div className="text-sm text-text-200 group-hover:text-text-100 transition-colors">
                  Precisión IA
                </div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-bg-300/30 backdrop-blur-sm hover:bg-bg-300/50 transition-all duration-300 group">
                <div className="text-3xl font-bold text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div className="text-sm text-text-200 group-hover:text-text-100 transition-colors">
                  Monitoreo
                </div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-bg-300/30 backdrop-blur-sm hover:bg-bg-300/50 transition-all duration-300 group">
                <div className="text-3xl font-bold text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                  100%
                </div>
                <div className="text-sm text-text-200 group-hover:text-text-100 transition-colors">
                  Privacidad
                </div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-bg-300/30 backdrop-blur-sm hover:bg-bg-300/50 transition-all duration-300 group">
                <div className="text-3xl font-bold text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                  0$
                </div>
                <div className="text-sm text-text-200 group-hover:text-text-100 transition-colors">
                  Costo Inicial
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resto de la landing - Todo negro */}
      <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-4 h-4 bg-primary-300 rounded-full animate-pulse" />
              <h2 className="text-4xl font-bold">
                <span className="text-text-100">Tecnología </span>
                <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent">
                  Avanzada
                </span>
              </h2>
              <div className="w-4 h-4 bg-accent-200 rounded-full animate-pulse animation-delay-1000" />
            </div>
            <p className="text-text-200 max-w-2xl mx-auto text-lg">
              Combinamos las mejores herramientas para ofrecerte una experiencia
              única en gestión financiera personal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm hover:from-bg-200 hover:to-bg-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-100/20 relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Línea animada superior */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <CardHeader>
                  <div
                    className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative`}
                  >
                    <div className="text-white relative z-10">
                      {feature.icon}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                  </div>
                  <CardTitle className="text-2xl text-text-100 group-hover:text-primary-300 transition-colors duration-300 flex items-center">
                    {feature.title}
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-200 mb-6 group-hover:text-text-100/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 text-primary-300 hover:text-primary-200 group-hover:translate-x-2 transition-transform duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      Explorar característica →
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-300 group-hover:w-full transition-all duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Demo Section con dispositivos - ICONOS CORREGIDOS */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-300/5 to-transparent" />

          {/* Efecto de fondo tecnológico */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.2),transparent_50%)]" />
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-text-100">Acceso </span>
                <span className="bg-gradient-to-r from-primary-100 to-primary-300 bg-clip-text text-transparent">
                  Multiplataforma
                </span>
              </h2>
              <p className="text-text-200 max-w-2xl mx-auto text-lg">
                Utiliza nuestra plataforma desde cualquier dispositivo con
                sincronización en tiempo real y experiencia optimizada
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center space-y-20 lg:space-y-0 lg:space-x-8 xl:space-x-12">
              {/* Mobile - Ícono a la izquierda superior */}
              <div className="relative group animate-fade-in-up animation-delay-200">
                <div className="relative">
                  <div className="w-64 h-[500px] rounded-[3.5rem] bg-gradient-to-b from-bg-200 to-bg-300 border-[14px] border-bg-300 shadow-2xl shadow-primary-100/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary-300/40">
                    <div className="w-full h-12 bg-bg-300 rounded-t-[2.8rem] flex items-center justify-between px-8">
                      <div className="w-3 h-3 rounded-full bg-text-100/70" />
                      <div className="w-20 h-4 bg-text-100/30 rounded-full" />
                      <div className="w-8 h-2 bg-text-100/30 rounded-full" />
                    </div>
                    <div className="p-8 h-full">
                      <div className="h-12 w-full rounded-xl bg-gradient-to-r from-primary-100/30 to-primary-300/20 mb-6 flex items-center justify-between px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary-300/30 flex items-center justify-center">
                            <Wallet className="h-4 w-4 text-primary-300" />
                          </div>
                          <div>
                            <div className="h-2 w-16 bg-text-100/40 rounded-full mb-1" />
                            <div className="h-1 w-12 bg-text-100/20 rounded-full" />
                          </div>
                        </div>
                        <div className="h-6 w-12 bg-primary-300/40 rounded-lg" />
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="h-8 w-full rounded-lg bg-gradient-to-r from-accent-100/20 to-accent-200/20 flex items-center px-4 justify-between">
                          <div className="h-2 w-24 bg-text-100/40 rounded-full" />
                          <div className="h-4 w-8 bg-text-100/30 rounded" />
                        </div>
                        <div className="h-8 w-full rounded-lg bg-gradient-to-r from-bg-300/50 to-bg-200/30 flex items-center px-4 justify-between">
                          <div className="h-2 w-20 bg-text-100/40 rounded-full" />
                          <div className="h-4 w-6 bg-text-100/30 rounded" />
                        </div>
                      </div>

                      <div className="h-48 rounded-2xl bg-gradient-to-br from-primary-100/10 to-primary-300/5 border border-primary-300/20 p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="h-2 w-16 bg-text-100/30 rounded-full" />
                          <div className="h-6 w-6 rounded-full bg-primary-300/30 flex items-center justify-center">
                            <PieChart className="h-3 w-3 text-primary-300" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="h-16 rounded-lg bg-gradient-to-br from-primary-300/10 to-primary-100/5"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ícono de smartphone - A la izquierda superior, más grande, con animación spin */}
                <Smartphone className="absolute -top-6 -left-6 h-16 w-16 text-primary-300 animate-spin-slow" />

                {/* Etiqueta Mobile First - Centrada abajo */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center w-48">
                  <p className="text-sm font-semibold text-primary-300 flex items-center justify-center mb-1">
                    <Smartphone className="h-3 w-3 mr-2" />
                    Mobile First
                  </p>
                  <p className="text-xs text-text-200/70">iOS & Android</p>
                </div>
              </div>

              {/* Desktop - Ícono más grande con animación spin */}
              <div className="relative group animate-fade-in-up animation-delay-400">
                <div className="relative">
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

                {/* Ícono de monitor - Más grande, con animación spin */}
                <Monitor className="absolute -top-6 -right-6 h-16 w-16 text-primary-300 animate-spin-slow" />

                {/* Etiqueta Web Dashboard */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center w-48">
                  <p className="text-sm font-semibold text-primary-300 flex items-center justify-center mb-1">
                    <Monitor className="h-4 w-4 mr-2" />
                    Web Dashboard
                  </p>
                  <p className="text-xs text-text-200/70">
                    Todos los navegadores
                  </p>
                </div>
              </div>

              {/* Tablet - Ícono más grande con animación spin */}
              <div className="relative group animate-fade-in-up animation-delay-600">
                <div className="relative">
                  <div className="w-80 h-[500px] rounded-3xl bg-gradient-to-b from-bg-200 to-bg-300 border-[12px] border-bg-300 shadow-2xl shadow-primary-100/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary-300/40">
                    <div className="w-full h-10 bg-bg-300 rounded-t-2xl flex items-center justify-center">
                      <div className="w-12 h-1 bg-text-200/50 rounded-full" />
                    </div>

                    <div className="p-8">
                      <div className="flex items-center justify-between mb-8">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-100/30 to-primary-300/20 flex items-center justify-center">
                          <Brain className="h-5 w-5 text-primary-300" />
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 w-24 bg-text-100/40 rounded-full" />
                          <div className="h-1 w-16 bg-text-100/20 rounded-full" />
                        </div>
                        <div className="h-8 w-8 rounded-full bg-text-200/10 flex items-center justify-center">
                          <div className="h-4 w-4 rounded-full bg-primary-300/40" />
                        </div>
                      </div>

                      <div className="h-64 rounded-2xl bg-gradient-to-br from-accent-100/10 to-primary-100/5 border border-primary-300/20 p-6 mb-6">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <div className="h-2 w-32 bg-text-100/40 rounded-full mb-2" />
                            <div className="h-4 w-16 bg-primary-300/30 rounded-lg" />
                          </div>
                          <CreditCard className="h-6 w-6 text-primary-300/50" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="h-20 rounded-xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 p-3"
                            >
                              <div className="h-2 w-12 bg-text-100/40 rounded-full mb-2" />
                              <div className="h-6 w-16 bg-primary-300/20 rounded-lg mb-1" />
                              <div className="h-1 w-full bg-text-100/10 rounded-full" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center space-x-8">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-300/10 flex items-center justify-center">
                          <Home className="h-4 w-4 text-primary-300" />
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-100/20 to-accent-200/10 flex items-center justify-center">
                          <PieChart className="h-4 w-4 text-accent-300" />
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-300/20 to-primary-100/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ícono de tablet - Más grande, con animación spin */}
                <Tablet className="absolute -bottom-8 -right-8 h-16 w-16 text-primary-300 animate-spin-slow" />

                {/* Etiqueta Tablet Ready */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center w-48">
                  <p className="text-sm font-semibold text-primary-300 flex items-center justify-center mb-1">
                    <Tablet className="h-4 w-4 mr-2" />
                    Tablet Ready
                  </p>
                  <p className="text-xs text-text-200/70">iPad & Android</p>
                </div>
              </div>
            </div>

            {/* Características de sincronización */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 backdrop-blur-sm border border-primary-300/10 hover:border-primary-300/30 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-300/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <RefreshCcw className="h-8 w-8 text-primary-300" />
                </div>
                <h3 className="text-xl font-bold text-text-100 mb-4">
                  Sincronización Instantánea
                </h3>
                <p className="text-text-200/80">
                  Cambios reflejados en todos tus dispositivos en tiempo real
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 backdrop-blur-sm border border-accent-300/10 hover:border-accent-300/30 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-100/20 to-accent-200/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-accent-300" />
                </div>
                <h3 className="text-xl font-bold text-text-100 mb-4">
                  Seguridad Unificada
                </h3>
                <p className="text-text-200/80">
                  Misma protección encriptada en todas las plataformas
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 backdrop-blur-sm border border-primary-300/10 hover:border-primary-300/30 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-300/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="h-8 w-8 text-primary-300" />
                </div>
                <h3 className="text-xl font-bold text-text-100 mb-4">
                  Backup en la Nube
                </h3>
                <p className="text-text-200/80">
                  Tus datos seguros y accesibles desde cualquier lugar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-24 overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in-up">
                <span className="text-text-100">¿Listo para transformar </span>
                <span className="bg-gradient-to-r from-primary-100 to-primary-300 bg-clip-text text-transparent">
                  tus finanzas?
                </span>
              </h2>

              <p className="text-xl text-text-200 mb-12 animate-fade-in-up animation-delay-200">
                Únete al proyecto de tesis que está revolucionando la gestión
                financiera personal con inteligencia artificial y machine
                learning.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-400">
                <Button
                  size="lg"
                  className="px-12 py-8 text-xl font-bold bg-gradient-to-r from-primary-100 to-primary-200 hover:shadow-2xl hover:shadow-primary-100/40 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-300 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center">
                    <TrendingUp className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                    Comenzar Gratis Hoy
                    <ArrowRight className="ml-3 h-6 w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="px-12 py-8 text-xl font-bold border-2 border-primary-300 text-primary-300 hover:bg-primary-300/10 hover:shadow-lg hover:shadow-primary-300/20 transition-all duration-300 group"
                >
                  <span className="flex items-center">
                    Ver Código en GitHub
                    <Sparkles className="ml-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </span>
                </Button>
              </div>

              <p className="mt-8 text-text-200/70 text-sm animate-fade-in-up animation-delay-600">
                Sin tarjeta de crédito • 14 días gratis • Soporte académico
                incluido
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-bg-300/30 pt-16 pb-8 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-300 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-100 group-hover:text-primary-300 transition-colors duration-300">
                      FinanzasIA
                    </h3>
                    <p className="text-sm text-text-200/70 flex items-center">
                      <span className="w-2 h-2 bg-primary-300 rounded-full mr-2 animate-pulse" />
                      Proyecto de Tesis
                    </p>
                  </div>
                </div>
                <p className="text-text-200/60 max-w-md">
                  Aplicación web multidispositivo para la administración de
                  finanzas personales empleando inteligencia artificial.
                  Desarrollo académico 2026.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 animate-fade-in-up animation-delay-200">
                <div>
                  <h4 className="font-semibold text-text-100 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary-300" />
                    Equipo
                  </h4>
                  <ul className="space-y-2 text-text-200/70">
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
                  <h4 className="font-semibold text-text-100 mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-primary-300" />
                    Tecnologías
                  </h4>
                  <ul className="space-y-2 text-text-200/70">
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

            <div className="mt-12 pt-8 border-t border-bg-300/30 text-center animate-fade-in-up animation-delay-400">
              <p className="text-text-200/50 text-sm">
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

export default LandingPage;
