// src/types/analytics.types.ts

// ==============================
// TIPOS BASE Y UTILITARIOS
// ==============================

export type TimePeriod = "7d" | "30d" | "90d" | "1y" | "custom";
export type TrendDirection = "up" | "down" | "stable";
export type ConfidenceLevel = "low" | "medium" | "high" | "very-high";
export type AlertPriority = "critical" | "high" | "medium" | "low" | "info";

// ==============================
// DATOS DE TENDENCIAS FINANCIERAS
// ==============================

export interface FinancialTrendData {
  id: string;
  period: string; // "Ene 2024", "Q1 2024", etc.
  month: string;
  year: number;
  quarter?: number;

  // Métricas principales
  income: number;
  expenses: number;
  savings: number;
  netFlow: number;
  savingsRate: number; // Porcentaje de ahorro

  // Comparativas
  previousYear: number;
  previousMonth: number;
  changeVsPrevious: number; // Porcentaje

  // Categorías principales (opcional, para análisis detallado)
  categories?: {
    food: number;
    transport: number;
    entertainment: number;
    housing: number;
    utilities: number;
    health: number;
    education: number;
    shopping: number;
    other: number;
  };

  // Metadatos
  dataPoints: number; // Número de transacciones en el período
  completeness: number; // 0-100% de datos completos
  seasonalityFactor?: number; // Factor de estacionalidad
}

export interface TrendAnalysis {
  overallDirection: TrendDirection;
  strength: number; // 0-100
  consistency: number; // 0-100
  volatility: number; // 0-100

  insights: Array<{
    type: "positive" | "negative" | "neutral" | "opportunity";
    text: string;
    impact: "high" | "medium" | "low";
  }>;

  seasonalPatterns?: Array<{
    period: string; // "Q4", "Summer", "Holidays"
    averageIncrease: number;
    confidence: number;
  }>;
}

// ==============================
// PRONÓSTICOS Y PREDICCIONES
// ==============================

export interface ForecastData {
  metric: "income" | "expenses" | "savings" | "cashflow";
  timeframe: "next-month" | "next-quarter" | "next-year";

  // Valores
  current: number;
  forecast: number;
  change: number; // Porcentaje
  changeAmount: number; // Valor absoluto

  // Confianza y precisión
  confidence: number; // 0-100
  confidenceLevel: ConfidenceLevel;
  marginOfError: number;

  // Factores influyentes
  factors: Array<{
    name: string;
    impact: "Alto" | "Medio" | "Bajo";
    description: string;
    direction: "positive" | "negative";
    weight: number; // 0-1
  }>;

  // Detalles del modelo
  modelUsed: string; // "ARIMA", "Prophet", "LSTM", "Ensemble"
  lastUpdated: Date;
  accuracyScore?: number; // Precisión histórica del modelo

  // Intervalo de confianza
  lowerBound?: number;
  upperBound?: number;
}

export interface ForecastComparison {
  optimistic: number;
  realistic: number;
  pessimistic: number;
  historicalAverage: number;
}

// ==============================
// SALUD FINANCIERA
// ==============================

export interface HealthComponent {
  id: string;
  name: string;
  displayName: string;
  description: string;
  score: number; // 0-100
  weight: number; // 0-1, suma total = 1
  icon: string;

  // Sub-métricas
  subMetrics?: Array<{
    name: string;
    value: number;
    target: number;
    status: "good" | "fair" | "poor";
  }>;

  trend: {
    direction: TrendDirection;
    change: number; // Cambio vs período anterior
    velocity: number; // Velocidad de cambio
  };

  recommendations: Array<{
    priority: "high" | "medium" | "low";
    action: string;
    expectedImpact: number;
  }>;
}

export interface FinancialHealthScore {
  overallScore: number; // 0-100
  grade: "A" | "B" | "C" | "D" | "F";
  category: "Excellent" | "Good" | "Fair" | "Poor" | "Critical";

  components: HealthComponent[];
  lastUpdated: Date;

  // Evolución histórica
  history: Array<{
    date: string;
    score: number;
    change: number;
  }>;

  // Comparativa
  benchmark?: {
    percentile: number;
    comparison: "above" | "below" | "average";
    description: string;
  };
}

// ==============================
// DETECCIÓN DE PATRONES
// ==============================

export interface PatternRecognition {
  id: string;
  name: string;
  type: "seasonal" | "behavioral" | "anomaly" | "correlation" | "opportunity";
  category: string;

  description: string;
  detailedExplanation?: string;

  // Métricas de detección
  confidence: number; // 0-100
  impact: number; // -100 a +100
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

  // Datos del patrón
  startDate?: Date;
  endDate?: Date;
  occurrences: number;
  averageAmount?: number;

  // Recomendaciones
  recommendation: string;
  actionSteps?: Array<{
    step: number;
    description: string;
    estimatedTime: string;
  }>;

  // Alerta relacionada
  alertLevel?: AlertPriority;
  isActionable: boolean;

  // Metadatos
  detectedBy: string; // "AI Model", "Rule-based", "User-reported"
  lastOccurrence?: Date;
}

export interface CorrelationAnalysis {
  variable1: string;
  variable2: string;
  correlationCoefficient: number; // -1 a 1
  strength: "weak" | "moderate" | "strong";
  direction: "positive" | "negative";
  significance: number; // p-value o similar
}

// ==============================
// COMPARATIVAS Y BENCHMARKS
// ==============================

export interface BenchmarkComparison {
  id: string;
  metric: string;
  metricDescription?: string;

  // Valores del usuario
  userValue: number;
  userPreviousValue?: number;
  userTrend: TrendDirection;

  // Valores de referencia
  benchmarkSource: "similar-users" | "financial-experts" | "goals" | "market";
  averageValue: number;
  top25Value?: number;
  medianValue?: number;

  // Posición relativa
  percentile: number; // 0-100
  status:
    | "above"
    | "below"
    | "equal"
    | "significantly-above"
    | "significantly-below";
  gap: number; // Diferencia con promedio
  gapPercentage: number;

  // Contexto
  idealRange?: {
    min: number;
    max: number;
  };

  // Recomendaciones
  recommendation?: string;
  improvementTarget?: number;
}

export interface BenchmarkGroup {
  name: string;
  description: string;
  size: number; // Número de usuarios en el grupo
  demographics?: {
    ageRange?: string;
    incomeRange?: string;
    location?: string;
  };
  metrics: BenchmarkComparison[];
}

// ==============================
// SIMULADOR DE ESCENARIOS
// ==============================

export interface ScenarioVariable {
  id: string;
  variable: string;
  category: "income" | "expense" | "savings" | "investment" | "debt";
  displayName: string;

  change: number;
  unit: "%" | "$" | "units";
  isRecurring: boolean;

  // Validación
  minValue?: number;
  maxValue?: number;
  step?: number;
}

export interface ScenarioImpact {
  // Impacto en métricas
  savings: {
    monthly: number;
    yearly: number;
    percentageChange: number;
  };

  goals: {
    affectedGoals: string[];
    timeSaved: number; // Meses ahorrados
    completionDateChange: Date;
  };

  healthScore: {
    newScore: number;
    change: number;
    componentsBreakdown: Array<{
      component: string;
      change: number;
    }>;
  };

  // Impacto financiero
  cashFlow: {
    monthly: number;
    cumulativeYearly: number;
  };

  // Riesgos
  risks?: Array<{
    description: string;
    probability: "low" | "medium" | "high";
    impact: "low" | "medium" | "high";
  }>;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category: "optimization" | "risk-assessment" | "goal-planning" | "what-if";

  // Variables modificadas
  changes: ScenarioVariable[];

  // Impacto calculado
  impact: ScenarioImpact;

  // Evaluación
  feasibility: number; // 0-100
  effortRequired: "low" | "medium" | "high";
  timeToImplement: string; // "1 week", "3 months", etc.

  // Metadatos
  created: Date;
  lastModified: Date;
  isFavorite?: boolean;
  tags?: string[];

  // Comparación
  baseScenarioId?: string; // ID del escenario base para comparar
  comparison?: {
    vsPrevious: ScenarioImpact;
    vsOptimal: ScenarioImpact;
  };
}

// ==============================
// ALERTAS PREDICTIVAS
// ==============================

export interface PredictiveAlert {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;

  category: "budget" | "savings" | "spending" | "income" | "debt" | "goal";
  type: "warning" | "opportunity" | "info" | "milestone";

  // Prioridad y urgencia
  priority: AlertPriority;
  severity: number; // 1-10
  urgency: "immediate" | "soon" | "future";

  // Predicción
  predictedDate: Date;
  confidence: number;
  expectedImpact: number;

  // Recomendaciones
  recommendations: Array<{
    action: string;
    impact: number;
    difficulty: "easy" | "medium" | "hard";
  }>;

  // Estado
  status: "active" | "acknowledged" | "resolved" | "dismissed";
  acknowledgedAt?: Date;
  resolvedAt?: Date;

  // Acciones
  actions?: Array<{
    label: string;
    type: "primary" | "secondary" | "danger";
    handler: string; // Nombre de función a ejecutar
  }>;

  // Metadatos
  source: "ai-model" | "rule-engine" | "manual";
  createdAt: Date;
  updatedAt: Date;
}

// ==============================
// ANÁLISIS DE CATEGORÍAS
// ==============================

export interface CategoryAnalysis {
  id: string;
  name: string;
  icon: string;
  color: string;

  // Métricas actuales
  currentMonth: {
    amount: number;
    percentageOfTotal: number;
    transactions: number;
  };

  // Tendencias
  trend: {
    vsLastMonth: number; // Porcentaje
    vsAverage: number; // Porcentaje
    direction: TrendDirection;
    consistency: number; // 0-100
  };

  // Patrones
  patterns?: Array<{
    type: string;
    description: string;
    confidence: number;
  }>;

  // Benchmarking
  benchmarking?: {
    userPercentile: number;
    similarUsersAverage: number;
    expertRecommendation: number;
  };

  // Optimización
  optimization?: {
    potentialSavings: number;
    recommendations: string[];
    difficulty: "low" | "medium" | "high";
  };

  // Alertas relacionadas
  alerts?: Array<{
    id: string;
    title: string;
    priority: AlertPriority;
  }>;
}

// ==============================
// VISUALIZACIONES Y GRÁFICOS
// ==============================

export interface ChartDataPoint {
  x: string | number | Date;
  y: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface ChartConfig {
  type: "line" | "bar" | "area" | "pie" | "scatter";
  title: string;
  description?: string;

  data: ChartDataPoint[];
  series?: Array<{
    name: string;
    data: ChartDataPoint[];
    color: string;
  }>;

  // Configuración de ejes
  xAxis?: {
    label: string;
    type: "time" | "category" | "linear";
    format?: string;
  };

  yAxis?: {
    label: string;
    format?: string;
    min?: number;
    max?: number;
  };

  // Interactividad
  tooltip?: {
    enabled: boolean;
    format?: string;
  };

  annotations?: Array<{
    type: "line" | "point" | "area";
    x: string | number | Date;
    label: string;
    color?: string;
  }>;
}

// ==============================
// CONFIGURACIÓN DE IA Y MODELOS
// ==============================

export interface AIModelConfig {
  modelId: string;
  name: string;
  type: "forecast" | "anomaly" | "clustering" | "recommendation";

  // Configuración
  algorithm:
    | "Prophet"
    | "ARIMA"
    | "LSTM"
    | "IsolationForest"
    | "K-Means"
    | "XGBoost";
  version: string;

  // Rendimiento
  accuracy: number;
  precision: number;
  recall: number;
  lastTrained: Date;

  // Parámetros
  parameters?: Record<string, any>;
  features?: string[]; // Variables utilizadas

  // Estado
  status: "active" | "training" | "error" | "disabled";
  error?: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: "trend" | "anomaly" | "opportunity" | "risk";

  // Datos de soporte
  supportingData?: Array<{
    metric: string;
    value: number;
    comparison?: number;
  }>;

  confidence: number;
  generatedAt: Date;

  // Acciones
  actionItems?: Array<{
    action: string;
    impact: "high" | "medium" | "low";
    estimatedTime: string;
  }>;

  // Metadatos
  sourceModel?: string;
  tags?: string[];
}

// ==============================
// EXPORTACIÓN E INFORME
// ==============================

export interface AnalyticsExportConfig {
  format: "pdf" | "excel" | "csv" | "json";
  timeRange: {
    start: Date;
    end: Date;
  };
  sections: Array<
    | "summary"
    | "trends"
    | "forecasts"
    | "health"
    | "categories"
    | "recommendations"
  >;
  includeCharts: boolean;
  includeRawData: boolean;
  customNotes?: string;
}

export interface AnalyticsReport {
  id: string;
  title: string;
  generatedAt: Date;
  period: string;

  summary: {
    keyMetrics: Record<string, number>;
    overallAssessment: string;
    majorChanges: Array<{
      metric: string;
      change: number;
      description: string;
    }>;
  };

  sections: Record<string, any>;
  recommendations: Array<{
    priority: "high" | "medium" | "low";
    recommendation: string;
    expectedImpact: number;
  }>;

  metadata: {
    userId: string;
    reportType: "monthly" | "quarterly" | "yearly" | "custom";
    exportConfig: AnalyticsExportConfig;
  };
}

// ==============================
// TIPOS DE RESPUESTA DE API
// ==============================

export interface AnalyticsAPIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    requestId: string;
    processingTime: number;
    cacheHit: boolean;
  };
}

export interface AnalyticsBatchRequest {
  operations: Array<{
    type: "trends" | "forecast" | "health" | "patterns";
    parameters?: Record<string, any>;
  }>;
}

// ==============================
// FILTROS Y CONFIGURACIÓN
// ==============================

export interface AnalyticsFilter {
  timeRange: {
    start?: Date;
    end?: Date;
    period?: TimePeriod;
  };

  categories?: string[];
  transactionTypes?: string[];
  minAmount?: number;
  maxAmount?: number;

  // Filtros avanzados
  tags?: string[];
  merchants?: string[];
  paymentMethods?: string[];

  // Configuración de análisis
  includePredictions: boolean;
  includeBenchmarks: boolean;
  granularity: "daily" | "weekly" | "monthly" | "quarterly";
}

// ==============================
// PREFERENCIAS DEL USUARIO
// ==============================

export interface AnalyticsPreferences {
  dashboard: {
    defaultView: "overview" | "trends" | "forecasts" | "health";
    visibleWidgets: string[];
    layout: "compact" | "spacious" | "custom";
  };

  alerts: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    frequency: "realtime" | "daily" | "weekly";
    minimumSeverity: AlertPriority;
  };

  privacy: {
    shareForBenchmarks: boolean;
    shareForImprovements: boolean;
    dataRetentionMonths: number;
  };

  features: {
    enableAI: boolean;
    enablePredictions: boolean;
    enableSimulations: boolean;
  };
}

// ==============================
// TIPOS DE UNIÓN ÚTILES
// ==============================

export type AnalyticsDataType =
  | FinancialTrendData
  | ForecastData
  | FinancialHealthScore
  | PatternRecognition
  | BenchmarkComparison
  | Scenario
  | PredictiveAlert
  | CategoryAnalysis;

export type AnalyticsComponent =
  | "FinancialTrendsChart"
  | "CategoryAnalysis"
  | "AIForecastPanel"
  | "PredictiveAlerts"
  | "FinancialHealthScore"
  | "ScenarioSimulator"
  | "BenchmarkComparison"
  | "PatternRecognition";

// ==============================
// CONSTANTES Y ENUMS
// ==============================

export const HealthScoreRanges = {
  EXCELLENT: { min: 85, max: 100, label: "Excellent", color: "#10B981" },
  GOOD: { min: 70, max: 84, label: "Good", color: "#3B82F6" },
  FAIR: { min: 50, max: 69, label: "Fair", color: "#F59E0B" },
  POOR: { min: 30, max: 49, label: "Poor", color: "#EF4444" },
  CRITICAL: { min: 0, max: 29, label: "Critical", color: "#DC2626" },
} as const;

export const ForecastConfidenceLevels = {
  VERY_HIGH: { min: 90, max: 100, label: "Muy Alta", color: "#10B981" },
  HIGH: { min: 75, max: 89, label: "Alta", color: "#3B82F6" },
  MEDIUM: { min: 60, max: 74, label: "Media", color: "#F59E0B" },
  LOW: { min: 0, max: 59, label: "Baja", color: "#EF4444" },
} as const;

export const AlertPriorityColors = {
  critical: "#DC2626",
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#3B82F6",
  info: "#6B7280",
} as const;

// ==============================
// UTILIDADES DE TIPO
// ==============================

export type HealthScoreRange = keyof typeof HealthScoreRanges;
export type ForecastConfidenceLevel = keyof typeof ForecastConfidenceLevels;
export type AlertPriorityType = keyof typeof AlertPriorityColors;
