import React from "react";
import {
  Brain,
  Zap,
  AlertCircle,
  TrendingUp,
  Target,
  Lightbulb,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TransactionInsight } from "../../types/transaction.types";

interface TransactionInsightsProps {
  insights: TransactionInsight[];
}

const TransactionInsights: React.FC<TransactionInsightsProps> = ({
  insights,
}) => {
  const getInsightIcon = (type: TransactionInsight["type"]) => {
    switch (type) {
      case "saving":
        return <Target className="h-4 w-4 text-green-400" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case "tip":
        return <Lightbulb className="h-4 w-4 text-blue-400" />;
      case "pattern":
        return <TrendingUp className="h-4 w-4 text-purple-400" />;
      default:
        return <Brain className="h-4 w-4 text-primary-200" />;
    }
  };

  const getInsightColor = (type: TransactionInsight["type"]) => {
    switch (type) {
      case "saving":
        return "from-green-500/10 to-green-500/5 border-green-500/20";
      case "warning":
        return "from-yellow-500/10 to-yellow-500/5 border-yellow-500/20";
      case "tip":
        return "from-blue-500/10 to-blue-500/5 border-blue-500/20";
      case "pattern":
        return "from-purple-500/10 to-purple-500/5 border-purple-500/20";
      default:
        return "from-primary-100/10 to-primary-100/5 border-primary-100/20";
    }
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-text-100 text-xl flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary-200" />
              Insights de IA
            </CardTitle>
            <CardDescription className="text-text-200">
              Análisis predictivo basado en tus patrones de gasto
            </CardDescription>
          </div>
          <Badge className="bg-gradient-to-r from-primary-100/30 to-primary-200/30 text-primary-200 border-primary-100/40">
            <Zap className="h-3 w-3 mr-1.5" />
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
              )} hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex items-start gap-4">
                {/* Icono */}
                <div className="p-3 rounded-lg bg-bg-300/20 border border-bg-300/40 group-hover:scale-110 transition-transform duration-300">
                  {getInsightIcon(insight.type)}
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-text-100">
                      {insight.title}
                    </h4>
                    <Badge
                      variant="outline"
                      className="text-xs border-bg-300/50 text-text-200"
                    >
                      {insight.impact > 0
                        ? `+$${insight.impact}`
                        : `-$${Math.abs(insight.impact)}`}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-200 mb-3">
                    {insight.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-xs border-primary-200/30 text-primary-200"
                    >
                      {insight.category}
                    </Badge>

                    {insight.actionLabel && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-primary-200 hover:text-primary-300 hover:bg-primary-100/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={insight.action}
                      >
                        {insight.actionLabel}
                        <TrendingUp className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recomendación adicional */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary-100/10 to-primary-200/5 border border-primary-100/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary-100/20">
              <Brain className="h-4 w-4 text-primary-200" />
            </div>
            <div>
              <p className="text-sm text-text-100 font-medium mb-1">
                Predicción IA para el próximo mes
              </p>
              <p className="text-xs text-text-200">
                Basado en tus patrones, podrías ahorrar aproximadamente $450
                adicionales optimizando gastos recurrentes y aprovechando
                promociones detectadas.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionInsights;
