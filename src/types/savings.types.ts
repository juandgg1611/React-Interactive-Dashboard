// src/types/savings.types.ts
export type GoalStatus =
  | "in-progress"
  | "completed"
  | "paused"
  | "behind"
  | "not-started";
export type GoalPriority = "low" | "medium" | "high" | "critical";
export type GoalCategory =
  | "travel"
  | "education"
  | "vehicle"
  | "home"
  | "emergency"
  | "investment"
  | "luxury"
  | "other";

export interface SavingsGoal {
  id: number;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  startDate: string;
  monthlyContribution: number;
  category: GoalCategory;
  status: GoalStatus;
  priority: GoalPriority;
  color: string;
  description?: string;
  automaticRules: string[];
  insights: string[];
  progress: number;
  history: GoalContribution[];
}

export interface GoalContribution {
  date: string;
  amount: number;
  type: "initial" | "monthly" | "extra" | "round-up" | "transfer";
  description?: string;
}

export interface SavingsSummary {
  totalSaved: number;
  totalGoals: number;
  completedGoals: number;
  upcomingDeadline: string;
  overallProgress: number;
  monthlyContributionTotal: number;
  projectedCompletion: string;
}

export interface AutoSavingRule {
  id: number;
  name: string;
  type: "round-up" | "fixed-amount" | "percentage-income" | "excess-budget";
  amount?: number;
  percentage?: number;
  targetGoalId: number;
  isActive: boolean;
  lastExecution: string;
  totalSaved: number;
}
