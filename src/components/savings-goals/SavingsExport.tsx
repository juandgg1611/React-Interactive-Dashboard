// src/savings-goals/SavingsExport.tsx
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

interface SavingsExportProps {
  goals: any[];
  summary: any;
}

const SavingsExport: React.FC<SavingsExportProps> = ({ goals, summary }) => {
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "excel" | "csv">(
    "pdf"
  );
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [includeInsights, setIncludeInsights] = useState(true);
  const [dateRange, setDateRange] = useState("all");
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      name: "Reporte completo",
      format: "PDF",
      date: "2024-05-15",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Metas activas",
      format: "Excel",
      date: "2024-04-30",
      size: "1.1 MB",
    },
    {
      id: 3,
      name: "Progreso trimestral",
      format: "PDF",
      date: "2024-04-01",
      size: "3.2 MB",
    },
    {
      id: 4,
      name: "Resumen ejecutivo",
      format: "PDF",
      date: "2024-03-15",
      size: "1.8 MB",
    },
  ]);
  const [shareLink, setShareLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const exportOptions = [
    {
      id: "pdf",
      name: "PDF Document",
      description: "Formato profesional con gráficos y diseño",
      icon: FileText,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      id: "excel",
      name: "Excel Spreadsheet",
      description: "Datos crudos para análisis avanzado",
      icon: FileSpreadsheet,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      id: "csv",
      name: "CSV File",
      description: "Formato simple para importar en otros sistemas",
      icon: FileSpreadsheet,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ];

  const chartOptions = [
    { id: "progress", name: "Gráfico de progreso", icon: TrendingUp },
    { id: "distribution", name: "Distribución por categoría", icon: PieChart },
    { id: "timeline", name: "Timeline de metas", icon: Calendar },
    {
      id: "comparison",
      name: "Comparativa manual vs automático",
      icon: BarChart3,
    },
  ];

  const dateOptions = [
    { value: "all", label: "Todo el historial" },
    { value: "current-year", label: "Año actual" },
    { value: "last-3-months", label: "Últimos 3 meses" },
    { value: "last-month", label: "Último mes" },
    { value: "custom", label: "Personalizado" },
  ];

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

  const handleGenerateReport = () => {
    setIsGenerating(true);

    // Simular generación de reporte
    setTimeout(() => {
      const report = {
        id: Date.now(),
        name: `Reporte de Metas - ${new Date().toLocaleDateString("es-ES")}`,
        format: selectedFormat,
        date: new Date().toISOString().split("T")[0],
        size:
          selectedFormat === "pdf"
            ? "2.5 MB"
            : selectedFormat === "excel"
            ? "1.2 MB"
            : "0.8 MB",
        included: {
          charts: includeCharts,
          details: includeDetails,
          insights: includeInsights,
        },
        stats: {
          totalGoals: goals.length,
          totalSaved: goals.reduce((sum, goal) => sum + goal.currentAmount, 0),
          activeGoals: goals.filter((g) => g.status === "in-progress").length,
          completedGoals: goals.filter((g) => g.status === "completed").length,
        },
      };

      setGeneratedReport(report);
      setExportHistory([report, ...exportHistory]);
      setIsGenerating(false);

      // Generar link de compartir
      const randomId = Math.random().toString(36).substring(7);
      setShareLink(`https://app.finanzas.com/share/report/${randomId}`);
    }, 2000);
  };

  const handleDownload = () => {
    if (generatedReport) {
      alert(
        `Descargando reporte en formato ${generatedReport.format.toUpperCase()}`
      );
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

  return (
    <div className="space-y-6">
      {/* Panel principal de exportación */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuración de exportación */}
        <Card className="lg:col-span-2 border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary-200" />
              Configurar Exportación
            </CardTitle>
            <CardDescription className="text-text-200">
              Personaliza tu reporte antes de generar
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
                        <BarChart3 className="h-4 w-4 text-primary-200" />
                      </div>
                      <div>
                        <div className="font-medium text-text-100">
                          Gráficos y visualizaciones
                        </div>
                        <div className="text-sm text-text-200">
                          Incluye gráficos de progreso y distribución
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
                        <FileText className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-text-100">
                          Detalles completos
                        </div>
                        <div className="text-sm text-text-200">
                          Incluye todas las transacciones y aportes
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
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-text-100">
                          Insights de IA
                        </div>
                        <div className="text-sm text-text-200">
                          Incluye análisis y recomendaciones inteligentes
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={includeInsights}
                      onCheckedChange={setIncludeInsights}
                      className="data-[state=checked]:bg-primary-100"
                    />
                  </div>
                </div>
              </div>

              {/* Rango de fechas */}
              <div>
                <Label className="text-text-100 mb-3 block">
                  Rango de Fechas
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
                    Generar Reporte Personalizado
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
              Resumen del reporte configurado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Estadísticas del reporte */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-200">Metas incluidas:</span>
                  <span className="font-medium text-text-100">
                    {goals.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-200">Total ahorrado:</span>
                  <span className="font-medium text-green-400">
                    {formatCurrency(
                      goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-200">Metas activas:</span>
                  <span className="font-medium text-blue-400">
                    {goals.filter((g) => g.status === "in-progress").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-200">Metas completadas:</span>
                  <span className="font-medium text-green-400">
                    {goals.filter((g) => g.status === "completed").length}
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
                      `https://app.finanzas.com/share/report/${Date.now()}`
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
                  <FileText className="h-6 w-6 text-green-400" />
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
            Tus reportes generados anteriormente
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
                    <FileText
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
              Compartir Progreso
            </CardTitle>
            <CardDescription className="text-text-200">
              Comparte tu progreso con familiares, asesores o redes sociales
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
                      className="-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
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
                    Crea un enlace seguro para compartir tu progreso con quien
                    quieras
                  </p>
                  <Button
                    onClick={() =>
                      setShareLink(
                        `https://app.finanzas.com/share/report/${Date.now()}`
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
                    <FileText className="h-4 w-4 mr-2" />
                    Asesor Financiero
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
              <FilePieChart className="h-5 w-5 text-primary-200" />
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
                  Enviado automáticamente el día 5 de cada mes
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-text-100">
                      Reporte por Meta
                    </span>
                  </div>
                  <Switch className="data-[state=checked]:bg-blue-500" />
                </div>
                <p className="text-sm text-text-200">
                  Cuando una meta alcanza 50%, 75% y 100%
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

      {/* Tabla de datos exportables */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-text-100">Datos Exportables</CardTitle>
          <CardDescription className="text-text-200">
            Vista previa de los datos que se incluirán en el reporte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-bg-300/40 overflow-hidden">
            <Table>
              <TableHeader className="bg-bg-300/20">
                <TableRow>
                  <TableHead className="text-text-100">Meta</TableHead>
                  <TableHead className="text-text-100">Categoría</TableHead>
                  <TableHead className="text-text-100">
                    Monto Objetivo
                  </TableHead>
                  <TableHead className="text-text-100">Ahorrado</TableHead>
                  <TableHead className="text-text-100">Progreso</TableHead>
                  <TableHead className="text-text-100">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goals.slice(0, 5).map((goal) => (
                  <TableRow key={goal.id} className="hover:bg-bg-300/10">
                    <TableCell className="font-medium text-text-100">
                      {goal.name}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-bg-300/30 text-text-200">
                        {goal.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-text-100">
                      {formatCurrency(goal.targetAmount)}
                    </TableCell>
                    <TableCell className="text-green-400">
                      {formatCurrency(goal.currentAmount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={goal.progress} className="h-2 w-20" />
                        <span className="text-text-200 text-sm">
                          {goal.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          goal.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : goal.status === "in-progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : goal.status === "paused"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }
                      >
                        {goal.status === "completed"
                          ? "Completado"
                          : goal.status === "in-progress"
                          ? "En progreso"
                          : goal.status === "paused"
                          ? "Pausado"
                          : "Atrasado"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Tabla Completa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavingsExport;
