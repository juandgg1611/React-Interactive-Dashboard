// src/components/analytics/BenchmarkComparison.tsx
import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  ChevronUp,
  ChevronDown,
  BarChart3,
  Download,
  Sparkles,
  Zap,
  Crown,
  Percent,
  DollarSign,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const BenchmarkComparison = () => {
  const [benchmarkGroup, setBenchmarkGroup] = useState("similar-users");

  // Grupos de comparación simplificados
  const benchmarkGroups = [
    {
      id: "similar-users",
      name: "Usuarios Similares",
      description: "Perfiles de edad, ingresos y ubicación similares",
      icon: Users,
      color: "text-primary-200",
      userCount: "1,240 usuarios",
    },
    {
      id: "age-group",
      name: "Mismo Grupo de Edad",
      description: "Usuarios de 25-34 años",
      icon: Target,
      color: "text-accent-100",
      userCount: "3,850 usuarios",
    },
    {
      id: "income-bracket",
      name: "Mismo Nivel de Ingresos",
      description: "Ingresos de $3,000-$5,000 mensuales",
      icon: DollarSign,
      color: "text-primary-200",
      userCount: "2,150 usuarios",
    },
  ];

  // Métricas clave simplificadas
  const metricsData = [
    {
      id: 1,
      name: "Tasa de Ahorro",
      userValue: 20.5,
      benchmarkValue: 18.2,
      unit: "%",
      userPercentile: 75,
      trend: "up",
      improvement: "+2.3%",
      icon: Percent,
      color: "text-primary-200",
      bgColor: "bg-primary-100/10",
    },
    {
      id: 2,
      name: "Ratio Gastos/Ingresos",
      userValue: 75.2,
      benchmarkValue: 79.8,
      unit: "%",
      userPercentile: 65,
      trend: "down",
      improvement: "-4.6%",
      icon: TrendingDown,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      id: 3,
      name: "Crecimiento de Ingresos",
      userValue: 12.5,
      benchmarkValue: 8.7,
      unit: "%",
      userPercentile: 85,
      trend: "up",
      improvement: "+3.8%",
      icon: TrendingUp,
      color: "text-primary-200",
      bgColor: "bg-primary-100/10",
    },
    {
      id: 4,
      name: "Fondo de Emergencia",
      userValue: 2.8,
      benchmarkValue: 1.5,
      unit: "meses",
      userPercentile: 82,
      trend: "up",
      improvement: "+1.3",
      icon: Shield,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ];

  // Calcular percentil promedio
  const avgPercentile = Math.round(
    metricsData.reduce((sum, m) => sum + m.userPercentile, 0) /
      metricsData.length
  );

  const activeBenchmarkGroup = benchmarkGroups.find(
    (g) => g.id === benchmarkGroup
  );

  // Formatear valores
  const formatValue = (value: number, unit: string) => {
    if (unit === "%") return `${value.toFixed(1)}%`;
    return unit === "meses" ? `${value} meses` : `${value.toFixed(1)}`;
  };

  // Obtener color según percentil
  const getPercentileColor = (percentile: number) => {
    if (percentile >= 80) return "text-primary-200";
    if (percentile >= 60) return "text-amber-400";
    return "text-red-400";
  };

  // Obtener icono de tendencia
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? ChevronUp : ChevronDown;
  };

  // Obtener color de tendencia
  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-primary-200" : "text-red-400";
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary-200" />
              Comparativa con Benchmarks
            </CardTitle>
            <CardDescription className="text-text-200">
              Compara tu desempeño con usuarios similares
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${getPercentileColor(
                  avgPercentile
                )}`}
              >
                {avgPercentile}
              </div>
              <div className="text-xs text-text-200">Percentil</div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Selector de grupo */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-primary-200" />
            <span className="text-sm text-text-200">Comparar con:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {benchmarkGroups.map((group) => {
              const Icon = group.icon;
              const isActive = benchmarkGroup === group.id;

              return (
                <button
                  key={group.id}
                  onClick={() => setBenchmarkGroup(group.id)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    isActive
                      ? "bg-primary-100/10 border-primary-100/30"
                      : "border-bg-300/50 bg-bg-300/20 hover:border-primary-200/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isActive ? "bg-primary-100/20" : "bg-bg-300/30"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isActive ? "text-primary-200" : "text-text-200"
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <div
                        className={`font-medium text-sm ${
                          isActive ? "text-primary-200" : "text-text-100"
                        }`}
                      >
                        {group.name}
                      </div>
                      <div className="text-xs text-text-200">
                        {group.userCount}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resumen de desempeño */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-100/20">
                <Award className="h-5 w-5 text-primary-200" />
              </div>
              <div>
                <h4 className="font-semibold text-text-100">
                  {avgPercentile >= 80
                    ? "¡Desempeño Excepcional!"
                    : avgPercentile >= 60
                    ? "Buen Desempeño"
                    : "Oportunidad de Mejora"}
                </h4>
                <p className="text-sm text-text-200">
                  Estás en el percentil {avgPercentile} de{" "}
                  {activeBenchmarkGroup?.name.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {metricsData.map((metric) => {
            const Icon = metric.icon;
            const TrendIcon = getTrendIcon(metric.trend);
            const isAboveAverage = metric.userValue > metric.benchmarkValue;

            return (
              <Card
                key={metric.id}
                className="border-0 bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                        <Icon className={`h-4 w-4 ${metric.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-100 text-sm">
                          {metric.name}
                        </h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-text-100">
                        {formatValue(metric.userValue, metric.unit)}
                      </div>
                      <div className="text-xs text-text-200">Tú</div>
                    </div>
                  </div>

                  {/* Barra comparativa */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-text-200 mb-1">
                      <span>
                        Promedio:{" "}
                        {formatValue(metric.benchmarkValue, metric.unit)}
                      </span>
                      <div
                        className={`flex items-center gap-1 ${getTrendColor(
                          metric.trend
                        )}`}
                      >
                        <TrendIcon className="h-3 w-3" />
                        <span className="font-medium">
                          {metric.improvement}
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-bg-300/50 rounded-full overflow-hidden">
                      <div
                        className={`absolute h-full ${
                          isAboveAverage ? "bg-primary-100" : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            100,
                            (metric.userValue / (metric.benchmarkValue * 1.5)) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Percentil */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-200">Percentil</div>
                    <div className="flex items-center gap-2">
                      <div className="w-16">
                        <Progress
                          value={metric.userPercentile}
                          className="h-1.5 bg-bg-300/50"
                          indicatorClassName={
                            metric.userPercentile >= 80
                              ? "bg-primary-100"
                              : metric.userPercentile >= 60
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${getPercentileColor(
                          metric.userPercentile
                        )}`}
                      >
                        {metric.userPercentile}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recomendaciones */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary-100/20">
              <Sparkles className="h-4 w-4 text-primary-200" />
            </div>
            <div>
              <h4 className="font-semibold text-text-100 text-sm mb-2">
                {avgPercentile >= 80
                  ? "¡Excelente trabajo!"
                  : "Oportunidades identificadas"}
              </h4>
              <p className="text-sm text-text-200">
                {avgPercentile >= 80
                  ? "Todas tus métricas están por encima del promedio. Sigue así."
                  : metricsData
                      .filter((m) => m.userPercentile < 60)
                      .map((m) => m.name)
                      .join(", ") ||
                    "Tus métricas son buenas, pero puedes mejorar."}
              </p>
              {avgPercentile < 80 && (
                <Button
                  size="sm"
                  className="mt-3 bg-gradient-to-r from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 text-white"
                >
                  <Target className="h-3 w-3 mr-2" />
                  Ver plan de mejora
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenchmarkComparison;
