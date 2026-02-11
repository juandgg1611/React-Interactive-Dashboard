// src/components/features/FeatureDetail.tsx
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Brain,
  LineChart,
  Target,
  Shield,
  Zap,
  DollarSign,
  Sparkles,
  Cpu,
  Database,
  Users,
  Bell,
  TrendingUp,
  Lock,
  Cloud,
  Smartphone,
  BookOpen,
  FileText,
  Code2,
  Award,
  Clock,
  Server,
  ShieldCheck,
  BarChart3,
  Cpu as CpuIcon,
  Lock as LockIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { AnimatePresence, motion } from "framer-motion";

const FeatureDetail: React.FC = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(0);

  const features = [
    {
      id: 1,
      title: "Clasificador Inteligente de Transacciones",
      description:
        "Sistema de NLP que categoriza automáticamente gastos e ingresos con 95%+ de precisión",
      icon: Brain,
      color: "from-primary-100/20 via-primary-200/30 to-primary-300/20",
      gradient: "bg-gradient-to-br from-primary-100 to-primary-300",
      iconBg: "bg-gradient-to-br from-primary-100 to-primary-200",
      tagline: "IA que entiende tus finanzas",
      details: {
        algorithm: "BERT Fine-tuned + Random Forest",
        accuracy: "95.2%",
        trainingData: "10,000+ transacciones etiquetadas",
        responseTime: "< 200ms",
        papers: [
          "Attention Is All You Need (Vaswani et al., 2017)",
          "BERT: Pre-training of Deep Bidirectional Transformers",
        ],
        benefits: [
          "Automatización completa de categorización",
          "Aprendizaje continuo de nuevos patrones",
          "Soporte multilingüe (ES/EN)",
        ],
      },
      metrics: [
        {
          label: "Precisión",
          value: 95.2,
          unit: "%",
          color: "from-primary-100 to-primary-200",
          description: "Tasa de clasificación correcta",
        },
        {
          label: "Recall",
          value: 94.7,
          unit: "%",
          color: "from-primary-200 to-primary-300",
          description: "Capacidad de detección",
        },
        {
          label: "F1-Score",
          value: 94.9,
          unit: "",
          color: "from-accent-100 to-accent-200",
          description: "Balance precisión-recall",
        },
      ],
    },
    {
      id: 2,
      title: "Predicción de Series Temporales",
      description:
        "Modelo Prophet + LSTM para forecasting financiero con intervalos de confianza del 95%",
      icon: LineChart,
      color: "from-accent-100/20 via-primary-200/30 to-accent-200/20",
      gradient: "bg-gradient-to-br from-accent-100 to-accent-200",
      iconBg: "bg-gradient-to-br from-accent-100 to-primary-200",
      tagline: "Anticipa tus finanzas",
      details: {
        algorithm: "Facebook Prophet + LSTM Networks",
        accuracy: "91.8% (MAE)",
        trainingData: "24 meses de datos históricos",
        responseTime: "< 500ms",
        papers: [
          "Forecasting at Scale (Taylor & Letham, 2017)",
          "Long Short-Term Memory (Hochreiter & Schmidhuber, 1997)",
        ],
        benefits: [
          "Predicción a 3, 6 y 12 meses",
          "Intervalos de confianza dinámicos",
          "Detección automática de estacionalidad",
        ],
      },
      metrics: [
        {
          label: "MAE",
          value: 8.2,
          unit: "%",
          color: "from-primary-100 to-primary-200",
          description: "Error absoluto medio",
        },
        {
          label: "RMSE",
          value: 12.5,
          unit: "%",
          color: "from-primary-200 to-primary-300",
          description: "Error cuadrático medio",
        },
        {
          label: "R²",
          value: 0.92,
          unit: "",
          color: "from-accent-100 to-accent-200",
          description: "Varianza explicada",
        },
      ],
    },
    {
      id: 3,
      title: "Sistema de Nudges Conductuales",
      description:
        "Intervenciones basadas en Behavioral Economics para mejorar hábitos financieros con 85% de engagement",
      icon: Target,
      color: "from-primary-200/20 via-primary-300/30 to-accent-100/20",
      gradient: "bg-gradient-to-br from-primary-200 to-accent-100",
      iconBg: "bg-gradient-to-br from-primary-200 to-primary-300",
      tagline: "Psicología aplicada a finanzas",
      details: {
        algorithm: "Reinforcement Learning + A/B Testing",
        accuracy: "85% engagement rate",
        trainingData: "Estudios de psicología conductual",
        responseTime: "Tiempo real",
        papers: [
          "Nudge: Improving Decisions About Health (Thaler & Sunstein, 2008)",
          "Thinking, Fast and Slow (Kahneman, 2011)",
        ],
        benefits: [
          "Intervenciones personalizadas",
          "Testing A/B automático",
          "Adaptación continua al usuario",
        ],
      },
      metrics: [
        {
          label: "Engagement",
          value: 85,
          unit: "%",
          color: "from-primary-100 to-primary-200",
          description: "Tasa de participación",
        },
        {
          label: "Retención",
          value: 78,
          unit: "%",
          color: "from-primary-200 to-primary-300",
          description: "Usuarios activos mensuales",
        },
        {
          label: "Impacto",
          value: 32,
          unit: "%",
          color: "from-accent-100 to-accent-200",
          description: "Mejora en hábitos financieros",
        },
      ],
    },
    {
      id: 4,
      title: "Arquitectura de Microservicios",
      description:
        "Sistema escalable con contenedores Docker y orquestación Kubernetes - 99.9% uptime garantizado",
      icon: CpuIcon,
      color: "from-primary-300/20 via-accent-100/30 to-accent-200/20",
      gradient: "bg-gradient-to-br from-primary-300 to-accent-200",
      iconBg: "bg-gradient-to-br from-primary-300 to-accent-100",
      tagline: "Infraestructura de clase empresarial",
      details: {
        algorithm: "Microservices + Event-Driven Architecture",
        accuracy: "99.95% uptime",
        trainingData: "N/A",
        responseTime: "< 100ms promedio",
        papers: [
          "Microservices Patterns (Richardson, 2018)",
          "Building Microservices (Newman, 2015)",
        ],
        benefits: [
          "Escalado automático horizontal",
          "Despliegue continuo sin downtime",
          "Monitoreo en tiempo real",
        ],
      },
      metrics: [
        {
          label: "Uptime",
          value: 99.95,
          unit: "%",
          color: "from-primary-100 to-primary-200",
          description: "Disponibilidad mensual",
        },
        {
          label: "Latencia",
          value: 85,
          unit: "ms",
          color: "from-primary-200 to-primary-300",
          description: "P95 de tiempo de respuesta",
        },
        {
          label: "Escalabilidad",
          value: 5000,
          unit: "RPS",
          color: "from-accent-100 to-accent-200",
          description: "Peticiones por segundo",
        },
      ],
    },
    {
      id: 5,
      title: "Encriptación End-to-End",
      description:
        "Protección AES-256 + TLS 1.3 para datos financieros sensibles - Certificaciones de seguridad nivel bancario",
      icon: LockIcon,
      color: "from-accent-200/20 via-primary-100/30 to-primary-300/20",
      gradient: "bg-gradient-to-br from-accent-200 to-primary-100",
      iconBg: "bg-gradient-to-br from-accent-200 to-primary-300",
      tagline: "Seguridad bancaria para todos",
      details: {
        algorithm: "AES-256-GCM + RSA-4096 + TLS 1.3",
        accuracy: "N/A",
        trainingData: "N/A",
        responseTime: "< 50ms overhead",
        papers: [
          "Advanced Encryption Standard (Daemen & Rijmen, 2001)",
          "The TLS Protocol Version 1.3 (Rescorla, 2018)",
        ],
        benefits: [
          "Encriptación en reposo y tránsito",
          "Certificación SOC 2 Type II",
          "Auditorías de seguridad trimestrales",
        ],
      },
      metrics: [
        {
          label: "Encriptación",
          value: 256,
          unit: "bit",
          color: "from-primary-100 to-primary-200",
          description: "Fuerza criptográfica",
        },
        {
          label: "Certificaciones",
          value: 100,
          unit: "%",
          color: "from-primary-200 to-primary-300",
          description: "Estándares cumplidos",
        },
        {
          label: "Audits",
          value: 5,
          unit: "al año",
          color: "from-accent-100 to-accent-200",
          description: "Auditorías independientes",
        },
      ],
    },
  ];

  const toggleFeature = (id: number) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isExpanded = expandedFeature === feature.id;

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "rounded-2xl bg-gradient-to-br from-bg-200/20 via-bg-200/10 to-bg-300/10 backdrop-blur-xl",
                "border border-primary-300/10 transition-all duration-500 overflow-hidden",
                "hover:border-primary-300/30 hover:shadow-2xl hover:shadow-primary-300/10",
                isExpanded &&
                  "ring-2 ring-primary-300/30 shadow-2xl shadow-primary-300/10",
              )}
            >
              {/* Header - Clickable */}
              <div
                className="p-6 cursor-pointer hover:bg-gradient-to-r hover:from-primary-100/5 hover:via-primary-300/5 hover:to-primary-100/5 transition-all duration-300"
                onClick={() => toggleFeature(feature.id)}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "relative w-14 h-14 rounded-xl flex items-center justify-center shadow-2xl",
                        feature.iconBg,
                      )}
                    >
                      <Icon className="h-7 w-7 text-white" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h3 className="text-xl font-bold text-text-100 leading-tight">
                          {feature.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              "bg-gradient-to-r border-0 text-white shadow-lg",
                              feature.iconBg,
                            )}
                          >
                            {feature.tagline}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-primary-300/10 text-primary-300 border-primary-300/30"
                          >
                            Investigación Aplicada
                          </Badge>
                        </div>
                      </div>
                      <p className="text-text-200/80 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full hover:bg-primary-300/10 transition-all",
                        isExpanded && "bg-primary-300/10",
                      )}
                    >
                      <ChevronDown className="h-5 w-5 text-primary-300" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="border-t border-primary-300/10"
                  >
                    <div className="p-6 space-y-8">
                      {/* Detalles Técnicos y Métricas Grid */}
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Detalles Técnicos */}
                        <div className="lg:col-span-2">
                          <div className="p-6 rounded-xl bg-gradient-to-br from-bg-200/20 to-bg-300/10 border border-primary-300/10 space-y-6">
                            <h4 className="font-semibold text-text-100 text-lg flex items-center gap-3">
                              <Database className="h-5 w-5 text-primary-300" />
                              Detalles Técnicos
                            </h4>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="text-sm text-text-200/60 flex items-center gap-2">
                                    <CpuIcon className="h-3 w-3 text-primary-200" />
                                    Algoritmo
                                  </div>
                                  <code className="block text-primary-300 text-sm font-mono bg-primary-300/10 px-4 py-2 rounded-lg border border-primary-300/20">
                                    {feature.details.algorithm}
                                  </code>
                                </div>

                                <div className="space-y-2">
                                  <div className="text-sm text-text-200/60 flex items-center gap-2">
                                    <Award className="h-3 w-3 text-primary-200" />
                                    Precisión
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="text-2xl font-bold text-primary-300">
                                      {feature.details.accuracy}
                                    </div>
                                    <Badge className="bg-primary-300/20 text-primary-300">
                                      Validado experimentalmente
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="text-sm text-text-200/60 flex items-center gap-2">
                                    <Database className="h-3 w-3 text-primary-200" />
                                    Datos de Entrenamiento
                                  </div>
                                  <div className="text-text-100 font-medium">
                                    {feature.details.trainingData}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div className="text-sm text-text-200/60 flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-primary-200" />
                                    Rendimiento
                                  </div>
                                  <div className="text-text-100 font-medium">
                                    {feature.details.responseTime}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Beneficios */}
                            <div>
                              <h5 className="text-sm font-semibold text-text-100 mb-3">
                                Beneficios Clave
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {feature.details.benefits.map(
                                  (benefit, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="bg-primary-300/5 text-primary-300 border-primary-300/20"
                                    >
                                      <Sparkles className="h-3 w-3 mr-2 text-primary-300" />
                                      {benefit}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Métricas */}
                        <div>
                          <div className="p-6 rounded-xl bg-gradient-to-br from-bg-200/20 to-bg-300/10 border border-primary-300/10 h-full">
                            <h4 className="font-semibold text-text-100 text-lg flex items-center gap-3 mb-6">
                              <TrendingUp className="h-5 w-5 text-primary-300" />
                              Métricas de Rendimiento
                            </h4>
                            <div className="space-y-6">
                              {feature.metrics.map((metric, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="space-y-3"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="text-sm text-text-100 font-medium">
                                        {metric.label}
                                      </div>
                                      <div className="text-xs text-text-200/60">
                                        {metric.description}
                                      </div>
                                    </div>
                                    <div className="text-lg font-bold text-primary-300">
                                      {metric.value}
                                      <span className="text-sm text-text-200">
                                        {metric.unit}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="h-2 bg-bg-300/30 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{
                                        width: `${(metric.value / (metric.label === "Escalabilidad" ? 5000 : 100)) * 100}%`,
                                      }}
                                      transition={{
                                        duration: 1,
                                        delay: idx * 0.2,
                                      }}
                                      className={cn(
                                        "h-full rounded-full bg-gradient-to-r",
                                        metric.color,
                                      )}
                                    />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Papers de Referencia */}
                      <div className="p-6 rounded-xl bg-gradient-to-br from-bg-200/20 to-bg-300/10 border border-primary-300/10">
                        <h4 className="font-semibold text-text-100 text-lg flex items-center gap-3 mb-6">
                          <BookOpen className="h-5 w-5 text-primary-300" />
                          Referencias Académicas
                        </h4>
                        <div className="space-y-4">
                          {feature.details.papers.map((paper, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="group flex items-start p-4 rounded-lg bg-bg-300/5 hover:bg-primary-300/5 transition-all duration-300 cursor-pointer"
                            >
                              <div className="mr-4 mt-1">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-300/20 flex items-center justify-center">
                                  <FileText className="h-4 w-4 text-primary-300" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm text-text-100 font-medium group-hover:text-primary-300 transition-colors">
                                  {paper}
                                </div>
                                <div className="text-xs text-text-200/60 mt-1">
                                  Publicación académica revisada por pares
                                </div>
                              </div>
                              <ChevronUp className="h-4 w-4 text-text-200/40 transform rotate-90 ml-2 group-hover:text-primary-300 transition-colors" />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-primary-300/10"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary-300 animate-pulse" />
                            <span className="text-sm text-text-200/60">
                              Disponible en producción
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary-200 animate-pulse" />
                            <span className="text-sm text-text-200/60">
                              Escalado automático
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary-300/30 text-primary-300 hover:bg-primary-300/10 hover:border-primary-300/50 transition-all group"
                          >
                            <FileText className="h-3 w-3 mr-2 text-primary-300 group-hover:scale-110 transition-transform" />
                            Documentación Técnica
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 hover:shadow-lg hover:shadow-primary-200/30 transition-all group"
                          >
                            <Code2 className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                            Ver Implementación
                            <Sparkles className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 pt-8 border-t border-primary-300/10"
      >
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-text-100">
            Nuestro Compromiso con la Excelencia
          </h3>
          <p className="text-text-200/70 max-w-3xl mx-auto">
            Combinamos investigación académica de vanguardia con ingeniería de
            producción para crear soluciones financieras que realmente marcan la
            diferencia.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-300/5 border border-primary-300/10">
              <div className="text-2xl font-bold text-primary-300">95.2%</div>
              <div className="text-xs text-text-200/60">Precisión Promedio</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-300/5 border border-primary-300/10">
              <div className="text-2xl font-bold text-primary-300">99.95%</div>
              <div className="text-xs text-text-200/60">Uptime SLA</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-300/5 border border-primary-300/10">
              <div className="text-2xl font-bold text-primary-300">200ms</div>
              <div className="text-xs text-text-200/60">Latencia P95</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-300/5 border border-primary-300/10">
              <div className="text-2xl font-bold text-primary-300">5</div>
              <div className="text-xs text-text-200/60">Certificaciones</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureDetail;
