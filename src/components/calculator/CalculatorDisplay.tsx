// src/components/calculator/CalculatorDisplay.tsx
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface CalculatorDisplayProps {
  value: string;
  history: string;
  isError: boolean;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  value,
  history,
  isError,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValueRef = useRef(value);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
    prevValueRef.current = value;
  }, [value]);

  // Formatear el valor para mostrar
  const formatDisplayValue = (val: string) => {
    if (val === "Error" || val === "Infinity" || val === "NaN") {
      return val;
    }

    // Si es un número muy largo, usar notación científica
    if (val.length > 12 && !val.includes("e")) {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        return num.toExponential(6);
      }
    }

    return val;
  };

  const displayValue = formatDisplayValue(value);

  return (
    <div className="mb-6">
      {/* Historial de operación */}
      <div className="mb-3">
        <div className="text-sm text-text-200/70 font-mono min-h-[20px] overflow-x-auto whitespace-nowrap scrollbar-thin px-1">
          {history || " "}
        </div>
      </div>

      {/* Display Principal */}
      <div
        ref={displayRef}
        className={cn(
          "relative p-6 rounded-2xl border-2 bg-gradient-to-br from-bg-200/60 to-bg-300/30 backdrop-blur-md overflow-hidden group",
          isError
            ? "border-red-500/40 bg-gradient-to-br from-red-500/10 to-red-400/5 shadow-lg shadow-red-500/10"
            : "border-primary-200/40 bg-gradient-to-br from-primary-100/5 via-primary-200/3 to-primary-300/2 shadow-lg shadow-primary-100/10",
          isAnimating && !isError && "ring-2 ring-primary-200/50"
        )}
      >
        {/* Efecto de gradiente animado en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-primary-200/5 to-primary-300/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Brillo de borde superior */}
        <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>

        {/* Efecto de partículas para números grandes */}
        {displayValue.length > 8 && !isError && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute top-0 left-1/4 w-1 h-1 bg-primary-200/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 right-1/3 w-1.5 h-1.5 bg-primary-300/10 rounded-full animate-pulse delay-300"></div>
          </div>
        )}

        {/* Contenido Principal */}
        <div className="relative">
          {/* Valor numérico */}
          <div
            className={cn(
              "text-4xl sm:text-5xl lg:text-6xl font-bold text-right font-mono transition-all duration-300",
              isError ? "text-red-400" : "text-text-100",
              isAnimating && !isError && "scale-105",
              displayValue.length > 10 && "text-3xl sm:text-4xl lg:text-5xl"
            )}
          >
            {displayValue}
          </div>

          {/* Indicadores Inferiores */}
          <div className="absolute bottom-0 left-0 flex items-center gap-2 mt-2">
            {isError && (
              <div className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                Error Matemático
              </div>
            )}

            {displayValue.includes("e") && !isError && (
              <div className="text-xs text-text-200/50 bg-bg-300/30 px-2 py-1 rounded-full">
                Notación Científica
              </div>
            )}

            {value.length > 12 && !isError && !displayValue.includes("e") && (
              <div className="text-xs text-text-200/50 bg-bg-300/30 px-2 py-1 rounded-full">
                {value.length} dígitos
              </div>
            )}
          </div>

          {/* Indicador de actualización (animación) */}
          {isAnimating && !isError && (
            <div className="absolute -top-2 -right-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-200 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-3 h-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full border border-primary-300/50"></div>
              </div>
            </div>
          )}
        </div>

        {/* Efecto de brillo para números grandes */}
        {!isError && displayValue.length > 15 && (
          <div className="absolute inset-0 bg-gradient-to-t from-primary-200/5 via-transparent to-transparent pointer-events-none"></div>
        )}
      </div>

      {/* Información adicional debajo del display */}
      <div className="mt-3 flex items-center justify-between text-xs text-text-200/50 px-1"></div>
    </div>
  );
};

export default CalculatorDisplay;
