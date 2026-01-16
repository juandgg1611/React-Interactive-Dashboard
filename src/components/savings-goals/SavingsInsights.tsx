// src/savings-goals/SavingsInsights.tsx
import React from "react";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Zap,
  Target,
  Clock,
  DollarSign,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

const SavingsInsights = () => {
  const insights = [
    {
      id: 1,
      type: "opportunity",
      icon: Zap,
      iconColor: "text-yellow-400",
      bgColor: "from-yellow-500/10 to-yellow-500/5",
      borderColor: "border-yellow-500/20",
      title: "Oportunidad Detectada",
      description:
        "Tienes $150 disponibles este mes que podrían acelerar tus metas de ahorro",
      action: "Aplicar sugerencia",
      impact: "+2 meses de anticipación",
      progress: 75,
    },
    {
      id: 2,
      type: "optimization",
      icon: Lightbulb,
      iconColor: "text-blue-400",
      bgColor: "from-blue-500/10 to-blue-500/5",
      borderColor: "border-blue-500/20",
      title: "Optimización Sugerida",
      description:
        "Reduciendo gastos en entretenimiento 15%, completarías 'Viaje a Playa' 2 meses antes",
      action: "Calcular ahorro",
      impact: "$85/mes adicionales",
      progress: 60,
    },
    {
      id: 3,
      type: "warning",
      icon: AlertCircle,
      iconColor: "text-red-400",
      bgColor: "from-red-500/10 to-red-500/5",
      borderColor: "border-red-500/20",
      title: "Atención Requerida",
      description:
        "Tu meta 'Fondo Emergencia' está al 25% - te faltan $3,750. Sugerimos aumentar aporte a $500/mes",
      action: "Revisar meta",
      impact: "Completar en 12 meses",
      progress: 25,
    },
    {
      id: 4,
      type: "achievement",
      icon: TrendingUp,
      iconColor: "text-green-400",
      bgColor: "from-green-500/10 to-green-500/5",
      borderColor: "border-green-500/20",
      title: "Excelente Progreso",
      description:
        "Vas 3 meses adelantado en tu meta principal 'Compra de Auto'. ¡Sigue así!",
      action: "Ver detalles",
      impact: "Completar en 15 meses",
      progress: 95,
    },
  ];

  const metrics = [
    { label: "Tasa de éxito", value: "85%", change: "+5%", positive: true },
    {
      label: "Ahorro mensual",
      value: "$1,250",
      change: "+$120",
      positive: true,
    },
    { label: "Metas en riesgo", value: "1", change: "-2", positive: true },
    {
      label: "Tiempo promedio",
      value: "8 meses",
      change: "-1 mes",
      positive: true,
    },
  ];

  const formatCurrency = (amount: string) => {
    if (amount.includes("$")) return amount;
    return `$${amount}`;
  };

  return (
    <div className="space-y-6">
      {/* Insights principales */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-text-100 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-200" />
            Insights Inteligentes
          </CardTitle>
          <CardDescription className="text-text-200">
            Recomendaciones personalizadas basadas en tu comportamiento de
            ahorro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => {
              const Icon = insight.icon;
              return (
                <div
                  key={insight.id}
                  className={`p-4 rounded-xl bg-gradient-to-br ${insight.bgColor} border ${insight.borderColor} hover:shadow-xl transition-all duration-300 group`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${insight.iconColor.replace(
                        "text",
                        "bg"
                      )}/20`}
                    >
                      <Icon className={`h-5 w-5 ${insight.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-100">
                          {insight.title}
                        </h4>
                        <Badge
                          className={
                            insight.type === "achievement"
                              ? "bg-green-500/20 text-green-400"
                              : insight.type === "warning"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }
                        >
                          {insight.type === "achievement"
                            ? "Logro"
                            : insight.type === "warning"
                            ? "Atención"
                            : insight.type === "optimization"
                            ? "Optimización"
                            : "Oportunidad"}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-200 mb-3">
                        {insight.description}
                      </p>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-text-200 mb-1">
                          <span>Impacto potencial</span>
                          <span className="font-medium">{insight.impact}</span>
                        </div>
                        <Progress
                          value={insight.progress}
                          className="h-1.5 bg-bg-300/50"
                          indicatorClassName={
                            insight.type === "achievement"
                              ? "bg-green-400"
                              : insight.type === "warning"
                              ? "bg-red-400"
                              : insight.type === "optimization"
                              ? "bg-blue-400"
                              : "bg-yellow-400"
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`${
                            insight.iconColor
                          } hover:${insight.iconColor.replace("400", "300")}`}
                        >
                          {insight.action}
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                        <span className="text-xs text-text-200">
                          {insight.progress}% relevante
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Métricas de rendimiento */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-text-100">Rendimiento de Ahorro</CardTitle>
          <CardDescription className="text-text-200">
            Comparativa con tus patrones históricos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40"
              >
                <div className="text-sm text-text-200 mb-2">{metric.label}</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-text-100">
                    {formatCurrency(metric.value)}
                  </div>
                  <div
                    className={`text-xs flex items-center ${
                      metric.positive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {metric.positive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div className="text-xs text-text-200/60 mt-2">
                  vs mes anterior
                </div>
              </div>
            ))}
          </div>

          {/* Comparativa de progreso */}
          <div className="mt-6 pt-6 border-t border-bg-300/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-text-100 mb-1">
                  Comparativa de Progreso
                </h4>
                <p className="text-sm text-text-200">
                  Tu ritmo vs. promedio de usuarios similares
                </p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18% más rápido
              </Badge>
            </div>

            <div className="space-y-4">
              {[
                { label: "Tu progreso", value: 75, color: "#2E8B57" },
                { label: "Promedio usuarios", value: 57, color: "#61bc84" },
                { label: "Meta óptima", value: 85, color: "#c6ffe6" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-text-100 font-medium">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-text-200">{item.value}%</span>
                  </div>
                  <Progress
                    value={item.value}
                    className="h-2 bg-bg-300/50"
                    indicatorClassName="bg-gradient-to-r from-primary-100 to-primary-200"
                    style={{
                      ["--progress-color" as any]: item.color,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recomendaciones de próximo paso */}
      <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-200/5 backdrop-blur-md border border-primary-100/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                <Target className="h-6 w-6 text-primary-200" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-2">
                  Próximo paso recomendado
                </h3>
                <p className="text-text-200">
                  Activa el{" "}
                  <span className="font-medium text-primary-200">
                    redondeo de transacciones
                  </span>{" "}
                  para ahorrar automáticamente $45-85 al mes sin esfuerzo.
                </p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white whitespace-nowrap">
              <Zap className="h-4 w-4 mr-2" />
              Activar ahora
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavingsInsights;
