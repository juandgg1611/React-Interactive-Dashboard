// src/components/analytics/FinancialTrendsChart.tsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  Maximize2,
  Minimize2,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

interface FinancialTrendsChartProps {
  timeRange?: string;
  detailed?: boolean;
}

const FinancialTrendsChart: React.FC<FinancialTrendsChartProps> = ({
  timeRange = "month",
  detailed = false,
}) => {
  const [chartType, setChartType] = useState<"line" | "area" | "bar">("line");
  const [showIncome, setShowIncome] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [showSavings, setShowSavings] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [hoveredData, setHoveredData] = useState<any>(null);

  // Datos de ejemplo para gráficos
  const generateData = () => {
    const data = [];
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    for (let i = 0; i < 12; i++) {
      const baseIncome = 4000 + Math.random() * 1000;
      const baseExpense = 3000 + Math.random() * 800;
      const savings = baseIncome - baseExpense;

      data.push({
        month: months[i],
        income: Math.round(baseIncome),
        expenses: Math.round(baseExpense),
        savings: Math.round(savings),
        netFlow: Math.round(savings * 0.8),
        previousYear: Math.round(baseIncome * 0.85),
      });
    }

    return data;
  };

  const [chartData, setChartData] = useState(generateData());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-200/90 backdrop-blur-md border border-bg-300/50 rounded-xl p-4 shadow-2xl">
          <p className="font-bold text-text-100 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 mb-1"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-text-200">{entry.dataKey}:</span>
              </div>
              <span className="font-bold text-text-100">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      className={`border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl ${
        fullscreen ? "fixed inset-4 z-50" : ""
      }`}
    >
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-200" />
              Tendencias Financieras
            </CardTitle>
            <p className="text-text-200 text-sm mt-1">
              Evolución de ingresos, gastos y ahorro en el tiempo
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Controles de visualización */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  chartType === "line"
                    ? "bg-primary-100/20 text-primary-200"
                    : "text-text-200"
                }`}
                onClick={() => setChartType("line")}
              >
                Línea
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  chartType === "area"
                    ? "bg-primary-100/20 text-primary-200"
                    : "text-text-200"
                }`}
                onClick={() => setChartType("area")}
              >
                Área
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  chartType === "bar"
                    ? "bg-primary-100/20 text-primary-200"
                    : "text-text-200"
                }`}
                onClick={() => setChartType("bar")}
              >
                Barras
              </Button>
            </div>
          </div>
        </div>

        {/* Filtros de series */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex items-center gap-2">
            <Label className="flex items-center gap-2 cursor-pointer">
              <Switch
                checked={showIncome}
                onCheckedChange={setShowIncome}
                className="data-[state=checked]:bg-primary-100"
              />
              <span
                className={`text-sm ${
                  showIncome ? "text-primary-200" : "text-text-200"
                }`}
              >
                Ingresos
              </span>
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Label className="flex items-center gap-2 cursor-pointer">
              <Switch
                checked={showExpenses}
                onCheckedChange={setShowExpenses}
                className="data-[state=checked]:bg-red-500"
              />
              <span
                className={`text-sm ${
                  showExpenses ? "text-red-400" : "text-text-200"
                }`}
              >
                Gastos
              </span>
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Label className="flex items-center gap-2 cursor-pointer">
              <Switch
                checked={showSavings}
                onCheckedChange={setShowSavings}
                className="data-[state=checked]:bg-accent-100"
              />
              <span
                className={`text-sm ${
                  showSavings ? "text-accent-100" : "text-text-200"
                }`}
              >
                Ahorro
              </span>
            </Label>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[400px] relative">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onMouseMove={(data: any) => {
                  if (data.activePayload) {
                    setHoveredData(data.activePayload[0]?.payload);
                  }
                }}
                onMouseLeave={() => setHoveredData(null)}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#454545"
                  opacity={0.3}
                />
                <XAxis dataKey="month" stroke="#b3b3b3" fontSize={12} />
                <YAxis
                  stroke="#b3b3b3"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {showIncome && (
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#2E8B57"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    name="Ingresos"
                  />
                )}

                {showExpenses && (
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    name="Gastos"
                  />
                )}

                {showSavings && (
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#8FBC8F"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    name="Ahorro"
                  />
                )}
              </LineChart>
            ) : chartType === "area" ? (
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#454545"
                  opacity={0.3}
                />
                <XAxis dataKey="month" stroke="#b3b3b3" fontSize={12} />
                <YAxis
                  stroke="#b3b3b3"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {showIncome && (
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#2E8B57"
                    fill="#2E8B57"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    name="Ingresos"
                  />
                )}

                {showExpenses && (
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    name="Gastos"
                  />
                )}

                {showSavings && (
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#8FBC8F"
                    fill="#8FBC8F"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    name="Ahorro"
                  />
                )}
              </AreaChart>
            ) : (
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#454545"
                  opacity={0.3}
                />
                <XAxis dataKey="month" stroke="#b3b3b3" fontSize={12} />
                <YAxis
                  stroke="#b3b3b3"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {showIncome && (
                  <Bar
                    dataKey="income"
                    fill="#2E8B57"
                    fillOpacity={0.8}
                    name="Ingresos"
                  />
                )}

                {showExpenses && (
                  <Bar
                    dataKey="expenses"
                    fill="#EF4444"
                    fillOpacity={0.8}
                    name="Gastos"
                  />
                )}

                {showSavings && (
                  <Bar
                    dataKey="savings"
                    fill="#8FBC8F"
                    fillOpacity={0.8}
                    name="Ahorro"
                  />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>

          {/* Indicador de datos en hover */}
          {hoveredData && (
            <div className="absolute top-4 right-4 bg-bg-200/90 backdrop-blur-md border border-bg-300/50 rounded-xl p-4 shadow-xl">
              <div className="text-sm text-text-200 mb-2">
                Mes: {hoveredData.month}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-primary-100 rounded-full"></div>
                    <span className="text-sm">Ingresos:</span>
                  </div>
                  <span className="font-bold text-primary-200">
                    {formatCurrency(hoveredData.income)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Gastos:</span>
                  </div>
                  <span className="font-bold text-red-400">
                    {formatCurrency(hoveredData.expenses)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-accent-100 rounded-full"></div>
                    <span className="text-sm">Ahorro:</span>
                  </div>
                  <span className="font-bold text-accent-100">
                    {formatCurrency(hoveredData.savings)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Estadísticas rápidas */}
        {detailed && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <div className="text-sm text-text-200">Ingreso Promedio</div>
              <div className="text-2xl font-bold text-primary-200 mt-1">
                {formatCurrency(4250)}
              </div>
              <div className="text-xs text-primary-200 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% vs período anterior
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <div className="text-sm text-text-200">Gasto Promedio</div>
              <div className="text-2xl font-bold text-red-400 mt-1">
                {formatCurrency(3120)}
              </div>
              <div className="text-xs text-primary-200 mt-1 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -8.2% vs período anterior
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <div className="text-sm text-text-200">Ahorro Promedio</div>
              <div className="text-2xl font-bold text-accent-100 mt-1">
                {formatCurrency(1130)}
              </div>
              <div className="text-xs text-primary-200 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +25.3% vs período anterior
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <div className="text-sm text-text-200">Tasa de Ahorro</div>
              <div className="text-2xl font-bold text-text-100 mt-1">26.6%</div>
              <div className="text-xs text-primary-200 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3.2 puntos porcentuales
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialTrendsChart;
