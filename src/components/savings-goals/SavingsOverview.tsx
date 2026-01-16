// src/savings-goals/SavingsOverview.tsx
import React, { useState, useEffect } from "react";
import {
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Clock,
  Trophy,
  Sparkles,
  AlertCircle,
  Lightbulb,
  PieChart as PieChartIcon,
  BarChart3,
  MoreVertical,
  ChevronRight,
  Zap,
  LineChart as LineChartIcon,
  AreaChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts";

// Datos de ejemplo
import { savingsGoals, savingsSummary } from "../../data/savingsData";

const SavingsOverview = () => {
  const [activeGoals, setActiveGoals] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyProgress, setMonthlyProgress] = useState<any[]>([]);
  const [goalContributions, setGoalContributions] = useState<any[]>([]);

  useEffect(() => {
    // Calcular estadísticas
    const active = savingsGoals.filter(
      (g) => g.status === "in-progress"
    ).length;
    const saved = savingsGoals.reduce(
      (sum, goal) => sum + goal.currentAmount,
      0
    );
    const target = savingsGoals.reduce(
      (sum, goal) => sum + goal.targetAmount,
      0
    );

    setActiveGoals(active);
    setTotalSaved(saved);
    setTotalTarget(target);

    // Preparar datos para gráfico de categorías
    const categories: Record<string, { value: number; color: string }> = {};
    savingsGoals.forEach((goal) => {
      if (!categories[goal.category]) {
        categories[goal.category] = { value: 0, color: goal.color };
      }
      categories[goal.category].value += goal.targetAmount;
    });

    setCategoryData(
      Object.entries(categories).map(([name, data]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: data.value,
        color: data.color,
      }))
    );

    // Datos para gráfico de progreso mensual
    const progressData = [
      { month: "Ene", progress: 15, saved: 1200, forecast: 18 },
      { month: "Feb", progress: 28, saved: 2200, forecast: 32 },
      { month: "Mar", progress: 35, saved: 2800, forecast: 42 },
      { month: "Abr", progress: 42, saved: 3400, forecast: 50 },
      { month: "May", progress: 50, saved: 4000, forecast: 58 },
      { month: "Jun", progress: 62.5, saved: 5000, forecast: 70 },
      { month: "Jul", progress: 70, saved: 5600, forecast: 78 },
      { month: "Ago", progress: 78, saved: 6200, forecast: 85 },
    ];
    setMonthlyProgress(progressData);

    // Datos para gráfico de contribuciones por meta (simplificado)
    const contributionsData = savingsGoals
      .filter((goal) => goal.status === "in-progress")
      .slice(0, 6) // Mostrar máximo 6 metas
      .map((goal) => ({
        name:
          goal.name.length > 12
            ? goal.name.substring(0, 12) + "..."
            : goal.name,
        aporte: goal.monthlyContribution,
        meta: goal.targetAmount,
        progreso: goal.progress,
        color: goal.color,
      }))
      .sort((a, b) => b.aporte - a.aporte); // Ordenar por aporte descendente

    setGoalContributions(contributionsData);
  }, []);

  // Función para formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calcular fecha de próxima meta
  const getUpcomingGoal = () => {
    const upcoming = savingsGoals
      .filter((g) => g.status === "in-progress")
      .sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      )[0];

    return upcoming || null;
  };

  const upcomingGoal = getUpcomingGoal();

  // Calcular progreso general
  const overallProgress = Math.round((totalSaved / totalTarget) * 100);

  return (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-200/5 backdrop-blur-md border border-primary-100/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-200 mb-1">Total Ahorrado</div>
                <div className="text-2xl font-bold text-text-100">
                  {formatCurrency(totalSaved)}
                </div>
                <div className="text-xs text-green-400 mt-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs mes anterior
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                <DollarSign className="h-6 w-6 text-primary-200" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-text-200 mb-1">
                <span>Meta total: {formatCurrency(totalTarget)}</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress
                value={overallProgress}
                className="h-2 bg-bg-300/50"
                indicatorClassName="bg-gradient-to-r from-primary-100 to-primary-200"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-md border border-green-500/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-200 mb-1">Metas Activas</div>
                <div className="text-2xl font-bold text-green-400">
                  {activeGoals}
                </div>
                <div className="text-xs text-text-200 mt-2">
                  de {savingsGoals.length} metas totales
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10">
                <Target className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-text-200 mb-2">Distribución</div>
              <div className="flex gap-1">
                {savingsGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="h-2 flex-1 rounded-full"
                    style={{
                      backgroundColor:
                        goal.status === "completed"
                          ? "#10b981"
                          : goal.status === "in-progress"
                          ? "#3b82f6"
                          : goal.status === "paused"
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                    title={`${goal.name} - ${goal.status}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-md border border-blue-500/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-200 mb-1">Próxima Meta</div>
                <div className="text-lg font-bold text-text-100">
                  {upcomingGoal?.name || "Sin metas activas"}
                </div>
                {upcomingGoal && (
                  <div className="text-xs text-blue-400 mt-2 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(upcomingGoal.deadline).toLocaleDateString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                  </div>
                )}
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            {upcomingGoal && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-text-200 mb-1">
                  <span>Progreso: {upcomingGoal.progress}%</span>
                  <span>
                    {formatCurrency(upcomingGoal.currentAmount)} /{" "}
                    {formatCurrency(upcomingGoal.targetAmount)}
                  </span>
                </div>
                <Progress
                  value={upcomingGoal.progress}
                  className="h-2 bg-bg-300/50"
                  indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-400"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 backdrop-blur-md border border-yellow-500/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-200 mb-1">Aporte Mensual</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {formatCurrency(savingsSummary.monthlyContributionTotal)}
                </div>
                <div className="text-xs text-text-200 mt-2">Total por mes</div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/10">
                <TrendingUp className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-text-200 mb-1">Proyección</div>
              <div className="text-sm font-medium text-text-100">
                Completarás todas las metas en{" "}
                {savingsSummary.projectedCompletion}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de distribución por categoría - VERSIÓN ORGANIZADA */}
        {/* Gráfico de distribución por categoría - VERSIÓN SIMPLIFICADA */}
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-text-100 flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-primary-200" />
                  Distribución por Categoría
                </CardTitle>
                <CardDescription className="text-text-200">
                  Meta total por tipo de objetivo
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-300"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Gráfico de distribución por categoría */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={0}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;

                        return (
                          <div
                            className="
                    bg-gradient-to-br from-bg-200 to-bg-300
                    border border-bg-300/50
                    rounded-lg
                    p-4
                    shadow-xl shadow-black/30
                    backdrop-blur-md
                    min-w-[180px]
                  "
                          >
                            {/* Header del tooltip - SIMPLIFICADO */}
                            <div className="flex items-center gap-3 mb-2">
                              <div className="relative">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: data.color }}
                                />
                              </div>
                              <h4 className="font-semibold text-text-100">
                                {data.name}
                              </h4>
                            </div>

                            {/* Información detallada - SOLO MONTO */}
                            <div className="pt-2 border-t border-bg-300/30">
                              <div className="text-lg font-bold text-primary-200 text-center">
                                {formatCurrency(data.value)}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Lista de categorías organizada - SIMPLIFICADA */}
            <div className="space-y-2 mt-4">
              {categoryData
                .sort((a, b) => b.value - a.value) // Ordenar de mayor a menor
                .map((cat, index) => {
                  return (
                    <div
                      key={`cat-${index}`}
                      className="
                flex items-center justify-between
                p-3 rounded-xl
                transition-all duration-300
                hover:bg-gradient-to-r hover:from-bg-300/20 hover:to-bg-300/10
                hover:border hover:border-primary-200/20
                hover:shadow-lg hover:shadow-primary-100/10
                cursor-pointer group
                relative overflow-hidden
              "
                    >
                      {/* Fondo de gradiente en hover */}
                      <div
                        className="
                absolute inset-0
                bg-gradient-to-r from-transparent via-primary-100/5 to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
              "
                      />

                      <div className="flex items-center gap-3 z-10">
                        <div className="relative">
                          <div
                            className="
                      w-4 h-4 rounded-full
                      transition-all duration-300
                      group-hover:scale-125 group-hover:shadow-lg
                      group-hover:shadow-current/50
                    "
                            style={{ backgroundColor: cat.color }}
                          />
                          <div
                            className="
                    absolute -inset-1.5
                    bg-gradient-to-br from-white/20 to-transparent
                    rounded-full
                    opacity-0 group-hover:opacity-100
                    transition-all duration-500
                    blur-[2px]
                  "
                          />
                        </div>
                        <span
                          className="
                  text-sm font-medium text-text-100
                  transition-all duration-300
                  group-hover:translate-x-1
                "
                        >
                          {cat.name}
                        </span>
                      </div>

                      <div
                        className="
                flex items-center gap-2 z-10
                transition-all duration-300
                group-hover:translate-x-[-4px]
              "
                      >
                        <div
                          className="
                  text-sm font-semibold
                  text-text-100
                  transition-all duration-300
                  group-hover:text-primary-200
                  group-hover:scale-105
                "
                        >
                          {formatCurrency(cat.value)}
                        </div>
                        <div
                          className="
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300
                  transform -translate-x-2 group-hover:translate-x-0
                "
                        >
                          <ChevronRight
                            className="
                    h-4 w-4 text-primary-200
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
        {/* Evolución del Ahorro - CON TRES GRÁFICOS EN LA MISMA SECCIÓN */}
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-text-100 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary-200" />
                  Evolución del Ahorro
                </CardTitle>
                <CardDescription className="text-text-200">
                  Análisis completo de progreso
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-300"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* GRÁFICO 1: LÍNEAS (Progreso vs Pronóstico) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <LineChartIcon className="h-4 w-4 text-primary-200" />
                  <h4 className="text-sm font-medium text-text-100">
                    Progreso vs Pronóstico
                  </h4>
                </div>
                <Badge className="text-xs bg-primary-100/20 text-primary-200 border-primary-100/30">
                  Tendencia
                </Badge>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyProgress}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#454545"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#A0A0B0"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#A0A0B0"
                      fontSize={10}
                      tickFormatter={(value) => `${value}%`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "progress")
                          return [`${value}%`, "Progreso Actual"];
                        return [`${value}%`, "Pronóstico"];
                      }}
                      contentStyle={{
                        backgroundColor: "#0A0A0F",
                        borderColor: "rgba(59, 130, 246, 0.3)",
                        borderRadius: "8px",
                        backdropFilter: "blur(10px)",
                        color: "#FFFFFF",
                        fontSize: "12px",
                      }}
                      labelStyle={{
                        color: "#FFFFFF",
                        fontWeight: "500",
                        marginBottom: "4px",
                      }}
                      itemStyle={{ color: "#A0A0B0" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      name="Progreso Actual"
                      stroke="#2E8B57"
                      strokeWidth={2}
                      dot={{ r: 3, strokeWidth: 2 }}
                      activeDot={{ r: 5 }}
                      animationDuration={1500}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      name="Pronóstico"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3, strokeWidth: 2 }}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* GRÁFICO 2: ÁREA (Ahorro Acumulado) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AreaChart className="h-4 w-4 text-primary-200" />
                  <h4 className="text-sm font-medium text-text-100">
                    Ahorro Acumulado
                  </h4>
                </div>
                <Badge className="text-xs bg-accent-100/20 text-accent-100 border-accent-100/30">
                  Acumulado
                </Badge>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsAreaChart data={monthlyProgress}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#454545"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#A0A0B0"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#A0A0B0"
                      fontSize={10}
                      tickFormatter={(value) => `$${value / 1000}k`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value) => [
                        formatCurrency(Number(value)),
                        "Ahorro",
                      ]}
                      contentStyle={{
                        backgroundColor: "#0A0A0F",
                        borderColor: "rgba(59, 130, 246, 0.3)",
                        borderRadius: "8px",
                        backdropFilter: "blur(10px)",
                        color: "#FFFFFF",
                        fontSize: "12px",
                      }}
                      labelStyle={{
                        color: "#FFFFFF",
                        fontWeight: "500",
                        marginBottom: "4px",
                      }}
                      itemStyle={{ color: "#A0A0B0" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="saved"
                      name="Ahorro Acumulado"
                      fill="url(#colorSaved)"
                      stroke="#2E8B57"
                      strokeWidth={2}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                    <defs>
                      <linearGradient
                        id="colorSaved"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2E8B57"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2E8B57"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                  </RechartsAreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* GRÁFICO 3: BARRAS SIMPLES (Contribuciones por Meta) - MÁS GRANDE */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary-200" />
                  <h4 className="text-sm font-medium text-text-100">
                    Aportes Mensuales por Meta
                  </h4>
                </div>
                <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                  Contribuciones
                </Badge>
              </div>
              <div className="h-48">
                {" "}
                {/* Altura aumentada para más espacio */}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={goalContributions}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#454545"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#A0A0B0"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                      angle={-45}
                      textAnchor="end"
                      height={40}
                    />
                    <YAxis
                      stroke="#A0A0B0"
                      fontSize={10}
                      tickFormatter={(value) => `$${value}`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "aporte")
                          return [
                            formatCurrency(Number(value)),
                            "Aporte mensual",
                          ];
                        if (name === "meta")
                          return [formatCurrency(Number(value)), "Meta total"];
                        return [`${value}%`, "Progreso"];
                      }}
                      contentStyle={{
                        backgroundColor: "#0A0A0F",
                        borderColor: "rgba(59, 130, 246, 0.3)",
                        borderRadius: "8px",
                        backdropFilter: "blur(10px)",
                        color: "#FFFFFF",
                        fontSize: "12px",
                      }}
                      labelStyle={{
                        color: "#FFFFFF",
                        fontWeight: "500",
                        marginBottom: "4px",
                      }}
                      itemStyle={{ color: "#A0A0B0" }}
                    />
                    <Bar
                      dataKey="aporte"
                      name="Aporte mensual"
                      fill="#61bc84"
                      radius={[2, 2, 0, 0]}
                      animationDuration={1500}
                      animationBegin={500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Datos clave resumidos - EN 3 COLUMNAS */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-bg-300/40">
              <div className="text-center">
                <div className="text-xs text-text-200 mb-1">
                  Progreso promedio
                </div>
                <div className="text-lg font-bold text-primary-200">
                  {monthlyProgress.length > 0
                    ? Math.round(
                        monthlyProgress.reduce(
                          (sum, month) => sum + month.progress,
                          0
                        ) / monthlyProgress.length
                      )
                    : 0}
                  %
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-text-200 mb-1">Total ahorrado</div>
                <div className="text-lg font-bold text-accent-100">
                  {formatCurrency(
                    monthlyProgress.length > 0
                      ? monthlyProgress[monthlyProgress.length - 1].saved
                      : 0
                  )}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-text-200 mb-1">Aporte mensual</div>
                <div className="text-lg font-bold text-green-400">
                  {formatCurrency(savingsSummary.monthlyContributionTotal)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metas destacadas */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-text-100 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary-200" />
            Metas Destacadas
          </CardTitle>
          <CardDescription className="text-text-200">
            Tus objetivos con mejor progreso este mes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savingsGoals
              .filter((goal) => goal.status === "in-progress")
              .sort((a, b) => b.progress - a.progress)
              .slice(0, 3)
              .map((goal) => (
                <div
                  key={goal.id}
                  className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${goal.color}20` }}
                        >
                          <Target
                            className="h-4 w-4"
                            style={{ stroke: goal.color }}
                          />
                        </div>
                        <h4 className="font-semibold text-text-100">
                          {goal.name}
                        </h4>
                      </div>
                      <div className="text-sm text-text-200 mb-3">
                        {formatCurrency(goal.currentAmount)} /{" "}
                        {formatCurrency(goal.targetAmount)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-full mr-3">
                          <div className="h-2 bg-bg-300/50 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${goal.progress}%`,
                                background: `linear-gradient(90deg, ${goal.color} 0%, ${goal.color}80 100%)`,
                              }}
                            />
                          </div>
                        </div>
                        <Badge className="bg-primary-100/20 text-primary-200">
                          {goal.progress}%
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights de IA */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-text-100 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-200" />
            Insights Inteligentes
          </CardTitle>
          <CardDescription className="text-text-200">
            Recomendaciones personalizadas basadas en tu progreso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Insight 1 */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-100 mb-2">
                    Excelente Progreso
                  </h4>
                  <p className="text-sm text-text-200">
                    Vas 3 meses adelantado en tu meta principal. ¡Sigue así!
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-green-400 hover:text-green-300"
                  >
                    Ver detalles <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Insight 2 */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-100 mb-2">
                    Oportunidad Detectada
                  </h4>
                  <p className="text-sm text-text-200">
                    Detectamos $150 disponibles este mes que podrían acelerar
                    tus metas.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-yellow-400 hover:text-yellow-300"
                  >
                    Aplicar sugerencia <Zap className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Insight 3 */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Lightbulb className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-100 mb-2">
                    Optimización Sugerida
                  </h4>
                  <p className="text-sm text-text-200">
                    Reduciendo gastos en entretenimiento 15%, completarías
                    "Viaje" 2 meses antes.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-blue-400 hover:text-blue-300"
                  >
                    Calcular ahorro <TrendingDown className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavingsOverview;
