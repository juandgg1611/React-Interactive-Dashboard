// src/pages/Dashboard.tsx (VERSIÓN CORREGIDA)
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  PiggyBank,
  PlusCircle,
  FileText,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Filter,
  FolderPlus,
  Bell,
  Settings,
  ChevronRight,
  Sparkles,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Zap,
  Brain,
  ShoppingCart,
  Coffee,
  Car,
  Heart,
  GraduationCap,
  Gift,
  Dumbbell,
  Download,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Award,
  Home,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

// Componentes de Recharts para gráficos
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

// Importar Layout
import Layout from "../layout/Layout";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [showBalance, setShowBalance] = useState(true);
  const [activePeriod, setActivePeriod] = useState("month");

  // Estado para gráficos de ingresos/gastos
  const [incomeExpenseChartType, setIncomeExpenseChartType] = useState<
    "line" | "area" | "bar"
  >("bar");
  const [showIncome, setShowIncome] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [incomeExpenseHoverData, setIncomeExpenseHoverData] =
    useState<any>(null);
  const [isChartExpanded, setIsChartExpanded] = useState(false);

  // Estado para gráfico de categorías
  const [categoryChartType, setCategoryChartType] = useState<"pie" | "bar">(
    "pie"
  );
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(
    null
  );

  // Datos de ejemplo
  const dashboardData = {
    user: {
      name: "María González",
      avatar: "MG",
      role: "Investigador Financiero",
    },
    metrics: {
      totalBalance: 1250.5,
      monthlyIncome: 2000.0,
      monthlyExpenses: 749.5,
      netBalance: 1251.0,
      savingsRate: 37.5,
    },
    accounts: [
      {
        id: 1,
        name: "Principal",
        type: "checking",
        balance: 850.5,
        currency: "USD",
        color: "#2E8B57",
      },
      {
        id: 2,
        name: "Ahorros",
        type: "savings",
        balance: 400.0,
        currency: "USD",
        color: "#8FBC8F",
      },
    ],
    incomeData: [
      { month: "Ene", income: 1800, expenses: 1200 },
      { month: "Feb", income: 2000, expenses: 1100 },
      { month: "Mar", income: 2200, expenses: 950 },
      { month: "Abr", income: 2000, expenses: 1050 },
      { month: "May", income: 2100, expenses: 900 },
      { month: "Jun", income: 2300, expenses: 1100 },
    ],
    categoryData: [
      { category: "Compras", amount: 320, percentage: 25, color: "#2E8B57" },
      {
        category: "Entretenimiento",
        amount: 180,
        percentage: 14,
        color: "#8FBC8F",
      },
      { category: "Transporte", amount: 120, percentage: 9, color: "#61bc84" },
      { category: "Comida", amount: 280, percentage: 22, color: "#c6ffe6" },
      { category: "Salud", amount: 90, percentage: 7, color: "#345e37" },
      { category: "Otros", amount: 280, percentage: 23, color: "#454545" },
    ],
    recentTransactions: [
      {
        id: 1,
        description: "Supermercado",
        amount: -85.3,
        category: "Compras",
        date: "2024-01-15",
        account: "Principal",
        type: "expense" as const,
      },
      {
        id: 2,
        description: "Pago nómina",
        amount: 2000.0,
        category: "Salario",
        date: "2024-01-14",
        account: "Principal",
        type: "income" as const,
      },
      {
        id: 3,
        description: "Netflix",
        amount: -15.99,
        category: "Entretenimiento",
        date: "2024-01-13",
        account: "Principal",
        type: "expense" as const,
      },
      {
        id: 4,
        description: "Uber",
        amount: -12.5,
        category: "Transporte",
        date: "2024-01-12",
        account: "Principal",
        type: "expense" as const,
      },
      {
        id: 5,
        description: "Cafetería",
        amount: -4.75,
        category: "Comida",
        date: "2024-01-11",
        account: "Principal",
        type: "expense" as const,
      },
    ],
    savingsGoals: [
      {
        id: 1,
        name: "Viaje a Europa",
        target: 3000,
        current: 1200,
        deadline: "2024-12-31",
        progress: 40,
      },
      {
        id: 2,
        name: "Nueva Laptop",
        target: 1500,
        current: 750,
        deadline: "2024-06-30",
        progress: 50,
      },
      {
        id: 3,
        name: "Fondo Emergencia",
        target: 5000,
        current: 2500,
        deadline: "2024-12-31",
        progress: 50,
      },
    ],
    mlRecommendations: [
      {
        id: 1,
        type: "savings" as const,
        message: "Puedes aumentar tu ahorro en 15% optimizando gastos de ocio",
        confidence: 0.92,
      },
      {
        id: 2,
        type: "categorization" as const,
        message:
          'Transacción "Starbucks" reclasificada automáticamente a "Café"',
        confidence: 0.88,
      },
      {
        id: 3,
        type: "forecast" as const,
        message:
          "Pronóstico: Gastos de transporte aumentarán 12% el próximo mes",
        confidence: 0.85,
      },
    ],
  };

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

  // Componente de Tooltip para ingresos/gastos
  const IncomeExpenseTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-bg-200/90 backdrop-blur-md border border-bg-300/50 rounded-xl p-4 shadow-2xl"
        >
          <p className="font-bold text-text-100 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 mb-1"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-text-200">{entry.dataKey}:</span>
              </div>
              <span className="font-bold text-text-100">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  // Componente de Tooltip para categorías - CORREGIDO
  const CategoryTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-bg-200/90 backdrop-blur-md border border-bg-300/50 rounded-xl p-4 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <p className="font-bold text-text-100">{data.category}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-text-200">Monto:</span>
              <span className="font-bold text-text-100">
                {formatCurrency(data.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-text-200">Porcentaje:</span>
              <span className="font-bold text-text-100">
                {data.percentage}%
              </span>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      Compras: <ShoppingCart className="h-4 w-4" />,
      Entretenimiento: <FileText className="h-4 w-4" />,
      Transporte: <Car className="h-4 w-4" />,
      Comida: <Coffee className="h-4 w-4" />,
      Salud: <Heart className="h-4 w-4" />,
      Educación: <GraduationCap className="h-4 w-4" />,
      Regalos: <Gift className="h-4 w-4" />,
      Deporte: <Dumbbell className="h-4 w-4" />,
      Salario: <DollarSign className="h-4 w-4" />,
    };
    return icons[category] || <FileText className="h-4 w-4" />;
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
                      <Home className="h-8 w-8 text-primary-200 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300" />

                      {/* Efecto de dashboard en el icono */}
                      <div className="absolute -top-1 -right-1">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                          <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-200 flex items-center justify-center">
                            <BarChart3 className="h-2.5 w-2.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Títulos con gradiente */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                      Resumen Financiero
                    </h1>
                    <p className="text-text-200/80 mt-2 max-w-2xl">
                      Análisis en tiempo real con IA predictiva y métricas
                      inteligentes
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
                      Sistema Activo
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <Brain className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      IA Predictiva: 94% precisión
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Indicador de tiempo mejorado */}
                <div className="flex items-center gap-3 text-sm bg-bg-200/40 backdrop-blur-md rounded-xl px-4 py-3 border border-bg-300/50 shadow-lg hover:shadow-primary-200/10 transition-all duration-300 group">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-text-100">
                      <Calendar className="h-4 w-4 text-primary-200 group-hover:text-primary-300 transition-colors" />
                      <span className="font-medium">
                        {time.toLocaleDateString("es-ES", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-text-200 mt-1">
                      <Clock className="h-3.5 w-3.5 text-primary-200/70 group-hover:text-primary-300/70 transition-colors" />
                      <span className="text-sm">
                        {time.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="h-10 w-px bg-bg-300/50 group-hover:bg-primary-200/30 transition-colors"></div>

                  <div className="text-right">
                    <div className="text-xs text-text-200/70">Actualizado</div>
                    <div className="text-sm text-text-100 font-medium">
                      hace 2 min
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros de período */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-100">
              Panel de Control
            </h2>
            <p className="text-text-200/70 mt-1">
              Visión general de tus finanzas y recomendaciones personalizadas
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={activePeriod} onValueChange={setActivePeriod}>
              <SelectTrigger className="w-[180px] bg-bg-300/30 backdrop-blur-sm border-bg-300/50 text-text-100">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent className="bg-bg-200/80 backdrop-blur-sm border-bg-300">
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="quarter">Este trimestre</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="border-bg-300/50 text-text-200 hover:text-primary-300"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Métricas principales - ANIMACIONES MEJORADAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Balance Total */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-500/30 group hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-text-200">
                    Balance Total
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-text-200 hover:text-emerald-400"
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-text-100 mb-2">
                      {showBalance
                        ? formatCurrency(dashboardData.metrics.totalBalance)
                        : "•••••••"}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400">
                        +5.2% vs mes pasado
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 group-hover:bg-emerald-500/30 transition-colors">
                    <DollarSign className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ingresos Mensuales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-500/30 group hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-text-200">
                  Ingresos Mensuales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-text-100 mb-2">
                      {formatCurrency(dashboardData.metrics.monthlyIncome)}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400">
                        +12% vs mes pasado
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 group-hover:bg-emerald-500/30 transition-colors">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Gastos Mensuales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-red-500/10 transition-all duration-300 hover:border-red-500/30 group hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-text-200">
                  Gastos Mensuales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-text-100 mb-2">
                      {formatCurrency(dashboardData.metrics.monthlyExpenses)}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-red-400">
                        -8% vs mes pasado
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 group-hover:bg-red-500/30 transition-colors">
                    <TrendingDown className="h-6 w-6 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tasa de Ahorro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-primary-100/10 transition-all duration-300 hover:border-primary-200/30 group hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-text-200">
                  Tasa de Ahorro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-text-100 mb-2">
                      {dashboardData.metrics.savingsRate}%
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary-200" />
                      <span className="text-sm text-primary-200">
                        +3.5% vs meta
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-primary-200/20 border border-primary-200/30 group-hover:bg-primary-200/30 transition-colors">
                    <PiggyBank className="h-6 w-6 text-primary-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Gráficos y Datos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Gráfico de Ingresos vs Gastos */}
          <Card
            className={`border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 ${
              isChartExpanded ? "lg:col-span-3" : "lg:col-span-2"
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-text-100 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-emerald-400" />
                    Ingresos vs Gastos
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Evolución mensual (últimos 6 meses)
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    <Sparkles className="h-3 w-3 mr-1" />
                    IA Predictiva
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-200 hover:text-emerald-400"
                    onClick={() => setIsChartExpanded(!isChartExpanded)}
                  >
                    {isChartExpanded ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Controles del gráfico de ingresos/gastos */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  {/* Selector de tipo de gráfico */}
                  <div className="flex items-center gap-1 bg-bg-300/30 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-3 h-8 text-xs transition-all duration-300 ${
                        incomeExpenseChartType === "bar"
                          ? "bg-emerald-500/20 text-emerald-400 shadow-md"
                          : "text-text-200 hover:text-emerald-400 hover:bg-emerald-500/10"
                      }`}
                      onClick={() => setIncomeExpenseChartType("bar")}
                    >
                      Barras
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-3 h-8 text-xs transition-all duration-300 ${
                        incomeExpenseChartType === "line"
                          ? "bg-emerald-500/20 text-emerald-400 shadow-md"
                          : "text-text-200 hover:text-emerald-400 hover:bg-emerald-500/10"
                      }`}
                      onClick={() => setIncomeExpenseChartType("line")}
                    >
                      Línea
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-3 h-8 text-xs transition-all duration-300 ${
                        incomeExpenseChartType === "area"
                          ? "bg-emerald-500/20 text-emerald-400 shadow-md"
                          : "text-text-200 hover:text-emerald-400 hover:bg-emerald-500/10"
                      }`}
                      onClick={() => setIncomeExpenseChartType("area")}
                    >
                      Área
                    </Button>
                  </div>

                  {/* Toggle para series */}
                  <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                          checked={showIncome}
                          onCheckedChange={setShowIncome}
                          className="data-[state=checked]:bg-emerald-500"
                        />
                        <span
                          className={`text-xs transition-colors ${
                            showIncome
                              ? "text-emerald-400 font-medium"
                              : "text-text-200"
                          }`}
                        >
                          Ingresos
                        </span>
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                          checked={showExpenses}
                          onCheckedChange={setShowExpenses}
                          className="data-[state=checked]:bg-red-500"
                        />
                        <span
                          className={`text-xs transition-colors ${
                            showExpenses
                              ? "text-red-400 font-medium"
                              : "text-text-200"
                          }`}
                        >
                          Gastos
                        </span>
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico de ingresos/gastos */}
              <div
                className={`relative ${
                  isChartExpanded ? "h-[400px]" : "h-[350px]"
                }`}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AnimatePresence mode="wait">
                    {incomeExpenseChartType === "line" ? (
                      <motion.div
                        key="line"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <LineChart
                          data={dashboardData.incomeData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          onMouseMove={(chartData: any) => {
                            if (chartData.activePayload) {
                              setIncomeExpenseHoverData(
                                chartData.activePayload[0]?.payload
                              );
                            }
                          }}
                          onMouseLeave={() => setIncomeExpenseHoverData(null)}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#454545"
                            opacity={0.3}
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#b3b3b3"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#b3b3b3"
                            fontSize={12}
                            tickFormatter={(value) => `$${value}`}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip content={<IncomeExpenseTooltip />} />
                          <Legend />

                          {showIncome && (
                            <Line
                              type="monotone"
                              dataKey="income"
                              stroke="#2E8B57"
                              strokeWidth={3}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              name="Ingresos"
                            />
                          )}

                          {showExpenses && (
                            <Line
                              type="monotone"
                              dataKey="expenses"
                              stroke="#EF4444"
                              strokeWidth={3}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              name="Gastos"
                            />
                          )}
                        </LineChart>
                      </motion.div>
                    ) : incomeExpenseChartType === "area" ? (
                      <motion.div
                        key="area"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AreaChart
                          data={dashboardData.incomeData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#454545"
                            opacity={0.3}
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#b3b3b3"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#b3b3b3"
                            fontSize={12}
                            tickFormatter={(value) => `$${value}`}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip content={<IncomeExpenseTooltip />} />
                          <Legend />

                          {showIncome && (
                            <Area
                              type="monotone"
                              dataKey="income"
                              stroke="#2E8B57"
                              fill="#2E8B57"
                              fillOpacity={0.2}
                              strokeWidth={2}
                              name="Ingresos"
                            />
                          )}

                          {showExpenses && (
                            <Area
                              type="monotone"
                              dataKey="expenses"
                              stroke="#EF4444"
                              fill="#EF4444"
                              fillOpacity={0.2}
                              strokeWidth={2}
                              name="Gastos"
                            />
                          )}
                        </AreaChart>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="bar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BarChart
                          data={dashboardData.incomeData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#454545"
                            opacity={0.3}
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#b3b3b3"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#b3b3b3"
                            fontSize={12}
                            tickFormatter={(value) => `$${value}`}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip content={<IncomeExpenseTooltip />} />
                          <Legend />

                          {showIncome && (
                            <Bar
                              dataKey="income"
                              fill="#2E8B57"
                              fillOpacity={0.8}
                              radius={[4, 4, 0, 0]}
                              name="Ingresos"
                            />
                          )}

                          {showExpenses && (
                            <Bar
                              dataKey="expenses"
                              fill="#EF4444"
                              fillOpacity={0.8}
                              radius={[4, 4, 0, 0]}
                              name="Gastos"
                            />
                          )}
                        </BarChart>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ResponsiveContainer>

                {/* Indicador de datos en hover */}
                {incomeExpenseHoverData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 bg-bg-200/90 backdrop-blur-md border border-bg-300/50 rounded-xl p-4 shadow-xl"
                  >
                    <div className="text-sm text-text-200 mb-2">
                      Mes: {incomeExpenseHoverData.month}
                    </div>
                    <div className="space-y-1">
                      {showIncome && (
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-sm">Ingresos:</span>
                          </div>
                          <span className="font-bold text-emerald-400">
                            {formatCurrency(incomeExpenseHoverData.income)}
                          </span>
                        </div>
                      )}
                      {showExpenses && (
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm">Gastos:</span>
                          </div>
                          <span className="font-bold text-red-400">
                            {formatCurrency(incomeExpenseHoverData.expenses)}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Versión móvil de los toggles */}
              <div className="flex md:hidden items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <Switch
                      checked={showIncome}
                      onCheckedChange={setShowIncome}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                    <span
                      className={`text-xs ${
                        showIncome
                          ? "text-emerald-400 font-medium"
                          : "text-text-200"
                      }`}
                    >
                      Ingresos
                    </span>
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <Switch
                      checked={showExpenses}
                      onCheckedChange={setShowExpenses}
                      className="data-[state=checked]:bg-red-500"
                    />
                    <span
                      className={`text-xs ${
                        showExpenses
                          ? "text-red-400 font-medium"
                          : "text-text-200"
                      }`}
                    >
                      Gastos
                    </span>
                  </Label>
                </div>
              </div>

              {/* Estadísticas adicionales para llenar espacio */}
              {!isChartExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                    <div className="text-sm text-text-200">Ingreso Total</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">
                      {formatCurrency(
                        dashboardData.incomeData.reduce(
                          (sum, item) => sum + item.income,
                          0
                        )
                      )}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
                    <div className="text-sm text-text-200">Gasto Total</div>
                    <div className="text-xl font-bold text-red-400 mt-1">
                      {formatCurrency(
                        dashboardData.incomeData.reduce(
                          (sum, item) => sum + item.expenses,
                          0
                        )
                      )}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary-200/10 to-primary-200/5 border border-primary-200/20">
                    <div className="text-sm text-text-200">Balance Neto</div>
                    <div className="text-xl font-bold text-primary-200 mt-1">
                      {formatCurrency(
                        dashboardData.incomeData.reduce(
                          (sum, item) => sum + item.income - item.expenses,
                          0
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gráfico de Gastos por Categoría (solo visible cuando no está expandido) - CORREGIDO */}
          {!isChartExpanded && (
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-text-100 flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary-200" />
                      Gastos por Categoría
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Distribución mensual
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-bg-300/30 rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`px-2 h-8 text-xs transition-all duration-300 ${
                          categoryChartType === "pie"
                            ? "bg-primary-200/20 text-primary-200 shadow-md"
                            : "text-text-200 hover:text-primary-200 hover:bg-primary-200/10"
                        }`}
                        onClick={() => setCategoryChartType("pie")}
                      >
                        <PieChart className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`px-2 h-8 text-xs transition-all duration-300 ${
                          categoryChartType === "bar"
                            ? "bg-primary-200/20 text-primary-200 shadow-md"
                            : "text-text-200 hover:text-primary-200 hover:bg-primary-200/10"
                        }`}
                        onClick={() => setCategoryChartType("bar")}
                      >
                        <BarChart3 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnimatePresence mode="wait">
                      {categoryChartType === "pie" ? (
                        <motion.div
                          key="pie"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <RechartsPieChart>
                            <Pie
                              data={dashboardData.categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="amount"
                              onMouseEnter={(_, index) =>
                                setActiveCategoryIndex(index)
                              }
                              onMouseLeave={() => setActiveCategoryIndex(null)}
                            >
                              {dashboardData.categoryData.map(
                                (entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    fillOpacity={
                                      activeCategoryIndex === null ||
                                      activeCategoryIndex === index
                                        ? 1
                                        : 0.5
                                    }
                                  />
                                )
                              )}
                            </Pie>
                            <Tooltip content={<CategoryTooltip />} />
                          </RechartsPieChart>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="bar"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <BarChart
                            data={dashboardData.categoryData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            onMouseEnter={(data: any) => {
                              if (data.activeTooltipIndex !== undefined) {
                                setActiveCategoryIndex(data.activeTooltipIndex);
                              }
                            }}
                            onMouseLeave={() => setActiveCategoryIndex(null)}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#454545"
                              opacity={0.3}
                            />
                            <XAxis
                              dataKey="category"
                              stroke="#b3b3b3"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis
                              stroke="#b3b3b3"
                              fontSize={12}
                              tickFormatter={(value) => `$${value}`}
                              tickLine={false}
                              axisLine={false}
                            />
                            <Tooltip content={<CategoryTooltip />} />
                            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                              {dashboardData.categoryData.map(
                                (entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    fillOpacity={
                                      activeCategoryIndex === null ||
                                      activeCategoryIndex === index
                                        ? 1
                                        : 0.5
                                    }
                                  />
                                )
                              )}
                            </Bar>
                          </BarChart>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </ResponsiveContainer>
                </div>

                {/* Lista de categorías */}
                <div className="space-y-3 mt-4">
                  {dashboardData.categoryData.map((cat) => (
                    <div
                      key={cat.category}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-bg-300/30 transition-colors"
                      onMouseEnter={() => {
                        const index = dashboardData.categoryData.findIndex(
                          (item) => item.category === cat.category
                        );
                        setActiveCategoryIndex(index);
                      }}
                      onMouseLeave={() => setActiveCategoryIndex(null)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-sm text-text-200">
                          {cat.category}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-text-100">
                        {formatCurrency(cat.amount)} ({cat.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Transacciones y Metas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transacciones Recientes - Tarjeta Mejorada */}
          <Card className="lg:col-span-2 border-0 bg-gradient-to-br from-bg-200/60 via-bg-200/40 to-bg-300/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-primary-100/5 hover:shadow-primary-100/10 transition-all duration-500 hover:scale-[1.005] group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary-200/20 to-primary-300/10 border border-primary-200/20">
                    <FileText className="h-6 w-6 text-primary-200" />
                  </div>
                  <div>
                    <CardTitle className="text-text-100 text-xl font-bold bg-gradient-to-r from-text-100 to-text-200 bg-clip-text text-transparent">
                      Transacciones Recientes
                    </CardTitle>
                    <CardDescription className="text-text-200/80 flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Últimas 7 transacciones • Actualizado en tiempo real
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-text-200 hover:text-primary-200 hover:bg-primary-200/10 rounded-lg transition-all duration-300 group/btn"
                >
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                    Ver todas
                  </span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                {[
                  ...dashboardData.recentTransactions,
                  // Transacciones adicionales añadidas
                  {
                    id: 6,
                    description: "Freelance - Diseño Web",
                    amount: 450.0,
                    category: "Trabajo Freelance",
                    date: "2024-01-10",
                    account: "Principal",
                    type: "income" as const,
                  },
                  {
                    id: 7,
                    description: "Gimnasio Mensual",
                    amount: -35.0,
                    category: "Salud y Bienestar",
                    date: "2024-01-09",
                    account: "Principal",
                    type: "expense" as const,
                  },
                ].map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-lg group/transaction">
                      {/* Icono con efecto */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 rounded-xl blur-md transition-all duration-300 ${
                              transaction.type === "income"
                                ? "bg-emerald-500/30 group-hover/transaction:bg-emerald-500/50"
                                : "bg-red-500/30 group-hover/transaction:bg-red-500/50"
                            }`}
                          />
                          <div
                            className={`relative p-3 rounded-xl transition-all duration-300 ${
                              transaction.type === "income"
                                ? "bg-emerald-500/20 text-emerald-400 group-hover/transaction:bg-emerald-500/30"
                                : "bg-red-500/20 text-red-400 group-hover/transaction:bg-red-500/30"
                            }`}
                          >
                            {getCategoryIcon(transaction.category)}
                          </div>
                        </div>

                        {/* Información */}
                        <div>
                          <div className="font-semibold text-text-100 group-hover/transaction:text-white transition-colors">
                            {transaction.description}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-text-200/90">
                              {transaction.category}
                            </span>
                            <span className="text-xs text-text-200/70 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {transaction.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Monto con animación */}
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className={`flex flex-col items-end ${
                          transaction.type === "income"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        <span className="text-lg font-bold flex items-center gap-1">
                          {transaction.type === "income" ? (
                            <>
                              <ArrowUp className="h-4 w-4" />
                              <span className="text-emerald-300">
                                +{formatCurrency(Math.abs(transaction.amount))}
                              </span>
                            </>
                          ) : (
                            <>
                              <ArrowDown className="h-4 w-4" />
                              <span className="text-red-300">
                                -{formatCurrency(Math.abs(transaction.amount))}
                              </span>
                            </>
                          )}
                        </span>
                        <span className="text-xs text-text-200/60 mt-1">
                          {transaction.type === "income" ? "Ingreso" : "Gasto"}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Metas de Ahorro - Tarjeta Mejorada */}
          <Card className="border-0 bg-gradient-to-br from-bg-200/60 via-bg-200/40 to-primary-100/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-primary-100/5 hover:shadow-primary-100/10 transition-all duration-500 hover:scale-[1.005] group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200/10 via-transparent to-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 border border-emerald-500/20">
                    <Target className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-text-100 text-xl font-bold bg-gradient-to-r from-text-100 to-emerald-400 bg-clip-text text-transparent">
                      Metas de Ahorro
                    </CardTitle>
                    <CardDescription className="text-text-200/80 flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Progreso en tiempo real
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 rounded-lg transition-all duration-300 group/btn"
                >
                  <PlusCircle className="h-4 w-4 mr-2 group-hover/btn:rotate-90 transition-transform duration-300" />
                  Nueva meta
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-6">
                {dashboardData.savingsGoals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative p-4 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group/goal">
                      {/* Header de la meta */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-text-100 group-hover/goal:text-white transition-colors">
                              {goal.name}
                            </h4>
                            {goal.progress >= 100 && (
                              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 animate-pulse">
                                ¡Completado!
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-text-200/80 flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Vence: {goal.deadline}
                          </div>
                        </div>

                        {/* Porcentaje */}
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold ${
                              goal.progress >= 50
                                ? "text-emerald-400"
                                : "text-primary-200"
                            }`}
                          >
                            {goal.progress}%
                          </div>
                          <div className="text-xs text-text-200/60">
                            Completado
                          </div>
                        </div>
                      </div>

                      {/* Barra de progreso mejorada */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-100">
                            {formatCurrency(goal.current)}
                          </span>
                          <span className="text-text-200">
                            {formatCurrency(goal.target)}
                          </span>
                        </div>

                        <div className="relative h-3 rounded-full bg-bg-300/30 overflow-hidden">
                          {/* Fondo animado */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

                          {/* Barra de progreso principal */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.progress}%` }}
                            transition={{
                              duration: 1,
                              delay: index * 0.2,
                              type: "spring",
                            }}
                            className={`absolute h-full rounded-full ${
                              goal.progress >= 100
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                : goal.progress >= 75
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-300"
                                : goal.progress >= 50
                                ? "bg-gradient-to-r from-primary-200 to-emerald-400"
                                : "bg-gradient-to-r from-primary-200 to-primary-300"
                            } shadow-lg shadow-emerald-500/20`}
                          >
                            {/* Efecto brillo */}
                            <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                          </motion.div>

                          {/* Indicador de progreso */}
                          {goal.progress > 0 && goal.progress < 100 && (
                            <motion.div
                              animate={{
                                x: `${goal.progress}%`,
                                boxShadow: [
                                  "0 0 0px rgba(34, 197, 94, 0)",
                                  "0 0 10px rgba(34, 197, 94, 0.5)",
                                  "0 0 0px rgba(34, 197, 94, 0)",
                                ],
                              }}
                              transition={{
                                x: { duration: 1, delay: index * 0.2 },
                                boxShadow: { duration: 2, repeat: Infinity },
                              }}
                              className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-full -ml-0.5"
                            />
                          )}
                        </div>

                        {/* Indicadores de hitos */}
                        <div className="flex justify-between px-1">
                          {[25, 50, 75, 100].map((milestone) => (
                            <div key={milestone} className="relative">
                              <div
                                className={`h-2 w-0.5 rounded-full ${
                                  goal.progress >= milestone
                                    ? "bg-emerald-400"
                                    : "bg-bg-300/50"
                                }`}
                              />
                              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] text-text-200/60">
                                {milestone}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Estado y tiempo restante */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                        <div className="text-xs text-text-200/70">
                          {goal.progress >= 100 ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Meta alcanzada
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {Math.ceil(
                                (goal.target - goal.current) /
                                  (goal.target / 30)
                              )}{" "}
                              días estimados
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 px-2 text-primary-200 hover:text-primary-100 hover:bg-primary-200/10"
                        >
                          Contribuir
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recomendaciones IA y Acciones Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Recomendaciones de IA - Diseño Mejorado */}
          <Card className="lg:col-span-2 border-0 bg-gradient-to-br from-bg-200/60 via-bg-200/40 to-primary-100/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-primary-100/5 hover:shadow-primary-100/10 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200/10 via-transparent to-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="relative p-2 rounded-xl bg-gradient-to-br from-primary-200/20 to-emerald-400/10 border border-primary-200/20">
                      <Brain className="h-6 w-6 text-primary-200" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-text-100 text-xl font-bold bg-gradient-to-r from-text-100 to-primary-200 bg-clip-text text-transparent">
                      Asistente Financiero IA
                    </CardTitle>
                    <CardDescription className="text-text-200/80 flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Análisis predictivo en tiempo real • Basado en tus
                      patrones
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 mr-1" />
                    95% precisión
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-text-200 hover:text-primary-200 hover:bg-primary-200/10 rounded-lg"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                {[
                  ...dashboardData.mlRecommendations,
                  // Nueva recomendación añadida
                  {
                    id: 4,
                    type: "investment" as const,
                    message:
                      "Sugerencia: Invertir $200 en fondos indexados podría generar un 7% anual",
                    confidence: 0.89,
                  },
                ].map((rec, index) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    whileHover={{ x: 5, scale: 1.01 }}
                    className="relative group/recommendation"
                  >
                    {/* Fondo luminoso en hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-200/5 via-transparent to-emerald-500/5 rounded-xl opacity-0 group-hover/recommendation:opacity-100 transition-opacity duration-300" />

                    <div className="relative p-5 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-white/5 group-hover/recommendation:border-primary-200/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-200/5">
                      <div className="flex items-start gap-4">
                        {/* Icono con efecto de tipo */}
                        <div className="relative">
                          <div
                            className={`absolute inset-0 rounded-xl blur-md transition-all duration-300 ${
                              rec.type === "savings"
                                ? "bg-emerald-500/30 group-hover/recommendation:bg-emerald-500/40"
                                : rec.type === "categorization"
                                ? "bg-blue-500/30 group-hover/recommendation:bg-blue-500/40"
                                : rec.type === "forecast"
                                ? "bg-purple-500/30 group-hover/recommendation:bg-purple-500/40"
                                : "bg-amber-500/30 group-hover/recommendation:bg-amber-500/40"
                            }`}
                          />
                          <div
                            className={`relative p-3 rounded-xl transition-all duration-300 ${
                              rec.type === "savings"
                                ? "bg-emerald-500/20 text-emerald-400 group-hover/recommendation:bg-emerald-500/30"
                                : rec.type === "categorization"
                                ? "bg-blue-500/20 text-blue-400 group-hover/recommendation:bg-blue-500/30"
                                : rec.type === "forecast"
                                ? "bg-purple-500/20 text-purple-400 group-hover/recommendation:bg-purple-500/30"
                                : "bg-amber-500/20 text-amber-400 group-hover/recommendation:bg-amber-500/30"
                            }`}
                          >
                            {rec.type === "savings" ? (
                              <PiggyBank className="h-5 w-5" />
                            ) : rec.type === "categorization" ? (
                              <FileText className="h-5 w-5" />
                            ) : rec.type === "forecast" ? (
                              <TrendingUp className="h-5 w-5" />
                            ) : (
                              <DollarSign className="h-5 w-5" />
                            )}
                          </div>
                        </div>

                        {/* Contenido de la recomendación */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-100 group-hover/recommendation:text-white transition-colors font-medium">
                            {rec.message}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-white/10">
                            {/* Badge de tipo */}
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`text-xs px-3 py-1 rounded-full backdrop-blur-sm ${
                                  rec.type === "savings"
                                    ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                                    : rec.type === "categorization"
                                    ? "border-blue-500/30 text-blue-400 bg-blue-500/10"
                                    : rec.type === "forecast"
                                    ? "border-purple-500/30 text-purple-400 bg-purple-500/10"
                                    : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                                }`}
                              >
                                {rec.type === "savings"
                                  ? "Optimización"
                                  : rec.type === "categorization"
                                  ? "Categorización"
                                  : rec.type === "forecast"
                                  ? "Pronóstico"
                                  : "Inversión"}
                              </Badge>

                              {/* Indicador de confianza */}
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-16 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${rec.confidence * 100}%`,
                                    }}
                                    transition={{
                                      duration: 1,
                                      delay: index * 0.2,
                                    }}
                                    className={`h-full rounded-full ${
                                      rec.confidence >= 0.9
                                        ? "bg-emerald-500"
                                        : rec.confidence >= 0.8
                                        ? "bg-primary-200"
                                        : "bg-amber-500"
                                    }`}
                                  />
                                </div>
                                <span className="text-xs font-medium text-text-200/80">
                                  {(rec.confidence * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>

                            {/* Botón de acción */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`text-xs h-7 px-3 rounded-lg transition-all duration-300 ${
                                rec.type === "savings"
                                  ? "text-emerald-400 hover:bg-emerald-500/20"
                                  : rec.type === "categorization"
                                  ? "text-blue-400 hover:bg-blue-500/20"
                                  : rec.type === "forecast"
                                  ? "text-purple-400 hover:bg-purple-500/20"
                                  : "text-amber-400 hover:bg-amber-500/20"
                              }`}
                            >
                              <ChevronRight className="h-3 w-3 mr-1" />
                              Aplicar
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Indicador de prioridad */}
                      <div className="absolute top-4 right-4">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            rec.confidence >= 0.9
                              ? "bg-emerald-500 animate-pulse"
                              : rec.confidence >= 0.8
                              ? "bg-primary-200"
                              : "bg-amber-500"
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Estadísticas de IA */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">
                    <div className="text-xs text-text-200/70">
                      Recomendaciones activas
                    </div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">
                      4
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-r from-primary-200/10 to-transparent border border-primary-200/20">
                    <div className="text-xs text-text-200/70">
                      Precisión promedio
                    </div>
                    <div className="text-lg font-bold text-primary-200 mt-1">
                      89%
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20">
                    <div className="text-xs text-text-200/70">
                      Tiempo análisis
                    </div>
                    <div className="text-lg font-bold text-purple-400 mt-1">
                      0.3s
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <div className="flex items-center justify-between w-full text-xs text-text-200/60">
                <div className="flex items-center gap-2">
                  <Brain className="h-3 w-3" />
                  <span>IA entrenada con 10M+ transacciones</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7 text-primary-200 hover:text-primary-100 hover:bg-primary-200/10"
                >
                  Ver todas las recomendaciones
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Acciones Rápidas - Diseño Mejorado con 6 Cuadros (2x3) */}
          <Card className="border-0 bg-gradient-to-br from-bg-200/60 via-bg-200/40 to-primary-100/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-primary-100/5 hover:shadow-primary-100/10 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200/10 via-transparent to-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 border border-emerald-500/20">
                    <Zap className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-text-100 text-xl font-bold bg-gradient-to-r from-text-100 to-emerald-400 bg-clip-text text-transparent">
                      Acciones Rápidas
                    </CardTitle>
                    <CardDescription className="text-text-200/80 flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      6 acciones frecuentes en un clic
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {/* Fila 1: Botón 1 y 2 */}
                {/* Agregar Ingreso */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/action"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 rounded-2xl blur-xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-300" />
                  <Button className="relative w-full h-full aspect-square flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 border border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/30 transition-all duration-300 shadow-lg shadow-emerald-500/10 group-hover/action:shadow-emerald-500/20">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 mb-3 group-hover/action:scale-110 transition-transform duration-300">
                      <PlusCircle className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-emerald-400 font-semibold text-sm">
                      Agregar
                    </span>
                    <span className="text-emerald-300 font-bold">Ingreso</span>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300">
                      <ArrowUp className="h-3 w-3 text-emerald-300" />
                    </div>
                  </Button>
                </motion.div>

                {/* Registrar Gasto */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/action"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-400/10 rounded-2xl blur-xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-300" />
                  <Button className="relative w-full h-full aspect-square flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-400/10 border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/30 transition-all duration-300 shadow-lg shadow-red-500/10 group-hover/action:shadow-red-500/20">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-400 mb-3 group-hover/action:scale-110 transition-transform duration-300">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-red-400 font-semibold text-sm">
                      Registrar
                    </span>
                    <span className="text-red-300 font-bold">Gasto</span>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300">
                      <ArrowDown className="h-3 w-3 text-red-300" />
                    </div>
                  </Button>
                </motion.div>

                {/* Fila 2: Botón 3 y 4 */}
                {/* Crear Meta */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/action"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-200/20 to-primary-300/10 rounded-2xl blur-xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-300" />
                  <Button className="relative w-full h-full aspect-square flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-primary-200/20 to-primary-300/10 border border-primary-200/30 hover:border-primary-200/50 hover:bg-primary-200/30 transition-all duration-300 shadow-lg shadow-primary-200/10 group-hover/action:shadow-primary-200/20">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary-200 to-primary-300 mb-3 group-hover/action:scale-110 transition-transform duration-300">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-primary-200 font-semibold text-sm">
                      Crear
                    </span>
                    <span className="text-primary-100 font-bold">Meta</span>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300">
                      <Target className="h-3 w-3 text-primary-100" />
                    </div>
                  </Button>
                </motion.div>

                {/* Ver Reporte */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/action"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-400/10 rounded-2xl blur-xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-300" />
                  <Button className="relative w-full h-full aspect-square flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-400/10 border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/30 transition-all duration-300 shadow-lg shadow-purple-500/10 group-hover/action:shadow-purple-500/20">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-400 mb-3 group-hover/action:scale-110 transition-transform duration-300">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-purple-400 font-semibold text-sm">
                      Ver
                    </span>
                    <span className="text-purple-300 font-bold">Reporte</span>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300">
                      <BarChart3 className="h-3 w-3 text-purple-300" />
                    </div>
                  </Button>
                </motion.div>

                {/* Fila 3: Botón 5 y 6 - NUEVOS */}
                {/* Realizar Transacción */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/action"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-400/10 rounded-2xl blur-xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-300" />
                  <Button className="relative w-full h-full aspect-square flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 border border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/30 transition-all duration-300 shadow-lg shadow-blue-500/10 group-hover/action:shadow-blue-500/20">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 mb-3 group-hover/action:scale-110 transition-transform duration-300">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-blue-400 font-semibold text-sm">
                      Realizar
                    </span>
                    <span className="text-blue-300 font-bold">Transacción</span>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300">
                      <DollarSign className="h-3 w-3 text-blue-300" />
                    </div>
                  </Button>
                </motion.div>

                {/* Crear Categoría */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/action"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-400/10 rounded-2xl blur-xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-300" />
                  <Button className="relative w-full h-full aspect-square flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 border border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/30 transition-all duration-300 shadow-lg shadow-amber-500/10 group-hover/action:shadow-amber-500/20">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 mb-3 group-hover/action:scale-110 transition-transform duration-300">
                      <FolderPlus className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-amber-400 font-semibold text-sm">
                      Crear
                    </span>
                    <span className="text-amber-300 font-bold">Categoría</span>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300">
                      <FolderPlus className="h-3 w-3 text-amber-300" />
                    </div>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer del Dashboard */}
        <div className="mt-8 pt-6 border-t border-bg-300/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
            <div className="text-text-200/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>
                  Sistema en tiempo real • Última actualización:{" "}
                  {time.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar datos
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/50 text-text-200 hover:text-primary-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Personalizar dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
