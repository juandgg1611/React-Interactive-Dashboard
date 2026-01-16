// src/pages/Notifications.tsx
import React, { useState, useEffect } from "react";
import {
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  Settings,
  Filter,
  Trash2,
  Archive,
  RefreshCw,
  Calendar,
  ChevronRight,
  Sparkles,
  BellRing,
  Circle,
  CheckCheck,
  ExternalLink,
  Info,
  TrendingDown,
  Zap,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import Layout from "../layout/Layout";

// Datos de ejemplo
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: "urgent" | "high" | "medium" | "low";
  type: "budget" | "goal" | "analytics" | "system" | "transaction" | "insight";
  module:
    | "dashboard"
    | "transactions"
    | "budgets"
    | "goals"
    | "analytics"
    | "settings"
    | "insights";
  read: boolean;
  actions?: string[];
}

// Datos de ejemplo en línea (para evitar problemas de importación)
const notifications: Notification[] = [
  {
    id: "1",
    title: "Presupuesto excedido",
    message:
      "Tu presupuesto de 'Entretenimiento' ha sido excedido en un 25% este mes.",
    timestamp: new Date().toISOString(),
    priority: "urgent",
    type: "budget",
    module: "budgets",
    read: false,
    actions: ["Ajustar presupuesto", "Ver detalles"],
  },
  {
    id: "2",
    title: "Meta en progreso",
    message: "Tu meta 'Viaje a la playa' ha alcanzado el 65% de su objetivo.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    type: "goal",
    module: "goals",
    read: false,
    actions: ["Ver progreso", "Aumentar aporte"],
  },
  {
    id: "3",
    title: "Transacciones importadas",
    message:
      "15 nuevas transacciones han sido importadas automáticamente desde tu banco.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    type: "transaction",
    module: "transactions",
    read: true,
    actions: ["Revisar", "Categorizar"],
  },
  {
    id: "4",
    title: "Nuevo pronóstico disponible",
    message:
      "La IA ha generado un nuevo pronóstico de gastos para el próximo mes.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    type: "analytics",
    module: "analytics",
    read: false,
    actions: ["Ver pronóstico"],
  },
  {
    id: "5",
    title: "Actualización del sistema",
    message: "Se han aplicado mejoras de rendimiento en el dashboard.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    type: "system",
    module: "settings",
    read: true,
    actions: ["Ver cambios"],
  },
  {
    id: "6",
    title: "Saldo bajo detectado",
    message:
      "Tu cuenta principal tiene un saldo inferior al 20% del promedio mensual.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "urgent",
    type: "budget",
    module: "dashboard",
    read: true,
    actions: ["Transferir fondos", "Revisar gastos"],
  },
  {
    id: "7",
    title: "Patrón de gasto detectado",
    message:
      "Se detectó un incremento del 30% en gastos de restaurantes los fines de semana.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    type: "analytics",
    module: "analytics",
    read: true,
    actions: ["Ver análisis", "Ajustar presupuesto"],
  },
  {
    id: "8",
    title: "Inversión recomendada",
    message:
      "Basado en tu perfil, tenemos una oportunidad de inversión con ROI estimado del 8% anual.",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    type: "insight",
    module: "insights",
    read: false,
    actions: ["Explorar", "Más detalles"],
  },
];

// Datos adicionales para alertas
const alertNotifications: Notification[] = [
  {
    id: "a1",
    title: "Alerta de seguridad",
    message:
      "Se detectó un inicio de sesión desde un dispositivo nuevo en Madrid, España.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    priority: "urgent",
    type: "system",
    module: "settings",
    read: false,
    actions: ["Ver actividad", "Asegurar cuenta"],
  },
  {
    id: "a2",
    title: "Tasa de interés cambiada",
    message:
      "La tasa de interés de tu cuenta de ahorros ha aumentado al 3.5% anual.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    type: "system",
    module: "dashboard",
    read: false,
    actions: ["Ver detalles", "Comparar"],
  },
  {
    id: "a3",
    title: "Recordatorio de pago",
    message: "El pago de tu tarjeta de crédito vence en 2 días.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    type: "transaction",
    module: "transactions",
    read: true,
    actions: ["Pagar ahora", "Programar"],
  },
];

// Datos adicionales para actualizaciones
const updateNotifications: Notification[] = [
  {
    id: "u1",
    title: "Nueva función disponible",
    message: "Ahora puedes crear presupuestos recurrentes automáticamente.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    type: "system",
    module: "settings",
    read: false,
    actions: ["Probar ahora", "Ver tutorial"],
  },
  {
    id: "u2",
    title: "Mejora en análisis",
    message:
      "Los informes de gastos ahora incluyen comparativas por categoría.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    type: "analytics",
    module: "analytics",
    read: false,
    actions: ["Ver informe", "Explorar"],
  },
  {
    id: "u3",
    title: "Integración mejorada",
    message:
      "Ahora compatible con 3 bancos adicionales para sincronización automática.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    type: "system",
    module: "settings",
    read: true,
    actions: ["Conectar banco", "Más info"],
  },
  {
    id: "u4",
    title: "Optimización de meta",
    message:
      "El sistema de metas ahora sugiere aportes basados en tu flujo de caja.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    type: "goal",
    module: "goals",
    read: true,
    actions: ["Revisar metas", "Optimizar"],
  },
];

const notificationStats = {
  totalNotifications: 42,
  unreadCount: 3,
  urgentCount: 2,
  highPriorityCount: 5,
  alertsCount: 8,
  updatesCount: 15,
  todayCount: 3,
  weekCount: 12,
  monthCount: 42,
  responseRate: 85,
  averageResponseTime: "2.4h",
};

const Notifications = () => {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("all");
  const [unreadCount, setUnreadCount] = useState(3);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<
    string | null
  >(null);

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Calcular estadísticas en tiempo real
  const calculateStats = () => {
    const urgent = [...notifications, ...alertNotifications].filter(
      (n: Notification) => n.priority === "urgent" && !n.read
    ).length;
    const important = [...notifications, ...alertNotifications].filter(
      (n: Notification) => n.priority === "high" && !n.read
    ).length;
    const today = [
      ...notifications,
      ...alertNotifications,
      ...updateNotifications,
    ].filter((n: Notification) => {
      const todayDate = new Date().toDateString();
      const notifDate = new Date(n.timestamp).toDateString();
      return notifDate === todayDate;
    }).length;

    return { urgent, important, today };
  };

  const stats = calculateStats();

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoy, ${date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ayer, ${date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  // Obtener color según prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return {
          text: "text-red-400",
          bg: "bg-red-500/20",
          border: "border-red-500/30",
          iconBg: "bg-red-500/20",
          iconBorder: "border-red-500/30",
          badge: "bg-red-500/20 text-red-400",
        };
      case "high":
        return {
          text: "text-yellow-400",
          bg: "bg-yellow-500/20",
          border: "border-yellow-500/30",
          iconBg: "bg-yellow-500/20",
          iconBorder: "border-yellow-500/30",
          badge: "bg-yellow-500/20 text-yellow-400",
        };
      case "medium":
        return {
          text: "text-primary-200",
          bg: "bg-primary-100/20",
          border: "border-primary-200/30",
          iconBg: "bg-primary-100/20",
          iconBorder: "border-primary-200/30",
          badge: "bg-primary-100/20 text-primary-200",
        };
      default:
        return {
          text: "text-text-200",
          bg: "bg-bg-300/20",
          border: "border-bg-300/30",
          iconBg: "bg-bg-300/20",
          iconBorder: "border-bg-300/30",
          badge: "bg-bg-300/20 text-text-200",
        };
    }
  };

  // Obtener icono según tipo
  const getNotificationIcon = (type: string, priority: string) => {
    const colors = getPriorityColor(priority);

    switch (type) {
      case "budget":
        return <DollarSign className={`h-5 w-5 ${colors.text}`} />;
      case "goal":
        return <Target className={`h-5 w-5 ${colors.text}`} />;
      case "analytics":
        return <BarChart3 className={`h-5 w-5 ${colors.text}`} />;
      case "transaction":
        return priority === "urgent" ? (
          <TrendingDown className={`h-5 w-5 ${colors.text}`} />
        ) : (
          <TrendingUp className={`h-5 w-5 ${colors.text}`} />
        );
      case "system":
        return <Settings className={`h-5 w-5 ${colors.text}`} />;
      case "insight":
        return <Lightbulb className={`h-5 w-5 ${colors.text}`} />;
      default:
        return <Bell className={`h-5 w-5 ${colors.text}`} />;
    }
  };

  // Obtener color según módulo
  const getModuleColor = (module: string) => {
    switch (module) {
      case "dashboard":
        return "border-primary-200/30 text-primary-200";
      case "transactions":
        return "border-green-400/30 text-green-400";
      case "budgets":
        return "border-purple-400/30 text-purple-400";
      case "goals":
        return "border-yellow-400/30 text-yellow-400";
      case "analytics":
        return "border-blue-400/30 text-blue-400";
      case "settings":
        return "border-gray-400/30 text-gray-400";
      case "insights":
        return "border-indigo-400/30 text-indigo-400";
      default:
        return "border-bg-300/30 text-text-200";
    }
  };

  // Manejar marcado como leído
  const handleMarkAsRead = (id: string) => {
    console.log("Marcando como leído:", id);
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  // Manejar eliminación
  const handleDelete = (id: string) => {
    console.log("Eliminando notificación:", id);
  };

  // Manejar acción rápida
  const handleQuickAction = (notificationId: string, action: string) => {
    console.log("Acción rápida:", { notificationId, action });
  };

  // Agrupar notificaciones por fecha
  const groupNotificationsByDate = () => {
    const groups: { [key: string]: Notification[] } = {
      Hoy: [],
      Ayer: [],
      "Esta semana": [],
      Anterior: [],
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const allNotifications = [
      ...notifications,
      ...alertNotifications,
      ...updateNotifications,
    ];

    allNotifications.forEach((notification: Notification) => {
      const notifDate = new Date(notification.timestamp);

      if (notifDate.toDateString() === today.toDateString()) {
        groups["Hoy"].push(notification);
      } else if (notifDate.toDateString() === yesterday.toDateString()) {
        groups["Ayer"].push(notification);
      } else if (notifDate > weekAgo) {
        groups["Esta semana"].push(notification);
      } else {
        groups["Anterior"].push(notification);
      }
    });

    return groups;
  };

  const groupedNotifications = groupNotificationsByDate();

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Header con gradiente usando tu paleta */}
        <div className="mb-8 relative">
          {/* Fondo con gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-primary-200/5 to-primary-300/3 rounded-2xl blur-xl"></div>

          {/* Efectos de partículas */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-4 -left-4 w-8 h-8 bg-primary-200/10 rounded-full blur-md animate-pulse"></div>
            <div className="absolute bottom-4 -right-4 w-12 h-12 bg-primary-100/5 rounded-full blur-lg"></div>
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Icono con efectos especiales */}
                  <div className="relative group">
                    {/* Brillos externos */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary-200/20 to-primary-100/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="absolute -inset-1 bg-primary-100/10 rounded-xl blur-md"></div>

                    {/* Icono principal */}
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-primary-300/10 border border-primary-200/30 shadow-lg shadow-primary-200/15 backdrop-blur-sm">
                      <Bell className="h-8 w-8 text-primary-200 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300" />

                      {/* Badge animado */}
                      <div className="absolute -top-1 -right-1">
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                          <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-400 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                              {unreadCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Títulos con gradiente */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                      Centro de Notificaciones
                    </h1>
                    <p className="text-text-200/80 mt-2 max-w-2xl">
                      Alertas inteligentes, recordatorios y actualizaciones de
                      tu actividad financiera
                    </p>
                  </div>
                </div>

                {/* Stats en tiempo real */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500/15 to-red-400/10 border border-red-400/20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                      <div className="relative h-2 w-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-text-200">
                      {stats.urgent} urgentes
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/15 to-yellow-400/10 border border-yellow-400/20">
                    <AlertCircle className="h-3.5 w-3.5 text-yellow-500" />
                    <span className="text-sm text-text-200">
                      {stats.important} importantes
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <Bell className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      {stats.today} hoy
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Indicador de tiempo mejorado */}
                <div className="flex items-center gap-3 text-sm bg-bg-200/40 backdrop-blur-md rounded-xl px-4 py-3 border border-bg-300/50 shadow-lg hover:shadow-primary-200/10 transition-all duration-300">
                  <div className="flex items-center gap-2 text-text-100">
                    <Clock className="h-4 w-4 text-primary-200" />
                    <span className="font-medium">Última actualización</span>
                  </div>
                  <div className="h-4 w-px bg-bg-300/50"></div>
                  <div className="text-text-200">
                    {time.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="border-primary-200/30 text-primary-200 hover:bg-primary-200/10 hover:border-primary-200/50 transition-all duration-300 group"
                  >
                    <Filter className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                    Filtros
                  </Button>

                  <Button
                    onClick={() => {
                      // Marcar todas como leídas
                      setUnreadCount(0);
                    }}
                    className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/30 hover:shadow-primary-200/40 transition-all duration-300 group"
                  >
                    <CheckCheck className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Marcar todas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas principales */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-5 bg-bg-200/40 backdrop-blur-md border border-bg-300/40 p-1 rounded-2xl shadow-lg">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Bell className="h-4 w-4 mr-2" />
              Todas
              <Badge className="ml-2 bg-primary-100/20 text-primary-200 text-xs">
                {notifications.length +
                  alertNotifications.length +
                  updateNotifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-100/20 data-[state=active]:to-primary-200/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Circle className="h-4 w-4 mr-2" />
              No leídas
              <Badge className="ml-2 bg-red-500/20 text-red-400 text-xs">
                {unreadCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="urgent"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-red-400/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Urgentes
              <Badge className="ml-2 bg-red-500/20 text-red-400 text-xs">
                {stats.urgent}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/20 data-[state=active]:to-yellow-400/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <BellRing className="h-4 w-4 mr-2" />
              Alertas
              <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 text-xs">
                {alertNotifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-green-400/20 data-[state=active]:text-text-100 rounded-xl transition-all duration-300"
            >
              <Info className="h-4 w-4 mr-2" />
              Actualizaciones
              <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">
                {updateNotifications.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* ==================== CONTENIDO: Todas las notificaciones ==================== */}
          <TabsContent value="all" className="space-y-6 mt-6">
            {/* Lista de notificaciones agrupadas por fecha */}
            <div className="space-y-8">
              {Object.entries(groupedNotifications).map(
                ([dateGroup, notifs]) =>
                  notifs.length > 0 && (
                    <div key={dateGroup} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-px w-8 bg-bg-300/50"></div>
                          <h3 className="text-lg font-semibold text-text-100">
                            {dateGroup}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-text-200 border-bg-300/40"
                          >
                            {notifs.length}
                          </Badge>
                        </div>
                        {dateGroup === "Hoy" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // Marcar todo el grupo como leído
                              console.log(
                                "Marcando grupo como leído:",
                                dateGroup
                              );
                            }}
                            className="text-primary-200 hover:text-primary-300 hover:bg-primary-200/10"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marcar grupo
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {notifs.map((notification: Notification) => {
                          const colors = getPriorityColor(
                            notification.priority
                          );

                          return (
                            <Card
                              key={notification.id}
                              className={`border-0 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.005] cursor-pointer ${
                                notification.read
                                  ? "bg-gradient-to-br from-bg-200/40 to-bg-300/20 border border-bg-300/40"
                                  : "bg-gradient-to-br from-primary-100/10 via-primary-200/5 to-transparent border border-primary-200/30"
                              }`}
                              onClick={() =>
                                setSelectedNotification(notification.id)
                              }
                            >
                              <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                  {/* Icono de prioridad */}
                                  <div
                                    className={`p-3 rounded-xl ${colors.iconBg} ${colors.iconBorder}`}
                                  >
                                    {getNotificationIcon(
                                      notification.type,
                                      notification.priority
                                    )}
                                  </div>

                                  {/* Contenido */}
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4
                                          className={`font-semibold ${colors.text}`}
                                        >
                                          {notification.title}
                                        </h4>
                                        <p className="text-sm text-text-200 mt-1">
                                          {notification.message}
                                        </p>
                                      </div>
                                      {!notification.read && (
                                        <div className="ml-4">
                                          <div className="h-2 w-2 bg-primary-200 rounded-full animate-pulse"></div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Metadatos y acciones */}
                                    <div className="flex items-center justify-between mt-4">
                                      <div className="flex items-center gap-4">
                                        <span className="text-xs text-text-200/70 flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {formatDate(notification.timestamp)}
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className={`text-xs ${getModuleColor(
                                            notification.module
                                          )}`}
                                        >
                                          {notification.module}
                                        </Badge>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        {notification.actions?.map(
                                          (action: string, idx: number) => (
                                            <Button
                                              key={idx}
                                              variant="ghost"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleQuickAction(
                                                  notification.id,
                                                  action
                                                );
                                              }}
                                              className="text-xs h-8 px-3 hover:bg-primary-200/10 text-text-100 hover:text-primary-200 transition-colors"
                                            >
                                              {action}
                                            </Button>
                                          )
                                        )}
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleMarkAsRead(notification.id);
                                          }}
                                          className="h-8 w-8 p-0 hover:bg-green-400/10 text-text-100 hover:text-green-400"
                                        >
                                          <CheckCircle className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )
              )}
            </div>
          </TabsContent>

          {/* ==================== CONTENIDO: No leídas ==================== */}
          <TabsContent value="unread" className="space-y-6 mt-6">
            <Card className="border-0 bg-gradient-to-br from-primary-100/10 via-primary-200/5 to-transparent backdrop-blur-md border border-primary-200/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-text-100 flex items-center gap-3">
                  <Circle className="h-5 w-5 text-primary-200 animate-pulse" />
                  Notificaciones no leídas
                </CardTitle>
                <CardDescription className="text-text-200">
                  {unreadCount} notificaciones pendientes de revisión
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    ...notifications,
                    ...alertNotifications,
                    ...updateNotifications,
                  ]
                    .filter((n: Notification) => !n.read)
                    .slice(0, 5)
                    .map((notification: Notification) => {
                      const colors = getPriorityColor(notification.priority);

                      return (
                        <div
                          key={notification.id}
                          className="p-4 rounded-xl bg-gradient-to-br from-primary-100/15 to-primary-200/10 border border-primary-200/30 hover:border-primary-200/50 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <div className="h-2 w-2 bg-primary-200 rounded-full animate-pulse"></div>
                              </div>
                              <div>
                                <div className={`font-medium ${colors.text}`}>
                                  {notification.title}
                                </div>
                                <div className="text-sm text-text-200 mt-1">
                                  {notification.message}
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                  <span className="text-xs text-text-200/70">
                                    {formatDate(notification.timestamp)}
                                  </span>
                                  <Badge className={colors.badge}>
                                    {notification.priority === "urgent"
                                      ? "Urgente"
                                      : "Importante"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleMarkAsRead(notification.id)
                                }
                                className="h-8 w-8 p-0 hover:bg-green-400/10 text-text-100 hover:text-green-400"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(notification.id)}
                                className="h-8 w-8 p-0 hover:bg-red-400/10 text-text-100 hover:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  {[
                    ...notifications,
                    ...alertNotifications,
                    ...updateNotifications,
                  ].filter((n: Notification) => !n.read).length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-text-100 mb-2">
                        ¡Todo al día!
                      </h3>
                      <p className="text-text-200">
                        No tienes notificaciones pendientes
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              {[
                ...notifications,
                ...alertNotifications,
                ...updateNotifications,
              ].filter((n: Notification) => !n.read).length > 5 && (
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full text-primary-200 hover:text-primary-300 hover:bg-primary-200/10"
                    onClick={() => setActiveTab("all")}
                  >
                    Ver todas las no leídas
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          {/* ==================== CONTENIDO: Urgentes - MEJORADO ==================== */}
          <TabsContent value="urgent" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Panel principal de alertas urgentes */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 bg-gradient-to-br from-red-500/10 via-red-400/5 to-transparent backdrop-blur-md border border-red-400/30 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                          <div className="relative p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600">
                            <ShieldAlert className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-text-100">
                            Alertas Críticas
                          </CardTitle>
                          <CardDescription className="text-text-200">
                            Requieren atención inmediata
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        {stats.urgent} Pendientes
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...notifications, ...alertNotifications]
                        .filter((n: Notification) => n.priority === "urgent")
                        .map((notification: Notification) => (
                          <div
                            key={notification.id}
                            className="p-4 rounded-xl bg-gradient-to-br from-red-500/15 to-red-400/10 border border-red-400/30 hover:border-red-400/50 transition-all duration-300 group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative mt-0.5">
                                <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20"></div>
                                <AlertCircle className="h-5 w-5 text-red-400 relative z-10" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div className="font-semibold text-text-100 group-hover:text-red-300 transition-colors">
                                    {notification.title}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-7 px-3 text-xs bg-red-500/10 border-red-400/30 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                                      onClick={() =>
                                        handleQuickAction(
                                          notification.id,
                                          "resolver"
                                        )
                                      }
                                    >
                                      <Zap className="h-3 w-3 mr-1" />
                                      Resolver
                                    </Button>
                                  </div>
                                </div>
                                <div className="text-sm text-text-200 mt-2">
                                  {notification.message}
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-text-200/70 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {formatDate(notification.timestamp)}
                                    </span>
                                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                      Urgente
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {notification.actions?.map(
                                      (action: string, idx: number) => (
                                        <Button
                                          key={idx}
                                          variant="ghost"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleQuickAction(
                                              notification.id,
                                              action
                                            );
                                          }}
                                          className="h-7 px-3 text-xs hover:bg-red-500/10 text-text-100 hover:text-red-400"
                                        >
                                          {action}
                                        </Button>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                      {[...notifications, ...alertNotifications].filter(
                        (n: Notification) => n.priority === "urgent"
                      ).length === 0 && (
                        <div className="text-center py-8">
                          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-400/10 border border-green-400/20 mb-4">
                            <CheckCircle className="h-12 w-12 text-green-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-text-100 mb-2">
                            Sin alertas urgentes
                          </h3>
                          <p className="text-text-200 max-w-md mx-auto">
                            Tu situación financiera está bajo control. ¡Buen
                            trabajo!
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Alertas de alta prioridad */}
                <Card className="border-0 bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-transparent backdrop-blur-md border border-yellow-400/30 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-400" />
                      <div>
                        <CardTitle className="text-text-100">
                          Alertas Importantes
                        </CardTitle>
                        <CardDescription className="text-text-200">
                          Para revisar pronto
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...notifications, ...alertNotifications]
                        .filter((n: Notification) => n.priority === "high")
                        .slice(0, 3)
                        .map((notification: Notification) => (
                          <div
                            key={notification.id}
                            className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 border border-yellow-400/20 hover:border-yellow-400/40 transition-colors"
                          >
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <div className="font-medium text-text-100 text-sm">
                                  {notification.title}
                                </div>
                                <div className="text-xs text-text-200 mt-1 line-clamp-1">
                                  {notification.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Panel de estadísticas y acciones rápidas */}
              <div className="space-y-6">
                {/* Acciones rápidas para urgentes */}
                <Card className="border-0 bg-gradient-to-br from-primary-100/10 via-primary-200/5 to-transparent backdrop-blur-md border border-primary-200/30 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-text-100">
                      ⚡ Acciones Rápidas
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Gestiona alertas urgentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-red-400/30 text-red-400 hover:bg-red-500/10 hover:border-red-400/50 hover:text-red-300"
                        onClick={() => {
                          // Acción: Ver todas las urgentes
                          console.log("Ver todas las urgentes");
                        }}
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Ver todas las urgentes
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-yellow-400/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-400/50 hover:text-yellow-300"
                        onClick={() => {
                          // Acción: Configurar alertas
                          console.log("Configurar alertas");
                        }}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configurar alertas
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-primary-200/30 text-primary-200 hover:bg-primary-200/10 hover:border-primary-200/50 hover:text-primary-300"
                        onClick={() => {
                          // Acción: Exportar reporte
                          console.log("Exportar reporte");
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Exportar reporte
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ==================== CONTENIDO: Alertas ==================== */}
          <TabsContent value="alerts" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lista principal de alertas */}
              <div className="lg:col-span-2">
                <Card className="border-0 bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-transparent backdrop-blur-md border border-yellow-400/30 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600">
                          <BellRing className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-text-100">
                            Centro de Alertas
                          </CardTitle>
                          <CardDescription className="text-text-200">
                            Todas las alertas y avisos importantes
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          {alertNotifications.filter((n) => !n.read).length}{" "}
                          Nuevas
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alertNotifications.map((notification: Notification) => {
                        const colors = getPriorityColor(notification.priority);

                        return (
                          <div
                            key={notification.id}
                            className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg ${colors.iconBg} ${colors.iconBorder}`}
                              >
                                {getNotificationIcon(
                                  notification.type,
                                  notification.priority
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4
                                      className={`font-semibold ${colors.text} group-hover:text-yellow-300 transition-colors`}
                                    >
                                      {notification.title}
                                    </h4>
                                    <p className="text-sm text-text-200 mt-1">
                                      {notification.message}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-text-200/70 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {formatDate(notification.timestamp)}
                                    </span>
                                    <Badge className={colors.badge}>
                                      {notification.priority === "urgent"
                                        ? "Urgente"
                                        : notification.priority === "high"
                                        ? "Importante"
                                        : "Alerta"}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {notification.actions?.map(
                                      (action: string, idx: number) => (
                                        <Button
                                          key={idx}
                                          variant="ghost"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleQuickAction(
                                              notification.id,
                                              action
                                            );
                                          }}
                                          className="h-8 px-3 text-xs hover:bg-yellow-500/10 text-text-100 hover:text-yellow-400"
                                        >
                                          {action}
                                        </Button>
                                      )
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMarkAsRead(notification.id);
                                      }}
                                      className="h-8 w-8 p-0 hover:bg-green-400/10 text-text-100 hover:text-green-400"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Panel de configuración de alertas */}
              <div className="space-y-6">
                <Card className="border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-md border border-bg-300/40 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-text-100">
                      ⚙️ Configurar Alertas
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Personaliza tus notificaciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-200">
                            Alertas por email
                          </span>
                          <div className="h-6 w-11 bg-primary-200/20 rounded-full relative">
                            <div className="h-5 w-5 bg-primary-200 rounded-full absolute top-0.5 left-0.5"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-200">
                            Notificaciones push
                          </span>
                          <div className="h-6 w-11 bg-primary-200/20 rounded-full relative">
                            <div className="h-5 w-5 bg-primary-200 rounded-full absolute top-0.5 left-0.5"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-200">
                            Alertas urgentes SMS
                          </span>
                          <div className="h-6 w-11 bg-primary-200/20 rounded-full relative">
                            <div className="h-5 w-5 bg-primary-200 rounded-full absolute top-0.5 left-0.5"></div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-bg-300/40">
                        <div className="text-sm font-medium text-text-100 mb-3">
                          Frecuencia de alertas
                        </div>
                        <div className="space-y-2">
                          {[
                            "En tiempo real",
                            "Diario",
                            "Semanal",
                            "Solo urgentes",
                          ].map((freq, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div
                                className={`h-3 w-3 rounded-full border ${
                                  idx === 0
                                    ? "border-primary-200 bg-primary-200/20"
                                    : "border-bg-300/60"
                                }`}
                              ></div>
                              <span className="text-sm text-text-200">
                                {freq}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-primary-200/30 text-primary-200 hover:bg-primary-200/10"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Más configuraciones
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ==================== CONTENIDO: Actualizaciones ==================== */}
          <TabsContent value="updates" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lista principal de actualizaciones */}
              <div className="lg:col-span-2">
                <Card className="border-0 bg-gradient-to-br from-green-500/10 via-green-400/5 to-transparent backdrop-blur-md border border-green-400/30 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-text-100">
                            Novedades y Actualizaciones
                          </CardTitle>
                          <CardDescription className="text-text-200">
                            Nuevas funciones y mejoras en la plataforma
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {updateNotifications.filter((n) => !n.read).length}{" "}
                        Nuevas
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {updateNotifications.map((notification: Notification) => {
                        const colors = getPriorityColor(notification.priority);

                        return (
                          <div
                            key={notification.id}
                            className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-400/5 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 group"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg ${colors.iconBg} ${colors.iconBorder}`}
                              >
                                {getNotificationIcon(
                                  notification.type,
                                  notification.priority
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4
                                      className={`font-semibold ${colors.text} group-hover:text-green-300 transition-colors`}
                                    >
                                      {notification.title}
                                    </h4>
                                    <p className="text-sm text-text-200 mt-1">
                                      {notification.message}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <div className="flex items-center gap-1">
                                      <Badge className="bg-green-500/20 text-green-400 text-xs">
                                        Nuevo
                                      </Badge>
                                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-text-200/70 flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {formatDate(notification.timestamp)}
                                    </span>
                                    <Badge className={colors.badge}>
                                      {notification.type === "system"
                                        ? "Sistema"
                                        : notification.type === "analytics"
                                        ? "Análisis"
                                        : "Mejora"}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {notification.actions?.map(
                                      (action: string, idx: number) => (
                                        <Button
                                          key={idx}
                                          variant="ghost"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleQuickAction(
                                              notification.id,
                                              action
                                            );
                                          }}
                                          className="h-8 px-3 text-xs hover:bg-green-500/10 text-text-100 hover:text-green-400"
                                        >
                                          {action}
                                        </Button>
                                      )
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMarkAsRead(notification.id);
                                      }}
                                      className="h-8 w-8 p-0 hover:bg-green-400/10 text-text-100 hover:text-green-400"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Panel de próximas actualizaciones */}
              <div className="space-y-6">
                {/* Sugerencias de uso */}
                <Card className="border-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent backdrop-blur-md border border-purple-400/30 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-text-100">
                      💡 Tips y Consejos
                    </CardTitle>
                    <CardDescription className="text-text-200">
                      Aprovecha al máximo las nuevas funciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Usa presupuestos recurrentes para gastos fijos",
                        "Configura alertas personalizadas para tus metas",
                        "Revisa los pronósticos semanales para planificar mejor",
                        "Exporta reportes mensuales para seguimiento",
                      ].map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-200">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-purple-400/30 text-purple-400 hover:bg-purple-500/10"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver tutoriales
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-bg-300/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-text-200/70">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary-200 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    Sistema de notificaciones activo •{" "}
                    {notifications.length +
                      alertNotifications.length +
                      updateNotifications.length}{" "}
                    total
                  </span>
                </div>
                <div className="h-4 w-px bg-bg-300/50"></div>
                <span className="text-sm">
                  Última actualización:{" "}
                  {time.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-200 hover:bg-primary-200/10"
                onClick={() => {
                  // Sincronizar notificaciones
                  console.log("Sincronizando notificaciones...");
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sincronizar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/60 text-text-200 hover:text-primary-200 hover:border-primary-200/50"
              >
                <Archive className="h-4 w-4 mr-2" />
                Archivar antiguas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
