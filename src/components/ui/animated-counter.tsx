// src/components/ui/animated-counter.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  format?: (value: number) => string;
  speed?: number;
  startValue?: number;
  onComplete?: () => void;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  delay = 0,
  className,
  format,
  speed = 1,
  startValue = 0,
  onComplete,
}) => {
  const [displayValue, setDisplayValue] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);
  const prevValueRef = useRef(value);

  // Efecto de entrada inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      startAnimation();
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationRef.current);
    };
  }, [delay]);

  // Efecto cuando cambia el valor
  useEffect(() => {
    if (prevValueRef.current !== value) {
      startAnimation();
      prevValueRef.current = value;
    }
  }, [value]);

  const startAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    startTimeRef.current = performance.now();
    animate();
  };

  const animate = (currentTime?: number) => {
    if (!currentTime) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const elapsed = currentTime - startTimeRef.current;
    const progress = Math.min(elapsed / (duration / speed), 1);

    // Usamos easing para una animación más natural
    const easedProgress = easeOutCubic(progress);
    const currentValue = startValue + (value - startValue) * easedProgress;

    setDisplayValue(currentValue);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayValue(value);
      setIsAnimating(false);
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Función de easing
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  // Función de easing para bounce
  const easeOutBounce = (t: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  };

  const formatValue = (val: number): string => {
    if (format) {
      return format(val);
    }

    // Formato por defecto
    if (Math.abs(val) >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    if (Math.abs(val) >= 1000) {
      return `$${(val / 1000).toFixed(1)}K`;
    }

    // Para valores con decimales
    if (Math.abs(val) < 1000 && Math.floor(val) !== val) {
      return `$${val.toFixed(2)}`;
    }

    return `$${Math.round(val).toLocaleString()}`;
  };

  // Separar los dígitos para animación individual
  const formattedValue = formatValue(displayValue);
  const digits = formattedValue.split("");

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        "font-mono tabular-nums",
        "overflow-hidden",
        isAnimating && "text-primary-200",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={formattedValue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          {digits.map((digit, index) => (
            <motion.span
              key={`${digit}-${index}`}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.8,
                textShadow: "0 0 20px var(--primary-200, #4ade80)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                textShadow: "0 0 0px transparent",
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
              className="inline-block"
              style={{
                color:
                  digit === "$" || digit === "M" || digit === "K"
                    ? "inherit"
                    : isAnimating
                      ? "var(--primary-200, #4ade80)"
                      : "inherit",
              }}
            >
              {digit === "." ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {digit}
                </motion.span>
              ) : digit === "$" ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mr-0.5"
                >
                  {digit}
                </motion.span>
              ) : (
                digit
              )}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Indicador de animación */}
      {isAnimating && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="ml-2"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-4 w-4 border-2 border-primary-200/30 border-t-primary-200 rounded-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200/20 to-transparent rounded-full blur-sm" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Versión simplificada para números simples
interface SimpleAnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const SimpleAnimatedNumber: React.FC<SimpleAnimatedNumberProps> = ({
  value,
  duration = 1000,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startValue = displayValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing cuadrático para entrada suave
      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const current = startValue + (value - startValue) * easedProgress;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};
