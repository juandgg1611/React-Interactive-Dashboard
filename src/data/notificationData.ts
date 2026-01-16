// src/data/notificationData.ts
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: "urgent" | "high" | "medium" | "low";
  type: "budget" | "goal" | "analytics" | "system" | "transaction";
  module:
    | "dashboard"
    | "transactions"
    | "budgets"
    | "goals"
    | "analytics"
    | "settings";
  read: boolean;
  actions?: string[];
}

export const notifications: Notification[] = [
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
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Hace 2 horas
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
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // Hace 4 horas
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
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 día
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
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Hace 2 días
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
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // Hace 3 días
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
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Hace 5 días
    priority: "high",
    type: "analytics",
    module: "analytics",
    read: true,
    actions: ["Ver análisis", "Ajustar presupuesto"],
  },
];

export const notificationStats = {
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
