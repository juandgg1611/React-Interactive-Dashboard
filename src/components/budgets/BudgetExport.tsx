// src/components/budgets/BudgetExport.tsx
import React, { useState } from "react";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FilePieChart,
  Printer,
  Share2,
  Calendar,
  Filter,
  Eye,
  EyeOff,
  ChevronRight,
  Check,
  X,
  Clock,
  Mail,
  ExternalLink,
  Copy,
  BarChart3,
  PieChart,
  TrendingUp,
  Target,
  DollarSign,
  Receipt,
  Tag,
  Wallet,
  RefreshCw,
  Shield,
  Brain,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Percent,
  Layers,
  ChartBar,
  Target as TargetIcon,
  Users,
  FileBarChart,
  Award,
  Zap,
  LineChart,
  PieChart as PieChartIcon,
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
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  MonthlyBudget,
  BudgetCategory,
  BudgetHistory,
} from "../../types/budget.types";

// Importar los iconos personalizados
import {
  CategoryIcons,
  CategoryIconType,
} from "../../components/budgets/CategoryIcons";

interface BudgetExportProps {
  budget: MonthlyBudget;
  history: BudgetHistory[];
  categories: BudgetCategory[];
  insights: any[];
}

const BudgetExport: React.FC<BudgetExportProps> = ({
  budget,
  history,
  categories,
  insights,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "excel" | "csv">(
    "pdf"
  );
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [includeInsights, setIncludeInsights] = useState(true);
  const [includeHistory, setIncludeHistory] = useState(true);
  const [dateRange, setDateRange] = useState("all");
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      name: "Reporte Presupuesto Q1 2024",
      format: "PDF",
      date: "2024-05-15",
      size: "2.8 MB",
    },
    {
      id: 2,
      name: "Análisis de Categorías Marzo",
      format: "Excel",
      date: "2024-04-30",
      size: "3.5 MB",
    },
    {
      id: 3,
      name: "Historial Presupuestal 2023",
      format: "PDF",
      date: "2024-03-15",
      size: "4.2 MB",
    },
    {
      id: 4,
      name: "Comparativa Mensual",
      format: "PDF",
      date: "2024-02-28",
      size: "3.1 MB",
    },
  ]);
  const [shareLink, setShareLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const exportOptions = [
    {
      id: "pdf",
      name: "PDF Document",
      description: "Reporte profesional con gráficos y análisis",
      icon: FileBarChart,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      id: "excel",
      name: "Excel Spreadsheet",
      description: "Datos estructurados para análisis detallado",
      icon: FileSpreadsheet,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      id: "csv",
      name: "CSV File",
      description: "Formato simple para integración con otras herramientas",
      icon: FileText,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ];

  const chartOptions = [
    { id: "spending", name: "Distribución por Categoría", icon: PieChartIcon },
    { id: "progress", name: "Progreso Presupuestal", icon: ChartBar },
    { id: "history", name: "Historial de Presupuestos", icon: LineChart },
    { id: "comparison", name: "Comparativa vs Objetivos", icon: TrendingUp },
  ];

  const dateOptions = [
    { value: "all", label: "Todo el historial" },
    { value: "current-year", label: "Año actual" },
    { value: "last-6-months", label: "Últimos 6 meses" },
    { value: "last-quarter", label: "Último trimestre" },
    { value: "custom", label: "Personalizado" },
  ];

  const filterHistoryByDate = (history: BudgetHistory[], range: string) => {
    if (range === "all") return history;

    const now = new Date();
    const startDate = new Date();

    switch (range) {
      case "current-year":
        startDate.setFullYear(now.getFullYear(), 0, 1);
        break;
      case "last-6-months":
        startDate.setMonth(now.getMonth() - 6);
        break;
      case "last-quarter":
        startDate.setMonth(now.getMonth() - 3);
        break;
      default:
        return history;
    }

    return history.filter((h) => new Date(h.month + " 01") >= startDate);
  };

  const filteredHistory = filterHistoryByDate(history, dateRange);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: BudgetCategory) => {
    if (category.trend === "up") return "text-red-400";
    if (category.trend === "down") return "text-green-400";
    return "text-yellow-400";
  };

  // Función actualizada para usar iconos personalizados
  const getCategoryIcon = (iconName: string) => {
    // Convertir el nombre del icono al formato correcto
    const iconKeys = Object.keys(CategoryIcons);
    const foundIcon = iconKeys.find(
      (key) => key.toLowerCase() === iconName.toLowerCase()
    );

    if (foundIcon) {
      const iconType = foundIcon as CategoryIconType;
      return CategoryIcons[iconType] || CategoryIcons.other;
    }

    // Mapeo de nombres alternativos si es necesario
    const alternativeMapping: Record<string, CategoryIconType> = {
      groceries: "food",
      transportation: "transport",
      movies: "entertainment",
      bills: "utilities",
      medical: "health",
      study: "education",
      house: "home",
      income: "salary",
      presents: "gift",
      exercise: "fitness",
      trips: "travel",
      bank: "savings",
      cafe: "coffee",
      web: "internet",
      pets: "pet",
      clothes: "clothing",
      cosmetics: "beauty",
      membership: "subscription",
      auto: "car",
      stocks: "investment",
      protection: "insurance",
    };

    const mappedName =
      alternativeMapping[iconName] || ("other" as CategoryIconType);
    return CategoryIcons[mappedName] || CategoryIcons.other;
  };

  const getStatusBadge = (progress: number) => {
    if (progress <= 70) {
      return (
        <Badge className="bg-green-500/20 text-green-400">Saludable</Badge>
      );
    } else if (progress <= 90) {
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400">Moderado</Badge>
      );
    } else {
      return <Badge className="bg-red-500/20 text-red-400">Crítico</Badge>;
    }
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const report = {
        id: Date.now(),
        name: `Reporte Presupuestal - ${budget.month} ${budget.year}`,
        format: selectedFormat,
        date: new Date().toISOString().split("T")[0],
        size:
          selectedFormat === "pdf"
            ? "3.2 MB"
            : selectedFormat === "excel"
            ? "4.5 MB"
            : "2.9 MB",
        included: {
          charts: includeCharts,
          details: includeDetails,
          insights: includeInsights,
          history: includeHistory,
        },
        stats: {
          totalCategories: categories.length,
          totalBudget: budget.totalLimit,
          totalSpent: budget.totalSpent,
          remaining: budget.remaining,
          progress: budget.progress,
          historyMonths: filteredHistory.length,
          insightsCount: insights.length,
        },
      };

      setGeneratedReport(report);
      setExportHistory([report, ...exportHistory]);
      setIsGenerating(false);

      const randomId = Math.random().toString(36).substring(7);
      setShareLink(
        `https://app.finanzas.com/share/budget/${budget.id}/${randomId}`
      );
    }, 2000);
  };

  const handleDownload = () => {
    if (generatedReport) {
      alert(
        `Descargando reporte presupuestal en formato ${generatedReport.format.toUpperCase()}`
      );
    }
  };

  const handleShare = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert("Enlace copiado al portapapeles");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Panel principal de exportación */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuración de exportación */}
        <Card className="lg:col-span-2 border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <FileBarChart className="h-5 w-5 text-primary-200" />
              Configurar Exportación Presupuestal
            </CardTitle>
            <CardDescription className="text-text-200">
              Personaliza tu reporte de presupuesto antes de generar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Formato del reporte */}
              <div>
                <Label className="text-text-100 mb-3 block">
                  Formato del Reporte
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {exportOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedFormat === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedFormat(option.id as any)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? `${option.bgColor} border-primary-100/50`
                            : "border-bg-300/50 bg-bg-300/20 hover:border-primary-200/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${option.bgColor}`}>
                            <Icon className={`h-5 w-5 ${option.color}`} />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-text-100">
                              {option.name}
                            </div>
                            <div className="text-xs text-text-200 mt-1">
                              {option.description}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="ml-auto">
                              <Check className="h-5 w-5 text-primary-200" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contenido a incluir */}
              <div>
                <Label className="text-text-100 mb-3 block">
                  Contenido a Incluir
                </Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-bg-300/20 border border-bg-300/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary-100/20">
                        <PieChartIcon className="h-4 w-4 text-primary-200" />
                      </div>
                      <div>
                        <div className="font-medium text-text-100">
                          Gráficos y Visualizaciones
                        </div>
                        <div className="text-sm text-text-200">
                          Distribución, progreso y comparativas
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={includeCharts}
                      onCheckedChange={setIncludeCharts}
                      className="data-[state=checked]:bg-primary-100"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-bg-300/20 border border-bg-300/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/20">
                        <Layers className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-text-100">
                          Detalles por Categoría
                        </div>
                        <div className="text-sm text-text-200">
                          Límites, gastos y progreso detallado
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={includeDetails}
                      onCheckedChange={setIncludeDetails}
                      className="data-[state=checked]:bg-primary-100"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-bg-300/20 border border-bg-300/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <Brain className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-text-100">
                          Insights de IA
                        </div>
                        <div className="text-sm text-text-200">
                          Recomendaciones y análisis predictivo
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={includeInsights}
                      onCheckedChange={setIncludeInsights}
                      className="data-[state=checked]:bg-primary-100"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-bg-300/20 border border-bg-300/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <LineChart className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-medium text-text-100">
                          Historial de Presupuestos
                        </div>
                        <div className="text-sm text-text-200">
                          Evolución y comparativas históricas
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={includeHistory}
                      onCheckedChange={setIncludeHistory}
                      className="data-[state=checked]:bg-primary-100"
                    />
                  </div>
                </div>
              </div>

              {/* Rango de fechas para historial */}
              <div>
                <Label className="text-text-100 mb-3 block">
                  Rango del Historial
                </Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                    <SelectValue placeholder="Selecciona un rango" />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                    {dateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Botón de generación */}
              <Button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white h-12 text-base"
              >
                {isGenerating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Generando reporte...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" />
                    Generar Reporte Presupuestal
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vista previa y estadísticas */}
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-text-100">Vista Previa</CardTitle>
            <CardDescription className="text-text-200">
              Resumen del reporte presupuestal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Estadísticas del presupuesto */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-200">Categorías:</span>
                  <span className="font-medium text-text-100">
                    {categories.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-200">Presupuesto Total:</span>
                  <span className="font-medium text-primary-200">
                    {formatCurrency(budget.totalLimit)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-200">Total Gastado:</span>
                  <span className="font-medium text-text-100">
                    {formatCurrency(budget.totalSpent)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-200">Restante:</span>
                  <span className="font-medium text-green-400">
                    {formatCurrency(budget.remaining)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-200">Progreso:</span>
                  <span
                    className={`font-medium ${
                      budget.progress <= 70
                        ? "text-green-400"
                        : budget.progress <= 90
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {budget.progress}%
                  </span>
                </div>
              </div>

              <Separator className="bg-bg-300/50" />

              {/* Configuración actual */}
              <div className="space-y-2">
                <h4 className="font-medium text-text-100">
                  Configuración actual:
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-200">Formato:</span>
                    <Badge className="bg-primary-100/20 text-primary-200">
                      {selectedFormat.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-200">Gráficos:</span>
                    {includeCharts ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <X className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-200">Insights IA:</span>
                    {includeInsights ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <X className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-200">Historial:</span>
                    {includeHistory ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <X className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                </div>
              </div>

              <Separator className="bg-bg-300/50" />

              {/* Acciones rápidas */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Vista para Imprimir
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
                  onClick={() =>
                    setShareLink(
                      `https://app.finanzas.com/share/budget/${
                        budget.id
                      }/${Date.now()}`
                    )
                  }
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Generar Enlace Compartir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reporte generado */}
      {generatedReport && (
        <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-md border border-green-500/20 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10">
                  <FileBarChart className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-100 mb-1">
                    {generatedReport.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-text-200">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(generatedReport.date)}
                    </div>
                    <div className="h-3 w-px bg-bg-300/50"></div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {generatedReport.format.toUpperCase()} •{" "}
                      {generatedReport.size}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Reporte
                </Button>
                <Button
                  variant="outline"
                  className="border-green-500/50 text-green-400 hover:text-green-300 hover:border-green-400/50"
                  onClick={() => setGeneratedReport(null)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cerrar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historial de exports */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-text-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary-200" />
            Historial de Exportaciones
          </CardTitle>
          <CardDescription className="text-text-200">
            Tus reportes presupuestales generados anteriormente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exportHistory.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      report.format === "PDF"
                        ? "bg-red-500/20"
                        : report.format === "Excel"
                        ? "bg-green-500/20"
                        : "bg-blue-500/20"
                    }`}
                  >
                    <FileBarChart
                      className={`h-5 w-5 ${
                        report.format === "PDF"
                          ? "text-red-400"
                          : report.format === "Excel"
                          ? "text-green-400"
                          : "text-blue-400"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-100">{report.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-text-200 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.date)}
                      </div>
                      <div className="h-3 w-px bg-bg-300/50"></div>
                      <span>{report.format}</span>
                      <div className="h-3 w-px bg-bg-300/50"></div>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-200 hover:text-primary-300"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-200 hover:text-primary-300"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compartir y colaboración */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary-200" />
              Compartir Análisis Presupuestal
            </CardTitle>
            <CardDescription className="text-text-200">
              Comparte tu planificación financiera con asesores o familiares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shareLink ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      value={shareLink}
                      readOnly
                      className="bg-bg-300/30 border-bg-300/50 text-text-100"
                    />
                    <Button
                      size="sm"
                      onClick={handleShare}
                      className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-text-200">
                    Este enlace expirará en 7 días y solo mostrará información
                    pública
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  <Share2 className="h-12 w-12 text-text-200/50 mx-auto mb-4" />
                  <h4 className="font-semibold text-text-100 mb-2">
                    Genera un enlace para compartir
                  </h4>
                  <p className="text-text-200 mb-4">
                    Crea un enlace seguro para compartir tu planificación
                    presupuestal con quien quieras
                  </p>
                  <Button
                    onClick={() =>
                      setShareLink(
                        `https://app.finanzas.com/share/budget/${
                          budget.id
                        }/${Date.now()}`
                      )
                    }
                    className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Generar Enlace Público
                  </Button>
                </div>
              )}

              <Separator className="bg-bg-300/50" />

              <div className="space-y-2">
                <h4 className="font-medium text-text-100">Compartir con:</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Correo Electrónico
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Asesor Financiero
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Familia
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Redes Sociales
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary-200" />
              Reportes Programados
            </CardTitle>
            <CardDescription className="text-text-200">
              Configura reportes automáticos periódicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-100/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary-200" />
                    <span className="font-medium text-text-100">
                      Reporte Mensual
                    </span>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-primary-100"
                    defaultChecked
                  />
                </div>
                <p className="text-sm text-text-200">
                  Enviado automáticamente el último día de cada mes
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-text-100">
                      Alertas de Exceso
                    </span>
                  </div>
                  <Switch className="data-[state=checked]:bg-blue-500" />
                </div>
                <p className="text-sm text-text-200">
                  Cuando categorías superan el 90% del límite
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-400" />
                    <span className="font-medium text-text-100">
                      Reporte de Cumplimiento
                    </span>
                  </div>
                  <Switch className="data-[state=checked]:bg-green-500" />
                </div>
                <p className="text-sm text-text-200">
                  Cuando se cumplen objetivos presupuestales
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-text-100">
                  Configurar nuevo reporte:
                </h4>
                <div className="space-y-3">
                  <Select>
                    <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                      <SelectValue placeholder="Frecuencia" />
                    </SelectTrigger>
                    <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                      <SelectItem value="quarterly">Trimestral</SelectItem>
                      <SelectItem value="yearly">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                      <SelectValue placeholder="Formato" />
                    </SelectTrigger>
                    <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Programar Reporte
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de datos exportables - CON ICONOS PERSONALIZADOS */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-text-100">Datos Exportables</CardTitle>
          <CardDescription className="text-text-200">
            Vista previa de las categorías presupuestales que se incluirán
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-bg-300/40 overflow-hidden">
            <Table>
              <TableHeader className="bg-bg-300/20">
                <TableRow>
                  <TableHead className="text-text-100">Categoría</TableHead>
                  <TableHead className="text-text-100">Límite</TableHead>
                  <TableHead className="text-text-100">Gastado</TableHead>
                  <TableHead className="text-text-100">Restante</TableHead>
                  <TableHead className="text-text-100">Progreso</TableHead>
                  <TableHead className="text-text-100">Tendencia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.slice(0, 6).map((category) => {
                  const progress = (category.spent / category.limit) * 100;
                  return (
                    <TableRow key={category.id} className="hover:bg-bg-300/10">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {/* Icono personalizado */}
                          <div className="w-8 h-8 flex items-center justify-center">
                            <div className="text-lg transform scale-110">
                              {getCategoryIcon(category.icon)}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-text-100">
                              {category.name}
                            </div>
                            <div className="text-xs text-text-200 capitalize">
                              {category.icon}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-text-100">
                        {formatCurrency(category.limit)}
                      </TableCell>
                      <TableCell className="text-text-100">
                        {formatCurrency(category.spent)}
                      </TableCell>
                      <TableCell>
                        <div
                          className={`font-medium ${
                            category.limit - category.spent > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {formatCurrency(category.limit - category.spent)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={progress}
                            className="h-2 bg-bg-300/30"
                            indicatorClassName={
                              progress <= 70
                                ? "bg-green-400"
                                : progress <= 90
                                ? "bg-yellow-400"
                                : "bg-red-400"
                            }
                          />
                          <span className="text-xs text-text-200 w-10">
                            {Math.round(progress)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {category.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-red-400" />
                          ) : category.trend === "down" ? (
                            <TrendingDown className="h-4 w-4 text-green-400" />
                          ) : (
                            <div className="h-4 w-4 text-yellow-400">–</div>
                          )}
                          <span
                            className={`text-sm ${getCategoryColor(category)}`}
                          >
                            {category.trendPercentage > 0 ? "+" : ""}
                            {category.trendPercentage}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
              onClick={handleGenerateReport}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar {categories.length} Categorías Presupuestales
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetExport;
