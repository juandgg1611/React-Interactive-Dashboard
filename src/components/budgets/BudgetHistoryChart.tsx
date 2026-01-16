import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BudgetHistory } from "../../types/budget.types";

interface BudgetHistoryChartProps {
  data: BudgetHistory[];
}

const BudgetHistoryChart: React.FC<BudgetHistoryChartProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-200/90 backdrop-blur-sm p-3 rounded-lg border border-bg-300 shadow-lg">
          <p className="text-text-100 font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Colores personalizados
  const colors = {
    limit: "#2E8B57", // primary-100
    spent: "#8FBC8F", // accent-100
    saved: "#61bc84", // primary-200
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
        >
          <defs>
            <linearGradient id="colorLimit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.limit} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.limit} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.spent} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.spent} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.saved} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.saved} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2d2d2d"
            horizontal={true}
            vertical={false}
          />

          {/* Eje X - Bajamos las etiquetas con dy */}
          <XAxis
            dataKey="month"
            stroke="#e0e0e0"
            tick={{
              fill: "#e0e0e0",
              fontSize: 12,
            }}
            axisLine={{ stroke: "#454545" }}
            tickLine={{ stroke: "#454545" }}
            dy={10} // ¡ESTO BAJA LAS ETIQUETAS!
          />

          {/* Eje Y con formato de moneda */}
          <YAxis
            stroke="#e0e0e0"
            tick={{
              fill: "#e0e0e0",
              fontSize: 12,
            }}
            tickFormatter={(value) => `$${value / 1000}K`}
            axisLine={{ stroke: "#454545" }}
            tickLine={{ stroke: "#454545" }}
            width={60}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Leyenda con colores personalizados */}
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={10}
            formatter={(value, entry) => (
              <span
                style={{
                  color: "#e0e0e0",
                  fontSize: "12px",
                  marginLeft: "5px",
                }}
              >
                {value}
              </span>
            )}
            wrapperStyle={{
              paddingBottom: "10px",
            }}
          />

          <Area
            type="monotone"
            dataKey="limit"
            stroke={colors.limit}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorLimit)"
            name="Presupuesto"
          />

          <Area
            type="monotone"
            dataKey="spent"
            stroke={colors.spent}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSpent)"
            name="Gastado"
          />

          <Area
            type="monotone"
            dataKey="saved"
            stroke={colors.saved}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSaved)"
            name="Ahorrado"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetHistoryChart;
