// src/savings-goals/GoalCelebration.tsx
import React, { useState, useEffect } from "react";
import {
  Trophy,
  Sparkles,
  Target,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  Share2,
  Download,
  PlusCircle,
  ChevronRight,
  Zap,
  Gift,
  Heart,
  Star,
  Crown,
  CheckCircle,
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
import { Dialog, DialogContent } from "../ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface GoalCelebrationProps {
  goal: any;
  isOpen: boolean;
  onClose: () => void;
  onNextGoal?: () => void;
  onReinvest?: () => void;
  onShare?: () => void;
}

const GoalCelebration: React.FC<GoalCelebrationProps> = ({
  goal,
  isOpen,
  onClose,
  onNextGoal,
  onReinvest,
  onShare,
}) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [achievementBadges, setAchievementBadges] = useState([
    { id: 1, name: "6 Meses de Disciplina", icon: Calendar, color: "#2E8B57" },
    { id: 2, name: "3 Aportes Extras", icon: Zap, color: "#61bc84" },
    { id: 3, name: "0 Retiros", icon: Trophy, color: "#8FBC8F" },
    {
      id: 4,
      name: "Completado 1 Mes Antes",
      icon: TrendingUp,
      color: "#c6ffe6",
    },
  ]);
  const [selectedNextStep, setSelectedNextStep] = useState<string | null>(null);

  // Datos de ejemplo si no se proporciona meta
  const defaultGoal = {
    id: 1,
    name: "Computadora Nueva",
    targetAmount: 1500,
    currentAmount: 1500,
    startDate: "2023-12-01",
    deadline: "2024-05-01",
    actualCompletion: "2024-04-01",
    monthlyContribution: 250,
    totalContributions: 6,
    extraContributions: 3,
    category: "Tecnología",
    icon: "laptop",
    color: "#2E8B57",
  };

  const celebrationGoal = goal || defaultGoal;

  // Animación de confeti
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateTimeSaved = () => {
    const deadline = new Date(celebrationGoal.deadline);
    const actual = new Date(
      celebrationGoal.actualCompletion || celebrationGoal.deadline
    );
    const months =
      (deadline.getFullYear() - actual.getFullYear()) * 12 +
      (deadline.getMonth() - actual.getMonth());
    return Math.max(0, months);
  };

  const timeSaved = calculateTimeSaved();

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      navigator.clipboard.writeText(
        `¡Acabé de completar mi meta "${
          celebrationGoal.name
        }"! 🎉 Ahorré ${formatCurrency(celebrationGoal.targetAmount)} en ${
          celebrationGoal.totalContributions
        } meses. #MetasCumplidas #AhorroInteligente`
      );
      alert("¡Mensaje copiado para compartir!");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent">
        {/* Confetti overlay */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2"
                  style={{
                    background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    borderRadius: "50%",
                  }}
                  initial={{ y: -100, opacity: 1, scale: 0 }}
                  animate={{
                    y: window.innerHeight,
                    opacity: 0,
                    scale: [0, 1, 0.5],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <div className="relative overflow-hidden">
          {/* Fondo decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 via-primary-200/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Header de celebración */}
            <div className="p-8 text-center bg-gradient-to-b from-primary-100/30 to-transparent">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="inline-block mb-6"
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border-2 border-yellow-500/30">
                  <Trophy className="h-16 w-16 text-yellow-400" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-5xl font-bold text-text-100 mb-4"
              >
                ¡META ALCANZADA!
              </motion.h1>

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-block"
              >
                <Badge className="px-4 py-2 text-lg bg-gradient-to-r from-primary-100 to-primary-200 text-white border-0">
                  <Sparkles className="h-5 w-5 mr-2" />
                  {celebrationGoal.name}
                </Badge>
              </motion.div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna 1: Logros */}
                <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-text-100 flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-400" />
                      Logros Desbloqueados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievementBadges.map((badge) => {
                        const Icon = badge.icon;
                        return (
                          <motion.div
                            key={badge.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * badge.id }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/30"
                          >
                            <div
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `${badge.color}20` }}
                            >
                              <Icon
                                className="h-5 w-5"
                                style={{ stroke: badge.color }}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-text-100">
                                {badge.name}
                              </div>
                              <div className="text-xs text-text-200">
                                ¡Desbloqueado!
                              </div>
                            </div>
                            <Star className="h-4 w-4 text-yellow-400 ml-auto" />
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Columna 2: Estadísticas */}
                <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-text-100 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      Estadísticas del Logro
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                          <div className="text-sm text-text-200">
                            Monto Total
                          </div>
                          <div className="text-xl font-bold text-green-400">
                            {formatCurrency(celebrationGoal.targetAmount)}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                          <div className="text-sm text-text-200">
                            Tiempo Total
                          </div>
                          <div className="text-xl font-bold text-blue-400">
                            {celebrationGoal.totalContributions} meses
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-200">Aporte mensual:</span>
                          <span className="font-medium text-text-100">
                            {formatCurrency(
                              celebrationGoal.monthlyContribution
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-200">Aportes extra:</span>
                          <span className="font-medium text-text-100">
                            {celebrationGoal.extraContributions} aportes
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-200">
                            Tiempo ahorrado:
                          </span>
                          <span className="font-medium text-green-400">
                            {timeSaved} {timeSaved === 1 ? "mes" : "meses"}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-bg-300/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-text-200">
                            Disciplina promedio:
                          </div>
                          <div className="text-sm font-bold text-primary-200">
                            96%
                          </div>
                        </div>
                        <Progress value={96} className="h-2 bg-bg-300/50" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Columna 3: Recompensa */}
                <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-text-100 flex items-center gap-2">
                      <Gift className="h-5 w-5 text-purple-400" />
                      ¡Date un Gusto!
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Te lo has ganado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-purple-400 mb-2">
                        {formatCurrency(celebrationGoal.targetAmount * 0.03)}
                      </div>
                      <div className="text-sm text-text-200">
                        3% de tu meta para celebrar
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full border-purple-500/30 text-purple-400 hover:text-purple-300 hover:border-purple-400/50"
                        onClick={() => setSelectedNextStep("celebrate")}
                      >
                        <PartyPopper className="h-4 w-4 mr-2" />
                        Transferir a gastos
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-green-500/30 text-green-400 hover:text-green-300 hover:border-green-400/50"
                        onClick={() => setSelectedNextStep("reinvest")}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Reinvertir en otra meta
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-blue-500/30 text-blue-400 hover:text-blue-300 hover:border-blue-400/50"
                        onClick={() => setSelectedNextStep("save")}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Donar a caridad
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline visual de la meta */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-text-100">
                      Tu Viaje hacia el Éxito
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Desde el inicio hasta la culminación
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Línea de tiempo */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-100 via-primary-200 to-green-400"></div>

                      <div className="space-y-6 ml-12">
                        {[
                          {
                            date: formatDate(celebrationGoal.startDate),
                            title: "Inicio del Viaje",
                            description:
                              "Definiste tu meta y comenzaste a ahorrar",
                            icon: Target,
                            color: "#2E8B57",
                          },
                          {
                            date: `${Math.floor(
                              celebrationGoal.totalContributions / 2
                            )} meses después`,
                            title: "Mitad del Camino",
                            description:
                              "¡50% completado! Mantuviste la disciplina",
                            icon: CheckCircle,
                            color: "#61bc84",
                          },
                          {
                            date: `${celebrationGoal.extraContributions} aportes extra`,
                            title: "Esfuerzo Extra",
                            description:
                              "Aportes adicionales aceleraron tu meta",
                            icon: Zap,
                            color: "#8FBC8F",
                          },
                          {
                            date: formatDate(
                              celebrationGoal.actualCompletion ||
                                celebrationGoal.deadline
                            ),
                            title: "¡Meta Alcanzada!",
                            description: "Completaste tu objetivo con éxito",
                            icon: Trophy,
                            color: "#c6ffe6",
                          },
                        ].map((milestone, index) => {
                          const Icon = milestone.icon;
                          return (
                            <div key={index} className="relative">
                              <div className="absolute -left-12 top-1/2 -translate-y-1/2">
                                <div
                                  className="p-2 rounded-full border-2 border-white"
                                  style={{ backgroundColor: milestone.color }}
                                >
                                  <Icon className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-text-100">
                                  {milestone.title}
                                </div>
                                <div className="text-xs text-text-200">
                                  {milestone.date}
                                </div>
                                <div className="text-sm text-text-200 mt-1">
                                  {milestone.description}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Acciones principales */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    onClick={
                      onNextGoal || (() => console.log("Crear nueva meta"))
                    }
                    className="flex-1 bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white h-14 text-lg"
                  >
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Crear Nueva Meta
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 border-primary-100/30 text-primary-200 hover:bg-primary-100/10 h-14 text-lg"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Compartir Logro
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="border-bg-300/50 text-text-200 hover:text-text-100 h-14"
                  >
                    Volver al Panel
                  </Button>
                </div>
              </motion.div>

              {/* Mensaje de felicitación */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100/10 to-primary-200/10 border border-primary-100/20">
                  <Crown className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-text-200">
                    ¡Eres parte del{" "}
                    <span className="font-bold text-primary-200">
                      10% superior
                    </span>{" "}
                    de usuarios que completan sus metas!
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Componentes de iconos personalizados
const Award = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const PartyPopper = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5.8 11.3 2 22l10.7-3.79" />
    <path d="M4 3h.01" />
    <path d="M22 8h.01" />
    <path d="M15 2h.01" />
    <path d="M22 20h.01" />
    <path d="m11.3 5.8 2.2-2.2a2.4 2.4 0 0 1 3.4 0l3.2 3.2a2.4 2.4 0 0 1 0 3.4l-2.2 2.2" />
    <path d="m18 13-3.5-3.5" />
    <path d="M2 2l20 20" />
  </svg>
);

const Fireworks = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1z" />
    <path d="M18 11a1 1 0 0 0-1-1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1z" />
    <path d="m4.9 4.9.7.7a1 1 0 0 0 1.4-1.4l-.7-.7a1 1 0 0 0-1.4 1.4z" />
    <path d="m18.4 18.4.7.7a1 1 0 0 0 1.4-1.4l-.7-.7a1 1 0 0 0-1.4 1.4z" />
    <path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z" />
    <path d="m4 16 2 2" />
    <path d="m16 4 2 2" />
    <path d="m16 20 2-2" />
    <path d="m20 8-2 2" />
  </svg>
);

export default GoalCelebration;
