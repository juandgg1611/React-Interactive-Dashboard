// PersonalStats.tsx
import React from "react";
import {
  TrendingUp,
  Target,
  PieChart,
  Calendar,
  Award,
  Zap,
  Clock,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const PersonalStats = () => {
  const stats = {
    daysActive: 45,
    totalTransactions: 1247,
    totalManaged: 125430,
    activeGoals: 3,
    budgets: 8,
    achievements: 12,
    aiForecasts: 47,
    avgRating: 4.8,
    completionRate: 78,
    monthlyGrowth: 12,
    goalsProgress: 65,
    budgetAdherence: 82,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-text-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/20">
            <BarChart3 className="h-5 w-5 text-primary-200" />
          </div>
          <span>Estadísticas Personales</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Tarjeta 1: Actividad */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-200/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-text-200">Días consecutivos</div>
                <div className="text-2xl font-bold text-primary-200">
                  {stats.daysActive}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-primary-200/20">
                <Calendar className="h-5 w-5 text-primary-200" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span>+5 días vs mes anterior</span>
            </div>
          </div>

          {/* Tarjeta 2: Finanzas */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-accent-100/10 to-accent-100/5 border border-accent-100/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-text-200">Total gestionado</div>
                <div className="text-2xl font-bold text-accent-100">
                  {formatCurrency(stats.totalManaged)}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-accent-100/20">
                <PieChart className="h-5 w-5 text-accent-100" />
              </div>
            </div>
            <div className="text-xs text-text-200">
              {stats.totalTransactions} transacciones
            </div>
          </div>

          {/* Tarjeta 3: Metas */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-text-200">Metas activas</div>
                <div className="text-2xl font-bold text-green-400">
                  {stats.activeGoals}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-green-500/20">
                <Target className="h-5 w-5 text-green-400" />
              </div>
            </div>
            <div className="text-xs text-text-200">
              {stats.goalsProgress}% de progreso promedio
            </div>
          </div>

          {/* Tarjeta 4: IA */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-text-200">Pronósticos IA</div>
                <div className="text-2xl font-bold text-blue-400">
                  {stats.aiForecasts}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="text-xs text-text-200">
              Calificación: {stats.avgRating}/5
            </div>
          </div>
        </div>

        {/* Barras de progreso */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary-200" />
                <span className="text-sm font-medium text-text-100">
                  Completitud del perfil
                </span>
              </div>
              <span className="text-sm font-medium text-primary-200">
                {stats.completionRate}%
              </span>
            </div>
            <Progress value={stats.completionRate} className="h-2 bg-bg-300/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-100 to-primary-200 transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </Progress>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-text-100">
                  Progreso de metas
                </span>
              </div>
              <span className="text-sm font-medium text-green-400">
                {stats.goalsProgress}%
              </span>
            </div>
            <Progress value={stats.goalsProgress} className="h-2 bg-bg-300/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                style={{ width: `${stats.goalsProgress}%` }}
              />
            </Progress>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-accent-100" />
                <span className="text-sm font-medium text-text-100">
                  Cumplimiento de presupuestos
                </span>
              </div>
              <span className="text-sm font-medium text-accent-100">
                {stats.budgetAdherence}%
              </span>
            </div>
            <Progress
              value={stats.budgetAdherence}
              className="h-2 bg-bg-300/50"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-100 to-accent-100/70 transition-all duration-500"
                style={{ width: `${stats.budgetAdherence}%` }}
              />
            </Progress>
          </div>
        </div>

        {/* Logros destacados */}
        <div className="mt-8 pt-6 border-t border-bg-300/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-100 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary-200" />
              Logros Destacados
            </h3>
            <span className="text-sm text-primary-200">
              {stats.achievements} logros
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/20 to-primary-200/10 border border-primary-200/30">
              <span className="text-sm text-primary-200">
                🏆 Ahorrador Consistente
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-accent-100/20 to-accent-100/10 border border-accent-100/30">
              <span className="text-sm text-accent-100">
                📊 Analista Predictivo
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30">
              <span className="text-sm text-green-400">🎯 Meta Maestro</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-500/10 border border-blue-500/30">
              <span className="text-sm text-blue-400">
                ⚡ Usuario Activo 30+ días
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalStats;
