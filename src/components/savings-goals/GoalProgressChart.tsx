// src/savings-goals/GoalProgressChart.tsx
import React from "react";
import { Target, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface GoalProgressChartProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  goalName?: string;
  currentAmount?: number;
  targetAmount?: number;
  status?: "in-progress" | "completed" | "behind";
}

const GoalProgressChart: React.FC<GoalProgressChartProps> = ({
  progress,
  size = 120,
  strokeWidth = 12,
  showLabel = true,
  goalName,
  currentAmount,
  targetAmount,
  status = "in-progress",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "behind":
        return "#ef4444";
      default:
        return "#2E8B57";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <Target className="h-5 w-5 text-green-400" />;
      case "behind":
        return <TrendingDown className="h-5 w-5 text-red-400" />;
      default:
        return <TrendingUp className="h-5 w-5 text-primary-200" />;
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return "";
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Fondo del círculo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#454545"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progreso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStatusColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s ease-out",
          }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={circumference}
            to={offset}
            dur="1.5s"
            fill="freeze"
          />
        </circle>
      </svg>

      {/* Contenido central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showLabel ? (
          <>
            <div className="text-2xl font-bold text-text-100">{progress}%</div>
            {goalName && (
              <div className="text-xs text-text-200 text-center mt-1 px-2">
                {goalName}
              </div>
            )}
            {currentAmount !== undefined && targetAmount !== undefined && (
              <div className="text-xs text-text-200 text-center mt-1">
                {formatCurrency(currentAmount)} / {formatCurrency(targetAmount)}
              </div>
            )}
          </>
        ) : (
          getStatusIcon()
        )}
      </div>
    </div>
  );
};

// Versión en tarjeta para el overview
export const GoalProgressCard: React.FC<
  GoalProgressChartProps & {
    title?: string;
    description?: string;
  }
> = ({ title, description, ...props }) => {
  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40">
      <CardHeader className="pb-2">
        {title && (
          <CardTitle className="text-sm text-text-200">{title}</CardTitle>
        )}
        {description && (
          <p className="text-xs text-text-200/60">{description}</p>
        )}
      </CardHeader>
      <CardContent className="flex justify-center pt-0">
        <GoalProgressChart {...props} />
      </CardContent>
    </Card>
  );
};

export default GoalProgressChart;
