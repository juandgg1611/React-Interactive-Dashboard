// src/pages/Analytics.tsx
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  AlertTriangle,
  Sparkles,
  Brain,
  Zap,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Lightbulb,
  DollarSign,
  Clock,
  ChevronRight,
  Eye,
  Settings,
  Share2,
  Maximize2,
  Minimize2,
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

// Importar Layout
import Layout from "../layout/Layout";

// Componentes del módulo de analítica
import FinancialTrendsChart from "../analytics/FinancialTrendsChart";
import CategoryAnalysis from "../analytics/CategoryAnalysis";
import AIForecastPanel from "../analytics/AIForecastPanel";
import PredictiveAlerts from "../analytics/PredictiveAlerts";
import FinancialHealthScore from "../analytics/FinancialHealthScore";
import ScenarioSimulator from "../analytics/ScenarioSimulator";
import BenchmarkComparison from "../analytics/BenchmarkComparison";
import PatternRecognition from "../analytics/PatternRecognition";

// Datos de ejemplo
import { analyticsData } from "../../data/analyticsData";
import AnalyticsExport from "../analytics/AnalyticsExport";

const Analytics = () => {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [showDetails, setShowDetails] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [fullscreenMode, setFullscreenMode] = useState(false);

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Datos de ejemplo para el resumen
  const summaryData = {
    financialHealth: 78,
    savingsRate: 20.5,
    expenseIncomeRatio: 75.2,
    incomeStability: 85,
    spendingConsistency: 65,
    predictionAccuracy: 92,
    monthlyTrend: "positive",
    riskLevel: "low",
  };

  // Estadísticas de tendencias
  const trendStats = {
    incomeGrowth: 12.5,
    expenseReduction: 8.2,
    savingsIncrease: 25.3,
    investmentReturn: 5.7,
    debtReduction: 15.8,
    netWorthGrowth: 18.4,
  };

  // Función para formatear porcentaje
  const formatPercent = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  // Función para formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Manejar cambio de rango de tiempo
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // Aquí iría la lógica para actualizar datos según el rango
  };

  return (
    <Layout>
      <div
        className={`container mx-auto px-4 lg:px-8 py-6 ${
          fullscreenMode ? "max-w-full px-0" : ""
        }`}
      >
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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Icono con efectos especiales */}
                  <div className="relative group">
                    {/* Brillos externos */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary-200/20 to-primary-300/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="absolute -inset-1 bg-primary-100/10 rounded-xl blur-md"></div>

                    {/* Icono principal */}
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-primary-300/10 border border-primary-200/30 shadow-lg shadow-primary-200/15 backdrop-blur-sm">
                      <BarChart3 className="h-8 w-8 text-primary-200 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300" />

                      {/* Efecto de IA en el icono */}
                      <div className="absolute -top-1 -right-1">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                          <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-200 flex items-center justify-center">
                            <Brain className="h-2.5 w-2.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Títulos con gradiente animado */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                      Analítica Financiera con IA
                    </h1>
                    <p className="text-text-200/80 mt-2 max-w-2xl">
                      Insights predictivos, tendencias inteligentes y
                      recomendaciones personalizadas
                    </p>
                  </div>
                </div>

                {/* Stats en tiempo real con IA */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                      <div className="relative h-2 w-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-text-200">
                      IA Predictiva Activa
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <Sparkles className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      92% Precisión en Pronósticos
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Controles de vista */}
                <div className="flex items-center gap-3 text-sm bg-bg-200/40 backdrop-blur-md rounded-xl px-4 py-3 border border-bg-300/50 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="auto-refresh"
                      className="text-text-200 cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4 text-primary-200 mr-2 inline" />
                      Auto-refresh
                    </Label>
                    <Switch
                      id="auto-refresh"
                      checked={autoRefresh}
                      onCheckedChange={setAutoRefresh}
                      className="data-[state=checked]:bg-primary-200"
                    />
                  </div>

                  <div className="h-4 w-px bg-bg-300/50"></div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFullscreenMode(!fullscreenMode)}
                    className="text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                  >
                    {fullscreenMode ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Botón de generación de reporte */}
                <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/30 hover:shadow-primary-200/40 transition-all duration-300 group">
                  <Brain className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Generar Reporte IA
                </Button>
              </div>
            </div>

            {/* Filtro de tiempo */}
            {/* Selector de rango de tiempo mejorado */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-text-200">
                    <Calendar className="h-5 w-5 text-primary-200" />
                    <span className="font-medium text-text-100">
                      Rango de análisis:
                    </span>
                  </div>

                  {/* Selector mejorado con píldoras */}
                  <div className="flex items-center gap-2 p-1 rounded-xl bg-bg-200/40 backdrop-blur-md border border-bg-300/40">
                    {[
                      { value: "week", label: "7 días", icon: Clock },
                      { value: "month", label: "30 días", icon: Calendar },
                      { value: "quarter", label: "3 meses", icon: TrendingUp },
                      { value: "year", label: "1 año", icon: Award },
                      {
                        value: "custom",
                        label: "Personalizado",
                        icon: Settings,
                      },
                    ].map((range) => {
                      const Icon = range.icon;
                      return (
                        <Button
                          key={range.value}
                          size="sm"
                          onClick={() => handleTimeRangeChange(range.value)}
                          className={`rounded-lg px-4 py-2 transition-all duration-300 ${
                            timeRange === range.value
                              ? "bg-gradient-to-r from-primary-100/30 to-primary-200/20 text-primary-200 shadow-lg shadow-primary-200/10"
                              : "text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                          }`}
                        >
                          <Icon
                            className={`h-3.5 w-3.5 mr-2 ${
                              timeRange === range.value
                                ? "text-primary-200"
                                : "text-text-200/60"
                            }`}
                          />
                          {range.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Indicadores del lado derecho */}
                <div className="flex items-center gap-3">
                  {/* Indicador de fecha */}
                  <div className="hidden sm:flex items-center gap-3 text-sm bg-bg-200/40 backdrop-blur-md rounded-xl px-4 py-3 border border-bg-300/50 shadow-lg hover:shadow-primary-200/10 transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-text-100">
                      <Calendar className="h-4 w-4 text-primary-200 group-hover:text-primary-300 transition-colors" />
                      <div>
                        <div className="font-medium">
                          {time.toLocaleDateString("es-ES", {
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                        <div className="text-xs text-text-200/70">
                          {time.toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas principales */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-6 bg-bg-200/40 backdrop-blur-md border border-bg-300/40 p-1 rounded-2xl shadow-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              Resumen
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <LineChart className="h-4 w-4 mr-2" />
              Tendencias
            </TabsTrigger>
            <TabsTrigger
              value="predictions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Brain className="h-4 w-4 mr-2" />
              Predicciones
            </TabsTrigger>
            <TabsTrigger
              value="simulator"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Target className="h-4 w-4 mr-2" />
              Simulador
            </TabsTrigger>
            <TabsTrigger
              value="benchmarks"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Comparativas
            </TabsTrigger>
            <TabsTrigger
              value="export"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </TabsTrigger>
          </TabsList>

          {/* ==================== CONTENIDO: Resumen General ==================== */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Score de salud financiera */}
            <FinancialHealthScore score={summaryData.financialHealth} />

            {/* KPIs principales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-text-200">
                        Tasa de Ahorro
                      </div>
                      <div className="text-2xl font-bold text-primary-light">
                        {summaryData.savingsRate}%
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-primary/20">
                      <TrendingUp className="h-5 w-5 text-primary-light" />
                    </div>
                  </div>
                  <div className="text-xs text-green-400 mt-2 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {formatPercent(trendStats.savingsIncrease)} vs mes anterior
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-sm border border-green-500/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-text-200">
                        Crecimiento Ingresos
                      </div>
                      <div className="text-2xl font-bold text-green-400">
                        {formatPercent(trendStats.incomeGrowth)}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  <div className="text-xs text-text-200 mt-2">
                    Estabilidad: {summaryData.incomeStability}%
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-red-500/10 to-red-500/5 backdrop-blur-sm border border-red-500/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-text-200">
                        Reducción Gastos
                      </div>
                      <div className="text-2xl font-bold text-red-400">
                        {formatPercent(trendStats.expenseReduction)}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-red-500/20">
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    </div>
                  </div>
                  <div className="text-xs text-green-400 mt-2">
                    Consistencia: {summaryData.spendingConsistency}%
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm border border-accent/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-text-200">Precisión IA</div>
                      <div className="text-2xl font-bold text-accent">
                        {summaryData.predictionAccuracy}%
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-accent/20">
                      <Brain className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <div className="text-xs text-text-200 mt-2">
                    Modelo entrenado al 98%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de tendencias principales */}
            <FinancialTrendsChart timeRange={timeRange} />

            {/* Insights y alertas en tiempo real */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PredictiveAlerts />

              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-text-100 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    Insights de IA
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Recomendaciones personalizadas basadas en tus datos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-500/20">
                          <Sparkles className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-100">
                            Oportunidad de Optimización
                          </h4>
                          <p className="text-sm text-text-200 mt-1">
                            Podrías ahorrar $120/mes redondeando tus compras
                          </p>
                          <Button
                            size="sm"
                            className="mt-2 bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          >
                            Activar ahora
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                          <Target className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-100">
                            Meta Acelerable
                          </h4>
                          <p className="text-sm text-text-200 mt-1">
                            "Viaje a Playa" podría completarse 2 meses antes
                          </p>
                          <Button
                            size="sm"
                            className="mt-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                          >
                            Ver plan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ==================== CONTENIDO: Tendencias ==================== */}
          <TabsContent value="trends" className="space-y-6 mt-6">
            <FinancialTrendsChart timeRange={timeRange} detailed={true} />
            <CategoryAnalysis />

            {/* Detección de patrones */}
            <PatternRecognition />

            {/* Análisis comparativo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-text-100">
                    Estacionalidad
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Patrones recurrentes detectados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        month: "Enero",
                        pattern: "Alto gasto en viajes",
                        impact: "+35%",
                      },
                      {
                        month: "Junio",
                        pattern: "Incremento en educación",
                        impact: "+22%",
                      },
                      {
                        month: "Diciembre",
                        pattern: "Picos de compras",
                        impact: "+48%",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-bg-300/20"
                      >
                        <div>
                          <div className="font-medium text-text-100">
                            {item.month}
                          </div>
                          <div className="text-sm text-text-200">
                            {item.pattern}
                          </div>
                        </div>
                        <Badge
                          className={
                            item.impact.startsWith("+")
                              ? "bg-red-500/20 text-red-400"
                              : "bg-green-500/20 text-green-400"
                          }
                        >
                          {item.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-text-100">Correlaciones</CardTitle>
                  <CardDescription className="text-text-200">
                    Relaciones entre variables financieras
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-200">Ingresos → Ahorro</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-24 h-2" />
                        <span className="text-sm font-medium text-text-100">
                          85%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-200">
                        Gastos → Salud Financiera
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-24 h-2" />
                        <span className="text-sm font-medium text-text-100">
                          72%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-200">
                        Consistencia → Metas
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress value={91} className="w-24 h-2" />
                        <span className="text-sm font-medium text-text-100">
                          91%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ==================== CONTENIDO: Predicciones ==================== */}
          <TabsContent value="predictions" className="space-y-6 mt-6">
            {/* Panel de pronósticos de IA */}
            <AIForecastPanel />

            {/* Predicciones detalladas por categoría */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-text-100">
                    Próximos 3 meses
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Proyección de flujo de efectivo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        month: "Julio",
                        income: 4500,
                        expenses: 3200,
                        savings: 1300,
                      },
                      {
                        month: "Agosto",
                        income: 4600,
                        expenses: 3100,
                        savings: 1500,
                      },
                      {
                        month: "Septiembre",
                        income: 4800,
                        expenses: 3300,
                        savings: 1500,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-text-100">
                            {item.month}
                          </span>
                          <Badge className="bg-green-500/20 text-green-400">
                            +{formatCurrency(item.savings)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-text-200">Ingresos</div>
                            <div className="text-green-400 font-medium">
                              {formatCurrency(item.income)}
                            </div>
                          </div>
                          <div>
                            <div className="text-text-200">Gastos</div>
                            <div className="text-red-400 font-medium">
                              {formatCurrency(item.expenses)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-text-100">
                    Riesgos y Oportunidades
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Análisis predictivo de IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-text-100">
                            Riesgo Detectado
                          </h4>
                          <p className="text-sm text-text-200 mt-1">
                            Gastos en entretenimiento podrían exceder
                            presupuesto en 15 días
                          </p>
                          <div className="text-xs text-text-200/70 mt-2">
                            Confianza: 87% • Probabilidad: Alta
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-green-400 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-text-100">
                            Oportunidad Inminente
                          </h4>
                          <p className="text-sm text-text-200 mt-1">
                            Bono de fin de año podría incrementar ahorro anual
                            en $1,200
                          </p>
                          <div className="text-xs text-text-200/70 mt-2">
                            Confianza: 92% • Impacto: Significativo
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ==================== CONTENIDO: Simulador ==================== */}
          <TabsContent value="simulator" className="space-y-6 mt-6">
            <ScenarioSimulator />
          </TabsContent>

          {/* ==================== CONTENIDO: Comparativas ==================== */}
          <TabsContent value="benchmarks" className="space-y-6 mt-6">
            <BenchmarkComparison />
          </TabsContent>
          {/* ==================== CONTENIDO: Exportar ==================== */}
          <TabsContent value="export" className="space-y-6 mt-6">
            <AnalyticsExport />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-bg-300/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-text-200/70">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary-light rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    IA Analizando • {summaryData.predictionAccuracy}% de
                    precisión
                  </span>
                </div>
                <div className="h-4 w-px bg-bg-300/50"></div>
                <span className="text-sm">
                  Última predicción:{" "}
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
                className="text-text-200 hover:text-primary-light hover:bg-primary/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Análisis
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/60 text-text-200 hover:text-primary-light hover:border-primary/50"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir Insights
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
