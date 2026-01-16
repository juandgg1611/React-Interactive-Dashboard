// src/components/dashboard/CategorySpendingChart.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface CategorySpendingChartProps {
  data: CategoryData[];
}

const CategorySpendingChart: React.FC<CategorySpendingChartProps> = ({
  data,
}) => {
  // Transformar datos para Recharts
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage,
    color: item.color,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-bg-200/90 backdrop-blur-sm border border-bg-300/50 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <p className="text-text-100 font-medium">{data.name}</p>
          </div>
          <p className="text-text-200 text-sm">
            Monto:{" "}
            <span className="font-semibold text-text-100">
              ${data.value.toFixed(2)}
            </span>
          </p>
          <p className="text-text-200 text-sm">
            Porcentaje:{" "}
            <span className="font-semibold text-text-100">
              {data.percentage}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: "12px",
              color: "#e0e0e0",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategorySpendingChart;
