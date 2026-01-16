// src/pages/Budgets.tsx
import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Download,
  Filter,
  Bell,
  Settings,
  ChevronRight,
  Sparkles,
  Brain,
  BarChart3,
  PieChart,
  AlertCircle,
  CheckCircle,
  Info,
  Wallet,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Edit2,
  Trash2,
  Lightbulb,
  Target as TargetIcon,
  Zap,
  Shield,
  Users,
  Clock,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Componentes del módulo
import BudgetOverview from "../budgets/BudgetOverview";
import BudgetCategoryCard from "../budgets/BudgetCategoryCard";
import BudgetHistoryChart from "../budgets/BudgetHistoryChart";
import BudgetInsights from "../budgets/BudgetInsights";
import BudgetNotifications from "../budgets/BudgetNotifications";
import CreateCategoryForm from "../budgets/CreateCategoryForm";
import BudgetExport from "../budgets/BudgetExport";

// Datos
import {
  currentBudget,
  budgetHistory,
  budgetInsights,
} from "../../data/budgetData";

// Importar Layout
import Layout from "../layout/Layout";
import { CategoryIcons } from "../budgets/CategoryIcons";

const Budgets = () => {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showNewBudgetForm, setShowNewBudgetForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Función para manejar la creación de categorías
  const handleCreateCategory = (categoryData: {
    name: string;
    icon: string;
    limit: number;
    color: string;
  }) => {
    console.log("Nueva categoría creada:", categoryData);
    setShowCategoryForm(false);
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
                      <TrendingUp className="h-8 w-8 text-primary-200 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300" />

                      {/* Efecto de presupuesto en el icono */}
                      <div className="absolute -top-1 -right-1">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                          <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-200 flex items-center justify-center">
                            <Target className="h-2.5 w-2.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Títulos con gradiente */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                      Gestión de Presupuestos
                    </h1>
                    <p className="text-text-200/80 mt-2 max-w-2xl">
                      Control inteligente de límites de gasto con IA predictiva
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
                      Salud Financiera: 78%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <CheckCircle className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      $850 ahorrados este mes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Indicador de tiempo */}
                <div className="flex items-center gap-3 text-sm bg-bg-200/40 backdrop-blur-md rounded-xl px-4 py-3 border border-bg-300/50 shadow-lg hover:shadow-primary-200/10 transition-all duration-300">
                  <div className="flex items-center gap-2 text-text-100">
                    <Calendar className="h-4 w-4 text-primary-200" />
                    <span className="font-medium">
                      {time.toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="h-4 w-px bg-bg-300/50"></div>
                  <div className="text-text-200">
                    {time.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* Botón de nuevo presupuesto */}
                <Button
                  onClick={() => setShowNewBudgetForm(true)}
                  className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/30 hover:shadow-primary-200/40 transition-all duration-300 group"
                >
                  <PlusCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Nuevo Presupuesto
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas principales con diseño mejorado */}
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
              value="categories"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <PieChart className="h-4 w-4 mr-2" />
              Categorías
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Historial
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
            {/* Fila 1: Visión general + Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Visión General (2/3) - VERSIÓN MEJORADA */}
              <div className="lg:col-span-2">
                <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl h-full overflow-hidden">
                  {/* Header con gradiente */}
                  <div className="bg-gradient-to-r from-primary-100/20 to-primary-200/10 border-b border-bg-300/40">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-text-100 text-xl flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100/30 to-primary-200/20">
                              <Target className="h-5 w-5 text-primary-200" />
                            </div>
                            <span>Visión General del Presupuesto</span>
                          </CardTitle>
                          <CardDescription className="text-text-200 mt-1">
                            Estado financiero completo • {currentBudget.month}{" "}
                            {currentBudget.year}
                          </CardDescription>
                        </div>
                        <Badge className="bg-gradient-to-r from-primary-100/30 to-primary-200/30 text-primary-200 border-primary-100/40 px-3 py-1">
                          <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                          En camino
                        </Badge>
                      </div>
                    </CardHeader>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Anillo de progreso y métricas principales - DISEÑO MEJORADO */}
                      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        {/* Anillo de progreso con diseño premium */}
                        <div className="relative w-56 h-56">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/5 to-transparent rounded-full"></div>
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
                              stroke="url(#progressGradient)"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={`${
                                currentBudget.progress * 2.83
                              } 283`}
                              transform="rotate(-90 50 50)"
                              className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                              <linearGradient
                                id="progressGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#2E8B57" />
                                <stop offset="100%" stopColor="#61bc84" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-center">
                              <span className="text-4xl font-bold bg-gradient-to-r from-primary-200 to-accent-100 bg-clip-text text-transparent">
                                {currentBudget.progress}%
                              </span>
                              <div className="text-sm text-text-200 mt-1">
                                Utilizado
                              </div>
                              <div className="text-xl font-semibold text-text-100 mt-3">
                                {formatCurrency(currentBudget.remaining)}
                              </div>
                              <div className="text-xs text-text-200">
                                Restante
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Métricas principales en grid 2x2 */}
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          {/* Presupuesto Total */}
                          <div className="p-5 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20 hover:border-primary-200/30 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded-lg bg-primary-100/20">
                                <Wallet className="h-4 w-4 text-primary-200" />
                              </div>
                              <div className="text-xs text-text-200">
                                Presupuesto Total
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-primary-200">
                              {formatCurrency(currentBudget.totalLimit)}
                            </div>
                            <div className="text-xs text-text-200/60 mt-1">
                              Límite mensual
                            </div>
                          </div>

                          {/* Gastado Total */}
                          <div className="p-5 rounded-xl bg-gradient-to-br from-bg-300/30 to-bg-300/10 border border-bg-300/40 hover:border-bg-300/60 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded-lg bg-bg-300/30">
                                <TrendingDown className="h-4 w-4 text-text-200" />
                              </div>
                              <div className="text-xs text-text-200">
                                Gastado Total
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-text-100">
                              {formatCurrency(currentBudget.totalSpent)}
                            </div>
                            <div className="text-xs text-text-200/60 mt-1">
                              Este mes
                            </div>
                          </div>

                          {/* Comparación mensual */}
                          <div className="p-5 rounded-xl bg-gradient-to-br from-accent-100/10 to-accent-100/5 border border-accent-100/20 hover:border-accent-100/30 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded-lg bg-accent-100/20">
                                <TrendingUp className="h-4 w-4 text-accent-100" />
                              </div>
                              <div className="text-xs text-text-200">
                                Comparación
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-green-400">
                              +12%
                            </div>
                            <div className="flex items-center text-xs text-text-200 mt-1">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              vs mes anterior
                            </div>
                          </div>

                          {/* Días restantes */}
                          <div className="p-5 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/5 border border-bg-300/30 hover:border-bg-300/50 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded-lg bg-bg-300/20">
                                <Clock className="h-4 w-4 text-text-200" />
                              </div>
                              <div className="text-xs text-text-200">
                                Días Restantes
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-text-100">
                              23 días
                            </div>
                            <div className="text-xs text-text-200/60 mt-1">
                              Del ciclo actual
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recomendación del día expandida */}
                      <div className="p-5 rounded-xl bg-gradient-to-r from-bg-300/30 to-bg-300/10 border border-bg-300/40">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                            <Lightbulb className="h-6 w-6 text-primary-200" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-text-100 text-lg">
                                Recomendación del día
                              </h4>
                              <Badge className="bg-primary-100/20 text-primary-200 border-primary-100/30">
                                <Zap className="h-3 w-3 mr-1" />
                                IA Sugerencia
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-300/20">
                                  <TargetIcon className="h-5 w-5 text-primary-200" />
                                  <div>
                                    <div className="text-sm font-medium text-text-100">
                                      Meta de ahorro mensual
                                    </div>
                                    <div className="text-xs text-text-200">
                                      Aumenta tu ahorro en 15% este mes
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-300/20">
                                  <Shield className="h-5 w-5 text-green-400" />
                                  <div>
                                    <div className="text-sm font-medium text-text-100">
                                      Categoría destacada
                                    </div>
                                    <div className="text-xs text-text-200">
                                      Alimentación: -5% vs mes pasado
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-300/20">
                                  <Users className="h-5 w-5 text-accent-100" />
                                  <div>
                                    <div className="text-sm font-medium text-text-100">
                                      Comparación saludable
                                    </div>
                                    <div className="text-xs text-text-200">
                                      Gastas 18% menos que usuarios similares
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-300/20">
                                  <Clock className="h-5 w-5 text-yellow-400" />
                                  <div>
                                    <div className="text-sm font-medium text-text-100">
                                      Próxima revisión
                                    </div>
                                    <div className="text-xs text-text-200">
                                      Sugerimos ajuste en 7 días
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary-100/10 to-primary-200/5 border border-primary-100/20">
                              <p className="text-sm text-text-100">
                                <span className="font-medium">Consejo IA:</span>{" "}
                                Si mantienes el ritmo actual, podrías ahorrar{" "}
                                {formatCurrency(450)} adicionales este
                                trimestre. Considera automatizar transferencias
                                de ahorro.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Insights de IA (1/3) */}
              <div>
                <BudgetInsights insights={budgetInsights} />
              </div>
            </div>

            {/* Fila 2: Resumen de categorías (solo tarjetas) - SIN ESTADÍSTICAS */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-text-100 flex items-center gap-2 text-xl">
                      <PieChart className="h-6 w-6 text-primary-200" />
                      Resumen por Categoría
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Principales categorías este mes
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select
                      value={selectedPeriod}
                      onValueChange={setSelectedPeriod}
                    >
                      <SelectTrigger className="w-[140px] bg-bg-300/40 backdrop-blur-sm border-bg-300/60 text-text-100">
                        <SelectValue placeholder="Período" />
                      </SelectTrigger>
                      <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                        <SelectItem value="week">Esta semana</SelectItem>
                        <SelectItem value="month">Este mes</SelectItem>
                        <SelectItem value="quarter">Trimestre</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentBudget.categories.slice(0, 8).map((category) => (
                    <BudgetCategoryCard key={category.id} category={category} />
                  ))}
                </div>

                {/* Botón para ver todas las categorías */}
                {currentBudget.categories.length > 8 && (
                  <div className="mt-6 pt-6 border-t border-bg-300/40">
                    <Button
                      variant="outline"
                      className="w-full border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50 hover:bg-primary-100/5 transition-all duration-300 group"
                      onClick={() => setActiveTab("categories")}
                    >
                      Ver todas las categorías (
                      {currentBudget.categories.length})
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== CONTENIDO: Categorías Detalladas ==================== */}
          <TabsContent value="categories" className="space-y-6 mt-6">
            {/* Estadísticas de categorías - MOVIDAS AQUÍ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Categorías Activas */}
              <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-100/5 backdrop-blur-sm border border-primary-100/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary-100/20">
                        <CheckCircle className="h-5 w-5 text-primary-200" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-text-100">
                          Categorías Activas
                        </div>
                        <div className="text-xs text-text-200">
                          70% o menos gastado
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-200 mb-2">
                      {
                        currentBudget.categories.filter(
                          (c) => c.spent / c.limit <= 0.7
                        ).length
                      }
                    </div>
                    <div className="text-sm text-text-200">
                      de {currentBudget.categories.length} totales
                    </div>
                    <div className="h-2 bg-bg-300/30 rounded-full mt-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-100 to-primary-200 rounded-full"
                        style={{
                          width: `${
                            (currentBudget.categories.filter(
                              (c) => c.spent / c.limit <= 0.7
                            ).length /
                              currentBudget.categories.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Categorías en Riesgo */}
              <Card className="border-0 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 backdrop-blur-sm border border-yellow-500/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-500/20">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-text-100">
                          En Riesgo
                        </div>
                        <div className="text-xs text-text-200">
                          71-89% gastado
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">
                      {
                        currentBudget.categories.filter(
                          (c) =>
                            c.spent / c.limit > 0.7 && c.spent / c.limit <= 0.89
                        ).length
                      }
                    </div>
                    <div className="text-sm text-text-200">
                      Requieren atención
                    </div>
                    <div className="h-2 bg-bg-300/30 rounded-full mt-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                        style={{
                          width: `${
                            (currentBudget.categories.filter(
                              (c) =>
                                c.spent / c.limit > 0.7 &&
                                c.spent / c.limit <= 0.89
                            ).length /
                              currentBudget.categories.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Categorías Críticas */}
              <Card className="border-0 bg-gradient-to-br from-red-500/10 to-red-500/5 backdrop-blur-sm border border-red-500/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-500/20">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-text-100">
                          Críticas
                        </div>
                        <div className="text-xs text-text-200">
                          90%+ gastado
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400 mb-2">
                      {
                        currentBudget.categories.filter(
                          (c) => c.spent / c.limit >= 0.9
                        ).length
                      }
                    </div>
                    <div className="text-sm text-text-200">
                      Necesitan acción inmediata
                    </div>
                    <div className="h-2 bg-bg-300/30 rounded-full mt-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                        style={{
                          width: `${
                            (currentBudget.categories.filter(
                              (c) => c.spent / c.limit >= 0.9
                            ).length /
                              currentBudget.categories.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de categorías detalladas */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-text-100 text-2xl">
                      Gestión de Categorías
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Administra y monitorea todas tus categorías de gasto
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Button
                      onClick={() => setShowCategoryForm(true)}
                      className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-100/30"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Nueva Categoría
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Lista de categorías SIN checkbox */}
                <div className="space-y-3">
                  {currentBudget.categories.map((category) => {
                    const progress = (category.spent / category.limit) * 100;
                    const iconName =
                      category.icon as keyof typeof CategoryIcons;
                    const IconComponent =
                      CategoryIcons[iconName] || CategoryIcons.other;

                    return (
                      <div
                        key={category.id}
                        className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300 group"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          {/* Información de la categoría */}
                          <div className="flex items-center gap-4 flex-1">
                            <div
                              className="p-3 rounded-lg"
                              style={{
                                backgroundColor: `${category.color}15`,
                                border: `1px solid ${category.color}30`,
                              }}
                            >
                              {IconComponent}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-semibold text-text-100">
                                  {category.name}
                                </h4>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    category.trend === "up"
                                      ? "border-red-400/30 text-red-400"
                                      : category.trend === "down"
                                      ? "border-green-400/30 text-green-400"
                                      : "border-gray-400/30 text-gray-400"
                                  }`}
                                >
                                  {category.trend === "up" ? (
                                    <TrendingUpIcon className="h-3 w-3 mr-1" />
                                  ) : category.trend === "down" ? (
                                    <TrendingDownIcon className="h-3 w-3 mr-1" />
                                  ) : null}
                                  {category.trendPercentage > 0 ? "+" : ""}
                                  {category.trendPercentage}%
                                </Badge>
                              </div>
                              <div className="text-sm text-text-200">
                                {formatCurrency(category.spent)} /{" "}
                                {formatCurrency(category.limit)}
                                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-bg-300/30">
                                  {progress.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Barra de progreso y acciones */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:w-2/5">
                            {/* Barra de progreso */}
                            <div className="flex-1">
                              <div className="flex justify-between text-xs text-text-200 mb-1">
                                <span>Progreso</span>
                                <span
                                  className={`font-medium ${
                                    progress > 90
                                      ? "text-red-400"
                                      : progress > 70
                                      ? "text-yellow-400"
                                      : "text-green-400"
                                  }`}
                                >
                                  {Math.round(progress)}%
                                </span>
                              </div>
                              <div className="h-2 bg-bg-300/50 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-1000 ${
                                    progress > 90
                                      ? "bg-gradient-to-r from-red-500 to-red-400"
                                      : progress > 70
                                      ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                                      : "bg-gradient-to-r from-green-500 to-green-400"
                                  }`}
                                  style={{
                                    width: `${Math.min(100, progress)}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {/* Información y acciones */}
                            <div className="flex items-center gap-4">
                              <div className="text-right min-w-[100px]">
                                <div
                                  className={`font-semibold ${
                                    category.limit - category.spent < 50
                                      ? "text-red-400"
                                      : "text-text-100"
                                  }`}
                                >
                                  {formatCurrency(
                                    category.limit - category.spent
                                  )}
                                </div>
                                <div className="text-xs text-text-200">
                                  Restante
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 border-bg-300/50 text-text-200 hover:text-primary-300 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 border-red-400/30 text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== CONTENIDO: Historial ==================== */}
          <TabsContent value="history" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Gráfico principal */}
              <div className="lg:col-span-2">
                <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl h-full">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-text-100 text-xl">
                          Evolución de Presupuestos
                        </CardTitle>
                        <CardDescription className="text-text-200">
                          Tendencia histórica de los últimos 7 meses
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        className="border-primary-200/40 text-primary-200 hover:bg-primary-100/10 hover:border-primary-200/60"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Exportar Reporte
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <BudgetHistoryChart data={budgetHistory} />
                  </CardContent>
                </Card>
              </div>

              {/* Estadísticas laterales */}
              <div className="space-y-6">
                <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-text-100">
                      Resumen Histórico
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-bg-300/30 to-bg-300/10 border border-bg-300/40">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-text-200">
                            Promedio Gastado
                          </div>
                          <div className="text-2xl font-bold text-text-100">
                            {formatCurrency(
                              budgetHistory.reduce(
                                (acc, curr) => acc + curr.spent,
                                0
                              ) / budgetHistory.length
                            )}
                          </div>
                        </div>
                        <Wallet className="h-10 w-10 text-primary-200/30" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-text-200">
                            Total Ahorrado
                          </div>
                          <div className="text-2xl font-bold text-green-400">
                            {formatCurrency(
                              budgetHistory.reduce(
                                (acc, curr) => acc + curr.saved,
                                0
                              )
                            )}
                          </div>
                        </div>
                        <TrendingUp className="h-10 w-10 text-green-400/30" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary-100/10 to-primary-100/5 border border-primary-100/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-text-200">Mejor Mes</div>
                          <div className="text-xl font-bold text-text-100">
                            Oct 2023
                          </div>
                          <div className="text-sm text-green-400">
                            +{formatCurrency(700)} ahorrados
                          </div>
                        </div>
                        <CheckCircle className="h-10 w-10 text-primary-200/30" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ==================== CONTENIDO: Exportar ==================== */}
          <TabsContent value="export" className="space-y-6 mt-6">
            <BudgetExport
              budget={currentBudget}
              history={budgetHistory}
              categories={currentBudget.categories}
              insights={budgetInsights}
            />
          </TabsContent>
        </Tabs>

        {/* Formulario para crear categoría */}
        <CreateCategoryForm
          isOpen={showCategoryForm}
          onClose={() => setShowCategoryForm(false)}
          onSubmit={handleCreateCategory}
        />

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-bg-300/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-text-200/70">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary-200 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    Sistema activo • IA en tiempo real
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
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
              >
                <Brain className="h-4 w-4 mr-2" />
                Recalcular con IA
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
              >
                <Bell className="h-4 w-4 mr-2" />
                Alertas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Budgets;
