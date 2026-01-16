// src/savings-goals/AutoSavingsRules.tsx
import React, { useState } from "react";
import {
  Zap,
  Settings,
  Play,
  Pause,
  Edit,
  Trash2,
  MoreVertical,
  ChevronRight,
  DollarSign,
  Calendar,
  TrendingUp,
  RefreshCw,
  Shield,
  Target,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Progress } from "../ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Datos de ejemplo
const mockRules = [
  {
    id: 1,
    name: "Redondeo de Transacciones",
    type: "round-up",
    description: "Cada compra redondea al dólar superior",
    isActive: true,
    targetGoalId: 2,
    targetGoalName: "Viaje a Playa",
    amount: 0.25,
    lastExecution: "2024-05-15",
    totalSaved: 124.5,
    efficiency: 95,
    executions: 42,
    icon: RefreshCw,
    color: "#2E8B57",
    schedule: "En tiempo real",
    impact: "Alto",
  },
  {
    id: 2,
    name: "Aporte Mensual Automático",
    type: "fixed-amount",
    description: "Transferencia automática cada 15 del mes",
    isActive: true,
    targetGoalId: 1,
    targetGoalName: "Compra de Auto",
    amount: 833,
    lastExecution: "2024-06-01",
    totalSaved: 4165,
    efficiency: 100,
    executions: 5,
    icon: Calendar,
    color: "#61bc84",
    schedule: "Día 15 de cada mes",
    impact: "Muy Alto",
  },
  {
    id: 3,
    name: "5% de cada Ingreso",
    type: "percentage-income",
    description: "5% de cada ingreso va a metas específicas",
    isActive: true,
    targetGoalId: 3,
    targetGoalName: "Fondo de Emergencia",
    percentage: 5,
    lastExecution: "2024-05-30",
    totalSaved: 1250,
    efficiency: 88,
    executions: 8,
    icon: TrendingUp,
    color: "#8FBC8F",
    schedule: "Al recibir ingresos",
    impact: "Alto",
  },
  {
    id: 4,
    name: "Ahorro por Excedente",
    type: "excess-budget",
    description: "Lo que sobra del presupuesto mensual se ahorra",
    isActive: false,
    targetGoalId: 2,
    targetGoalName: "Viaje a Playa",
    lastExecution: "2024-04-30",
    totalSaved: 320,
    efficiency: 75,
    executions: 3,
    icon: Shield,
    color: "#c6ffe6",
    schedule: "Fin de cada mes",
    impact: "Medio",
  },
];

const AutoSavingsRules = () => {
  const [rules, setRules] = useState(mockRules);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

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

  const handleToggleRule = (ruleId: number) => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  const handleEditRule = (ruleId: number) => {
    console.log("Editar regla:", ruleId);
  };

  const handleDeleteRule = (ruleId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta regla?")) {
      setRules(rules.filter((rule) => rule.id !== ruleId));
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Muy Alto":
        return "bg-green-500/20 text-green-400";
      case "Alto":
        return "bg-blue-500/20 text-blue-400";
      case "Medio":
        return "bg-yellow-500/20 text-yellow-400";
      case "Bajo":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-bg-300/20 text-text-200";
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-400";
    if (efficiency >= 75) return "text-yellow-400";
    return "text-red-400";
  };

  const filteredRules = rules.filter((rule) => {
    if (filterType !== "all" && rule.type !== filterType) return false;
    if (filterStatus !== "all") {
      if (filterStatus === "active" && !rule.isActive) return false;
      if (filterStatus === "inactive" && rule.isActive) return false;
    }
    return true;
  });

  const totalSaved = rules.reduce((sum, rule) => sum + rule.totalSaved, 0);
  const activeRules = rules.filter((rule) => rule.isActive).length;

  return (
    <div className="space-y-6">
      {/* Estadísticas y filtros */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Estadísticas */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-100">
                  {activeRules}
                </div>
                <div className="text-xs text-text-200">Reglas activas</div>
              </div>
              <div className="h-8 w-px bg-bg-300/50"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-200">
                  {formatCurrency(totalSaved)}
                </div>
                <div className="text-xs text-text-200">Total ahorrado</div>
              </div>
              <div className="h-8 w-px bg-bg-300/50"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {Math.round(
                    rules.reduce((sum, rule) => sum + rule.efficiency, 0) /
                      rules.length
                  )}
                  %
                </div>
                <div className="text-xs text-text-200">Eficiencia promedio</div>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[140px] bg-bg-300/30 border-bg-300/50 text-text-100">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="round-up">Redondeo</SelectItem>
                  <SelectItem value="fixed-amount">Aporte fijo</SelectItem>
                  <SelectItem value="percentage-income">Porcentaje</SelectItem>
                  <SelectItem value="excess-budget">Excedente</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px] bg-bg-300/30 border-bg-300/50 text-text-100">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activas</SelectItem>
                  <SelectItem value="inactive">Inactivas</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
                onClick={() => {
                  setFilterType("all");
                  setFilterStatus("all");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de reglas */}
      <div className="space-y-4">
        {filteredRules.length > 0 ? (
          filteredRules.map((rule) => {
            const Icon = rule.icon;
            return (
              <Card
                key={rule.id}
                className={`border-0 backdrop-blur-md border shadow-xl transition-all duration-300 hover:shadow-2xl ${
                  rule.isActive
                    ? "bg-gradient-to-br from-bg-200/50 to-bg-300/30 border-bg-300/40"
                    : "bg-gradient-to-br from-bg-200/30 to-bg-300/20 border-bg-300/20 opacity-80"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Icono y estado */}
                    <div className="flex items-start gap-4 flex-shrink-0">
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${rule.color}20` }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ stroke: rule.color }}
                        />
                      </div>
                      <div className="lg:hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-text-100">
                            {rule.name}
                          </h3>
                          <Badge className={getImpactColor(rule.impact)}>
                            {rule.impact}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              rule.isActive
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {rule.isActive ? (
                              <>
                                <Play className="h-3 w-3 mr-1" />
                                Activa
                              </>
                            ) : (
                              <>
                                <Pause className="h-3 w-3 mr-1" />
                                Inactiva
                              </>
                            )}
                          </Badge>
                          <Badge className="bg-bg-300/30 text-text-200">
                            {rule.type === "round-up"
                              ? "Redondeo"
                              : rule.type === "fixed-amount"
                              ? "Aporte fijo"
                              : rule.type === "percentage-income"
                              ? "Porcentaje"
                              : "Excedente"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Información principal */}
                    <div className="flex-1">
                      <div className="hidden lg:flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-text-100">
                              {rule.name}
                            </h3>
                            <Badge className={getImpactColor(rule.impact)}>
                              {rule.impact}
                            </Badge>
                          </div>
                          <p className="text-text-200">{rule.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              rule.isActive
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {rule.isActive ? (
                              <>
                                <Play className="h-3 w-3 mr-1" />
                                Activa
                              </>
                            ) : (
                              <>
                                <Pause className="h-3 w-3 mr-1" />
                                Inactiva
                              </>
                            )}
                          </Badge>
                          <Switch
                            checked={rule.isActive}
                            onCheckedChange={() => handleToggleRule(rule.id)}
                            className="data-[state=checked]:bg-primary-100"
                          />
                        </div>
                      </div>

                      {/* Detalles en grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-3 rounded-lg bg-bg-300/20 border border-bg-300/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Target className="h-4 w-4 text-text-200" />
                            <span className="text-sm text-text-200">
                              Meta destino
                            </span>
                          </div>
                          <div className="font-medium text-text-100">
                            {rule.targetGoalName}
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-bg-300/20 border border-bg-300/30">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="h-4 w-4 text-text-200" />
                            <span className="text-sm text-text-200">
                              Total ahorrado
                            </span>
                          </div>
                          <div className="font-medium text-green-400">
                            {formatCurrency(rule.totalSaved)}
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-bg-300/20 border border-bg-300/30">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-text-200" />
                            <span className="text-sm text-text-200">
                              Eficiencia
                            </span>
                          </div>
                          <div
                            className={`font-medium ${getEfficiencyColor(
                              rule.efficiency
                            )}`}
                          >
                            {rule.efficiency}%
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-bg-300/20 border border-bg-300/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-text-200" />
                            <span className="text-sm text-text-200">
                              Última ejecución
                            </span>
                          </div>
                          <div className="font-medium text-text-100">
                            {formatDate(rule.lastExecution)}
                          </div>
                        </div>
                      </div>

                      {/* Información adicional y acciones (solo en desktop) */}
                      <div className="hidden lg:flex items-center justify-between mt-4 pt-4 border-t border-bg-300/30">
                        <div className="flex items-center gap-4 text-sm text-text-200">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{rule.schedule}</span>
                          </div>
                          <div className="h-4 w-px bg-bg-300/50"></div>
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            <span>{rule.executions} ejecuciones</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRule(rule.id)}
                            className="text-text-200 hover:text-primary-300"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRule(rule.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Acciones móvil y detalles adicionales */}
                    <div className="lg:hidden space-y-4">
                      <div className="flex items-center justify-between">
                        <Switch
                          checked={rule.isActive}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                          className="data-[state=checked]:bg-primary-100"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-bg-200/90 backdrop-blur-md border-bg-300"
                          >
                            <DropdownMenuItem
                              onClick={() => handleEditRule(rule.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteRule(rule.id)}
                              className="text-red-400"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between text-text-200">
                          <span>Programación:</span>
                          <span className="text-text-100">{rule.schedule}</span>
                        </div>
                        <div className="flex items-center justify-between text-text-200">
                          <span>Ejecuciones:</span>
                          <span className="text-text-100">
                            {rule.executions}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
            <CardContent className="p-12 text-center">
              <Settings className="h-12 w-12 text-text-200/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-100 mb-2">
                No se encontraron reglas
              </h3>
              <p className="text-text-200 mb-6">
                Intenta ajustar tus filtros o crea tu primera regla automática
              </p>
              <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Crear primera regla
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Resumen y acción */}
      {filteredRules.length > 0 && (
        <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-200/5 backdrop-blur-md border border-primary-100/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-text-100 mb-2">
                  ¿Necesitas más control?
                </h4>
                <p className="text-text-200">
                  Crea reglas personalizadas basadas en tus patrones de gasto
                  específicos
                </p>
              </div>
              <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Regla Personalizada
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Componente Plus para el botón
const Plus = ({ className }: { className?: string }) => (
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
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default AutoSavingsRules;
