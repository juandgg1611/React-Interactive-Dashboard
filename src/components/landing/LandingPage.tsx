// src/components/landing/LandingPage.tsx - DISEÑO PREMIUM
import React from "react";
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
} from "lucide-react";

const LandingPage: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-text-100">
      {/* Hero Section con animación */}
      <div className="relative overflow-hidden">
        {/* Fondos animados */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-100/5 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
        </div>

        {/* Navbar Glassmorphism */}
        <nav className="relative z-50 container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-300 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-100/30">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-300 rounded-full animate-ping" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                  FinanzasIA
                </h1>
                <p className="text-sm text-text-200/80">
                  Inteligencia Financiera
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Button
                variant="ghost"
                className="text-text-200 hover:text-primary-300 hover:bg-bg-300/50"
              >
                Características
              </Button>
              <Button
                variant="ghost"
                className="text-text-200 hover:text-primary-300 hover:bg-bg-300/50"
              >
                Demo
              </Button>
              <Button
                variant="ghost"
                className="text-text-200 hover:text-primary-300 hover:bg-bg-300/50"
              >
                Documentación
              </Button>
              <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 shadow-lg shadow-primary-100/25">
                Comenzar Ahora
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100/20 to-accent-100/20 border border-primary-300/30 mb-8 animate-float">
              <div className="w-2 h-2 bg-primary-300 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-semibold text-primary-300">
                🎓 Proyecto de Tesis Universitaria
              </span>
            </div>

            {/* Título principal */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="block text-text-100">Domina tus</span>
              <span className="bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                Finanzas con IA
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl text-text-200 mb-12 max-w-3xl mx-auto">
              Sistema inteligente que combina{" "}
              <span className="text-primary-300 font-semibold">
                Machine Learning
              </span>{" "}
              y análisis predictivo para transformar tu salud financiera.
              Desarrollado como proyecto de tesis con tecnología de vanguardia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                size="lg"
                className="px-10 py-7 text-lg font-semibold bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 shadow-2xl shadow-primary-100/30 hover:shadow-primary-200/40 transition-all duration-300 group"
              >
                <Zap className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Comenzar Demo Gratis
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-10 py-7 text-lg font-semibold border-2 border-primary-300/50 text-primary-300 hover:bg-primary-300/10 hover:border-primary-300"
              >
                <Lock className="mr-3 h-5 w-5" />
                Ver Demo Segura
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-4 rounded-2xl bg-bg-300/30 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary-300 mb-1">
                  95%
                </div>
                <div className="text-sm text-text-200">Precisión IA</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-bg-300/30 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary-300 mb-1">
                  24/7
                </div>
                <div className="text-sm text-text-200">Monitoreo</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-bg-300/30 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary-300 mb-1">
                  100%
                </div>
                <div className="text-sm text-text-200">Privacidad</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-bg-300/30 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary-300 mb-1">
                  0$
                </div>
                <div className="text-sm text-text-200">Costo Inicial</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-text-100">Tecnología </span>
            <span className="bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent">
              Avanzada
            </span>
          </h2>
          <p className="text-text-200 max-w-2xl mx-auto text-lg">
            Combinamos las mejores herramientas para ofrecerte una experiencia
            única en gestión financiera personal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm hover:from-bg-200 hover:to-bg-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-100/20"
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <CardTitle className="text-2xl text-text-100">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-200 mb-6">{feature.description}</p>
                <Button
                  variant="link"
                  className="p-0 text-primary-300 hover:text-primary-200 group-hover:translate-x-2 transition-transform"
                >
                  Explorar característica →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-accent-100/10 to-primary-300/10" />

        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-text-100">¿Listo para transformar </span>
              <span className="bg-gradient-to-r from-primary-100 to-primary-300 bg-clip-text text-transparent">
                tus finanzas?
              </span>
            </h2>

            <p className="text-xl text-text-200 mb-12">
              Únete al proyecto de tesis que está revolucionando la gestión
              financiera personal con inteligencia artificial y machine
              learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="px-12 py-8 text-xl font-bold bg-gradient-to-r from-primary-100 to-primary-200 hover:shadow-2xl hover:shadow-primary-100/40 transition-all group"
              >
                <TrendingUp className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Comenzar Gratis Hoy
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-12 py-8 text-xl font-bold border-2 border-primary-300 text-primary-300 hover:bg-primary-300/10"
              >
                Ver Código en GitHub
              </Button>
            </div>

            <p className="mt-8 text-text-200/70 text-sm">
              Sin tarjeta de crédito • 14 días gratis • Soporte académico
              incluido
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-bg-300/30 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-300 rounded-xl flex items-center justify-center">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-100">
                    FinanzasIA
                  </h3>
                  <p className="text-sm text-text-200/70">Proyecto de Tesis</p>
                </div>
              </div>
              <p className="text-text-200/60 max-w-md">
                Aplicación web multidispositivo para la administración de
                finanzas personales empleando inteligencia artificial.
                Desarrollo académico 2026.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-text-100 mb-4">Equipo</h4>
                <ul className="space-y-2 text-text-200/70">
                  <li>Oberto - Frontend & ML</li>
                  <li>Nuñez - Backend & BD</li>
                  <li>Albarrán - ML & DevOps</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-text-100 mb-4">
                  Tecnologías
                </h4>
                <ul className="space-y-2 text-text-200/70">
                  <li>React + TypeScript</li>
                  <li>Django REST API</li>
                  <li>Machine Learning</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-bg-300/30 text-center">
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
  );
};

export default LandingPage;
