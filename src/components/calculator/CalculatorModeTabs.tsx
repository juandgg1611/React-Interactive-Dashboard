// src/components/calculator/CalculatorModeTabs.tsx
import React from "react";
import { cn } from "../../lib/utils";

interface CalculatorModeTabsProps {
  activeMode: "basic" | "scientific" | "financial";
  onModeChange: (mode: "basic" | "scientific" | "financial") => void;
}

const CalculatorModeTabs: React.FC<CalculatorModeTabsProps> = ({
  activeMode,
  onModeChange,
}) => {
  const tabs = [
    {
      id: "basic",
      label: "Básica",
      icon: "🧮",
      description: "Operaciones básicas",
    },
    {
      id: "scientific",
      label: "Científica",
      icon: "🔬",
      description: "Funciones avanzadas",
    },
    {
      id: "financial",
      label: "Financiera",
      icon: "💰",
      description: "Cálculos financieros",
    },
  ] as const;

  return (
    <div className="w-full mb-6">
      {/* Header con título */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-100">
            Calculadora
          </h1>
          <p className="text-text-200/70 text-sm mt-1">
            {activeMode === "basic" && "Operaciones matemáticas básicas"}
            {activeMode === "scientific" && "Funciones científicas avanzadas"}
            {activeMode === "financial" &&
              "Herramientas financieras profesionales"}
          </p>
        </div>

        {/* Selector de modo para móvil */}
        <div className="md:hidden w-full">
          <select
            value={activeMode}
            onChange={(e) => onModeChange(e.target.value as any)}
            className="w-full bg-bg-200 border border-bg-300/50 rounded-lg px-4 py-2.5 text-text-100 focus:outline-none focus:ring-2 focus:ring-primary-200/50"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.icon} {tab.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pestañas para desktop */}
      <div className="hidden md:flex space-x-1 p-1 bg-bg-200/50 rounded-xl border border-bg-300/30">
        {tabs.map((tab) => {
          const isActive = activeMode === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onModeChange(tab.id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 px-4 rounded-lg transition-all duration-300",
                "hover:bg-bg-300/30 hover:scale-[1.02]",
                isActive
                  ? "bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-200/30 text-primary-200 shadow-lg"
                  : "text-text-200 hover:text-text-100",
              )}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xl">{tab.icon}</span>
                <span className="font-semibold">{tab.label}</span>
              </div>
              <span
                className={cn(
                  "text-xs transition-opacity duration-200",
                  isActive ? "opacity-100" : "opacity-70",
                )}
              >
                {tab.description}
              </span>

              {/* Indicador activo */}
              {isActive && (
                <div className="mt-2 w-1/3 h-0.5 bg-gradient-to-r from-primary-200 to-primary-100 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalculatorModeTabs;
