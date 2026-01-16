// src/components/analytics/PredictiveAlerts.tsx
import React, { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Calendar,
  Filter,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  BarChart3,
  RefreshCw,
  Settings,
  BellRing,
  Plus,
  Minus,
  ExternalLink,
  Info,
  ArrowRight,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Heart,
  CloudLightning,
  Waves,
  Rocket,
  Download, // Añadido
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area"; // Añadido
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const PredictiveAlerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [showResolved, setShowResolved] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  const [notificationSound, setNotificationSound] = useState(true);
  const [alertCount, setAlertCount] = useState({ active: 0, resolved: 0 });
  const [showFilters, setShowFilters] = useState(false);

  // Animación de entrada para las alertas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Inicializar datos de ejemplo
  useEffect(() => {
    const mockAlerts = [
      {
        id: 1,
        title: "Presupuesto de Entretenimiento Excedido",
        description:
          "Estás gastando 35% más de lo presupuestado en entretenimiento este mes",
        category: "presupuesto",
        priority: "high",
        status: "active",
        confidence: 94,
        predictedDate: "2024-06-15",
        impact: -850,
        trigger: "spending_trend",
        recommendations: [
          "Reducir suscripciones de streaming en $45/mes",
          "Limitar salidas a restaurantes a 2 veces por semana",
          "Explorar opciones gratuitas de entretenimiento local",
        ],
        createdAt: "2024-05-28T10:30:00Z",
        updatedAt: "2024-05-28T10:30:00Z",
        icon: AlertTriangle,
        color: "text-red-400",
        bgColor: "from-red-500/15 via-red-500/10 to-red-400/5",
        borderColor: "border-red-500/30",
        daysToImpact: 5,
        trend: "up",
        metrics: {
          budget: 500,
          spent: 675,
          percentage: 135,
        },
      },
      {
        id: 2,
        title: "Oportunidad: Acelerar Meta de Viaje",
        description: "Excedente detectado podría adelantar tu meta 2 meses",
        category: "ahorro",
        priority: "medium",
        status: "active",
        confidence: 88,
        predictedDate: "2024-06-30",
        impact: 1200,
        trigger: "surplus_detection",
        recommendations: [
          "Transferir $450 a tu cuenta de viaje",
          "Configurar ahorro automático con excedentes",
          "Revisar otras metas que podrían beneficiarse",
        ],
        createdAt: "2024-05-28T09:15:00Z",
        updatedAt: "2024-05-28T09:15:00Z",
        icon: Rocket,
        color: "text-emerald-400",
        bgColor: "from-emerald-500/15 via-emerald-500/10 to-emerald-400/5",
        borderColor: "border-emerald-500/30",
        daysToImpact: 12,
        trend: "up",
        metrics: {
          current: 1800,
          target: 3000,
          percentage: 60,
        },
      },
      {
        id: 3,
        title: "Meta 'Fondo Emergencia' en Riesgo",
        description: "Progreso lento podría retrasar tu meta 3 meses",
        category: "metas",
        priority: "high",
        status: "active",
        confidence: 86,
        predictedDate: "2024-07-15",
        impact: -1200,
        trigger: "goal_progress",
        recommendations: [
          "Aumentar aporte mensual en $250",
          "Explorar ingresos adicionales temporales",
          "Optimizar gastos discrecionales por $150/mes",
        ],
        createdAt: "2024-05-27T14:20:00Z",
        updatedAt: "2024-05-27T14:20:00Z",
        icon: CloudLightning,
        color: "text-amber-400",
        bgColor: "from-amber-500/15 via-amber-500/10 to-amber-400/5",
        borderColor: "border-amber-500/30",
        daysToImpact: 18,
        trend: "down",
        metrics: {
          current: 4500,
          target: 10000,
          percentage: 45,
        },
      },
      {
        id: 4,
        title: "Patrón Nocturno Detectado",
        description: "Compras después de las 10 PM aumentaron 45% este mes",
        category: "comportamiento",
        priority: "medium",
        status: "active",
        confidence: 82,
        predictedDate: "2024-06-10",
        impact: -320,
        trigger: "anomaly_detection",
        recommendations: [
          "Activar modo 'No Molestar' en apps de compra nocturna",
          "Configurar límite semanal para compras nocturnas",
          "Revisar hábitos de sueño y estrés",
        ],
        createdAt: "2024-05-26T18:45:00Z",
        updatedAt: "2024-05-26T18:45:00Z",
        icon: Waves,
        color: "text-indigo-400",
        bgColor: "from-indigo-500/15 via-indigo-500/10 to-indigo-400/5",
        borderColor: "border-indigo-500/30",
        daysToImpact: 2,
        trend: "up",
        metrics: {
          previousMonth: 280,
          currentMonth: 600,
          percentage: 45,
        },
      },
      {
        id: 5,
        title: "Bono Anual Proyectado",
        description: "Posible bono de fin de año podría superar expectativas",
        category: "ingresos",
        priority: "low",
        status: "active",
        confidence: 72,
        predictedDate: "2024-12-15",
        impact: 2500,
        trigger: "income_prediction",
        recommendations: [
          "Planificar asignación del bono con 3 categorías: 50% ahorro, 30% inversión, 20% disfrute",
          "Explorar opciones de inversión a corto plazo",
          "Acelerar metas específicas con estos fondos",
        ],
        createdAt: "2024-05-25T11:10:00Z",
        updatedAt: "2024-05-25T11:10:00Z",
        icon: TrendingUp,
        color: "text-primary-200",
        bgColor: "from-primary-100/15 via-primary-100/10 to-primary-200/5",
        borderColor: "border-primary-100/30",
        daysToImpact: 180,
        trend: "up",
        metrics: {
          expected: 1800,
          projected: 2500,
          difference: 700,
        },
      },
    ];

    const allAlerts = [...mockAlerts];
    setAlerts(allAlerts);

    // Calcular conteos
    const activeCount = mockAlerts.length;
    setAlertCount({ active: activeCount, resolved: 0 });
  }, [showResolved]);

  // Filtrar alertas
  const filteredAlerts = alerts.filter((alert) => {
    const statusMatch = filterStatus === "all" || alert.status === filterStatus;
    const priorityMatch =
      filterPriority === "all" || alert.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  // Formatear fechas
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Formatear moneda
  const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount);
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(absAmount);
  };

  // Obtener color de prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          text: "text-red-400",
          bg: "from-red-500/20 to-red-400/10",
          border: "border-red-500/30",
          icon: AlertOctagon,
        };
      case "medium":
        return {
          text: "text-amber-400",
          bg: "from-amber-500/20 to-amber-400/10",
          border: "border-amber-500/30",
          icon: AlertTriangle,
        };
      case "low":
        return {
          text: "text-primary-200",
          bg: "from-primary-100/20 to-primary-200/10",
          border: "border-primary-100/30",
          icon: AlertCircle,
        };
      default:
        return {
          text: "text-text-200",
          bg: "from-bg-300/20 to-bg-300/10",
          border: "border-bg-300/30",
          icon: Bell,
        };
    }
  };

  // Obtener ícono de tendencia
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUpIcon : TrendingDownIcon;
  };

  // Manejar resolución de alerta
  const handleResolveAlert = (alertId: number) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: "resolved",
              resolvedAt: new Date().toISOString(),
            }
          : alert
      )
    );
    setAlertCount((prev) => ({
      ...prev,
      active: prev.active - 1,
      resolved: prev.resolved + 1,
    }));

    // Animación de éxito
    setTimeout(() => {
      setExpandedAlert(null);
    }, 300);
  };

  // Manejar ignorar alerta
  const handleIgnoreAlert = (alertId: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId));
    setAlertCount((prev) => ({
      ...prev,
      active: prev.active - 1,
    }));
  };

  // Componente de tarjeta de alerta
  const AlertCard = ({ alert }: { alert: any }) => {
    const Icon = alert.icon;
    const priorityColors = getPriorityColor(alert.priority);
    const PriorityIcon = priorityColors.icon;
    const TrendIcon = getTrendIcon(alert.trend);
    const isExpanded = expandedAlert === alert.id;
    const isResolved = alert.status === "resolved";

    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
      >
        <Card
          className={cn(
            "border overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/10",
            isResolved
              ? "border-bg-300/40 bg-gradient-to-br from-bg-300/10 to-bg-300/5"
              : "border-red-500/20 bg-gradient-to-br via-bg-300/5 to-bg-300/3",
            alert.priority === "high" && !isResolved ? "border-red-500/30" : "",
            alert.priority === "medium" && !isResolved
              ? "border-amber-500/30"
              : "",
            alert.priority === "low" && !isResolved
              ? "border-primary-100/30"
              : ""
          )}
        >
          {/* Efecto de brillo en hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-100/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <CardContent className="p-6 relative">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {/* Ícono animado */}
                  <motion.div
                    animate={
                      isResolved
                        ? {}
                        : {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0, -5, 0],
                          }
                    }
                    transition={{
                      duration: 2,
                      repeat: isResolved ? 0 : Infinity,
                      repeatDelay: 3,
                    }}
                    className={cn(
                      "p-3 rounded-xl border relative",
                      isResolved
                        ? "bg-bg-300/20 border-bg-300/40"
                        : `bg-gradient-to-br ${alert.bgColor} ${alert.borderColor}`
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isResolved ? "text-text-200" : alert.color
                      )}
                    />
                    {/* Efecto de pulso para alertas activas */}
                    {!isResolved && (
                      <div className="absolute -top-1 -right-1">
                        <div className="relative">
                          <div className="absolute h-2 w-2 bg-red-500 rounded-full animate-ping opacity-75" />
                          <div className="h-2 w-2 bg-red-500 rounded-full" />
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Contenido principal */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3
                        className={cn(
                          "text-base font-semibold leading-tight",
                          isResolved ? "text-text-200" : "text-text-100"
                        )}
                      >
                        {alert.title}
                      </h3>
                      <Badge
                        className={cn(
                          "px-2.5 py-1 border transition-all duration-300",
                          priorityColors.bg,
                          priorityColors.border,
                          priorityColors.text,
                          "shadow-sm"
                        )}
                      >
                        <PriorityIcon className="h-3 w-3 mr-1.5" />
                        <span className="font-medium">
                          {alert.priority === "high"
                            ? "Urgente"
                            : alert.priority === "medium"
                            ? "Importante"
                            : "Información"}
                        </span>
                      </Badge>
                    </div>

                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        isResolved ? "text-text-200/80" : "text-text-200"
                      )}
                    >
                      {alert.description}
                    </p>
                  </div>
                </div>

                {/* Botón de expandir */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-bg-300/30 transition-all duration-300"
                  onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <ChevronDown className="h-4 w-4 text-text-200" />
                  </motion.div>
                </Button>
              </div>

              {/* Métricas rápidas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Confianza */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-text-200">
                      Confianza IA
                    </Label>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        alert.confidence >= 90
                          ? "text-emerald-400"
                          : alert.confidence >= 80
                          ? "text-amber-400"
                          : "text-red-400"
                      )}
                    >
                      {alert.confidence}%
                    </span>
                  </div>
                  <Progress
                    value={alert.confidence}
                    className="h-1.5 bg-bg-300/30"
                    indicatorClassName={cn(
                      alert.confidence >= 90
                        ? "bg-emerald-500"
                        : alert.confidence >= 80
                        ? "bg-amber-500"
                        : "bg-red-500"
                    )}
                  />
                </div>

                {/* Tiempo hasta impacto */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-text-200">
                      Tiempo Restante
                    </Label>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        alert.daysToImpact <= 7
                          ? "text-red-400"
                          : alert.daysToImpact <= 30
                          ? "text-amber-400"
                          : "text-text-200"
                      )}
                    >
                      {alert.daysToImpact} días
                    </span>
                  </div>
                  <Progress
                    value={Math.min(alert.daysToImpact * 3.33, 100)}
                    className="h-1.5 bg-bg-300/30"
                    indicatorClassName="bg-primary-100"
                  />
                </div>

                {/* Impacto financiero */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-text-200">
                      Impacto Estimado
                    </Label>
                    <div className="flex items-center gap-1">
                      <TrendIcon
                        className={cn(
                          "h-3 w-3",
                          alert.impact > 0 ? "text-emerald-400" : "text-red-400"
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          alert.impact > 0 ? "text-emerald-400" : "text-red-400"
                        )}
                      >
                        {alert.impact > 0 ? "+" : ""}
                        {formatCurrency(alert.impact)}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-bg-300/30 rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        alert.impact > 0 ? "bg-emerald-500" : "bg-red-500"
                      )}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(Math.abs(alert.impact) / 20, 100)}%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Categoría */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-text-200">Categoría</Label>
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded bg-bg-300/30">
                      <Target className="h-3 w-3 text-text-200" />
                    </div>
                    <span className="text-xs font-medium text-text-100 capitalize">
                      {alert.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenido expandido con animación */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="bg-bg-300/30 my-4" />

                    <div className="space-y-4">
                      {/* Recomendaciones */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-100/30">
                            <Sparkles className="h-4 w-4 text-primary-200" />
                          </div>
                          <h4 className="text-sm font-semibold text-text-100">
                            Recomendaciones de IA
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {alert.recommendations.map(
                            (rec: string, idx: number) => (
                              <motion.div
                                key={idx}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/30 group hover:from-primary-100/10 hover:to-primary-200/5 hover:border-primary-100/20 transition-all duration-300"
                              >
                                <div className="flex-shrink-0">
                                  <div className="p-1.5 rounded-md bg-primary-100/20 group-hover:bg-primary-100/30 transition-colors">
                                    <CheckCircle className="h-3.5 w-3.5 text-primary-200" />
                                  </div>
                                </div>
                                <p className="text-sm text-text-200 flex-1">
                                  {rec}
                                </p>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-xs text-primary-200 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                  Aplicar
                                  <ArrowRight className="h-3 w-3 ml-1" />
                                </Button>
                              </motion.div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Métricas detalladas */}
                      {alert.metrics && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-bg-300/30 to-bg-300/20 border border-bg-300/40">
                              <BarChart3 className="h-4 w-4 text-text-200" />
                            </div>
                            <h4 className="text-sm font-semibold text-text-100">
                              Métricas Detalladas
                            </h4>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(alert.metrics).map(
                              ([key, value], idx) => {
                                const displayValue = (() => {
                                  const numValue = value as number;
                                  if (typeof numValue === "number") {
                                    if (key.includes("percentage")) {
                                      return `${numValue}%`;
                                    } else if (Math.abs(numValue) > 999) {
                                      return formatCurrency(numValue);
                                    }
                                    return numValue.toString();
                                  }
                                  return value as string;
                                })();

                                return (
                                  <div
                                    key={key}
                                    className="p-3 rounded-lg bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/30"
                                  >
                                    <div className="text-xs text-text-200 mb-1 capitalize">
                                      {key.replace(/([A-Z])/g, " $1").trim()}
                                    </div>
                                    <div className="text-sm font-semibold text-text-100">
                                      {displayValue}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}

                      {/* Acciones */}
                      {!isResolved && (
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex gap-2 pt-2"
                        >
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marcar como Resuelta
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/40"
                            onClick={() => handleIgnoreAlert(alert.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Ignorar
                          </Button>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-text-200 hover:text-primary-200"
                                >
                                  <Info className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-bg-200 border-bg-300">
                                <p className="text-text-100">Más información</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>

          {/* Footer de la alerta */}
          <CardFooter className="px-6 py-3 border-t border-bg-300/30 bg-gradient-to-r from-bg-300/5 to-transparent">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-text-200/60" />
                <span className="text-xs text-text-200/70">
                  Detectada {formatDate(alert.createdAt)}
                </span>
              </div>
              <div className="text-xs text-text-200/70">
                ID: ALERT-{alert.id.toString().padStart(3, "0")}
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Principal */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 bg-gradient-to-br from-primary-100/10 via-primary-200/5 to-accent-100/5 backdrop-blur-lg border border-bg-300/40 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

          <CardHeader className="pb-4 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-100/30">
                    <Bell className="h-6 w-6 text-primary-200" />
                  </div>
                  {/* Indicador de alertas activas */}
                  {alertCount.active > 0 && (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(239, 68, 68, 0.7)",
                          "0 0 0 10px rgba(239, 68, 68, 0)",
                          "0 0 0 0 rgba(239, 68, 68, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 5,
                      }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className="relative">
                        <div className="h-5 w-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                          <span className="text-xs font-bold text-white">
                            {alertCount.active}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-text-100 flex items-center gap-3">
                    Sistema de Alertas Predictivas
                    <Badge className="bg-gradient-to-r from-primary-100 to-accent-100 text-white shadow-lg shadow-primary-100/20">
                      <Zap className="h-3 w-3 mr-1.5" />
                      IA Proactiva
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-text-200 mt-1">
                    Detección inteligente de riesgos y oportunidades antes de
                    que ocurran
                  </CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-red-500/10 to-red-400/5 border border-red-500/20">
                    <div className="text-2xl font-bold text-red-400">
                      {alertCount.active}
                    </div>
                    <div className="text-xs text-text-200 mt-1">
                      Alertas Activas
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20">
                    <div className="text-2xl font-bold text-primary-200">
                      {alertCount.resolved}
                    </div>
                    <div className="text-xs text-text-200 mt-1">Resueltas</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="auto-refresh"
                    checked={autoRefresh}
                    onCheckedChange={setAutoRefresh}
                    className="data-[state=checked]:bg-primary-100"
                  />
                  <Label
                    htmlFor="auto-refresh"
                    className="text-sm text-text-200 cursor-pointer flex items-center gap-2"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Auto-refresh</span>
                  </Label>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Panel de Filtros y Controles */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border border-bg-300/40 bg-gradient-to-br from-bg-300/10 to-bg-300/5">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Filtros principales */}
              <div className="flex flex-wrap gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-text-200">Estado</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px] bg-bg-300/10 border-bg-300/40 text-text-100">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-bg-200 border-bg-300">
                      <SelectItem value="all" className="text-text-100">
                        Todas
                      </SelectItem>
                      <SelectItem value="active" className="text-text-100">
                        Activas
                      </SelectItem>
                      <SelectItem value="resolved" className="text-text-100">
                        Resueltas
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-text-200">Prioridad</Label>
                  <Select
                    value={filterPriority}
                    onValueChange={setFilterPriority}
                  >
                    <SelectTrigger className="w-[140px] bg-bg-300/10 border-bg-300/40 text-text-100">
                      <SelectValue placeholder="Prioridad" />
                    </SelectTrigger>
                    <SelectContent className="bg-bg-200 border-bg-300">
                      <SelectItem value="all" className="text-text-100">
                        Todas
                      </SelectItem>
                      <SelectItem value="high" className="text-text-100">
                        Urgentes
                      </SelectItem>
                      <SelectItem value="medium" className="text-text-100">
                        Importantes
                      </SelectItem>
                      <SelectItem value="low" className="text-text-100">
                        Informativas
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="show-resolved"
                      checked={showResolved}
                      onCheckedChange={setShowResolved}
                      className="data-[state=checked]:bg-primary-100"
                    />
                    <Label
                      htmlFor="show-resolved"
                      className="text-sm text-text-200 cursor-pointer"
                    >
                      Mostrar resueltas
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="notification-sound"
                      checked={notificationSound}
                      onCheckedChange={setNotificationSound}
                      className="data-[state=checked]:bg-accent-100"
                    />
                    <Label
                      htmlFor="notification-sound"
                      className="text-sm text-text-200 cursor-pointer flex items-center gap-2"
                    >
                      <BellRing className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Sonido</span>
                    </Label>
                  </div>
                </div>
              </div>

              {/* Acciones principales */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? "Menos filtros" : "Más filtros"}
                </Button>

                <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/20">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Alerta
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-text-200 hover:text-primary-200"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-bg-200 border-bg-300">
                      <p className="text-text-100">Configurar alertas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Filtros avanzados (colapsables) */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Separator className="my-4 bg-bg-300/30" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-text-200">Categoría</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-bg-300/10 border-bg-300/40">
                          <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          <SelectItem value="presupuesto">
                            Presupuesto
                          </SelectItem>
                          <SelectItem value="ahorro">Ahorro</SelectItem>
                          <SelectItem value="metas">Metas</SelectItem>
                          <SelectItem value="comportamiento">
                            Comportamiento
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-text-200">
                        Impacto mínimo
                      </Label>
                      <Select defaultValue="any">
                        <SelectTrigger className="bg-bg-300/10 border-bg-300/40">
                          <SelectValue placeholder="Cualquier impacto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Cualquier impacto</SelectItem>
                          <SelectItem value="high">Alto (≥ $500)</SelectItem>
                          <SelectItem value="medium">
                            Medio ($100-$500)
                          </SelectItem>
                          <SelectItem value="low">Bajo (&lt; $100)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-text-200">
                        Ordenar por
                      </Label>
                      <Select defaultValue="priority">
                        <SelectTrigger className="bg-bg-300/10 border-bg-300/40">
                          <SelectValue placeholder="Prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="priority">Prioridad</SelectItem>
                          <SelectItem value="date">Fecha</SelectItem>
                          <SelectItem value="impact">Impacto</SelectItem>
                          <SelectItem value="confidence">Confianza</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contenido Principal - Lista de Alertas */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border border-bg-300/40 bg-gradient-to-br from-bg-300/10 to-bg-300/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-text-100">
                  Alertas Detectadas
                  <span className="text-text-200 font-normal ml-2">
                    ({filteredAlerts.length} encontradas)
                  </span>
                </CardTitle>
                <CardDescription className="text-text-200 mt-1">
                  Organizadas por prioridad y tiempo de impacto
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-text-200 hover:text-primary-200"
                  onClick={() => setShowResolved(!showResolved)}
                >
                  {showResolved ? (
                    <EyeOff className="h-4 w-4 mr-1.5" />
                  ) : (
                    <Eye className="h-4 w-4 mr-1.5" />
                  )}
                  {showResolved ? "Ocultar" : "Mostrar"} resueltas
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
            <AnimatePresence mode="wait">
              {filteredAlerts.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <ScrollArea className="h-[calc(100vh-550px)] min-h-[600px]">
                    <div className="space-y-4 pr-4">
                      {filteredAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} />
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-16 text-center"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="p-4 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-100/30 inline-block mb-4"
                  >
                    <Bell className="h-16 w-16 text-primary-200/70" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-text-100 mb-2">
                    ¡Excelente trabajo!
                  </h3>
                  <p className="text-text-200 mb-6 max-w-md mx-auto text-lg">
                    No hay alertas activas. Tu salud financiera está en óptimas
                    condiciones.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver Análisis Completo
                    </Button>
                    <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/20">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Configurar Alertas Personalizadas
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PredictiveAlerts;
