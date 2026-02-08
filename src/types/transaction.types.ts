// src/types/transaction.types.ts
// MANTENER TUS TIPOS EXISTENTES Y AÑADIR LOS NUEVOS

export type TransactionType = "income" | "expense" | "transfer";

export interface Transaction {
  id: string;
  type: TransactionType;
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
  bgColor: string;
  icon: string;
  count: number;
  amount: number;
}

// ==================== NUEVOS TIPOS PARA QUICK TRANSACTIONS ====================
export interface QuickTransactionData {
  // Campos principales
  type: TransactionType;
  amount: number | null;
  description: string;
  category: string;
  account: string;
  date: Date;

  // Campos opcionales
  subcategory?: string;
  tags?: string[];
  location?: string;
  notes?: string;
  receipt?: File | null;

  // Configuración
  isRecurring?: boolean;
  recurringPattern?: "daily" | "weekly" | "monthly" | "yearly";
  status?: "completed" | "pending" | "cancelled";
  budgetCategoryId?: string;

  // IA
  mlCategory?: string;
  mlConfidence?: number;
  isAutoCategorized?: boolean;
}

// Para convertir de QuickTransactionData a Transaction
export const toTransaction = (
  data: QuickTransactionData,
): Omit<Transaction, "id"> => {
  // Mapear tu estructura de categorías
  const categoryMap: Record<string, string> = {
    food: "Alimentación",
    transport: "Transporte",
    entertainment: "Entretenimiento",
    shopping: "Compras",
    utilities: "Servicios",
    health: "Salud",
    education: "Educación",
    housing: "Vivienda",
    salary: "Salario",
    freelance: "Ingresos Extra",
    investment: "Inversión",
    rent: "Alquiler",
    gift: "Regalo",
  };

  const iconMap: Record<string, string> = {
    food: "food",
    transport: "transport",
    entertainment: "entertainment",
    shopping: "shopping",
    utilities: "utilities",
    health: "health",
    education: "education",
    housing: "housing",
    salary: "salary",
    freelance: "freelance",
    investment: "investment",
    rent: "rent",
    gift: "extra",
  };

  return {
    type: data.type,
    amount: data.amount || 0,
    date: data.date.toISOString(),
    description: data.description,
    category: categoryMap[data.category] || data.category,
    subcategory: data.subcategory,
    account: data.account,
    icon: iconMap[data.category] || "dollar-sign",
    tags: data.tags || [],
    location: data.location,
    receiptUrl: data.receipt ? URL.createObjectURL(data.receipt) : undefined,
    isRecurring: data.isRecurring || false,
    recurringPattern: data.recurringPattern,
    budgetCategoryId: data.budgetCategoryId,
    mlCategory: data.mlCategory || data.category,
    mlConfidence: data.mlConfidence || 0.8,
    isAutoCategorized: data.isAutoCategorized || false,
    status: data.status || "completed",
    notes: data.notes,
  };
};

// ==================== FUNCIONES DE UTILIDAD ====================
export const formatCurrency = (amount: number | null): string => {
  if (amount === null) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const isValidQuickTransaction = (
  data: QuickTransactionData,
): boolean => {
  return !!(
    data.amount &&
    data.amount > 0 &&
    data.description.trim() &&
    data.category &&
    data.account
  );
};

// ==================== PROPS DE COMPONENTES ====================
export interface AmountInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  currency?: string;
  className?: string;
  autoFocus?: boolean;
}

export interface CategorySelectorProps {
  type: TransactionType;
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string, subcategory?: string) => void;
  className?: string;
}

export interface TransactionPreviewProps {
  transaction: QuickTransactionData;
  onSubmit: () => Promise<void>;
  onEdit: () => void;
  isLoading?: boolean;
  className?: string;
}
