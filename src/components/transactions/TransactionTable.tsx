import React, { useState } from "react";
import {
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Transaction } from "../../types/transaction.types";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    });
  };

  const getCategoryIcon = (category: string) => {
    // Usaremos el mismo sistema que Budgets
    return category.charAt(0).toUpperCase();
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-text-100 text-xl">
              Transacciones Recientes
            </CardTitle>
            <CardDescription className="text-text-200">
              {transactions.length} transacciones este mes
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
            >
              Ver todas
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-bg-300/60 text-text-200 hover:text-primary-300"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bg-300/40">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-200">
                  Descripción
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-200">
                  Categoría
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-200">
                  Fecha
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-200">
                  Monto
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-bg-300/20 hover:bg-bg-300/10 transition-colors group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.type === "income"
                            ? "bg-green-500/10 border border-green-500/20"
                            : "bg-red-500/10 border border-red-500/20"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-text-100">
                          {transaction.description}
                        </div>
                        <div className="text-xs text-text-200/70">
                          {transaction.tags
                            ?.slice(0, 2)
                            .map((tag) => `#${tag}`)
                            .join(" ")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className="border-bg-300/50 text-text-200"
                    >
                      {transaction.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-text-200 text-sm">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-3 px-4">
                    <div
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 border-bg-300/50 text-text-200 hover:text-primary-300"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 border-bg-300/50 text-text-200 hover:text-primary-300"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 border-red-400/30 text-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mostrar más transacciones si hay */}
        {transactions.length > 5 && (
          <div className="mt-4 pt-4 border-t border-bg-300/40">
            <Button
              variant="outline"
              className="w-full border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
            >
              Ver {transactions.length - 5} transacciones más
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
