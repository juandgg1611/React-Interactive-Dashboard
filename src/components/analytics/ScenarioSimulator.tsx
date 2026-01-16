// src/components/analytics/ScenarioSimulator.tsx
import React, { useState, useEffect } from "react";
import {
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Zap,
  Sparkles,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Save,
  Share2,
  Download,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Calculator,
  Timer,
  Award,
  Rocket,
  Scale,
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
import { Slider } from "../ui/slider";
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

const ScenarioSimulator = () => {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [activeScenario, setActiveScenario] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationTime, setSimulationTime] = useState(12); // meses
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [showComparison, setShowComparison] = useState(true);

  // Variables ajustables
  const [incomeChange, setIncomeChange] = useState(10); // %
  const [expenseReduction, setExpenseReduction] = useState(15); // %
  const [savingsRate, setSavingsRate] = useState(5); // %
  const [investmentReturn, setInvestmentReturn] = useState(7); // %

  // Resultados de simulación
  const [simulationResults, setSimulationResults] = useState<any>(null);

  // Escenarios predefinidos - USANDO TU PALETA
  const predefinedScenarios = [
    {
      id: 1,
      name: "Optimización Agresiva",
      description:
        "Maximizar ahorro reduciendo gastos e incrementando ingresos",
      icon: Rocket,
      color: "text-primary-light", // Usamos primary-light
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      preset: {
        incomeChange: 15,
        expenseReduction: 20,
        savingsRate: 10,
        investmentReturn: 8,
        duration: 18,
      },
    },
    {
      id: 2,
      name: "Balance Conservador",
      description: "Ajustes moderados manteniendo calidad de vida",
      icon: Scale,
      color: "text-accent", // Usamos accent
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
      preset: {
        incomeChange: 5,
        expenseReduction: 10,
        savingsRate: 5,
        investmentReturn: 6,
        duration: 24,
      },
    },
    {
      id: 3,
      name: "Aceleración de Metas",
      description: "Enfoque en completar metas específicas más rápido",
      icon: Target,
      color: "text-blue-400", // Mantenemos azul para diferenciar (no está en tu paleta pero es útil)
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      preset: {
        incomeChange: 8,
        expenseReduction: 15,
        savingsRate: 8,
        investmentReturn: 7,
        duration: 12,
      },
    },
    {
      id: 4,
      name: "Inversión Inteligente",
      description: "Énfasis en crecimiento a través de inversiones",
      icon: TrendingUp,
      color: "text-purple-400", // Mantenemos púrpura para diferenciar
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      preset: {
        incomeChange: 12,
        expenseReduction: 8,
        savingsRate: 12,
        investmentReturn: 10,
        duration: 36,
      },
    },
  ];

  // Inicializar escenarios y simulación
  useEffect(() => {
    setScenarios(predefinedScenarios);
    setActiveScenario(predefinedScenarios[0]);
    runSimulation(predefinedScenarios[0].preset);
  }, []);

  // Formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Formatear porcentaje
  const formatPercent = (value: number) => {
    return `${value > 0 ? "+" : ""}${value}%`;
  };

  // Ejecutar simulación
  const runSimulation = (preset?: any) => {
    const baseIncome = 4250;
    const baseExpenses = 3120;
    const baseSavings = 1130;

    const config = preset || {
      incomeChange,
      expenseReduction,
      savingsRate,
      investmentReturn,
      duration: simulationTime,
    };

    const monthlyIncome = baseIncome * (1 + config.incomeChange / 100);
    const monthlyExpenses = baseExpenses * (1 - config.expenseReduction / 100);
    const monthlySavings = monthlyIncome - monthlyExpenses;

    // Calcular crecimiento acumulado
    let totalSavings = 0;
    let investmentGrowth = 0;
    const monthlyData = [];

    for (let month = 1; month <= config.duration; month++) {
      const monthlyNet = monthlySavings;
      totalSavings += monthlyNet;

      // Aplicar retorno de inversión sobre el acumulado
      investmentGrowth += (totalSavings * (config.investmentReturn / 100)) / 12;

      monthlyData.push({
        month,
        income: monthlyIncome,
        expenses: monthlyExpenses,
        savings: monthlyNet,
        cumulative: totalSavings + investmentGrowth,
        investment: investmentGrowth,
      });
    }

    const finalSavings = totalSavings + investmentGrowth;
    const baselineSavings = baseSavings * config.duration;
    const improvement = finalSavings - baselineSavings;

    // Impacto en metas
    const goalsImpact = [
      {
        name: "Viaje a Playa",
        originalTime: 8,
        newTime: Math.max(1, Math.round(8 * (baselineSavings / finalSavings))),
        acceleration: Math.round((1 - baselineSavings / finalSavings) * 100),
      },
      {
        name: "Fondo Emergencia",
        originalTime: 12,
        newTime: Math.max(1, Math.round(12 * (baselineSavings / finalSavings))),
        acceleration: Math.round((1 - baselineSavings / finalSavings) * 100),
      },
      {
        name: "Auto Nuevo",
        originalTime: 24,
        newTime: Math.max(1, Math.round(24 * (baselineSavings / finalSavings))),
        acceleration: Math.round((1 - baselineSavings / finalSavings) * 100),
      },
    ];

    setSimulationResults({
      config,
      monthlyData,
      summary: {
        finalSavings,
        baselineSavings,
        improvement,
        improvementPercent: (improvement / baselineSavings) * 100,
        monthlyIncome,
        monthlyExpenses,
        monthlySavings,
        investmentGrowth,
      },
      goalsImpact,
      timestamp: new Date().toISOString(),
    });
  };

  // Aplicar preset de escenario
  const applyScenario = (scenario: any) => {
    setActiveScenario(scenario);
    setIncomeChange(scenario.preset.incomeChange);
    setExpenseReduction(scenario.preset.expenseReduction);
    setSavingsRate(scenario.preset.savingsRate);
    setInvestmentReturn(scenario.preset.investmentReturn);
    setSimulationTime(scenario.preset.duration);
    runSimulation(scenario.preset);
  };

  // Resetear a valores iniciales
  const resetSimulation = () => {
    setIncomeChange(10);
    setExpenseReduction(15);
    setSavingsRate(5);
    setInvestmentReturn(7);
    setSimulationTime(12);
    runSimulation();
  };

  // Guardar escenario personalizado
  const saveCustomScenario = () => {
    const newScenario = {
      id: scenarios.length + 1,
      name: "Mi Escenario Personalizado",
      description: "Configuración personalizada guardada",
      icon: Sparkles,
      color: "text-yellow-400", // Mantenemos amarillo para alertas
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      preset: {
        incomeChange,
        expenseReduction,
        savingsRate,
        investmentReturn,
        duration: simulationTime,
      },
    };

    setScenarios([...scenarios, newScenario]);

    // Mostrar notificación
    // Aquí podrías agregar un toast
  };

  // Efecto de simulación en tiempo real
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSimulationTime((prev) => {
        const newTime = Math.min(36, prev + 1);
        if (newTime === 36) {
          setIsPlaying(false);
        }
        return newTime;
      });
    }, 1000 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed]);

  // Ejecutar simulación cuando cambian las variables
  useEffect(() => {
    const timeout = setTimeout(() => {
      runSimulation();
    }, 300);

    return () => clearTimeout(timeout);
  }, [
    incomeChange,
    expenseReduction,
    savingsRate,
    investmentReturn,
    simulationTime,
  ]);

  return (
    <Card
      className={`border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl ${
        fullscreen ? "fixed inset-4 z-50" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-text-100 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                <Calculator className="h-6 w-6 text-primary-light" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span>Simulador Financiero</span>
                  <Badge className="bg-gradient-to-r from-primary to-accent text-text-100">
                    <Zap className="h-3 w-3 mr-1" />
                    En Tiempo Real
                  </Badge>
                </div>
                <CardDescription className="text-text-200 mt-1">
                  Simula "¿Qué pasaría si...?" y descubre el impacto de tus
                  decisiones
                </CardDescription>
              </div>
            </CardTitle>
          </div>

          <div className="flex items-center gap-3">
            {/* Controles de simulación */}
            <div className="flex items-center gap-2 bg-bg-300/30 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`${
                  isPlaying
                    ? "text-red-500 hover:text-red-400"
                    : "text-green-500 hover:text-green-400"
                }`}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={resetSimulation}
                className="text-text-200 hover:text-primary-light"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              <div className="h-6 w-px bg-bg-300/50"></div>

              <div className="flex items-center gap-2 px-2">
                <Timer className="h-3 w-3 text-text-200" />
                <span className="text-xs text-text-200">Velocidad:</span>
                <Select
                  value={simulationSpeed.toString()}
                  onValueChange={(v) => setSimulationSpeed(parseFloat(v))}
                >
                  <SelectTrigger className="h-7 w-20 bg-bg-300/50 border-bg-300/70 text-text-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                    <SelectItem value="5">5x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFullscreen(!fullscreen)}
              className="text-text-200 hover:text-primary-light"
            >
              {fullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Escenarios rápidos */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-text-200">
              Escenarios predefinidos:
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              const isActive = activeScenario?.id === scenario.id;

              return (
                <button
                  key={scenario.id}
                  onClick={() => applyScenario(scenario)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                    isActive
                      ? `${scenario.bgColor} ${scenario.borderColor} ${scenario.color}`
                      : "border-bg-300/50 bg-bg-300/20 hover:border-primary/30 text-text-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isActive ? scenario.bgColor : "bg-bg-300/30"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isActive ? scenario.color : "text-text-200"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-medium truncate ${
                          isActive ? scenario.color : "text-text-100"
                        }`}
                      >
                        {scenario.name}
                      </div>
                      <div className="text-xs truncate opacity-80">
                        {scenario.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="ml-2">
                        <div className="h-2 w-2 bg-primary-light rounded-full animate-ping"></div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de control - Izquierda */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary-light" />
                  Variables Ajustables
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cambio en Ingresos */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-text-200">Ingresos</Label>
                    <Badge
                      className={
                        incomeChange > 0
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    >
                      {formatPercent(incomeChange)}
                    </Badge>
                  </div>
                  <Slider
                    value={[incomeChange]}
                    onValueChange={([value]) => setIncomeChange(value)}
                    min={-20}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-text-200">
                    <span>-20%</span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Cambio mensual
                    </span>
                    <span>+50%</span>
                  </div>
                </div>

                {/* Reducción de Gastos */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-text-200">Reducción Gastos</Label>
                    <Badge className="bg-red-500/20 text-red-400">
                      -{expenseReduction}%
                    </Badge>
                  </div>
                  <Slider
                    value={[expenseReduction]}
                    onValueChange={([value]) => setExpenseReduction(value)}
                    min={0}
                    max={40}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-text-200">
                    <span>0%</span>
                    <span className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      Optimización
                    </span>
                    <span>40%</span>
                  </div>
                </div>

                {/* Tasa de Ahorro */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-text-200">Tasa de Ahorro</Label>
                    <Badge className="bg-primary/20 text-primary-light">
                      +{savingsRate}%
                    </Badge>
                  </div>
                  <Slider
                    value={[savingsRate]}
                    onValueChange={([value]) => setSavingsRate(value)}
                    min={0}
                    max={30}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-text-200">
                    <span>0%</span>
                    <span className="flex items-center gap-1">
                      <Scale className="h-3 w-3" />
                      del ingreso
                    </span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Retorno de Inversión */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-text-200">Retorno Inversión</Label>
                    <Badge className="bg-accent/20 text-accent">
                      {investmentReturn}% anual
                    </Badge>
                  </div>
                  <Slider
                    value={[investmentReturn]}
                    onValueChange={([value]) => setInvestmentReturn(value)}
                    min={0}
                    max={15}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-text-200">
                    <span>0%</span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Interés compuesto
                    </span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Duración */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-text-200">Duración Simulación</Label>
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                      {simulationTime} meses
                    </Badge>
                  </div>
                  <Slider
                    value={[simulationTime]}
                    onValueChange={([value]) => setSimulationTime(value)}
                    min={6}
                    max={60}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-text-200">
                    <span>6 meses</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Horizonte
                    </span>
                    <span>5 años</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acciones rápidas */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={saveCustomScenario}
                className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 text-primary-light hover:bg-primary/10"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Resultados - Centro y Derecha */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resumen de resultados */}
            {simulationResults && (
              <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-text-200">Ahorro Total</div>
                      <div className="text-3xl font-bold text-primary-light mt-2">
                        {formatCurrency(simulationResults.summary.finalSavings)}
                      </div>
                      <div className="text-xs text-green-400 mt-1 flex items-center justify-center">
                        <TrendingUp className="h-3 w-3 mr-1" />+
                        {formatCurrency(simulationResults.summary.improvement)}{" "}
                        vs línea base
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-text-200">Mejora</div>
                      <div className="text-3xl font-bold text-green-400 mt-2">
                        +
                        {simulationResults.summary.improvementPercent.toFixed(
                          1
                        )}
                        %
                      </div>
                      <div className="text-xs text-text-200 mt-1">
                        vs escenario actual
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-text-200">
                        Crecimiento Inversión
                      </div>
                      <div className="text-3xl font-bold text-accent mt-2">
                        {formatCurrency(
                          simulationResults.summary.investmentGrowth
                        )}
                      </div>
                      <div className="text-xs text-text-200 mt-1">
                        {simulationResults.config.investmentReturn}% retorno
                        anual
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Impacto en metas */}
            {simulationResults && (
              <Card className="border-0 bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                <CardHeader>
                  <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary-light" />
                    Impacto en Tus Metas
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Cómo este escenario afectaría el tiempo de tus objetivos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {simulationResults.goalsImpact.map(
                      (goal: any, index: number) => {
                        const progressPercentage =
                          (goal.newTime / goal.originalTime) * 100;
                        const timeSaved = goal.originalTime - goal.newTime;

                        // Determinar color basado en la aceleración
                        let progressColor = "";
                        let badgeColor = "";

                        if (goal.acceleration >= 30) {
                          progressColor =
                            "from-primary-light via-primary to-primary-bright";
                          badgeColor =
                            "bg-primary-light/20 text-primary-bright";
                        } else if (goal.acceleration >= 15) {
                          progressColor =
                            "from-primary/90 via-primary-light to-primary";
                          badgeColor = "bg-primary/20 text-primary-light";
                        } else {
                          progressColor =
                            "from-accent-dark via-accent to-accent-dark";
                          badgeColor = "bg-accent/20 text-accent";
                        }

                        return (
                          <div
                            key={index}
                            className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <div className="font-medium text-text-100">
                                  {goal.name}
                                </div>
                                <div className="text-xs text-text-200">
                                  Reducción de tiempo estimada
                                </div>
                              </div>
                              <Badge className={badgeColor}>
                                -{goal.acceleration}%
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-text-200">
                                  {goal.originalTime}
                                  <span className="text-sm font-normal ml-1">
                                    meses
                                  </span>
                                </div>
                                <div className="text-xs text-text-200/70">
                                  tiempo actual
                                </div>
                              </div>

                              <div className="flex-1 px-4">
                                {/* Barra de progreso simplificada y mejorada */}
                                <div className="relative h-3 w-full bg-bg-300/50 rounded-full overflow-hidden">
                                  {/* Fondo de la barra completa */}
                                  <div className="absolute inset-0 bg-bg-300/30" />

                                  {/* Progreso con gradiente sutil */}
                                  <div
                                    className={`absolute h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-500`}
                                    style={{ width: `${progressPercentage}%` }}
                                  />

                                  {/* Línea divisoria en el 50% */}
                                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-text-100/20" />
                                </div>

                                {/* Etiquetas de extremos */}
                                <div className="flex justify-between mt-1 text-xs text-text-200/70">
                                  <span>Más rápido</span>
                                  <span>Más lento</span>
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary-light">
                                  {goal.newTime}
                                  <span className="text-sm font-normal ml-1">
                                    meses
                                  </span>
                                </div>
                                <div className="text-xs text-text-200/70">
                                  tiempo nuevo
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="text-sm text-text-200">
                                <span className="text-primary-light font-medium">
                                  Ahorras {timeSaved} meses
                                </span>
                                {goal.acceleration >= 30 && (
                                  <span className="ml-2 text-primary-bright">
                                    🚀 ¡Gran mejora!
                                  </span>
                                )}
                              </div>

                              {/* Indicador visual del progreso */}
                              <div className="flex items-center gap-1 text-xs text-text-200/70">
                                <div className="h-2 w-2 rounded-full bg-primary-light" />
                                <span>
                                  {progressPercentage.toFixed(0)}% del tiempo
                                  original
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comparativa detallada */}
            <Card className="border-0 bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                    Comparativa Detallada
                  </CardTitle>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="show-comparison"
                      checked={showComparison}
                      onCheckedChange={setShowComparison}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label
                      htmlFor="show-comparison"
                      className="text-sm text-text-200 cursor-pointer"
                    >
                      Mostrar comparativa
                    </Label>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {showComparison && simulationResults && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                        <div className="text-sm text-text-200 mb-1">
                          Ingreso Mensual
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-green-400">
                            {formatCurrency(
                              simulationResults.summary.monthlyIncome
                            )}
                          </div>
                          <div className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                            +{simulationResults.config.incomeChange}%
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
                        <div className="text-sm text-text-200 mb-1">
                          Gasto Mensual
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-red-400">
                            {formatCurrency(
                              simulationResults.summary.monthlyExpenses
                            )}
                          </div>
                          <div className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">
                            -{simulationResults.config.expenseReduction}%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <Lightbulb className="h-5 w-5 text-primary-light" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-100">
                            Insight de IA
                          </h4>
                          <p className="text-sm text-text-200 mt-1">
                            Este escenario podría generarte{" "}
                            <span className="text-green-400 font-bold">
                              {formatCurrency(
                                simulationResults.summary.improvement
                              )}
                            </span>{" "}
                            adicionales en {simulationResults.config.duration}{" "}
                            meses. La mayor ganancia proviene de{" "}
                            {simulationResults.config.expenseReduction >
                            simulationResults.config.incomeChange
                              ? "la reducción de gastos"
                              : "el aumento de ingresos"}
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!showComparison && (
                  <div className="text-center py-8">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 inline-block mb-4">
                      <LineChart className="h-12 w-12 text-text-200/50" />
                    </div>
                    <p className="text-text-200">
                      Activa la comparativa para ver análisis detallado
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioSimulator;
