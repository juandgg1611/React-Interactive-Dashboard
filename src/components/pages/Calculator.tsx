// src/pages/Calculator.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Calculator as CalcIcon,
  Brain,
  Zap,
  History,
  Settings,
  TrendingUp,
  Clock,
  BarChart3,
  Sparkles,
  Shield,
  Database,
  Cpu,
  Battery,
  Wifi,
  Signal,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import Layout from "../layout/Layout";
import CalculatorDisplay from "../calculator/CalculatorDisplay";
import CalculatorButtons from "../calculator/CalculatorButtons";
import {
  evaluateExpression,
  calculateFunction,
  formatNumber,
} from "../../utils/calculatorEngine";

// Definición de tipos
interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
  type: "basic" | "scientific" | "financial";
}

interface MemoryState {
  value: number;
  lastUsed: Date | null;
}

const Calculator = () => {
  // Estados principales
  const [displayValue, setDisplayValue] = useState("0");
  const [displayHistory, setDisplayHistory] = useState("");
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string>("");
  const [isError, setIsError] = useState(false);

  // Memoria y historial
  const [memory, setMemory] = useState<MemoryState>({
    value: 0,
    lastUsed: null,
  });
  const [calculationHistory, setCalculationHistory] = useState<
    CalculationHistory[]
  >([]);
  const [memoryHistory, setMemoryHistory] = useState<number[]>([]);

  // Estadísticas
  const [totalCalculations, setTotalCalculations] = useState(0);
  const [sessionStart] = useState(new Date());
  const [lastCalculationTime, setLastCalculationTime] = useState<Date | null>(
    null,
  );

  // Configuración
  const [isScientificMode, setIsScientificMode] = useState(false);
  const [activeTab, setActiveTab] = useState("calculator");
  const [systemTime, setSystemTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [cpuUsage, setCpuUsage] = useState(12);
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);

  // Efectos
  useEffect(() => {
    // Actualizar hora del sistema
    const timeInterval = setInterval(() => setSystemTime(new Date()), 1000);

    // Simular métricas del sistema
    const metricsInterval = setInterval(() => {
      setBatteryLevel((prev) =>
        Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 2)),
      );
      setCpuUsage((prev) =>
        Math.max(5, Math.min(80, prev + (Math.random() - 0.5) * 5)),
      );
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  // Efecto para limpiar display después de error
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        if (isError) {
          handleClear();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  // ========== FUNCIONES PRINCIPALES ==========

  const handleNumber = useCallback(
    (num: string) => {
      if (isError) {
        setDisplayValue(num);
        setDisplayHistory("");
        setIsError(false);
        return;
      }

      if (displayValue === "0" || currentOperation) {
        setDisplayValue(num);
        setDisplayHistory(
          currentOperation
            ? `${previousValue} ${currentOperation} ${num}`
            : num,
        );
      } else {
        setDisplayValue((prev) => prev + num);
        setDisplayHistory((prev) => prev + num);
      }

      setCurrentOperation(null);
    },
    [isError, displayValue, currentOperation, previousValue],
  );

  const handleOperation = useCallback(
    (operation: string) => {
      if (isError) return;

      setPreviousValue(displayValue);
      setCurrentOperation(operation);
      setDisplayHistory(`${displayValue} ${operation}`);
    },
    [isError, displayValue],
  );

  const handleEquals = useCallback(() => {
    if (!currentOperation || isError) return;

    try {
      const expression = `${previousValue} ${currentOperation} ${displayValue}`;
      const result = evaluateExpression(expression);
      const formattedResult = formatNumber(result);

      // Actualizar historial
      const newHistoryItem: CalculationHistory = {
        id: Date.now().toString(),
        expression,
        result: formattedResult,
        timestamp: new Date(),
        type: isScientificMode ? "scientific" : "basic",
      };

      setCalculationHistory((prev) => [newHistoryItem, ...prev].slice(0, 50));
      setTotalCalculations((prev) => prev + 1);
      setLastCalculationTime(new Date());

      // Actualizar display
      setDisplayValue(formattedResult);
      setDisplayHistory(expression);
      setIsError(false);
      setCurrentOperation(null);
      setPreviousValue("");
    } catch (error) {
      setDisplayValue("Error");
      setDisplayHistory("");
      setIsError(true);
    }
  }, [
    currentOperation,
    previousValue,
    displayValue,
    isError,
    isScientificMode,
  ]);

  const handleClear = useCallback(() => {
    setDisplayValue("0");
    setDisplayHistory("");
    setCurrentOperation(null);
    setPreviousValue("");
    setIsError(false);
  }, []);

  const handleClearEntry = useCallback(() => {
    setDisplayValue("0");
    setIsError(false);
  }, []);

  const handleBackspace = useCallback(() => {
    if (isError || displayValue === "0") {
      handleClear();
      return;
    }

    if (displayValue.length === 1) {
      setDisplayValue("0");
    } else {
      setDisplayValue((prev) => prev.slice(0, -1));
    }
  }, [isError, displayValue, handleClear]);

  const handleMemory = useCallback(
    (action: string) => {
      const currentNum = parseFloat(displayValue) || 0;

      switch (action) {
        case "add":
          setMemory((prev) => ({
            value: prev.value + currentNum,
            lastUsed: new Date(),
          }));
          setMemoryHistory((prev) => [...prev, currentNum].slice(-10));
          break;

        case "subtract":
          setMemory((prev) => ({
            value: prev.value - currentNum,
            lastUsed: new Date(),
          }));
          setMemoryHistory((prev) => [...prev, -currentNum].slice(-10));
          break;

        case "recall":
          setDisplayValue(memory.value.toString());
          setDisplayHistory("");
          setIsError(false);
          break;

        case "clear":
          setMemory({ value: 0, lastUsed: null });
          setMemoryHistory([]);
          break;
      }
    },
    [displayValue, memory.value],
  );

  const handleDecimal = useCallback(() => {
    if (isError) {
      setDisplayValue("0.");
      setDisplayHistory("");
      setIsError(false);
      return;
    }

    if (!displayValue.includes(".")) {
      setDisplayValue((prev) => prev + ".");
    }
  }, [isError, displayValue]);

  const handlePercentage = useCallback(() => {
    if (isError) return;

    const value = parseFloat(displayValue) / 100;
    setDisplayValue(value.toString());
    setDisplayHistory("");
  }, [isError, displayValue]);

  const handleToggleSign = useCallback(() => {
    if (isError) return;

    const value = parseFloat(displayValue) * -1;
    setDisplayValue(value.toString());
  }, [isError, displayValue]);

  const handleScientificFunction = useCallback(
    (func: string) => {
      if (isError) return;

      try {
        const value = parseFloat(displayValue);
        const result = calculateFunction(func, value);
        const formattedResult = formatNumber(result);

        // Actualizar historial
        const newHistoryItem: CalculationHistory = {
          id: Date.now().toString(),
          expression: `${func}(${displayValue})`,
          result: formattedResult,
          timestamp: new Date(),
          type: "scientific",
        };

        setCalculationHistory((prev) => [newHistoryItem, ...prev].slice(0, 50));
        setTotalCalculations((prev) => prev + 1);
        setLastCalculationTime(new Date());

        // Actualizar display
        setDisplayValue(formattedResult);
        setDisplayHistory(`${func}(${displayValue})`);
        setIsError(false);
      } catch (error) {
        setDisplayValue("Error");
        setDisplayHistory("");
        setIsError(true);
      }
    },
    [isError, displayValue],
  );

  // ========== FUNCIONES ADICIONALES ==========

  const handleCopyResult = useCallback(() => {
    navigator.clipboard.writeText(displayValue);
    // Podrías mostrar un toast de confirmación aquí
  }, [displayValue]);

  const handleClearHistory = useCallback(() => {
    setCalculationHistory([]);
    setTotalCalculations(0);
  }, []);

  const handleButtonClick = useCallback(
    (value: string) => {
      console.log("Button clicked:", value);

      // Determinar qué tipo de botón es
      if (/[0-9]/.test(value)) {
        handleNumber(value);
      } else if (["+", "-", "*", "/"].includes(value)) {
        handleOperation(value);
      } else if (value === "=") {
        handleEquals();
      } else if (value === "C" || value === "CE") {
        handleClear();
      } else if (value === "⌫") {
        handleBackspace();
      } else if (["M+", "M-", "MR", "MC"].includes(value)) {
        handleMemory(value);
      } else if (value === ".") {
        handleDecimal();
      } else if (value === "%") {
        handlePercentage();
      } else {
        // Para funciones científicas
        handleScientificFunction(value);
      }
    },
    [
      handleNumber,
      handleOperation,
      handleEquals,
      handleClear,
      handleBackspace,
      handleMemory,
      handleDecimal,
      handlePercentage,
      handleScientificFunction,
    ],
  );

  const handleExportHistory = useCallback(() => {
    const historyText = calculationHistory
      .map((item) => `${item.expression} = ${item.result}`)
      .join("\n");

    const blob = new Blob([historyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calculations_${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [calculationHistory]);

  // Calcular estadísticas
  const getSessionDuration = () => {
    const duration = new Date().getTime() - sessionStart.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getAverageCalculationTime = () => {
    if (totalCalculations === 0) return "0s";
    const duration = lastCalculationTime
      ? (new Date().getTime() - lastCalculationTime.getTime()) / 1000
      : 0;
    return `${(duration / totalCalculations).toFixed(2)}s`;
  };

  // ========== RENDER ==========

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Header principal */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-primary-200/5 to-primary-300/3 rounded-2xl blur-xl"></div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary-200/20 to-primary-100/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-primary-300/10 border border-primary-200/30 shadow-lg shadow-primary-200/15 backdrop-blur-sm">
                      <CalcIcon className="h-8 w-8 text-primary-200 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>

                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                      Calculadora{" "}
                      <span className="text-primary-200">Avanzada</span>
                    </h1>
                    <p className="text-text-200/80 mt-2 max-w-2xl">
                      Herramienta matemática completa con funciones científicas,
                      memoria y análisis estadístico
                    </p>
                  </div>
                </div>

                {/* Stats en tiempo real */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <Database className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      {totalCalculations} cálculos
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <Clock className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      {getSessionDuration()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <TrendingUp className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      {getAverageCalculationTime()} avg
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAdvancedStats(!showAdvancedStats)}
                    className="text-primary-200 hover:text-primary-300 hover:bg-primary-200/10"
                  >
                    {showAdvancedStats ? "Ocultar stats" : "Mostrar stats"}
                  </Button>
                </div>
              </div>

              {/* Indicadores de sistema */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 text-sm bg-bg-200/40 backdrop-blur-md rounded-xl px-4 py-3 border border-bg-300/50 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-primary-200" />
                      <span className="text-text-200">{cpuUsage}%</span>
                    </div>
                    <div className="h-4 w-px bg-bg-300/50"></div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-primary-200" />
                      <span className="text-text-200">{batteryLevel}%</span>
                    </div>
                    <div className="h-4 w-px bg-bg-300/50"></div>
                    <div className="text-text-200">
                      {systemTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setIsScientificMode(!isScientificMode)}
                    variant="outline"
                    className={cn(
                      "border-primary-200/30 transition-all duration-300",
                      isScientificMode
                        ? "bg-primary-200/10 text-primary-200"
                        : "text-primary-200 hover:bg-primary-200/10",
                    )}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    {isScientificMode ? "Científica" : "Básica"}
                  </Button>

                  <Button
                    onClick={handleCopyResult}
                    className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/30"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                </div>
              </div>
            </div>

            {/* Estadísticas avanzadas */}
            {showAdvancedStats && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-text-100">
                      {totalCalculations}
                    </div>
                    <div className="text-sm text-text-200">Total cálculos</div>
                    <Progress
                      value={totalCalculations % 100}
                      className="h-1 mt-2 bg-bg-300/50"
                    >
                      <div className="h-full bg-gradient-to-r from-primary-100 to-primary-200 rounded-full"></div>
                    </Progress>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-text-100">
                      {calculationHistory.length}
                    </div>
                    <div className="text-sm text-text-200">En historial</div>
                    <div className="text-xs text-text-200/70 mt-1">
                      Último:{" "}
                      {lastCalculationTime
                        ? lastCalculationTime.toLocaleTimeString()
                        : "N/A"}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-text-100">
                      {memory.value.toFixed(2)}
                    </div>
                    <div className="text-sm text-text-200">Memoria</div>
                    <div className="text-xs text-text-200/70 mt-1">
                      {memory.lastUsed
                        ? `Usado: ${memory.lastUsed.toLocaleTimeString()}`
                        : "No usado"}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-text-100">
                      {getAverageCalculationTime()}
                    </div>
                    <div className="text-sm text-text-200">Tiempo promedio</div>
                    <div className="text-xs text-text-200/70 mt-1">
                      Sesión: {getSessionDuration()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Contenido principal con tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full md:w-auto grid-cols-3 bg-bg-200/40 backdrop-blur-md border border-bg-300/40 p-1 rounded-2xl shadow-lg">
            <TabsTrigger
              value="calculator"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <CalcIcon className="h-4 w-4 mr-2" />
              Calculadora
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <History className="h-4 w-4 mr-2" />
              Historial
              <Badge className="ml-2 bg-primary-200/20 text-primary-200 text-xs">
                {calculationHistory.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="memory"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Database className="h-4 w-4 mr-2" />
              Memoria
              {memory.value !== 0 && (
                <Badge className="ml-2 bg-primary-200/20 text-primary-200 text-xs">
                  {memory.value.toFixed(1)}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ========== TAB: CALCULADORA ========== */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Panel izquierdo - Calculadora principal */}
              <div className="lg:col-span-2">
                <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40 shadow-xl overflow-hidden">
                  <CardHeader className="border-b border-bg-300/40">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-text-100 flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary-200" />
                        {isScientificMode
                          ? "Calculadora Científica"
                          : "Calculadora Básica"}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn(
                            "border",
                            isError
                              ? "bg-red-500/20 text-red-400 border-red-500/30"
                              : "bg-green-500/20 text-green-400 border-green-500/30",
                          )}
                        >
                          {isError ? "Error" : "Operativo"}
                        </Badge>
                        <Shield className="h-4 w-4 text-text-200/60" />
                      </div>
                    </div>
                    <CardDescription className="text-text-200">
                      Sistema de cálculo preciso con validación matemática
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    {/* Display PRINCIPAL - Este es el único display que debe mostrarse */}
                    <div className="mb-6">
                      <div className="relative p-6 rounded-2xl border-2 backdrop-blur-md overflow-hidden group border-primary-200/40 bg-gradient-to-br from-primary-100/5 via-primary-200/3 to-primary-300/2 shadow-lg shadow-primary-100/10">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-primary-200/5 to-primary-300/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>
                        <div className="relative">
                          {/* Línea de historial/expresión */}
                          <div className="text-right text-text-200/70 text-sm sm:text-base mb-2 h-6 overflow-hidden font-mono">
                            {displayHistory || " "}
                          </div>
                          {/* Línea principal del resultado */}
                          <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-right font-mono transition-all duration-300 text-text-100">
                            {displayValue}
                          </div>
                          <div className="absolute bottom-0 left-0 flex items-center gap-2 mt-2">
                            {/* Indicador de error si existe */}
                            {isError && (
                              <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
                                Error
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botones - CON hideInternalDisplay=true para ocultar displays internos */}
                    <CalculatorButtons
                      onNumberClick={handleNumber}
                      onOperationClick={handleOperation}
                      onFunctionClick={handleScientificFunction}
                      onEqualsClick={handleEquals}
                      onClearClick={handleClear}
                      onClearEntryClick={handleClearEntry}
                      onBackspaceClick={handleBackspace}
                      onMemoryClick={handleMemory}
                      onDecimalClick={handleDecimal}
                      onToggleSignClick={handleToggleSign}
                      onPercentageClick={handlePercentage}
                      onScientificFunctionClick={handleScientificFunction}
                      // Estados
                      currentOperation={currentOperation}
                      memoryValue={memory.value}
                      isErrorState={isError}
                      currentResult={displayValue}
                      // Nuevos props necesarios
                      displayValue={displayValue}
                      history={displayHistory}
                      onButtonClick={handleButtonClick}
                      onBackspace={handleBackspace}
                      // Configuraciones
                      initialLayout={isScientificMode ? "scientific" : "basic"}
                      initialButtonSize="normal"
                      initialShowLabels={isScientificMode}
                      initialAnimateButtons={true}
                      // ESTA ES LA CLAVE: Ocultar displays internos
                      hideInternalDisplay={true}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Panel derecho - Información y ayuda */}
              <div className="space-y-6">
                {/* Guía rápida */}
                <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-text-100 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary-200" />
                      Guía Rápida
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Atajos y funciones principales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-bg-300/20 border border-bg-300/40">
                        <div className="text-sm font-medium text-text-100 mb-2">
                          Atajos de teclado
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-text-200/70">Números:</div>
                          <div className="text-text-100">0-9</div>
                          <div className="text-text-200/70">Operaciones:</div>
                          <div className="text-text-100">+, -, *, /</div>
                          <div className="text-text-200/70">Calcular:</div>
                          <div className="text-text-100">Enter o =</div>
                          <div className="text-text-200/70">Limpiar:</div>
                          <div className="text-text-100">Escape</div>
                          <div className="text-text-200/70">Borrar:</div>
                          <div className="text-text-100">Backspace</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-bg-300/20 border border-bg-300/40">
                        <div className="text-sm font-medium text-text-100 mb-2">
                          Memoria
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-text-200/70">M+</span>
                            <span className="text-text-100">
                              Añadir a memoria
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-text-200/70">MR</span>
                            <span className="text-text-100">
                              Recordar memoria
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-text-200/70">MC</span>
                            <span className="text-text-100">
                              Limpiar memoria
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Estado actual */}
                <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-text-100">
                      Estado Actual
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-text-200 mb-2">
                        Operación en curso
                      </div>
                      <div className="font-medium text-text-100 bg-bg-300/20 p-2 rounded-lg">
                        {currentOperation
                          ? `${previousValue} ${currentOperation} ${displayValue}`
                          : "Ninguna operación pendiente"}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-text-200 mb-2">
                        Modo activo
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn(
                            "border",
                            isScientificMode
                              ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                              : "bg-primary-200/20 text-primary-200 border-primary-200/30",
                          )}
                        >
                          {isScientificMode ? "Científico" : "Básico"}
                        </Badge>
                        <span className="text-xs text-text-200/70">
                          {isScientificMode
                            ? "Funciones avanzadas"
                            : "Operaciones estándar"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-bg-300/40">
                      <div className="text-sm text-text-200 mb-2">
                        Rendimiento
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-200/70">
                            CPU Calculadora
                          </span>
                          <span className="text-xs font-medium text-text-100">
                            {cpuUsage}%
                          </span>
                        </div>
                        <Progress
                          value={cpuUsage}
                          className="h-1.5 bg-bg-300/50"
                        >
                          <div className="h-full bg-gradient-to-r from-primary-100 to-primary-200 rounded-full"></div>
                        </Progress>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ========== TAB: HISTORIAL ========== */}
          <TabsContent value="history" className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-text-100 flex items-center gap-2">
                      <History className="h-5 w-5 text-primary-200" />
                      Historial de Cálculos
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      {calculationHistory.length} operaciones registradas
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearHistory}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                      disabled={calculationHistory.length === 0}
                    >
                      Limpiar historial
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportHistory}
                      className="border-primary-200/30 text-primary-200 hover:bg-primary-200/10"
                      disabled={calculationHistory.length === 0}
                    >
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {calculationHistory.length > 0 ? (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {calculationHistory.map((item, index) => (
                      <div
                        key={item.id}
                        className={cn(
                          "p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01]",
                          index === 0
                            ? "bg-gradient-to-r from-primary-100/10 to-primary-200/5 border-primary-200/30"
                            : "bg-bg-300/10 border-bg-300/40",
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                className={cn(
                                  "text-xs",
                                  item.type === "scientific"
                                    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                    : "bg-primary-200/20 text-primary-200 border-primary-200/30",
                                )}
                              >
                                {item.type === "scientific"
                                  ? "Científica"
                                  : "Básica"}
                              </Badge>
                              <span className="text-xs text-text-200/70">
                                {item.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="font-mono text-sm text-text-200 mb-1">
                              {item.expression}
                            </div>
                            <div className="text-2xl font-bold text-primary-200">
                              = {item.result}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDisplayValue(item.result)}
                            className="h-8 w-8 p-0 text-text-200 hover:text-primary-200 hover:bg-primary-200/10"
                          >
                            ↻
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <History className="h-16 w-16 text-text-200/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-100 mb-2">
                      Historial vacío
                    </h3>
                    <p className="text-text-200 max-w-md mx-auto">
                      Realiza algunos cálculos para ver tu historial aquí
                    </p>
                  </div>
                )}
              </CardContent>
              {calculationHistory.length > 0 && (
                <CardFooter className="border-t border-bg-300/40">
                  <div className="w-full text-center text-sm text-text-200/70">
                    Mostrando {calculationHistory.length} de {totalCalculations}{" "}
                    cálculos totales
                  </div>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          {/* ========== TAB: MEMORIA ========== */}
          <TabsContent value="memory" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Memoria actual */}
              <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-text-100 flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary-200" />
                    Memoria Activa
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Almacenamiento temporal de valores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center py-4">
                      <div className="text-5xl font-bold text-primary-200 mb-2">
                        {memory.value.toFixed(6)}
                      </div>
                      <div className="text-sm text-text-200">
                        Valor almacenado en memoria
                      </div>
                      {memory.lastUsed && (
                        <div className="text-xs text-text-200/70 mt-2">
                          Último uso: {memory.lastUsed.toLocaleTimeString()}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => handleMemory("recall")}
                        className="bg-gradient-to-r from-primary-100/20 to-primary-200/10 border border-primary-200/30 text-primary-200 hover:bg-primary-200/20"
                        disabled={memory.value === 0}
                      >
                        Recuperar (MR)
                      </Button>
                      <Button
                        onClick={() => handleMemory("clear")}
                        className="bg-gradient-to-r from-red-500/20 to-red-400/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                        disabled={memory.value === 0}
                      >
                        Limpiar (MC)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Historial de memoria */}
              <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-text-100">
                    Historial de Memoria
                  </CardTitle>
                  <CardDescription className="text-text-200">
                    Últimas operaciones con memoria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {memoryHistory.length > 0 ? (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {memoryHistory.map((value, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-bg-300/10 border border-bg-300/40"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full",
                                value >= 0 ? "bg-green-500" : "bg-red-500",
                              )}
                            />
                            <div>
                              <div className="text-sm font-medium text-text-100">
                                {value >= 0 ? "M+" : "M-"}
                              </div>
                              <div className="text-xs text-text-200/70">
                                {index === memoryHistory.length - 1
                                  ? "Más reciente"
                                  : ""}
                              </div>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "text-lg font-bold",
                              value >= 0 ? "text-green-400" : "text-red-400",
                            )}
                          >
                            {value >= 0 ? "+" : ""}
                            {value.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Database className="h-12 w-12 text-text-200/30 mx-auto mb-4" />
                      <p className="text-text-200">
                        No hay operaciones recientes con memoria
                      </p>
                    </div>
                  )}

                  {memoryHistory.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-bg-300/40">
                      <div className="text-sm text-text-200 mb-2">
                        Suma total en historial
                      </div>
                      <div className="text-2xl font-bold text-primary-200">
                        {memoryHistory
                          .reduce((sum, val) => sum + val, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-bg-300/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-text-200/70">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary-200 rounded-full animate-pulse"></div>
                  <span className="text-sm">Calculadora avanzada</span>
                </div>
                <div className="h-4 w-px bg-bg-300/50"></div>
                <span className="text-sm">
                  Última actualización:{" "}
                  {systemTime.toLocaleTimeString([], {
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
                className="text-text-200 hover:text-primary-200 hover:bg-primary-200/10"
                onClick={() => setActiveTab("calculator")}
              >
                <CalcIcon className="h-4 w-4 mr-2" />
                Ir a calculadora
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/60 text-text-200 hover:text-primary-200 hover:border-primary-200/50"
                onClick={handleClearHistory}
                disabled={calculationHistory.length === 0}
              >
                Limpiar todo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Función de utilidad para cn (className condicional)
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default Calculator;
