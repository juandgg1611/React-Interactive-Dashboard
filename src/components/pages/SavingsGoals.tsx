// src/pages/SavingsGoals.tsx
import React, { useState, useEffect } from "react";
import {
  Target,
  Trophy,
  Zap,
  Download,
  Calendar,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Lightbulb,
  Sparkles,
  Bell,
  ChevronRight,
  Filter,
  Search,
  BarChart3,
  PieChart,
  List as ListIcon,
  Grid3x3,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Award,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Progress } from "../ui/progress";

// Importar Layout
import Layout from "../layout/Layout";

// Componentes del módulo
import SavingsOverview from "../savings-goals/SavingsOverview";
import SavingsGoalCard from "../savings-goals/SavingsGoalCard";
import SmartSavingsPanel from "../savings-goals/SmartSavingsPanel";
import SavingsExport from "../savings-goals/SavingsExport";
import GoalCreationWizard from "../savings-goals/GoalCreationWizard";
import SavingsInsights from "../savings-goals/SavingsInsights";

import GoalCelebration from "../savings-goals/GoalCelebration";
import AutoSavingsRules from "../savings-goals/AutoSavingsRules";

// Datos de ejemplo
import { savingsGoals, savingsSummary } from "../../data/savingsData";

const SavingsGoals = () => {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreationWizard, setShowCreationWizard] = useState(false);
  const [showGoalCelebration, setShowGoalCelebration] = useState(false);
  const [celebratedGoal, setCelebratedGoal] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Estado para mostrar todas las metas
  const [showAllGoals, setShowAllGoals] = useState(false);

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Función para formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calcular estadísticas rápidas
  const activeGoals = savingsGoals.filter(
    (g) => g.status === "in-progress"
  ).length;
  const totalTarget = savingsGoals.reduce(
    (sum, goal) => sum + goal.targetAmount,
    0
  );
  const totalSaved = savingsGoals.reduce(
    (sum, goal) => sum + goal.currentAmount,
    0
  );

  // Filtrar y ordenar metas
  const filteredAndSortedGoals = React.useMemo(() => {
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

  // Metas a mostrar (4 iniciales o todas)
  const displayedGoals = showAllGoals
    ? filteredAndSortedGoals
    : filteredAndSortedGoals.slice(0, 4);

  // Categorías únicas para filtro
  const uniqueCategories = React.useMemo(() => {
    const categories = [...new Set(savingsGoals.map((goal) => goal.category))];
    return categories.map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));
  }, []);

  // Simular completar una meta para demostración
  const simulateGoalCompletion = () => {
    const completedGoal = savingsGoals.find(
      (g) => g.status === "completed"
    ) || {
      ...savingsGoals[0],
      status: "completed",
      progress: 100,
      actualCompletion: new Date().toISOString().split("T")[0],
    };
    setCelebratedGoal(completedGoal);
    setShowGoalCelebration(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Header con gradiente verde animado */}
        <div className="mb-8 relative">
          {/* Fondo con gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-primary-200/5 to-primary-300/3 rounded-2xl blur-xl"></div>

          {/* Efectos de partículas */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-4 -left-4 w-8 h-8 bg-primary-200/10 rounded-full blur-md animate-pulse"></div>
            <div className="absolute bottom-4 -right-4 w-12 h-12 bg-primary-100/5 rounded-full blur-lg"></div>
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Icono con efectos especiales */}
                  <div className="relative group">
                    {/* Brillos externos */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary-200/20 to-primary-300/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="absolute -inset-1 bg-primary-100/10 rounded-xl blur-md"></div>

                    {/* Icono principal */}
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-primary-300/10 border border-primary-200/30 shadow-lg shadow-primary-200/15 backdrop-blur-sm">
                      <Target className="h-8 w-8 text-primary-200 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300" />

                      {/* Efecto de meta en el icono */}
                      <div className="absolute -top-1 -right-1">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                          <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-200 flex items-center justify-center">
                            <Trophy className="h-2.5 w-2.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Títulos con gradiente */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                      Metas de Ahorro
                    </h1>
                    <p className="text-text-200/80 mt-2 max-w-2xl">
                      Define, rastrea y alcanza tus objetivos financieros con
                      inteligencia artificial
                    </p>
                  </div>
                </div>

                {/* Stats en tiempo real */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                      <div className="relative h-2 w-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-text-200">
                      3 metas activas
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <Award className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      45% progreso total
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Indicador de tiempo mejorado */}
                <div className="hidden md:flex items-center gap-3 text-sm bg-bg-200/40 backdrop-blur-md rounded-xl px-4 py-3 border border-bg-300/50 shadow-lg hover:shadow-primary-200/10 transition-all duration-300">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-text-100">
                      <Calendar className="h-4 w-4 text-primary-200" />
                      <span className="font-medium">
                        {time.toLocaleDateString("es-ES", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-text-200 mt-1">
                      <Clock className="h-3.5 w-3.5 text-primary-200/70" />
                      <span className="text-sm">
                        {time.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botón de nueva meta */}
                <Button
                  onClick={() => setShowCreationWizard(true)}
                  className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/30 hover:shadow-primary-200/40 transition-all duration-300 group"
                >
                  <PlusCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Nueva Meta
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas principales */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-4 bg-bg-200/40 backdrop-blur-md border border-bg-300/40 p-1 rounded-2xl shadow-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Target className="h-4 w-4 mr-2" />
              Visión General
            </TabsTrigger>
            <TabsTrigger
              value="my-goals"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Mis Metas
            </TabsTrigger>
            <TabsTrigger
              value="smart-savings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Zap className="h-4 w-4 mr-2" />
              Ahorro Inteligente
            </TabsTrigger>
            <TabsTrigger
              value="export"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </TabsTrigger>
          </TabsList>

          {/* ==================== CONTENIDO: Visión General ==================== */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <SavingsOverview />
          </TabsContent>

          {/* ==================== CONTENIDO: Mis Metas ==================== */}
          <TabsContent value="my-goals" className="space-y-6 mt-6">
            {/* Barra de control */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Estadísticas rápidas */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-100">
                        {displayedGoals.length}
                      </div>
                      <div className="text-xs text-text-200">
                        Metas visibles
                      </div>
                    </div>
                    <div className="h-8 w-px bg-bg-300/50"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-200">
                        {displayedGoals.length > 0
                          ? Math.round(
                              displayedGoals.reduce(
                                (sum, goal) => sum + goal.progress,
                                0
                              ) / displayedGoals.length
                            )
                          : 0}
                        %
                      </div>
                      <div className="text-xs text-text-200">
                        Progreso promedio
                      </div>
                    </div>
                    <div className="h-8 w-px bg-bg-300/50"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {formatCurrency(
                          displayedGoals.reduce(
                            (sum, goal) => sum + goal.currentAmount,
                            0
                          )
                        )}
                      </div>
                      <div className="text-xs text-text-200">
                        Total ahorrado visible
                      </div>
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
                    </SelectContent>
                  </Select>

                  <Select
                    value={filterCategory}
                    onValueChange={setFilterCategory}
                  >
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
                <TabsList className="grid grid-cols-5 bg-bg-200/40 backdrop-blur-md border border-bg-300/40 p-1 rounded-xl">
                  <TabsTrigger value="all" className="text-xs">
                    Todos ({savingsGoals.length})
                  </TabsTrigger>
                  <TabsTrigger value="in-progress" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    En progreso (
                    {
                      savingsGoals.filter((g) => g.status === "in-progress")
                        .length
                    }
                    )
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs">
                    <Target className="h-3 w-3 mr-1" />
                    Completados (
                    {
                      savingsGoals.filter((g) => g.status === "completed")
                        .length
                    }
                    )
                  </TabsTrigger>
                  <TabsTrigger value="paused" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Pausados (
                    {savingsGoals.filter((g) => g.status === "paused").length})
                  </TabsTrigger>
                  <TabsTrigger value="behind" className="text-xs">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Atrasados (
                    {savingsGoals.filter((g) => g.status === "behind").length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {/* Vista de metas */}
            {viewMode === "grid" ? (
              // Vista en cuadrícula - CAMBIADO A grid-cols-1 md:grid-cols-2
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedGoals.length > 0 ? (
                  displayedGoals.map((goal) => (
                    <SavingsGoalCard
                      key={goal.id}
                      goal={{
                        ...goal,
                        // Conversión para compatibilidad - asegura que el status sea compatible
                        status:
                          goal.status === "not-started"
                            ? "in-progress"
                            : goal.status,
                      }}
                      onEdit={() => console.log("Editar meta:", goal.id)}
                      onDelete={() => {
                        if (
                          window.confirm("¿Estás seguro de eliminar esta meta?")
                        ) {
                          console.log("Eliminar meta:", goal.id);
                        }
                      }}
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
                        <Button
                          onClick={() => setShowCreationWizard(true)}
                          className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
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
                {displayedGoals.length > 0 ? (
                  displayedGoals.map((goal) => (
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
                                    {formatCurrency(goal.monthlyContribution)}
                                    /mes
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

                          {/* Botones de acción */}
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-text-200 hover:text-primary-300"
                              onClick={() => console.log("Editar:", goal.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-text-200 hover:text-red-400"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `¿Estás seguro de eliminar la meta "${goal.name}"?`
                                  )
                                ) {
                                  console.log("Eliminar:", goal.id);
                                }
                              }}
                            >
                              <EyeOff className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
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
                      <Button
                        onClick={() => setShowCreationWizard(true)}
                        className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Crear primera meta
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Botón para mostrar todas las metas DESPUÉS de la vista de metas y ANTES de Insights adicionales */}
            {!showAllGoals && filteredAndSortedGoals.length > 4 && (
              <div className="text-center py-8">
                <Button
                  onClick={() => setShowAllGoals(true)}
                  variant="outline"
                  className="
        inline-flex items-center justify-center gap-2
        whitespace-nowrap rounded-lg text-sm font-medium
        ring-offset-background focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-2 disabled:pointer-events-none
        disabled:opacity-50 [&_svg]:pointer-events-none
        [&_svg]:size-4 [&_svg]:shrink-0
        border bg-background h-12 px-6 py-3 w-full
        border-bg-300/60 text-text-200
        hover:text-primary-300 hover:border-primary-200/50
        hover:bg-primary-100/5
        transition-all duration-700 ease-in-out
        group backdrop-blur-sm
      "
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-base">
                      Ver todas las metas ({filteredAndSortedGoals.length})
                    </span>
                    <ChevronRight className="h-5 w-5 transition-all duration-500 ease-in-out transform group-hover:translate-x-2" />
                  </div>
                </Button>
                <p className="text-sm text-text-200 mt-4 transition-opacity duration-500 ease-in-out opacity-80">
                  Mostrando 4 de {filteredAndSortedGoals.length} metas
                </p>
              </div>
            )}

            {showAllGoals && filteredAndSortedGoals.length > 4 && (
              <div className="text-center py-8 border-t border-bg-300/40 mt-8 transition-all duration-500 ease-in-out">
                <Button
                  onClick={() => {
                    setShowAllGoals(false);
                    // Scroll suave hacia arriba después de un breve delay para la animación
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }, 300);
                  }}
                  variant="outline"
                  className="
        inline-flex items-center justify-center gap-2
        whitespace-nowrap rounded-lg text-sm font-medium
        ring-offset-background focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-2 disabled:pointer-events-none
        disabled:opacity-50 [&_svg]:pointer-events-none
        [&_svg]:size-4 [&_svg]:shrink-0
        border bg-background h-12 px-6 py-3 w-full
        border-bg-300/60 text-text-200
        hover:text-primary-300 hover:border-primary-200/50
        hover:bg-primary-100/5
        transition-all duration-100 ease-in-out
        group backdrop-blur-sm
      "
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-base">Mostrar menos</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        className="
            bg-bg-300/30 text-text-200 hover:bg-bg-300/40 
            text-xs px-2 py-1
            transition-all duration-500 ease-in-out
            group-hover:bg-bg-300/50
          "
                      >
                        {filteredAndSortedGoals.length} metas
                      </Badge>
                      <ChevronRight
                        className="
            h-5 w-5 rotate-180 
            transition-all duration-500 ease-in-out 
            transform group-hover:-translate-x-2
          "
                      />
                    </div>
                  </div>
                </Button>
              </div>
            )}

            {/* Insights adicionales */}
            <SavingsInsights />
          </TabsContent>

          {/* ==================== CONTENIDO: Ahorro Inteligente ==================== */}
          <TabsContent value="smart-savings" className="space-y-6 mt-6">
            <SmartSavingsPanel />
          </TabsContent>

          {/* ==================== CONTENIDO: Exportar ==================== */}
          <TabsContent value="export" className="space-y-6 mt-6">
            <SavingsExport goals={savingsGoals} summary={savingsSummary} />
          </TabsContent>
        </Tabs>

        {/* Wizard de creación de meta */}
        {showCreationWizard && (
          <GoalCreationWizard
            onClose={() => setShowCreationWizard(false)}
            onSubmit={(data) => {
              console.log("Nueva meta creada:", data);
              setShowCreationWizard(false);
              // Aquí normalmente se enviaría al backend
            }}
          />
        )}

        {/* Modal de celebración */}
        {showGoalCelebration && (
          <GoalCelebration
            goal={celebratedGoal}
            isOpen={showGoalCelebration}
            onClose={() => {
              setShowGoalCelebration(false);
              setCelebratedGoal(null);
            }}
            onNextGoal={() => {
              setShowGoalCelebration(false);
              setShowCreationWizard(true);
            }}
            onShare={() => {
              console.log("Compartiendo logro:", celebratedGoal);
            }}
          />
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-bg-300/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-text-200/70">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary-200 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    {savingsGoals.length} metas activas • {activeGoals} en
                    progreso
                  </span>
                </div>
                <div className="h-4 w-px bg-bg-300/50"></div>
                <span className="text-sm">
                  Última actualización:{" "}
                  {time.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Botón para demostrar celebración (solo desarrollo) */}
              <Button
                variant="outline"
                size="sm"
                onClick={simulateGoalCompletion}
                className="text-text-200 hover:text-primary-300 hover:border-primary-200/50"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Demostrar Celebración
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("smart-savings")}
                className="text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Ahorro Inteligente
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
              >
                <Bell className="h-4 w-4 mr-2" />
                Recordatorios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavingsGoals;
