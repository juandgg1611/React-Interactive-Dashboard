// src/components/features/FeatureCategory.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronRight, CheckCircle, Zap, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

export interface FeatureCategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const FeatureCategory: React.FC<FeatureCategoryProps> = ({
  title,
  description,
  icon,
  color,
  features,
}) => {
  return (
    <Card className="group border-0 bg-gradient-to-br from-bg-200/40 to-bg-300/30 backdrop-blur-sm hover:from-bg-200 hover:to-bg-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-100/20 relative overflow-hidden h-full">
      {/* Línea animada superior */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-300/0 via-primary-200/0 to-accent-100/0 group-hover:from-primary-300/5 group-hover:via-primary-200/10 group-hover:to-accent-100/5 transition-all duration-500 rounded-xl" />

      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-white relative z-10">{icon}</div>
          </div>
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 text-primary-300 mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-xs font-semibold bg-gradient-to-r from-primary-200 to-primary-300 bg-clip-text text-transparent">
              Investigación
            </span>
          </div>
        </div>
        <CardTitle className="text-xl text-text-100 group-hover:text-primary-300 transition-colors duration-300 flex items-center justify-between">
          {title}
          <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
        </CardTitle>
        <p className="text-text-200 mt-2 text-sm">{description}</p>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-text-100 text-sm flex items-center">
            <Zap className="h-3 w-3 mr-2 text-primary-300" />
            Características Principales
          </h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-3 w-3 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-text-200/80 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-primary-300/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-text-200/60">
                Estado de Investigación
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                <div className="text-sm font-medium text-green-400">
                  Validado
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-primary-300/30 text-primary-300 hover:bg-primary-300/10 hover:border-primary-300 group"
            >
              <span className="text-xs">Ver Detalles</span>
              <ChevronRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCategory;
