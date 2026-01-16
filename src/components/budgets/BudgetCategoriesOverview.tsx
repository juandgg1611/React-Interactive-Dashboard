import React from "react";
import { PieChart, Filter, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BudgetCategory } from "../../types/budget.types";
import { CategoryIcons } from "./CategoryIcons";

interface BudgetCategoriesOverviewProps {
  categories: BudgetCategory[];
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
  onViewAll: () => void;
}

const BudgetCategoriesOverview: React.FC<BudgetCategoriesOverviewProps> = ({
  categories,
  selectedPeriod,
  onPeriodChange,
  onViewAll,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Tomar solo 4 categorías para mostrar (las principales)
  const mainCategories = categories.slice(0, 4);

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-text-100 flex items-center gap-2 text-lg">
              <PieChart className="h-5 w-5 text-primary-200" />
              Presupuestos por Categoría
            </CardTitle>
            <p className="text-sm text-text-200">Límites vs Gastado este mes</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger className="w-[130px] bg-bg-300/30 backdrop-blur-sm border-bg-300/50 text-text-100 h-8">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-bg-200/80 backdrop-blur-sm border-bg-300">
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="border-bg-300/50 text-text-200 hover:text-primary-300 h-8 w-8"
            >
              <Filter className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-100/5 border border-primary-100/20">
              <div className="text-lg font-bold text-primary-200">
                {categories.length}
              </div>
              <div className="text-xs text-text-200">Categorías</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-bg-300/30 to-bg-300/10 border border-bg-300/40">
              <div className="text-lg font-bold text-text-100">
                {categories.filter((c) => c.spent / c.limit >= 0.8).length}
              </div>
              <div className="text-xs text-text-200">En alerta</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-accent-100/10 to-accent-100/5 border border-accent-100/20">
              <div className="text-lg font-bold text-text-100">
                {categories.filter((c) => c.spent / c.limit < 0.5).length}
              </div>
              <div className="text-xs text-text-200">Por debajo</div>
            </div>
          </div>

          {/* Gráfico de barras para categorías principales */}
          <div className="space-y-3">
            {mainCategories.map((category) => {
              const progress = (category.spent / category.limit) * 100;
              const iconName = category.icon as keyof typeof CategoryIcons;
              const IconComponent =
                CategoryIcons[iconName] || CategoryIcons.other;

              return (
                <div key={category.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: category.color + "20" }}
                      >
                        {IconComponent}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-100">
                          {category.name}
                        </div>
                        <div className="text-xs text-text-200">
                          {progress.toFixed(0)}% gastado
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-text-100">
                        {formatCurrency(category.spent)}
                      </div>
                      <div className="text-xs text-text-200">
                        de {formatCurrency(category.limit)}
                      </div>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-bg-300/50 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        progress > 90
                          ? "bg-red-400"
                          : progress > 70
                          ? "bg-yellow-400"
                          : "bg-primary-200"
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botón ver más */}
          <Button
            variant="outline"
            className="w-full border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50 text-sm h-9"
            onClick={onViewAll}
          >
            Ver todas las categorías
            <ChevronRight className="ml-2 h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCategoriesOverview;
