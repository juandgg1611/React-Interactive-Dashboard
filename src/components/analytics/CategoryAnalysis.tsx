// src/components/analytics/CategoryAnalysis.tsx
import React, {
  useState,
  useEffect,
  cloneElement,
  useMemo,
  useRef,
} from "react";
import {
  CategoryIcons,
  CategoryIconType,
} from "../../components/budgets/CategoryIcons";
import {
  PieChart,
  BarChart3,
  LineChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  Target,
  Filter,
  Search,
  Calendar,
  AlertTriangle,
  Sparkles,
  Lightbulb,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Eye,
  Download,
  Share2,
  Settings,
  Bell,
  RefreshCw,
  Info,
  ExternalLink,
  Maximize2,
  Minimize2,
  Users,
  Globe,
  Smartphone,
  Gift,
  Briefcase,
  CreditCard,
  Banknote,
  Wallet,
  PiggyBank,
  CheckCircle,
  XCircle,
  HelpCircle,
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
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

// ============================================
// 1. TIPOS Y DATOS ESTÁTICOS
// ============================================

type CategoryPriority = "critical" | "high" | "medium" | "low";
type ComparisonMode = "monthly" | "average" | "budget";
type ViewMode = "simple" | "detailed" | "expert";
type TimeRange = "week" | "month" | "quarter" | "year" | "all";

interface CategoryDefinition {
  id: string;
  name: string;
  iconName: CategoryIconType;
  color: string;
  subcategories: string[];
  avgSpending: number;
  monthlyTrend: number;
  priority: CategoryPriority;
  isDefault?: boolean;
  transactionCount?: number;
}

interface CategoryInsight {
  id: string;
  type: "trend" | "opportunity" | "pattern" | "alert";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  icon: React.ElementType;
  color: string;
  action?: string;
}

interface ChartDataPoint {
  month?: string;
  day?: string;
  amount?: number;
  count?: number;
  [key: string]: any;
}

// ============================================
// 2. DATOS DE EJEMPLO
// ============================================

const ALL_CATEGORIES: CategoryDefinition[] = [
  // Categorías principales (mostradas por defecto)
  {
    id: "food",
    name: "Alimentación",
    iconName: "food" as CategoryIconType,
    color: "#61bc84",
    subcategories: [
      "Supermercado",
      "Restaurantes",
      "Cafeterías",
      "Delivery",
      "Mercado",
    ],
    avgSpending: 1250,
    monthlyTrend: 12,
    priority: "high",
    isDefault: true,
    transactionCount: 42,
  },
  {
    id: "transport",
    name: "Transporte",
    iconName: "transport" as CategoryIconType,
    color: "#3B82F6",
    subcategories: [
      "Gasolina",
      "Estacionamiento",
      "Transporte público",
      "Taxi/Uber",
      "Mantenimiento",
    ],
    avgSpending: 850,
    monthlyTrend: -5,
    priority: "medium",
    isDefault: true,
    transactionCount: 28,
  },
  {
    id: "entertainment",
    name: "Entretenimiento",
    iconName: "entertainment" as CategoryIconType,
    color: "#8FBC8F",
    subcategories: ["Streaming", "Cine", "Conciertos", "Eventos", "Juegos"],
    avgSpending: 450,
    monthlyTrend: 18,
    priority: "high",
    isDefault: true,
    transactionCount: 35,
  },
  {
    id: "shopping",
    name: "Compras",
    iconName: "shopping" as CategoryIconType,
    color: "#EC4899",
    subcategories: ["Ropa", "Electrónica", "Hogar", "Deportes", "Libros"],
    avgSpending: 950,
    monthlyTrend: 8,
    priority: "medium",
    isDefault: true,
    transactionCount: 39,
  },
  {
    id: "utilities",
    name: "Servicios Básicos",
    iconName: "utilities" as CategoryIconType,
    color: "#6B7280",
    subcategories: ["Luz", "Agua", "Gas", "Internet", "Teléfono"],
    avgSpending: 320,
    monthlyTrend: 3,
    priority: "critical",
    isDefault: true,
    transactionCount: 12,
  },
  {
    id: "health",
    name: "Salud",
    iconName: "health" as CategoryIconType,
    color: "#EF4444",
    subcategories: [
      "Consultas",
      "Medicamentos",
      "Gimnasio",
      "Seguro médico",
      "Suplementos",
    ],
    avgSpending: 280,
    monthlyTrend: 4,
    priority: "medium",
    isDefault: true,
    transactionCount: 18,
  },
  // Categorías adicionales (se muestran al expandir)
  {
    id: "education",
    name: "Educación",
    iconName: "education" as CategoryIconType,
    color: "#06B6D4",
    subcategories: [
      "Cursos",
      "Libros",
      "Suscripciones",
      "Certificaciones",
      "Material",
    ],
    avgSpending: 380,
    monthlyTrend: 15,
    priority: "low",
    isDefault: false,
    transactionCount: 14,
  },
  {
    id: "home",
    name: "Hogar",
    iconName: "home" as CategoryIconType,
    color: "#F59E0B",
    subcategories: [
      "Muebles",
      "Electrodomésticos",
      "Decoración",
      "Reparaciones",
      "Jardinería",
    ],
    avgSpending: 620,
    monthlyTrend: 7,
    priority: "medium",
    isDefault: false,
    transactionCount: 22,
  },
  {
    id: "salary",
    name: "Ingresos",
    iconName: "salary" as CategoryIconType,
    color: "#10B981",
    subcategories: [
      "Salario",
      "Freelance",
      "Inversiones",
      "Bonos",
      "Reembolsos",
    ],
    avgSpending: 4200,
    monthlyTrend: 5,
    priority: "low",
    isDefault: false,
    transactionCount: 8,
  },
  {
    id: "gift",
    name: "Regalos",
    iconName: "gift" as CategoryIconType,
    color: "#8B5CF6",
    subcategories: [
      "Cumpleaños",
      "Aniversarios",
      "Navidad",
      "Donaciones",
      "Sorpresas",
    ],
    avgSpending: 180,
    monthlyTrend: 25,
    priority: "low",
    isDefault: false,
    transactionCount: 16,
  },
  {
    id: "fitness",
    name: "Fitness",
    iconName: "fitness" as CategoryIconType,
    color: "#DC2626",
    subcategories: [
      "Gimnasio",
      "Equipo",
      "Ropa deportiva",
      "Suplementos",
      "Clases",
    ],
    avgSpending: 220,
    monthlyTrend: 12,
    priority: "low",
    isDefault: false,
    transactionCount: 19,
  },
  {
    id: "travel",
    name: "Viajes",
    iconName: "travel" as CategoryIconType,
    color: "#2E8B57",
    subcategories: [
      "Vuelos",
      "Hoteles",
      "Actividades",
      "Comida viaje",
      "Seguro",
    ],
    avgSpending: 1500,
    monthlyTrend: 35,
    priority: "medium",
    isDefault: false,
    transactionCount: 9,
  },
  {
    id: "savings",
    name: "Ahorros",
    iconName: "savings" as CategoryIconType,
    color: "#059669",
    subcategories: [
      "Fondo emergencia",
      "Inversiones",
      "Metas",
      "Retiro",
      "Educación",
    ],
    avgSpending: 1200,
    monthlyTrend: 8,
    priority: "critical",
    isDefault: false,
    transactionCount: 6,
  },
  {
    id: "coffee",
    name: "Café & Snacks",
    iconName: "coffee" as CategoryIconType,
    color: "#92400E",
    subcategories: [
      "Cafeterías",
      "Snacks",
      "Postres",
      "Bebidas",
      "Comida rápida",
    ],
    avgSpending: 320,
    monthlyTrend: 22,
    priority: "high",
    isDefault: false,
    transactionCount: 48,
  },
  {
    id: "internet",
    name: "Internet",
    iconName: "internet" as CategoryIconType,
    color: "#2563EB",
    subcategories: [
      "WiFi",
      "Datos móviles",
      "Servicios en línea",
      "Hosting",
      "Dominios",
    ],
    avgSpending: 85,
    monthlyTrend: -2,
    priority: "low",
    isDefault: false,
    transactionCount: 7,
  },
  {
    id: "pet",
    name: "Mascotas",
    iconName: "pet" as CategoryIconType,
    color: "#7C3AED",
    subcategories: [
      "Alimento",
      "Veterinario",
      "Juguetes",
      "Accesorios",
      "Cuidado",
    ],
    avgSpending: 190,
    monthlyTrend: 8,
    priority: "low",
    isDefault: false,
    transactionCount: 15,
  },
  {
    id: "clothing",
    name: "Ropa",
    iconName: "clothing" as CategoryIconType,
    color: "#DB2777",
    subcategories: [
      "Ropa diaria",
      "Calzado",
      "Accesorios",
      "Ropa formal",
      "Deportiva",
    ],
    avgSpending: 420,
    monthlyTrend: 15,
    priority: "medium",
    isDefault: false,
    transactionCount: 24,
  },
  {
    id: "beauty",
    name: "Belleza",
    iconName: "beauty" as CategoryIconType,
    color: "#EC4899",
    subcategories: [
      "Cosméticos",
      "Cuidado personal",
      "Peluquería",
      "Spa",
      "Tratamientos",
    ],
    avgSpending: 180,
    monthlyTrend: 12,
    priority: "low",
    isDefault: false,
    transactionCount: 21,
  },
  {
    id: "subscription",
    name: "Suscripciones",
    iconName: "subscription" as CategoryIconType,
    color: "#0EA5E9",
    subcategories: ["Streaming", "Software", "Revistas", "Apps", "Membresías"],
    avgSpending: 95,
    monthlyTrend: -2,
    priority: "low",
    isDefault: false,
    transactionCount: 13,
  },
  {
    id: "taxes",
    name: "Impuestos",
    iconName: "taxes" as CategoryIconType,
    color: "#475569",
    subcategories: ["IVA", "Renta", "Propiedad", "Servicios", "Municipales"],
    avgSpending: 850,
    monthlyTrend: 3,
    priority: "critical",
    isDefault: false,
    transactionCount: 5,
  },
  {
    id: "car",
    name: "Automóvil",
    iconName: "car" as CategoryIconType,
    color: "#1E293B",
    subcategories: [
      "Seguro",
      "Mantenimiento",
      "Reparaciones",
      "Accesorios",
      "Lavado",
    ],
    avgSpending: 550,
    monthlyTrend: 6,
    priority: "medium",
    isDefault: false,
    transactionCount: 11,
  },
  {
    id: "investment",
    name: "Inversiones",
    iconName: "investment" as CategoryIconType,
    color: "#059669",
    subcategories: ["Acciones", "Cripto", "Bienes raíces", "Fondos", "Bonos"],
    avgSpending: 2000,
    monthlyTrend: 18,
    priority: "low",
    isDefault: false,
    transactionCount: 8,
  },
  {
    id: "insurance",
    name: "Seguros",
    iconName: "insurance" as CategoryIconType,
    color: "#3B82F6",
    subcategories: ["Vida", "Salud", "Auto", "Hogar", "Viaje"],
    avgSpending: 320,
    monthlyTrend: 4,
    priority: "critical",
    isDefault: false,
    transactionCount: 6,
  },
  {
    id: "other",
    name: "Otros",
    iconName: "other" as CategoryIconType,
    color: "#6B7280",
    subcategories: [
      "Varios",
      "No categorizado",
      "Emergencias",
      "Gastos imprevistos",
    ],
    avgSpending: 280,
    monthlyTrend: 8,
    priority: "low",
    isDefault: false,
    transactionCount: 32,
  },
];

// ============================================
// 3. COMPONENTES REUTILIZABLES
// ============================================

// Icono de categoría personalizado
const CategoryIcon = ({
  iconName,
  color,
  size = "h-4 w-4",
}: {
  iconName: CategoryIconType;
  color: string;
  size?: string;
}) => {
  const IconElement = CategoryIcons[iconName] || CategoryIcons.other;
  return cloneElement(IconElement, {
    className: size,
    stroke: color,
    strokeWidth: "1.5",
  });
};

// Badge de prioridad con estilo premium
const PriorityBadge = ({ priority }: { priority: CategoryPriority }) => {
  const config = {
    critical: {
      label: "Crítico",
      className:
        "bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-400 border-red-500/30 shadow-sm shadow-red-500/20",
      icon: "🔥",
    },
    high: {
      label: "Alto",
      className:
        "bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30 shadow-sm shadow-amber-500/20",
      icon: "⚡",
    },
    medium: {
      label: "Medio",
      className:
        "bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30 shadow-sm shadow-blue-500/20",
      icon: "📊",
    },
    low: {
      label: "Bajo",
      className:
        "bg-gradient-to-r from-primary-100/20 to-primary-200/10 text-primary-200 border-primary-100/30 shadow-sm shadow-primary-100/20",
      icon: "📈",
    },
  };

  const { label, className, icon } = config[priority];

  return (
    <Badge className={`px-3 py-1.5 ${className}`}>
      <span className="mr-1.5">{icon}</span>
      {label}
    </Badge>
  );
};

// Badge de tendencia con animación
const TrendBadge = ({ trend }: { trend: number }) => {
  const isPositive = trend > 0;
  const trendColor = isPositive
    ? "from-red-500/20 to-red-600/10 text-red-400"
    : "from-primary-100/20 to-primary-200/10 text-primary-200";
  const icon = isPositive ? (
    <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
  ) : (
    <TrendingDown className="h-3.5 w-3.5 mr-1.5" />
  );

  return (
    <Badge
      className={`px-3 py-1.5 bg-gradient-to-r ${trendColor} border ${
        isPositive ? "border-red-500/30" : "border-primary-100/30"
      } shadow-sm ${
        isPositive ? "shadow-red-500/20" : "shadow-primary-100/20"
      }`}
    >
      {icon}
      <span className="font-semibold">
        {isPositive ? "+" : ""}
        {trend}%
      </span>
    </Badge>
  );
};

// Tarjeta de categoría para la lista
const CategoryItem = ({
  category,
  isSelected,
  onClick,
}: {
  category: CategoryDefinition;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`
        group relative p-4 rounded-xl cursor-pointer transition-all duration-300
        ${
          isSelected
            ? "bg-gradient-to-r from-primary-100/20 via-primary-200/15 to-primary-100/10 border-2 border-primary-100/50 shadow-lg shadow-primary-100/20"
            : "bg-bg-300/10 border border-bg-300/40 hover:bg-gradient-to-r hover:from-primary-100/10 hover:to-primary-200/5 hover:border-primary-100/30 hover:shadow-md hover:shadow-primary-100/10"
        }
      `}
      onClick={onClick}
    >
      {/* Efecto de selección */}
      {isSelected && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/5 to-primary-200/5 rounded-xl" />
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary-200 animate-pulse shadow-lg shadow-primary-200/50" />
        </>
      )}

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="p-2.5 rounded-xl border-2 group-hover:scale-110 transition-transform duration-300"
            style={{
              backgroundColor: `${category.color}15`,
              borderColor: `${category.color}30`,
            }}
          >
            <CategoryIcon
              iconName={category.iconName}
              color={category.color}
              size="h-5 w-5"
            />
          </div>
          <div>
            <div className="font-semibold text-text-100 group-hover:text-primary-200 transition-colors">
              {category.name}
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-sm font-medium text-primary-200 bg-primary-100/10 px-2 py-0.5 rounded-lg">
                ${category.avgSpending.toLocaleString()}
              </span>
              <span className="text-xs text-text-200 bg-bg-300/30 px-2 py-0.5 rounded-lg">
                {category.transactionCount} trans.
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TrendBadge trend={category.monthlyTrend} />
          {isSelected && (
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-100 to-primary-200 shadow-lg shadow-primary-200/30">
              <ChevronRight className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Botón "Ver más/Ver menos" con estilo premium
const ExpandButton = ({
  isExpanded,
  onClick,
  visibleCount,
  totalCount,
}: {
  isExpanded: boolean;
  onClick: () => void;
  visibleCount: number;
  totalCount: number;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="w-full h-12 rounded-xl border-2 border-bg-300/50 hover:border-primary-100/40 hover:bg-gradient-to-r hover:from-primary-100/10 hover:to-primary-200/5 group transition-all duration-300"
    >
      <div className="flex items-center justify-center gap-3">
        {isExpanded ? (
          <>
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-100/20 to-primary-200/10 group-hover:scale-110 transition-transform">
              <ChevronUp className="h-4 w-4 text-primary-200" />
            </div>
            <span className="text-text-100 font-medium group-hover:text-primary-200">
              Mostrar menos categorías
            </span>
            <Badge className="bg-primary-100/20 text-primary-200 border border-primary-100/30">
              {visibleCount} de {totalCount}
            </Badge>
          </>
        ) : (
          <>
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-100/20 to-primary-200/10 group-hover:scale-110 transition-transform">
              <ChevronDown className="h-4 w-4 text-primary-200" />
            </div>
            <span className="text-text-100 font-medium group-hover:text-primary-200">
              Ver {totalCount - visibleCount} categorías más
            </span>
            <Badge className="bg-gradient-to-r from-primary-100/30 to-primary-200/20 text-primary-200 border border-primary-100/30">
              +{totalCount - visibleCount}
            </Badge>
          </>
        )}
      </div>
    </Button>
  );
};

// Tarjeta de insight mejorada
const InsightCard = ({ insight }: { insight: CategoryInsight }) => {
  const Icon = insight.icon;
  const impactColors = {
    high: "from-red-500/10 to-red-600/5 border-red-500/20",
    medium: "from-amber-500/10 to-amber-600/5 border-amber-500/20",
    low: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
  };

  return (
    <Card
      className={`bg-gradient-to-br ${
        impactColors[insight.impact]
      } border shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300`}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl ${
              insight.color
            } bg-opacity-20 border ${insight.color.replace(
              "text",
              "border"
            )}/20`}
          >
            <Icon className={`h-5 w-5 ${insight.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-sm font-semibold text-text-100">
                {insight.title}
              </h4>
              <Badge
                className={`text-xs px-2 py-0.5 ${
                  insight.impact === "high"
                    ? "bg-red-500/20 text-red-400"
                    : insight.impact === "medium"
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {insight.impact === "high"
                  ? "Alto"
                  : insight.impact === "medium"
                  ? "Medio"
                  : "Bajo"}
              </Badge>
            </div>
            <p className="text-sm text-text-200 mb-3">{insight.description}</p>
            {insight.action && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary-200 hover:text-primary-100 hover:bg-primary-100/10"
              >
                {insight.action} →
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ============================================
// 4. COMPONENTES DE GRÁFICOS MEJORADOS
// ============================================

const LineChartComponent = ({
  data,
  color,
  title,
}: {
  data: ChartDataPoint[];
  color: string;
  title: string;
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-text-100">{title}</h3>
      <Badge className="bg-primary-100/10 text-primary-200 border border-primary-100/20">
        Últimos 6 meses
      </Badge>
    </div>
    <ResponsiveContainer width="100%" height={280}>
      <RechartsLineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#374151"
          strokeOpacity={0.3}
        />
        <XAxis
          dataKey="month"
          stroke="#9CA3AF"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#9CA3AF"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <RechartsTooltip
          contentStyle={{
            backgroundColor: "rgba(31, 41, 55, 0.95)",
            border: "1px solid #374151",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
          }}
          labelStyle={{ color: "#D1D5DB", fontWeight: 500 }}
          formatter={(value) => [`$${Number(value).toLocaleString()}`, "Gasto"]}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke={color}
          strokeWidth={3}
          dot={{ r: 4, fill: color, strokeWidth: 2, stroke: "white" }}
          activeDot={{ r: 6, fill: "white", stroke: color, strokeWidth: 2 }}
          name="Gasto mensual"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  </div>
);

const PieChartComponent = ({
  data,
  color,
  title,
}: {
  data: any[];
  color: string;
  title: string;
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-text-100">{title}</h3>
      <Badge className="bg-primary-100/10 text-primary-200 border border-primary-100/20">
        Distribución
      </Badge>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ResponsiveContainer width="100%" height={240}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="amount"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={color}
                fillOpacity={0.7 + index * 0.1}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <RechartsTooltip
            contentStyle={{
              backgroundColor: "rgba(31, 41, 55, 0.95)",
              border: "1px solid #374151",
              borderRadius: "8px",
            }}
            formatter={(value, name) => [
              `$${Number(value).toLocaleString()}`,
              name,
            ]}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2.5 rounded-lg bg-bg-300/20 hover:bg-bg-300/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color, opacity: 0.7 + index * 0.1 }}
              />
              <span className="text-sm text-text-100">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-text-100">
                ${item.amount.toLocaleString()}
              </div>
              <div className="text-xs text-text-200">
                {Math.round(
                  (item.amount /
                    data.reduce((acc, curr) => acc + curr.amount, 0)) *
                    100
                )}
                %
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================
// 5. COMPONENTES DE INTERFAZ
// ============================================

// Encabezado premium
const AnalysisHeader = () => {
  const totalSpending = ALL_CATEGORIES.reduce(
    (sum, cat) => sum + cat.avgSpending,
    0
  );
  const growingCategories = ALL_CATEGORIES.filter(
    (cat) => cat.monthlyTrend > 0
  ).length;
  const totalTransactions = ALL_CATEGORIES.reduce(
    (sum, cat) => sum + (cat.transactionCount || 0),
    0
  );

  return (
    <Card className="border-0 bg-gradient-to-br from-primary-100/10 via-primary-200/5 to-accent-100/5 backdrop-blur-lg border border-bg-300/40 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/5 via-transparent to-accent-100/5" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

      <CardHeader className="relative z-10 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/20 via-primary-200/15 to-primary-100/10 border border-primary-100/30 shadow-lg shadow-primary-100/20">
              <PieChart className="h-7 w-7 text-primary-200" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-text-100 flex items-center gap-3">
                Análisis Inteligente por Categoría
                <Badge className="ml-2 bg-gradient-to-r from-primary-100/30 to-accent-100/30 text-primary-200 border border-primary-100/30">
                  <Sparkles className="h-3 w-3 mr-1.5" />
                  IA
                </Badge>
              </CardTitle>
              <CardDescription className="text-text-200 mt-2 text-base">
                Análisis profundo y optimización automática de tus gastos por
                categoría
              </CardDescription>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <div className="text-2xl font-bold text-primary-200">
                {ALL_CATEGORIES.length}
              </div>
              <div className="text-xs text-text-200 mt-1">Categorías</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <div className="text-2xl font-bold text-accent-100">
                ${(totalSpending / 1000).toFixed(1)}K
              </div>
              <div className="text-xs text-text-200 mt-1">Gasto total</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <div className="text-2xl font-bold text-green-400">
                {growingCategories}
              </div>
              <div className="text-xs text-text-200 mt-1">Creciendo</div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

// Panel de filtros mejorado
const FiltersPanel = ({
  selectedCategory,
  onCategoryChange,
  timeRange,
  onTimeRangeChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  showAllCategories,
  onToggleShowAll,
  filteredCategories,
  visibleCategories,
}: any) => {
  return (
    <Card className="border-0 bg-gradient-to-br from-bg-300/20 to-bg-300/10 backdrop-blur-md border border-bg-300/40 shadow-xl">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Barra de búsqueda*/}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-text-200 font-medium flex items-center gap-2">
                <Search className="h-4 w-4 text-primary-200" />
                Buscar Categorías
              </Label>

              {/* Indicador de resultados */}
              {searchQuery && (
                <Badge className="bg-gradient-to-r from-primary-100/20 to-primary-200/10 text-primary-200 border border-primary-100/30">
                  {filteredCategories.length} encontradas
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              {/* Campo de búsqueda principal */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Search className="h-4 w-4 text-text-200/60 group-hover:text-primary-200 transition-colors" />
                </div>

                <Input
                  placeholder="Escribe el nombre de una categoría..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-11 pr-10 h-12 bg-bg-300/30 border-2 border-bg-300/50 focus:border-primary-100/70 focus:bg-bg-300/40 text-text-100 rounded-xl shadow-lg shadow-black/10 placeholder:text-text-200/50 transition-all duration-300"
                />

                {/* Botón de limpiar búsqueda (solo cuando hay texto) */}
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-bg-300/50 hover:bg-primary-100/20 border border-bg-300/60 hover:border-primary-100/40 transition-all duration-200"
                  >
                    <XCircle className="h-4 w-4 text-text-200/70 hover:text-primary-200" />
                  </Button>
                )}

                {/* Efecto de brillo en foco */}
                <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-primary-100/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Sugerencias de búsqueda rápida - MUCHO MÁS INTUITIVO */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-text-200/70">
                  <Info className="h-3 w-3" />
                  <span>Sugerencias rápidas:</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "comida",
                    "transporte",
                    "entretenimiento",
                    "compras",
                    "salud",
                  ]
                    .filter(
                      (suggestion) =>
                        !searchQuery ||
                        suggestion
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    )
                    .slice(0, 4)
                    .map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => onSearchChange(suggestion)}
                        className="h-8 px-3 rounded-lg border border-bg-300/50 bg-bg-300/20 text-text-200 hover:text-primary-200 hover:border-primary-100/40 hover:bg-primary-100/10 text-xs transition-all duration-200"
                      >
                        {suggestion.charAt(0).toUpperCase() +
                          suggestion.slice(1)}
                      </Button>
                    ))}

                  {/* Botón para limpiar todos los filtros */}
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSearchChange("")}
                      className="h-8 px-3 rounded-lg border border-bg-300/50 bg-bg-300/20 text-text-200 hover:text-red-400 hover:border-red-400/40 hover:bg-red-400/10 text-xs transition-all duration-200"
                    >
                      <XCircle className="h-3 w-3 mr-1.5" />
                      Limpiar búsqueda
                    </Button>
                  )}
                </div>
              </div>

              {/* Feedback visual de búsqueda - MUCHO MÁS CLARO */}
              {searchQuery ? (
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary-100/10 to-primary-200/5 border border-primary-100/20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-text-100">
                        Resultados de búsqueda
                      </div>
                      <div className="text-xs text-text-200">
                        {filteredCategories.length === 0 ? (
                          <span className="flex items-center gap-2">
                            <span className="text-red-400">
                              No se encontraron categorías con "
                            </span>
                            <span className="font-medium text-red-300">
                              {searchQuery}"
                            </span>
                          </span>
                        ) : (
                          <span>
                            <span className="font-semibold text-primary-200">
                              {filteredCategories.length}
                            </span>{" "}
                            categorías
                            {filteredCategories.length === 1
                              ? " coincide"
                              : " coinciden"}{" "}
                            con "
                            <span className="font-medium text-primary-200">
                              {searchQuery}
                            </span>
                            "
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Botón para ver todas si hay búsqueda activa */}
                    {filteredCategories.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSearchChange("")}
                        className="text-xs text-primary-200 hover:text-primary-100 hover:bg-primary-100/10"
                      >
                        Ver todas →
                      </Button>
                    )}
                  </div>

                  {/* Mostrar algunas categorías encontradas como preview */}
                  {filteredCategories.length > 0 &&
                    filteredCategories.length <= 3 && (
                      <div className="mt-3 pt-3 border-t border-primary-100/10">
                        <div className="text-xs text-text-200 mb-2">
                          Categorías encontradas:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {filteredCategories
                            .slice(0, 3)
                            .map((cat: CategoryDefinition) => (
                              <Badge
                                key={cat.id}
                                className="bg-gradient-to-r from-bg-300/30 to-bg-300/20 text-text-100 border border-bg-300/40"
                              >
                                <CategoryIcon
                                  iconName={cat.iconName}
                                  color={cat.color}
                                  size="h-3 w-3"
                                />
                                <span className="ml-1.5">{cat.name}</span>
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                /* Estado inicial - Guías de uso */
                <div className="p-3 rounded-lg bg-gradient-to-r from-bg-300/10 to-bg-300/5 border border-bg-300/30">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-text-100 flex items-center gap-2">
                      <Lightbulb className="h-3 w-3 text-primary-200" />
                      Consejos para buscar:
                    </div>
                    <ul className="text-xs text-text-200 space-y-1 pl-5">
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary-200/50" />
                        Escribe el nombre completo o parcial de una categoría
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary-200/50" />
                        También puedes buscar por subcategorías
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary-200/50" />
                        Usa las sugerencias rápidas para búsquedas comunes
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Panel de estadísticas rápidas
const QuickStatsPanel = () => {
  const stats = [
    {
      title: "Gasto Total Mensual",
      value: "$8,450",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "text-primary-200",
      bgColor: "from-primary-100/20 to-primary-200/10",
    },
    {
      title: "Categorías Activas",
      value: "18",
      change: "+2",
      isPositive: true,
      icon: PieChart,
      color: "text-accent-100",
      bgColor: "from-accent-100/20 to-accent-200/10",
    },
    {
      title: "Tendencias Positivas",
      value: "14",
      change: "+3",
      isPositive: true,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "from-green-500/20 to-green-600/10",
    },
    {
      title: "Ahorro Potencial",
      value: "$420",
      change: "Por mes",
      isPositive: null,
      icon: PiggyBank,
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-blue-600/10",
    },
  ];

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-text-100 text-sm flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Estadísticas Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl bg-gradient-to-br ${stat.bgColor} border border-bg-300/40`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-text-200 mb-1">{stat.title}</div>
                  <div className={`text-xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </div>
                <div
                  className={`p-2 rounded-lg ${stat.color.replace(
                    "text",
                    "bg"
                  )}/20`}
                >
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <div
                className={`text-xs mt-2 ${
                  stat.isPositive === true
                    ? "text-green-400"
                    : stat.isPositive === false
                    ? "text-red-400"
                    : "text-text-200"
                }`}
              >
                {stat.isPositive !== null && (stat.isPositive ? "↗ " : "↘ ")}
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ============================================
// 6. COMPONENTE PRINCIPAL
// ============================================

const CategoryAnalysis = () => {
  // Estados principales
  const [selectedCategory, setSelectedCategory] = useState<string>("food");
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [viewMode, setViewMode] = useState<ViewMode>("detailed");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "trends",
    "breakdown",
    "comparison",
  ]);

  // Ref para el ScrollArea
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Función para manejar el toggle de categorías con animación de scroll
  const handleToggleCategories = () => {
    const newShowAllCategories = !showAllCategories;
    setShowAllCategories(newShowAllCategories);

    // Si estamos cambiando a "Mostrar menos" (cerrando), animar hacia arriba
    if (showAllCategories && scrollAreaRef.current) {
      setTimeout(() => {
        scrollAreaRef.current?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 50); // Pequeño delay para que la transición de contenido ocurra primero
    }
  };

  // Filtrar categorías basado en búsqueda
  const filteredCategories = useMemo(() => {
    return ALL_CATEGORIES.filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subcategories.some((sub) =>
          sub.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        category.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Determinar qué categorías mostrar (con límite)
  const visibleCategories = useMemo(() => {
    if (showAllCategories) return filteredCategories;
    return filteredCategories.slice(0, 6); // Mostrar 6 por defecto
  }, [filteredCategories, showAllCategories]);

  // Datos de la categoría seleccionada
  const selectedCategoryData = useMemo(() => {
    return (
      ALL_CATEGORIES.find((cat) => cat.id === selectedCategory) ||
      ALL_CATEGORIES[0]
    );
  }, [selectedCategory]);

  // Insights para la categoría seleccionada
  const insights = useMemo<CategoryInsight[]>(
    () => [
      {
        id: "insight-1",
        type: "trend",
        title: `Tendencia ${
          selectedCategoryData.monthlyTrend > 0 ? "creciente" : "decreciente"
        } detectada`,
        description: `Los gastos en ${selectedCategoryData.name.toLowerCase()} han ${
          selectedCategoryData.monthlyTrend > 0 ? "aumentado" : "disminuido"
        } un ${Math.abs(selectedCategoryData.monthlyTrend)}% este mes`,
        impact:
          Math.abs(selectedCategoryData.monthlyTrend) > 15
            ? "high"
            : Math.abs(selectedCategoryData.monthlyTrend) > 5
            ? "medium"
            : "low",
        icon: selectedCategoryData.monthlyTrend > 0 ? TrendingUp : TrendingDown,
        color:
          selectedCategoryData.monthlyTrend > 0
            ? "text-red-400"
            : "text-primary-200",
        action: "Ver detalles",
      },
      {
        id: "insight-2",
        type: "opportunity",
        title: "Oportunidad de optimización",
        description: `Podrías ahorrar aproximadamente $${Math.round(
          selectedCategoryData.avgSpending * 0.15
        )} mensuales optimizando esta categoría`,
        impact: "medium",
        icon: Zap,
        color: "text-amber-400",
        action: "Ver recomendaciones",
      },
      {
        id: "insight-3",
        type: "pattern",
        title: "Patrón de gasto identificado",
        description: `El 65% de los gastos en ${selectedCategoryData.name.toLowerCase()} ocurren entre jueves y domingo`,
        impact: "low",
        icon: Calendar,
        color: "text-blue-400",
        action: "Analizar patrones",
      },
      {
        id: "insight-4",
        type: "alert",
        title: "Alerta de presupuesto",
        description: `Estás gastando un ${Math.round(
          (selectedCategoryData.avgSpending / 8500) * 100
        )}% más que el mes anterior en esta categoría`,
        impact: "high",
        icon: AlertTriangle,
        color: "text-red-400",
        action: "Ajustar presupuesto",
      },
    ],
    [selectedCategoryData]
  );

  // Datos de ejemplo para gráficos
  const monthlyData = useMemo(
    () => [
      { month: "Ene", amount: selectedCategoryData.avgSpending * 0.8 },
      { month: "Feb", amount: selectedCategoryData.avgSpending * 0.85 },
      { month: "Mar", amount: selectedCategoryData.avgSpending * 0.9 },
      { month: "Abr", amount: selectedCategoryData.avgSpending * 0.95 },
      { month: "May", amount: selectedCategoryData.avgSpending },
      { month: "Jun", amount: selectedCategoryData.avgSpending * 1.05 },
      { month: "Jul", amount: selectedCategoryData.avgSpending * 1.1 },
      { month: "Ago", amount: selectedCategoryData.avgSpending * 1.12 },
    ],
    [selectedCategoryData]
  );

  const breakdownData = useMemo(
    () =>
      selectedCategoryData.subcategories.slice(0, 5).map((sub, idx) => ({
        name: sub,
        amount: Math.round(
          (selectedCategoryData.avgSpending /
            selectedCategoryData.subcategories.length) *
            (0.7 + Math.random() * 0.6)
        ),
      })),
    [selectedCategoryData]
  );

  // Alternar sección expandida
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Renderizar tarjeta de gráfico colapsable
  const renderChartCard = (
    sectionId: string,
    title: string,
    icon: React.ElementType,
    children: React.ReactNode
  ) => (
    <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-text-100 text-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary-100/20 to-primary-200/10 border border-primary-100/30">
              {React.createElement(icon, {
                className: "h-4 w-4 text-primary-200",
              })}
            </div>
            {title}
          </CardTitle>
          <Button
            size="sm"
            variant="ghost"
            className="text-text-200 hover:text-primary-200 hover:bg-primary-100/10 border border-bg-300/40"
            onClick={() => toggleSection(sectionId)}
          >
            {expandedSections.includes(sectionId) ? (
              <>
                <Minimize2 className="h-4 w-4 mr-2" /> Minimizar
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4 mr-2" /> Expandir
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <Collapsible open={expandedSections.includes(sectionId)}>
        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  return (
    <div className="space-y-6">
      <AnalysisHeader />

      {/* Contenido principal en grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panel izquierdo - Filtros y lista */}
        <div className="lg:col-span-1 space-y-6">
          <FiltersPanel
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            showAllCategories={showAllCategories}
            onToggleShowAll={handleToggleCategories}
            filteredCategories={filteredCategories}
            visibleCategories={visibleCategories}
          />

          <QuickStatsPanel />

          {/* Lista de categorías */}
          <Card className="border-0 bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-text-100 text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-100/20 to-primary-200/10 border border-primary-100/30">
                    <Filter className="h-4 w-4 text-primary-200" />
                  </div>
                  <span>Todas las Categorías</span>
                </div>
                <Badge className="bg-gradient-to-r from-primary-100/20 to-primary-200/10 text-primary-200 border border-primary-100/30">
                  {filteredCategories.length}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-full">
              {/* ScrollArea con barra personalizada, altura dinámica y ref */}
              <ScrollArea
                ref={scrollAreaRef}
                className="h-[calc(100vh-517px)] min-h-[817px] max-h-[1017px] scroll-smooth scrollbar-fina"
              >
                <div className="space-y-2 p-4">
                  {visibleCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`
                        group relative p-3 rounded-lg cursor-pointer transition-all duration-200
                        ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-primary-100/20 via-primary-200/10 to-primary-100/5 border border-primary-100/30 shadow-sm"
                            : "bg-bg-300/5 border border-transparent hover:bg-gradient-to-r hover:from-primary-100/5 hover:to-primary-200/5 hover:border-primary-100/20"
                        }
                      `}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-center gap-3">
                        {/* Icono compacto */}
                        <div
                          className="p-1.5 rounded-lg flex-shrink-0 border group-hover:scale-110 transition-transform"
                          style={{
                            backgroundColor: `${category.color}15`,
                            borderColor: `${category.color}30`,
                          }}
                        >
                          <CategoryIcon
                            iconName={category.iconName}
                            color={category.color}
                            size="h-3.5 w-3.5"
                          />
                        </div>

                        {/* Contenido principal */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-text-100 truncate group-hover:text-primary-200 transition-colors">
                                {category.name}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-primary-200 bg-primary-100/10 px-1.5 py-0.5 rounded">
                                  ${category.avgSpending.toLocaleString()}
                                </span>
                                <span className="text-xs text-text-200/80">
                                  {category.transactionCount} trans
                                </span>
                              </div>
                            </div>

                            {/* Indicadores a la derecha */}
                            <div className="flex items-center gap-2 ml-2">
                              <TrendBadge trend={category.monthlyTrend} />
                              {selectedCategory === category.id && (
                                <div className="p-1 rounded-md bg-gradient-to-r from-primary-100 to-primary-200 shadow-sm">
                                  <ChevronRight className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Efecto de selección sutil */}
                      {selectedCategory === category.id && (
                        <div className="absolute inset-0 border-2 border-primary-100/30 rounded-lg pointer-events-none" />
                      )}
                    </div>
                  ))}

                  {/* Espaciador DINÁMICO - solo se muestra si hay pocas categorías */}
                  {!showAllCategories && visibleCategories.length < 10 && (
                    <div className="h-6"></div>
                  )}
                </div>
              </ScrollArea>

              {/* Footer - siempre visible en la parte inferior */}
              <div className="border-t border-bg-300/30 p-4 mt-auto">
                <div className="space-y-4">
                  {/* Botón premium para mostrar más/menos categorías */}
                  {filteredCategories.length > 6 && (
                    <div className="relative group">
                      {/* Fondo con gradiente animado */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 via-primary-200/10 to-primary-100/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <Button
                        onClick={handleToggleCategories}
                        className="relative w-full h-12 rounded-xl bg-gradient-to-r from-primary-100/10 to-primary-200/5 border-2 border-primary-100/30 hover:border-primary-100/50 hover:from-primary-100/20 hover:to-primary-200/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-200/10"
                      >
                        <div className="flex items-center justify-center gap-3">
                          {/* Icono animado */}
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r from-primary-100/20 to-primary-200/10 border border-primary-100/30 group-hover:scale-110 transition-transform duration-300 ${
                              showAllCategories ? "rotate-180" : ""
                            }`}
                          >
                            {showAllCategories ? (
                              <ChevronUp className="h-4 w-4 text-primary-200" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-primary-200" />
                            )}
                          </div>

                          {/* Texto dinámico */}
                          <div className="text-left">
                            <div className="text-sm font-semibold text-primary-200">
                              {showAllCategories
                                ? "Mostrar menos categorías"
                                : `Ver ${
                                    filteredCategories.length - 6
                                  } categorías más`}
                            </div>
                            <div className="text-xs text-text-200/80">
                              {showAllCategories
                                ? `Actualmente mostrando ${visibleCategories.length} de ${filteredCategories.length}`
                                : `Mostrando ${visibleCategories.length} de ${filteredCategories.length} categorías`}
                            </div>
                          </div>

                          {/* Badge de conteo */}
                          <Badge className="ml-auto bg-gradient-to-r from-primary-100/30 to-primary-200/20 text-primary-200 border border-primary-100/30 px-3 py-1.5">
                            {showAllCategories
                              ? `${filteredCategories.length}/${filteredCategories.length}`
                              : `+${filteredCategories.length - 6}`}
                          </Badge>
                        </div>
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-text-200">
                      Mostrando{" "}
                      <span className="font-semibold text-primary-200">
                        {visibleCategories.length}
                      </span>{" "}
                      de{" "}
                      <span className="font-semibold text-text-100">
                        {filteredCategories.length}
                      </span>{" "}
                      categorías
                    </div>

                    {/* Indicador de progreso sutil */}
                    {filteredCategories.length > 6 && (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-bg-300/30 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary-100 to-primary-200 rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                (visibleCategories.length /
                                  filteredCategories.length) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-text-200">
                          {Math.round(
                            (visibleCategories.length /
                              filteredCategories.length) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel derecho - Análisis detallado */}
        <div className="lg:col-span-3 space-y-6">
          {/* Encabezado de categoría seleccionada */}
          <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100/5 via-transparent to-accent-100/5" />
            <CardContent className="relative p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div
                    className="p-4 rounded-2xl border-2 shadow-2xl"
                    style={{
                      backgroundColor: `${selectedCategoryData.color}20`,
                      borderColor: `${selectedCategoryData.color}40`,
                    }}
                  >
                    <CategoryIcon
                      iconName={selectedCategoryData.iconName}
                      color={selectedCategoryData.color}
                      size="h-8 w-8"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-text-100 flex items-center gap-3">
                      {selectedCategoryData.name}
                      <PriorityBadge priority={selectedCategoryData.priority} />
                    </h1>
                    <div className="flex items-center gap-4 mt-3">
                      <TrendBadge trend={selectedCategoryData.monthlyTrend} />
                      <Badge className="bg-bg-300/30 text-text-200 border border-bg-300/50">
                        {selectedCategoryData.transactionCount} transacciones
                      </Badge>
                      <Badge className="bg-gradient-to-r from-primary-100/20 to-primary-200/10 text-primary-200 border border-primary-100/30">
                        ${selectedCategoryData.avgSpending.toLocaleString()}/mes
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-text-100 mb-1">
                    ${selectedCategoryData.avgSpending.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-200">
                    Gasto mensual promedio
                  </div>
                  <div className="text-xs text-text-200/70 mt-1">
                    {selectedCategoryData.subcategories.length} subcategorías
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>

          {/* Gráficos principales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderChartCard(
              "trends",
              "Tendencia Mensual",
              LineChart,
              <LineChartComponent
                data={monthlyData}
                color={selectedCategoryData.color}
                title={`Evolución de gastos en ${selectedCategoryData.name}`}
              />
            )}

            {renderChartCard(
              "breakdown",
              "Desglose por Subcategoría",
              PieChart,
              <PieChartComponent
                data={breakdownData}
                color={selectedCategoryData.color}
                title={`Distribución en ${selectedCategoryData.name}`}
              />
            )}

            {/* Comparación con benchmarks */}
            <div className="lg:col-span-2">
              {renderChartCard(
                "comparison",
                "Comparativa con Benchmarks",
                BarChart3,
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20">
                      <div className="text-xs text-text-200 mb-2">Tu gasto</div>
                      <div className="text-2xl font-bold text-primary-200">
                        ${selectedCategoryData.avgSpending.toLocaleString()}
                      </div>
                      <div className="text-xs text-text-200 mt-1">Mensual</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-bg-300/30 to-bg-300/20 border border-bg-300/40">
                      <div className="text-xs text-text-200 mb-2">
                        Promedio de usuarios
                      </div>
                      <div className="text-2xl font-bold text-text-100">
                        $
                        {Math.round(
                          selectedCategoryData.avgSpending * 0.85
                        ).toLocaleString()}
                      </div>
                      <div className="text-xs text-text-200 mt-1">
                        -15% vs tú
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-accent-100/10 to-accent-100/5 border border-accent-100/20">
                      <div className="text-xs text-text-200 mb-2">
                        Top 25% eficientes
                      </div>
                      <div className="text-2xl font-bold text-accent-100">
                        $
                        {Math.round(
                          selectedCategoryData.avgSpending * 0.7
                        ).toLocaleString()}
                      </div>
                      <div className="text-xs text-text-200 mt-1">
                        -30% vs tú
                      </div>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            name: "Tú",
                            value: selectedCategoryData.avgSpending,
                            fill: selectedCategoryData.color,
                          },
                          {
                            name: "Promedio",
                            value: Math.round(
                              selectedCategoryData.avgSpending * 0.85
                            ),
                            fill: "#6B7280",
                          },
                          {
                            name: "Top 25%",
                            value: Math.round(
                              selectedCategoryData.avgSpending * 0.7
                            ),
                            fill: "#8FBC8F",
                          },
                        ]}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#374151"
                          strokeOpacity={0.3}
                        />
                        <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                        <YAxis
                          stroke="#9CA3AF"
                          fontSize={12}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <RechartsTooltip
                          formatter={(value) => [
                            `$${Number(value).toLocaleString()}`,
                            "Gasto mensual",
                          ]}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recomendaciones de optimización */}
          <Card className="border-0 bg-gradient-to-br from-primary-100/10 via-primary-200/5 to-accent-100/5 backdrop-blur-lg border border-primary-100/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-text-100 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-100/30">
                  <Sparkles className="h-5 w-5 text-primary-200" />
                </div>
                Recomendaciones de Optimización
                <Badge className="ml-2 bg-gradient-to-r from-primary-100/30 to-accent-100/30 text-primary-200 border border-primary-100/30">
                  <Target className="h-3 w-3 mr-1.5" />
                  Personalizado
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Establecer límite de gasto",
                    description: `Sugerido: $${Math.round(
                      selectedCategoryData.avgSpending * 0.85
                    )} mensual (15% de reducción)`,
                    icon: Target,
                    color: "text-primary-200",
                    action: "Configurar límite",
                  },
                  {
                    title: "Revisar subcategorías",
                    description:
                      "Identificar las 2 áreas con mayor gasto para optimización",
                    icon: Filter,
                    color: "text-blue-400",
                    action: "Analizar subcategorías",
                  },
                  {
                    title: "Reducir frecuencia",
                    description:
                      "Disminuir compras en un 20% este mes mediante consolidación",
                    icon: TrendingDown,
                    color: "text-green-400",
                    action: "Planificar compras",
                  },
                  {
                    title: "Alternativas económicas",
                    description:
                      "Buscar 3 proveedores alternativos con mejores precios",
                    icon: Lightbulb,
                    color: "text-amber-400",
                    action: "Explorar opciones",
                  },
                ].map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-100/40 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${rec.color} bg-opacity-20`}
                      >
                        <rec.icon className={`h-4 w-4 ${rec.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-text-100 mb-1">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-text-200 mb-3">
                          {rec.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-primary-200 hover:text-primary-100 hover:bg-primary-100/10"
                        >
                          {rec.action} →
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;
