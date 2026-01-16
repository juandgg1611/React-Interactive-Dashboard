// src/savings-goals/GoalCreationWizard.tsx
import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Zap,
  Sparkles,
  Lightbulb,
  Home,
  Car,
  Plane,
  GraduationCap,
  Shield,
  Laptop,
  Heart,
  Coffee,
  ShoppingBag,
  Briefcase,
  Gift,
  Dumbbell,
  Camera,
  Music,
  BookOpen,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Progress } from "../ui/progress";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface GoalCreationWizardProps {
  onClose: () => void;
  onSubmit: (goalData: any) => void;
}

const GoalCreationWizard: React.FC<GoalCreationWizardProps> = ({
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState(1);
  const [goalData, setGoalData] = useState({
    name: "",
    description: "",
    targetAmount: 5000,
    deadline: "",
    category: "other",
    icon: "target",
    priority: "medium",
    color: "#2E8B57",
    automaticRules: [] as string[],
    monthlyContribution: 0,
  });

  const categories = [
    { id: "travel", name: "Viajes", icon: Plane, color: "#61bc84" },
    {
      id: "education",
      name: "Educación",
      icon: GraduationCap,
      color: "#8FBC8F",
    },
    { id: "vehicle", name: "Vehículo", icon: Car, color: "#2E8B57" },
    { id: "home", name: "Hogar", icon: Home, color: "#c6ffe6" },
    { id: "emergency", name: "Emergencia", icon: Shield, color: "#345e37" },
    { id: "investment", name: "Inversión", icon: TrendingUp, color: "#2E8B57" },
    { id: "electronics", name: "Electrónica", icon: Laptop, color: "#61bc84" },
    { id: "health", name: "Salud", icon: Heart, color: "#8FBC8F" },
    { id: "hobbies", name: "Hobbies", icon: Camera, color: "#c6ffe6" },
    { id: "other", name: "Otro", icon: Target, color: "#345e37" },
  ];

  const icons = [
    { id: "target", name: "Objetivo", icon: Target, color: "#2E8B57" },
    { id: "home", name: "Casa", icon: Home, color: "#61bc84" },
    { id: "car", name: "Auto", icon: Car, color: "#8FBC8F" },
    { id: "plane", name: "Viaje", icon: Plane, color: "#c6ffe6" },
    {
      id: "graduation",
      name: "Educación",
      icon: GraduationCap,
      color: "#345e37",
    },
    { id: "shield", name: "Seguridad", icon: Shield, color: "#2E8B57" },
    { id: "laptop", name: "Tecnología", icon: Laptop, color: "#61bc84" },
    { id: "heart", name: "Salud", icon: Heart, color: "#8FBC8F" },
    { id: "coffee", name: "Estilo de Vida", icon: Coffee, color: "#c6ffe6" },
    { id: "shopping", name: "Compras", icon: ShoppingBag, color: "#345e37" },
    { id: "briefcase", name: "Carrera", icon: Briefcase, color: "#2E8B57" },
    { id: "gift", name: "Regalo", icon: Gift, color: "#61bc84" },
    { id: "dumbbell", name: "Fitness", icon: Dumbbell, color: "#8FBC8F" },
    { id: "camera", name: "Fotografía", icon: Camera, color: "#c6ffe6" },
    { id: "music", name: "Música", icon: Music, color: "#345e37" },
    { id: "book", name: "Aprendizaje", icon: BookOpen, color: "#2E8B57" },
  ];

  const automaticRules = [
    {
      id: "round-up",
      name: "Redondeo de transacciones",
      description: "Cada compra redondea al dólar superior",
      icon: Zap,
    },
    {
      id: "fixed-amount",
      name: "Aporte mensual fijo",
      description: "Transferencia automática cada mes",
      icon: DollarSign,
    },
    {
      id: "percentage-income",
      name: "Porcentaje de ingresos",
      description: "5% de cada ingreso va a esta meta",
      icon: TrendingUp,
    },
    {
      id: "excess-budget",
      name: "Excedente presupuestario",
      description: "Lo que sobra del presupuesto mensual",
      icon: Sparkles,
    },
  ];

  const quickAmounts = [500, 1000, 2000, 5000, 10000, 20000];

  // Calcular meses restantes
  const calculateMonthsRemaining = () => {
    if (!goalData.deadline) return 0;
    const deadline = new Date(goalData.deadline);
    const now = new Date();
    const months =
      (deadline.getFullYear() - now.getFullYear()) * 12 +
      (deadline.getMonth() - now.getMonth());
    return Math.max(1, months);
  };

  // Calcular aporte mensual recomendado
  const calculateMonthlyContribution = () => {
    const months = calculateMonthsRemaining();
    if (months === 0) return goalData.targetAmount;
    return Math.ceil(goalData.targetAmount / months);
  };

  // Actualizar aporte mensual cuando cambian otros datos
  React.useEffect(() => {
    if (goalData.targetAmount > 0 && goalData.deadline) {
      const monthly = calculateMonthlyContribution();
      setGoalData((prev) => ({ ...prev, monthlyContribution: monthly }));
    }
  }, [goalData.targetAmount, goalData.deadline]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSubmit({
        ...goalData,
        id: Date.now(),
        currentAmount: 0,
        progress: 0,
        status: "not-started",
        startDate: new Date().toISOString().split("T")[0],
        insights: [],
        history: [],
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleRuleToggle = (ruleId: string) => {
    setGoalData((prev) => ({
      ...prev,
      automaticRules: prev.automaticRules.includes(ruleId)
        ? prev.automaticRules.filter((id) => id !== ruleId)
        : [...prev.automaticRules, ruleId],
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const monthsRemaining = calculateMonthsRemaining();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-bg-100 to-bg-200 border border-bg-300/40 shadow-2xl">
        <DialogHeader className="border-b border-bg-300/40 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-text-100 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                <Target className="h-6 w-6 text-primary-200" />
              </div>
              <span>
                {step === 1 && "Definir Meta"}
                {step === 2 && "Personalizar"}
                {step === 3 && "Estrategia de Ahorro"}
                {step === 4 && "Confirmación"}
              </span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-text-200 hover:text-text-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-text-200 mb-2">
              <span>Paso {step} de 4</span>
              <span>{step * 25}% completado</span>
            </div>
            <Progress value={step * 25} className="h-2 bg-bg-300/50" />
          </div>
        </DialogHeader>

        <div className="py-6">
          {/* PASO 1: Información básica */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary-200" />
                  ¿Qué quieres lograr?
                </h3>
                <p className="text-text-200 mb-6">
                  Comienza dando un nombre y estableciendo el objetivo de tu
                  meta de ahorro
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-text-100">
                      Nombre de la meta
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ej: Viaje a la playa, Auto nuevo, Fondo emergencia"
                      value={goalData.name}
                      onChange={(e) =>
                        setGoalData({ ...goalData, name: e.target.value })
                      }
                      className="bg-bg-300/30 border-bg-300/50 text-text-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-text-100">
                      Descripción (opcional)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe tu objetivo, por qué es importante para ti..."
                      value={goalData.description}
                      onChange={(e) =>
                        setGoalData({
                          ...goalData,
                          description: e.target.value,
                        })
                      }
                      className="min-h-[100px] bg-bg-300/30 border-bg-300/50 text-text-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-text-100">
                      Categoría
                    </Label>
                    <Select
                      value={goalData.category}
                      onValueChange={(value) =>
                        setGoalData({ ...goalData, category: value })
                      }
                    >
                      <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300 max-h-60">
                        {categories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <SelectItem
                              key={cat.id}
                              value={cat.id}
                              className="flex items-center gap-2"
                            >
                              <Icon
                                className="h-4 w-4"
                                style={{ stroke: cat.color }}
                              />
                              {cat.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-text-100 flex items-center justify-between">
                        <span>Monto objetivo</span>
                        <span className="text-2xl font-bold text-primary-200">
                          {formatCurrency(goalData.targetAmount)}
                        </span>
                      </Label>
                      <Slider
                        value={[goalData.targetAmount]}
                        onValueChange={([value]) =>
                          setGoalData({ ...goalData, targetAmount: value })
                        }
                        min={100}
                        max={50000}
                        step={100}
                        className="w-full"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setGoalData({ ...goalData, targetAmount: amount })
                          }
                          className={`border-bg-300/50 ${
                            goalData.targetAmount === amount
                              ? "bg-primary-100/20 text-primary-200 border-primary-100/50"
                              : "text-text-200 hover:text-primary-200"
                          }`}
                        >
                          {formatCurrency(amount)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-text-100">Prioridad</Label>
                    <RadioGroup
                      value={goalData.priority}
                      onValueChange={(
                        value: "low" | "medium" | "high" | "critical"
                      ) => setGoalData({ ...goalData, priority: value })}
                      className="grid grid-cols-4 gap-2"
                    >
                      {[
                        {
                          value: "low",
                          label: "Baja",
                          color: "bg-green-500/20 text-green-400",
                        },
                        {
                          value: "medium",
                          label: "Media",
                          color: "bg-yellow-500/20 text-yellow-400",
                        },
                        {
                          value: "high",
                          label: "Alta",
                          color: "bg-orange-500/20 text-orange-400",
                        },
                        {
                          value: "critical",
                          label: "Crítica",
                          color: "bg-red-500/20 text-red-400",
                        },
                      ].map((priority) => (
                        <div key={priority.value}>
                          <RadioGroupItem
                            value={priority.value}
                            id={`priority-${priority.value}`}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={`priority-${priority.value}`}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                              goalData.priority === priority.value
                                ? `${priority.color} border-current`
                                : "border-bg-300/50 bg-bg-300/20 text-text-200 hover:border-primary-200/30"
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {priority.label}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: Personalización */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary-200" />
                  Personaliza tu meta
                </h3>
                <p className="text-text-200 mb-6">
                  Elige un ícono y fecha límite para hacer tu meta más visual
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-text-100">Ícono de la meta</Label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {icons.map((iconItem) => {
                        const Icon = iconItem.icon;
                        const isSelected = goalData.icon === iconItem.id;
                        return (
                          <button
                            key={iconItem.id}
                            type="button"
                            onClick={() =>
                              setGoalData({
                                ...goalData,
                                icon: iconItem.id,
                                color: iconItem.color,
                              })
                            }
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                              isSelected
                                ? "border-primary-100 bg-primary-100/20"
                                : "border-bg-300/50 bg-bg-300/20 hover:border-primary-200/30 hover:bg-primary-100/10"
                            }`}
                          >
                            <Icon
                              className="h-6 w-6 mb-2"
                              style={{
                                stroke: isSelected ? "#2E8B57" : iconItem.color,
                              }}
                            />
                            <span className="text-xs text-text-200 truncate w-full text-center">
                              {iconItem.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-text-100">Color personalizado</Label>
                    <div className="flex gap-2">
                      {[
                        "#2E8B57",
                        "#61bc84",
                        "#8FBC8F",
                        "#c6ffe6",
                        "#345e37",
                        "#4ECDC4",
                        "#FF6B6B",
                        "#FFD166",
                      ].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setGoalData({ ...goalData, color })}
                          className={`w-10 h-10 rounded-lg border-2 transition-transform ${
                            goalData.color === color
                              ? "border-white scale-110 shadow-lg"
                              : "border-bg-300/50 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-text-100 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary-200" />
                      Fecha límite
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal h-12 ${
                            !goalData.deadline
                              ? "text-text-200"
                              : "text-text-100"
                          } bg-bg-300/30 border-bg-300/50 hover:bg-bg-300/40`}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {goalData.deadline
                            ? format(new Date(goalData.deadline), "PPP")
                            : "Selecciona una fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-bg-200 border-bg-300">
                        <CalendarComponent
                          mode="single"
                          selected={
                            goalData.deadline
                              ? new Date(goalData.deadline)
                              : undefined
                          }
                          onSelect={(date) =>
                            setGoalData({
                              ...goalData,
                              deadline: date ? format(date, "yyyy-MM-dd") : "",
                            })
                          }
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="bg-bg-200 text-text-100"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Vista previa */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                    <h4 className="text-text-100 font-semibold mb-4 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary-200" />
                      Vista previa
                    </h4>
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${goalData.color}20` }}
                      >
                        {(() => {
                          const Icon =
                            icons.find((i) => i.id === goalData.icon)?.icon ||
                            Target;
                          return (
                            <Icon
                              className="h-6 w-6"
                              style={{ stroke: goalData.color }}
                            />
                          );
                        })()}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-text-100">
                          {goalData.name || "Nombre de la meta"}
                        </h5>
                        <p className="text-sm text-text-200">
                          {goalData.description || "Descripción de la meta"}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge className="bg-bg-300/30 text-text-200">
                            {categories.find((c) => c.id === goalData.category)
                              ?.name || "Categoría"}
                          </Badge>
                          {goalData.deadline && (
                            <div className="text-xs text-text-200 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {monthsRemaining}{" "}
                              {monthsRemaining === 1 ? "mes" : "meses"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-text-200 mb-1">
                        <span>Progreso</span>
                        <span>0%</span>
                      </div>
                      <div className="h-2 bg-bg-300/50 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: "0%",
                            background: `linear-gradient(90deg, ${goalData.color} 0%, ${goalData.color}80 100%)`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-text-200 mt-2">
                        <span>$0</span>
                        <span>{formatCurrency(goalData.targetAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASO 3: Estrategia de ahorro */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-200" />
                  Estrategia de Ahorro
                </h3>
                <p className="text-text-200 mb-6">
                  Configura reglas automáticas para alcanzar tu meta más rápido
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-text-100 font-semibold">
                      Reglas automáticas
                    </h4>
                    <div className="space-y-3">
                      {automaticRules.map((rule) => {
                        const Icon = rule.icon;
                        const isActive = goalData.automaticRules.includes(
                          rule.id
                        );
                        return (
                          <div
                            key={rule.id}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                              isActive
                                ? "border-primary-100 bg-primary-100/10"
                                : "border-bg-300/50 bg-bg-300/20 hover:border-primary-200/30"
                            }`}
                            onClick={() => handleRuleToggle(rule.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg ${
                                    isActive
                                      ? "bg-primary-100/20"
                                      : "bg-bg-300/30"
                                  }`}
                                >
                                  <Icon
                                    className={`h-4 w-4 ${
                                      isActive
                                        ? "text-primary-200"
                                        : "text-text-200"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-text-100">
                                    {rule.name}
                                  </div>
                                  <div className="text-sm text-text-200">
                                    {rule.description}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  isActive
                                    ? "bg-primary-100 border-primary-100"
                                    : "border-bg-300/70"
                                }`}
                              >
                                {isActive && (
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-100/20">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-primary-200 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-text-100 mb-1">
                          Sugerencia de IA
                        </h5>
                        <p className="text-sm text-text-200">
                          Basado en tus ingresos y gastos, te recomendamos
                          activar el
                          <span className="font-medium text-primary-200">
                            {" "}
                            redondeo de transacciones
                          </span>{" "}
                          y un aporte fijo mensual.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
                    <h4 className="text-text-100 font-semibold mb-4">
                      Resumen financiero
                    </h4>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-text-200">Monto objetivo</div>
                        <div className="text-lg font-bold text-text-100">
                          {formatCurrency(goalData.targetAmount)}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-text-200">Fecha límite</div>
                        <div className="text-text-100">
                          {goalData.deadline
                            ? format(new Date(goalData.deadline), "dd/MM/yyyy")
                            : "No definida"}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-text-200">Meses restantes</div>
                        <div className="text-text-100">{monthsRemaining}</div>
                      </div>

                      <div className="border-t border-bg-300/30 pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-text-200">
                            Aporte mensual recomendado
                          </div>
                          <div className="text-2xl font-bold text-primary-200">
                            {formatCurrency(calculateMonthlyContribution())}
                          </div>
                        </div>
                        <div className="text-xs text-text-200">
                          Para alcanzar tu meta en {monthsRemaining} meses
                        </div>
                      </div>

                      {goalData.automaticRules.length > 0 && (
                        <div className="border-t border-bg-300/30 pt-4">
                          <div className="text-text-200 mb-2">
                            Impacto estimado de las reglas:
                          </div>
                          <div className="space-y-2">
                            {goalData.automaticRules.includes("round-up") && (
                              <div className="flex justify-between text-sm">
                                <span className="text-text-200">Redondeo:</span>
                                <span className="text-green-400">
                                  +$45-85/mes
                                </span>
                              </div>
                            )}
                            {goalData.automaticRules.includes(
                              "excess-budget"
                            ) && (
                              <div className="flex justify-between text-sm">
                                <span className="text-text-200">
                                  Excedentes:
                                </span>
                                <span className="text-green-400">
                                  +$50-200/mes
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm font-semibold mt-2 pt-2 border-t border-bg-300/30">
                              <span className="text-text-100">
                                Total estimado:
                              </span>
                              <span className="text-primary-200">
                                +$95-285/mes
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-text-200 mb-2">
                      Con esta estrategia, alcanzarás tu meta en
                      aproximadamente:
                    </div>
                    <div className="text-2xl font-bold text-primary-200">
                      {monthsRemaining}{" "}
                      {monthsRemaining === 1 ? "mes" : "meses"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASO 4: Confirmación */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  ¡Listo para comenzar!
                </h3>
                <p className="text-text-200 mb-6">
                  Revisa los detalles de tu meta y confirma para comenzar a
                  ahorrar
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-100/20">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${goalData.color}20` }}
                      >
                        {(() => {
                          const Icon =
                            icons.find((i) => i.id === goalData.icon)?.icon ||
                            Target;
                          return (
                            <Icon
                              className="h-6 w-6"
                              style={{ stroke: goalData.color }}
                            />
                          );
                        })()}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-text-100">
                          {goalData.name || "Nueva Meta"}
                        </h4>
                        <p className="text-text-200">
                          {goalData.description || "Sin descripción"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-3 rounded-lg bg-bg-300/20">
                        <div className="text-sm text-text-200">
                          Monto objetivo
                        </div>
                        <div className="text-lg font-bold text-text-100">
                          {formatCurrency(goalData.targetAmount)}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-bg-300/20">
                        <div className="text-sm text-text-200">
                          Aporte mensual
                        </div>
                        <div className="text-lg font-bold text-primary-200">
                          {formatCurrency(goalData.monthlyContribution)}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-bg-300/20">
                        <div className="text-sm text-text-200">
                          Fecha límite
                        </div>
                        <div className="text-lg font-bold text-text-100">
                          {goalData.deadline
                            ? format(new Date(goalData.deadline), "dd/MM/yyyy")
                            : "No definida"}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-bg-300/20">
                        <div className="text-sm text-text-200">Duración</div>
                        <div className="text-lg font-bold text-text-100">
                          {monthsRemaining}{" "}
                          {monthsRemaining === 1 ? "mes" : "meses"}
                        </div>
                      </div>
                    </div>

                    {goalData.automaticRules.length > 0 && (
                      <div className="mb-6">
                        <h5 className="text-text-100 font-semibold mb-3">
                          Reglas activas:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {goalData.automaticRules.map((ruleId) => {
                            const rule = automaticRules.find(
                              (r) => r.id === ruleId
                            );
                            if (!rule) return null;
                            const Icon = rule.icon;
                            return (
                              <Badge
                                key={ruleId}
                                className="bg-primary-100/20 text-primary-200 border-primary-100/30"
                              >
                                <Icon className="h-3 w-3 mr-1" />
                                {rule.name}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                    <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Proyección optimista
                    </h5>
                    <p className="text-sm text-text-200">
                      Con las reglas automáticas activadas, podrías alcanzar tu
                      meta hasta
                      <span className="font-bold text-green-400">
                        {" "}
                        2 meses antes
                      </span>{" "}
                      de lo planeado.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                    <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Primeros pasos
                    </h5>
                    <ul className="text-sm text-text-200 space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Configurar transferencia automática
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Revisar progreso semanalmente
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Ajustar si cambian tus ingresos
                      </li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-text-200 mb-2">
                      Al confirmar, esta meta aparecerá en tu panel principal y
                      comenzarás a recibir actualizaciones.
                    </div>
                    <Button
                      onClick={handleNext}
                      className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Crear Meta de Ahorro
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navegación */}
        <div className="flex justify-between pt-6 border-t border-bg-300/40">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handleBack}
            className="border-bg-300/50 text-text-200 hover:text-text-100"
          >
            {step === 1 ? (
              "Cancelar"
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Atrás
              </>
            )}
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && !goalData.name) ||
              (step === 2 && !goalData.deadline)
            }
            className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white"
          >
            {step < 4 ? (
              <>
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              "Confirmar y Crear"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Componente auxiliar Eye (no está en lucide-react por defecto)
const Eye = ({ className }: { className?: string }) => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Componente auxiliar CheckCircle
const CheckCircle = ({ className }: { className?: string }) => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default GoalCreationWizard;
