import { useState, useEffect } from "react";
import {
  MonthlyBudget,
  BudgetHistory,
  BudgetInsight,
} from "../types/budget.types";
import {
  currentBudget,
  budgetHistory,
  budgetInsights,
} from "../data/budgetData";

export const useBudgets = () => {
  const [budget, setBudget] = useState<MonthlyBudget>(currentBudget);
  const [history, setHistory] = useState<BudgetHistory[]>(budgetHistory);
  const [insights, setInsights] = useState<BudgetInsight[]>(budgetInsights);
  const [loading, setLoading] = useState(false);

  const updateBudgetCategory = (categoryId: string, newLimit: number) => {
    setBudget((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, limit: newLimit } : cat
      ),
      totalLimit: prev.categories.reduce(
        (sum, cat) => sum + (cat.id === categoryId ? newLimit : cat.limit),
        0
      ),
    }));
  };

  const addBudget = (newBudget: Omit<MonthlyBudget, "id">) => {
    // Aquí iría la lógica para agregar un nuevo presupuesto
    console.log("Adding new budget:", newBudget);
  };

  const recalculateWithAI = async () => {
    setLoading(true);
    // Simulación de llamada a IA
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setInsights((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "Nueva recomendación IA",
        description:
          "Análisis actualizado basado en tus últimos patrones de gasto.",
        type: "tip",
        impact: 0,
        actionText: "Ver análisis",
        actionLink: "#",
      },
    ]);

    setLoading(false);
  };

  return {
    budget,
    history,
    insights,
    loading,
    updateBudgetCategory,
    addBudget,
    recalculateWithAI,
  };
};
