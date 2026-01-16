// src/components/analytics/FinancialHealthScore.tsx
import React, { useState, useEffect } from "react";
import {
  Heart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Zap,
  Target,
  DollarSign,
  Shield,
  Clock,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface FinancialHealthScoreProps {
  score: number;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({
  score = 78,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Animación del score
  useEffect(() => {
    const timer = setTimeout(() => {
      if (animatedScore < score) {
        setAnimatedScore((prev) => Math.min(prev + 2, score));
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [animatedScore, score]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary-200";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excelente";
    if (score >= 60) return "Bueno";
    if (score >= 40) return "Regular";
    return "Necesita atención";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-primary-100 to-accent-100";
    if (score >= 60) return "from-amber-500 to-orange-500";
    return "from-red-500 to-orange-500";
  };

  const healthComponents = [
    { name: "Ahorro", score: 85, weight: 30, icon: DollarSign },
    { name: "Deuda", score: 70, weight: 25, icon: Shield },
    { name: "Gastos", score: 75, weight: 20, icon: TrendingDown },
    { name: "Ingresos", score: 90, weight: 15, icon: TrendingUp },
    { name: "Consistencia", score: 65, weight: 10, icon: Clock },
  ];

  const recommendations = [
    "Aumenta tu tasa de ahorro al 25%",
    "Reduce gastos discrecionales en 15%",
    "Diversifica tus fuentes de ingreso",
    "Crea un fondo de emergencia de 3 meses",
    "Revisa y optimiza tus suscripciones",
  ];

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              Salud Financiera
            </CardTitle>
            <p className="text-text-200 text-sm mt-1">
              Puntuación integral basada en 5 componentes clave
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              className={`bg-gradient-to-r ${getScoreGradient(
                score
              )}/20 text-${getScoreColor(score).replace(
                "text-",
                ""
              )} border-${getScoreColor(score).replace("text-", "")}/30`}
            >
              {getScoreLabel(score)}
            </Badge>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-text-200 hover:text-primary-200"
            >
              {showDetails ? "Ocultar detalles" : "Ver detalles"}
              <ChevronRight
                className={`h-4 w-4 ml-2 transition-transform ${
                  showDetails ? "rotate-90" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Score principal con animación */}
        <div className="relative mb-8">
          <div className="flex flex-col items-center justify-center">
            {/* Círculo de progreso */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Fondo del círculo */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#454545"
                  strokeWidth="8"
                  strokeOpacity="0.3"
                />

                {/* Progreso animado */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#score-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${animatedScore * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-500"
                />

                {/* Gradiente para el círculo */}
                <defs>
                  <linearGradient
                    id="score-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#2E8B57" />
                    <stop offset="50%" stopColor="#61bc84" />
                    <stop offset="100%" stopColor="#8FBC8F" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Score en el centro */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
                  {animatedScore}
                </div>
                <div className="text-text-200 text-sm mt-2">de 100</div>
              </div>
            </div>

            {/* Leyenda */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-primary-100 rounded-full"></div>
                <span className="text-sm text-text-200">80-100: Excelente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-text-200">60-79: Bueno</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-text-200">0-59: Mejorable</span>
              </div>
            </div>
          </div>

          {/* Indicador de tendencia */}
          <div className="absolute top-0 right-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-primary-100/20 text-primary-200 border-primary-100/30">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8 puntos en 3 meses
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-bg-200 border-bg-300">
                  <p className="text-sm text-text-100">
                    Tu salud financiera ha mejorado consistentemente
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Detalles expandibles */}
        {showDetails && (
          <div className="mt-8 space-y-6">
            {/* Componentes de salud */}
            <div>
              <h4 className="text-text-100 font-medium mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary-200" />
                Componentes del Score
              </h4>

              <div className="space-y-4">
                {healthComponents.map((component, index) => {
                  const Icon = component.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary-100/20">
                            <Icon className="h-4 w-4 text-primary-200" />
                          </div>
                          <div>
                            <span className="text-text-100">
                              {component.name}
                            </span>
                            <div className="text-xs text-text-200">
                              Peso: {component.weight}%
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-32">
                            <Progress
                              value={component.score}
                              className="h-2 bg-bg-300/50"
                              indicatorClassName={
                                component.score >= 80
                                  ? "bg-primary-100"
                                  : component.score >= 60
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }
                            />
                          </div>
                          <span
                            className={`w-12 text-right font-medium ${
                              component.score >= 80
                                ? "text-primary-200"
                                : component.score >= 60
                                ? "text-amber-400"
                                : "text-red-400"
                            }`}
                          >
                            {component.score}/100
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recomendaciones */}
            <div>
              <h4 className="text-text-100 font-medium mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                Recomendaciones para Mejorar
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-100/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1 rounded bg-primary-100/20 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-primary-200" />
                      </div>
                      <span className="text-sm text-text-200">{rec}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights de IA */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary-100/20">
                  <Info className="h-5 w-5 text-primary-200" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-100">Insight de IA</h4>
                  <p className="text-sm text-text-200 mt-1">
                    Tu mayor oportunidad de mejora está en la consistencia
                    financiera. Mantener hábitos regulares de ahorro podría
                    aumentar tu score en 15 puntos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Acciones rápidas */}
        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-bg-300/40">
          <Button
            variant="outline"
            size="sm"
            className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Ver historial
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-accent-100/30 text-accent-100 hover:bg-accent-100/10"
          >
            <Target className="h-4 w-4 mr-2" />
            Establecer meta
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Simular cambios
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialHealthScore;
