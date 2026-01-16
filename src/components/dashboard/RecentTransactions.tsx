// src/components/dashboard/RecentTransactions.tsx
import React from "react";
import { TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  account: string;
  type: "income" | "expense";
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Compras: "#2E8B57",
      Entretenimiento: "#8FBC8F",
      Transporte: "#61bc84",
      Comida: "#c6ffe6",
      Salud: "#345e37",
      Salario: "#2E8B57",
    };
    return colors[category] || "#454545";
  };

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-xl bg-bg-300/30 border border-bg-300/50 hover:border-primary-200/30 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{
                backgroundColor: `${getCategoryColor(transaction.category)}20`,
                border: `1px solid ${getCategoryColor(transaction.category)}30`,
              }}
            >
              {transaction.amount > 0 ? (
                <TrendingUp
                  className="h-4 w-4"
                  style={{ color: getCategoryColor(transaction.category) }}
                />
              ) : (
                <TrendingDown
                  className="h-4 w-4"
                  style={{ color: getCategoryColor(transaction.category) }}
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-text-100">
                  {transaction.description}
                </p>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: `${getCategoryColor(transaction.category)}30`,
                    color: getCategoryColor(transaction.category),
                  }}
                >
                  {transaction.category}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-text-200/70">
                  {formatDate(transaction.date)}
                </span>
                <span className="text-xs text-text-200/70">
                  {transaction.account}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`font-semibold ${
                transaction.amount > 0 ? "text-primary-200" : "text-accent-100"
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}
              {formatCurrency(transaction.amount)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-text-200/70 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;
