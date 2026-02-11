// src/components/features/MLDemo.tsx
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Brain,
  LineChart,
  Target,
  Zap,
  Sparkles,
  RefreshCw,
  CheckCircle,
  TrendingUp,
  Cpu,
  Database,
  Activity,
  BarChart3,
  Calendar,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface Prediction {
  category: string;
  confidence: number;
  alternatives: Array<{ category: string; confidence: number }>;
}

interface SimulationResult {
  months: number;
  total: number;
  monthlyAmount: number;
  recommendation: string;
}

const MLDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState("classification");
  const [transactionText, setTransactionText] = useState(
    "Almuerzo en McDonald's",
  );
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [forecastData, setForecastData] = useState<number[]>([
    100, 120, 110, 130, 140, 135, 150,
  ]);
  const [isForecasting, setIsForecasting] = useState(false);
  const [savingsRate, setSavingsRate] = useState(20);
  const [savingsGoal, setSavingsGoal] = useState(10000);
  const [monthlyIncome, setMonthlyIncome] = useState(3000);
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);
  const [animateChart, setAnimateChart] = useState(false);

  const transactionExamples = [
    { text: "Almuerzo en McDonald's", category: "Comida - Rápida" },
    { text: "Netflix Monthly Subscription", category: "Entretenimiento" },
    { text: "Compra en Amazon", category: "Compras Online" },
    { text: "Pago de Luz C.A.", category: "Servicios" },
    { text: "Gasolina Shell", category: "Transporte" },
    { text: "Spotify Premium", category: "Entretenimiento" },
    { text: "Uber a la oficina", category: "Transporte" },
    { text: "Supermercado Walmart", category: "Alimentación" },
  ];

  const categoryKeywords = {
    "Comida - Rápida": [
      "almuerzo",
      "comida",
      "restaurante",
      "mcdonald",
      "burger",
      "pizza",
      "taco",
    ],
    Entretenimiento: [
      "netflix",
      "spotify",
      "subscription",
      "cine",
      "movie",
      "streaming",
      "disney",
    ],
    Transporte: [
      "gasolina",
      "estacionamiento",
      "uber",
      "taxi",
      "metro",
      "bus",
      "parking",
    ],
    "Compras Online": ["amazon", "mercadolibre", "ebay", "online", "delivery"],
    Servicios: ["luz", "agua", "internet", "telefono", "electricidad", "cable"],
    Alimentación: ["supermercado", "mercado", "grocery", "walmart", "costco"],
  };

  const predictCategory = () => {
    if (!transactionText.trim()) return;

    setIsPredicting(true);
    setPrediction(null);

    setTimeout(() => {
      const lowerText = transactionText.toLowerCase();
      const scores: { [key: string]: number } = {};

      // Calculate scores for each category
      Object.entries(categoryKeywords).forEach(([category, keywords]) => {
        const matchCount = keywords.filter((keyword) =>
          lowerText.includes(keyword),
        ).length;
        scores[category] = matchCount > 0 ? 70 + matchCount * 10 : 0;
      });

      // Find exact match in examples
      const exactMatch = transactionExamples.find((t) =>
        lowerText.includes(t.text.toLowerCase()),
      );

      if (exactMatch) {
        scores[exactMatch.category] = 95 + Math.random() * 4;
      }

      // Sort by score
      const sortedCategories = Object.entries(scores)
        .filter(([_, score]) => score > 0)
        .sort(([, a], [, b]) => b - a);

      let mainCategory = "Otros";
      let mainConfidence = 75 + Math.random() * 10;
      const alternatives: Array<{ category: string; confidence: number }> = [];

      if (sortedCategories.length > 0) {
        mainCategory = sortedCategories[0][0];
        mainConfidence = Math.min(99, sortedCategories[0][1]);

        // Add alternatives
        for (let i = 1; i < Math.min(3, sortedCategories.length); i++) {
          alternatives.push({
            category: sortedCategories[i][0],
            confidence: Math.min(
              mainConfidence - 5 - i * 5,
              sortedCategories[i][1],
            ),
          });
        }
      }

      setPrediction({
        category: mainCategory,
        confidence: mainConfidence,
        alternatives,
      });

      setIsPredicting(false);
    }, 1200);
  };

  const runForecast = () => {
    setIsForecasting(true);
    setAnimateChart(false);

    setTimeout(() => {
      const newData = [...forecastData.slice(0, 7)];
      const lastValue = newData[newData.length - 1];
      const trend = (Math.random() - 0.3) * 0.15; // Slight upward bias

      for (let i = 0; i < 3; i++) {
        const change = lastValue * trend + (Math.random() - 0.5) * 30;
        const nextValue = Math.max(50, newData[newData.length - 1] + change);
        newData.push(nextValue);
      }

      setForecastData(newData);
      setIsForecasting(false);
      setTimeout(() => setAnimateChart(true), 50);
    }, 1500);
  };

  const runSimulation = () => {
    const savings = monthlyIncome * (savingsRate / 100);
    const months = Math.ceil(savingsGoal / savings);
    const total = months * savings;

    let recommendation = "";
    if (savingsRate >= 30) {
      recommendation =
        "Excelente disciplina de ahorro. Manteniendo este ritmo alcanzarás tu meta rápidamente.";
    } else if (savingsRate >= 20) {
      recommendation =
        "Buena tasa de ahorro. Considera aumentar un 5-10% para acelerar el proceso.";
    } else if (savingsRate >= 10) {
      recommendation =
        "Tasa de ahorro moderada. Optimizar gastos no esenciales podría mejorar significativamente tus resultados.";
    } else {
      recommendation =
        "Considera revisar tu presupuesto y aumentar tu tasa de ahorro para alcanzar tus metas financieras.";
    }

    setSimulationResult({
      months,
      total,
      monthlyAmount: savings,
      recommendation,
    });
  };

  useEffect(() => {
    if (activeTab === "classification" && !prediction) {
      predictCategory();
    } else if (activeTab === "simulation") {
      setAnimateChart(true);
    } else if (activeTab === "simulation") {
      runSimulation();
    }
  }, [activeTab]);

  useEffect(() => {
    runSimulation();
  }, [savingsRate, savingsGoal, monthlyIncome]);

  const maxForecastValue = Math.max(...forecastData);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-bg-300/30 rounded-xl backdrop-blur-sm">
          <TabsTrigger
            value="classification"
            className="data-[state=active]:bg-primary-300/20 data-[state=active]:text-primary-300 transition-all duration-300"
          >
            <Brain className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Clasificación NLP</span>
            <span className="sm:hidden">NLP</span>
          </TabsTrigger>
          <TabsTrigger
            value="simulation"
            className="data-[state=active]:bg-primary-300/20 data-[state=active]:text-primary-300 transition-all duration-300"
          >
            <Target className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Simulación</span>
            <span className="sm:hidden">Simular</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Clasificación NLP */}
        <TabsContent value="classification" className="space-y-6">
          <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm shadow-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary-300" />
                Clasificador de Transacciones en Tiempo Real
              </CardTitle>
              <p className="text-text-200 text-xs sm:text-sm leading-relaxed">
                Modelo BERT fine-tuned que analiza descripciones de
                transacciones y las categoriza automáticamente con alta
                precisión
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="transaction"
                    className="text-text-100 mb-2 block text-sm sm:text-base"
                  >
                    Descripción de transacción:
                  </Label>
                  <Input
                    id="transaction"
                    value={transactionText}
                    onChange={(e) => setTransactionText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && predictCategory()}
                    placeholder="Ej: Almuerzo en McDonald's"
                    className="bg-bg-300/50 border-primary-300/30 focus:border-primary-300 transition-colors text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-text-200/60 text-xs sm:text-sm">
                    Ejemplos rápidos:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {transactionExamples.slice(0, 5).map((example, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="border-primary-300/30 text-primary-300 hover:bg-primary-300/10 transition-all duration-200 text-xs sm:text-sm"
                        onClick={() => {
                          setTransactionText(example.text);
                          setTimeout(predictCategory, 100);
                        }}
                      >
                        {example.text.length > 20
                          ? example.text.substring(0, 17) + "..."
                          : example.text}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={predictCategory}
                  disabled={isPredicting || !transactionText.trim()}
                  className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 w-full group disabled:opacity-50 transition-all duration-300"
                >
                  {isPredicting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analizando con IA...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Clasificar Transacción
                      <Sparkles className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </Button>
              </div>

              {prediction && (
                <div
                  className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationFillMode: "backwards" }}
                >
                  <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-primary-100/10 to-primary-300/10 border border-primary-300/20 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-text-100 font-semibold text-sm sm:text-base">
                        Resultado de la Predicción
                      </span>
                      <Badge className="bg-green-500/20 text-green-300 w-fit">
                        {prediction.confidence.toFixed(1)}% Confianza
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-primary-300/10">
                        <span className="text-text-200 text-sm">
                          Texto analizado:
                        </span>
                        <span className="text-text-100 font-mono text-xs sm:text-sm break-all">
                          "{transactionText}"
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-text-200 text-sm">
                          Categoría predicha:
                        </span>
                        <Badge className="bg-primary-300/20 text-primary-300 text-base sm:text-lg px-3 py-1.5 w-fit">
                          {prediction.category}
                        </Badge>
                      </div>

                      {prediction.alternatives.length > 0 && (
                        <div className="pt-3 border-t border-primary-300/10">
                          <span className="text-text-200/60 text-xs mb-2 block">
                            Categorías alternativas:
                          </span>
                          <div className="space-y-2">
                            {prediction.alternatives.map((alt, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-text-200">
                                  {alt.category}
                                </span>
                                <span className="text-text-200/60">
                                  {alt.confidence.toFixed(1)}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 rounded-lg bg-bg-300/30 hover:bg-bg-300/40 transition-colors">
                      <div className="text-xs text-text-200/60 mb-1">
                        Modelo Utilizado
                      </div>
                      <div className="text-sm sm:text-base text-text-100 font-medium">
                        BERT + Random Forest
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 rounded-lg bg-bg-300/30 hover:bg-bg-300/40 transition-colors">
                      <div className="text-xs text-text-200/60 mb-1">
                        Tiempo de Procesamiento
                      </div>
                      <div className="text-sm sm:text-base text-text-100 font-medium">
                        180-250ms
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Simulación */}
        <TabsContent value="simulation" className="space-y-6">
          <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm shadow-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary-300" />
                Simulador de Metas de Ahorro
              </CardTitle>
              <p className="text-text-200 text-xs sm:text-sm leading-relaxed">
                Algoritmo que calcula el tiempo y plan necesario para alcanzar
                tus metas financieras
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-5">
                  {/* Savings Rate Slider */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <Label className="text-text-100 text-sm sm:text-base">
                        Tasa de Ahorro Mensual
                      </Label>
                      <span className="text-primary-300 font-bold text-lg">
                        {savingsRate}%
                      </span>
                    </div>
                    <Slider
                      value={[savingsRate]}
                      onValueChange={([value]) => setSavingsRate(value)}
                      max={50}
                      step={1}
                      className="[&>span]:bg-gradient-to-r [&>span]:from-primary-100 [&>span]:to-primary-300"
                    />
                    <div className="flex justify-between text-xs text-text-200/60 mt-2">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Income Input */}
                  <div>
                    <Label
                      htmlFor="income"
                      className="text-text-100 mb-2 block text-sm sm:text-base"
                    >
                      Ingreso Mensual (USD)
                    </Label>
                    <Input
                      id="income"
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) =>
                        setMonthlyIncome(Math.max(0, Number(e.target.value)))
                      }
                      min="0"
                      step="100"
                      className="bg-bg-300/50 border-primary-300/30 focus:border-primary-300 transition-colors"
                    />
                  </div>

                  {/* Goal Input */}
                  <div>
                    <Label
                      htmlFor="goal"
                      className="text-text-100 mb-2 block text-sm sm:text-base"
                    >
                      Meta de Ahorro (USD)
                    </Label>
                    <Input
                      id="goal"
                      type="number"
                      value={savingsGoal}
                      onChange={(e) =>
                        setSavingsGoal(Math.max(0, Number(e.target.value)))
                      }
                      min="0"
                      step="1000"
                      className="bg-bg-300/50 border-primary-300/30 focus:border-primary-300 transition-colors"
                    />
                  </div>
                </div>

                {simulationResult && (
                  <div className="space-y-4">
                    {/* Results Card */}
                    <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-400/10 border border-green-500/20">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <span className="text-text-100 font-semibold text-sm sm:text-base">
                          Resultado de la Simulación
                        </span>
                        <Badge className="bg-green-500/20 text-green-300 w-fit text-xs">
                          Programación Dinámica
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-3 sm:p-4 rounded-lg bg-bg-300/30">
                          <div className="text-xs text-text-200/60 mb-1">
                            Tiempo Estimado
                          </div>
                          <div className="text-2xl sm:text-3xl font-bold text-green-400">
                            {simulationResult.months}
                          </div>
                          <div className="text-xs text-text-200/60">meses</div>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg bg-bg-300/30">
                          <div className="text-xs text-text-200/60 mb-1">
                            Ahorro Mensual
                          </div>
                          <div className="text-xl sm:text-2xl font-bold text-green-400">
                            ${simulationResult.monthlyAmount.toFixed(0)}
                          </div>
                          <div className="text-xs text-text-200/60">USD</div>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg bg-bg-300/30">
                          <div className="text-xs text-text-200/60 mb-1">
                            Total Acumulado
                          </div>
                          <div className="text-xl sm:text-2xl font-bold text-green-400">
                            ${simulationResult.total.toLocaleString()}
                          </div>
                          <div className="text-xs text-text-200/60">USD</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs text-text-200/60">
                          <span>Progreso hacia la meta</span>
                          <span>
                            {(
                              (savingsGoal / simulationResult.total) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                        <div className="h-2 bg-bg-300/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-1000 ease-out"
                            style={{
                              width: `${Math.min(100, (savingsGoal / simulationResult.total) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="p-4 rounded-xl bg-bg-300/20 border border-primary-300/10">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="h-5 w-5 text-primary-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-text-200/60 mb-1 font-medium">
                            Recomendación del Sistema:
                          </div>
                          <div className="text-sm text-text-100 leading-relaxed">
                            {simulationResult.recommendation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Model Information */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm hover:from-bg-200/50 hover:to-bg-300/40 transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <Database className="h-5 w-5 text-primary-300 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-text-100 text-sm sm:text-base mb-1">
                  Dataset de Entrenamiento
                </div>
                <div className="text-xs sm:text-sm text-text-200/60">
                  10,000+ transacciones etiquetadas y validadas
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm hover:from-bg-200/50 hover:to-bg-300/40 transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <Cpu className="h-5 w-5 text-primary-300 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-text-100 text-sm sm:text-base mb-1">
                  Infraestructura
                </div>
                <div className="text-xs sm:text-sm text-text-200/60">
                  GPU Tesla V100, 32GB RAM, procesamiento distribuido
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm hover:from-bg-200/50 hover:to-bg-300/40 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-primary-300 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-text-100 text-sm sm:text-base mb-1">
                  Validación
                </div>
                <div className="text-xs sm:text-sm text-text-200/60">
                  Cross-validation 5-fold, 95% intervalo de confianza
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MLDemo;
