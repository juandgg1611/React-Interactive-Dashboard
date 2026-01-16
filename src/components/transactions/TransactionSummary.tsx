import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface TransactionSummaryProps {
  summary: {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    netFlow: number;
    previousMonthComparison: number;
    transactionsCount: number;
  };
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ summary }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return formatCurrency(amount);
  };

  const metrics = [
    {
      title: "Saldo Total",
      value: summary.totalBalance,
      icon: Wallet,
      color: "text-primary-200",
      bgColor: "bg-gradient-to-br from-primary-100/20 to-primary-200/10",
      borderColor: "border-primary-100/30",
      trend: summary.previousMonthComparison > 0 ? "+5.2%" : "-5.2%",
      trendValue: summary.previousMonthComparison,
      trendIcon:
        summary.previousMonthComparison > 0 ? ArrowUpRight : ArrowDownRight,
      trendColor:
        summary.previousMonthComparison > 0 ? "text-green-400" : "text-red-400",
      description: "Disponible actual",
      isPositive: true,
    },
    {
      title: "Ingresos",
      value: summary.totalIncome,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-500/5",
      borderColor: "border-green-500/20",
      trend: "+12.5%",
      trendValue: 12.5,
      trendIcon: ArrowUpRight,
      trendColor: "text-green-400",
      description: "Mes actual",
      isPositive: true,
    },
    {
      title: "Gastos",
      value: summary.totalExpense,
      icon: TrendingDown,
      color: "text-red-400",
      bgColor: "bg-gradient-to-br from-red-500/10 to-rose-500/5",
      borderColor: "border-red-500/20",
      trend: "-8.3%",
      trendValue: -8.3,
      trendIcon: ArrowDownRight,
      trendColor: "text-red-400",
      description: "Mes actual",
      isPositive: false,
    },
    {
      title: "Flujo Neto",
      value: summary.netFlow,
      icon: BarChart3,
      color: "text-accent-200",
      bgColor: "bg-gradient-to-br from-accent-100/10 to-accent-200/5",
      borderColor: "border-accent-100/20",
      trend:
        summary.netFlow > 0
          ? `+${Math.abs(summary.previousMonthComparison)}%`
          : `-${Math.abs(summary.previousMonthComparison)}%`,
      trendValue: summary.previousMonthComparison,
      trendIcon: summary.netFlow > 0 ? ArrowUpRight : ArrowDownRight,
      trendColor: summary.netFlow > 0 ? "text-green-400" : "text-red-400",
      description: "Ingresos - Gastos",
      isPositive: summary.netFlow > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl hover:shadow-2xl hover:border-primary-200/30 transition-all duration-300 group overflow-hidden"
        >
          {/* Efecto de brillo sutil en hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-text-200 tracking-wide">
                {metric.title}
              </CardTitle>
              <Badge
                className={`
                  text-xs px-2.5 py-1 font-medium
                  ${
                    metric.isPositive
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }
                  transition-all duration-300 group-hover:scale-105
                `}
              >
                <metric.trendIcon className="h-3 w-3 mr-1 inline" />
                {metric.trend}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Fila principal: Valor + Icono */}
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-2xl md:text-3xl font-bold text-text-100 tracking-tight leading-none">
                    {formatCompactCurrency(metric.value)}
                  </div>
                  <div className="text-xs text-text-200/70 mt-1 truncate">
                    {metric.description}
                  </div>
                </div>

                {/* Icono con efecto hover */}
                <div className="relative">
                  <div
                    className={`
                      p-3 rounded-xl ${metric.bgColor} border ${metric.borderColor}
                      group-hover:scale-110 group-hover:shadow-lg
                      transition-all duration-300
                      flex-shrink-0 ml-2
                    `}
                  >
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                </div>
              </div>

              {/* Barra de progreso sutil */}
              <div className="pt-2">
                <div className="h-1.5 w-full bg-bg-300/30 rounded-full overflow-hidden">
                  <div
                    className={`
                      h-full rounded-full transition-all duration-500
                      ${
                        metric.isPositive
                          ? "bg-gradient-to-r from-primary-100 to-primary-200"
                          : "bg-gradient-to-r from-red-400 to-rose-500"
                      }
                    `}
                    style={{
                      width: `${Math.min(
                        (Math.abs(metric.value) / 10000) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Información adicional compacta */}
              <div className="flex items-center justify-between text-xs pt-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      metric.isPositive ? "bg-green-400" : "bg-red-400"
                    }`}
                  />
                  <span className="text-text-200/70">
                    {metric.isPositive ? "Positivo" : "Negativo"} este mes
                  </span>
                </div>
                <div
                  className={`text-xs font-medium ${
                    metric.isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {metric.trendValue > 0 ? "+" : ""}
                  {metric.trendValue}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TransactionSummary;
