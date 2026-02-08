// src/components/calculator/BasicButton.tsx
import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface BasicButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  variant?:
    | "number"
    | "operation"
    | "function"
    | "clear"
    | "equals"
    | "memory"
    | "scientific";
  size?: "normal" | "wide";
  disabled?: boolean;
  className?: string;
  tooltip?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const BasicButton: React.FC<BasicButtonProps> = ({
  label,
  onClick,
  variant = "number",
  size = "normal",
  disabled = false,
  className,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripplePosition, setRipplePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);

  const handleInteractionStart = (
    clientX: number,
    clientY: number,
    element: HTMLElement,
  ) => {
    if (disabled) return;

    setIsPressed(true);
    const rect = element.getBoundingClientRect();
    setRipplePosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setRippleKey((prev) => prev + 1);

    // Efecto de sonido sutil
    playClickSound();
  };

  const handleInteractionEnd = () => {
    setIsPressed(false);
  };

  const playClickSound = () => {
    try {
      const audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      let frequency = 800;
      if (variant === "operation") frequency = 600;
      if (variant === "equals") frequency = 400;
      if (variant === "clear") frequency = 300;

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.08,
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.08);
    } catch (error) {
      // Fallback silencioso
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleInteractionStart(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    handleInteractionStart(touch.clientX, touch.clientY, e.currentTarget);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled) return;
    onClick();
  };

  // Estilos según variante
  const getVariantStyles = () => {
    const baseStyles =
      "relative rounded-xl border-2 transition-all duration-150 ease-out flex items-center justify-center font-semibold select-none overflow-hidden";

    switch (variant) {
      case "number":
        return cn(
          baseStyles,
          "bg-bg-300/30 text-text-100 border-bg-300/50",
          "hover:bg-primary-200/15 hover:border-primary-200/40 hover:text-primary-200",
          "active:bg-primary-200/25",
          disabled &&
            "opacity-50 cursor-not-allowed hover:bg-bg-300/30 hover:border-bg-300/50 hover:text-text-100",
        );

      case "memory":
        return cn(
          baseStyles,
          "bg-blue-500/10 text-blue-300 border border-blue-500/20",
          "hover:bg-blue-500/20 hover:border-blue-500/30 hover:text-blue-200",
          "active:bg-blue-500/30 active:scale-95",
          disabled &&
            "opacity-40 cursor-not-allowed hover:bg-blue-500/10 hover:border-blue-500/20",
        );

      case "scientific":
        return cn(
          baseStyles,
          "bg-purple-500/10 text-purple-300 border border-purple-500/20",
          "hover:bg-purple-500/20 hover:border-purple-500/30 hover:text-purple-200",
          "active:bg-purple-500/30 active:scale-95",
          disabled &&
            "opacity-40 cursor-not-allowed hover:bg-purple-500/10 hover:border-purple-500/20",
        );
      case "operation":
        return cn(
          baseStyles,
          "bg-primary-200/15 text-primary-200 border-primary-200/30",
          "hover:bg-primary-200/25 hover:border-primary-200/50",
          "active:bg-primary-200/35",
          disabled &&
            "opacity-50 cursor-not-allowed hover:bg-primary-200/15 hover:border-primary-200/30",
        );

      case "function":
        return cn(
          baseStyles,
          "bg-accent-100/10 text-accent-100 border-accent-100/20",
          "hover:bg-accent-100/20 hover:border-accent-100/30 hover:text-accent-200",
          "active:bg-accent-100/30",
          disabled &&
            "opacity-50 cursor-not-allowed hover:bg-accent-100/10 hover:border-accent-100/20",
        );

      case "clear":
        return cn(
          baseStyles,
          "bg-red-500/10 text-red-400 border-red-500/20",
          "hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-300",
          "active:bg-red-500/30",
          disabled &&
            "opacity-50 cursor-not-allowed hover:bg-red-500/10 hover:border-red-500/20",
        );

      case "equals":
        return cn(
          baseStyles,
          "bg-gradient-to-br from-primary-100 to-primary-200 text-white border-primary-200/40",
          "hover:from-primary-200 hover:to-primary-300 hover:shadow-lg hover:shadow-primary-200/25",
          "active:from-primary-300 active:to-primary-400",
          disabled &&
            "opacity-50 cursor-not-allowed bg-gradient-to-br from-bg-300 to-bg-300 hover:from-bg-300 hover:to-bg-300 hover:shadow-none",
        );

      default:
        return baseStyles;
    }
  };

  // Estilos según tamaño - MEJORADO
  const getSizeStyles = () => {
    switch (size) {
      case "wide":
        return cn(
          "h-16 md:h-20", // Misma altura que los otros botones
          "text-lg md:text-xl", // Mismo tamaño de texto
          "col-span-2", // Ocupa 2 columnas
          "w-full", // Asegura que ocupe todo el ancho disponible
        );
      case "normal":
      default:
        return "h-16 md:h-20 text-lg md:text-xl";
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleInteractionEnd}
      onTouchCancel={handleInteractionEnd}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        getVariantStyles(),
        getSizeStyles(),
        isPressed && "scale-95 shadow-inner",
        "focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:ring-offset-2 focus:ring-offset-bg-200",
        size === "wide" && "px-0", // Asegurar padding correcto
        className,
      )}
      aria-label={typeof label === "string" ? label : undefined}
    >
      {/* Fondo con efecto de profundidad */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Efecto de ripple */}
      {ripplePosition && (
        <div
          key={rippleKey}
          className="absolute w-10 h-10 bg-white/20 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripplePosition.x - 20,
            top: ripplePosition.y - 20,
          }}
          onAnimationEnd={() => setRipplePosition(null)}
        />
      )}

      {/* Brillo interior */}
      <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />

      {/* Sombra interior para efecto 3D */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl border pointer-events-none",
          variant === "equals" ? "border-white/20" : "border-black/10",
        )}
      />

      {/* Contenido del botón - Centrado perfectamente */}
      <span
        className={cn(
          "relative z-10 flex items-center justify-center w-full h-full",
          variant === "equals" && "drop-shadow-sm",
          typeof label === "string" &&
            label.length > 3 &&
            "text-sm md:text-base",
        )}
      >
        {label}
      </span>

      {/* Efecto de brillo en hover (solo para equals) */}
      {variant === "equals" && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Indicador de presión */}
      {isPressed && (
        <div className="absolute inset-0 rounded-xl bg-black/5 pointer-events-none" />
      )}
    </button>
  );
};

export default BasicButton;
