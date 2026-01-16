// src/data/analyticsData.ts
export const analyticsData = {
  financialHealth: 78,
  savingsRate: 20.5,
  expenseIncomeRatio: 75.2,
  incomeStability: 85,
  spendingConsistency: 65,
  predictionAccuracy: 92,

  trends: [
    { month: "Ene", income: 4200, expenses: 3300, savings: 900 },
    { month: "Feb", income: 4100, expenses: 3200, savings: 900 },
    { month: "Mar", income: 4300, expenses: 3100, savings: 1200 },
    { month: "Abr", income: 4400, expenses: 3400, savings: 1000 },
    { month: "May", income: 4500, expenses: 3200, savings: 1300 },
    { month: "Jun", income: 4600, expenses: 3100, savings: 1500 },
  ],

  forecasts: {
    income: { nextMonth: 4375, confidence: 92, trend: "up" },
    expenses: { nextMonth: 3250, confidence: 85, trend: "up" },
    savings: { nextMonth: 1125, confidence: 78, trend: "down" },
  },

  patterns: [
    {
      id: 1,
      type: "seasonal",
      description: "Gastos en entretenimiento aumentan 25% los fines de semana",
      confidence: 95,
      impact: 15,
    },
    {
      id: 2,
      type: "behavioral",
      description: "Mayor ahorro los días 10-15 después de recibir sueldo",
      confidence: 88,
      impact: 20,
    },
  ],
};
