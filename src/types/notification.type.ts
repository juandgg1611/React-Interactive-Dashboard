// src/types/notification.types.ts
export interface Notification {
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

export interface NotificationStats {
  totalNotifications: number;
  unreadCount: number;
  urgentCount: number;
  highPriorityCount: number;
  alertsCount: number;
  updatesCount: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
  responseRate: number;
  averageResponseTime: string;
}
