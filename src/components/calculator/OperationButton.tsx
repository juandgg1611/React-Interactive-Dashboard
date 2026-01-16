// src/components/calculator/OperationButton.tsx
import React, { useState } from "react";
import {
  Plus,
  Minus,
  X,
  Divide,
  Percent,
  SquareDot,
  Power,
  Delete,
  Pi,
  Sigma,
} from "lucide-react";
import { cn } from "../../lib/utils";

type OperationType =
  | "add" // +
  | "subtract" // -
  | "multiply" // ×
  | "divide" // ÷
  | "percent" // %
  | "sqrt" // √
  | "power" // x²
  | "pi" // π
  | "euler" // e
  | "backspace" // ⌫
  | "decimal" // .
  | "toggleSign" // +/-
  | "reciprocal" // 1/x
  | "factorial"; // !

interface OperationButtonProps {
  operation: OperationType;
  onClick: (operation: OperationType) => void;
  isActive?: boolean;
  disabled?: boolean;
  size?: "normal" | "small";
  showLabel?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const OperationButton: React.FC<OperationButtonProps> = ({
  operation,
  onClick,
  isActive = false,
  disabled = false,
  size = "normal",
  showLabel = false,
  className,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);

  const handleInteractionStart = () => {
    if (disabled) return;

    setIsPressed(true);
    setGlowEffect(true);

    // Efecto de sonido específico para operaciones
    playOperationSound(operation);
  };

  const handleInteractionEnd = () => {
    setIsPressed(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    onClick(operation);
  };

  const playOperationSound = (op: OperationType) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Frecuencias diferentes por tipo de operación
      let frequency = 600;
      let type: OscillatorType = "sine";

      switch (op) {
        case "add":
          frequency = 523.25; // Do
          type = "sine";
          break;
        case "subtract":
          frequency = 493.88; // Si
          type = "sine";
          break;
        case "multiply":
          frequency = 587.33; // Re
          type = "triangle";
          break;
        case "divide":
          frequency = 659.25; // Mi
          type = "triangle";
          break;
        case "percent":
          frequency = 392.0; // Sol
          type = "square";
          break;
        case "sqrt":
        case "power":
          frequency = 440.0; // La
          type = "sawtooth";
          break;
        case "pi":
        case "euler":
          frequency = 349.23; // Fa
          type = "sine";
          break;
        case "backspace":
          frequency = 200;
          type = "square";
          break;
        default:
          frequency = 600;
          type = "sine";
      }

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      // Envelope más suave para operaciones
      gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.12
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.12);
    } catch (error) {
      // Fallback silencioso
    }
  };

  // Obtener el icono o símbolo para la operación
  const getOperationSymbol = () => {
    switch (operation) {
      case "add":
        return <Plus className="h-5 w-5 md:h-6 md:w-6" />;
      case "subtract":
        return <Minus className="h-5 w-5 md:h-6 md:w-6" />;
      case "multiply":
        return <X className="h-5 w-5 md:h-6 md:w-6" />;
      case "divide":
        return <Divide className="h-5 w-5 md:h-6 md:w-6" />;
      case "percent":
        return <span className="text-lg md:text-xl font-bold">%</span>;
      case "sqrt":
        return <SquareDot className="h-5 w-5 md:h-6 md:w-6" />;
      case "power":
        return <Power className="h-5 w-5 md:h-6 md:w-6" />;
      case "pi":
        return (
          <span className="text-lg md:text-xl font-bold font-mono">π</span>
        );
      case "euler":
        return (
          <span className="text-lg md:text-xl font-bold font-mono">e</span>
        );
      case "backspace":
        return <Delete className="h-5 w-5 md:h-6 md:w-6" />;
      case "decimal":
        return <span className="text-lg md:text-xl font-bold">.</span>;
      case "toggleSign":
        return <span className="text-lg md:text-xl font-bold">±</span>;
      case "reciprocal":
        return <span className="text-lg md:text-xl font-bold">1/x</span>;
      case "factorial":
        return <span className="text-lg md:text-xl font-bold">!</span>;
      default:
        return operation;
    }
  };

  // Obtener el label de texto
  const getOperationLabel = () => {
    switch (operation) {
      case "add":
        return "Sumar";
      case "subtract":
        return "Restar";
      case "multiply":
        return "Multiplicar";
      case "divide":
        return "Dividir";
      case "percent":
        return "Porcentaje";
      case "sqrt":
        return "Raíz cuadrada";
      case "power":
        return "Potencia";
      case "pi":
        return "Pi";
      case "euler":
        return "Número de Euler";
      case "backspace":
        return "Borrar";
      case "decimal":
        return "Punto decimal";
      case "toggleSign":
        return "Cambiar signo";
      case "reciprocal":
        return "Inverso";
      case "factorial":
        return "Factorial";
      default:
        return "Operación";
    }
  };

  // Determinar el color según el tipo de operación
  const getOperationColor = () => {
    switch (operation) {
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        return {
          bg: "bg-primary-200/20",
          border: "border-primary-200/40",
          text: "text-primary-200",
          hoverBg: "hover:bg-primary-200/30",
          hoverBorder: "hover:border-primary-200/60",
          activeBg: "active:bg-primary-200/40",
          glow: "shadow-primary-200/30",
        };

      case "percent":
      case "sqrt":
      case "power":
      case "pi":
      case "euler":
      case "reciprocal":
      case "factorial":
        return {
          bg: "bg-accent-100/15",
          border: "border-accent-100/30",
          text: "text-accent-100",
          hoverBg: "hover:bg-accent-100/25",
          hoverBorder: "hover:border-accent-100/40",
          activeBg: "active:bg-accent-100/35",
          glow: "shadow-accent-100/30",
        };

      case "backspace":
        return {
          bg: "bg-red-500/15",
          border: "border-red-500/30",
          text: "text-red-400",
          hoverBg: "hover:bg-red-500/25",
          hoverBorder: "hover:border-red-500/40",
          activeBg: "active:bg-red-500/35",
          glow: "shadow-red-500/30",
        };

      case "decimal":
      case "toggleSign":
        return {
          bg: "bg-bg-300/30",
          border: "border-bg-300/50",
          text: "text-text-100",
          hoverBg: "hover:bg-primary-200/20",
          hoverBorder: "hover:border-primary-200/40",
          activeBg: "active:bg-primary-200/30",
          glow: "shadow-primary-200/30",
        };

      default:
        return {
          bg: "bg-primary-200/20",
          border: "border-primary-200/40",
          text: "text-primary-200",
          hoverBg: "hover:bg-primary-200/30",
          hoverBorder: "hover:border-primary-200/60",
          activeBg: "active:bg-primary-200/40",
          glow: "shadow-primary-200/30",
        };
    }
  };

  const colors = getOperationColor();
  const sizeClasses =
    size === "small"
      ? "h-12 md:h-14 text-base"
      : "h-16 md:h-20 text-lg md:text-xl";

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
        "flex items-center justify-center font-semibold select-none overflow-hidden",
        "focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:ring-offset-2 focus:ring-offset-bg-200",
        colors.bg,
        colors.border,
        colors.text,
        !disabled && colors.hoverBg,
        !disabled && colors.hoverBorder,
        !disabled && "active:scale-95",
        isActive && "ring-2 ring-primary-300/50",
        disabled && "opacity-50 cursor-not-allowed",
        glowEffect && "shadow-lg",
        sizeClasses,
        className
      )}
      aria-label={getOperationLabel()}
      title={getOperationLabel()}
    >
      {/* Efecto de glow cuando está activo */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-200/10 to-primary-300/5 animate-pulse-glow pointer-events-none" />
      )}

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      {/* Brillo interior */}
      <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1">
        <div
          className={cn(
            "transition-transform duration-150",
            isPressed && "scale-90",
            isActive && "scale-110"
          )}
        >
          {getOperationSymbol()}
        </div>

        {showLabel && (
          <span className="text-[10px] md:text-xs opacity-70 font-normal">
            {getOperationLabel()}
          </span>
        )}
      </div>

      {/* Indicador de operación activa */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-300 rounded-full animate-ping opacity-60" />
      )}

      {/* Efecto de partículas para operaciones especiales */}
      {(operation === "pi" || operation === "euler") && (
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute top-2 left-2 w-1 h-1 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-300" />
        </div>
      )}

      {/* Resetear glow effect después de la animación */}
      {glowEffect && (
        <div
          className="absolute inset-0 rounded-xl bg-white/5 animate-glow pointer-events-none"
          onAnimationEnd={() => setGlowEffect(false)}
        />
      )}
    </button>
  );
};

export default OperationButton;
