// src/savings-goals/SmartSavingsPanel.tsx
import React, { useState, useEffect } from "react";
import {
  Zap,
  TrendingUp,
  DollarSign,
  Clock,
  Calendar,
  Target,
  Sparkles,
  Lightbulb,
  RefreshCw,
  Settings,
  Play,
  Pause,
  Plus,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Shield,
  Rocket,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
  Legend,
} from "recharts";

// Componentes
import AutoSavingsRules from "./AutoSavingsRules";

// Datos de ejemplo
const mockRules = [
  {
    id: 1,
    name: "Redondeo de Transacciones",
    type: "round-up",
    description: "Cada compra redondea al dólar superior",
    isActive: true,
    targetGoalId: 2,
    amount: 0.25,
    lastExecution: "2024-05-15",
    totalSaved: 124.5,
    efficiency: 95,
    icon: RefreshCw,
    color: "#2E8B57",
  },
  {
    id: 2,
    name: "Aporte Mensual Automático",
    type: "fixed-amount",
    description: "Transferencia automática cada 15 del mes",
    isActive: true,
    targetGoalId: 1,
    amount: 833,
    lastExecution: "2024-06-01",
    totalSaved: 4165,
    efficiency: 100,
    icon: Calendar,
    color: "#61bc84",
  },
  {
    id: 3,
    name: "5% de cada Ingreso",
    type: "percentage-income",
    description: "5% de cada ingreso va a metas específicas",
    isActive: true,
    targetGoalId: 3,
    percentage: 5,
    lastExecution: "2024-05-30",
    totalSaved: 1250,
    efficiency: 88,
    icon: TrendingUp,
    color: "#8FBC8F",
  },
  {
    id: 4,
    name: "Ahorro por Excedente",
    type: "excess-budget",
    description: "Lo que sobra del presupuesto mensual se ahorra",
    isActive: false,
    targetGoalId: 2,
    lastExecution: "2024-04-30",
    totalSaved: 320,
    efficiency: 75,
    icon: Shield,
    color: "#c6ffe6",
  },
];

const savingsImpactData = [
  { month: "Ene", manual: 800, automatic: 950 },
  { month: "Feb", manual: 850, automatic: 1100 },
  { month: "Mar", manual: 900, automatic: 1250 },
  { month: "Abr", manual: 950, automatic: 1400 },
  { month: "May", manual: 1000, automatic: 1550 },
  { month: "Jun", manual: 1050, automatic: 1700 },
];

const ruleDistributionData = [
  { name: "Redondeo", value: 124.5, color: "#2E8B57" },
  { name: "Aporte Fijo", value: 4165, color: "#61bc84" },
  { name: "Porcentaje", value: 1250, color: "#8FBC8F" },
  { name: "Excedente", value: 320, color: "#c6ffe6" },
];

const SmartSavingsPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [totalAutomaticSavings, setTotalAutomaticSavings] = useState(0);
  const [averageEfficiency, setAverageEfficiency] = useState(0);
  const [activeRules, setActiveRules] = useState(0);
  const [ruleChartType, setRuleChartType] = useState<"pie" | "bar">("pie");

  useEffect(() => {
    // Calcular estadísticas
    const total = mockRules.reduce((sum, rule) => sum + rule.totalSaved, 0);
    const active = mockRules.filter((rule) => rule.isActive).length;
    const avgEff =
      mockRules.length > 0
        ? Math.round(
            mockRules.reduce((sum, rule) => sum + rule.efficiency, 0) /
              mockRules.length
          )
        : 0;

    setTotalAutomaticSavings(total);
    setActiveRules(active);
    setAverageEfficiency(avgEff);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleToggleRule = (ruleId: number) => {
    console.log("Toggle rule:", ruleId);
  };

  const handleAddRule = () => {
    console.log("Add new rule");
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-200/5 backdrop-blur-md border border-primary-100/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-200 mb-1">
                  Total Ahorro Automático
                </div>
                <div className="text-2xl font-bold text-text-100">
                  {formatCurrency(totalAutomaticSavings)}
                </div>
                <div className="text-xs text-green-400 mt-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% este mes
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                <Zap className="h-6 w-6 text-primary-200" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-md border border-green-500/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-200 mb-1">Reglas Activas</div>
                <div className="text-2xl font-bold text-green-400">
                  {activeRules}
                </div>
                <div className="text-xs text-text-200 mt-2">
                  de {mockRules.length} reglas
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10">
                <Settings className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-md border border-blue-500/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-200 mb-1">
                  Eficiencia Promedio
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {averageEfficiency}%
                </div>
                <div className="text-xs text-text-200 mt-2">
                  Ejecución exitosa
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 backdrop-blur-md border border-yellow-500/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-200 mb-1">
                  Tiempo Ahorrado
                </div>
                <div className="text-2xl font-bold text-yellow-400">45h</div>
                <div className="text-xs text-text-200 mt-2">
                  vs. ahorro manual
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/10">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de contenido */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 bg-bg-200/40 backdrop-blur-md border border-bg-300/40 p-1 rounded-xl mb-6">
          <TabsTrigger value="overview" className="text-sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="rules" className="text-sm">
            <Settings className="h-4 w-4 mr-2" />
            Mis Reglas
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-sm">
            <Lightbulb className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Pestaña: Resumen */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de impacto */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-text-100 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary-200" />
                  Impacto del Ahorro Automático
                </CardTitle>
                <CardDescription className="text-text-200">
                  Comparativa ahorro manual vs. automático
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={savingsImpactData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#454545"
                        vertical={false}
                      />
                      <XAxis dataKey="month" stroke="#e0e0e0" fontSize={12} />
                      <YAxis
                        stroke="#e0e0e0"
                        fontSize={12}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        formatter={(value) => [`$${value}`, "Ahorro"]}
                        contentStyle={{
                          backgroundColor: "rgba(30, 30, 30, 0.9)",
                          borderColor: "#454545",
                          borderRadius: "0.5rem",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="manual"
                        name="Ahorro Manual"
                        stroke="#61bc84"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        animationDuration={2000}
                      />
                      <Line
                        type="monotone"
                        dataKey="automatic"
                        name="Ahorro Automático"
                        stroke="#2E8B57"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        animationDuration={2000}
                        animationBegin={300}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      +85%
                    </div>
                    <div className="text-sm text-text-200">Más efectivo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">45h</div>
                    <div className="text-sm text-text-200">Tiempo ahorrado</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Distribución por tipo de regla */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-text-100 flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary-200" />
                      Distribución por Tipo de Regla
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Contribución de cada mecanismo automático
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-bg-300/30 rounded-lg p-1 border border-bg-300/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`px-2 h-8 text-xs transition-all duration-300 border ${
                          ruleChartType === "pie"
                            ? "bg-primary-200/20 text-primary-200 border-primary-200/40"
                            : "text-text-200 hover:text-primary-200 hover:bg-primary-200/10 border-transparent"
                        }`}
                        onClick={() => setRuleChartType("pie")}
                      >
                        <PieChart className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`px-2 h-8 text-xs transition-all duration-300 border ${
                          ruleChartType === "bar"
                            ? "bg-primary-200/20 text-primary-200 border-primary-200/40"
                            : "text-text-200 hover:text-primary-200 hover:bg-primary-200/10 border-transparent"
                        }`}
                        onClick={() => setRuleChartType("bar")}
                      >
                        <BarChart3 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 border border-bg-300/30 rounded-lg p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    {ruleChartType === "pie" ? (
                      <RechartsPieChart>
                        <Pie
                          data={ruleDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={1500}
                        >
                          {ruleDistributionData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="rgba(255, 255, 255, 0.8)"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [
                            formatCurrency(Number(value)),
                            "Ahorro",
                          ]}
                          contentStyle={{
                            backgroundColor: "rgba(30, 30, 30, 0.9)",
                            borderColor: "rgba(255, 255, 255, 0.2)",
                            borderRadius: "0.5rem",
                            borderWidth: "1px",
                          }}
                        />
                        <Legend />
                      </RechartsPieChart>
                    ) : (
                      <BarChart
                        data={ruleDistributionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#454545"
                          opacity={0.3}
                        />
                        <XAxis
                          dataKey="name"
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
                        <Tooltip
                          formatter={(value) => [
                            formatCurrency(Number(value)),
                            "Ahorro",
                          ]}
                          contentStyle={{
                            backgroundColor: "rgba(30, 30, 30, 0.9)",
                            borderColor: "rgba(255, 255, 255, 0.2)",
                            borderRadius: "0.5rem",
                            borderWidth: "1px",
                          }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {ruleDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-2 border border-bg-300/30 rounded-lg p-4">
                  {ruleDistributionData.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border-b border-bg-300/20 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full border border-white/30"
                          style={{ backgroundColor: rule.color }}
                        />
                        <span className="text-sm text-text-200">
                          {rule.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-text-100">
                        {formatCurrency(rule.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Beneficios destacados */}
          <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-text-100">Beneficios Clave</CardTitle>
              <CardDescription className="text-text-200">
                Ventajas del ahorro automático vs. manual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Zap className="h-5 w-5 text-green-400" />
                    </div>
                    <h4 className="font-semibold text-text-100">
                      Sin Esfuerzo
                    </h4>
                  </div>
                  <p className="text-sm text-text-200">
                    Ahorra automáticamente sin pensar en transferencias manuales
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-text-100">
                      +85% Efectivo
                    </h4>
                  </div>
                  <p className="text-sm text-text-200">
                    Usuarios ahorran en promedio 85% más con reglas automáticas
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Clock className="h-5 w-5 text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-text-100">
                      45h Ahorradas
                    </h4>
                  </div>
                  <p className="text-sm text-text-200">
                    Equivalente a una semana laboral en tiempo de administración
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <Shield className="h-5 w-5 text-yellow-400" />
                    </div>
                    <h4 className="font-semibold text-text-100">Disciplina</h4>
                  </div>
                  <p className="text-sm text-text-200">
                    Elimina la procrastinación y mantén la consistencia
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña: Mis Reglas */}
        <TabsContent value="rules" className="space-y-6">
          <AutoSavingsRules />
        </TabsContent>

        {/* Pestaña: Insights */}
        <TabsContent value="insights" className="space-y-6">
          <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-text-100 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary-200" />
                Insights Inteligentes
              </CardTitle>
              <CardDescription className="text-text-200">
                Recomendaciones personalizadas para optimizar tu ahorro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Insight 1 */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-100/20">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary-100/20">
                      <Sparkles className="h-5 w-5 text-primary-200" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-100">
                          Oportunidad Detectada
                        </h4>
                        <Badge className="bg-green-500/20 text-green-400">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Alto Impacto
                        </Badge>
                      </div>
                      <p className="text-text-200 mb-4">
                        Analizando tus transacciones, detectamos que podrías
                        ahorrar
                        <span className="font-bold text-primary-200">
                          {" "}
                          $95/mes adicionales
                        </span>{" "}
                        activando el redondeo de transacciones en todas tus
                        compras.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-text-200">
                          Impacto estimado:{" "}
                          <span className="font-bold text-green-400">
                            +$1,140/año
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary-100 to-primary-200 text-white"
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Activar Sugerencia
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insight 2 */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Settings className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-100">
                          Optimización de Reglas
                        </h4>
                        <Badge className="bg-yellow-500/20 text-yellow-400">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Atención
                        </Badge>
                      </div>
                      <p className="text-text-200 mb-4">
                        Tu regla de "Ahorro por Excedente" tiene una eficiencia
                        del 75%. Podrías mejorarla al 95% ajustando el umbral a
                        <span className="font-bold text-blue-400">
                          {" "}
                          $50 en lugar de $100
                        </span>
                        .
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-text-200 mb-1">
                            <span>Eficiencia actual: 75%</span>
                            <span>Potencial: 95%</span>
                          </div>
                          <Progress value={75} className="h-2 bg-bg-300/50" />
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500/50 text-blue-400"
                        >
                          Optimizar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insight 3 */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Rocket className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-100">
                          Aceleración de Metas
                        </h4>
                        <Badge className="bg-purple-500/20 text-purple-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Recomendado
                        </Badge>
                      </div>
                      <p className="text-text-200 mb-4">
                        Si activas todas las reglas sugeridas, podrías completar
                        tu meta "Viaje a Playa"
                        <span className="font-bold text-green-400">
                          {" "}
                          3 meses antes
                        </span>{" "}
                        de lo planeado.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-text-100">
                            8 meses
                          </div>
                          <div className="text-xs text-text-200">
                            Planeado originalmente
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">
                            5 meses
                          </div>
                          <div className="text-xs text-text-200">
                            Con optimizaciones
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparativa con otros usuarios */}
          <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-text-100">
                Comparativa con Usuarios Similares
              </CardTitle>
              <CardDescription className="text-text-200">
                ¿Cómo te comparas con otros que usan ahorro automático?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    metric: "Reglas activas",
                    you: 3,
                    average: 2,
                    top: 5,
                    unit: "",
                  },
                  {
                    metric: "Eficiencia",
                    you: 89,
                    average: 76,
                    top: 95,
                    unit: "%",
                  },
                  {
                    metric: "Ahorro mensual",
                    you: 1550,
                    average: 850,
                    top: 2500,
                    unit: "$",
                  },
                  {
                    metric: "Metas aceleradas",
                    you: 2,
                    average: 1,
                    top: 4,
                    unit: "",
                  },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-200">{item.metric}</span>
                      <div className="flex gap-4">
                        <span className="text-text-200">
                          Promedio: {item.average}
                          {item.unit}
                        </span>
                        <span className="text-text-100 font-medium">
                          Tú: {item.you}
                          {item.unit}
                        </span>
                        <span className="text-primary-200">
                          Top: {item.top}
                          {item.unit}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-text-200/30"
                        style={{ width: `${(item.average / item.top) * 100}%` }}
                      />
                      <div
                        className="bg-primary-200"
                        style={{ width: `${(item.you / item.top) * 100}%` }}
                      />
                      <div
                        className="bg-primary-100"
                        style={{ width: `${(item.top / item.top) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-text-200">
                      <span>0</span>
                      <span>
                        {item.top}
                        {item.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botón de acción principal */}
      <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-200/5 backdrop-blur-md border border-primary-100/20 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                <Sparkles className="h-6 w-6 text-primary-200" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-2">
                  ¿Listo para optimizar tu ahorro?
                </h3>
                <p className="text-text-200">
                  Nuestro sistema de IA puede analizar tus patrones y sugerir
                  reglas personalizadas para maximizar tu ahorro automático.
                </p>
              </div>
            </div>
            <Button
              onClick={handleAddRule}
              className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Regla Inteligente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartSavingsPanel;
