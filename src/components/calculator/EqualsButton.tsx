// src/components/calculator/EqualsButton.tsx
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Equal, Check, RotateCcw, Sparkles } from "lucide-react";

interface EqualsButtonProps {
  onClick: () => void;
  isActive?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  result?: string | number;
  disabled?: boolean;
  className?: string;
  size?: "normal" | "large";
  onMouseEnter?: () => void; // AÑADIDO
  onMouseLeave?: () => void; // AÑADIDO
}

const EqualsButton: React.FC<EqualsButtonProps> = ({
  onClick,
  isActive = false,
  isLoading = false,
  isError = false,
  result,
  disabled = false,
  className,
  onMouseEnter, // AÑADIDO
  onMouseLeave, // AÑADIDO
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled || isLoading) return;
    onClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.(); // LLAMADA A LA PROP
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave?.(); // LLAMADA A LA PROP
  };

  const formatResult = () => {
    if (!result) return null;
    if (typeof result === "number") {
      // Formatear números grandes de manera legible
      if (Math.abs(result) >= 1000000) {
        return result.toExponential(3);
      }
      return result.toLocaleString(undefined, {
        maximumFractionDigits: 6,
        minimumFractionDigits: 0,
      });
    }
    return result;
  };

  const formattedResult = formatResult();

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter} // USADO AQUÍ
      onMouseLeave={handleMouseLeave} // USADO AQUÍ
      disabled={disabled || isLoading}
      className={cn(
        // Base
        "relative overflow-hidden transition-all duration-300",
        "flex items-center justify-center",
        "rounded-xl border-2",
        "w-full h-16 sm:h-20",
        "group",

        // Estados
        isLoading && "opacity-80 cursor-wait",
        disabled && "opacity-50 cursor-not-allowed",

        // Colores según estado - VERDES MÁS OSCUROS
        isError
          ? "border-red-600/30 bg-gradient-to-br from-red-700/30 to-red-800/40"
          : isActive
          ? "border-primary-300/80 bg-gradient-to-br from-primary-200/50 via-primary-300/30 to-primary-200/40"
          : "border-primary-200/60 bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-primary-300/10",

        // Sombra - MÁS OSCURA
        !isError && "shadow-lg",
        isError
          ? "shadow-red-600/25"
          : "shadow-primary-200/25 hover:shadow-primary-300/35",

        // Hover effect - TONOS MÁS PROFUNDOS
        !disabled &&
          !isLoading &&
          !isError &&
          "hover:border-primary-300/80 hover:shadow-xl hover:shadow-primary-300/30",

        className
      )}
      aria-label={
        isLoading
          ? "Calculando..."
          : isError
          ? "Error - Reintentar"
          : "Calcular resultado"
      }
    >
      {/* Fondo animado - Onda sutil */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent",
            "translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
          )}
        />
      </div>

      {/* Borde luminoso en hover - MÁS OSCURO */}
      {isHovered && !isError && !isLoading && (
        <div className="absolute inset-0 rounded-xl border-2 border-primary-300/40 animate-pulse" />
      )}

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-between w-full px-4 sm:px-6">
        {/* Estado de carga */}
        {isLoading ? (
          <div className="flex items-center justify-center w-full gap-3">
            <div className="relative">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <Sparkles className="absolute inset-0 w-6 h-6 text-primary-300 animate-pulse" />
            </div>
            <span className="text-white font-medium">Calculando...</span>
          </div>
        ) : isError ? (
          // Estado de error
          <div className="flex items-center justify-center w-full gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-red-600/25 rounded-full animate-ping" />
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <div className="text-white font-bold">Error</div>
              <div className="text-white/70 text-sm">Reintentar</div>
            </div>
          </div>
        ) : (
          // Estado normal
          <>
            {/* Sección izquierda - Icono y acción */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  isActive
                    ? "bg-primary-300/25"
                    : "bg-white/10 group-hover:bg-primary-200/25"
                )}
              >
                <Equal
                  className={cn(
                    "w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300",
                    isActive
                      ? "text-primary-300 scale-110"
                      : "text-white group-hover:text-primary-200 group-hover:scale-110"
                  )}
                />
              </div>
            </div>

            {/* Sección central - Símbolo igual y resultado */}
            <div className="flex flex-col items-center">
              {/* Símbolo igual con animación */}
              <div className="relative">
                {/* Aura para estado activo - MÁS OSCURO */}
                {isActive && (
                  <div className="absolute -inset-3 bg-gradient-to-r from-primary-200/15 to-primary-300/10 rounded-full animate-pulse" />
                )}

                {/* Símbolo principal */}
                <div
                  className={cn(
                    "text-3xl sm:text-4xl font-black transition-all duration-300",
                    isActive
                      ? "text-primary-300 scale-110"
                      : "text-white group-hover:scale-105"
                  )}
                >
                  =
                </div>
              </div>

              {/* Indicador de resultado */}
              <div className="flex items-center gap-2 mt-2">
                {formattedResult ? (
                  <>
                    <span className="text-white/90 text-lg sm:text-xl font-semibold">
                      Resultado
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-primary-300 animate-pulse" />
                    <span className="text-white/70 text-sm">
                      Presiona Enter
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Sección derecha - Resultado */}
            <div className="flex flex-col items-end">
              <div className="text-white/60 text-xs mb-1 hidden sm:block">
                Total
              </div>
              <div
                className={cn(
                  "px-3 py-2 rounded-lg backdrop-blur-sm transition-all duration-300",
                  formattedResult
                    ? "bg-primary-300/15 border border-primary-300/30"
                    : "bg-white/10 border border-white/15"
                )}
              >
                {formattedResult ? (
                  <div className="font-mono text-white font-bold text-sm sm:text-base truncate max-w-[100px] sm:max-w-[120px]">
                    {formattedResult}
                  </div>
                ) : (
                  <div className="text-white/40 text-sm italic">--</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Efecto de brillo superior - MÁS SUAVE */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/15 to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none" />

      {/* Puntos brillantes en las esquinas - MÁS OSCURO */}
      {isHovered && !isError && !isLoading && (
        <>
          <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-primary-300/80 rounded-full animate-ping" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary-300/80 rounded-full animate-ping delay-100" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-primary-300/80 rounded-full animate-ping delay-200" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-primary-300/80 rounded-full animate-ping delay-300" />
        </>
      )}

      {/* Efecto de profundidad adicional */}
      <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none" />
    </button>
  );
};

export default EqualsButton;
