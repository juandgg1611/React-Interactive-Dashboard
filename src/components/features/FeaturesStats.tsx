// src/components/features/FeaturesStats.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  TrendingUp,
  Users,
  Zap,
  Award,
  Target,
  CheckCircle,
  BarChart3,
  Brain,
  DollarSign,
  Activity,
  Clock,
  Sparkles,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";

export interface FeatureMetric {
  name: string;
  value: number;
  unit: string;
  description: string;
  change: number;
  target: number;
  color: string;
  icon: React.ReactNode;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  color: string;
}

const FeaturesStats: React.FC = () => {
  const [activeTab, setActiveTab] = useState("performance");
  const [animateCards, setAnimateCards] = useState(false);
  const [counters, setCounters] = useState({
    accuracy: 0,
    users: 0,
    transactions: 0,
    savings: 0,
  });

  const metrics: FeatureMetric[] = [
    {
      name: "Precisión de Clasificación",
      value: 95.2,
      unit: "%",
      description: "Exactitud del modelo BERT en categorizar transacciones",
      change: 3.2,
      target: 97,
      color: "from-primary-100 to-primary-200",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: "Reducción de Error (MAE)",
      value: 8.2,
      unit: "%",
      description: "Error absoluto medio en predicciones financieras",
      change: -2.1,
      target: 5,
      color: "from-primary-200 to-accent-100",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      name: "Tasa de Engagement",
      value: 85,
      unit: "%",
      description: "Usuarios que interactúan diariamente con el sistema",
      change: 12.5,
      target: 90,
      color: "from-accent-100 to-primary-200",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      name: "Ahorro Promedio",
      value: 32,
      unit: "%",
      description: "Incremento en tasa de ahorro tras usar el sistema",
      change: 15.3,
      target: 40,
      color: "from-primary-100 to-accent-100",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      name: "Latencia del Sistema",
      value: 185,
      unit: "ms",
      description: "Tiempo de respuesta promedio de las APIs",
      change: -25,
      target: 150,
      color: "from-accent-200 to-primary-100",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      name: "Satisfacción del Usuario",
      value: 4.8,
      unit: "/5",
      description: "Puntuación promedio en encuestas de usabilidad",
      change: 0.4,
      target: 5,
      color: "from-primary-200 to-accent-100",
      icon: <Award className="h-5 w-5" />,
    },
  ];

  const researchResults = [
    {
      title: "Validación Experimental",
      description: "Estudio controlado con 50 participantes durante 3 meses",
      icon: <Users className="h-5 w-5" />,
      color: "from-primary-100 to-primary-200",
      findings: [
        "95% precisión en categorización automática",
        "32% aumento en tasa de ahorro promedio",
        "85% satisfacción del usuario (SUS Score: 85/100)",
      ],
      methodology: "Doble ciego, grupos control/experimental",
    },
    {
      title: "Benchmark de Modelos",
      description: "Comparativa de 5 algoritmos de ML en dataset financiero",
      icon: <Brain className="h-5 w-5" />,
      color: "from-accent-100 to-primary-200",
      findings: [
        "BERT: 95.2% precisión (mejor resultado)",
        "Random Forest: 93% precisión, 150ms (mejor equilibrio)",
        "LSTM: 91% precisión para series temporales",
      ],
      methodology: "Cross-validation 5-fold, métricas estándar",
    },
    {
      title: "Impacto Conductual",
      description: "Efectividad de intervenciones basadas en nudges",
      icon: <Target className="h-5 w-5" />,
      color: "from-primary-200 to-accent-100",
      findings: [
        "Notificaciones inteligentes: +45% engagement",
        "Gamificación: +28% retención a 30 días",
        "Feedback personalizado: +32% efectividad",
      ],
      methodology: "A/B testing, análisis estadístico",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Dr. María González",
      role: "Profesora de Economía, URBE",
      content:
        "El rigor metodológico y la integración multidisciplinaria hacen de este proyecto un referente en investigación aplicada.",
      rating: 5,
      color: "from-primary-100 to-primary-200",
    },
    {
      name: "Ing. Carlos Rodríguez",
      role: "CTO FinTech Startup",
      content:
        "La arquitectura técnica y la implementación de modelos de ML son excepcionales. Código bien documentado y reproducible.",
      rating: 5,
      color: "from-accent-100 to-accent-200",
    },
    {
      name: "Lic. Ana Martínez",
      role: "Especialista en UX Research",
      content:
        "La interfaz intuitiva y las intervenciones conductuales muestran un profundo entendimiento de las necesidades del usuario.",
      rating: 4,
      color: "from-primary-200 to-accent-100",
    },
  ];

  useEffect(() => {
    // Trigger card animations on mount
    setTimeout(() => setAnimateCards(true), 100);

    // Start counter animations
    const interval = setInterval(() => {
      setCounters((prev) => {
        const newAccuracy = Math.min(95.2, prev.accuracy + 1.5);
        const newUsers = Math.min(1250, prev.users + 25);
        const newTransactions = Math.min(10000, prev.transactions + 150);
        const newSavings = Math.min(32, prev.savings + 0.5);

        // Stop animation when all counters reach their targets
        if (
          newAccuracy >= 95.2 &&
          newUsers >= 1250 &&
          newTransactions >= 10000 &&
          newSavings >= 32
        ) {
          clearInterval(interval);
        }

        return {
          accuracy: newAccuracy,
          users: newUsers,
          transactions: newTransactions,
          savings: newSavings,
        };
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards - Colores más vivos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <Card
          className={cn(
            "border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-200/40 hover:border-primary-200/60 transition-all duration-500 shadow-lg hover:shadow-primary-200/20",
            animateCards
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "0ms" }}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-100/30 to-primary-200/30 border border-primary-200/50 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary-200" />
              </div>
              <Badge className="bg-primary-100/30 text-primary-200 border border-primary-200/50 text-xs">
                +{metrics[0].change}%
              </Badge>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-200 mb-1">
              {counters.accuracy.toFixed(1)}%
            </div>
            <div className="text-xs sm:text-sm text-text-200">Precisión IA</div>
            <Progress
              value={(counters.accuracy / metrics[0].target) * 100}
              className="mt-3 h-2 bg-bg-300/50 [&>div]:bg-gradient-to-r [&>div]:from-primary-100 [&>div]:to-primary-200"
            />
          </CardContent>
        </Card>

        <Card
          className={cn(
            "border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-accent-100/40 hover:border-accent-100/60 transition-all duration-500 shadow-lg hover:shadow-accent-100/20",
            animateCards
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "100ms" }}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent-100/30 to-primary-200/30 border border-accent-100/50 flex items-center justify-center">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent-100" />
              </div>
              <Badge className="bg-accent-100/30 text-accent-100 border border-accent-100/50 text-xs">
                +15%
              </Badge>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-accent-100 mb-1">
              {counters.users.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-text-200">
              Usuarios Activos
            </div>
            <Progress
              value={(counters.users / 1250) * 100}
              className="mt-3 h-2 bg-bg-300/50 [&>div]:bg-gradient-to-r [&>div]:from-accent-100 [&>div]:to-primary-200"
            />
          </CardContent>
        </Card>

        <Card
          className={cn(
            "border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-100/40 hover:border-primary-100/60 transition-all duration-500 shadow-lg hover:shadow-primary-100/20",
            animateCards
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "200ms" }}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-200/30 to-accent-100/30 border border-primary-100/50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary-100" />
              </div>
              <Badge className="bg-primary-100/30 text-primary-100 border border-primary-100/50 text-xs">
                +{counters.savings.toFixed(1)}%
              </Badge>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-100 mb-1">
              {counters.savings.toFixed(1)}%
            </div>
            <div className="text-xs sm:text-sm text-text-200">
              Ahorro Promedio
            </div>
            <Progress
              value={(counters.savings / metrics[3].target) * 100}
              className="mt-3 h-2 bg-bg-300/50 [&>div]:bg-gradient-to-r [&>div]:from-primary-100 [&>div]:to-accent-100"
            />
          </CardContent>
        </Card>

        <Card
          className={cn(
            "border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-200/40 hover:border-primary-200/60 transition-all duration-500 shadow-lg hover:shadow-primary-200/20",
            animateCards
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "300ms" }}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent-200/30 to-primary-100/30 border border-primary-200/50 flex items-center justify-center">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary-200" />
              </div>
              <Badge className="bg-accent-200/30 text-primary-200 border border-primary-200/50 text-xs">
                -25ms
              </Badge>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-200 mb-1">
              {metrics[4].value}ms
            </div>
            <div className="text-xs sm:text-sm text-text-200">Latencia API</div>
            <Progress
              value={(metrics[4].target / metrics[4].value) * 100}
              className="mt-3 h-2 bg-bg-300/50 [&>div]:bg-gradient-to-r [&>div]:from-accent-200 [&>div]:to-primary-100"
            />
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes vistas */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6 sm:space-y-8"
      >
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-bg-300/30 border border-primary-200/20 p-1.5 rounded-xl">
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-primary-100/30 data-[state=active]:text-primary-200 data-[state=active]:border data-[state=active]:border-primary-200/50 transition-all duration-300 text-xs sm:text-sm"
          >
            <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Rendimiento</span>
            <span className="sm:hidden">Métricas</span>
          </TabsTrigger>
          <TabsTrigger
            value="research"
            className="data-[state=active]:bg-primary-100/30 data-[state=active]:text-primary-200 data-[state=active]:border data-[state=active]:border-primary-200/50 transition-all duration-300 text-xs sm:text-sm"
          >
            <Award className="h-4 w-4 mr-1 sm:mr-2" />
            Hallazgos
          </TabsTrigger>
          <TabsTrigger
            value="testimonials"
            className="data-[state=active]:bg-primary-100/30 data-[state=active]:text-primary-200 data-[state=active]:border data-[state=active]:border-primary-200/50 transition-all duration-300 text-xs sm:text-sm"
          >
            <Users className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Testimonios</span>
            <span className="sm:hidden">Opiniones</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Métricas de Rendimiento */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {metrics.map((metric, idx) => (
              <Card
                key={idx}
                className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-200/30 hover:border-primary-200/50 transition-all duration-300 group shadow-lg hover:shadow-primary-200/20"
              >
                <CardHeader className="pb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center border",
                          "from-primary-100/20 to-primary-200/20 border-primary-200/50 text-primary-200",
                        )}
                      >
                        {metric.icon}
                      </div>
                      <CardTitle className="text-sm sm:text-base font-semibold text-text-100">
                        {metric.name}
                      </CardTitle>
                    </div>
                    <Badge
                      className={cn(
                        "text-xs border",
                        metric.change >= 0
                          ? "bg-primary-100/30 text-primary-200 border-primary-200/50"
                          : "bg-accent-200/30 text-primary-200 border-primary-200/50",
                      )}
                    >
                      {metric.change >= 0 ? "+" : ""}
                      {Math.abs(metric.change)}
                      {metric.unit}
                    </Badge>
                  </div>
                  <p className="text-xs text-text-200/60 leading-relaxed">
                    {metric.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-end justify-between">
                    <div className="text-xl sm:text-2xl font-bold text-primary-200">
                      {metric.value}
                      {metric.unit}
                    </div>
                    <div className="text-xs text-text-200/60">
                      Meta: {metric.target}
                      {metric.unit}
                    </div>
                  </div>
                  <div className="relative">
                    <Progress
                      value={Math.min(
                        100,
                        (metric.value / metric.target) * 100,
                      )}
                      className="h-2 bg-bg-300/50"
                    />
                    <div
                      className={cn(
                        "absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r transition-all duration-1000",
                        metric.color,
                      )}
                      style={{
                        width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2: Resultados de Investigación */}
        <TabsContent value="research" className="space-y-6">
          <div className="space-y-6">
            {researchResults.map((result, idx) => (
              <Card
                key={idx}
                className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-200/30 hover:border-primary-200/50 hover:shadow-xl transition-all duration-300 shadow-lg"
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <div
                        className={cn(
                          "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 text-white border border-primary-200/50",
                          result.color,
                        )}
                      >
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg text-text-100 mb-1">
                          {result.title}
                        </CardTitle>
                        <p className="text-xs sm:text-sm text-text-200">
                          {result.description}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-primary-200/50 text-primary-200 w-fit text-xs"
                    >
                      {result.methodology}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-text-100 flex items-center text-sm sm:text-base">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary-200 flex-shrink-0" />
                      Hallazgos Principales
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                      {result.findings.map((finding, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-3 sm:p-4 rounded-lg bg-bg-300/20 border border-primary-200/20 hover:border-primary-200/40 transition-colors"
                        >
                          <div className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-primary-200 mt-1.5 mr-2 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-text-200 leading-relaxed">
                              {finding}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 3: Testimonios */}
        <TabsContent value="testimonials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm border border-primary-200/30 hover:border-primary-200/50 transition-all duration-300 shadow-lg hover:shadow-primary-200/20"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 border border-primary-200/50",
                        testimonial.color,
                      )}
                    >
                      <span className="text-white font-bold text-sm">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-text-100 text-sm truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-text-200/60 truncate">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-text-200 mb-4 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-primary-200/20">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4 transition-all duration-200",
                            i < testimonial.rating
                              ? "text-primary-200 fill-primary-200"
                              : "text-text-200/30",
                          )}
                        />
                      ))}
                    </div>
                    <Badge
                      variant="outline"
                      className="border-primary-200/50 text-primary-200 text-xs"
                    >
                      Evaluador
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Conclusiones */}
      <Card className="mt-8 border-0 bg-gradient-to-br from-primary-100/10 to-primary-200/10 backdrop-blur-sm border-l-4 border-l-primary-200 shadow-lg border border-primary-200/30">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-base sm:text-lg font-bold text-text-100 mb-2">
                Conclusiones del Estudio
              </h4>
              <p className="text-sm sm:text-base text-text-200 mb-4 leading-relaxed">
                La integración de Machine Learning, Behavioral Economics e
                Ingeniería de Software demuestra ser efectiva para transformar
                hábitos financieros. Los resultados muestran mejoras
                significativas en precisión de predicciones, engagement del
                usuario y resultados financieros concretos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-3 rounded-lg bg-bg-300/20 border border-primary-200/30 hover:border-primary-200/50 transition-colors">
                  <div className="text-xs text-text-200/60 mb-1">
                    Contribución Principal
                  </div>
                  <div className="text-xs sm:text-sm text-primary-200 font-medium">
                    Framework integrado multidisciplinario
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-bg-300/20 border border-primary-200/30 hover:border-primary-200/50 transition-colors">
                  <div className="text-xs text-text-200/60 mb-1">
                    Innovación
                  </div>
                  <div className="text-xs sm:text-sm text-primary-200 font-medium">
                    Nuevos algoritmos híbridos de IA
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-bg-300/20 border border-primary-200/30 hover:border-primary-200/50 transition-colors">
                  <div className="text-xs text-text-200/60 mb-1">Impacto</div>
                  <div className="text-xs sm:text-sm text-primary-200 font-medium">
                    +32% mejora en hábitos financieros
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente Star para ratings
const Star: React.FC<{ className?: string }> = ({ className }) => (
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default FeaturesStats;
