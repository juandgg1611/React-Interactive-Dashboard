import React from "react";
import {
  Brain,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Award,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { BudgetInsight } from "../../types/budget.types";

interface BudgetInsightsProps {
  insights: BudgetInsight[];
}

const BudgetInsights: React.FC<BudgetInsightsProps> = ({ insights }) => {
  const getInsightIcon = (type: BudgetInsight["type"]) => {
    switch (type) {
      case "saving":
        return <TrendingUp className="h-5 w-5 text-green-400" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case "tip":
        return <Lightbulb className="h-5 w-5 text-blue-400" />;
      case "achievement":
        return <Award className="h-5 w-5 text-purple-400" />;
      default:
        return <Brain className="h-5 w-5 text-primary-200" />;
    }
  };

  const getInsightColor = (type: BudgetInsight["type"]) => {
    switch (type) {
      case "saving":
        return "from-green-500/20 to-green-400/10";
      case "warning":
        return "from-yellow-500/20 to-yellow-400/10";
      case "tip":
        return "from-blue-500/20 to-blue-400/10";
      case "achievement":
        return "from-purple-500/20 to-purple-400/10";
      default:
        return "from-primary-100/20 to-primary-200/10";
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact > 0) return "text-green-400";
    if (impact < 0) return "text-red-400";
    return "text-text-200";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary-200" />
              Insights de IA
            </CardTitle>
            <p className="text-sm text-text-200">
              Recomendaciones basadas en tus patrones
            </p>
          </div>
          <Badge className="bg-primary-100/20 text-primary-200 border-primary-100/30">
            <Brain className="h-3 w-3 mr-1" />
            95% precisión
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-xl bg-gradient-to-r ${getInsightColor(
                insight.type
              )} border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300 group`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-bg-300/30">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-text-100">
                      {insight.title}
                    </h4>
                    <span
                      className={`text-sm font-medium ${getImpactColor(
                        insight.impact
                      )}`}
                    >
                      {insight.impact > 0 ? "+" : insight.impact < 0 ? "-" : ""}
                      {insight.impact !== 0 && formatCurrency(insight.impact)}
                    </span>
                  </div>
                  <p className="text-sm text-text-200 mt-2">
                    {insight.description}
                  </p>
                  {insight.actionText && (
                    <div className="flex items-center justify-between mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary-200 hover:text-primary-300 p-0 h-auto"
                      >
                        {insight.actionText}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Badge
                        variant="outline"
                        className="text-xs border-bg-300/50 text-text-200"
                      >
                        {insight.type === "saving"
                          ? "Ahorro"
                          : insight.type === "warning"
                          ? "Alerta"
                          : insight.type === "tip"
                          ? "Consejo"
                          : "Logro"}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/30">
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-primary-200" />
            <div>
              <p className="text-sm text-text-100">
                <span className="font-medium">IA Financiera:</span> Analiza 150+
                factores para optimizar tu presupuesto
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetInsights;
