export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  limit: number;
  spent: number;
  color: string;
  trend: "up" | "down" | "stable";
  trendPercentage: number;
}

export interface MonthlyBudget {
  id: string;
  month: string;
  year: number;
  totalLimit: number;
  totalSpent: number;
  remaining: number;
  progress: number;
  status: "under" | "over" | "on-track";
  categories: BudgetCategory[];
}

export interface BudgetHistory {
  month: string;
  limit: number;
  spent: number;
  saved: number;
}

export interface BudgetInsight {
  id: string;
  title: string;
  description: string;
  type: "saving" | "warning" | "tip" | "achievement";
  impact: number;
  actionText?: string;
  actionLink?: string;
}

export interface NotificationSetting {
  enabled: boolean;
  threshold: number;
  type: "email" | "push" | "both";
}
