// src/components/calculator/FunctionButton.tsx
import React, { useState } from "react";
import {
  Brain,
  Zap,
  Target,
  BarChart3,
  Calculator as CalcIcon,
  Hash,
  Infinity as InfinityIcon,
  Parentheses,
  Sigma,
  DivideCircle,
  PercentCircle,
  Power,
  SquareDot,
} from "lucide-react";
import { cn } from "../../lib/utils";

type FunctionType =
  | "sin" // Seno
  | "cos" // Coseno
  | "tan" // Tangente
  | "log" // Logaritmo base 10
  | "ln" // Logaritmo natural
  | "exp" // Exponencial e^x
  | "factorial" // Factorial
  | "reciprocal" // 1/x
  | "square" // x²
  | "cube" // x³
  | "sqrt" // √x
  | "cbrt" // ³√x
  | "pow" // x^y
  | "mod" // Módulo
  | "abs" // Valor absoluto
  | "floor" // Piso
  | "ceil" // Techo
  | "round"; // Redondear

interface FunctionButtonProps {
  functionType: FunctionType;
  onClick: (func: FunctionType) => void;
  isActive?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  mode?: "basic" | "scientific" | "financial";
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const FunctionButton: React.FC<FunctionButtonProps> = ({
  functionType,
  onClick,
  isActive = false,
  disabled = false,
  showLabel = true,
  mode = "scientific",
  className,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const handleInteractionStart = () => {
    if (disabled) return;

    setIsPressed(true);
    setGlowIntensity(1);

    // Efecto de sonido para función
    playFunctionSound(functionType);

    // Efecto de vibración sutil (opcional)
    if ("vibrate" in navigator) {
      navigator.vibrate?.(10);
    }
  };

  const handleInteractionEnd = () => {
    setIsPressed(false);
    setGlowIntensity(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    onClick(functionType);
  };

  const playFunctionSound = (func: FunctionType) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configuración según tipo de función
      let frequency = 440;
      let filterFreq = 1000;
      let type: OscillatorType = "sine";
      let filterType: BiquadFilterType = "lowpass";

      switch (func) {
        case "sin":
        case "cos":
        case "tan":
          frequency = 523.25; // Do
          type = "sine";
          filterType = "lowpass";
          break;
        case "log":
        case "ln":
          frequency = 349.23; // Fa
          type = "triangle";
          filterType = "bandpass";
          break;
        case "exp":
          frequency = 659.25; // Mi
          type = "sawtooth";
          filterType = "highpass";
          break;
        case "factorial":
          frequency = 220; // La bajo
          type = "square";
          filterType = "lowpass";
          break;
        case "square":
        case "cube":
          frequency = 587.33; // Re
          type = "triangle";
          filterType = "lowpass";
          break;
        case "sqrt":
        case "cbrt":
          frequency = 392; // Sol
          type = "sine";
          filterType = "lowpass";
          break;
        default:
          frequency = 440;
          type = "sine";
      }

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      filter.frequency.setValueAtTime(filterFreq, audioContext.currentTime);
      filter.type = filterType;

      // Envelope complejo para funciones
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      oscillator.start();
      oscillator.stop(now + 0.15);
    } catch (error) {
      // Fallback silencioso
    }
  };

  // Obtener icono o símbolo para la función
  const getFunctionSymbol = () => {
    switch (functionType) {
      case "sin":
        return <span className="text-sm md:text-base font-bold">sin</span>;
      case "cos":
        return <span className="text-sm md:text-base font-bold">cos</span>;
      case "tan":
        return <span className="text-sm md:text-base font-bold">tan</span>;
      case "log":
        return <span className="text-sm md:text-base font-bold">log</span>;
      case "ln":
        return <span className="text-sm md:text-base font-bold">ln</span>;
      case "exp":
        return <span className="text-sm md:text-base font-bold">eˣ</span>;
      case "factorial":
        return <span className="text-lg md:text-xl font-bold">x!</span>;
      case "reciprocal":
        return <span className="text-sm md:text-base font-bold">1/x</span>;
      case "square":
        return <Power className="h-4 w-4 md:h-5 md:w-5" />;
      case "cube":
        return <span className="text-sm md:text-base font-bold">x³</span>;
      case "sqrt":
        return <SquareDot className="h-4 w-4 md:h-5 md:w-5" />;
      case "cbrt":
        return <span className="text-sm md:text-base font-bold">³√x</span>;
      case "pow":
        return <span className="text-sm md:text-base font-bold">xʸ</span>;
      case "mod":
        return <span className="text-sm md:text-base font-bold">mod</span>;
      case "abs":
        return <span className="text-sm md:text-base font-bold">|x|</span>;
      case "floor":
        return <span className="text-sm md:text-base font-bold">⌊x⌋</span>;
      case "ceil":
        return <span className="text-sm md:text-base font-bold">⌈x⌉</span>;
      case "round":
        return <span className="text-sm md:text-base font-bold">round</span>;
      default:
        return <span className="text-sm md:text-base font-bold">ƒ</span>;
    }
  };

  // Obtener label descriptivo
  const getFunctionLabel = () => {
    switch (functionType) {
      case "sin":
        return "Seno";
      case "cos":
        return "Coseno";
      case "tan":
        return "Tangente";
      case "log":
        return "Logaritmo base 10";
      case "ln":
        return "Logaritmo natural";
      case "exp":
        return "Exponencial e^x";
      case "factorial":
        return "Factorial";
      case "reciprocal":
        return "Recíproco (1/x)";
      case "square":
        return "Cuadrado";
      case "cube":
        return "Cubo";
      case "sqrt":
        return "Raíz cuadrada";
      case "cbrt":
        return "Raíz cúbica";
      case "pow":
        return "Potencia x^y";
      case "mod":
        return "Módulo";
      case "abs":
        return "Valor absoluto";
      case "floor":
        return "Función piso";
      case "ceil":
        return "Función techo";
      case "round":
        return "Redondear";
      default:
        return "Función";
    }
  };

  // Obtener categoría de la función
  const getFunctionCategory = () => {
    switch (functionType) {
      case "sin":
      case "cos":
      case "tan":
        return "trigonometric";
      case "log":
      case "ln":
      case "exp":
        return "logarithmic";
      case "factorial":
      case "reciprocal":
        return "special";
      case "square":
      case "cube":
      case "sqrt":
      case "cbrt":
      case "pow":
        return "power";
      case "mod":
      case "abs":
      case "floor":
      case "ceil":
      case "round":
        return "numeric";
      default:
        return "general";
    }
  };

  // Obtener colores según categoría
  const getFunctionColors = () => {
    const category = getFunctionCategory();

    switch (category) {
      case "trigonometric":
        return {
          bg: "bg-purple-500/15",
          border: "border-purple-500/30",
          text: "text-purple-400",
          hoverBg: "hover:bg-purple-500/25",
          hoverBorder: "hover:border-purple-500/40",
          activeBg: "active:bg-purple-500/35",
          glow: "shadow-purple-500/40",
          iconBg: "bg-purple-500/20",
        };

      case "logarithmic":
        return {
          bg: "bg-blue-500/15",
          border: "border-blue-500/30",
          text: "text-blue-400",
          hoverBg: "hover:bg-blue-500/25",
          hoverBorder: "hover:border-blue-500/40",
          activeBg: "active:bg-blue-500/35",
          glow: "shadow-blue-500/40",
          iconBg: "bg-blue-500/20",
        };

      case "power":
        return {
          bg: "bg-yellow-500/15",
          border: "border-yellow-500/30",
          text: "text-yellow-400",
          hoverBg: "hover:bg-yellow-500/25",
          hoverBorder: "hover:border-yellow-500/40",
          activeBg: "active:bg-yellow-500/35",
          glow: "shadow-yellow-500/40",
          iconBg: "bg-yellow-500/20",
        };

      case "numeric":
        return {
          bg: "bg-green-500/15",
          border: "border-green-500/30",
          text: "text-green-400",
          hoverBg: "hover:bg-green-500/25",
          hoverBorder: "hover:border-green-500/40",
          activeBg: "active:bg-green-500/35",
          glow: "shadow-green-500/40",
          iconBg: "bg-green-500/20",
        };

      case "special":
      default:
        return {
          bg: "bg-accent-100/15",
          border: "border-accent-100/30",
          text: "text-accent-100",
          hoverBg: "hover:bg-accent-100/25",
          hoverBorder: "hover:border-accent-100/40",
          activeBg: "active:bg-accent-100/35",
          glow: "shadow-accent-100/40",
          iconBg: "bg-accent-100/20",
        };
    }
  };

  // Determinar si mostrar esta función según el modo
  const shouldShowInMode = () => {
    if (mode === "basic") {
      // Solo funciones básicas en modo básico
      return ["sqrt", "square", "reciprocal"].includes(functionType);
    }

    if (mode === "financial") {
      // Funciones financieras
      return ["log", "exp", "pow", "sqrt"].includes(functionType);
    }

    // Modo científico muestra todas
    return true;
  };

  const colors = getFunctionColors();

  // Si no se debe mostrar en este modo, retornar null
  if (!shouldShowInMode()) {
    return null;
  }

  return (
    <button
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onTouchCancel={handleInteractionEnd}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative rounded-xl border-2 transition-all duration-150 ease-out",
        "flex flex-col items-center justify-center font-semibold select-none overflow-hidden",
        "focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:ring-offset-2 focus:ring-offset-bg-200",
        colors.bg,
        colors.border,
        colors.text,
        !disabled && colors.hoverBg,
        !disabled && colors.hoverBorder,
        !disabled && "active:scale-95",
        isActive && "ring-2 ring-white/50",
        disabled && "opacity-40 cursor-not-allowed",
        glowIntensity > 0 && cn("shadow-lg", colors.glow),
        "h-16 md:h-18 text-sm md:text-base",
        className
      )}
      aria-label={getFunctionLabel()}
      title={`${getFunctionLabel()} (${functionType})`}
      style={{
        boxShadow:
          glowIntensity > 0
            ? `0 0 ${glowIntensity * 20}px ${
                glowIntensity * 10
              }px var(--tw-shadow-color)`
            : "none",
      }}
    >
      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Icono con fondo circular */}
      <div
        className={cn(
          "relative mb-1 p-2 rounded-full transition-transform duration-200",
          colors.iconBg,
          isPressed && "scale-90",
          isActive && "scale-110"
        )}
      >
        <div className="relative z-10">{getFunctionSymbol()}</div>

        {/* Anillo decorativo alrededor del icono */}
        <div className="absolute inset-0 rounded-full border border-white/20" />

        {/* Puntos decorativos para funciones especiales */}
        {getFunctionCategory() === "special" && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-300" />
          </>
        )}
      </div>

      {/* Label (opcional) */}
      {showLabel && (
        <div className="relative z-10">
          <span className="text-[10px] md:text-xs font-medium opacity-80">
            {getFunctionLabel().split(" ")[0]}
          </span>
        </div>
      )}

      {/* Indicador de modo activo */}
      {isActive && (
        <div className="absolute top-1 right-1">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-60" />
            <div className="relative w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      )}

      {/* Efecto de partículas para funciones trigonométricas */}
      {getFunctionCategory() === "trigonometric" && (
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: "20%",
              animationDelay: "0s",
              animationDuration: "3s",
            }}
          />
          <div
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: "50%",
              animationDelay: "1s",
              animationDuration: "4s",
            }}
          />
          <div
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: "80%",
              animationDelay: "2s",
              animationDuration: "3.5s",
            }}
          />
        </div>
      )}

      {/* Sombra interior para profundidad */}
      <div className="absolute inset-0 rounded-xl border border-black/20 pointer-events-none" />

      {/* Overlay de deshabilitado */}
      {disabled && (
        <div className="absolute inset-0 rounded-xl bg-bg-200/50 pointer-events-none" />
      )}
    </button>
  );
};

export default FunctionButton;
