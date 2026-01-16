// src/components/analytics/AnalyticsInsights.tsx
import React, { useState, useEffect } from "react";
import {
  Brain,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  Lightbulb,
  Zap,
  AlertTriangle,
  Clock,
  Calendar,
  DollarSign,
  PieChart,
  BarChart3,
  LineChart,
  Filter,
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Download,
  Share2,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Eye,
  EyeOff,
  Star,
  Trophy,
  Award,
  Crown,
  CheckCircle,
  XCircle,
  HelpCircle,
  Info,
  ExternalLink,
  MoreVertical,
  Settings,
  Bell,
  Bookmark,
  BookOpen,
  Users,
  Globe,
  Shield,
  Lock,
  Unlock,
  Heart,
  Coffee,
  ShoppingBag,
  Home,
  Car,
  Plane,
  Gamepad2,
  Music,
  Film,
  Book,
  Utensils,
  Wifi,
  Phone,
  Cloud,
  Sun,
  Moon,
  Sunrise,
  Sunset,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";

const AnalyticsInsights = () => {
  const [insights, setInsights] = useState<any[]>([]);
  const [filteredInsights, setFilteredInsights] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");
  const [timeframeFilter, setTimeframeFilter] = useState("all");
  const [showRead, setShowRead] = useState(true);
  const [showUnread, setShowUnread] = useState(true);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [insightsMode, setInsightsMode] = useState("detailed"); // simple, detailed, expert
  const [feedbackGiven, setFeedbackGiven] = useState<{
    [key: string]: "helpful" | "not-helpful" | null;
  }>({});

  // Categorías de insights
  const insightCategories = [
    {
      id: "all",
      name: "Todos los Insights",
      icon: Brain,
      color: "text-primary-200",
      count: 0,
    },
    {
      id: "saving",
      name: "Ahorro",
      icon: TrendingDown,
      color: "text-primary-200",
      count: 4,
    },
    {
      id: "spending",
      name: "Gastos",
      icon: TrendingUp,
      color: "text-red-400",
      count: 6,
    },
    {
      id: "income",
      name: "Ingresos",
      icon: DollarSign,
      color: "text-primary-200",
      count: 3,
    },
    {
      id: "goals",
      name: "Metas",
      icon: Target,
      color: "text-amber-400",
      count: 2,
    },
    {
      id: "behavior",
      name: "Comportamiento",
      icon: Users,
      color: "text-accent-100",
      count: 5,
    },
    {
      id: "opportunities",
      name: "Oportunidades",
      icon: Zap,
      color: "text-accent-100",
      count: 3,
    },
  ];

  // Niveles de prioridad
  const priorityLevels = [
    { id: "critical", name: "Crítico", color: "text-red-400" },
    { id: "high", name: "Alto", color: "text-amber-400" },
    { id: "medium", name: "Medio", color: "text-blue-400" },
    { id: "low", name: "Bajo", color: "text-primary-200" },
  ];

  // Inicializar datos de insights
  useEffect(() => {
    const insightsData = [
      {
        id: "insight-1",
        title: "¡Oportunidad de ahorro detectada en suscripciones!",
        summary:
          "Tienes 3 suscripciones que no usas regularmente, representando $45 mensuales.",
        description:
          "Nuestro análisis muestra que estas suscripciones tienen una tasa de uso menor al 20%. Cancelarlas podría acelerar tus metas de ahorro en un 15%.",
        category: "saving",
        priority: "high",
        impact: 8,
        confidence: 92,
        timeframe: "immediate",
        read: false,
        actionable: true,
        estimatedValue: 540, // $45 * 12 meses
        tags: ["suscripciones", "optimización", "ahorro automático"],
        icon: Wifi,
        color: "text-primary-200",
        bgColor: "bg-primary-100/10",
        borderColor: "border-primary-100/20",
        details: {
          affectedSubscriptions: [
            { name: "Servicio de streaming", cost: 15, usage: "12%" },
            { name: "App de productividad", cost: 12, usage: "18%" },
            { name: "Revista digital", cost: 18, usage: "8%" },
          ],
          recommendations: [
            "Cancelar la suscripción a la revista digital inmediatamente",
            "Evaluar uso real del servicio de streaming en 30 días",
            "Buscar alternativa gratuita para la app de productividad",
          ],
          nextSteps: [
            "Revisar historial de uso de cada servicio",
            "Configurar recordatorio para evaluación mensual",
            "Redirigir ahorro a meta 'Viaje'",
          ],
          potentialImpact: {
            monthlySavings: 45,
            annualSavings: 540,
            goalAcceleration: "15% más rápido",
            healthScoreIncrease: 5,
          },
        },
        createdAt: "2024-01-15T10:30:00",
        expiresAt: "2024-02-15T10:30:00",
      },
      {
        id: "insight-2",
        title: "Patrón de gastos emocionales detectado",
        summary:
          "Los miércoles por la tarde tienes un incremento del 40% en compras impulsivas.",
        description:
          "Los días de mayor estrés laboral correlacionan con compras emocionales. Este patrón se repite semanalmente con un valor promedio de $35 por evento.",
        category: "behavior",
        priority: "medium",
        impact: 6,
        confidence: 87,
        timeframe: "weekly",
        read: true,
        actionable: true,
        estimatedValue: 140, // $35 * 4 semanas
        tags: ["comportamiento", "impulsividad", "gestión emocional"],
        icon: Brain,
        color: "text-accent-100",
        bgColor: "bg-accent-100/10",
        borderColor: "border-accent-100/20",
        details: {
          patternDetails: {
            day: "Miércoles",
            time: "4:00 PM - 7:00 PM",
            averageAmount: 35,
            commonCategories: [
              "Comida rápida",
              "Compras online",
              "Entretenimiento",
            ],
          },
          triggers: ["Estrés laboral", "Fatiga", "Aburrimiento"],
          recommendations: [
            "Programar actividad física los miércoles a las 5:00 PM",
            "Configurar bloqueo temporal de apps de compra",
            "Practicar técnica de espera 24 horas para compras no esenciales",
          ],
          nextSteps: [
            "Monitorizar siguiente miércoles conscientemente",
            "Establecer presupuesto específico para gastos emocionales",
            "Buscar alternativas no monetarias de recompensa",
          ],
        },
        createdAt: "2024-01-14T16:45:00",
        expiresAt: "2024-02-14T16:45:00",
      },
      {
        id: "insight-3",
        title: "Optimización de categoría 'Transporte' posible",
        summary:
          "Podrías reducir tus gastos de transporte en $60 mensuales optimizando rutas.",
        description:
          "Nuestro análisis de ubicación detecta patrones de viaje ineficientes. Compartir viaje o ajustar horarios podría generar ahorros significativos.",
        category: "spending",
        priority: "medium",
        impact: 7,
        confidence: 84,
        timeframe: "monthly",
        read: false,
        actionable: true,
        estimatedValue: 720,
        tags: ["transporte", "optimización", "movilidad"],
        icon: Car,
        color: "text-primary-200",
        bgColor: "bg-primary-100/10",
        borderColor: "border-primary-100/20",
        details: {
          currentSpending: {
            monthly: 300,
            breakdown: [
              { category: "Gasolina", amount: 180 },
              { category: "Estacionamiento", amount: 70 },
              { category: "Mantenimiento", amount: 50 },
            ],
          },
          optimizationOpportunities: [
            { action: "Compartir viaje", savings: 25 },
            { action: "Optimizar rutas", savings: 20 },
            { action: "Teletrabajo 1 día/semana", savings: 15 },
          ],
          recommendations: [
            "Usar app de navegación con optimización de rutas",
            "Coordinar viajes compartidos con compañeros",
            "Negociar 1 día de teletrabajo semanal",
          ],
          potentialImpact: {
            monthlySavings: 60,
            annualSavings: 720,
            co2Reduction: "120 kg anuales",
            timeSaved: "15 horas mensuales",
          },
        },
        createdAt: "2024-01-13T09:15:00",
        expiresAt: "2024-02-13T09:15:00",
      },
      {
        id: "insight-4",
        title: "¡Meta 'Viaje a Europa' en riesgo!",
        summary:
          "Al ritmo actual, alcanzarás tu meta 4 meses después de lo planeado.",
        description:
          "La inflación en costos de viaje y tu tasa de ahorro actual harán que retrases tu objetivo. Se requiere ajuste de estrategia.",
        category: "goals",
        priority: "critical",
        impact: 9,
        confidence: 91,
        timeframe: "quarterly",
        read: false,
        actionable: true,
        estimatedValue: 800,
        tags: ["metas", "viaje", "planificación"],
        icon: Plane,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        details: {
          goalDetails: {
            name: "Viaje a Europa",
            targetAmount: 5000,
            currentAmount: 2000,
            targetDate: "2024-12-01",
            currentProjection: "2025-04-01",
          },
          reasonsForDelay: [
            "Inflación en costos turísticos: +12%",
            "Tasa de ahorro insuficiente: $300/mes",
            "Gastos imprevistos: $200 extra/mes",
          ],
          solutions: [
            "Aumentar aporte mensual a $450",
            "Reducir gastos discrecionales en 15%",
            "Buscar fuentes de ingreso adicional: $150/mes",
          ],
          nextSteps: [
            "Revisar y ajustar presupuesto mensual",
            "Explorar opciones de viaje más económicas",
            "Configurar ahorro automático adicional",
          ],
        },
        createdAt: "2024-01-12T14:20:00",
        expiresAt: "2024-02-12T14:20:00",
      },
      {
        id: "insight-5",
        title: "Incremento estacional en ingresos detectado",
        summary:
          "Marzo y septiembre muestran consistentemente ingresos 25% superiores.",
        description:
          "Patrón histórico revela que estos meses tienen ingresos extraordinarios por proyectos y bonos. Planificar con este patrón puede optimizar tu flujo.",
        category: "income",
        priority: "low",
        impact: 8,
        confidence: 89,
        timeframe: "seasonal",
        read: true,
        actionable: true,
        estimatedValue: 1200,
        tags: ["ingresos", "estacionalidad", "planificación"],
        icon: TrendingUp,
        color: "text-primary-200",
        bgColor: "bg-primary-100/10",
        borderColor: "border-primary-100/20",
        details: {
          historicalPattern: [
            { year: "2022", marchIncrease: 24, septemberIncrease: 26 },
            { year: "2023", marchIncrease: 27, septemberIncrease: 23 },
            {
              year: "2024",
              marchIncrease: 25,
              septemberIncrease: "25 (proyección)",
            },
          ],
          typicalSources: [
            "Bonos trimestrales",
            "Proyectos especiales",
            "Freelance extra",
          ],
          recommendations: [
            "Presupuestar gastos importantes para marzo/septiembre",
            "Aumentar tasa de ahorro en meses de ingresos altos",
            "Invertir excedentes en fondo de emergencia",
          ],
          nextSteps: [
            "Confirmar bonos programados para marzo 2024",
            "Ajustar presupuesto basado en proyecciones",
            "Planificar metas anuales alrededor de estos meses",
          ],
        },
        createdAt: "2024-01-11T11:10:00",
        expiresAt: "2024-04-11T11:10:00",
      },
    ];

    setInsights(insightsData);
    setFilteredInsights(insightsData);
  }, []);

  // Filtrar insights
  useEffect(() => {
    let filtered = insights;

    // Filtrar por categoría
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (insight) => insight.category === activeCategory
      );
    }

    // Filtrar por prioridad
    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (insight) => insight.priority === priorityFilter
      );
    }

    // Filtrar por impacto
    if (impactFilter !== "all") {
      const impactValue = parseInt(impactFilter);
      filtered = filtered.filter((insight) => insight.impact >= impactValue);
    }

    // Filtrar por timeframe
    if (timeframeFilter !== "all") {
      filtered = filtered.filter(
        (insight) => insight.timeframe === timeframeFilter
      );
    }

    // Filtrar por estado de lectura
    if (!showRead && !showUnread) {
      filtered = [];
    } else if (!showRead) {
      filtered = filtered.filter((insight) => !insight.read);
    } else if (!showUnread) {
      filtered = filtered.filter((insight) => insight.read);
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(
        (insight) =>
          insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          insight.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          insight.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredInsights(filtered);
  }, [
    insights,
    activeCategory,
    priorityFilter,
    impactFilter,
    timeframeFilter,
    showRead,
    showUnread,
    searchQuery,
  ]);

  // Obtener color de prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400";
      case "high":
        return "text-amber-400";
      case "medium":
        return "text-blue-400";
      case "low":
        return "text-primary-200";
      default:
        return "text-text-200";
    }
  };

  // Obtener badge de prioridad
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "medium":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "low":
        return "bg-primary-100/20 text-primary-200 border-primary-100/30";
      default:
        return "bg-bg-300/20 text-text-200 border-bg-300/30";
    }
  };

  // Obtener icono de timeframe
  const getTimeframeIcon = (timeframe: string) => {
    switch (timeframe) {
      case "immediate":
        return Zap;
      case "daily":
        return Sunrise;
      case "weekly":
        return Calendar;
      case "monthly":
        return Clock;
      case "quarterly":
        return TrendingUp;
      case "seasonal":
        return Sun;
      default:
        return Clock;
    }
  };

  // Manejar feedback
  const handleFeedback = (
    insightId: string,
    feedback: "helpful" | "not-helpful"
  ) => {
    setFeedbackGiven((prev) => ({
      ...prev,
      [insightId]: feedback,
    }));
  };

  // Marcar como leído/no leído
  const toggleReadStatus = (insightId: string) => {
    setInsights((prev) =>
      prev.map((insight) =>
        insight.id === insightId ? { ...insight, read: !insight.read } : insight
      )
    );
  };

  // Expandir/colapsar insight
  const toggleInsight = (insightId: string) => {
    setExpandedInsight(expandedInsight === insightId ? null : insightId);
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-text-100 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary-100/20 to-accent-100/20 border border-primary-100/30">
                <Lightbulb className="h-6 w-6 text-primary-200" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span>Insights Financieros IA</span>
                  <Badge className="bg-gradient-to-r from-primary-100 to-accent-100 text-white">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Inteligencia Artificial
                  </Badge>
                </div>
                <CardDescription className="text-text-200 mt-1">
                  Descubrimientos inteligentes y recomendaciones personalizadas
                  basadas en tus datos
                </CardDescription>
              </div>
            </CardTitle>
          </div>

          <div className="flex items-center gap-4">
            {/* Contadores */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">
                  {insights.filter((i) => !i.read).length}
                </div>
                <div className="text-xs text-text-200">Nuevos</div>
              </div>
              <div className="h-8 w-px bg-bg-300/50"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-200">
                  {insights.filter((i) => i.actionable).length}
                </div>
                <div className="text-xs text-text-200">Accionables</div>
              </div>
              <div className="h-8 w-px bg-bg-300/50"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-100">
                  $
                  {insights.reduce(
                    (acc, i) => acc + (i.estimatedValue || 0),
                    0
                  )}
                </div>
                <div className="text-xs text-text-200">Valor potencial</div>
              </div>
            </div>

            {/* Modo de visualización */}
            <Select value={insightsMode} onValueChange={setInsightsMode}>
              <SelectTrigger className="w-32 bg-bg-300/30 border-bg-300/50 text-text-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-bg-200 border-bg-300">
                <SelectItem value="simple" className="text-text-100">
                  Simple
                </SelectItem>
                <SelectItem value="detailed" className="text-text-100">
                  Detallado
                </SelectItem>
                <SelectItem value="expert" className="text-text-100">
                  Experto
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtros principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {/* Categorías */}
          <div className="flex flex-wrap gap-2">
            {insightCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className={
                    isActive
                      ? "bg-gradient-to-r from-primary-100 to-accent-100 text-white"
                      : "border-bg-300/50 text-text-200 hover:bg-bg-300/30"
                  }
                >
                  <Icon className={`h-3 w-3 mr-2 ${category.color}`} />
                  {category.name}
                  {category.count > 0 && (
                    <Badge
                      className={`ml-2 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-bg-300/50 text-text-200"
                      }`}
                    >
                      {category.count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Búsqueda y filtros avanzados */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-200" />
              <Input
                placeholder="Buscar insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-bg-300/30 border-bg-300/50 text-text-100 placeholder:text-text-200/50"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-bg-300/50 text-text-200 hover:bg-bg-300/30"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                  <ChevronDown className="h-3 w-3 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-bg-200 border-bg-300/50">
                <div className="p-3">
                  <Label className="text-text-200 text-sm mb-2 block">
                    Prioridad
                  </Label>
                  <RadioGroup
                    value={priorityFilter}
                    onValueChange={setPriorityFilter}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="pri-all" />
                      <Label
                        htmlFor="pri-all"
                        className="text-text-200 text-sm"
                      >
                        Todas
                      </Label>
                    </div>
                    {priorityLevels.map((level) => (
                      <div
                        key={level.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={level.id}
                          id={`pri-${level.id}`}
                        />
                        <Label
                          htmlFor={`pri-${level.id}`}
                          className={`text-sm ${level.color}`}
                        >
                          {level.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator className="my-2 bg-bg-300/30" />

                <div className="p-3">
                  <Label className="text-text-200 text-sm mb-2 block">
                    Impacto mínimo
                  </Label>
                  <Select value={impactFilter} onValueChange={setImpactFilter}>
                    <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-bg-200 border-bg-300">
                      <SelectItem value="all" className="text-text-100">
                        Todos
                      </SelectItem>
                      <SelectItem value="9" className="text-text-100">
                        Crítico (9-10)
                      </SelectItem>
                      <SelectItem value="7" className="text-text-100">
                        Alto (7-8)
                      </SelectItem>
                      <SelectItem value="5" className="text-text-100">
                        Medio (5-6)
                      </SelectItem>
                      <SelectItem value="3" className="text-text-100">
                        Bajo (3-4)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="my-2 bg-bg-300/30" />

                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-text-200 text-sm">Estado</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-read"
                        checked={showRead}
                        onCheckedChange={setShowRead}
                        className="data-[state=checked]:bg-primary-100"
                      />
                      <Label
                        htmlFor="show-read"
                        className="text-text-200 text-sm"
                      >
                        Mostrar leídos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-unread"
                        checked={showUnread}
                        onCheckedChange={setShowUnread}
                        className="data-[state=checked]:bg-primary-100"
                      />
                      <Label
                        htmlFor="show-unread"
                        className="text-text-200 text-sm"
                      >
                        Mostrar no leídos
                      </Label>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="p-4 space-y-4">
            {filteredInsights.length > 0 ? (
              filteredInsights.map((insight) => {
                const Icon = insight.icon;
                const TimeframeIcon = getTimeframeIcon(insight.timeframe);
                const isExpanded = expandedInsight === insight.id;
                const hasFeedback = feedbackGiven[insight.id];

                return (
                  <div
                    key={insight.id}
                    className={`rounded-xl border transition-all duration-300 ${
                      insight.read
                        ? "bg-gradient-to-r from-bg-300/10 to-bg-300/5 border-bg-300/30"
                        : "bg-gradient-to-r from-amber-500/5 to-orange-500/5 border-amber-500/30 shadow-lg shadow-amber-500/10"
                    } ${isExpanded ? "ring-2 ring-primary-100/20" : ""}`}
                  >
                    <div className="p-5">
                      <div className="flex flex-col lg:flex-row gap-4">
                        {/* Ícono y estado */}
                        <div className="flex-shrink-0">
                          <div className="flex flex-col items-center gap-3">
                            <div
                              className={`p-3 rounded-xl ${insight.bgColor} ${insight.borderColor} border`}
                            >
                              <Icon className={`h-5 w-5 ${insight.color}`} />
                            </div>
                            {!insight.read && (
                              <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse"></div>
                            )}
                          </div>
                        </div>

                        {/* Contenido principal */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                              {/* Header */}
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-text-100">
                                  {insight.title}
                                </h3>
                                <Badge
                                  className={getPriorityBadge(insight.priority)}
                                >
                                  {insight.priority === "critical"
                                    ? "Crítico"
                                    : insight.priority === "high"
                                    ? "Alto"
                                    : insight.priority === "medium"
                                    ? "Medio"
                                    : "Bajo"}
                                </Badge>
                                {insight.actionable && (
                                  <Badge className="bg-accent-100/20 text-accent-100 border-accent-100/30">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Accionable
                                  </Badge>
                                )}
                              </div>

                              {/* Resumen */}
                              <p className="text-sm text-text-200 mb-4">
                                {insight.summary}
                              </p>

                              {/* Métricas rápidas */}
                              <div className="flex flex-wrap items-center gap-4">
                                {/* Impacto */}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center gap-2 cursor-help">
                                        <div className="p-1 rounded bg-bg-300/30">
                                          <Target className="h-3 w-3 text-text-200" />
                                        </div>
                                        <span className="text-sm font-medium text-text-100">
                                          Impacto: {insight.impact}/10
                                        </span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-bg-200 border-bg-300">
                                      <p className="text-text-100">
                                        Nivel de impacto en tus finanzas
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                {/* Confianza */}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center gap-2 cursor-help">
                                        <div className="p-1 rounded bg-bg-300/30">
                                          <Brain className="h-3 w-3 text-text-200" />
                                        </div>
                                        <span className="text-sm font-medium text-text-100">
                                          {insight.confidence}% confianza
                                        </span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-bg-200 border-bg-300">
                                      <p className="text-text-100">
                                        Confianza del modelo de IA
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                {/* Valor estimado */}
                                {insight.estimatedValue && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="flex items-center gap-2 cursor-help">
                                          <div className="p-1 rounded bg-bg-300/30">
                                            <DollarSign className="h-3 w-3 text-accent-100" />
                                          </div>
                                          <span className="text-sm font-medium text-accent-100">
                                            ${insight.estimatedValue} anual
                                          </span>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-bg-200 border-bg-300">
                                        <p className="text-text-100">
                                          Valor potencial anualizado
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}

                                {/* Timeframe */}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center gap-2 cursor-help">
                                        <div className="p-1 rounded bg-bg-300/30">
                                          <TimeframeIcon className="h-3 w-3 text-blue-400" />
                                        </div>
                                        <span className="text-sm text-text-200">
                                          {insight.timeframe === "immediate"
                                            ? "Inmediato"
                                            : insight.timeframe === "daily"
                                            ? "Diario"
                                            : insight.timeframe === "weekly"
                                            ? "Semanal"
                                            : insight.timeframe === "monthly"
                                            ? "Mensual"
                                            : insight.timeframe === "quarterly"
                                            ? "Trimestral"
                                            : "Estacional"}
                                        </span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-bg-200 border-bg-300">
                                      <p className="text-text-100">
                                        Horizonte temporal del insight
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mt-3">
                                {insight.tags.map(
                                  (tag: string, idx: number) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="border-bg-300/50 text-text-200 text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Acciones rápidas */}
                            <div className="flex flex-col items-end gap-3">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
                                  onClick={() => toggleInsight(insight.id)}
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronUp className="h-3 w-3 mr-2" />
                                      Menos
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="h-3 w-3 mr-2" />
                                      Detalles
                                    </>
                                  )}
                                </Button>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant={
                                          insight.read ? "outline" : "default"
                                        }
                                        className={
                                          insight.read
                                            ? "border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                                            : "bg-gradient-to-r from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 text-white"
                                        }
                                        onClick={() =>
                                          toggleReadStatus(insight.id)
                                        }
                                      >
                                        {insight.read ? (
                                          <EyeOff className="h-3 w-3" />
                                        ) : (
                                          <Eye className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-bg-200 border-bg-300">
                                      <p className="text-text-100">
                                        {insight.read
                                          ? "Marcar como no leído"
                                          : "Marcar como leído"}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-bg-300/50 text-text-200 hover:bg-bg-300/30"
                                    >
                                      <MoreVertical className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="bg-bg-200 border-bg-300/50">
                                    <DropdownMenuItem className="text-text-200 hover:text-text-100">
                                      <Bookmark className="h-4 w-4 mr-2" />
                                      Guardar insight
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-text-200 hover:text-text-100">
                                      <Share2 className="h-4 w-4 mr-2" />
                                      Compartir
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-text-200 hover:text-text-100">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Abrir en simulador
                                    </DropdownMenuItem>
                                    <Separator className="my-1 bg-bg-300/30" />
                                    <DropdownMenuItem className="text-red-400 hover:text-red-300">
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Descartar insight
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              {/* Feedback */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-text-200/70">
                                  ¿Útil?
                                </span>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className={`h-8 w-8 p-0 ${
                                      hasFeedback === "helpful"
                                        ? "text-accent-100 bg-accent-100/20"
                                        : "text-text-200 hover:text-accent-100"
                                    }`}
                                    onClick={() =>
                                      handleFeedback(insight.id, "helpful")
                                    }
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className={`h-8 w-8 p-0 ${
                                      hasFeedback === "not-helpful"
                                        ? "text-red-400 bg-red-500/20"
                                        : "text-text-200 hover:text-red-400"
                                    }`}
                                    onClick={() =>
                                      handleFeedback(insight.id, "not-helpful")
                                    }
                                  >
                                    <ThumbsDown className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Contenido expandible */}
                          <Collapsible
                            open={isExpanded}
                            onOpenChange={() => toggleInsight(insight.id)}
                          >
                            <CollapsibleContent className="space-y-6 pt-6 border-t border-bg-300/30">
                              {/* Descripción completa */}
                              <div>
                                <h4 className="text-text-100 font-medium mb-3 flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-blue-400" />
                                  Análisis Completo
                                </h4>
                                <p className="text-sm text-text-200 bg-gradient-to-br from-bg-300/20 to-bg-300/10 p-4 rounded-lg border border-bg-300/40">
                                  {insight.description}
                                </p>
                              </div>

                              {/* Detalles específicos */}
                              {insight.details && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* Recomendaciones */}
                                  {insight.details.recommendations && (
                                    <div>
                                      <h4 className="text-text-100 font-medium mb-3 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-primary-200" />
                                        Recomendaciones
                                      </h4>
                                      <ul className="space-y-2">
                                        {insight.details.recommendations.map(
                                          (rec: string, idx: number) => (
                                            <li
                                              key={idx}
                                              className="flex items-start gap-2 text-sm text-text-200"
                                            >
                                              <div className="p-1 rounded bg-primary-100/20 mt-0.5">
                                                <Target className="h-3 w-3 text-primary-200" />
                                              </div>
                                              <span>{rec}</span>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Siguientes pasos */}
                                  {insight.details.nextSteps && (
                                    <div>
                                      <h4 className="text-text-100 font-medium mb-3 flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-accent-100" />
                                        Siguientes Pasos
                                      </h4>
                                      <ul className="space-y-2">
                                        {insight.details.nextSteps.map(
                                          (step: string, idx: number) => (
                                            <li
                                              key={idx}
                                              className="flex items-start gap-2 text-sm text-text-200"
                                            >
                                              <div className="p-1 rounded bg-accent-100/20 mt-0.5">
                                                <CheckCircle className="h-3 w-3 text-accent-100" />
                                              </div>
                                              <span>{step}</span>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Impacto potencial */}
                                  {insight.details.potentialImpact && (
                                    <div className="lg:col-span-2">
                                      <h4 className="text-text-100 font-medium mb-3 flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-accent-100" />
                                        Impacto Potencial
                                      </h4>
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {Object.entries(
                                          insight.details.potentialImpact
                                        ).map(([key, value]: [string, any]) => (
                                          <div
                                            key={key}
                                            className="p-3 rounded-lg bg-gradient-to-br from-accent-100/10 to-accent-100/5 border border-accent-100/20 text-center"
                                          >
                                            <div className="text-xs text-text-200 mb-1 capitalize">
                                              {key
                                                .replace(/([A-Z])/g, " $1")
                                                .toLowerCase()}
                                            </div>
                                            <div className="text-lg font-bold text-accent-100">
                                              {typeof value === "number" &&
                                              key.includes("Savings")
                                                ? `$${value}`
                                                : value}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Acciones finales */}
                              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-bg-300/30">
                                <Button className="bg-gradient-to-r from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 text-white flex-1">
                                  <Target className="h-4 w-4 mr-2" />
                                  Aplicar Recomendaciones
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
                                >
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Programar Acción
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                                >
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Pedir Ayuda
                                </Button>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 inline-block mb-4">
                  <Lightbulb className="h-12 w-12 text-text-200/50" />
                </div>
                <h3 className="text-lg font-semibold text-text-100 mb-2">
                  No hay insights disponibles
                </h3>
                <p className="text-text-200 mb-6 max-w-md mx-auto">
                  {searchQuery
                    ? "No encontramos insights que coincidan con tu búsqueda"
                    : "La IA está analizando tus datos para generar insights personalizados"}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                      setPriorityFilter("all");
                      setImpactFilter("all");
                    }}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Limpiar filtros
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 text-white"
                    onClick={() => setAutoRefresh(!autoRefresh)}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {autoRefresh
                      ? "Pausar auto-refresh"
                      : "Activar auto-refresh"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="bg-gradient-to-r from-bg-300/20 to-transparent border-t border-bg-300/40 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
                className="data-[state=checked]:bg-primary-100"
              />
              <Label
                htmlFor="auto-refresh"
                className="text-sm text-text-200 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3 mr-1 inline" />
                Auto-refresh cada 30 min
              </Label>
            </div>
            <div className="text-sm text-text-200/70">
              • Última actualización: hoy a las{" "}
              {new Date().toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Insights
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 text-white"
            >
              <Brain className="h-4 w-4 mr-2" />
              Generar Nuevos Insights
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AnalyticsInsights;
