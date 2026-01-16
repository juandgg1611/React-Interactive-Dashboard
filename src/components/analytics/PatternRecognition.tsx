// src/components/analytics/PatternRecognition.tsx
import React, { useState, useEffect } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Zap,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  Search,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Download,
  Share2,
  Target,
  DollarSign,
  ShoppingBag,
  Coffee,
  Car,
  Home,
  Gift,
  BookOpen,
  Activity,
  Sliders,
  Heart,
  Globe,
  Bell,
  X,
  CheckCircle,
  Award,
  Users,
  Shield,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";

const PatternRecognition = () => {
  const [patterns, setPatterns] = useState<any[]>([]);
  const [seasonalPatterns, setSeasonalPatterns] = useState<any[]>([]);
  const [behavioralPatterns, setBehavioralPatterns] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [correlations, setCorrelations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [confidenceFilter, setConfidenceFilter] = useState(70);
  const [showDetails, setShowDetails] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);

  // Categorías de patrones - SIMPLIFICADO Y ORGANIZADO
  const patternCategories = [
    {
      id: "all",
      name: "Todos",
      icon: Brain,
      color: "text-primary-200",
      count: 0,
    },
    {
      id: "seasonal",
      name: "Estacionales",
      icon: Calendar,
      color: "text-accent-100",
      count: 0,
    },
    {
      id: "behavioral",
      name: "Comportamiento",
      icon: Activity,
      color: "text-blue-400",
      count: 0,
    },
    {
      id: "anomalies",
      name: "Anomalías",
      icon: AlertTriangle,
      color: "text-red-400",
      count: 0,
    },
    {
      id: "correlations",
      name: "Correlaciones",
      icon: LineChart,
      color: "text-primary-100",
      count: 0,
    },
  ];

  // Iconos por categoría de gasto
  const categoryIcons: { [key: string]: any } = {
    Alimentos: ShoppingBag,
    Entretenimiento: Gift,
    Transporte: Car,
    Cafeterías: Coffee,
    Compras: ShoppingBag,
    Hogar: Home,
    Salud: Heart,
    Educación: BookOpen,
    Viajes: Globe,
    Servicios: Home,
    "Compras online": ShoppingBag,
    Variado: DollarSign,
    "Ingresos/Ahorro": DollarSign,
    Comportamiento: Activity,
  };

  // Inicializar datos de ejemplo
  useEffect(() => {
    // Patrones estacionales
    const seasonalData = [
      {
        id: "seasonal-1",
        type: "seasonal",
        title: "Gastos Navideños",
        description: "Incremento del 35% durante diciembre en compras",
        category: "Compras",
        confidence: 92,
        period: "Anual",
        impact: "Alto",
        frequency: "Cada diciembre",
        averageIncrease: 35,
        months: ["Nov", "Dic", "Ene"],
        icon: Calendar,
        color: "text-accent-100",
        bgColor: "from-accent-100/10 to-accent-100/5",
        borderColor: "border-accent-100/20",
        priority: "high",
        lastDetected: "Hace 2 días",
        details: {
          insights: [
            "Gasto en regalos aumenta 120% en diciembre",
            "Compras online incrementan 65%",
            "Entretenimiento familiar sube 45%",
          ],
          recommendations: [
            "Presupuestar desde octubre",
            "Buscar ofertas tempranas",
            "Ahorrar específicamente para temporada",
          ],
        },
      },
      {
        id: "seasonal-2",
        type: "seasonal",
        title: "Viajes de Verano",
        description: "25% más gastos en viajes durante junio-agosto",
        category: "Viajes",
        confidence: 88,
        period: "Estacional",
        impact: "Medio",
        frequency: "Verano",
        averageIncrease: 25,
        months: ["Jun", "Jul", "Ago"],
        icon: Globe,
        color: "text-blue-400",
        bgColor: "from-blue-500/10 to-blue-400/5",
        borderColor: "border-blue-400/20",
        priority: "medium",
        lastDetected: "Hace 1 semana",
        details: {
          insights: [
            "Hoteles aumentan 40% en julio",
            "Transporte incrementa 30%",
            "Actividades turísticas suben 35%",
          ],
          recommendations: [
            "Reservar con 3 meses anticipación",
            "Considerar destinos en temporada baja",
            "Planificar presupuesto específico",
          ],
        },
      },
    ];

    // Patrones de comportamiento
    const behavioralData = [
      {
        id: "behavioral-1",
        type: "behavioral",
        title: "Compras Nocturnas",
        description: "35% de compras online después de las 10 PM",
        category: "Compras online",
        confidence: 85,
        frequency: "Nocturna",
        impact: "Medio",
        avgAmount: 45,
        timeRange: "10 PM - 2 AM",
        dayOfWeek: "Viernes y Sábado",
        icon: Clock,
        color: "text-primary-200",
        bgColor: "from-primary-200/10 to-primary-200/5",
        borderColor: "border-primary-200/20",
        priority: "medium",
        lastDetected: "Hoy",
        details: {
          insights: [
            "Compras 40% más impulsivas",
            "Valor promedio 25% más alto",
            "65% son 'deseos' vs 'necesidades'",
          ],
          recommendations: [
            "Configurar bloqueo nocturno en apps",
            "Esperar 24h antes de comprar",
            "Establecer límite de gasto nocturno",
          ],
        },
      },
      {
        id: "behavioral-2",
        type: "behavioral",
        title: "Gasto Post-Sueldo",
        description: "40% del gasto mensual en los 5 días tras el sueldo",
        category: "Variado",
        confidence: 90,
        frequency: "Mensual",
        impact: "Alto",
        avgAmount: 320,
        timeRange: "Días 1-5 del mes",
        icon: DollarSign,
        color: "text-yellow-400",
        bgColor: "from-yellow-500/10 to-yellow-400/5",
        borderColor: "border-yellow-400/20",
        priority: "high",
        lastDetected: "Hace 3 días",
        details: {
          insights: [
            "60% de compras grandes en esta ventana",
            "Tasa de ahorro cae 45%",
            "Suscripciones se renuevan estos días",
          ],
          recommendations: [
            "Transferir a ahorro automáticamente",
            "Esperar 48h para compras no esenciales",
            "Revisar suscripciones antes del pago",
          ],
        },
      },
    ];

    // Anomalías detectadas
    const anomaliesData = [
      {
        id: "anomaly-1",
        type: "anomalies",
        title: "Gasto Extraordinario en Restaurantes",
        description: "150% más en restaurantes este mes",
        category: "Alimentos",
        confidence: 95,
        severity: "Alta",
        deviation: 150,
        expectedAmount: 120,
        actualAmount: 300,
        impact: "Alto",
        icon: AlertTriangle,
        color: "text-red-400",
        bgColor: "from-red-500/10 to-red-400/5",
        borderColor: "border-red-400/20",
        priority: "critical",
        lastDetected: "Ayer",
        details: {
          causes: [
            "3 cenas de celebración adicionales",
            "Más pedidos a domicilio fines de semana",
            "Restaurantes más costosos",
          ],
          recommendations: [
            "Reducir a 2 comidas fuera por semana",
            "Cocinar en casa fines de semana",
            "Buscar promociones en restaurantes",
          ],
        },
      },
    ];

    // Correlaciones identificadas
    const correlationsData = [
      {
        id: "correlation-1",
        type: "correlations",
        title: "Ingresos Extra → Ahorro",
        description: "$100 extra resultan en $85 de ahorro adicional",
        category: "Ingresos/Ahorro",
        confidence: 87,
        correlationStrength: "Fuerte",
        rValue: 0.85,
        impact: "Medio",
        icon: TrendingUp,
        color: "text-primary-100",
        bgColor: "from-primary-100/10 to-primary-100/5",
        borderColor: "border-primary-100/20",
        priority: "medium",
        lastDetected: "Hace 2 semanas",
        details: {
          insights: [
            "Disciplina de ahorro se mantiene con ingresos variables",
            "Bonos aceleran metas financieras",
          ],
          recommendations: [
            "Destinar 85% de ingresos extra a ahorro",
            "Automatizar porcentaje de ahorro",
            "Buscar fuentes de ingreso adicional",
          ],
        },
      },
    ];

    setSeasonalPatterns(seasonalData);
    setBehavioralPatterns(behavioralData);
    setAnomalies(anomaliesData);
    setCorrelations(correlationsData);

    // Combinar todos los patrones
    const allPatterns = [
      ...seasonalData,
      ...behavioralData,
      ...anomaliesData,
      ...correlationsData,
    ];
    setPatterns(allPatterns);

    // Actualizar contadores de categorías
    patternCategories[0].count = allPatterns.length;
    patternCategories[1].count = seasonalData.length;
    patternCategories[2].count = behavioralData.length;
    patternCategories[3].count = anomaliesData.length;
    patternCategories[4].count = correlationsData.length;
  }, []);

  // Filtrar patrones
  const filteredPatterns = patterns.filter((pattern) => {
    const tabMatch = activeTab === "all" || pattern.type === activeTab;
    const confidenceMatch = pattern.confidence >= confidenceFilter;
    const searchMatch =
      searchQuery === "" ||
      pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.category.toLowerCase().includes(searchQuery.toLowerCase());

    return tabMatch && confidenceMatch && searchMatch;
  });

  // Obtener icono de categoría
  const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || DollarSign;
  };

  // Obtener color de prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-bg-300/30 text-text-200 border-bg-300/50";
    }
  };

  // Formatear fecha relativa
  const formatRelativeTime = (dateString: string) => {
    return dateString; // Ya viene formateada
  };

  // Manejar expandir/colapsar patrón
  const togglePattern = (patternId: string) => {
    setExpandedPattern(expandedPattern === patternId ? null : patternId);
  };

  // Componente de tarjeta de patrón limpia
  const PatternCard = ({ pattern }: { pattern: any }) => {
    const Icon = pattern.icon;
    const CategoryIcon = getCategoryIcon(pattern.category);
    const isExpanded = expandedPattern === pattern.id;

    return (
      <Card className="border border-bg-300/40 bg-gradient-to-br from-bg-300/10 to-bg-300/5 hover:from-bg-300/15 hover:to-bg-300/10 transition-all duration-300">
        <CardContent className="p-5">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-lg bg-gradient-to-br ${pattern.bgColor} border ${pattern.borderColor}`}
                >
                  <Icon className={`h-5 w-5 ${pattern.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-text-100">
                      {pattern.title}
                    </h3>
                    <Badge className={getPriorityColor(pattern.priority)}>
                      {pattern.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-200 leading-relaxed">
                    {pattern.description}
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-bg-300/30"
                onClick={() => togglePattern(pattern.id)}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-text-200" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-text-200" />
                )}
              </Button>
            </div>

            {/* Métricas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-bg-300/30">
                    <CategoryIcon className="h-3 w-3 text-text-200" />
                  </div>
                  <span className="text-xs text-text-200">Categoría</span>
                </div>
                <div className="text-sm font-medium text-text-100 pl-7">
                  {pattern.category}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-bg-300/30">
                    <Award className="h-3 w-3 text-text-200" />
                  </div>
                  <span className="text-xs text-text-200">Confianza</span>
                </div>
                <div className="text-sm font-medium text-text-100 pl-7">
                  {pattern.confidence}%
                </div>
              </div>

              {pattern.averageIncrease && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-red-400" />
                    <span className="text-xs text-text-200">Incremento</span>
                  </div>
                  <div className="text-sm font-medium text-red-400">
                    +{pattern.averageIncrease}%
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-text-200" />
                  <span className="text-xs text-text-200">Detectado</span>
                </div>
                <div className="text-sm font-medium text-text-100">
                  {formatRelativeTime(pattern.lastDetected)}
                </div>
              </div>
            </div>

            {/* Barra de confianza */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-200">
                  Confianza del patrón
                </span>
                <span className="text-xs font-medium text-text-100">
                  {pattern.confidence}%
                </span>
              </div>
              <Progress
                value={pattern.confidence}
                className="h-1.5 bg-bg-300/30"
                indicatorClassName={
                  pattern.confidence >= 90
                    ? "bg-green-500"
                    : pattern.confidence >= 80
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
              />
            </div>

            {/* Contenido expandido */}
            {isExpanded && (
              <div className="pt-4 border-t border-bg-300/30 space-y-4">
                {/* Insights */}
                <div>
                  <h4 className="text-sm font-medium text-text-100 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-3.5 w-3.5 text-yellow-400" />
                    Insights Clave
                  </h4>
                  <div className="space-y-2">
                    {pattern.details?.insights?.map(
                      (insight: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-bg-300/20 to-bg-300/10"
                        >
                          <Zap className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-200 flex-1">
                            {insight}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Recomendaciones */}
                <div>
                  <h4 className="text-sm font-medium text-text-100 mb-2 flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-primary-200" />
                    Recomendaciones
                  </h4>
                  <div className="space-y-2">
                    {pattern.details?.recommendations?.map(
                      (rec: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-primary-100/10 to-primary-100/5 border border-primary-100/20"
                        >
                          <CheckCircle className="h-3 w-3 text-primary-200 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-200 flex-1">
                            {rec}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
                  >
                    <Bell className="h-3.5 w-3.5 mr-2" />
                    Crear Alerta
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
                  >
                    <Shield className="h-3.5 w-3.5 mr-2" />
                    Crear Regla
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Principal */}
      <Card className="border-0 bg-gradient-to-br from-primary-100/10 via-primary-200/5 to-accent-100/5 backdrop-blur-lg border border-bg-300/40 shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-100/30">
                <Brain className="h-6 w-6 text-primary-200" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-text-100 flex items-center gap-3">
                  Reconocimiento de Patrones IA
                  <Badge className="bg-gradient-to-r from-primary-100 to-primary-200 text-white">
                    <Sparkles className="h-3 w-3 mr-1.5" />
                    Predictivo
                  </Badge>
                </CardTitle>
                <CardDescription className="text-text-200 mt-1">
                  Análisis inteligente de hábitos y tendencias en tus finanzas
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                <div className="text-2xl font-bold text-primary-200">
                  {patterns.length}
                </div>
                <div className="text-xs text-text-200">Patrones</div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="auto-detect"
                  checked={autoDetect}
                  onCheckedChange={setAutoDetect}
                  className="data-[state=checked]:bg-primary-100"
                />
                <Label
                  htmlFor="auto-detect"
                  className="text-sm text-text-200 cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3 mr-1.5 inline" />
                  Auto-detectar
                </Label>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Panel de Filtros */}
      <Card className="border border-bg-300/40 bg-gradient-to-br from-bg-300/10 to-bg-300/5">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Búsqueda */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-200" />
                <Input
                  placeholder="Buscar patrones por título, categoría o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-bg-300/10 border-bg-300/40 text-text-100 placeholder:text-text-200/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-bg-300/30"
                  >
                    <X className="h-3 w-3 text-text-200/70" />
                  </button>
                )}
              </div>
            </div>

            {/* Filtro de confianza */}
            <div className="flex items-center gap-4">
              <div className="space-y-1 min-w-[200px]">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-text-200">
                    Confianza mínima
                  </Label>
                  <Badge className="bg-primary-100/20 text-primary-200">
                    {confidenceFilter}%
                  </Badge>
                </div>
                <Slider
                  value={[confidenceFilter]}
                  onValueChange={(value) => setConfidenceFilter(value[0])}
                  min={50}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setConfidenceFilter(70);
                }}
                className="text-text-200 hover:text-primary-200"
              >
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                Limpiar
              </Button>
            </div>
          </div>

          {/* Tabs de categorías */}
          <div className="mt-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-5 bg-bg-300/10 border border-bg-300/40 p-1 rounded-xl">
                {patternCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 data-[state=active]:border data-[state=active]:border-primary-100/30 rounded-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Icon className={`h-4 w-4 ${category.color}`} />
                        <span className="text-sm">{category.name}</span>
                        {category.count > 0 && (
                          <Badge className="ml-1 bg-bg-300/30 text-text-200 text-xs h-5 min-w-[20px] flex items-center justify-center">
                            {category.count}
                          </Badge>
                        )}
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Contenido Principal */}
      <Card className="border border-bg-300/40 bg-gradient-to-br from-bg-300/10 to-bg-300/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-text-100">
                Patrones Detectados
                <span className="text-text-200 font-normal ml-2">
                  ({filteredPatterns.length} resultados)
                </span>
              </CardTitle>
              <CardDescription className="text-text-200 mt-1">
                Patrones organizados por relevancia e impacto
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-200"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <EyeOff className="h-4 w-4 mr-1.5" />
                ) : (
                  <Eye className="h-4 w-4 mr-1.5" />
                )}
                {showDetails ? "Ocultar" : "Mostrar"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredPatterns.length > 0 ? (
            <div className="space-y-4">
              {/* Ajustamos la altura para mostrar al menos 3 patrones */}
              <ScrollArea className="h-[calc(100vh-450px)] min-h-[650px]">
                <div className="space-y-4 pr-4 pb-4">
                  {filteredPatterns.map((pattern) => (
                    <PatternCard key={pattern.id} pattern={pattern} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 inline-block mb-4">
                <Brain className="h-12 w-12 text-text-200/50" />
              </div>
              <h3 className="text-lg font-semibold text-text-100 mb-2">
                No se encontraron patrones
              </h3>
              <p className="text-text-200 mb-6 max-w-md mx-auto">
                {searchQuery
                  ? "No hay patrones que coincidan con tu búsqueda. Intenta con otros términos o ajusta los filtros."
                  : "La IA está analizando tus transacciones para identificar patrones. Esto puede tomar unos momentos."}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
                  onClick={() => setSearchQuery("")}
                >
                  Limpiar búsqueda
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatternRecognition;
