// src/hooks/useQuickTransaction.ts - VERSIÓN CORREGIDA Y COMPATIBLE
import { useState, useCallback } from "react";

export interface QuickTransactionData {
  type: "income" | "expense";
  amount: number | null;
  description: string;
  category: string;
  account: string;
  date: Date;
  tags?: string[];
  notes?: string;
  receipt?: File | null;
  subcategory?: string;
  isRecurring?: boolean;
  recurringPattern?: "daily" | "weekly" | "monthly" | "yearly";
  status?: "completed" | "pending";
  budgetCategoryId?: string;
  mlCategory?: string;
  mlConfidence?: number;
  isAutoCategorized?: boolean;
}

export const useQuickTransaction = (
  initialData?: Partial<QuickTransactionData>,
) => {
  const [formData, setFormData] = useState<QuickTransactionData>({
    type: "expense",
    amount: null,
    description: "",
    category: "",
    account: "",
    date: new Date(),
    tags: [],
    notes: "",
    isRecurring: false,
    recurringPattern: "monthly",
    status: "completed",
    mlConfidence: 0.8,
    isAutoCategorized: false,
    ...initialData,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<
    "amount" | "category" | "details" | "preview"
  >("amount");
  const [suggestions] = useState<any[]>([]); // Temporalmente vacío

  // Funciones de actualización
  const updateField = useCallback(
    <K extends keyof QuickTransactionData>(
      field: K,
      value: QuickTransactionData[K],
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setError(null);
    },
    [],
  );

  const updateMultipleFields = useCallback(
    (updates: Partial<QuickTransactionData>) => {
      setFormData((prev) => ({ ...prev, ...updates }));
      setError(null);
    },
    [],
  );

  // Navegación
  const nextStep = useCallback(() => {
    const steps = ["amount", "category", "details", "preview"] as const;
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1]);
  }, [step]);

  const prevStep = useCallback(() => {
    const steps = ["amount", "category", "details", "preview"] as const;
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
  }, [step]);

  const goToStep = useCallback((targetStep: typeof step) => {
    setStep(targetStep);
  }, []);

  // Validación
  const validateCurrentStep = useCallback((): boolean => {
    switch (step) {
      case "amount":
        return !!(formData.amount && formData.amount > 0);
      case "category":
        return !!formData.category;
      case "details":
        return !!(formData.description.trim() && formData.account);
      case "preview":
        return !!(
          formData.amount &&
          formData.description &&
          formData.category &&
          formData.account
        );
      default:
        return false;
    }
  }, [step, formData]);

  const isFormValid = validateCurrentStep();

  // Envío
  const submitTransaction = useCallback(async (): Promise<{
    success: boolean;
    transaction?: any;
    error?: string;
  }> => {
    if (
      !formData.amount ||
      !formData.description ||
      !formData.category ||
      !formData.account
    ) {
      setError("Completa todos los campos obligatorios");
      return { success: false, error: "Datos incompletos" };
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const transaction = {
        id: `txn_${Date.now()}`,
        type: formData.type,
        amount:
          formData.type === "expense"
            ? -Math.abs(formData.amount)
            : Math.abs(formData.amount),
        date: formData.date.toISOString(),
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory,
        account: formData.account,
        icon: "dollar-sign",
        tags: formData.tags || [],
        notes: formData.notes,
        receiptUrl: formData.receipt
          ? URL.createObjectURL(formData.receipt)
          : undefined,
        isRecurring: formData.isRecurring || false,
        recurringPattern: formData.recurringPattern,
        mlCategory: formData.mlCategory || formData.category,
        mlConfidence: formData.mlConfidence || 0.8,
        isAutoCategorized: formData.isAutoCategorized || false,
        status: formData.status || "completed",
        budgetCategoryId: formData.budgetCategoryId,
      };

      // Guardar en localStorage
      const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
      existing.push(transaction);
      localStorage.setItem("transactions", JSON.stringify(existing));

      return { success: true, transaction };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Reset
  const resetForm = useCallback(() => {
    setFormData({
      type: "expense",
      amount: null,
      description: "",
      category: "",
      account: "",
      date: new Date(),
      tags: [],
      notes: "",
      isRecurring: false,
      recurringPattern: "monthly",
      status: "completed",
      mlConfidence: 0.8,
      isAutoCategorized: false,
    });
    setStep("amount");
    setError(null);
    setIsSubmitting(false);
  }, []);

  // Métodos de conveniencia
  const setAmount = (amount: number | null) => updateField("amount", amount);
  const setType = (type: "income" | "expense") => updateField("type", type);
  const setCategory = (category: string) => updateField("category", category);
  const setSubcategory = (subcategory: string) =>
    updateField("subcategory", subcategory);
  const setDescription = (description: string) =>
    updateField("description", description);
  const setAccount = (account: string) => updateField("account", account);
  const setDate = (date: Date) => updateField("date", date);

  const addTag = (tag: string) => {
    if (!formData.tags?.includes(tag)) {
      updateField("tags", [...(formData.tags || []), tag]);
    }
  };

  const removeTag = (tag: string) => {
    updateField("tags", formData.tags?.filter((t) => t !== tag) || []);
  };

  const applySuggestion = (suggestion: any) => {
    // Implementación temporal
    console.log("Applying suggestion:", suggestion);
  };

  return {
    // Estados
    formData,
    isSubmitting,
    error,
    step,
    suggestions,

    // Valores computados (temporales)
    currentCategories: [],
    selectedCategory: undefined,
    selectedAccount: undefined,
    accounts: [],

    // Validación
    canProceed: validateCurrentStep(),
    isFormValid,

    // Funciones de actualización
    updateField,
    updateMultipleFields,
    resetForm,

    // Navegación
    nextStep,
    prevStep,
    goToStep,

    // Validación y envío
    validateCurrentStep,
    submitTransaction,

    // Sugerencias
    applySuggestion,

    // Métodos de conveniencia
    setAmount,
    setType,
    setCategory,
    setDescription,
    setAccount,
    setDate,
    addTag,
    removeTag,
    setSubcategory,

    // Para compatibilidad
    setMlData: () => {},
    setRecurring: () => {},
  };
};
