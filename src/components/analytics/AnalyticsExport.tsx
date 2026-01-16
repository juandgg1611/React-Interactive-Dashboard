// src/components/analytics/AnalyticsExport.tsx
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
  Check,
  X,
  Info,
  Briefcase,
  Cloud,
  Clock,
  Mail,
  ExternalLink,
  Copy,
  BarChart3,
  PieChart,
  TrendingUp,
  LineChart,
  Brain,
  Zap,
  AlertTriangle,
  Target,
  DollarSign,
  Sparkles,
  Eye,
  EyeOff,
  Settings,
  Layers,
  Grid3x3,
  Table as TableIcon,
  ChartBar,
  ChartLine,
  ChartArea,
  ChartCandlestick,
  DownloadCloud,
  RefreshCw,
  FolderOutput,
  BookOpen,
  Shield,
  Lock,
  Unlock,
  Users,
  Globe,
  Smartphone,
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
import { ScrollArea } from "../ui/scroll-area";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface AnalyticsExportProps {
  analyticsData?: any;
  insights?: any[];
  forecasts?: any[];
  patterns?: any[];
  healthScore?: any;
}

const AnalyticsExport: React.FC<AnalyticsExportProps> = ({
  analyticsData,
  insights,
  forecasts,
  patterns,
  healthScore,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<
    "pdf" | "excel" | "csv" | "json"
  >("pdf");
  const [reportType, setReportType] = useState<
    "executive" | "detailed" | "technical" | "custom"
  >("executive");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeInsights, setIncludeInsights] = useState(true);
  const [includeForecasts, setIncludeForecasts] = useState(true);
  const [includePatterns, setIncludePatterns] = useState(true);
  const [includeHealthScore, setIncludeHealthScore] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [dateRange, setDateRange] = useState("year");
  const [anonymizeData, setAnonymizeData] = useState(true);
  const [compressionLevel, setCompressionLevel] = useState(70);
  const [watermark, setWatermark] = useState(false);

  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      name: "Reporte Anual Completo",
      type: "executive",
      format: "PDF",
      date: "2024-05-15",
      size: "4.2 MB",
      pages: 24,
      status: "completed",
    },
    {
      id: 2,
      name: "Análisis Predictivo Q2",
      type: "technical",
      format: "Excel",
      date: "2024-04-30",
      size: "8.7 MB",
      pages: 18,
      status: "completed",
    },
    {
      id: 3,
      name: "Insights de IA - Trimestral",
      type: "detailed",
      format: "PDF",
      date: "2024-04-15",
      size: "5.1 MB",
      pages: 32,
      status: "completed",
    },
    {
      id: 4,
      name: "Reporte Ejecutivo",
      type: "executive",
      format: "PDF",
      date: "2024-04-01",
      size: "2.8 MB",
      pages: 12,
      status: "completed",
    },
    {
      id: 5,
      name: "Datos Crudos Análisis",
      type: "technical",
      format: "JSON",
      date: "2024-03-20",
      size: "15.3 MB",
      pages: null,
      status: "completed",
    },
  ]);

  const [shareLink, setShareLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);
  const [activeExportTab, setActiveExportTab] = useState("configure");

  // Opciones de formato
  const exportOptions = [
    {
      id: "pdf",
      name: "PDF Document",
      description: "Reporte profesional con diseño y gráficos",
      icon: FileText,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      features: [
        "Diseño profesional",
        "Gráficos vectoriales",
        "Páginas numeradas",
        "Marca de agua",
      ],
    },
    {
      id: "excel",
      name: "Excel Spreadsheet",
      description: "Datos estructurados para análisis avanzado",
      icon: FileSpreadsheet,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      features: [
        "Fórmulas calculadas",
        "Tablas dinámicas",
        "Filtros",
        "Gráficos Excel",
      ],
    },
    {
      id: "csv",
      name: "CSV File",
      description: "Datos simples para importar en cualquier sistema",
      icon: FileSpreadsheet,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      features: [
        "Compatible universal",
        "Ligero",
        "Fácil procesamiento",
        "Sin formato",
      ],
    },
    {
      id: "json",
      name: "JSON Data",
      description: "Datos estructurados para desarrolladores",
      icon: FilePieChart,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      features: [
        "Estructura jerárquica",
        "Metadata incluida",
        "API compatible",
        "Programable",
      ],
    },
  ];

  // Tipos de reporte
  const reportTypes = [
    {
      id: "executive",
      name: "Reporte Ejecutivo",
      description: "Resumen ejecutivo para toma de decisiones",
      icon: ChartBar,
      color: "text-primary-200",
      bgColor: "bg-primary-100/20",
      content: [
        "KPIs principales",
        "Resumen ejecutivo",
        "Recomendaciones",
        "Gráficos clave",
      ],
    },
    {
      id: "detailed",
      name: "Análisis Detallado",
      description: "Análisis completo con todos los insights",
      icon: ChartLine,
      color: "text-accent-100",
      bgColor: "bg-accent-100/20",
      content: [
        "Todos los insights",
        "Análisis por categoría",
        "Patrones detectados",
        "Proyecciones",
      ],
    },
    {
      id: "technical",
      name: "Reporte Técnico",
      description: "Para analistas y desarrolladores",
      icon: ChartArea,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      content: [
        "Datos crudos",
        "Métricas técnicas",
        "Modelos IA",
        "APIs y endpoints",
      ],
    },
    {
      id: "custom",
      name: "Personalizado",
      description: "Configura exactamente lo que necesitas",
      icon: Settings,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      content: [
        "Selecciona componentes",
        "Define formato",
        "Ajusta nivel de detalle",
        "Personaliza",
      ],
    },
  ];

  // Opciones de fecha
  const dateOptions = [
    { value: "week", label: "Última semana" },
    { value: "month", label: "Último mes" },
    { value: "quarter", label: "Último trimestre" },
    { value: "semester", label: "Último semestre" },
    { value: "year", label: "Último año" },
    { value: "all", label: "Todo el historial" },
    { value: "custom", label: "Rango personalizado" },
  ];

  // Componentes exportables
  const exportableComponents = [
    {
      id: "trends",
      name: "Tendencias Financieras",
      icon: TrendingUp,
      description: "Gráficos de evolución histórica",
      size: "2.3 MB",
      defaultChecked: true,
    },
    {
      id: "insights",
      name: "Insights de IA",
      icon: Brain,
      description: "Descubrimientos inteligentes",
      size: "1.8 MB",
      defaultChecked: true,
    },
    {
      id: "forecasts",
      name: "Pronósticos Predictivos",
      icon: Zap,
      description: "Proyecciones y predicciones",
      size: "3.1 MB",
      defaultChecked: true,
    },
    {
      id: "patterns",
      name: "Patrones Detectados",
      icon: Sparkles,
      description: "Patrones y correlaciones",
      size: "2.7 MB",
      defaultChecked: true,
    },
    {
      id: "health",
      name: "Salud Financiera",
      icon: Shield,
      description: "Métrica de salud completa",
      size: "0.9 MB",
      defaultChecked: true,
    },
    {
      id: "categories",
      name: "Análisis por Categoría",
      icon: PieChart,
      description: "Desglose detallado",
      size: "4.2 MB",
      defaultChecked: false,
    },
    {
      id: "benchmarks",
      name: "Comparativas",
      icon: Users,
      description: "Comparación con referencias",
      size: "1.5 MB",
      defaultChecked: false,
    },
    {
      id: "alerts",
      name: "Alertas Predictivas",
      icon: AlertTriangle,
      description: "Sistema de alertas",
      size: "0.7 MB",
      defaultChecked: false,
    },
    {
      id: "raw",
      name: "Datos Crudos",
      icon: TableIcon,
      description: "Datos sin procesar",
      size: "12.4 MB",
      defaultChecked: false,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const calculateEstimatedSize = () => {
    let baseSize = 2.5; // MB base
    if (includeCharts) baseSize += 3.2;
    if (includeInsights) baseSize += 1.8;
    if (includeForecasts) baseSize += 2.4;
    if (includePatterns) baseSize += 2.1;
    if (includeHealthScore) baseSize += 0.9;
    if (includeRawData) baseSize += 8.5;

    // Ajustar por compresión
    const compressedSize = baseSize * (compressionLevel / 100);
    return compressedSize.toFixed(1);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);

    // Simular generación de reporte
    setTimeout(() => {
      const report = {
        id: Date.now(),
        name: `Reporte Analítica ${
          reportType === "executive"
            ? "Ejecutivo"
            : reportType === "detailed"
            ? "Detallado"
            : reportType === "technical"
            ? "Técnico"
            : "Personalizado"
        } - ${new Date().toLocaleDateString("es-ES")}`,
        type: reportType,
        format: selectedFormat,
        date: new Date().toISOString().split("T")[0],
        size: `${calculateEstimatedSize()} MB`,
        pages: Math.round(Math.random() * 40) + 10,
        status: "completed",
        included: {
          charts: includeCharts,
          insights: includeInsights,
          forecasts: includeForecasts,
          patterns: includePatterns,
          healthScore: includeHealthScore,
          rawData: includeRawData,
        },
        stats: {
          totalInsights: insights?.length || 0,
          totalForecasts: forecasts?.length || 0,
          patternsDetected: patterns?.length || 0,
          healthScore: healthScore?.score || 0,
          dataPoints: Math.round(Math.random() * 50000) + 10000,
        },
        security: {
          anonymized: anonymizeData,
          watermark: watermark,
          compression: compressionLevel,
        },
      };

      setGeneratedReport(report);
      setExportHistory([report, ...exportHistory.slice(0, 9)]);
      setIsGenerating(false);

      // Generar link de compartir
      const randomId = Math.random().toString(36).substring(7);
      setShareLink(`https://analytics.finanzas.com/share/${randomId}`);
    }, 3000);
  };

  const handleDownload = () => {
    if (generatedReport) {
      alert(`Descargando reporte: ${generatedReport.name}`);
      // En una implementación real, aquí se descargaría el archivo
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

  const handleScheduleReport = () => {
    alert("Funcionalidad de programación activada");
  };

  return (
    <div className="space-y-6">
      {/* Header y navegación */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-text-100 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-100/20 to-accent-100/20 border border-primary-100/30">
                  <DownloadCloud className="h-6 w-6 text-primary-200" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span>Exportación de Análisis</span>
                    <Badge className="bg-gradient-to-r from-primary-100 to-accent-100 text-white">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Inteligente
                    </Badge>
                  </div>
                  <CardDescription className="text-text-200 mt-1">
                    Exporta análisis completos, insights de IA y datos crudos en
                    múltiples formatos
                  </CardDescription>
                </div>
              </CardTitle>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 mr-2" />
                Vista Impresión
              </Button>
              <Button
                variant="outline"
                className="border-accent-100/30 text-accent-100 hover:bg-accent-100/10"
                onClick={() =>
                  setShareLink(
                    `https://analytics.finanzas.com/share/${Date.now()}`
                  )
                }
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Tabs de exportación */}
          <div className="mt-6">
            <Tabs value={activeExportTab} onValueChange={setActiveExportTab}>
              <TabsList className="grid grid-cols-4 bg-bg-300/30 border border-bg-300/50 p-1 rounded-xl">
                <TabsTrigger
                  value="configure"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-accent-100/20 data-[state=active]:text-text-100 rounded-lg"
                >
                  <Settings className="h-3 w-3 mr-2" />
                  Configurar
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-accent-100/20 data-[state=active]:text-text-100 rounded-lg"
                >
                  <Eye className="h-3 w-3 mr-2" />
                  Vista Previa
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-accent-100/20 data-[state=active]:text-text-100 rounded-lg"
                >
                  <Clock className="h-3 w-3 mr-2" />
                  Historial
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-accent-100/20 data-[state=active]:text-text-100 rounded-lg"
                >
                  <Calendar className="h-3 w-3 mr-2" />
                  Programar
                </TabsTrigger>
              </TabsList>

              {/* Contenido de las tabs */}
              <TabsContent value="configure" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Configuración principal */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Tipo de reporte */}
                    <div>
                      <Label className="text-text-100 mb-3 block">
                        Tipo de Reporte
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {reportTypes.map((type) => {
                          const Icon = type.icon;
                          const isSelected = reportType === type.id;
                          return (
                            <button
                              key={type.id}
                              onClick={() => setReportType(type.id as any)}
                              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                isSelected
                                  ? `${type.bgColor} border-primary-100/50`
                                  : "border-bg-300/50 bg-bg-300/20 hover:border-primary-200/30"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`p-2 rounded-lg ${type.bgColor}`}
                                >
                                  <Icon className={`h-5 w-5 ${type.color}`} />
                                </div>
                                <div>
                                  <div className="font-medium text-text-100">
                                    {type.name}
                                  </div>
                                  <div className="text-xs text-text-200 mt-1">
                                    {type.description}
                                  </div>
                                  {isSelected && (
                                    <div className="mt-2 space-y-1">
                                      {type.content.map((item, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-center gap-1"
                                        >
                                          <Check className="h-3 w-3 text-primary-200" />
                                          <span className="text-xs text-text-200">
                                            {item}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Formato de exportación */}
                    <div>
                      <Label className="text-text-100 mb-3 block">
                        Formato de Exportación
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {exportOptions.map((option) => {
                          const Icon = option.icon;
                          const isSelected = selectedFormat === option.id;
                          return (
                            <button
                              key={option.id}
                              onClick={() =>
                                setSelectedFormat(option.id as any)
                              }
                              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                isSelected
                                  ? `${option.bgColor} border-primary-100/50`
                                  : "border-bg-300/50 bg-bg-300/20 hover:border-primary-200/30"
                              }`}
                            >
                              <div className="flex flex-col items-center text-center gap-2">
                                <div
                                  className={`p-3 rounded-lg ${option.bgColor}`}
                                >
                                  <Icon className={`h-6 w-6 ${option.color}`} />
                                </div>
                                <div>
                                  <div className="font-medium text-text-100">
                                    {option.name}
                                  </div>
                                  <div className="text-xs text-text-200 mt-1">
                                    {option.description}
                                  </div>
                                </div>
                                {isSelected && (
                                  <Badge className="bg-primary-100/20 text-primary-200">
                                    Seleccionado
                                  </Badge>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Componentes a incluir */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-text-100">
                          Componentes a Incluir
                        </Label>
                        <span className="text-sm text-text-200">
                          Tamaño estimado: {calculateEstimatedSize()} MB
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {exportableComponents.map((component) => (
                          <div
                            key={component.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary-100/20">
                                <component.icon className="h-4 w-4 text-primary-200" />
                              </div>
                              <div>
                                <div className="font-medium text-text-100">
                                  {component.name}
                                </div>
                                <div className="text-xs text-text-200">
                                  {component.description}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className="bg-bg-300/30 text-text-200 text-xs">
                                {component.size}
                              </Badge>
                              <Switch
                                checked={component.defaultChecked}
                                className="data-[state=checked]:bg-primary-100"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Configuración avanzada */}
                  <div className="space-y-6">
                    {/* Rango de fechas */}
                    <div>
                      <Label className="text-text-100 mb-3 block">
                        Rango de Fechas
                      </Label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                          <SelectValue />
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

                    {/* Configuración de seguridad */}
                    <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary-200" />
                          Configuración de Seguridad
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-primary-200" />
                            <span className="text-sm text-text-200">
                              Anonimizar datos
                            </span>
                          </div>
                          <Switch
                            checked={anonymizeData}
                            onCheckedChange={setAnonymizeData}
                            className="data-[state=checked]:bg-primary-100"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-text-200">
                              Incluir marca de agua
                            </span>
                          </div>
                          <Switch
                            checked={watermark}
                            onCheckedChange={setWatermark}
                            className="data-[state=checked]:bg-blue-500"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Configuración de compresión */}
                    <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-text-100 text-sm flex items-center gap-2">
                          <Download className="h-4 w-4 text-amber-400" />
                          Optimización de Archivo
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text-200">
                              Nivel de compresión
                            </span>
                            <span className="text-sm font-medium text-text-100">
                              {compressionLevel}%
                            </span>
                          </div>
                          <Slider
                            value={[compressionLevel]}
                            onValueChange={([value]) =>
                              setCompressionLevel(value)
                            }
                            max={100}
                            min={10}
                            step={5}
                            className="w-full"
                          />
                          <div className="flex items-center justify-between text-xs text-text-200">
                            <span>Máxima calidad</span>
                            <span>Tamaño mínimo</span>
                          </div>
                        </div>
                        <div className="text-xs text-text-200">
                          <div className="flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            Mayor compresión = archivo más pequeño pero menor
                            calidad de imágenes
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Botón de generación */}
                    <Button
                      onClick={handleGenerateReport}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
                    >
                      {isGenerating ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                          Generando reporte avanzado...
                        </>
                      ) : (
                        <>
                          <DownloadCloud className="h-5 w-5 mr-2" />
                          Generar Reporte Avanzado
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Vista previa */}
              <TabsContent value="preview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                    <CardHeader>
                      <CardTitle className="text-text-100">
                        Vista Previa del Reporte
                      </CardTitle>
                      <CardDescription className="text-text-200">
                        Así se verá tu reporte generado
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-bg-300/50 rounded-xl p-8 text-center">
                          <FileText className="h-16 w-16 text-text-200/50 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold text-text-100 mb-2">
                            Vista previa de{" "}
                            {reportTypes.find((r) => r.id === reportType)?.name}
                          </h4>
                          <p className="text-text-200 mb-4">
                            El reporte incluirá{" "}
                            {
                              exportableComponents.filter(
                                (c) => c.defaultChecked
                              ).length
                            }{" "}
                            componentes en formato{" "}
                            {selectedFormat.toUpperCase()}
                          </p>
                          <div className="inline-flex items-center gap-2 p-3 rounded-lg bg-primary-100/10 border border-primary-100/20">
                            <FileText className="h-4 w-4 text-primary-200" />
                            <span className="text-sm text-primary-200">
                              Tamaño estimado: {calculateEstimatedSize()} MB
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                    <CardHeader>
                      <CardTitle className="text-text-100">
                        Resumen de Configuración
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-text-200">
                              Tipo de reporte:
                            </span>
                            <Badge className="bg-primary-100/20 text-primary-200">
                              {
                                reportTypes.find((r) => r.id === reportType)
                                  ?.name
                              }
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-text-200">Formato:</span>
                            <Badge
                              className={
                                selectedFormat === "pdf"
                                  ? "bg-red-500/20 text-red-400"
                                  : selectedFormat === "excel"
                                  ? "bg-green-500/20 text-green-400"
                                  : selectedFormat === "csv"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-purple-500/20 text-purple-400"
                              }
                            >
                              {selectedFormat.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-text-200">
                              Componentes incluidos:
                            </span>
                            <span className="text-sm font-medium text-text-100">
                              {
                                exportableComponents.filter(
                                  (c) => c.defaultChecked
                                ).length
                              }
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-text-200">
                              Rango temporal:
                            </span>
                            <span className="text-sm text-text-100">
                              {
                                dateOptions.find((d) => d.value === dateRange)
                                  ?.label
                              }
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-text-200">Seguridad:</span>
                            <div className="flex gap-1">
                              {anonymizeData && (
                                <Badge className="bg-primary-100/20 text-primary-200 text-xs">
                                  Anonimizado
                                </Badge>
                              )}
                              {watermark && (
                                <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                                  Marca agua
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <Separator className="bg-bg-300/30" />

                        <div>
                          <h4 className="font-medium text-text-100 mb-2">
                            Acciones disponibles:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
                              onClick={handlePrint}
                            >
                              <Printer className="h-4 w-4 mr-2" />
                              Imprimir
                            </Button>
                            <Button
                              variant="outline"
                              className="border-accent-100/30 text-accent-100 hover:bg-accent-100/10"
                              onClick={() =>
                                setShareLink(
                                  `https://analytics.finanzas.com/share/${Date.now()}`
                                )
                              }
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Compartir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Historial */}
              <TabsContent value="history" className="mt-6">
                <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                  <CardHeader>
                    <CardTitle className="text-text-100">
                      Historial de Exportaciones
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Tus reportes generados anteriormente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {exportHistory.map((report) => (
                        <div
                          key={report.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-100/30 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-lg ${
                                report.format === "PDF"
                                  ? "bg-red-500/20"
                                  : report.format === "Excel"
                                  ? "bg-green-500/20"
                                  : report.format === "JSON"
                                  ? "bg-purple-500/20"
                                  : "bg-blue-500/20"
                              }`}
                            >
                              <FileText
                                className={`h-5 w-5 ${
                                  report.format === "PDF"
                                    ? "text-red-400"
                                    : report.format === "Excel"
                                    ? "text-green-400"
                                    : report.format === "JSON"
                                    ? "text-purple-400"
                                    : "text-blue-400"
                                }`}
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-text-100">
                                  {report.name}
                                </h4>
                                <Badge
                                  className={
                                    report.type === "executive"
                                      ? "bg-primary-100/20 text-primary-200"
                                      : report.type === "detailed"
                                      ? "bg-accent-100/20 text-accent-100"
                                      : "bg-amber-500/20 text-amber-400"
                                  }
                                >
                                  {report.type === "executive"
                                    ? "Ejecutivo"
                                    : report.type === "detailed"
                                    ? "Detallado"
                                    : "Técnico"}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-text-200">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(report.date)}
                                </div>
                                <div className="h-3 w-px bg-bg-300/50"></div>
                                <span>{report.format}</span>
                                <div className="h-3 w-px bg-bg-300/50"></div>
                                <span>{report.size}</span>
                                {report.pages && (
                                  <>
                                    <div className="h-3 w-px bg-bg-300/50"></div>
                                    <span>{report.pages} páginas</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4 md:mt-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-text-200 hover:text-primary-200"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-text-200 hover:text-accent-100"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-text-200 hover:text-red-400"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Programación */}
              <TabsContent value="schedule" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                    <CardHeader>
                      <CardTitle className="text-text-100">
                        Reportes Programados
                      </CardTitle>
                      <CardDescription className="text-text-200">
                        Configura reportes automáticos periódicos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary-200" />
                              <span className="font-medium text-text-100">
                                Reporte Mensual Ejecutivo
                              </span>
                            </div>
                            <Switch
                              className="data-[state=checked]:bg-primary-100"
                              defaultChecked
                            />
                          </div>
                          <p className="text-sm text-text-200 mb-2">
                            Enviado automáticamente el día 5 de cada mes
                          </p>
                          <div className="flex items-center gap-2 text-xs text-text-200">
                            <span>Próximo: 5 de Junio</span>
                            <div className="h-3 w-px bg-bg-300/50"></div>
                            <span>Formato: PDF</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-br from-accent-100/10 to-accent-100/5 border border-accent-100/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-accent-100" />
                              <span className="font-medium text-text-100">
                                Reporte Semanal de Insights
                              </span>
                            </div>
                            <Switch className="data-[state=checked]:bg-accent-100" />
                          </div>
                          <p className="text-sm text-text-200 mb-2">
                            Cada lunes con los insights de la semana anterior
                          </p>
                          <div className="flex items-center gap-2 text-xs text-text-200">
                            <span>Próximo: 27 de Mayo</span>
                            <div className="h-3 w-px bg-bg-300/50"></div>
                            <span>Formato: Excel</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-amber-400" />
                              <span className="font-medium text-text-100">
                                Reporte Trimestral Completo
                              </span>
                            </div>
                            <Switch
                              className="data-[state=checked]:bg-amber-500"
                              defaultChecked
                            />
                          </div>
                          <p className="text-sm text-text-200 mb-2">
                            Análisis completo cada trimestre con comparativas
                          </p>
                          <div className="flex items-center gap-2 text-xs text-text-200">
                            <span>Próximo: 1 de Julio</span>
                            <div className="h-3 w-px bg-bg-300/50"></div>
                            <span>Formato: PDF + Excel</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                    <CardHeader>
                      <CardTitle className="text-text-100">
                        Nuevo Reporte Programado
                      </CardTitle>
                      <CardDescription className="text-text-200">
                        Configura un nuevo reporte automático
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-text-100 mb-2 block">
                            Frecuencia
                          </Label>
                          <Select defaultValue="monthly">
                            <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                              <SelectValue placeholder="Selecciona frecuencia" />
                            </SelectTrigger>
                            <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                              <SelectItem value="daily">Diario</SelectItem>
                              <SelectItem value="weekly">Semanal</SelectItem>
                              <SelectItem value="monthly">Mensual</SelectItem>
                              <SelectItem value="quarterly">
                                Trimestral
                              </SelectItem>
                              <SelectItem value="yearly">Anual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-text-100 mb-2 block">
                            Tipo de Reporte
                          </Label>
                          <Select defaultValue="executive">
                            <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                              <SelectValue placeholder="Selecciona tipo" />
                            </SelectTrigger>
                            <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                              <SelectItem value="executive">
                                Ejecutivo
                              </SelectItem>
                              <SelectItem value="detailed">
                                Detallado
                              </SelectItem>
                              <SelectItem value="technical">Técnico</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-text-100 mb-2 block">
                            Formato
                          </Label>
                          <Select defaultValue="pdf">
                            <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                              <SelectValue placeholder="Selecciona formato" />
                            </SelectTrigger>
                            <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="csv">CSV</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-bg-300/20 border border-bg-300/30">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-text-200">
                              Enviar por correo
                            </span>
                          </div>
                          <Switch
                            className="data-[state=checked]:bg-blue-500"
                            defaultChecked
                          />
                        </div>

                        <Button
                          onClick={handleScheduleReport}
                          className="w-full bg-gradient-to-r from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 text-white"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Programar Reporte
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardHeader>
      </Card>

      {/* Reporte generado */}
      {generatedReport && (
        <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-accent-100/5 backdrop-blur-md border border-primary-100/20 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/20 to-accent-100/10">
                  <FileText className="h-6 w-6 text-primary-200" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-100 mb-1">
                    {generatedReport.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-text-200">
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
                    {generatedReport.pages && (
                      <>
                        <div className="h-3 w-px bg-bg-300/50"></div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {generatedReport.pages} páginas
                        </div>
                      </>
                    )}
                    <div className="h-3 w-px bg-bg-300/50"></div>
                    <Badge className="bg-primary-100/20 text-primary-200">
                      <Check className="h-3 w-3 mr-1" />
                      Generado
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Reporte
                </Button>
                <Button
                  variant="outline"
                  className="border-primary-100/50 text-primary-200 hover:text-primary-100 hover:border-primary-100/50"
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

      {/* Compartir y colaboración */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-gradient-to-br from-bg-300/20 to-bg-300/10 backdrop-blur-md border border-bg-300/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <Share2 className="h-5 w-5 text-accent-100" />
              Compartir Análisis
            </CardTitle>
            <CardDescription className="text-text-200">
              Comparte tus análisis con asesores, familiares o equipo
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
                    <div className="flex items-center gap-1 mb-1">
                      <Shield className="h-3 w-3 text-primary-200" />
                      Este enlace es seguro y expirará en 30 días
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-blue-400" />
                      Solo muestra información autorizada para compartir
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  <Share2 className="h-12 w-12 text-text-200/50 mx-auto mb-4" />
                  <h4 className="font-semibold text-text-100 mb-2">
                    Genera un enlace para compartir
                  </h4>
                  <p className="text-text-200 mb-4">
                    Crea un enlace seguro y controlado para compartir tu
                    análisis financiero
                  </p>
                  <Button
                    onClick={() =>
                      setShareLink(
                        `https://analytics.finanzas.com/share/${Date.now()}`
                      )
                    }
                    className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Generar Enlace Seguro
                  </Button>
                </div>
              )}

              <Separator className="bg-bg-300/50" />

              <div className="space-y-2">
                <h4 className="font-medium text-text-100">
                  Destinatarios comunes:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200 justify-start"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Asesor Financiero
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200 justify-start"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Pareja/Familia
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200 justify-start"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Contador
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200 justify-start"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Redes Profesionales
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-bg-300/20 to-bg-300/10 backdrop-blur-md border border-bg-300/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-400" />
              Configuración Avanzada
            </CardTitle>
            <CardDescription className="text-text-200">
              Opciones avanzadas de exportación y automatización
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-text-100">
                      Auto-exportación
                    </span>
                  </div>
                  <Switch className="data-[state=checked]:bg-blue-500" />
                </div>
                <p className="text-sm text-text-200 mb-2">
                  Exportar automáticamente cuando se generen nuevos insights
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FolderOutput className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-text-100">
                      Sincronización en la nube
                    </span>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-purple-500"
                    defaultChecked
                  />
                </div>
                <p className="text-sm text-text-200 mb-2">
                  Guardar copias automáticas en Google Drive / Dropbox
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-amber-400" />
                    <span className="font-medium text-text-100">
                      Insights automatizados
                    </span>
                  </div>
                  <Switch
                    className="data-[state=checked]:bg-amber-500"
                    defaultChecked
                  />
                </div>
                <p className="text-sm text-text-200 mb-2">
                  Incluir análisis de IA generado automáticamente
                </p>
              </div>

              <Separator className="bg-bg-300/50" />

              <div className="space-y-2">
                <h4 className="font-medium text-text-100">
                  Destinos de exportación:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200 justify-start"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Google Drive
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200 justify-start"
                  >
                    <Cloud className="h-4 w-4 mr-2" />
                    Dropbox
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200 justify-start"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    OneDrive
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200 justify-start"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Automático
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vista previa de datos */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-text-100">Vista Previa de Datos</CardTitle>
          <CardDescription className="text-text-200">
            Así se verán tus datos en el reporte exportado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-bg-300/40 overflow-hidden">
            <Table>
              <TableHeader className="bg-bg-300/20">
                <TableRow>
                  <TableHead className="text-text-100">Métrica</TableHead>
                  <TableHead className="text-text-100">Valor Actual</TableHead>
                  <TableHead className="text-text-100">Tendencia</TableHead>
                  <TableHead className="text-text-100">Comparativa</TableHead>
                  <TableHead className="text-text-100">Incluido en</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-bg-300/10">
                  <TableCell className="font-medium text-text-100">
                    Ingresos Mensuales
                  </TableCell>
                  <TableCell className="text-text-100">$4,200</TableCell>
                  <TableCell>
                    <Badge className="bg-primary-100/20 text-primary-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-200">
                    Sobre promedio
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-primary-100/20 text-primary-200">
                      Ejecutivo
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-bg-300/10">
                  <TableCell className="font-medium text-text-100">
                    Tasa de Ahorro
                  </TableCell>
                  <TableCell className="text-text-100">20.2%</TableCell>
                  <TableCell>
                    <Badge className="bg-primary-100/20 text-primary-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5.8%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-200">
                    Promedio similar
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-primary-100/20 text-primary-200">
                      Ejecutivo
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-bg-300/10">
                  <TableCell className="font-medium text-text-100">
                    Salud Financiera
                  </TableCell>
                  <TableCell className="text-text-100">78/100</TableCell>
                  <TableCell>
                    <Badge className="bg-primary-100/20 text-primary-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-200">Bueno</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge className="bg-primary-100/20 text-primary-200">
                        Ejecutivo
                      </Badge>
                      <Badge className="bg-accent-100/20 text-accent-100">
                        Detallado
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-bg-300/10">
                  <TableCell className="font-medium text-text-100">
                    Insights de IA
                  </TableCell>
                  <TableCell className="text-text-100">12 activos</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Nuevo
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-200">
                    Alta confianza
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-accent-100/20 text-accent-100">
                      Detallado
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-bg-300/10">
                  <TableCell className="font-medium text-text-100">
                    Patrones Detectados
                  </TableCell>
                  <TableCell className="text-text-100">8 patrones</TableCell>
                  <TableCell>
                    <Badge className="bg-purple-500/20 text-purple-400">
                      <Brain className="h-3 w-3 mr-1" />
                      Analizando
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-200">Único</TableCell>
                  <TableCell>
                    <Badge className="bg-accent-100/20 text-accent-100">
                      Detallado
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Datos Completos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsExport;
