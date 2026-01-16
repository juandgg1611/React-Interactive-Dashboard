import React from "react";
import { TrendingUp, TrendingDown, Minus, MoreVertical } from "lucide-react";
import { Button } from "../../components/ui/button";
import { BudgetCategory } from "../../types/budget.types";
import { CategoryIcons } from "./CategoryIcons"; // ¡IMPORTANTE!

interface BudgetCategoryCardProps {
  category: BudgetCategory;
}

const BudgetCategoryCard: React.FC<BudgetCategoryCardProps> = ({
  category,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const progress = (category.spent / category.limit) * 100;
  const remaining = category.limit - category.spent;

  // OBTENER ICONO
  const iconName = category.icon as keyof typeof CategoryIcons;
  const IconComponent = CategoryIcons[iconName] || CategoryIcons.other;

  const getProgressColor = () => {
    if (progress <= 70) return "from-green-500 to-green-400";
    if (progress <= 90) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  const getTrendIcon = () => {
    switch (category.trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-400" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-400" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300 group hover:shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* ICONO SVG */}
          <div
            className="p-3 rounded-xl"
            style={{
              backgroundColor: category.color + "20",
              border: `1px solid ${category.color}40`,
            }}
          >
            {IconComponent}
          </div>
          <div>
            <h4 className="font-medium text-text-100">{category.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              {getTrendIcon()}
              <span
                className={`text-xs ${
                  category.trend === "up"
                    ? "text-red-400"
                    : category.trend === "down"
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                {category.trendPercentage > 0 ? "+" : ""}
                {category.trendPercentage}%
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 p-0"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-text-200">
            {formatCurrency(category.spent)}
          </span>
          <span className="text-text-100 font-medium">
            {formatCurrency(category.limit)}
          </span>
        </div>
        <div className="h-2 bg-bg-300/50 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500`}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs text-text-200">Restante</div>
          <div
            className={`text-sm font-medium ${
              remaining < 50 ? "text-red-400" : "text-text-100"
            }`}
          >
            {formatCurrency(remaining)}
          </div>
        </div>
        <div
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            progress <= 70
              ? "bg-green-400/20 text-green-400"
              : progress <= 90
              ? "bg-yellow-400/20 text-yellow-400"
              : "bg-red-400/20 text-red-400"
          }`}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default BudgetCategoryCard;
