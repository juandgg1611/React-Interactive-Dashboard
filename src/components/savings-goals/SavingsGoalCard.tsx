// src/savings-goals/SavingsGoalCard.tsx
import React, { useState } from "react";
import {
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  MoreVertical,
  Edit,
  Pause,
  Play,
  Trash2,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Car,
  Plane,
  Shield,
  Laptop,
  Home,
  BookOpen,
  Trophy,
  Heart,
  Building,
  Smartphone,
  CircleCheckBig,
  Zap,
  Lightbulb,
  Target as TargetIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Progress } from "../ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// Definir tipos locales si no están en savings.types.ts
interface SavingsGoalCardProps {
  goal: {
    id: number;
    name: string;
    icon: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    monthlyContribution: number;
    category: string;
    status: "in-progress" | "completed" | "paused" | "behind";
    priority: "low" | "medium" | "high" | "critical";
    color: string;
    progress: number;
    insights: string[];
    createdAt?: string;
    lastUpdated?: string;
    monthlyRequired?: number;
    estimatedCompletion?: string;
    riskLevel?: "low" | "medium" | "high";
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onTogglePause?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

// Mapeo mejorado de iconos con más opciones
const getIconComponent = (iconName: string) => {
  const iconComponents: Record<string, React.ComponentType<any>> = {
    car: Car,
    plane: Plane,
    beach: Plane,
    shield: Shield,
    laptop: Laptop,
    home: Home,
    education: BookOpen,
    travel: Plane,
    trophy: Trophy,
    health: Heart,
    business: Building,
    technology: Smartphone,
    target: TargetIcon,
    zap: Zap,
    lightbulb: Lightbulb,
    default: Target,
  };

  return iconComponents[iconName.toLowerCase()] || Target;
};

// Función para obtener colores basados en estado
const getStatusConfig = (status: string) => {
  const configs = {
    completed: {
      bg: "bg-gradient-to-br from-green-500/15 to-green-500/5",
      text: "text-green-400",
      border: "border-green-500/25",
      icon: "text-green-400",
      badge:
        "bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400 border-green-500/30",
      indicator: "from-green-400 to-green-500",
      gradient:
        "bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent",
      iconBg: "bg-green-500/20",
      pulse: "shadow-green-500/20",
    },
    "in-progress": {
      bg: "bg-gradient-to-br from-blue-500/15 to-blue-500/5",
      text: "text-blue-400",
      border: "border-blue-500/25",
      icon: "text-blue-400",
      badge:
        "bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30",
      indicator: "from-blue-400 via-blue-500 to-blue-600",
      gradient:
        "bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent",
      iconBg: "bg-blue-500/20",
      pulse: "shadow-blue-500/20",
    },
    paused: {
      bg: "bg-gradient-to-br from-yellow-500/15 to-yellow-500/5",
      text: "text-yellow-400",
      border: "border-yellow-500/25",
      icon: "text-yellow-400",
      badge:
        "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 text-yellow-400 border-yellow-500/30",
      indicator: "from-yellow-400 via-yellow-500 to-yellow-600",
      gradient:
        "bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent",
      iconBg: "bg-yellow-500/20",
      pulse: "shadow-yellow-500/20",
    },
    behind: {
      bg: "bg-gradient-to-br from-red-500/15 to-red-500/5",
      text: "text-red-400",
      border: "border-red-500/25",
      icon: "text-red-400",
      badge:
        "bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-400 border-red-500/30",
      indicator: "from-red-400 via-red-500 to-red-600",
      gradient:
        "bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent",
      iconBg: "bg-red-500/20",
      pulse: "shadow-red-500/20",
    },
  };

  return configs[status as keyof typeof configs] || configs["in-progress"];
};

// Función para obtener configuración de prioridad
const getPriorityConfig = (priority: string) => {
  const configs = {
    critical: {
      bg: "bg-gradient-to-r from-red-500/20 via-red-600/15 to-red-700/10",
      text: "text-red-300",
      border: "border-red-500/40",
      glow: "shadow-red-500/20",
      label: "Crítica",
    },
    high: {
      bg: "bg-gradient-to-r from-orange-500/20 via-orange-600/15 to-orange-700/10",
      text: "text-orange-300",
      border: "border-orange-500/40",
      glow: "shadow-orange-500/20",
      label: "Alta",
    },
    medium: {
      bg: "bg-gradient-to-r from-yellow-500/20 via-yellow-600/15 to-yellow-700/10",
      text: "text-yellow-300",
      border: "border-yellow-500/40",
      glow: "shadow-yellow-500/20",
      label: "Media",
    },
    low: {
      bg: "bg-gradient-to-r from-green-500/20 via-green-600/15 to-green-700/10",
      text: "text-green-300",
      border: "border-green-500/40",
      glow: "shadow-green-500/20",
      label: "Baja",
    },
  };

  return configs[priority as keyof typeof configs] || configs["medium"];
};

// Función para calcular métricas
const calculateMetrics = (goal: any) => {
  const deadline = new Date(goal.deadline);
  const now = new Date();
  const totalMonths = Math.max(
    1,
    Math.ceil(
      (deadline.getTime() - new Date(goal.createdAt || now).getTime()) /
        (1000 * 60 * 60 * 24 * 30)
    )
  );
  const monthsRemaining = Math.max(
    0,
    Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30))
  );
  const amountRemaining = goal.targetAmount - goal.currentAmount;
  const monthlyRequired = amountRemaining / Math.max(1, monthsRemaining);
  const monthlyDiff = monthlyRequired - goal.monthlyContribution;

  // Calcular estimación de finalización
  let estimatedCompletion = deadline;
  if (goal.monthlyContribution > 0) {
    const monthsToComplete = amountRemaining / goal.monthlyContribution;
    estimatedCompletion = new Date(now);
    estimatedCompletion.setMonth(
      estimatedCompletion.getMonth() + Math.ceil(monthsToComplete)
    );
  }

  // Determinar nivel de riesgo
  let riskLevel: "low" | "medium" | "high" = "low";
  if (monthlyDiff > goal.monthlyContribution * 0.5) {
    riskLevel = "high";
  } else if (monthlyDiff > goal.monthlyContribution * 0.2) {
    riskLevel = "medium";
  }

  return {
    monthsRemaining,
    amountRemaining,
    monthlyRequired,
    monthlyDiff,
    estimatedCompletion,
    riskLevel,
    totalMonths,
    progressPerMonth:
      goal.progress / Math.max(1, totalMonths - monthsRemaining),
  };
};

const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({
  goal,
  onEdit,
  onDelete,
  onTogglePause,
  onViewDetails,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMoreInsights, setShowMoreInsights] = useState(false);

  const IconComponent = getIconComponent(goal.icon);
  const statusConfig = getStatusConfig(goal.status);
  const priorityConfig = getPriorityConfig(goal.priority);
  const metrics = calculateMetrics(goal);

  // Formateo de moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatShortCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${Math.round(amount)}`;
  };

  // Formateo de fechas
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      month: "short",
      year: "numeric",
    });
  };

  // Obtener icono de ritmo
  const getPaceIcon = () => {
    if (goal.status === "completed") return CircleCheckBig;
    if (goal.status === "paused") return AlertCircle;
    if (goal.status === "behind") return TrendingDown;
    if (metrics.monthlyDiff > 0) return TrendingDown;
    return TrendingUp;
  };

  const PaceIcon = getPaceIcon();

  return (
    <TooltipProvider>
      <div
        className={`group relative h-full ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tarjeta principal */}
        <div
          className={`
          relative h-full p-5 rounded-2xl border-2 transition-all duration-500
          ${isHovered ? "shadow-2xl scale-[1.02]" : "shadow-xl"}
          ${statusConfig.bg} ${statusConfig.border}
          backdrop-blur-md
          overflow-hidden
          flex flex-col
          hover:border-opacity-50
        `}
        >
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute inset-0 ${statusConfig.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
            />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/3 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32 group-hover:translate-x-24 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary-100/5 to-transparent rounded-full blur-2xl translate-y-24 -translate-x-24 group-hover:-translate-x-16 transition-transform duration-1000" />
          </div>

          {/* Indicador de completado con animación */}
          {goal.status === "completed" && (
            <div className="absolute -top-2 -right-2 z-20">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 rounded-full blur-md animate-ping opacity-60" />
                <div className="relative p-2.5 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-xl shadow-green-500/30">
                  <CircleCheckBig className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Puntos de interacción rápida */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 z-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onViewDetails}
                  className="p-1.5 rounded-lg bg-bg-300/40 backdrop-blur-sm border border-bg-300/60 hover:bg-primary-100/30 hover:border-primary-100/40 transition-all duration-300"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-text-200" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-bg-300/95 backdrop-blur-xl"
              >
                Ver detalles
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Contenido principal */}
          <div className="relative z-10 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-start gap-3 flex-1 min-w-0 pr-10">
                {/* Icono con animación */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`
                      relative p-3 rounded-xl flex-shrink-0 transition-all duration-300
                      ${isHovered ? "scale-110 rotate-3" : "scale-100"}
                      ${statusConfig.iconBg} border ${statusConfig.border}
                      group-hover:shadow-lg
                    `}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${
                          statusConfig.icon
                        } transition-transform duration-300 ${
                          isHovered ? "scale-110" : ""
                        }`}
                      />
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-bg-300/95 backdrop-blur-xl">
                    {goal.category}
                  </TooltipContent>
                </Tooltip>

                {/* Título y badges */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base lg:text-lg font-bold text-text-100 truncate mb-2 group-hover:text-primary-200 transition-colors duration-300">
                    {goal.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`px-2.5 py-0.5 text-xs font-medium transition-all duration-300 ${
                        isHovered ? "scale-105 shadow-lg" : ""
                      } ${statusConfig.badge}`}
                    >
                      {goal.status === "completed"
                        ? "🎯 Completado"
                        : goal.status === "in-progress"
                        ? "⚡ En progreso"
                        : goal.status === "paused"
                        ? "⏸️ Pausado"
                        : "⚠️ Atrasado"}
                    </Badge>
                    <Badge
                      className={`px-2.5 py-0.5 text-xs font-medium ${
                        priorityConfig.bg
                      } ${priorityConfig.text} border ${
                        priorityConfig.border
                      } ${isHovered ? priorityConfig.glow : ""}`}
                    >
                      {priorityConfig.label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div className="relative z-30">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`
                        h-9 w-9 p-0 rounded-xl
                        bg-gradient-to-br from-bg-300/40 to-bg-300/20 backdrop-blur-sm
                        border border-bg-300/60
                        hover:from-primary-100/30 hover:to-primary-200/20
                        hover:border-primary-100/40
                        hover:text-primary-200
                        transition-all duration-300
                        ${isHovered ? "opacity-100 scale-110" : "opacity-70"}
                        flex items-center justify-center
                        group/button
                      `}
                    >
                      <div className="relative">
                        <div className="flex flex-col gap-0.5 transition-all duration-300 group-hover/button:gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-current transition-transform duration-300 group-hover/button:scale-125" />
                          <div className="w-1.5 h-1.5 rounded-full bg-current transition-transform duration-300 group-hover/button:scale-125" />
                          <div className="w-1.5 h-1.5 rounded-full bg-current transition-transform duration-300 group-hover/button:scale-125" />
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="
                      bg-gradient-to-b from-bg-200/95 via-bg-300/95 to-bg-300/98 
                      backdrop-blur-xl
                      border-2 border-primary-100/25
                      rounded-xl
                      shadow-2xl shadow-black/50
                      min-w-[200px]
                      p-2
                      animate-in fade-in-0 zoom-in-95 duration-200
                      z-50
                    "
                  >
                    <DropdownMenuItem
                      onClick={onEdit}
                      className="
                        px-4 py-3 rounded-lg
                        text-text-100
                        hover:bg-gradient-to-r hover:from-primary-100/25 hover:to-primary-200/15
                        hover:text-primary-200
                        focus:bg-primary-100/25 focus:text-primary-200
                        cursor-pointer
                        transition-all duration-200
                        flex items-center gap-3
                        group/item
                      "
                    >
                      <div className="p-1.5 rounded-lg bg-primary-100/20 group-hover/item:bg-primary-100/30 transition-colors">
                        <Edit className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Editar meta</span>
                      <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={onTogglePause}
                      className="
                        px-4 py-3 rounded-lg
                        text-text-100
                        hover:bg-gradient-to-r hover:from-primary-100/25 hover:to-primary-200/15
                        hover:text-primary-200
                        focus:bg-primary-100/25 focus:text-primary-200
                        cursor-pointer
                        transition-all duration-200
                        flex items-center gap-3
                        group/item
                      "
                    >
                      <div className="p-1.5 rounded-lg bg-primary-100/20 group-hover/item:bg-primary-100/30 transition-colors">
                        {goal.status === "paused" ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <Pause className="h-4 w-4" />
                        )}
                      </div>
                      <span className="font-medium">
                        {goal.status === "paused" ? "Reanudar" : "Pausar"}
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-primary-100/20 to-transparent my-2 h-[1px]" />

                    <DropdownMenuItem
                      onClick={onDelete}
                      className="
                        px-4 py-3 rounded-lg
                        text-red-400
                        hover:bg-gradient-to-r hover:from-red-500/25 hover:to-red-600/15
                        hover:text-red-300
                        focus:bg-red-500/25 focus:text-red-300
                        cursor-pointer
                        transition-all duration-200
                        flex items-center gap-3
                        group/item
                      "
                    >
                      <div className="p-1.5 rounded-lg bg-red-500/20 group-hover/item:bg-red-500/30 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Barra de progreso con métricas */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-text-200">
                  {formatCurrency(goal.currentAmount)}
                  <span className="block text-[10px] opacity-70">Actual</span>
                </span>
                <div className="text-center">
                  <div className="text-lg font-bold bg-gradient-to-r from-text-100 via-primary-200 to-accent-100 bg-clip-text text-transparent">
                    {goal.progress}%
                  </div>
                  <div className="text-[10px] text-text-200/70">Progreso</div>
                </div>
                <span className="text-xs font-medium text-text-200 text-right">
                  {formatCurrency(goal.targetAmount)}
                  <span className="block text-[10px] opacity-70">Objetivo</span>
                </span>
              </div>

              <div className="relative">
                <Progress
                  value={goal.progress}
                  className="h-3 bg-bg-300/40 rounded-full overflow-hidden border border-bg-300/60"
                  indicatorClassName={`
                    rounded-full transition-all duration-1000 ease-out
                    bg-gradient-to-r ${statusConfig.indicator}
                    shadow-lg ${statusConfig.pulse}
                  `}
                />

                {/* Indicador de progreso actual */}
                <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${goal.progress}%`,
                      background: `linear-gradient(90deg, ${goal.color}30 0%, ${goal.color}10 100%)`,
                    }}
                  />
                </div>

                {/* Marcas de progreso */}
                <div className="flex justify-between mt-1.5 px-1">
                  {[0, 25, 50, 75, 100].map((mark) => (
                    <div key={mark} className="flex flex-col items-center">
                      <div className="text-[8px] text-text-200/50">{mark}%</div>
                      <div
                        className={`w-0.5 h-1.5 mt-0.5 rounded-full ${
                          goal.progress >= mark
                            ? "bg-primary-200/50"
                            : "bg-bg-300/30"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid de métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {/* Fecha límite */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-bg-300/25 to-bg-300/10 border border-bg-300/40 hover:border-primary-100/30 transition-all duration-300 cursor-help">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10">
                        <Calendar className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-text-200/60 font-semibold">
                          Límite
                        </div>
                        <div className="text-sm font-bold text-text-100 whitespace-nowrap">
                          {formatDate(new Date(goal.deadline))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-bg-300/95 backdrop-blur-xl">
                  Fecha límite para completar la meta
                </TooltipContent>
              </Tooltip>

              {/* Tiempo restante */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-bg-300/25 to-bg-300/10 border border-bg-300/40 hover:border-primary-100/30 transition-all duration-300 cursor-help">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/10">
                        <Clock className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-text-200/60 font-semibold">
                          Restante
                        </div>
                        <div className="text-sm font-bold text-text-100">
                          {metrics.monthsRemaining}{" "}
                          {metrics.monthsRemaining === 1 ? "mes" : "meses"}
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-bg-300/95 backdrop-blur-xl">
                  Tiempo restante para completar la meta
                </TooltipContent>
              </Tooltip>

              {/* Aporte mensual */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-bg-300/25 to-bg-300/10 border border-bg-300/40 hover:border-primary-100/30 transition-all duration-300 cursor-help">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/10">
                        <DollarSign className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-text-200/60 font-semibold">
                          Mensual
                        </div>
                        <div className="text-sm font-bold text-text-100">
                          {formatShortCurrency(goal.monthlyContribution)}
                          {metrics.monthlyDiff > 0 && (
                            <span className="text-[10px] text-red-400 ml-1">
                              (+{formatShortCurrency(metrics.monthlyDiff)})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-bg-300/95 backdrop-blur-xl">
                  Aporte mensual actual vs requerido
                </TooltipContent>
              </Tooltip>

              {/* Ritmo */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-bg-300/25 to-bg-300/10 border border-bg-300/40 hover:border-primary-100/30 transition-all duration-300 cursor-help">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${
                          goal.status === "completed"
                            ? "from-green-500/20 to-green-600/10"
                            : goal.status === "paused"
                            ? "from-yellow-500/20 to-yellow-600/10"
                            : goal.status === "behind"
                            ? "from-red-500/20 to-red-600/10"
                            : metrics.monthlyDiff > 0
                            ? "from-orange-500/20 to-orange-600/10"
                            : "from-blue-500/20 to-blue-600/10"
                        }`}
                      >
                        <PaceIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-text-200/60 font-semibold">
                          Ritmo
                        </div>
                        <div
                          className={`text-sm font-bold ${
                            goal.status === "completed"
                              ? "text-green-400"
                              : goal.status === "paused"
                              ? "text-yellow-400"
                              : goal.status === "behind"
                              ? "text-red-400"
                              : metrics.monthlyDiff > 0
                              ? "text-orange-400"
                              : "text-blue-400"
                          }`}
                        >
                          {goal.status === "behind"
                            ? "Atrasado"
                            : goal.status === "paused"
                            ? "Pausado"
                            : goal.status === "completed"
                            ? "Completado"
                            : metrics.monthlyDiff > 0
                            ? "Lento"
                            : "Al día"}
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-bg-300/95 backdrop-blur-xl">
                  Estado actual del progreso
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Insights de IA */}
            {goal.insights.length > 0 && (
              <div className="mt-auto pt-5 border-t border-bg-300/40">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${statusConfig.iconBg}`}
                  >
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-text-200/70">
                        INSIGHT DE IA
                      </span>
                      {metrics.riskLevel === "high" && (
                        <Badge className="px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-400 border-red-500/30">
                          ALTO RIESGO
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-text-200">
                      {showMoreInsights
                        ? goal.insights.join(" ")
                        : goal.insights[0]}
                    </p>
                    {goal.insights.length > 1 && (
                      <button
                        onClick={() => setShowMoreInsights(!showMoreInsights)}
                        className="text-xs font-medium text-primary-200 hover:text-primary-300 mt-2 flex items-center gap-1 transition-colors duration-200 group/link"
                      >
                        <span>
                          {showMoreInsights ? "Ver menos" : "Ver más insights"}
                        </span>
                        <ChevronRight
                          className={`h-3 w-3 transition-transform duration-300 ${
                            showMoreInsights
                              ? "-rotate-90"
                              : "group-hover/link:translate-x-1"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Botón de acción rápida */}
            <div className="mt-6 pt-4 border-t border-bg-300/40">
              <Button
                onClick={onViewDetails}
                className="w-full bg-gradient-to-r from-primary-100/20 to-primary-200/10 hover:from-primary-100/30 hover:to-primary-200/20 border border-primary-100/30 text-primary-200 hover:text-primary-100 transition-all duration-300 group/action"
              >
                <span>Ver detalles completos</span>
                <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover/action:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Efecto de brillo al hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Indicador de estado animado */}
        <div
          className={`absolute -top-1 -left-1 w-3 h-3 rounded-full ${
            goal.status === "completed"
              ? "bg-green-500 animate-pulse"
              : goal.status === "in-progress"
              ? "bg-blue-500"
              : goal.status === "paused"
              ? "bg-yellow-500"
              : "bg-red-500"
          } shadow-lg`}
        />
      </div>
    </TooltipProvider>
  );
};

export default SavingsGoalCard;
