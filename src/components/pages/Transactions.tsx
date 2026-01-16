// src/pages/Transactions.tsx
import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  BarChart3,
  PieChart,
  List,
  Bell,
  Sparkles,
  DollarSign,
  Clock,
  AlertCircle,
  Lightbulb,
  FileText,
  Tag as TagIcon,
  ChevronRight,
  CreditCard,
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

// Importar Layout
import Layout from "../layout/Layout";

// Componentes del módulo de transacciones
import TransactionSummary from "../transactions/TransactionSummary";
import TransactionList from "../transactions/TransactionList";
import TransactionCharts from "../transactions/TransactionCharts";
import TransactionFilters from "../transactions/TransactionFilters";
import QuickTransactionForm from "../transactions/QuickTransactionForm";
import TransactionExport from "../transactions/TransactionExport";

// Datos de ejemplo
import { transactions } from "../../data/transactionData";

const Transactions = () => {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("list");
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Datos de ejemplo para el resumen
  const summaryData = {
    totalBalance: 15250.75,
    totalIncome: 5250.5,
    totalExpense: 3200.25,
    netFlow: 2050.25,
    previousMonthComparison: 8.5,
    transactionsCount: 42,
  };

  // Estadísticas de transacciones
  const transactionStats = {
    total: 42,
    incomeCount: 8,
    expenseCount: 32,
    transferCount: 2,
    averageAmount: 125.5,
    highestAmount: 2500,
    recurringCount: 12,
  };

  // Función para formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Manejar envío de nueva transacción
  const handleTransactionSubmit = (transactionData: any) => {
    console.log("Nueva transacción creada:", transactionData);
    setShowTransactionForm(false);
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
                      <CreditCard className="h-8 w-8 text-primary-200 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300" />

                      {/* Efecto de transacción en el icono */}
                      <div className="absolute -top-1 -right-1">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                          <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-200 flex items-center justify-center">
                            <TrendingUp className="h-2.5 w-2.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Títulos con gradiente */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                      Gestión de Transacciones
                    </h1>
                    <p className="text-text-200/80 mt-2 max-w-2xl">
                      Registro completo y análisis inteligente de tus
                      movimientos financieros
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
                      Balance: $15,250.75
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <TrendingUp className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      +$2,050.25 este mes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Indicador de tiempo mejorado */}
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

                {/* Botón de nueva transacción */}
                <Button
                  onClick={() => setShowTransactionForm(true)}
                  className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/30 hover:shadow-primary-200/40 transition-all duration-300 group"
                >
                  <PlusCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Nueva Transacción
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Pestañas principales */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-4 bg-bg-200/40 backdrop-blur-md border border-bg-300/40 p-1 rounded-2xl shadow-lg">
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <List className="h-4 w-4 mr-2" />
              Lista
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Análisis
            </TabsTrigger>
            <TabsTrigger
              value="filters"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </TabsTrigger>
            <TabsTrigger
              value="export"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </TabsTrigger>
          </TabsList>

          {/* ==================== CONTENIDO: Lista de Transacciones ==================== */}
          <TabsContent value="list" className="space-y-6 mt-6">
            {/* Resumen de transacciones */}
            <TransactionSummary summary={summaryData} />

            {/* SOLO la lista de transacciones - SIN FILTROS RÁPIDOS */}
            <TransactionList />

            {/* Insights rápidos */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-text-100 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary-200" />
                  Insights Rápidos
                </CardTitle>
                <CardDescription className="text-text-200">
                  Análisis automático de tus patrones de gasto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-green-500/20">
                        <TrendingDown className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-100">
                          Gastos Disminuyendo
                        </h4>
                        <p className="text-sm text-text-200 mt-1">
                          Tu gasto en entretenimiento bajó 12% vs mes anterior
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-yellow-500/20">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-100">
                          Patrón Detectado
                        </h4>
                        <p className="text-sm text-text-200 mt-1">
                          Incremento del 25% en compras online los fines de
                          semana
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary-100/20">
                        <Sparkles className="h-5 w-5 text-primary-200" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-100">
                          Oportunidad de Ahorro
                        </h4>
                        <p className="text-sm text-text-200 mt-1">
                          Podrías ahorrar $85/mes optimizando suscripciones
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== CONTENIDO: Análisis ==================== */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            {/* Estadísticas superiores */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-100/5 backdrop-blur-sm border border-primary-100/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-text-200">
                        Total Transacciones
                      </div>
                      <div className="text-2xl font-bold text-text-100">
                        {transactionStats.total}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-primary-100/20">
                      <List className="h-5 w-5 text-primary-200" />
                    </div>
                  </div>
                  <div className="text-xs text-green-400 mt-2 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5% vs mes anterior
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-sm border border-green-500/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-text-200">Ingresos</div>
                      <div className="text-2xl font-bold text-green-400">
                        {transactionStats.incomeCount}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  <div className="text-xs text-text-200 mt-2">
                    {formatCurrency(5250.5)} total
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-red-500/10 to-red-500/5 backdrop-blur-sm border border-red-500/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-text-200">Gastos</div>
                      <div className="text-2xl font-bold text-red-400">
                        {transactionStats.expenseCount}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-red-500/20">
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    </div>
                  </div>
                  <div className="text-xs text-text-200 mt-2">
                    {formatCurrency(3200.25)} total
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm border border-blue-500/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-text-200">
                        Monto Promedio
                      </div>
                      <div className="text-2xl font-bold text-blue-400">
                        {formatCurrency(transactionStats.averageAmount)}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-xs text-text-200 mt-2">
                    Por transacción
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos principales */}
            <TransactionCharts />

            {/* Análisis detallado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-text-100">
                    Top 5 Categorías
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Mayor gasto por categoría este mes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Alimentación", amount: 1250, color: "#2E8B57" },
                      { name: "Transporte", amount: 800, color: "#61bc84" },
                      {
                        name: "Entretenimiento",
                        amount: 450,
                        color: "#8FBC8F",
                      },
                      { name: "Compras", amount: 350, color: "#c6ffe6" },
                      { name: "Servicios", amount: 280, color: "#345e37" },
                    ].map((cat, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-32 text-sm text-text-200">
                          {cat.name}
                        </div>
                        <div className="flex-1 h-2 bg-bg-300/50 rounded-full overflow-hidden mx-4">
                          <div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: cat.color,
                              width: `${(cat.amount / 1250) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="text-right font-medium text-text-100 w-24">
                          {formatCurrency(cat.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-text-100">
                    Distribución Temporal
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Horas con más actividad de gasto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { hour: "08:00-12:00", activity: 35, peak: true },
                      { hour: "12:00-16:00", activity: 25 },
                      { hour: "16:00-20:00", activity: 45, peak: true },
                      { hour: "20:00-00:00", activity: 30 },
                      { hour: "00:00-04:00", activity: 5 },
                    ].map((time, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-24 text-sm text-text-200">
                          {time.hour}
                        </div>
                        <div className="flex-1 h-2 bg-bg-300/50 rounded-full overflow-hidden mx-4 relative">
                          <div
                            className={`h-full rounded-full ${
                              time.peak
                                ? "bg-gradient-to-r from-primary-100 to-primary-200"
                                : "bg-gradient-to-r from-primary-100/50 to-primary-200/50"
                            }`}
                            style={{ width: `${time.activity}%` }}
                          />
                        </div>
                        <div
                          className={`text-right font-medium w-12 ${
                            time.peak ? "text-primary-200" : "text-text-100"
                          }`}
                        >
                          {time.activity}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ==================== CONTENIDO: Filtros Avanzados ==================== */}
          <TabsContent value="filters" className="space-y-6 mt-6">
            <TransactionFilters />

            {/* Contenido principal - Ocupa 3 columnas */}
            <div className="lg:col-span-3 space-y-6">
              {/* Vista previa de resultados */}
              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-text-100 flex items-center justify-between">
                    <span>Vista Previa de Resultados</span>
                    <Badge className="bg-primary-100/20 text-primary-200">
                      128 transacciones encontradas
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Transacciones que coinciden con tus filtros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Transacciones de ejemplo con filtros aplicados */}
                    {transactions.slice(0, 3).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                transaction.type === "income"
                                  ? "bg-green-500/20"
                                  : transaction.type === "expense"
                                  ? "bg-red-500/20"
                                  : "bg-blue-500/20"
                              }`}
                            >
                              {transaction.type === "income" ? (
                                <TrendingUp className="h-4 w-4 text-green-400" />
                              ) : transaction.type === "expense" ? (
                                <TrendingDown className="h-4 w-4 text-red-400" />
                              ) : (
                                <RefreshCw className="h-4 w-4 text-blue-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-text-100">
                                {transaction.description}
                              </div>
                              <div className="text-sm text-text-200 flex items-center gap-2">
                                <TagIcon className="h-3 w-3" />
                                {transaction.category}
                                <span className="mx-2">•</span>
                                {transaction.date}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`font-bold ${
                              transaction.type === "income"
                                ? "text-green-400"
                                : transaction.type === "expense"
                                ? "text-red-400"
                                : "text-blue-400"
                            }`}
                          >
                            {transaction.type === "expense" ? "-" : "+"}
                            {formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Botón para ver todos los resultados */}
                    <div className="pt-4 border-t border-bg-300/40">
                      <Button
                        variant="outline"
                        className="w-full border-primary-100/30 text-primary-200 hover:bg-primary-100/10 group"
                        onClick={() => setActiveTab("list")}
                      >
                        Ver todas las transacciones filtradas
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas de filtros */}
              <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-text-100">
                    Estadísticas del Filtro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 text-center">
                      <div className="text-2xl font-bold text-text-100">
                        {formatCurrency(4250)}
                      </div>
                      <div className="text-sm text-text-200 mt-1">
                        Total filtrado
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 text-center">
                      <div className="text-2xl font-bold text-text-100">
                        85%
                      </div>
                      <div className="text-sm text-text-200 mt-1">
                        Del total
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {formatCurrency(1050)}
                      </div>
                      <div className="text-sm text-text-200 mt-1">
                        Ingresos filtrados
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 text-center">
                      <div className="text-2xl font-bold text-red-400">
                        {formatCurrency(3200)}
                      </div>
                      <div className="text-sm text-text-200 mt-1">
                        Gastos filtrados
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ==================== CONTENIDO: Exportar ==================== */}
          <TabsContent value="export" className="space-y-6 mt-6">
            <TransactionExport
              transactions={transactions}
              summary={{
                // Puedes calcular estas estadísticas o usar datos de ejemplo
                totalTransactions: transactions.length,
                totalIncome: transactions
                  .filter((t) => t.type === "income")
                  .reduce((sum, t) => sum + t.amount, 0),
                totalExpenses: transactions
                  .filter((t) => t.type === "expense")
                  .reduce((sum, t) => sum + t.amount, 0),
                categories: Array.from(
                  new Set(transactions.map((t) => t.category))
                ).length,
                startDate: transactions[0]?.date || new Date().toISOString(),
                endDate:
                  transactions[transactions.length - 1]?.date ||
                  new Date().toISOString(),
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Formulario para crear transacción rápida */}
        {showTransactionForm && (
          <QuickTransactionForm
            onClose={() => setShowTransactionForm(false)}
            onSubmit={handleTransactionSubmit}
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
                    Sistema activo • {transactionStats.total} transacciones
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
                <Sparkles className="h-4 w-4 mr-2" />
                Análisis IA
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

export default Transactions;
