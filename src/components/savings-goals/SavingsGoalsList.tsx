// src/savings-goals/SavingsGoalsList.tsx
import React, { useState, useMemo } from "react";
import {
  Filter,
  Search,
  Grid3x3,
  List as ListIcon,
  Plus,
  ChevronDown,
  ChevronUp,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  PauseCircle,
  Clock,
  Zap,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";

// Componentes
import SavingsGoalCard from "./SavingsGoalCard";
import GoalProgressChart from "./GoalProgressChart";

// Datos
import { savingsGoals } from "../../data/savingsData";

const SavingsGoalsList = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<
    "progress" | "deadline" | "priority" | "amount"
  >("progress");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGoalId, setExpandedGoalId] = useState<number | null>(null);

  // Filtrar y ordenar metas
  const filteredAndSortedGoals = useMemo(() => {
    let filtered = [...savingsGoals];

    // Aplicar filtro de estado
    if (filterStatus !== "all") {
      filtered = filtered.filter((goal) => goal.status === filterStatus);
    }

    // Aplicar filtro de categoría
    if (filterCategory !== "all") {
      filtered = filtered.filter((goal) => goal.category === filterCategory);
    }

    // Aplicar búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (goal) =>
          goal.name.toLowerCase().includes(query) ||
          goal.category.toLowerCase().includes(query) ||
          goal.description?.toLowerCase().includes(query)
      );
    }

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return b.progress - a.progress;
        case "deadline":
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        case "priority":
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "amount":
          return b.targetAmount - a.targetAmount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filterStatus, filterCategory, searchQuery, sortBy]);

  // Estadísticas de filtro
  const stats = useMemo(() => {
    const total = filteredAndSortedGoals.length;
    const totalAmount = filteredAndSortedGoals.reduce(
      (sum, goal) => sum + goal.targetAmount,
      0
    );
    const totalSaved = filteredAndSortedGoals.reduce(
      (sum, goal) => sum + goal.currentAmount,
      0
    );
    const avgProgress =
      total > 0
        ? Math.round(
            filteredAndSortedGoals.reduce(
              (sum, goal) => sum + goal.progress,
              0
            ) / total
          )
        : 0;

    return { total, totalAmount, totalSaved, avgProgress };
  }, [filteredAndSortedGoals]);

  // Categorías únicas para filtro - CORREGIDO
  const uniqueCategories = React.useMemo(() => {
    const categorySet = new Set<string>();
    savingsGoals.forEach((goal) => categorySet.add(goal.category));
    const categories = Array.from(categorySet);
    return categories.map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));
  }, [savingsGoals]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "in-progress":
        return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case "paused":
        return <PauseCircle className="h-4 w-4 text-yellow-400" />;
      case "behind":
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      case "not-started":
        return <Clock className="h-4 w-4 text-text-200" />;
      default:
        return <Clock className="h-4 w-4 text-text-200" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Barra de control */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Estadísticas rápidas */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-100">
                  {stats.total}
                </div>
                <div className="text-xs text-text-200">Metas</div>
              </div>
              <div className="h-8 w-px bg-bg-300/50"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-200">
                  {stats.avgProgress}%
                </div>
                <div className="text-xs text-text-200">Progreso promedio</div>
              </div>
              <div className="h-8 w-px bg-bg-300/50"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {formatCurrency(stats.totalSaved)}
                </div>
                <div className="text-xs text-text-200">Total ahorrado</div>
              </div>
            </div>

            {/* Controles de vista */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-bg-300/20 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`h-8 px-3 ${
                    viewMode === "grid"
                      ? "bg-primary-100/20 text-primary-200"
                      : "text-text-200"
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-8 px-3 ${
                    viewMode === "list"
                      ? "bg-primary-100/20 text-primary-200"
                      : "text-text-200"
                  }`}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>

              <Select
                value={sortBy}
                onValueChange={(value: any) => setSortBy(value)}
              >
                <SelectTrigger className="w-[140px] bg-bg-300/30 border-bg-300/50 text-text-100">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                  <SelectItem value="progress">Progreso</SelectItem>
                  <SelectItem value="deadline">Fecha límite</SelectItem>
                  <SelectItem value="priority">Prioridad</SelectItem>
                  <SelectItem value="amount">Monto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-200" />
              <Input
                placeholder="Buscar metas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-bg-300/30 border-bg-300/50 text-text-100"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="in-progress">En progreso</SelectItem>
                <SelectItem value="completed">Completados</SelectItem>
                <SelectItem value="paused">Pausados</SelectItem>
                <SelectItem value="behind">Atrasados</SelectItem>
                <SelectItem value="not-started">No iniciados</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                <SelectItem value="all">Todas las categorías</SelectItem>
                {uniqueCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
                onClick={() => {
                  setFilterStatus("all");
                  setFilterCategory("all");
                  setSearchQuery("");
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpiar filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros rápidos por estado */}
      <div className="flex flex-wrap gap-2">
        <Tabs
          value={filterStatus}
          onValueChange={setFilterStatus}
          className="w-full"
        >
          <TabsList className="grid grid-cols-6 bg-bg-200/40 backdrop-blur-md border border-bg-300/40 p-1 rounded-xl">
            <TabsTrigger value="all" className="text-xs">
              Todos ({savingsGoals.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              En progreso (
              {savingsGoals.filter((g) => g.status === "in-progress").length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completados (
              {savingsGoals.filter((g) => g.status === "completed").length})
            </TabsTrigger>
            <TabsTrigger value="paused" className="text-xs">
              <PauseCircle className="h-3 w-3 mr-1" />
              Pausados (
              {savingsGoals.filter((g) => g.status === "paused").length})
            </TabsTrigger>
            <TabsTrigger value="behind" className="text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              Atrasados (
              {savingsGoals.filter((g) => g.status === "behind").length})
            </TabsTrigger>
            <TabsTrigger value="not-started" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              No iniciados (
              {savingsGoals.filter((g) => g.status === "not-started").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Vista de metas */}
      {viewMode === "grid" ? (
        // Vista en cuadrícula
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedGoals.length > 0 ? (
            filteredAndSortedGoals.map((goal) => (
              <SavingsGoalCard
                key={goal.id}
                goal={{
                  ...goal,
                  // Conversión para compatibilidad
                  status:
                    goal.status === "not-started" ? "in-progress" : goal.status,
                }}
                onEdit={() => console.log("Editar meta:", goal.id)}
                onDelete={() => console.log("Eliminar meta:", goal.id)}
                onTogglePause={() =>
                  console.log("Pausar/reanudar meta:", goal.id)
                }
              />
            ))
          ) : (
            <div className="col-span-full">
              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
                <CardContent className="p-12 text-center">
                  <Target className="h-12 w-12 text-text-200/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-100 mb-2">
                    No se encontraron metas
                  </h3>
                  <p className="text-text-200 mb-6">
                    Intenta ajustar tus filtros o crea una nueva meta
                  </p>
                  <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear primera meta
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ) : (
        // Vista en lista
        <div className="space-y-4">
          {filteredAndSortedGoals.length > 0 ? (
            filteredAndSortedGoals.map((goal) => (
              <Card
                key={goal.id}
                className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Icono y estado */}
                      <div className="relative">
                        <div
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: `${goal.color}20` }}
                        >
                          <Target
                            className="h-5 w-5"
                            style={{ stroke: goal.color }}
                          />
                        </div>
                        <div className="absolute -top-1 -right-1">
                          {getStatusIcon(goal.status)}
                        </div>
                      </div>

                      {/* Información principal */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-text-100 truncate">
                            {goal.name}
                          </h3>
                          <Badge
                            className={`${
                              goal.priority === "critical"
                                ? "bg-red-500/20 text-red-400"
                                : goal.priority === "high"
                                ? "bg-orange-500/20 text-orange-400"
                                : goal.priority === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {goal.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-200">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(goal.deadline).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            <span>
                              {formatCurrency(goal.monthlyContribution)}/mes
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            <span>{goal.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Progreso y monto */}
                      <div className="text-right min-w-[180px]">
                        <div className="text-2xl font-bold text-text-100 mb-1">
                          {goal.progress}%
                        </div>
                        <div className="text-sm text-text-200">
                          {formatCurrency(goal.currentAmount)} /{" "}
                          {formatCurrency(goal.targetAmount)}
                        </div>
                        <div className="w-full mt-2">
                          <Progress
                            value={goal.progress}
                            className="h-2 bg-bg-300/50"
                            indicatorClassName="bg-gradient-to-r from-primary-100 to-primary-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Botón de expandir */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedGoalId(
                          expandedGoalId === goal.id ? null : goal.id
                        )
                      }
                      className="ml-4"
                    >
                      {expandedGoalId === goal.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Contenido expandido */}
                  {expandedGoalId === goal.id && (
                    <div className="mt-6 pt-6 border-t border-bg-300/30">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-text-100 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary-200" />
                            Insights de IA
                          </h4>
                          {goal.insights.map((insight, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="p-1 rounded bg-primary-100/20 mt-0.5">
                                <Zap className="h-3 w-3 text-primary-200" />
                              </div>
                              <p className="text-sm text-text-200">{insight}</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-text-100">
                            Reglas automáticas
                          </h4>
                          <div className="space-y-2">
                            {goal.automaticRules.map((rule, index) => (
                              <Badge
                                key={index}
                                className="bg-bg-300/30 text-text-200"
                              >
                                {rule}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-text-100">
                            Progreso detallado
                          </h4>
                          <div className="flex justify-center">
                            <GoalProgressChart
                              progress={goal.progress}
                              size={100}
                              strokeWidth={10}
                              showLabel={false}
                              // Conversión para compatibilidad
                              status={
                                goal.status === "not-started"
                                  ? "in-progress"
                                  : goal.status === "paused"
                                  ? "in-progress"
                                  : goal.status
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 text-text-200/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-100 mb-2">
                  No se encontraron metas
                </h3>
                <p className="text-text-200 mb-6">
                  Intenta ajustar tus filtros o crea una nueva meta
                </p>
                <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear primera meta
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Resumen del filtro */}
      {filteredAndSortedGoals.length > 0 && (
        <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-200/5 backdrop-blur-md border border-primary-100/20 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary-200" />
                  <span className="text-text-100 font-medium">
                    Mostrando {filteredAndSortedGoals.length} de{" "}
                    {savingsGoals.length} metas
                  </span>
                </div>
                <div className="h-4 w-px bg-bg-300/50"></div>
                <div className="text-text-200">
                  Total ahorrado:{" "}
                  <span className="font-medium text-green-400">
                    {formatCurrency(stats.totalSaved)}
                  </span>
                </div>
                <div className="h-4 w-px bg-bg-300/50"></div>
                <div className="text-text-200">
                  Meta total:{" "}
                  <span className="font-medium text-text-100">
                    {formatCurrency(stats.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="text-sm text-text-200">
                Progreso promedio:{" "}
                <span className="font-bold text-primary-200">
                  {stats.avgProgress}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavingsGoalsList;
