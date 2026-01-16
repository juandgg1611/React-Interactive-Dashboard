// src/components/dashboard/SavingsGoals.tsx
import React from "react";
import { Target, Calendar, TrendingUp } from "lucide-react";
import { Progress } from "../ui/progress";

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
  progress: number;
}

interface SavingsGoalsProps {
  goals: Goal[];
}

const SavingsGoals: React.FC<SavingsGoalsProps> = ({ goals }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "#2E8B57";
    if (progress >= 50) return "#61bc84";
    if (progress >= 25) return "#8FBC8F";
    return "#c6ffe6";
  };

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="p-4 rounded-xl bg-bg-300/30 border border-bg-300/50 hover:border-primary-200/30 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-100/20 border border-primary-100/30">
                <Target className="h-4 w-4 text-primary-200" />
              </div>
              <div>
                <h4 className="font-semibold text-text-100">{goal.name}</h4>
                <div className="flex items-center gap-2 text-xs text-text-200/70 mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>Hasta {formatDate(goal.deadline)}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-text-100">
                {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
              </div>
              <div className="text-xs text-text-200/70">
                {goal.progress}% completado
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-200/70">
              <span>Progreso</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>{goal.progress}%</span>
              </div>
            </div>
            <Progress
              value={goal.progress}
              className="h-2"
              style={{
                backgroundColor: "#454545",
                ["--progress-color" as any]: getProgressColor(goal.progress),
              }}
            />
          </div>

          <div className="flex justify-between mt-3 text-sm">
            <span className="text-text-200/70">
              Faltan: {formatCurrency(goal.target - goal.current)}
            </span>
            <span className="text-primary-200 font-medium">
              {Math.round(
                ((goal.target - goal.current) /
                  (goal.progress === 0 ? 1 : goal.progress)) *
                  (100 - goal.progress)
              )}{" "}
              días restantes
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavingsGoals;
