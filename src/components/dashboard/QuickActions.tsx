// src/components/dashboard/QuickActions.tsx
import React from "react";
import {
  PlusCircle,
  Target,
  FolderPlus,
  Wallet,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Registrar Ingreso",
      description: "Agregar un nuevo ingreso",
      icon: TrendingUp,
      color: "from-primary-100 to-primary-200",
      bg: "bg-primary-100/10",
      border: "border-primary-100/30",
    },
    {
      id: 2,
      title: "Registrar Egreso",
      description: "Agregar un nuevo gasto",
      icon: CreditCard,
      color: "from-accent-100 to-accent-200",
      bg: "bg-accent-100/10",
      border: "border-accent-100/30",
    },
    {
      id: 3,
      title: "Nueva Meta de Ahorro",
      description: "Crear objetivo de ahorro",
      icon: Target,
      color: "from-primary-200 to-primary-300",
      bg: "bg-primary-300/10",
      border: "border-primary-300/30",
    },
    {
      id: 4,
      title: "Crear Categoría",
      description: "Agregar categoría personalizada",
      icon: FolderPlus,
      color: "from-primary-300 to-primary-100",
      bg: "bg-primary-100/10",
      border: "border-primary-100/30",
    },
  ];

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-text-100 flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary-200" />
              Acciones Rápidas
            </CardTitle>
            <CardDescription className="text-text-200">
              Acciones frecuentes en un clic
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className={`h-auto py-4 ${action.border} ${
                action.bg
              } hover:${action.border.replace(
                "30",
                "50"
              )} transition-all duration-300 group`}
            >
              <div className="text-left w-full">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      action.bg
                    } group-hover:${action.bg.replace(
                      "10",
                      "20"
                    )} transition-colors`}
                  >
                    <action.icon className="h-4 w-4 text-text-100" />
                  </div>
                  <span className="font-semibold text-text-100">
                    {action.title}
                  </span>
                </div>
                <p className="text-xs text-text-200">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
