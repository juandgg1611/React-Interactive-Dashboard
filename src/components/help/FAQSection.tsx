import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  HelpCircle,
  Search,
  ChevronRight,
  ChevronDown,
  Users,
  Clock,
  Star,
  Brain,
  Award,
  Download,
  Sparkles,
  Shield,
  Settings,
  Zap,
  MessageSquare,
  CreditCard,
  TrendingUp,
  Target,
  BarChart3,
  Home,
} from "lucide-react";
import { Separator } from "../ui/separator";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: any;
  helpfulCount: number;
  lastUpdated: string;
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  relatedModules: string[];
}

interface FAQSectionProps {
  selectedModule?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ selectedModule = "all" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Datos de FAQ
  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "¿Cómo funciona la IA en la sección de Analítica?",
      answer:
        "Nuestra IA utiliza algoritmos de aprendizaje automático (Prophet y LSTM) para analizar tus patrones de gasto histórico. Genera pronósticos personalizados con hasta 92% de precisión, detecta anomalías en tus transacciones y ofrece recomendaciones inteligentes basadas en tu comportamiento financiero único.",
      category: "analytics",
      icon: Brain,
      helpfulCount: 245,
      lastUpdated: "2024-01-15",
      difficulty: "Intermedio",
      relatedModules: ["analytics", "dashboard"],
    },
    {
      id: 2,
      question: "¿Mis datos financieros están seguros y protegidos?",
      answer:
        "Absolutamente. Utilizamos encriptación de extremo a extremo (AES-256) para todos tus datos. No compartimos información con terceros y cumplimos con las normativas GDPR y CCPA. Tu información bancaria nunca se almacena en nuestros servidores - utilizamos conexiones seguras de solo lectura a través de API encriptadas.",
      category: "security",
      icon: Shield,
      helpfulCount: 189,
      lastUpdated: "2024-01-10",
      difficulty: "Fácil",
      relatedModules: ["settings", "dashboard"],
    },
    {
      id: 3,
      question: "¿Puedo exportar mis datos para usar en otras aplicaciones?",
      answer:
        "Sí, puedes exportar tus datos en múltiples formatos: CSV para hojas de cálculo, Excel para análisis avanzado, PDF para reportes formales, y JSON para integraciones técnicas. Además, ofrecemos sincronización automática con Google Sheets y la posibilidad de programar exportaciones recurrentes.",
      category: "export",
      icon: Download,
      helpfulCount: 156,
      lastUpdated: "2024-01-08",
      difficulty: "Fácil",
      relatedModules: ["settings", "transactions"],
    },
    {
      id: 4,
      question: "¿Cómo se categorizan automáticamente mis transacciones?",
      answer:
        "Usamos un sistema de IA que analiza descripciones, montos, fechas y patrones recurrentes. El sistema aprende de tus categorizaciones manuales y se vuelve más preciso con el tiempo. Puedes entrenar la IA marcando transacciones mal categorizadas, y el sistema aplicará ese aprendizaje a futuras transacciones similares.",
      category: "transactions",
      icon: CreditCard,
      helpfulCount: 198,
      lastUpdated: "2024-01-12",
      difficulty: "Intermedio",
      relatedModules: ["transactions", "budgets"],
    },
    {
      id: 5,
      question:
        "¿Qué diferencia a los presupuestos inteligentes de los normales?",
      answer:
        "Nuestros presupuestos inteligentes utilizan IA para: 1) Ajustarse automáticamente según tus ingresos variables, 2) Predecir gastos estacionales, 3) Sugerir límites realistas basados en tu historial, 4) Alertar sobre desviaciones antes de que ocurran, y 5) Recomendar ajustes basados en tus metas de ahorro.",
      category: "budgets",
      icon: TrendingUp,
      helpfulCount: 167,
      lastUpdated: "2024-01-05",
      difficulty: "Intermedio",
      relatedModules: ["budgets", "goals"],
    },
    {
      id: 6,
      question: "¿Cómo funciona el sistema de metas de ahorro con IA?",
      answer:
        "La IA analiza tu capacidad de ahorro, ingresos recurrentes y gastos variables para sugerir metas alcanzables. Luego, crea un plan personalizado que incluye: aportes automáticos, ajustes dinámicos según tu desempeño, alertas de progreso y sugerencias para acelerar el logro de tus objetivos.",
      category: "goals",
      icon: Target,
      helpfulCount: 134,
      lastUpdated: "2024-01-03",
      difficulty: "Intermedio",
      relatedModules: ["goals", "analytics"],
    },
    {
      id: 7,
      question: "¿Puedo personalizar completamente mi Dashboard?",
      answer:
        "Totalmente. Puedes: 1) Arrastrar y soltar widgets, 2) Elegir entre 15 métricas diferentes, 3) Crear vistas personalizadas por categoría, 4) Programar actualizaciones automáticas, 5) Configurar alertas visuales, y 6) Guardar múltiples layouts para diferentes necesidades.",
      category: "dashboard",
      icon: Home,
      helpfulCount: 178,
      lastUpdated: "2024-01-07",
      difficulty: "Fácil",
      relatedModules: ["dashboard", "settings"],
    },
    {
      id: 8,
      question: "¿Qué tipo de alertas predictivas ofrece el sistema?",
      answer:
        "Ofrecemos alertas inteligentes que predicen: 1) Sobregiros 7 días antes, 2) Excesos de presupuesto por categoría, 3) Oportunidades de ahorro, 4) Patrones de gasto riesgosos, 5) Cumplimiento de metas, y 6) Anomalías en transacciones. Todas las alertas incluyen recomendaciones accionables.",
      category: "alerts",
      icon: Bell,
      helpfulCount: 145,
      lastUpdated: "2024-01-06",
      difficulty: "Intermedio",
      relatedModules: ["dashboard", "budgets", "transactions"],
    },
  ];

  // Categorías de FAQ
  const categories = [
    {
      id: "all",
      name: "Todas las Preguntas",
      icon: HelpCircle,
      count: faqData.length,
      color: "#61bc84",
    },
    {
      id: "analytics",
      name: "IA & Analítica",
      icon: Brain,
      count: 2,
      color: "#2E8B57",
    },
    {
      id: "security",
      name: "Seguridad",
      icon: Shield,
      count: 1,
      color: "#8FBC8F",
    },
    {
      id: "transactions",
      name: "Transacciones",
      icon: CreditCard,
      count: 2,
      color: "#345e37",
    },
    {
      id: "budgets",
      name: "Presupuestos",
      icon: TrendingUp,
      count: 1,
      color: "#61bc84",
    },
    { id: "goals", name: "Metas", icon: Target, count: 1, color: "#c6ffe6" },
    {
      id: "dashboard",
      name: "Dashboard",
      icon: Home,
      count: 1,
      color: "#e0e0e0",
    },
  ];

  // Módulos para filtro
  const modules = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "transactions", name: "Transacciones", icon: CreditCard },
    { id: "budgets", name: "Presupuestos", icon: TrendingUp },
    { id: "goals", name: "Metas", icon: Target },
    { id: "analytics", name: "Analítica", icon: BarChart3 },
    { id: "settings", name: "Configuración", icon: Settings },
  ];

  // Filtrar FAQs
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesModule =
      selectedModule === "all" || faq.relatedModules.includes(selectedModule);

    return matchesSearch && matchesCategory && matchesModule;
  });

  const handleFAQToggle = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleHelpfulClick = (id: number) => {
    // Aquí iría la lógica para incrementar el contador
    console.log(`Marcado como útil: ${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Encabezado de FAQ */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/30 to-primary-200/20 border border-primary-200/30">
                <HelpCircle className="h-7 w-7 text-primary-200" />
              </div>
              <div>
                <CardTitle className="text-text-100 text-2xl">
                  Preguntas Frecuentes
                </CardTitle>
                <CardDescription className="text-text-200">
                  Respuestas detalladas a las dudas más comunes de nuestros
                  usuarios
                </CardDescription>
              </div>
            </div>

            <div className="relative min-w-[280px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-200/60" />
              <Input
                placeholder="Buscar en FAQ..."
                className="pl-10 bg-bg-300/40 border-bg-300/60 focus:border-primary-200 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Categorías de FAQ */}
      <div>
        <h3 className="text-lg font-semibold text-text-100 mb-4">
          Explorar por categoría
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left ${
                  activeCategory === category.id
                    ? "bg-gradient-to-br from-primary-100/20 to-primary-200/10 border-primary-200/40 shadow-lg shadow-primary-200/10"
                    : "bg-gradient-to-br from-bg-300/10 to-bg-300/5 border-bg-300/40 hover:border-primary-200/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: `${category.color}15`,
                      border: `1px solid ${category.color}30`,
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: category.color }}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-text-100">
                      {category.name}
                    </div>
                    <div className="text-xs text-text-200/70">
                      {category.count} preguntas
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-200">
          Mostrando{" "}
          <span className="font-semibold text-text-100">
            {filteredFAQs.length}
          </span>{" "}
          de{" "}
          <span className="font-semibold text-text-100">{faqData.length}</span>{" "}
          preguntas
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-primary-100/20 to-primary-200/20 text-primary-200 border-primary-200/30">
            <Sparkles className="h-3 w-3 mr-1.5" />
            IA Asistente Activa
          </Badge>
        </div>
      </div>

      {/* Lista de FAQs */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => {
          const Icon = faq.icon;
          const isExpanded = expandedFAQ === faq.id;

          return (
            <Card
              key={faq.id}
              className={`border-0 backdrop-blur-md border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "bg-gradient-to-br from-primary-100/10 to-primary-200/5 border-primary-200/30"
                  : "bg-gradient-to-br from-bg-300/10 to-bg-300/5 border-bg-300/40 hover:border-primary-200/30"
              }`}
            >
              <button
                className="w-full text-left"
                onClick={() => handleFAQToggle(faq.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 rounded-lg bg-primary-100/20 flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary-200" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                          <h4
                            className={`font-semibold text-lg ${
                              isExpanded ? "text-primary-200" : "text-text-100"
                            }`}
                          >
                            {faq.question}
                          </h4>

                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`border ${
                                faq.difficulty === "Fácil"
                                  ? "border-green-500/30 text-green-400"
                                  : faq.difficulty === "Intermedio"
                                  ? "border-yellow-500/30 text-yellow-400"
                                  : "border-red-500/30 text-red-400"
                              }`}
                            >
                              {faq.difficulty}
                            </Badge>

                            <ChevronDown
                              className={`h-4 w-4 text-text-200/60 transition-transform duration-300 ${
                                isExpanded ? "rotate-180 text-primary-200" : ""
                              }`}
                            />
                          </div>
                        </div>

                        {/* Información adicional */}
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="flex items-center gap-1 text-xs text-text-200/70">
                            <Users className="h-3 w-3" />
                            <span>{faq.helpfulCount} útiles</span>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-text-200/70">
                            <Clock className="h-3 w-3" />
                            <span>
                              Actualizada: {formatDate(faq.lastUpdated)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-text-200/70">
                              Relacionado:
                            </span>
                            <div className="flex items-center gap-1">
                              {faq.relatedModules
                                .slice(0, 2)
                                .map((moduleId) => {
                                  const module = modules.find(
                                    (m) => m.id === moduleId
                                  );
                                  const ModuleIcon = module?.icon || HelpCircle;
                                  return (
                                    <Badge
                                      key={moduleId}
                                      variant="outline"
                                      className="border-bg-300/40 text-text-200/60 text-xs px-2 py-0.5"
                                    >
                                      <ModuleIcon className="h-2.5 w-2.5 mr-1" />
                                      {module?.name}
                                    </Badge>
                                  );
                                })}
                              {faq.relatedModules.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="border-bg-300/40 text-text-200/60 text-xs"
                                >
                                  +{faq.relatedModules.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Respuesta expandida */}
                  {isExpanded && (
                    <div className="mt-6 pl-12 animate-in fade-in slide-in-from-top-5 duration-300">
                      <Separator className="mb-6 bg-bg-300/40" />

                      <div className="space-y-4">
                        <div className="prose prose-invert max-w-none">
                          <p className="text-text-200/80 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <div className="flex items-center gap-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-primary-200/40 text-primary-200 hover:bg-primary-100/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleHelpfulClick(faq.id);
                              }}
                            >
                              <Star className="h-3.5 w-3.5 mr-1.5" />
                              ¿Te resultó útil?
                            </Button>

                            <div className="text-xs text-text-200/60">
                              Esta respuesta te ayudó a {faq.helpfulCount}{" "}
                              personas
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-text-200 hover:text-primary-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Lógica para compartir
                              }}
                            >
                              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                              Compartir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </button>
            </Card>
          );
        })}
      </div>

      {/* No hay resultados */}
      {filteredFAQs.length === 0 && (
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-200/30 flex items-center justify-center">
              <Search className="h-8 w-8 text-primary-200" />
            </div>
            <h3 className="text-xl font-semibold text-text-100 mb-2">
              No encontramos preguntas que coincidan
            </h3>
            <p className="text-text-200/70 mb-6 max-w-md mx-auto">
              Intenta con otros términos de búsqueda o explora nuestras
              categorías principales
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => setSearchQuery("")}
                variant="outline"
                className="border-primary-200/40 text-primary-200 hover:bg-primary-100/10"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Ver todas las preguntas
              </Button>
              <Button
                onClick={() => setActiveCategory("analytics")}
                className="bg-gradient-to-r from-primary-100 to-primary-200 text-white hover:from-primary-200 hover:to-primary-300"
              >
                <Brain className="h-4 w-4 mr-2" />
                Preguntas sobre IA
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer de FAQ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-br from-bg-300/10 to-bg-300/5 border border-bg-300/40">
        <div>
          <h4 className="font-semibold text-text-100 mb-1">
            ¿No encontraste tu respuesta?
          </h4>
          <p className="text-sm text-text-200/70">
            Nuestro equipo de soporte está listo para ayudarte personalmente
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-primary-200/40 text-primary-200 hover:bg-primary-100/10"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Contactar soporte
          </Button>
          <Button className="bg-gradient-to-r from-primary-100 to-primary-200 text-white hover:from-primary-200 hover:to-primary-300">
            <Zap className="h-4 w-4 mr-2" />
            Chat con IA
          </Button>
        </div>
      </div>
    </div>
  );
};

// Icono Bell (no está en las importaciones iniciales)
const Bell = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export default FAQSection;
