import React, { useState } from "react";
import {
  Filter,
  Calendar,
  Tag,
  DollarSign,
  Search,
  X,
  Sliders,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Eye,
  Save,
  Zap,
  Sparkles,
  Target,
  BarChart3,
  Clock,
  Layers,
  Filter as FilterIcon,
  CheckCircle,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  CategoryIcons,
  CategoryIconType,
} from "../../components/budgets/CategoryIcons";

// Componente de flecha mejorado
const ExpandArrow = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <div className="relative">
      {/* Anillo animado */}
      <div
        className={`absolute inset-0 rounded-full ${
          isExpanded
            ? "bg-gradient-to-r from-primary-100/20 to-primary-200/20 animate-pulse"
            : "group-hover:bg-gradient-to-r from-primary-100/10 to-primary-200/10"
        } transition-all duration-300`}
      />

      <ChevronDown
        className={`
          relative h-4 w-4 transition-all duration-300
          ${
            isExpanded
              ? "rotate-180 text-primary-200 scale-110"
              : "text-text-200 group-hover:text-primary-200"
          }
        `}
      />
    </div>
  );
};

// Chip de categoría mejorado CON ICONOS PERSONALIZADOS
const CategoryChip = ({
  iconName,
  name,
  isSelected,
  count = 0,
  onClick,
}: {
  iconName: CategoryIconType;
  name: string;
  isSelected: boolean;
  count?: number;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative group overflow-hidden transition-all duration-300
        h-auto py-3 px-3 flex flex-col items-center gap-2 rounded-xl border-2
        ${
          isSelected
            ? "bg-gradient-to-br from-primary-100/20 to-primary-200/10 border-primary-100/60 shadow-lg shadow-primary-100/20"
            : "border-bg-300/40 bg-bg-300/20 hover:bg-gradient-to-br hover:from-primary-100/10 hover:to-primary-200/5 hover:border-primary-100/40"
        }
      `}
    >
      {/* Efecto de selección */}
      {isSelected && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/5 to-primary-200/5" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-200 animate-pulse shadow-lg shadow-primary-200/50" />
        </>
      )}

      {/* Icono personalizado (NO EMOJI) */}
      <div className="relative z-10">
        <div
          className={`transition-transform duration-300 ${
            isSelected ? "scale-110" : "group-hover:scale-105"
          }`}
        >
          {CategoryIcons[iconName] || CategoryIcons.other}
        </div>
      </div>

      {/* Texto */}
      <div className="relative z-10 text-center space-y-1">
        <div
          className={`text-xs font-semibold transition-colors ${
            isSelected
              ? "text-primary-200"
              : "text-text-100 group-hover:text-primary-200"
          }`}
        >
          {name}
        </div>
        {count > 0 && (
          <div
            className={`text-xs px-2 py-0.5 rounded-full ${
              isSelected
                ? "bg-primary-100/20 text-primary-200"
                : "bg-bg-300/40 text-text-200/80"
            }`}
          >
            {count} trans.
          </div>
        )}
      </div>

      {/* Indicador de check para selección */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-lg shadow-primary-200/50">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </button>
  );
};

const TransactionFilters: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "food",
    "transport",
  ]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["expense"]);
  const [dateRange, setDateRange] = useState("month");
  const [amountRange, setAmountRange] = useState([500, 2500]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    types: true,
    amount: false,
    date: false,
  });
  const [showAllCategories, setShowAllCategories] = useState(false);

  // TODAS LAS CATEGORÍAS (22+) CON ICONOS PERSONALIZADOS
  const categories = [
    // Categorías principales (mostradas inicialmente)
    {
      id: "food",
      name: "Alimentación",
      iconName: "food" as CategoryIconType,
      color: "#2E8B57",
      count: 12,
      isDefault: true,
    },
    {
      id: "transport",
      name: "Transporte",
      iconName: "transport" as CategoryIconType,
      color: "#61bc84",
      count: 8,
      isDefault: true,
    },
    {
      id: "entertainment",
      name: "Entretenimiento",
      iconName: "entertainment" as CategoryIconType,
      color: "#8FBC8F",
      count: 15,
      isDefault: true,
    },
    {
      id: "shopping",
      name: "Compras",
      iconName: "shopping" as CategoryIconType,
      color: "#c6ffe6",
      count: 9,
      isDefault: true,
    },
    {
      id: "utilities",
      name: "Servicios",
      iconName: "utilities" as CategoryIconType,
      color: "#345e37",
      count: 3,
      isDefault: true,
    },
    {
      id: "health",
      name: "Salud",
      iconName: "health" as CategoryIconType,
      color: "#2E8B57",
      count: 5,
      isDefault: true,
    },

    // Categorías adicionales (se mostrarán al expandir)
    {
      id: "education",
      name: "Educación",
      iconName: "education" as CategoryIconType,
      color: "#61bc84",
      count: 4,
      isDefault: false,
    },
    {
      id: "home",
      name: "Hogar",
      iconName: "home" as CategoryIconType,
      color: "#8FBC8F",
      count: 6,
      isDefault: false,
    },
    {
      id: "salary",
      name: "Salario",
      iconName: "salary" as CategoryIconType,
      color: "#c6ffe6",
      count: 2,
      isDefault: false,
    },
    {
      id: "gift",
      name: "Regalos",
      iconName: "gift" as CategoryIconType,
      color: "#345e37",
      count: 3,
      isDefault: false,
    },
    {
      id: "fitness",
      name: "Fitness",
      iconName: "fitness" as CategoryIconType,
      color: "#2E8B57",
      count: 5,
      isDefault: false,
    },
    {
      id: "travel",
      name: "Viajes",
      iconName: "travel" as CategoryIconType,
      color: "#61bc84",
      count: 2,
      isDefault: false,
    },
    {
      id: "savings",
      name: "Ahorros",
      iconName: "savings" as CategoryIconType,
      color: "#8FBC8F",
      count: 7,
      isDefault: false,
    },
    {
      id: "coffee",
      name: "Café/Snacks",
      iconName: "coffee" as CategoryIconType,
      color: "#c6ffe6",
      count: 22,
      isDefault: false,
    },
    {
      id: "internet",
      name: "Internet",
      iconName: "internet" as CategoryIconType,
      color: "#345e37",
      count: 3,
      isDefault: false,
    },
    {
      id: "pet",
      name: "Mascotas",
      iconName: "pet" as CategoryIconType,
      color: "#2E8B57",
      count: 4,
      isDefault: false,
    },
    {
      id: "clothing",
      name: "Ropa",
      iconName: "clothing" as CategoryIconType,
      color: "#61bc84",
      count: 9,
      isDefault: false,
    },
    {
      id: "beauty",
      name: "Belleza",
      iconName: "beauty" as CategoryIconType,
      color: "#8FBC8F",
      count: 8,
      isDefault: false,
    },
    {
      id: "subscription",
      name: "Suscripciones",
      iconName: "subscription" as CategoryIconType,
      color: "#c6ffe6",
      count: 6,
      isDefault: false,
    },
    {
      id: "taxes",
      name: "Impuestos",
      iconName: "taxes" as CategoryIconType,
      color: "#345e37",
      count: 2,
      isDefault: false,
    },
    {
      id: "car",
      name: "Auto",
      iconName: "car" as CategoryIconType,
      color: "#2E8B57",
      count: 5,
      isDefault: false,
    },
    {
      id: "investment",
      name: "Inversiones",
      iconName: "investment" as CategoryIconType,
      color: "#61bc84",
      count: 4,
      isDefault: false,
    },
    {
      id: "insurance",
      name: "Seguros",
      iconName: "insurance" as CategoryIconType,
      color: "#8FBC8F",
      count: 3,
      isDefault: false,
    },
    {
      id: "other",
      name: "Otros",
      iconName: "other" as CategoryIconType,
      color: "#c6ffe6",
      count: 15,
      isDefault: false,
    },
  ];

  const transactionTypes = [
    {
      id: "income",
      name: "Ingresos",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-gradient-to-br from-green-500/20 to-green-600/10",
      count: 42,
      amount: 5250,
    },
    {
      id: "expense",
      name: "Gastos",
      icon: TrendingDown,
      color: "text-red-400",
      bgColor: "bg-gradient-to-br from-red-500/20 to-red-600/10",
      count: 86,
      amount: 3120,
    },
    {
      id: "transfer",
      name: "Transferencias",
      icon: RefreshCw,
      color: "text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-blue-600/10",
      count: 8,
      amount: 1200,
    },
  ];

  const quickAmounts = [
    { value: 100, label: "$100" },
    { value: 500, label: "$500" },
    { value: 1000, label: "$1K" },
    { value: 2000, label: "$2K" },
    { value: 5000, label: "$5K" },
  ];

  const quickDates = [
    { id: "today", label: "Hoy", icon: "⏰" },
    { id: "week", label: "7 días", icon: "📅" },
    { id: "month", label: "30 días", icon: "📆" },
    { id: "quarter", label: "Trimestre", icon: "📊" },
  ];

  // Filtrar categorías a mostrar
  const mainCategories = categories.filter((cat) => cat.isDefault);
  const additionalCategories = categories.filter((cat) => !cat.isDefault);
  const categoriesToShow = showAllCategories ? categories : mainCategories;

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedTypes([]);
    setDateRange("month");
    setAmountRange([0, 5000]);
  };

  const handleAmountChange = (value: number[]) => {
    setAmountRange(value);
  };

  const quickAmountClick = (amount: number) => {
    setAmountRange([0, amount]);
  };

  const handleQuickDate = (period: string) => {
    setDateRange(period);
  };

  const hasActiveFilters =
    search || selectedCategories.length > 0 || selectedTypes.length > 0;

  // Calcula estadísticas
  const totalTransactions = 136;
  const totalAmount = 8370;
  const filteredTransactions = Math.round(totalTransactions * 0.75);
  const filteredAmount = Math.round(totalAmount * 0.65);

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/60 via-bg-300/30 to-bg-200/40 backdrop-blur-lg border border-bg-300/50 shadow-2xl relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/5 via-transparent to-accent-100/5" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-100/10 to-transparent rounded-full translate-y-12 -translate-x-12" />

      <CardHeader className="pb-4 border-b border-bg-300/30 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-100/20 via-primary-200/15 to-primary-100/10 border border-primary-100/30 shadow-lg shadow-primary-100/20">
              <Filter className="h-5 w-5 text-primary-200" />
            </div>
            <div>
              <CardTitle className="text-text-100 text-xl flex items-center gap-2">
                Filtros Inteligentes
                <Badge className="ml-2 bg-gradient-to-r from-primary-100/30 to-accent-100/30 text-primary-200 border border-primary-100/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  IA
                </Badge>
              </CardTitle>
              <div className="text-sm text-text-200 flex items-center gap-2 mt-1">
                <Target className="h-3 w-3" />
                {hasActiveFilters
                  ? `${filteredTransactions} transacciones filtradas`
                  : "Analiza todas las transacciones"}
              </div>
            </div>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-text-200 hover:text-primary-200 hover:bg-primary-100/10 border border-bg-300/40"
            >
              <X className="h-4 w-4 mr-2" />
              Limpiar todo
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 py-6 relative z-10">
        {/* 1. Barra de búsqueda premium */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-text-200 flex items-center gap-2 font-medium">
              <Search className="h-4 w-4" />
              Búsqueda Inteligente
            </Label>
            <Badge
              variant="outline"
              className="text-xs border-primary-100/30 text-primary-200"
            >
              <Zap className="h-3 w-3 mr-1" />
              IA
            </Badge>
          </div>

          <div className="relative group">
            {/* Icono decorativo */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Search className="h-4 w-4 text-text-200/60 group-hover:text-primary-200 group-focus-within:text-primary-200 transition-colors" />
            </div>

            {/* Input con diseño oscuro y premium */}
            <Input
              placeholder="Buscar transacciones, descripciones, montos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                pl-11 pr-10 
                h-11 
                bg-bg-300/50 
                border-2 
                border-bg-300/70 
                focus:border-primary-100/70 
                focus:bg-bg-300/60
                text-text-100 
                placeholder:text-text-200/50 
                rounded-xl 
                transition-all 
                duration-300
                shadow-lg
                shadow-black/30
                group-hover:border-primary-100/40
                group-hover:bg-bg-300/55
              "
            />

            {/* Botón para limpiar (solo cuando hay texto) */}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="
                  absolute 
                  right-3 
                  top-1/2 
                  transform 
                  -translate-y-1/2 
                  p-1.5 
                  rounded-lg 
                  bg-bg-300/80 
                  hover:bg-primary-100/20 
                  border 
                  border-bg-300/60
                  hover:border-primary-100/40
                  transition-all 
                  duration-200
                  shadow-sm
                "
              >
                <X className="h-3.5 w-3.5 text-text-200/70 hover:text-primary-200" />
              </button>
            )}

            {/* Efecto de brillo en el borde inferior */}
            <div
              className="
              absolute 
              bottom-0 
              left-3 
              right-3 
              h-px 
              bg-gradient-to-r 
              from-transparent 
              via-primary-100/20 
              to-transparent 
              opacity-0 
              group-hover:opacity-100 
              group-focus-within:opacity-100
              transition-opacity 
              duration-300
            "
            />

            {/* Sombra interna para profundidad */}
            <div
              className="
              absolute 
              inset-0 
              rounded-xl 
              pointer-events-none 
              shadow-inner 
              shadow-black/20
            "
            />
          </div>
        </div>

        {/* 2. Tipo de transacción mejorado */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection("types")}
            className="flex items-center justify-between w-full text-left group p-2 -mx-2 rounded-lg hover:bg-bg-300/20 transition-colors"
          >
            <Label className="text-sm text-text-100 font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                <BarChart3 className="h-4 w-4 text-primary-200" />
              </div>
              Tipo de Transacción
            </Label>
            <ExpandArrow isExpanded={expandedSections.types} />
          </button>

          {expandedSections.types && (
            <div className="space-y-3 pl-2">
              {transactionTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedTypes.includes(type.id);
                return (
                  <div key={type.id} className="relative group">
                    <div
                      className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-r from-primary-100/10 to-primary-200/5 border-primary-100/40"
                          : "border-transparent bg-bg-300/20 hover:bg-bg-300/30"
                      }`}
                    >
                      <div className="relative">
                        <Checkbox
                          id={`type-${type.id}`}
                          checked={isSelected}
                          onCheckedChange={() => toggleType(type.id)}
                          className={`data-[state=checked]:bg-primary-100 border-2 ${
                            isSelected
                              ? "border-primary-100"
                              : "border-bg-300/50"
                          } h-5 w-5`}
                        />
                      </div>
                      <Label
                        htmlFor={`type-${type.id}`}
                        className="text-sm text-text-200 cursor-pointer flex items-center gap-3 flex-1"
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            type.bgColor
                          } border-2 ${
                            isSelected
                              ? "border-white/20"
                              : "border-transparent"
                          }`}
                        >
                          <Icon className={`h-6 w-6 ${type.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-text-100 flex items-center gap-2">
                            {type.name}
                            {isSelected && (
                              <CheckCircle className="h-3 w-3 text-primary-200" />
                            )}
                          </div>
                          <div className="text-xs text-text-200/80 flex items-center gap-3 mt-1">
                            <span>{type.count} transacciones</span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-bg-300/50">
                              ${type.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Período de tiempo premium */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection("date")}
            className="flex items-center justify-between w-full text-left group p-2 -mx-2 rounded-lg hover:bg-bg-300/20 transition-colors"
          >
            <Label className="text-sm text-text-100 font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                <Clock className="h-4 w-4 text-primary-200" />
              </div>
              Período de Tiempo
            </Label>
            <ExpandArrow isExpanded={expandedSections.date} />
          </button>

          {expandedSections.date && (
            <div className="space-y-4 pl-2">
              <div className="relative">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="bg-gradient-to-r from-bg-300/20 to-bg-300/10 border-2 border-bg-300/50 focus:border-primary-100/50 text-text-100 h-12 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-200/95 backdrop-blur-md border border-bg-300">
                    <SelectItem value="today" className="text-text-100">
                      Hoy
                    </SelectItem>
                    <SelectItem value="week" className="text-text-100">
                      Esta semana
                    </SelectItem>
                    <SelectItem value="month" className="text-text-100">
                      Este mes
                    </SelectItem>
                    <SelectItem value="quarter" className="text-text-100">
                      Este trimestre
                    </SelectItem>
                    <SelectItem value="year" className="text-text-100">
                      Este año
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {quickDates.map((date) => (
                  <Button
                    key={date.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickDate(date.id)}
                    className={`h-11 rounded-lg border-2 transition-all duration-300 ${
                      dateRange === date.id
                        ? "bg-gradient-to-r from-primary-100/20 to-primary-200/10 border-primary-100/50 text-primary-200"
                        : "border-bg-300/50 bg-bg-300/20 text-text-200 hover:border-primary-100/40 hover:text-primary-200"
                    }`}
                  >
                    <span className="text-lg mr-2">{date.icon}</span>
                    {date.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. Rango de monto premium - VERSIÓN COMPLETAMENTE PERSONALIZADA */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection("amount")}
            className="flex items-center justify-between w-full text-left group p-2 -mx-2 rounded-lg hover:bg-bg-300/20 transition-colors"
          >
            <Label className="text-sm text-text-100 font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                <Layers className="h-4 w-4 text-primary-200" />
              </div>
              Rango de Monto
            </Label>
            <ExpandArrow isExpanded={expandedSections.amount} />
          </button>

          {expandedSections.amount && (
            <div className="space-y-6 pl-2">
              {/* Encabezado con valores */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-center p-2 rounded-lg bg-gradient-to-br from-bg-300/30 to-bg-300/20">
                  <div className="text-xs text-text-200">Mínimo</div>
                  <div className="text-lg font-bold text-primary-200">
                    ${amountRange[0].toLocaleString()}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-text-200">Rango</div>
                  <div className="text-sm font-medium text-primary-100">
                    ${amountRange[1] - amountRange[0]} diferencia
                  </div>
                </div>

                <div className="text-center p-2 rounded-lg bg-gradient-to-br from-bg-300/30 to-bg-300/20">
                  <div className="text-xs text-text-200">Máximo</div>
                  <div className="text-lg font-bold text-primary-200">
                    ${amountRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Slider completamente personalizado */}
              <div className="space-y-4">
                {/* Contenedor principal del slider */}
                <div
                  className="relative h-12"
                  ref={(el) => {
                    if (!el) return;

                    // Función para manejar el clic/drag en la barra
                    const handleBarClick = (e: React.MouseEvent) => {
                      const rect = el.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const width = rect.width;
                      const percentage = (x / width) * 100;
                      const value = Math.round((percentage / 100) * 10000);

                      // Determinar si click está más cerca del mínimo o máximo
                      const distToMin = Math.abs(value - amountRange[0]);
                      const distToMax = Math.abs(value - amountRange[1]);

                      if (distToMin < distToMax) {
                        setAmountRange([
                          Math.max(0, Math.min(value, amountRange[1] - 100)),
                          amountRange[1],
                        ]);
                      } else {
                        setAmountRange([
                          amountRange[0],
                          Math.min(
                            10000,
                            Math.max(value, amountRange[0] + 100)
                          ),
                        ]);
                      }
                    };

                    // Añadir event listeners
                    el.addEventListener("mousedown", handleBarClick as any);
                  }}
                >
                  {/* Barra completa de fondo */}
                  <div className="absolute top-1/2 left-0 right-0 h-2.5 -translate-y-1/2 bg-bg-300/70 rounded-full" />

                  {/* Marcas de referencia */}
                  {[0, 2500, 5000, 7500, 10000].map((mark) => (
                    <div
                      key={mark}
                      className="absolute top-1/2 w-0.5 h-3 -translate-y-1/2 bg-bg-300/40"
                      style={{ left: `${(mark / 10000) * 100}%` }}
                    />
                  ))}

                  {/* Rango seleccionado - ¡SOLO ESTA PARTE ES VERDE! */}
                  <div
                    className="absolute top-1/2 h-2.5 -translate-y-1/2 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 rounded-full shadow-lg shadow-primary-100/20 transition-all duration-200"
                    style={{
                      left: `${(amountRange[0] / 10000) * 100}%`,
                      width: `${
                        ((amountRange[1] - amountRange[0]) / 10000) * 100
                      }%`,
                    }}
                  />

                  {/* Control para el valor mínimo */}
                  <div
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${(amountRange[0] / 10000) * 100}%` }}
                  >
                    <div className="relative">
                      {/* Línea guía */}
                      <div className="absolute bottom-1/2 left-1/2 w-0.5 h-8 -translate-x-1/2 bg-primary-100/20 rounded-full" />

                      {/* Control circular */}
                      <div className="w-7 h-7 rounded-full bg-white border-3 border-primary-100 shadow-xl shadow-primary-100/40 cursor-grab active:cursor-grabbing hover:scale-125 transition-all duration-200 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-100" />
                      </div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-bg-300/90 backdrop-blur-sm border border-bg-300/50 text-xs text-primary-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                        <div className="font-bold">
                          ${amountRange[0].toLocaleString()}
                        </div>
                        <div className="text-xs text-text-200/70">Mínimo</div>
                      </div>
                    </div>
                  </div>

                  {/* Control para el valor máximo */}
                  <div
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${(amountRange[1] / 10000) * 100}%` }}
                  >
                    <div className="relative">
                      {/* Línea guía */}
                      <div className="absolute bottom-1/2 left-1/2 w-0.5 h-8 -translate-x-1/2 bg-primary-200/20 rounded-full" />

                      {/* Control circular */}
                      <div className="w-7 h-7 rounded-full bg-white border-3 border-primary-200 shadow-xl shadow-primary-200/40 cursor-grab active:cursor-grabbing hover:scale-125 transition-all duration-200 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-200" />
                      </div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-bg-300/90 backdrop-blur-sm border border-bg-300/50 text-xs text-primary-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                        <div className="font-bold">
                          ${amountRange[1].toLocaleString()}
                        </div>
                        <div className="text-xs text-text-200/70">Máximo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Etiquetas del rango */}
                <div className="flex justify-between text-xs text-text-200/60 px-1">
                  <span>$0</span>
                  <span>$2,500</span>
                  <span>$5,000</span>
                  <span>$7,500</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Valores rápidos */}
              <div>
                <div className="text-xs text-text-200 mb-3 flex items-center gap-2">
                  <Zap className="h-3 w-3 text-primary-200" />
                  Valores rápidos:
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount.value}
                      onClick={() => setAmountRange([0, amount.value])}
                      className={`
                h-10 rounded-lg border-2 transition-all duration-300
                ${
                  amountRange[1] === amount.value
                    ? "bg-gradient-to-br from-primary-100/30 to-primary-200/20 border-primary-100/50 text-primary-200 shadow-lg shadow-primary-100/20"
                    : "border-bg-300/50 bg-bg-300/20 text-text-200 hover:border-primary-100/40 hover:text-primary-200 hover:bg-bg-300/30"
                }
              `}
                    >
                      <span className="text-xs font-medium">
                        {amount.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Controles de entrada manual */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-bg-300/40">
                <div>
                  <Label className="text-xs text-text-200 mb-2 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary-100" />
                    Mínimo personalizado
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-200">
                      $
                    </span>
                    <Input
                      type="number"
                      value={amountRange[0]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setAmountRange([
                          Math.max(0, Math.min(val, amountRange[1] - 100)),
                          amountRange[1],
                        ]);
                      }}
                      className="pl-8 bg-bg-300/40 border-2 border-bg-300/60 focus:border-primary-100/60 text-text-100 rounded-lg"
                      min={0}
                      max={amountRange[1] - 100}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-text-200 mb-2 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary-200" />
                    Máximo personalizado
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-200">
                      $
                    </span>
                    <Input
                      type="number"
                      value={amountRange[1]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 10000;
                        setAmountRange([
                          amountRange[0],
                          Math.min(10000, Math.max(val, amountRange[0] + 100)),
                        ]);
                      }}
                      className="pl-8 bg-bg-300/40 border-2 border-bg-300/60 focus:border-primary-200/60 text-text-100 rounded-lg"
                      min={amountRange[0] + 100}
                      max={10000}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Categorías premium - VERSIÓN MEJORADA CON 22+ CATEGORÍAS */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection("categories")}
            className="flex items-center justify-between w-full text-left group p-2 -mx-2 rounded-lg hover:bg-bg-300/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Label className="text-sm text-text-100 font-semibold flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                  <Tag className="h-4 w-4 text-primary-200" />
                </div>
                Categorías ({categories.length} disponibles)
              </Label>
              {selectedCategories.length > 0 && (
                <Badge className="bg-gradient-to-r from-primary-100/30 to-primary-200/20 text-primary-200 border border-primary-100/30">
                  {selectedCategories.length} seleccionadas
                </Badge>
              )}
            </div>
            <ExpandArrow isExpanded={expandedSections.categories} />
          </button>

          {expandedSections.categories && (
            <div className="space-y-4 pl-2">
              {/* Grid de categorías */}
              <div className="grid grid-cols-2 gap-3">
                {categoriesToShow.map((category) => {
                  const isSelected = selectedCategories.includes(category.id);
                  return (
                    <CategoryChip
                      key={category.id}
                      iconName={category.iconName}
                      name={category.name}
                      isSelected={isSelected}
                      count={category.count}
                      onClick={() => toggleCategory(category.id)}
                    />
                  );
                })}
              </div>

              {/* Botón "Ver más" / "Ver menos" */}
              {additionalCategories.length > 0 && (
                <div className="pt-2 border-t border-bg-300/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-text-200 hover:text-primary-200"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                  >
                    {showAllCategories ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Mostrar menos ({mainCategories.length} categorías)
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Ver {additionalCategories.length} categorías más
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Contador y botón limpiar */}
              {selectedCategories.length > 0 && (
                <div className="flex items-center justify-between text-sm pt-2 border-t border-bg-300/30">
                  <span className="text-text-200">
                    Categorías seleccionadas:{" "}
                    <span className="font-semibold text-primary-200">
                      {selectedCategories.length}
                    </span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategories([])}
                    className="text-text-200 hover:text-red-400"
                  >
                    Limpiar todas
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Separador decorativo */}
        <Separator className="bg-gradient-to-r from-transparent via-bg-300/30 to-transparent h-px" />

        {/* 6. Resumen y estadísticas premium */}
        <div className="pt-2">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-100/20">
              <div className="text-xs text-text-200 mb-2 flex items-center gap-2">
                <FilterIcon className="h-3 w-3" />
                Transacciones filtradas
              </div>
              <div className="text-2xl font-bold text-text-100">
                {filteredTransactions}
              </div>
              <Progress
                value={75}
                className="h-1.5 mt-2 bg-bg-300/30"
                indicatorClassName="bg-gradient-to-r from-primary-100 to-primary-200"
              />
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-accent-100/10 to-accent-200/5 border border-accent-100/20">
              <div className="text-xs text-text-200 mb-2 flex items-center gap-2">
                <DollarSign className="h-3 w-3" />
                Total filtrado
              </div>
              <div className="text-2xl font-bold text-green-400">
                ${filteredAmount.toLocaleString()}
              </div>
              <Progress
                value={65}
                className="h-1.5 mt-2 bg-bg-300/30"
                indicatorClassName="bg-gradient-to-r from-accent-100 to-accent-200"
              />
            </div>
          </div>
        </div>

        {/* 7. Filtros activos premium - ACTUALIZADO CON ICONOS */}
        {hasActiveFilters && (
          <div className="pt-2">
            <div className="text-sm text-text-200 mb-3 font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Filtros aplicados:
            </div>
            <div className="flex flex-wrap gap-2">
              {search && (
                <Badge className="bg-gradient-to-r from-primary-100/20 to-primary-200/10 text-primary-200 border border-primary-100/30 px-3 py-1.5">
                  <Search className="h-3 w-3 mr-2" />"{search}"
                </Badge>
              )}
              {selectedTypes.map((typeId) => {
                const type = transactionTypes.find((t) => t.id === typeId);
                return (
                  type && (
                    <Badge
                      key={typeId}
                      className="bg-gradient-to-r from-primary-100/20 to-primary-200/10 text-primary-200 border border-primary-100/30 px-3 py-1.5"
                    >
                      {type.name}
                    </Badge>
                  )
                );
              })}
              {selectedCategories.map((catId) => {
                const cat = categories.find((c) => c.id === catId);
                return (
                  cat && (
                    <Badge
                      key={catId}
                      className="bg-gradient-to-r from-primary-100/20 to-primary-200/10 text-primary-200 border border-primary-100/30 px-3 py-1.5 flex items-center gap-2"
                    >
                      {/* Usar el ícono en lugar del emoji */}
                      <div className="h-4 w-4">
                        {CategoryIcons[cat.iconName] || CategoryIcons.other}
                      </div>
                      {cat.name}
                    </Badge>
                  )
                );
              })}
            </div>
          </div>
        )}

        {/* 8. Acciones premium */}
        <div className="pt-4 space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 hover:from-primary-200 hover:via-primary-300 hover:to-primary-200 text-white font-semibold h-12 text-base rounded-xl shadow-lg shadow-primary-100/30 hover:shadow-primary-200/40 transition-all duration-300 group"
            onClick={() => console.log("Aplicar filtros")}
          >
            <div className="flex items-center justify-center gap-3">
              <Filter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Aplicar Filtros Inteligentes</span>
              <Badge className="ml-2 bg-white/20 text-white border-white/30">
                <Zap className="h-3 w-3 mr-1" />
                IA
              </Badge>
            </div>
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-2 border-bg-300/50 hover:border-primary-100/40 text-text-200 hover:text-primary-200 h-11 rounded-xl transition-all duration-300 group"
              onClick={() => console.log("Guardar vista")}
            >
              <Save className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Guardar Vista
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-2 border-bg-300/50 hover:border-primary-100/40 text-text-200 hover:text-primary-200 h-11 rounded-xl transition-all duration-300 group"
              onClick={() => console.log("Ver vista")}
            >
              <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Vista Previa
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionFilters;
