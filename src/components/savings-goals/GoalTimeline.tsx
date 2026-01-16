// src/savings-goals/GoalTimeline.tsx
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Filter,
  Zap,
  Sparkles,
  Eye,
  EyeOff,
  Download,
  Share2,
  X,
  BarChart3,
  PieChart,
  Layers,
  Users,
  Mail,
  ExternalLink,
  Copy,
  RefreshCw,
  Award,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  format,
  addMonths,
  subMonths,
  isWithinInterval,
  parseISO,
  differenceInMonths,
  startOfMonth,
  endOfMonth,
} from "date-fns";

interface GoalTimelineProps {
  goals?: any[];
  view?: "year" | "quarter" | "month";
}

const GoalTimeline: React.FC<GoalTimelineProps> = ({
  goals = [],
  view: initialView = "year",
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"year" | "quarter" | "month">(initialView);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showProjections, setShowProjections] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Datos de ejemplo mejorados
  const defaultGoals = [
    {
      id: 1,
      name: "Compra de Auto Familiar",
      startDate: "2024-01-01",
      deadline: "2025-06-15",
      status: "in-progress",
      progress: 75,
      color: "#2E8B57",
      priority: "high",
      amount: 25000,
      saved: 18750,
      category: "automovil",
    },
    {
      id: 2,
      name: "Vacaciones en Playa",
      startDate: "2024-03-01",
      deadline: "2024-12-01",
      status: "in-progress",
      progress: 30,
      color: "#61bc84",
      priority: "medium",
      amount: 5000,
      saved: 1500,
      category: "viajes",
    },
    {
      id: 3,
      name: "Fondo de Emergencia (6 meses)",
      startDate: "2023-06-01",
      deadline: "2024-12-31",
      status: "in-progress",
      progress: 45,
      color: "#8FBC8F",
      priority: "critical",
      amount: 18000,
      saved: 8100,
      category: "ahorros",
    },
    {
      id: 4,
      name: "Laptop Profesional",
      startDate: "2023-12-01",
      deadline: "2024-05-01",
      status: "completed",
      progress: 100,
      color: "#c6ffe6",
      priority: "medium",
      amount: 2000,
      saved: 2000,
      category: "tecnologia",
    },
    {
      id: 5,
      name: "Curso Avanzado de Programación",
      startDate: "2024-07-01",
      deadline: "2024-10-01",
      status: "not-started",
      progress: 0,
      color: "#345e37",
      priority: "low",
      amount: 1200,
      saved: 0,
      category: "educacion",
    },
    {
      id: 6,
      name: "Renovación de Cocina",
      startDate: "2024-09-01",
      deadline: "2025-03-01",
      status: "not-started",
      progress: 0,
      color: "#4a7c59",
      priority: "medium",
      amount: 8000,
      saved: 0,
      category: "hogar",
    },
  ];

  const timelineGoals = goals.length > 0 ? goals : defaultGoals;

  // Calcular timeline - MEJORADO PARA 2 METAS POR FILA
  const getTimelineMonths = () => {
    const months = [];
    let startDate = new Date(currentDate);

    if (view === "year") {
      startDate.setMonth(startDate.getMonth() - 6);
      for (let i = 0; i < 18; i++) {
        months.push(addMonths(startDate, i));
      }
    } else if (view === "quarter") {
      startDate.setMonth(startDate.getMonth() - 3);
      for (let i = 0; i < 9; i++) {
        months.push(addMonths(startDate, i));
      }
    } else {
      startDate.setMonth(startDate.getMonth() - 1);
      for (let i = 0; i < 6; i++) {
        months.push(addMonths(startDate, i));
      }
    }

    return months;
  };

  const getGoalTimelineData = (goal: any) => {
    const start = parseISO(goal.startDate);
    const end = parseISO(goal.deadline);
    const timelineMonths = getTimelineMonths();

    return timelineMonths.map((month) => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);

      const isActive =
        isWithinInterval(monthStart, { start, end }) ||
        isWithinInterval(monthEnd, { start, end });
      const isStart = format(month, "yyyy-MM") === format(start, "yyyy-MM");
      const isEnd = format(month, "yyyy-MM") === format(end, "yyyy-MM");
      const isCurrent =
        format(month, "yyyy-MM") === format(new Date(), "yyyy-MM");
      const isPast = month < new Date();
      const isFuture = month > new Date();

      let progressInMonth = 0;
      if (isActive) {
        const totalMonths = differenceInMonths(end, start) + 1;
        const monthsFromStart = differenceInMonths(month, start);
        progressInMonth = Math.min(
          100,
          Math.max(0, (monthsFromStart / totalMonths) * 100)
        );
      }

      return {
        date: month,
        isActive,
        isStart,
        isEnd,
        isCurrent,
        isPast,
        isFuture,
        progress: progressInMonth,
        status: goal.status,
        monthName: format(month, "MMM"),
        year: format(month, "yyyy"),
      };
    });
  };

  const months = getTimelineMonths();
  const filteredGoals = timelineGoals.filter((goal) => {
    if (filterStatus !== "all" && goal.status !== filterStatus) return false;
    if (!showCompleted && goal.status === "completed") return false;
    return true;
  });

  // Agrupar metas en pares para 2 por fila
  const goalPairs = [];
  for (let i = 0; i < filteredGoals.length; i += 2) {
    goalPairs.push(filteredGoals.slice(i, i + 2));
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePrevious = () => {
    if (view === "year") {
      setCurrentDate(subMonths(currentDate, 12));
    } else if (view === "quarter") {
      setCurrentDate(subMonths(currentDate, 3));
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (view === "year") {
      setCurrentDate(addMonths(currentDate, 12));
    } else if (view === "quarter") {
      setCurrentDate(addMonths(currentDate, 3));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "in-progress":
        return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case "not-started":
        return <Clock className="h-4 w-4 text-text-200" />;
      case "behind":
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Target className="h-4 w-4 text-text-200" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400";
      case "high":
        return "bg-orange-500/20 text-orange-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-bg-300/20 text-text-200";
    }
  };

  // Si no hay metas filtradas
  if (filteredGoals.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
          <CardContent className="p-8 text-center">
            <Target className="h-16 w-16 text-text-200/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-100 mb-2">
              No hay metas disponibles
            </h3>
            <p className="text-text-200 mb-4">
              Ajusta tus filtros o crea nuevas metas para comenzar.
            </p>
            <Button className="bg-gradient-to-r from-primary-100 to-primary-200 text-white">
              <Target className="h-4 w-4 mr-2" />
              Crear Primera Meta
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header principal */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-text-100 text-xl flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-100/30">
                  <Calendar className="h-5 w-5 text-primary-200" />
                </div>
                Timeline de Metas
                <Badge className="ml-2 bg-gradient-to-r from-primary-100/30 to-primary-200/20 text-primary-200 border border-primary-100/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {filteredGoals.length} activas
                </Badge>
              </CardTitle>
              <CardDescription className="text-text-200 mt-2">
                Visualiza el progreso de tus metas financieras a lo largo del
                tiempo
              </CardDescription>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-bg-300/20 rounded-lg p-1 border border-bg-300/40">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className="h-8 w-8 p-0 text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToday}
                  className="h-8 px-3 text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                >
                  Hoy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="h-8 w-8 p-0 text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Tabs para vista */}
            <Tabs
              value={view}
              onValueChange={(v: any) => setView(v)}
              className="w-full lg:w-auto"
            >
              <TabsList className="bg-bg-300/20 border border-bg-300/40 p-1">
                <TabsTrigger
                  value="month"
                  className="text-xs px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/10"
                >
                  Vista Mensual
                </TabsTrigger>
                <TabsTrigger
                  value="quarter"
                  className="text-xs px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/10"
                >
                  Vista Trimestral
                </TabsTrigger>
                <TabsTrigger
                  value="year"
                  className="text-xs px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/10"
                >
                  Vista Anual
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Filtros rápidos */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-text-200" />
                <Switch
                  checked={showCompleted}
                  onCheckedChange={setShowCompleted}
                  className="data-[state=checked]:bg-primary-100 h-4 w-8"
                />
                <span className="text-sm text-text-200 whitespace-nowrap">
                  Completadas
                </span>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-text-200" />
                <Switch
                  checked={showProjections}
                  onCheckedChange={setShowProjections}
                  className="data-[state=checked]:bg-primary-100 h-4 w-8"
                />
                <span className="text-sm text-text-200 whitespace-nowrap">
                  Proyecciones
                </span>
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-9 bg-bg-300/30 border-bg-300/50 text-text-100 text-sm min-w-[140px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="in-progress">En progreso</SelectItem>
                  <SelectItem value="completed">Completados</SelectItem>
                  <SelectItem value="not-started">No iniciados</SelectItem>
                  <SelectItem value="behind">Atrasados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cabecera de timeline */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
        <CardContent className="p-4 overflow-x-auto">
          <div className="flex min-w-max">
            {/* Columna para nombres de metas */}
            <div className="w-48 lg:w-56 flex-shrink-0 pr-4">
              <div className="text-xs font-semibold text-text-200 uppercase tracking-wider">
                Metas Financieras
              </div>
            </div>

            {/* Cabecera de meses */}
            <div className="flex">
              {months.map((month, index) => {
                const isCurrentMonth =
                  format(month, "yyyy-MM") === format(new Date(), "yyyy-MM");
                const isPast = month < new Date();

                return (
                  <div
                    key={index}
                    className={`w-20 lg:w-24 flex-shrink-0 text-center py-3 border-r border-bg-300/30 ${
                      isCurrentMonth
                        ? "bg-gradient-to-b from-primary-100/20 to-transparent"
                        : isPast
                        ? "bg-bg-300/10"
                        : "bg-bg-300/5"
                    }`}
                  >
                    <div className="text-sm font-medium text-text-100">
                      {format(month, "MMM")}
                    </div>
                    <div className="text-xs text-text-200 mt-1">
                      {format(month, "yyyy")}
                    </div>
                    {isCurrentMonth && (
                      <div className="mt-2">
                        <div className="h-1 w-6 bg-primary-200 rounded-full mx-auto"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline de metas - 2 POR FILA */}
      <div className="space-y-4">
        {goalPairs.map((pair, pairIndex) => (
          <div
            key={pairIndex}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {pair.map((goal) => {
              const timelineData = getGoalTimelineData(goal);
              const isSelected = selectedGoal === goal.id;

              return (
                <Card
                  key={goal.id}
                  className={`border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border transition-all duration-300 ${
                    isSelected
                      ? "border-primary-200/50 shadow-xl shadow-primary-100/10"
                      : "border-bg-300/40 hover:border-primary-100/30 hover:shadow-lg"
                  }`}
                  onClick={() =>
                    setSelectedGoal(goal.id === selectedGoal ? null : goal.id)
                  }
                >
                  <CardContent className="p-4">
                    {/* Información de la meta */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div
                            className="p-2.5 rounded-xl flex-shrink-0"
                            style={{ backgroundColor: `${goal.color}20` }}
                          >
                            <Target
                              className="h-5 w-5"
                              style={{ stroke: goal.color }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-text-100 truncate text-sm lg:text-base">
                                {goal.name}
                              </h4>
                              {getStatusIcon(goal.status)}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-text-200">
                              <Badge
                                className={`px-2 py-0.5 ${getPriorityColor(
                                  goal.priority
                                )}`}
                              >
                                {goal.priority === "critical"
                                  ? "Crítico"
                                  : goal.priority === "high"
                                  ? "Alto"
                                  : goal.priority === "medium"
                                  ? "Medio"
                                  : "Bajo"}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(
                                  parseISO(goal.startDate),
                                  "MMM yyyy"
                                )} -{" "}
                                {format(parseISO(goal.deadline), "MMM yyyy")}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Indicador de selección */}
                        {isSelected && (
                          <div className="ml-2 p-1 rounded-full bg-gradient-to-br from-primary-100 to-primary-200">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Progreso y montos */}
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-text-200 mb-1">
                            Progreso
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={goal.progress}
                              className="h-2 flex-1 bg-bg-300/30"
                              indicatorClassName={`${
                                goal.progress < 30
                                  ? "bg-red-400"
                                  : goal.progress < 70
                                  ? "bg-yellow-400"
                                  : "bg-green-400"
                              }`}
                            />
                            <span className="text-sm font-medium text-text-100 min-w-[40px]">
                              {goal.progress}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-text-200 mb-1">
                            Ahorrado
                          </div>
                          <div className="text-sm font-semibold text-text-100">
                            {formatCurrency(goal.saved)} /{" "}
                            {formatCurrency(goal.amount)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Línea de tiempo compacta */}
                    <div className="relative">
                      {/* Línea base */}
                      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-bg-300/50 to-transparent -translate-y-1/2"></div>

                      <div className="flex relative z-10">
                        {timelineData.map((monthData, index) => {
                          const { isActive, isStart, isEnd, isCurrent } =
                            monthData;

                          return (
                            <div key={index} className="flex-1 relative group">
                              {/* Punto de timeline */}
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                {isActive ? (
                                  <div
                                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                                      isStart
                                        ? "border-white bg-primary-200 shadow-lg shadow-primary-200/50"
                                        : isEnd
                                        ? "border-white bg-green-400 shadow-lg shadow-green-400/50"
                                        : isCurrent
                                        ? "border-white bg-primary-100 shadow-lg shadow-primary-100/50"
                                        : "border-white"
                                    }`}
                                    style={
                                      !isStart && !isEnd && !isCurrent
                                        ? {
                                            backgroundColor: goal.color,
                                            borderColor: `${goal.color}80`,
                                          }
                                        : {}
                                    }
                                  >
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-bg-300/90 backdrop-blur-md border border-bg-300/50 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                      <div className="font-medium">
                                        {monthData.monthName} {monthData.year}
                                      </div>
                                      <div className="text-white/70">
                                        Progreso:{" "}
                                        {Math.round(monthData.progress)}%
                                        {isStart && " • Inicio"}
                                        {isEnd && " • Meta"}
                                        {isCurrent && " • Actual"}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-1.5 h-1.5 rounded-full bg-bg-300/50 group-hover:bg-bg-300/70 transition-colors"></div>
                                )}
                              </div>

                              {/* Barra de progreso activa */}
                              {isActive && monthData.progress > 0 && (
                                <div
                                  className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full"
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      monthData.progress
                                    )}%`,
                                    backgroundColor: `${goal.color}40`,
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Etiquetas de meses (solo mostrar algunas en móvil) */}
                      <div className="flex mt-6">
                        {timelineData
                          .filter(
                            (_, i) =>
                              i %
                                (view === "month"
                                  ? 1
                                  : view === "quarter"
                                  ? 2
                                  : 3) ===
                              0
                          )
                          .map((monthData, i) => (
                            <div key={i} className="flex-1 text-center">
                              <div className="text-[10px] text-text-200 truncate">
                                {monthData.monthName}
                              </div>
                              <div className="text-[9px] text-text-200/60">
                                {monthData.year}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Acciones rápidas */}
                    <div className="mt-4 pt-3 border-t border-bg-300/30">
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-text-200 hover:text-primary-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGoal(goal.id);
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Detalles
                        </Button>
                        <div className="flex items-center gap-1">
                          <Badge className="text-xs px-2 py-0.5 bg-gradient-to-r from-primary-100/20 to-primary-200/10 text-primary-200 border border-primary-100/30">
                            {goal.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ))}
      </div>

      {/* Panel de detalles de meta seleccionada */}
      {selectedGoal &&
        (() => {
          const goal = filteredGoals.find((g) => g.id === selectedGoal);
          if (!goal) return null;

          const timelineData = getGoalTimelineData(goal);
          const currentMonthData = timelineData.find((m) => m.isCurrent);
          const upcomingMonths = timelineData.filter(
            (m) => m.isFuture && m.isActive
          );
          const totalMonths =
            differenceInMonths(
              parseISO(goal.deadline),
              parseISO(goal.startDate)
            ) + 1;
          const remainingMonths = differenceInMonths(
            parseISO(goal.deadline),
            new Date()
          );

          return (
            <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-200/5 backdrop-blur-md border border-primary-100/20 shadow-2xl">
              <CardContent className="p-6">
                {/* Encabezado del detalle */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${goal.color}20` }}
                    >
                      <Target
                        className="h-6 w-6"
                        style={{ stroke: goal.color }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-text-100 truncate">
                          {goal.name}
                        </h3>
                        <Badge className={getPriorityColor(goal.priority)}>
                          {goal.priority === "critical"
                            ? "Prioridad Crítica"
                            : goal.priority === "high"
                            ? "Alta Prioridad"
                            : goal.priority === "medium"
                            ? "Prioridad Media"
                            : "Prioridad Baja"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-text-200">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span className="whitespace-nowrap">
                            Inicio:{" "}
                            {format(parseISO(goal.startDate), "dd/MM/yyyy")}
                          </span>
                        </div>
                        <div className="h-4 w-px bg-bg-300/50"></div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span className="whitespace-nowrap">
                            Meta:{" "}
                            {format(parseISO(goal.deadline), "dd/MM/yyyy")}
                          </span>
                        </div>
                        <div className="h-4 w-px bg-bg-300/50"></div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span className="whitespace-nowrap">
                            {remainingMonths} meses restantes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedGoal(null)}
                    className="h-8 w-8 p-0 text-text-200 hover:text-primary-300 hover:bg-primary-100/10 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Grid de detalles - MEJORADO PARA RESPONSIVE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Progreso y estadísticas */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                      <h4 className="font-semibold text-text-100 mb-4">
                        Progreso Detallado
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm text-text-200 mb-2">
                            <span>Completado</span>
                            <span className="font-medium text-text-100">
                              {goal.progress}%
                            </span>
                          </div>
                          <Progress
                            value={goal.progress}
                            className="h-3 bg-bg-300/50"
                            indicatorClassName={
                              goal.progress < 30
                                ? "bg-red-400"
                                : goal.progress < 70
                                ? "bg-yellow-400"
                                : "bg-green-400"
                            }
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 rounded-lg bg-bg-300/20">
                            <div className="text-2xl font-bold text-primary-200">
                              {formatCurrency(goal.saved)}
                            </div>
                            <div className="text-xs text-text-200 mt-1">
                              Ahorrado
                            </div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-bg-300/20">
                            <div className="text-2xl font-bold text-text-100">
                              {formatCurrency(goal.amount - goal.saved)}
                            </div>
                            <div className="text-xs text-text-200 mt-1">
                              Restante
                            </div>
                          </div>
                        </div>
                        {currentMonthData && (
                          <div className="text-sm text-text-200">
                            Progreso este mes:{" "}
                            <span className="font-medium text-primary-200">
                              {Math.round(currentMonthData.progress)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hitpoints importantes */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                      <h4 className="font-semibold text-text-100 mb-4">
                        Hitpoints Clave
                      </h4>
                      <div className="space-y-3">
                        {[
                          {
                            label: "Inicio",
                            date: parseISO(goal.startDate),
                            icon: "🚀",
                          },
                          {
                            label: "50% proyectado",
                            date: addMonths(
                              parseISO(goal.startDate),
                              Math.floor(totalMonths / 2)
                            ),
                            icon: "🎯",
                          },
                          {
                            label: "Meta final",
                            date: parseISO(goal.deadline),
                            icon: "🏁",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{item.icon}</span>
                              <span className="text-sm text-text-200">
                                {item.label}
                              </span>
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                index === 0
                                  ? "text-primary-200"
                                  : index === 1
                                  ? "text-yellow-400"
                                  : "text-green-400"
                              }`}
                            >
                              {format(item.date, "MMM yyyy")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Próximos hitpoints y acciones */}
                  <div className="space-y-4">
                    {/* Próximos meses */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                      <h4 className="font-semibold text-text-100 mb-4">
                        Próximos Hitpoints
                      </h4>
                      <div className="space-y-3">
                        {upcomingMonths.slice(0, 4).map((month, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  month.isCurrent
                                    ? "bg-primary-200"
                                    : "bg-text-200"
                                }`}
                              />
                              <span className="text-sm text-text-200">
                                {format(month.date, "MMMM yyyy")}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-text-100">
                              {Math.round(month.progress)}%
                            </span>
                          </div>
                        ))}
                        {upcomingMonths.length > 4 && (
                          <div className="text-xs text-text-200 text-center pt-2 border-t border-bg-300/30">
                            +{upcomingMonths.length - 4} hitpoints más
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                      <h4 className="font-semibold text-text-100 mb-4">
                        Acciones
                      </h4>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start h-10 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-100/50"
                        >
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Actualizar progreso
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-10 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-100/50"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Modificar fecha límite
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-10 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-100/50"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Ajustar monto objetivo
                        </Button>
                        <Button className="w-full h-10 bg-gradient-to-r from-primary-100 to-primary-200 text-white hover:from-primary-200 hover:to-primary-300">
                          <Zap className="h-4 w-4 mr-2" />
                          Acelerar esta meta
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })()}

      {/* Insights y acciones finales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insights */}
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary-200" />
              Insights del Timeline
            </CardTitle>
            <CardDescription className="text-text-200">
              Análisis inteligente basado en tu progreso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Target className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-100 mb-2">
                      Congestión de Fin de Año
                    </h4>
                    <p className="text-sm text-text-200">
                      {
                        filteredGoals.filter((g) => {
                          const deadline = parseISO(g.deadline);
                          return (
                            deadline.getMonth() >= 10 &&
                            deadline.getFullYear() === 2024
                          );
                        }).length
                      }{" "}
                      metas terminan en Diciembre 2024
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-100 mb-2">
                      Oportunidad de Aceleración
                    </h4>
                    <p className="text-sm text-text-200">
                      3 metas podrían completarse antes con ajustes menores
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acciones rápidas */}
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
          <CardContent className="p-6">
            <h4 className="font-semibold text-text-100 mb-4">
              Acciones Rápidas
            </h4>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-11 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-100/50"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Timeline
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-11 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-100/50"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir Vista
              </Button>
              <Button className="w-full h-11 bg-gradient-to-r from-primary-100 to-primary-200 text-white hover:from-primary-200 hover:to-primary-300">
                <Target className="h-4 w-4 mr-2" />
                Nueva Meta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leyenda */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
        <CardContent className="p-6">
          <h4 className="font-semibold text-text-100 mb-4">
            Leyenda del Timeline
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-200 border-2 border-white"></div>
              <span className="text-sm text-text-200">Inicio de meta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-white"></div>
              <span className="text-sm text-text-200">Meta final</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-100 border-2 border-white"></div>
              <span className="text-sm text-text-200">Mes actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-bg-300/50"></div>
              <span className="text-sm text-text-200">Período inactivo</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalTimeline;
