import React from "react";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

interface TransactionChartsProps {
  // Datos para gráficos
}

const TransactionCharts: React.FC<TransactionChartsProps> = () => {
  // Datos de ejemplo para gráficos
  const categoryData = [
    { name: "Alimentación", value: 1200, color: "#2E8B57" },
    { name: "Transporte", value: 800, color: "#61bc84" },
    { name: "Entretenimiento", value: 600, color: "#8FBC8F" },
    { name: "Compras", value: 1000, color: "#c6ffe6" },
    { name: "Servicios", value: 700, color: "#345e37" },
    { name: "Salud", value: 550, color: "#2E8B57" },
    { name: "Educación", value: 450, color: "#61bc84" },
  ];

  const monthlyData = [
    { month: "Sept", income: 4200, expenses: 3800 },
    { month: "Oct", income: 4300, expenses: 4100 },
    { month: "Nov", income: 4700, expenses: 4500 },
    { month: "Dic", income: 5000, expenses: 4900 },
    { month: "Ene", income: 4500, expenses: 3250 },
  ];

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const income =
        payload.find((p: any) => p.dataKey === "income")?.value || 0;
      const expenses =
        payload.find((p: any) => p.dataKey === "expenses")?.value || 0;
      const net = income - expenses;

      return (
        <div className="bg-bg-200/95 backdrop-blur-md p-3 rounded-lg border border-bg-300 shadow-lg">
          <p className="text-text-100 font-semibold mb-2 text-sm">{label}</p>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-200">Ingresos:</span>
              <span className="text-xs font-semibold text-green-400">
                ${income.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-200">Gastos:</span>
              <span className="text-xs font-semibold text-red-400">
                ${expenses.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-bg-300/50">
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-100">Neto:</span>
                <span
                  className={`text-xs font-bold ${
                    net >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  ${Math.abs(net).toLocaleString()} {net >= 0 ? "↑" : "↓"}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const PieCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = categoryData.reduce((acc, cur) => acc + cur.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);

      return (
        <div className="bg-bg-200/95 backdrop-blur-md p-3 rounded-lg border border-bg-300 shadow-lg min-w-[160px]">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: data.payload.color }}
            />
            <p className="text-text-100 font-semibold text-sm truncate">
              {data.name}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-200">Monto:</span>
              <span className="text-xs font-semibold text-text-100">
                ${data.value.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-200">%:</span>
              <span className="text-xs font-semibold text-primary-200">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalValue = categoryData.reduce((acc, cur) => acc + cur.value, 0);
  const totalMonthlyIncome = monthlyData.reduce(
    (acc, cur) => acc + cur.income,
    0
  );
  const totalMonthlyExpenses = monthlyData.reduce(
    (acc, cur) => acc + cur.expenses,
    0
  );
  const netGrowth = (
    ((totalMonthlyIncome - totalMonthlyExpenses) / totalMonthlyExpenses) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Estadísticas Resumen - Más compactas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 bg-gradient-to-br from-primary-100/10 to-primary-200/5 backdrop-blur-md border border-primary-100/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-200 mb-1">Ingresos Totales</p>
                <p className="text-2xl font-bold text-text-100">
                  ${(totalMonthlyIncome / 1000).toFixed(1)}k
                </p>
              </div>
              <div className="p-2 rounded-full bg-primary-100/20">
                <TrendingUp className="h-5 w-5 text-primary-200" />
              </div>
            </div>
            <div className="mt-2">
              <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-xs px-2 py-0.5">
                +15.2%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-200 mb-1">Gastos Totales</p>
                <p className="text-2xl font-bold text-text-100">
                  ${(totalMonthlyExpenses / 1000).toFixed(1)}k
                </p>
              </div>
              <div className="p-2 rounded-full bg-red-400/20">
                <TrendingDown className="h-5 w-5 text-red-400" />
              </div>
            </div>
            <div className="mt-2">
              <Badge className="bg-red-400/20 text-red-400 border-red-400/30 text-xs px-2 py-0.5">
                -8.7%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-accent-100/10 to-accent-200/5 backdrop-blur-md border border-accent-100/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-200 mb-1">Crecimiento Neto</p>
                <p className="text-2xl font-bold text-text-100">{netGrowth}%</p>
              </div>
              <div className="p-2 rounded-full bg-accent-100/20">
                <DollarSign className="h-5 w-5 text-accent-200" />
              </div>
            </div>
            <div className="mt-2">
              <Badge
                className={`${
                  parseFloat(netGrowth) >= 0
                    ? "bg-green-400/20 text-green-400 border-green-400/30"
                    : "bg-red-400/20 text-red-400 border-red-400/30"
                } text-xs px-2 py-0.5`}
              >
                {parseFloat(netGrowth) >= 0 ? "Positivo" : "Negativo"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principales - Más compactos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras - Evolución Mensual */}
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
          <CardHeader className="pb-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                  <BarChart3 className="h-4 w-4 text-primary-200" />
                </div>
                <CardTitle className="text-lg font-bold text-text-100">
                  Evolución Mensual
                </CardTitle>
              </div>
              <CardDescription className="text-text-200 text-sm">
                Ingresos vs Gastos últimos 5 meses
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2d2d2d"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#e0e0e0"
                    tick={{ fill: "#e0e0e0", fontSize: 12 }}
                    axisLine={{ stroke: "#454545" }}
                    tickLine={{ stroke: "#454545" }}
                    interval={0}
                  />
                  <YAxis
                    stroke="#e0e0e0"
                    tick={{ fill: "#e0e0e0", fontSize: 11 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    axisLine={{ stroke: "#454545" }}
                    tickLine={{ stroke: "#454545" }}
                    width={50}
                  />
                  <Tooltip
                    content={<CustomBarTooltip />}
                    cursor={{ fill: "rgba(46, 139, 87, 0.1)" }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={30}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "12px", paddingBottom: "10px" }}
                  />
                  <Bar
                    dataKey="income"
                    name="Ingresos"
                    fill="#2E8B57"
                    radius={[4, 4, 0, 0]}
                    className="hover:opacity-90 transition-opacity"
                    maxBarSize={40}
                  />
                  <Bar
                    dataKey="expenses"
                    name="Gastos"
                    fill="#8FBC8F"
                    radius={[4, 4, 0, 0]}
                    className="hover:opacity-90 transition-opacity"
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-3 border-t border-bg-300/40">
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-100" />
                  <span className="text-xs text-text-200">
                    Ingresos prom: $4,540
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-100" />
                  <span className="text-xs text-text-200">
                    Gastos prom: $4,110
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Donas - Distribución por Categoría */}
        <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-xl">
          <CardHeader className="pb-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-gradient-to-br from-primary-100/20 to-primary-200/10">
                    <PieChart className="h-4 w-4 text-primary-200" />
                  </div>
                  <CardTitle className="text-lg font-bold text-text-100">
                    Gastos por Categoría
                  </CardTitle>
                </div>
                <Badge className="bg-primary-100/20 text-primary-200 border-primary-100/30 text-xs px-2 py-1">
                  ${totalValue.toLocaleString()}
                </Badge>
              </div>
              <CardDescription className="text-text-200 text-sm">
                Distribución del mes actual
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Gráfico de dona optimizado */}
              <div className="h-56 w-56 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={1}
                      dataKey="value"
                      nameKey="name"
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="#1E1E1E"
                          strokeWidth={1.5}
                          className="hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<PieCustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>

                {/* Texto central compacto */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-2xl font-bold text-text-100 mb-0.5">
                    ${totalValue.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-200">Total</div>
                  <div className="text-xs text-text-200/70 mt-0.5">
                    {categoryData.length} cats.
                  </div>
                </div>
              </div>

              {/* Leyenda optimizada */}
              <div className="space-y-2 flex-1 min-w-[180px] max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {categoryData.map((category, index) => {
                  const percentage = (
                    (category.value / totalValue) *
                    100
                  ).toFixed(1);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md bg-bg-300/10 hover:bg-bg-300/20 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                        />
                        <span
                          className="text-xs text-text-200 truncate"
                          title={category.name}
                        >
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <div className="text-xs font-semibold text-text-100">
                            ${category.value.toLocaleString()}
                          </div>
                          <div className="text-xs text-text-200/70">
                            {percentage}%
                          </div>
                        </div>
                        <div className="w-12">
                          <div className="h-1.5 bg-bg-300 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: category.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info adicional compacta */}
            <div className="mt-4 pt-3 border-t border-bg-300/40">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xs text-text-200 mb-1">Mayor gasto</div>
                  <div className="text-sm font-semibold text-text-100 truncate">
                    {
                      categoryData.reduce((max, cat) =>
                        cat.value > max.value ? cat : max
                      ).name
                    }
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-text-200 mb-1">Menor gasto</div>
                  <div className="text-sm font-semibold text-text-100 truncate">
                    {
                      categoryData.reduce((min, cat) =>
                        cat.value < min.value ? cat : min
                      ).name
                    }
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionCharts;
