export interface Transaction {
  id: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  date: string;
  description: string;
  category: string;
  subcategory?: string;
  account: string;
  icon: string;
  tags: string[];
  location?: string;
  receiptUrl?: string;
  isRecurring: boolean;
  recurringPattern?: "daily" | "weekly" | "monthly" | "yearly";
  budgetCategoryId?: string;
  mlCategory: string;
  mlConfidence: number;
  isAutoCategorized: boolean;
  status: "completed" | "pending" | "cancelled";
  notes?: string;
}

export interface TransactionSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  netFlow: number;
  previousMonthComparison: number;
  transactionsCount: number;
}

export interface TransactionInsight {
  id: string;
  title: string;
  description: string;
  type: "saving" | "warning" | "tip" | "pattern";
  category: string;
  impact: number;
  actionLabel?: string;
  action?: () => void;
}

export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
  color: string;
  bgColor: string; // Asegurarte de que existe
  icon: string;
  count: number;
  amount: number;
}
