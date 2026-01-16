// src/components/analytics/AIForecastPanel.tsx
import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Calendar,
  Zap,
  Target,
  DollarSign,
  AlertCircle,
  Clock,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const AIForecastPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedForecast, setSelectedForecast] = useState("income");

  const forecasts = {
    income: {
      current: 4250,
      nextMonth: 4375,
      change: 3.5,
      confidence: 92,
      factors: [
        { name: "Tendencia histórica", impact: "Alto" },
        { name: "Estacionalidad", impact: "Medio" },
        { name: "Crecimiento profesional", impact: "Alto" },
      ],
    },
    expenses: {
      current: 3120,
      nextMonth: 3250,
      change: 4.2,
      confidence: 85,
      factors: [
        { name: "Inflación proyectada", impact: "Alto" },
        { name: "Patrones de consumo", impact: "Medio" },
        { name: "Eventos estacionales", impact: "Bajo" },
      ],
    },
    savings: {
      current: 1130,
      nextMonth: 1125,
      change: -0.4,
      confidence: 78,
      factors: [
        { name: "Cambio en ingresos", impact: "Alto" },
        { name: "Aumento gastos", impact: "Alto" },
        { name: "Disciplina ahorro", impact: "Medio" },
      ],
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400";
    if (confidence >= 80) return "text-yellow-400";
    return "text-red-400";
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return "bg-green-500/20 text-green-400";
    if (confidence >= 80) return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-400" : "text-red-400";
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  const selectedData = forecasts[selectedForecast as keyof typeof forecasts];

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/20 border border-primary-100/30">
                <Brain className="h-5 w-5 text-primary-200" />
              </div>
              <span>Pronósticos de IA</span>
            </CardTitle>
            <p className="text-text-200 text-sm mt-1">
              Predicciones inteligentes basadas en tus datos históricos
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-primary-100/20 text-primary-200 border-primary-100/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Modelo 98% entrenado
            </Badge>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-text-200 hover:text-primary-200"
            >
              {isExpanded ? "Menos detalles" : "Más detalles"}
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
        </div>

        {/* Selector de pronósticos */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant={selectedForecast === "income" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedForecast("income")}
            className={
              selectedForecast === "income"
                ? "bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 border-green-500/30"
                : "text-text-200 hover:text-green-400"
            }
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Ingresos
          </Button>

          <Button
            variant={selectedForecast === "expenses" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedForecast("expenses")}
            className={
              selectedForecast === "expenses"
                ? "bg-gradient-to-r from-red-500/20 to-red-500/10 text-red-400 border-red-500/30"
                : "text-text-200 hover:text-red-400"
            }
          >
            <TrendingDown className="h-4 w-4 mr-2" />
            Gastos
          </Button>

          <Button
            variant={selectedForecast === "savings" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedForecast("savings")}
            className={
              selectedForecast === "savings"
                ? "bg-gradient-to-r from-primary-100/20 to-primary-100/10 text-primary-200 border-primary-100/30"
                : "text-text-200 hover:text-primary-200"
            }
          >
            <Target className="h-4 w-4 mr-2" />
            Ahorro
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Pronóstico principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Mes actual */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
            <div className="text-sm text-text-200">Mes Actual</div>
            <div className="text-2xl font-bold text-text-100 mt-2">
              {formatCurrency(selectedData.current)}
            </div>
            <div className="text-xs text-text-200/70 mt-2">
              Promedio últimos 3 meses
            </div>
          </div>

          {/* Próximo mes */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20 relative">
            <div className="absolute -top-2 -right-2">
              <Badge className="bg-primary-100/20 text-primary-200">
                <Zap className="h-3 w-3 mr-1" />
                Predicción IA
              </Badge>
            </div>
            <div className="text-sm text-text-200">Próximo Mes</div>
            <div className="text-2xl font-bold text-text-100 mt-2">
              {formatCurrency(selectedData.nextMonth)}
            </div>
            <div
              className={`text-sm mt-2 flex items-center ${getChangeColor(
                selectedData.change
              )}`}
            >
              {(() => {
                const Icon = getChangeIcon(selectedData.change);
                return <Icon className="h-4 w-4 mr-2" />;
              })()}
              {selectedData.change > 0 ? "+" : ""}
              {selectedData.change}%
            </div>
          </div>

          {/* Confianza */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
            <div className="text-sm text-text-200">Confianza IA</div>
            <div
              className={`text-2xl font-bold mt-2 ${getConfidenceColor(
                selectedData.confidence
              )}`}
            >
              {selectedData.confidence}%
            </div>
            <div className="mt-3">
              <Progress
                value={selectedData.confidence}
                className="h-2 bg-bg-300/50"
                indicatorClassName={
                  selectedData.confidence >= 90
                    ? "bg-green-500"
                    : selectedData.confidence >= 80
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
              />
            </div>
          </div>
        </div>

        {/* Contenido colapsable - CORRECCIÓN PRINCIPAL */}
        {isExpanded && (
          <>
            {/* Factores de influencia */}
            <div className="mb-6">
              <h4 className="text-text-100 font-medium mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary-200" />
                Factores de Influencia
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedData.factors.map((factor, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-100">
                        {factor.name}
                      </span>
                      <Badge
                        className={
                          factor.impact === "Alto"
                            ? "bg-red-500/20 text-red-400"
                            : factor.impact === "Medio"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }
                      >
                        {factor.impact}
                      </Badge>
                    </div>
                    <div className="text-xs text-text-200">
                      Impacto en la predicción
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explicación del modelo */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary-100/20">
                  <Shield className="h-5 w-5 text-primary-200" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-100">
                    ¿Cómo funciona nuestro modelo?
                  </h4>
                  <p className="text-sm text-text-200 mt-1">
                    Nuestra IA analiza tus patrones históricos, estacionalidad,
                    correlaciones con eventos externos y tendencias del mercado
                    para generar predicciones con {selectedData.confidence}% de
                    confianza. El modelo se re-entrena automáticamente cada
                    semana con tus nuevos datos.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Alertas relacionadas */}
        <div className="mt-6 pt-6 border-t border-bg-300/40">
          <h4 className="text-text-100 font-medium mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-400" />
            Alertas Relacionadas
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-yellow-400" />
                <div>
                  <div className="text-sm text-text-100">
                    Cambio significativo detectado
                  </div>
                  <div className="text-xs text-text-200">
                    La tendencia podría afectar tus metas de ahorro
                  </div>
                </div>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-400">
                Monitorear
              </Badge>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white">
            <Brain className="h-4 w-4 mr-2" />
            Generar pronóstico detallado
          </Button>
          <Button
            variant="outline"
            className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Ver proyección anual
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIForecastPanel;
