// src/components/analytics/AnalyticsDashboard.tsx
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Target,
  BarChart3,
  LineChart,
  PieChart,
  Brain,
  Zap,
  AlertTriangle,
  Clock,
  Calendar,
  Filter,
  RefreshCw,
  Download,
  Share2,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Settings,
  MoreVertical,
  Search,
  Bell,
  Award,
  Trophy,
  Crown,
  Sparkles,
  Lightbulb,
  Rocket,
  Shield,
  Lock,
  Unlock,
  Users,
  Globe,
  Smartphone,
  CreditCard,
  Wallet,
  Banknote,
  Receipt,
  Calculator,
  ChartBar,
  ChartLine,
  ChartPie,
  ChartArea,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";

// Importar componentes hijos
import FinancialTrendsChart from "./FinancialTrendsChart";
import AIForecastPanel from "./AIForecastPanel";
import PredictiveAlerts from "./PredictiveAlerts";
import FinancialHealthScore from "./FinancialHealthScore";
import PatternRecognition from "./PatternRecognition";
import AnalyticsInsights from "./AnalyticsInsights";
import CategoryAnalysis from "./CategoryAnalysis";
import ScenarioSimulator from "./ScenarioSimulator";
import BenchmarkComparison from "./BenchmarkComparison";

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [viewMode, setViewMode] = useState("standard");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showAllMetrics, setShowAllMetrics] = useState(true);
  const [dashboardMetrics, setDashboardMetrics] = useState<any>(null);
  const [quickActions, setQuickActions] = useState<any[]>([]);
  const [recentInsights, setRecentInsights] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Métricas clave del dashboard
  const keyMetrics = {
    monthlyIncome: 4200,
    monthlyExpenses: 3350,
    monthlySavings: 850,
    savingsRate: 20.2,
    financialHealth: 78,
    expenseToIncome: 79.8,
    incomeTrend: 12,
    expenseTrend: -8,
    savingsTrend: 5.8,
    netWorth: 28500,
    debtRatio: 15,
    investmentGrowth: 8.5,
  };

  // Inicializar datos
  useEffect(() => {
    // Métricas del dashboard
    setDashboardMetrics(keyMetrics);

    // Acciones rápidas - ACTUALIZADO CON TU PALETA
    setQuickActions([
      {
        id: "action-1",
        title: "Optimizar suscripciones",
        description: "Ahorra $45/mes cancelando 3 servicios",
        icon: Zap,
        color: "text-primary-200", // Usando tu paleta
        bgColor: "bg-primary-200/10", // Usando tu paleta
        priority: "high",
      },
      {
        id: "action-2",
        title: "Ajustar presupuesto comida",
        description: "Reduce $90/mes con compra inteligente",
        icon: TrendingDown,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        priority: "medium",
      },
      {
        id: "action-3",
        title: "Revisar meta 'Viaje'",
        description: "Se retrasará 2 meses al ritmo actual",
        icon: Target,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        priority: "critical",
      },
      {
        id: "action-4",
        title: "Analizar gastos emocionales",
        description: "40% más los miércoles por la tarde",
        icon: Brain,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        priority: "medium",
      },
    ]);

    // Insights recientes
    setRecentInsights([
      {
        id: "insight-1",
        title: "Patrón de ingreso detectado",
        description: "Marzo y septiembre tienen ingresos 25% superiores",
        type: "income",
        icon: TrendingUp,
        color: "text-green-400",
        timestamp: "Hace 2 horas",
      },
      {
        id: "insight-2",
        title: "Alerta de presupuesto",
        description:
          "Entretenimiento alcanzará 120% del presupuesto en 15 días",
        type: "alert",
        icon: AlertTriangle,
        color: "text-red-400",
        timestamp: "Hace 1 día",
      },
      {
        id: "insight-3",
        title: "Oportunidad de ahorro",
        description: "Podrías ahorrar $60/mes optimizando transporte",
        type: "saving",
        icon: PiggyBank,
        color: "text-primary-100", // Usando tu paleta
        timestamp: "Hace 2 días",
      },
    ]);
  }, []);

  // Formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Formatear porcentaje
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Obtener color de tendencia
  const getTrendColor = (trend: number) => {
    return trend > 0 ? "text-green-400" : "text-red-400";
  };

  // Obtener icono de tendencia
  const getTrendIcon = (trend: number) => {
    return trend > 0 ? TrendingUp : TrendingDown;
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Componente de métrica KPI
  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    color,
    format = "currency",
  }: any) => (
    <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-bg-300/60 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm text-text-200">{title}</span>
            </div>
            <div className="text-2xl font-bold text-text-100 mt-2">
              {format === "currency"
                ? formatCurrency(value)
                : format === "percent"
                ? formatPercent(value)
                : value}
            </div>
            {change !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {change > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                )}
                <span className={`text-xs ${getTrendColor(change)}`}>
                  {change > 0 ? "+" : ""}
                  {change}%
                </span>
                <span className="text-xs text-text-200 ml-1">
                  vs mes anterior
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${isFullscreen ? "p-6" : ""}`}>
      {/* Header del Dashboard */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-text-100 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/20 border border-primary-100/30">
                  <BarChart3 className="h-6 w-6 text-primary-200" />{" "}
                  {/* Usando tu paleta */}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span>Dashboard de Analítica Financiera</span>
                    <Badge className="bg-gradient-to-r from-primary-100 to-primary-200 text-white">
                      {" "}
                      {/* Usando tu paleta */}
                      <Brain className="h-3 w-3 mr-1" />
                      IA en Tiempo Real
                    </Badge>
                  </div>
                  <CardDescription className="text-text-200 mt-1">
                    Análisis predictivo, tendencias y recomendaciones
                    inteligentes
                  </CardDescription>
                </div>
              </CardTitle>
            </div>

            <div className="flex items-center gap-4">
              {/* Contadores */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {formatCurrency(keyMetrics.monthlySavings)}
                  </div>
                  <div className="text-xs text-text-200">Ahorro mensual</div>
                </div>
                <div className="h-8 w-px bg-bg-300/50"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-200">
                    {" "}
                    {/* Usando tu paleta */}
                    {formatPercent(keyMetrics.savingsRate)}
                  </div>
                  <div className="text-xs text-text-200">Tasa de ahorro</div>
                </div>
                <div className="h-8 w-px bg-bg-300/50"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-100">
                    {" "}
                    {/* Usando tu paleta */}
                    {keyMetrics.financialHealth}/100
                  </div>
                  <div className="text-xs text-text-200">Salud financiera</div>
                </div>
              </div>

              {/* Acciones del dashboard */}
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10" // Usando tu paleta
                        onClick={toggleFullscreen}
                      >
                        {isFullscreen ? (
                          <Minimize2 className="h-4 w-4" />
                        ) : (
                          <Maximize2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isFullscreen
                          ? "Salir de pantalla completa"
                          : "Pantalla completa"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10" // Usando tu paleta
                        onClick={() => setAutoRefresh(!autoRefresh)}
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${
                            autoRefresh ? "animate-spin" : ""
                          }`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {autoRefresh
                          ? "Auto-refresh activado"
                          : "Auto-refresh desactivado"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10" // Usando tu paleta
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-bg-200 border-bg-300/50">
                    <DropdownMenuItem className="text-text-200">
                      <Eye className="h-4 w-4 mr-2" />
                      Mostrar todas las métricas
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-text-200">
                      <Filter className="h-4 w-4 mr-2" />
                      Personalizar widgets
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-text-200">
                      <Bell className="h-4 w-4 mr-2" />
                      Configurar alertas
                    </DropdownMenuItem>
                    <Separator className="my-1 bg-bg-300/30" />
                    <DropdownMenuItem className="text-primary-200">
                      {" "}
                      {/* Usando tu paleta */}
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartir dashboard
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Navegación por tabs */}
          <div className="mt-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 lg:grid-cols-8 bg-bg-300/30 border border-bg-300/50 p-1 rounded-xl">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-lg" // Usando tu paleta
                >
                  <BarChart3 className="h-3 w-3 mr-2" />
                  <span className="hidden sm:inline">Resumen</span>
                </TabsTrigger>
                <TabsTrigger
                  value="trends"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-lg" // Usando tu paleta
                >
                  <LineChart className="h-3 w-3 mr-2" />
                  <span className="hidden sm:inline">Tendencias</span>
                </TabsTrigger>
                <TabsTrigger
                  value="categories"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-lg" // Usando tu paleta
                >
                  <PieChart className="h-3 w-3 mr-2" />
                  <span className="hidden sm:inline">Categorías</span>
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-lg" // Usando tu paleta
                >
                  <Brain className="h-3 w-3 mr-2" />
                  <span className="hidden sm:inline">Insights</span>
                </TabsTrigger>
                <TabsTrigger
                  value="forecast"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-lg" // Usando tu paleta
                >
                  <Zap className="h-3 w-3 mr-2" />
                  <span className="hidden sm:inline">Pronóstico</span>
                </TabsTrigger>
                <TabsTrigger
                  value="scenarios"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-lg" // Usando tu paleta
                >
                  <Calculator className="h-3 w-3 mr-2" />
                  <span className="hidden sm:inline">Simulador</span>
                </TabsTrigger>
                <TabsTrigger
                  value="benchmarks"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-lg" // Usando tu paleta
                >
                  <Users className="h-3 w-3 mr-2" />
                  <span className="hidden sm:inline">Comparativas</span>
                </TabsTrigger>
                <TabsTrigger
                  value="patterns"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-lg" // Usando tu paleta
                >
                  <Sparkles className="h-3 w-3 mr-2" />
                  <span className="hidden sm:inline">Patrones</span>
                </TabsTrigger>
              </TabsList>

              {/* Filtros rápidos */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-4">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32 bg-bg-300/30 border-bg-300/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Última semana</SelectItem>
                      <SelectItem value="month">Último mes</SelectItem>
                      <SelectItem value="quarter">Último trimestre</SelectItem>
                      <SelectItem value="year">Último año</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger className="w-32 bg-bg-300/30 border-bg-300/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Vista estándar</SelectItem>
                      <SelectItem value="detailed">Vista detallada</SelectItem>
                      <SelectItem value="minimal">Vista mínima</SelectItem>
                      <SelectItem value="expert">Vista experto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="auto-refresh"
                      checked={autoRefresh}
                      onCheckedChange={setAutoRefresh}
                      className="data-[state=checked]:bg-primary-100" // Usando tu paleta
                    />
                    <Label
                      htmlFor="auto-refresh"
                      className="text-sm text-text-200 cursor-pointer"
                    >
                      <RefreshCw className="h-3 w-3 mr-1 inline" />
                      Auto-refresh
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="show-all-metrics"
                      checked={showAllMetrics}
                      onCheckedChange={setShowAllMetrics}
                      className="data-[state=checked]:bg-primary-100" // Usando tu paleta
                    />
                    <Label
                      htmlFor="show-all-metrics"
                      className="text-sm text-text-200 cursor-pointer"
                    >
                      <Eye className="h-3 w-3 mr-1 inline" />
                      Todas las métricas
                    </Label>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </CardHeader>
      </Card>

      {/* Contenido del Dashboard según tab activo */}
      <Tabs value={activeTab} className="w-full">
        {/* Tab: Overview */}
        <TabsContent value="overview" className="space-y-6 mt-0">
          {/* Métricas KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Ingresos Mensuales"
              value={keyMetrics.monthlyIncome}
              change={keyMetrics.incomeTrend}
              icon={DollarSign}
              color="text-green-400"
            />
            <MetricCard
              title="Gastos Mensuales"
              value={keyMetrics.monthlyExpenses}
              change={keyMetrics.expenseTrend}
              icon={Receipt}
              color="text-red-400"
            />
            <MetricCard
              title="Ahorro Neto"
              value={keyMetrics.monthlySavings}
              change={keyMetrics.savingsTrend}
              icon={PiggyBank}
              color="text-primary-100" // Usando tu paleta
            />
            <MetricCard
              title="Tasa de Ahorro"
              value={keyMetrics.savingsRate}
              change={keyMetrics.savingsTrend}
              icon={Percent}
              color="text-primary-200" // Usando tu paleta
              format="percent"
            />
          </div>

          {/* Gráficos principales y métricas secundarias */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de tendencias */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-primary-200" />{" "}
                  {/* Usando tu paleta */}
                  Tendencias Financieras
                </CardTitle>
                <CardDescription className="text-text-200">
                  Evolución de ingresos, gastos y ahorro en los últimos 12 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <FinancialTrendsChart />
                </div>
              </CardContent>
            </Card>

            {/* Salud financiera y métricas clave */}
            <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary-200" />{" "}
                  {/* Usando tu paleta */}
                  Salud Financiera
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-100">
                      {" "}
                      {/* Usando tu paleta */}
                      {keyMetrics.financialHealth}
                      <span className="text-lg text-text-200">/100</span>
                    </div>
                    <div className="text-sm text-text-200 mt-1">
                      Puntuación general
                    </div>
                  </div>
                  <Progress
                    value={keyMetrics.financialHealth}
                    className="h-2 bg-bg-300/50"
                    indicatorClassName="bg-gradient-to-r from-primary-100 to-primary-200" // Usando tu paleta
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 rounded-lg bg-bg-300/20">
                      <div className="text-xs text-text-200">
                        Ratio Gasto/Ingreso
                      </div>
                      <div className="text-lg font-bold text-text-100">
                        {formatPercent(keyMetrics.expenseToIncome)}
                      </div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-bg-300/20">
                      <div className="text-xs text-text-200">Ratio Deuda</div>
                      <div className="text-lg font-bold text-text-100">
                        {formatPercent(keyMetrics.debtRatio)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Segunda fila: Insights y acciones */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Acciones rápidas recomendadas */}
            <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary-200" />{" "}
                  {/* Usando tu paleta */}
                  Acciones Rápidas
                </CardTitle>
                <CardDescription className="text-text-200">
                  Recomendaciones prioritarias de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <div
                        key={action.id}
                        className="p-3 rounded-lg bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-bg-300/60 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${action.bgColor}`}>
                            <Icon className={`h-4 w-4 ${action.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-text-100">
                                {action.title}
                              </h4>
                              <Badge
                                className={
                                  action.priority === "critical"
                                    ? "bg-red-500/20 text-red-400"
                                    : action.priority === "high"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-blue-500/20 text-blue-400"
                                }
                              >
                                {action.priority === "critical"
                                  ? "Crítico"
                                  : action.priority === "high"
                                  ? "Alto"
                                  : "Medio"}
                              </Badge>
                            </div>
                            <p className="text-xs text-text-200 mt-1">
                              {action.description}
                            </p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="mt-2 text-primary-200 hover:text-primary-300 hover:bg-primary-100/10 text-xs" // Usando tu paleta
                            >
                              Tomar acción{" "}
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Insights recientes */}
            <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  Insights Recientes
                </CardTitle>
                <CardDescription className="text-text-200">
                  Descubrimientos de IA en tus finanzas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentInsights.map((insight) => {
                    const Icon = insight.icon;
                    return (
                      <div
                        key={insight.id}
                        className="p-3 rounded-lg bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/40"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg ${insight.color} bg-opacity-20`}
                          >
                            <Icon className={`h-4 w-4 ${insight.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-text-100">
                              {insight.title}
                            </h4>
                            <p className="text-xs text-text-200 mt-1">
                              {insight.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge
                                variant="outline"
                                className="border-bg-300/50 text-text-200 text-xs"
                              >
                                {insight.type === "income"
                                  ? "Ingresos"
                                  : insight.type === "alert"
                                  ? "Alerta"
                                  : "Ahorro"}
                              </Badge>
                              <span className="text-xs text-text-200/70">
                                {insight.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Pronóstico rápido */}
            <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary-200" />{" "}
                  {/* Usando tu paleta */}
                  Pronóstico del Mes
                </CardTitle>
                <CardDescription className="text-text-200">
                  Proyecciones basadas en IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-200">Próximo mes:</span>
                    <span className="text-sm font-medium text-text-100">
                      {formatCurrency(4350)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-200">Variación:</span>
                    <span className="text-sm font-medium text-green-400">
                      +3.5%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-200">
                      Ahorro proyectado:
                    </span>
                    <span className="text-sm font-medium text-primary-100">
                      {" "}
                      {/* Usando tu paleta */}
                      {formatCurrency(900)}
                    </span>
                  </div>
                  <Separator className="bg-bg-300/30" />
                  <div className="text-center">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white" // Usando tu paleta
                    >
                      <Zap className="h-3 w-3 mr-2" />
                      Ver pronóstico completo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tercera fila: Componentes completos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alertas predictivas */}
            <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  Alertas Predictivas
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <PredictiveAlerts />
              </CardContent>
            </Card>

            {/* Comparativa con benchmarks */}
            <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  Comparativa
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <BenchmarkComparison />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Trends */}
        <TabsContent value="trends" className="mt-0">
          <FinancialTrendsChart />
        </TabsContent>

        {/* Tab: Categories */}
        <TabsContent value="categories" className="mt-0">
          <CategoryAnalysis />
        </TabsContent>

        {/* Tab: Insights */}
        <TabsContent value="insights" className="mt-0">
          <AnalyticsInsights />
        </TabsContent>

        {/* Tab: Forecast */}
        <TabsContent value="forecast" className="mt-0">
          <AIForecastPanel />
        </TabsContent>

        {/* Tab: Scenarios */}
        <TabsContent value="scenarios" className="mt-0">
          <ScenarioSimulator />
        </TabsContent>

        {/* Tab: Benchmarks */}
        <TabsContent value="benchmarks" className="mt-0">
          <BenchmarkComparison />
        </TabsContent>

        {/* Tab: Patterns */}
        <TabsContent value="patterns" className="mt-0">
          <PatternRecognition />
        </TabsContent>
      </Tabs>

      {/* Footer del Dashboard */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40">
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
          <div className="text-sm text-text-200/70">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary-200 rounded-full animate-pulse"></div>{" "}
              {/* Usando tu paleta */}
              <span>
                IA analizando en tiempo real • Última actualización:{" "}
                {new Date().toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10" // Usando tu paleta
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-primary-200/30 text-primary-200 hover:bg-primary-200/10" // Usando tu paleta
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartir Análisis
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white" // Usando tu paleta
              onClick={() => setActiveTab("overview")}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar Todo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// Componente Percent (necesario para MetricCard)
const Percent = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

export default AnalyticsDashboard;
