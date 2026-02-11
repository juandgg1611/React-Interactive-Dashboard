// src/components/features/FeaturesHero.tsx
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import {
  Brain,
  TrendingUp,
  Shield,
  Zap,
  Award,
  Sparkles,
  GraduationCap,
  ChevronRight,
  Users,
  BarChart3,
  LineChart,
  Target,
  Cloud,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturesHero: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev >= 95 ? 95 : prev + 1));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleNavigateToDemo = () => {
    navigate("/demo");
  };

  const handleNavigateToResearch = () => {
    window.open("https://scholar.google.com", "_blank");
  };

  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Fondo con gradientes animados */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-300/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-100/10 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-200/5 rounded-full blur-3xl animate-pulse-glow animation-delay-4000" />
      </div>

      {/* Partículas */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-300/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge Académico */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-100/20 to-accent-100/20 border border-primary-300/30 mb-8 animate-float hover:scale-105 transition-transform duration-300 cursor-pointer group">
            <div className="w-3 h-3 bg-primary-300 rounded-full mr-3 animate-pulse" />
            <Award className="h-5 w-5 text-primary-300 mr-3 group-hover:rotate-12 transition-transform" />
            <span className="text-base font-semibold text-primary-300">
              🎓 Proyecto de Investigación - URBE 2026
            </span>
            <ChevronRight className="h-5 w-5 ml-3 text-primary-300 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>

          {/* Título principal */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
            <span className="block text-text-100">Investigación en</span>
            <span className="relative inline-block pt-2">
              {" "}
              {/* Añadir padding-top */}
              <span className="bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 bg-clip-text text-transparent animate-gradient-x leading-[1.1]">
                {" "}
                {/* Ajustar leading */}
                Inteligencia Financiera
              </span>
              <Sparkles className="absolute -top-6 -right-8 h-8 w-8 lg:h-10 lg:w-10 text-primary-300 animate-spin-slow" />
            </span>
          </h1>

          {/* Subtítulo académico */}
          <p className="text-xl md:text-2xl text-text-200 mb-12 max-w-4xl mx-auto animate-fade-in-up animation-delay-500 leading-relaxed">
            Sistema multidisciplinario que integra{" "}
            <span className="text-primary-300 font-semibold relative inline-block">
              Machine Learning
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-300/50 animate-pulse" />
            </span>
            ,{" "}
            <span className="text-accent-100 font-semibold relative inline-block">
              Behavioral Economics
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-100/50 animate-pulse" />
            </span>{" "}
            y{" "}
            <span className="text-primary-200 font-semibold relative inline-block">
              Ingeniería de Software
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-200/50 animate-pulse" />
            </span>{" "}
            para la transformación de hábitos financieros mediante
            intervenciones basadas en evidencia.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-700">
            <Button
              size="lg"
              className="px-10 py-7 text-lg font-semibold bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 shadow-2xl shadow-primary-100/30 hover:shadow-primary-200/40 transition-all duration-300 group relative overflow-hidden"
              onClick={handleNavigateToDemo}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-300 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center">
                <Brain className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                <span>Explorar Demostraciones</span>
                <ChevronRight className="ml-3 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-7 text-lg font-semibold border-2 border-primary-300/50 text-primary-300 hover:bg-primary-300/10 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-300/20 transition-all duration-300 group"
              onClick={handleNavigateToResearch}
            >
              <GraduationCap className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Marco Teórico</span>
              <TrendingUp className="ml-3 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </Button>
          </div>

          {/* Stats Académicos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-900">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm hover:from-bg-200 hover:to-bg-300 transition-all duration-300 group border border-primary-300/10 hover:border-primary-300/30">
              <div className="text-3xl md:text-4xl font-bold text-primary-300 mb-2 group-hover:scale-110 transition-transform">
                {counter}%
              </div>
              <div className="text-sm md:text-base text-text-200 group-hover:text-text-100 transition-colors">
                Precisión en Predicciones
              </div>
              <div className="mt-3 h-1 w-full bg-bg-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-100 to-primary-300 transition-all duration-1000"
                  style={{ width: `${counter}%` }}
                />
              </div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm hover:from-bg-200 hover:to-bg-300 transition-all duration-300 group border border-primary-300/10 hover:border-primary-300/30">
              <div className="text-3xl md:text-4xl font-bold text-primary-300 mb-2 group-hover:scale-110 transition-transform">
                3+
              </div>
              <div className="text-sm md:text-base text-text-200 group-hover:text-text-100 transition-colors">
                Disciplinas Integradas
              </div>
              <div className="flex justify-center mt-3 space-x-1">
                <Brain className="h-4 w-4 text-primary-300" />
                <TrendingUp className="h-4 w-4 text-accent-100" />
                <Zap className="h-4 w-4 text-primary-200" />
              </div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm hover:from-bg-200 hover:to-bg-300 transition-all duration-300 group border border-primary-300/10 hover:border-primary-300/30">
              <div className="text-3xl md:text-4xl font-bold text-primary-300 mb-2 group-hover:scale-110 transition-transform">
                6
              </div>
              <div className="text-sm md:text-base text-text-200 group-hover:text-text-100 transition-colors">
                Meses de Investigación
              </div>
              <div className="mt-3">
                <Calendar className="h-4 w-4 mx-auto text-primary-300/70" />
              </div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm hover:from-bg-200 hover:to-bg-300 transition-all duration-300 group border border-primary-300/10 hover:border-primary-300/30">
              <div className="text-3xl md:text-4xl font-bold text-primary-300 mb-2 group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-sm md:text-base text-text-200 group-hover:text-text-100 transition-colors">
                Reproducible
              </div>
              <div className="mt-3">
                <Shield className="h-4 w-4 mx-auto text-primary-300/70" />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <div className="flex flex-col items-center">
              <span className="text-sm text-text-200/60 mb-2">
                Explorar investigación
              </span>
              <div className="w-6 h-10 border-2 border-primary-300/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-primary-300 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Calendar faltante
const Calendar: React.FC<{ className?: string }> = ({ className }) => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default FeaturesHero;
