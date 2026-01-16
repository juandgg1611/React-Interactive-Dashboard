import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { MonthlyBudget } from "../../types/budget.types";

interface BudgetOverviewProps {
  budget: MonthlyBudget;
  previousMonthComparison: number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  budget,
  previousMonthComparison,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = () => {
    if (budget.progress <= 70) return "text-green-400";
    if (budget.progress <= 90) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusIcon = () => {
    if (budget.progress <= 70)
      return <CheckCircle className="h-5 w-5 text-green-400" />;
    if (budget.progress <= 90)
      return <AlertCircle className="h-5 w-5 text-yellow-400" />;
    return <AlertCircle className="h-5 w-5 text-red-400" />;
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 h-full">
      {/* CAMBIO: Agregado h-full */}
      <CardHeader className="pb-3">
        {" "}
        {/* CAMBIO: padding bottom reducido */}
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-text-100">
              Visión General del Presupuesto
            </CardTitle>
            <p className="text-sm text-text-200">
              {budget.month} {budget.year} • Estado:{" "}
              {budget.status === "on-track"
                ? "En camino"
                : budget.status === "over"
                ? "Excedido"
                : "Por debajo"}
            </p>
          </div>
          <Badge
            className={`${
              budget.progress <= 70
                ? "bg-green-400/20 text-green-400 border-green-400/30"
                : budget.progress <= 90
                ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                : "bg-red-400/20 text-red-400 border-red-400/30"
            }`}
          >
            {getStatusIcon()}
            <span className="ml-1">
              {budget.progress <= 70
                ? "Saludable"
                : budget.progress <= 90
                ? "Moderado"
                : "Crítico"}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)]">
        {" "}
        {/* CAMBIO: altura calculada */}
        <div className="space-y-4 h-full flex flex-col">
          {/* CAMBIO: flex y columna completa */}
          {/* Anillo de progreso - Reducido */}
          <div className="relative w-40 h-40 mx-auto">
            {" "}
            {/* CAMBIO: tamaño reducido */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#2d2d2d"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={
                  budget.progress > 90
                    ? "#EF4444"
                    : budget.progress > 70
                    ? "#F59E0B"
                    : "#10B981"
                }
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${budget.progress * 2.83} 283`}
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${getStatusColor()}`}>
                {budget.progress}%
              </span>
              <span className="text-xs text-text-200">Utilizado</span>
              <div className="text-lg font-semibold text-text-100 mt-1">
                {formatCurrency(budget.remaining)}
              </div>
              <div className="text-xs text-text-200">Restante</div>
            </div>
          </div>

          {/* Estadísticas - Reducido */}
          <div className="grid grid-cols-3 gap-2">
            {" "}
            {/* CAMBIO: gap reducido */}
            <div className="text-center p-3 bg-gradient-to-br from-primary-100/10 to-primary-100/5 rounded-xl border border-primary-100/20">
              <div className="text-lg font-bold text-primary-200">
                {formatCurrency(budget.totalLimit)}
              </div>
              <div className="text-xs text-text-200 mt-1">Presupuesto</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-bg-300/30 to-bg-300/10 rounded-xl border border-bg-300/40">
              <div className="text-lg font-bold text-text-100">
                {formatCurrency(budget.totalSpent)}
              </div>
              <div className="text-xs text-text-200 mt-1">Gastado</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-accent-100/10 to-accent-100/5 rounded-xl border border-accent-100/20">
              <div
                className={`text-lg font-bold ${
                  previousMonthComparison >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {previousMonthComparison >= 0 ? "+" : ""}
                {previousMonthComparison}%
              </div>
              <div className="flex items-center justify-center text-xs text-text-200 mt-1">
                {previousMonthComparison >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                vs anterior
              </div>
            </div>
          </div>

          {/* Alertas - Compacto */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-bg-300/30 to-bg-300/10 border border-bg-300/40 flex-1">
            {" "}
            {/* CAMBIO: flex-1 para ocupar espacio */}
            <div className="flex items-start gap-2 h-full">
              <Target className="h-4 w-4 text-primary-200 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-text-100 text-sm">
                  Recomendación del día
                </h4>
                <p className="text-xs text-text-200 mt-1 leading-relaxed">
                  {budget.progress <= 70
                    ? "¡Excelente! Vas por buen camino. Considera aumentar tu tasa de ahorro."
                    : budget.progress <= 90
                    ? "Modera los gastos en categorías críticas para mantenerte dentro del presupuesto."
                    : "Revisa urgentemente tus gastos. Considera ajustar el presupuesto para categorías excedidas."}
                </p>
              </div>
            </div>
          </div>

          {/* Insights de IA - NUEVO: Para llenar el espacio */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-primary-100/10 to-primary-200/5 border border-primary-200/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-xs font-bold text-white">IA</span>
              </div>
              <h4 className="font-medium text-text-100 text-sm">
                Insights de IA
              </h4>
            </div>
            <p className="text-xs text-text-200">
              {budget.progress <= 70
                ? "Tus finanzas están saludables. Podrías aumentar tu ahorro en un 10%."
                : budget.progress <= 90
                ? "Analizando tus patrones, podrías reducir gastos en entretenimiento."
                : "Necesitas reducir gastos en al menos 2 categorías esta semana."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
