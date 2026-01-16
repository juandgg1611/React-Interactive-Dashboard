// src/components/calculator/ButtonGrid.tsx
import React, { useState, useEffect } from "react";
import BasicButton from "./BasicButton";
import OperationButton from "./OperationButton";
import FunctionButton from "./FunctionButton";
import EqualsButton from "./EqualsButton";
import { cn } from "../../lib/utils";
import {
  Calculator,
  Brain,
  Zap,
  Settings,
  Grid3x3,
  LayoutGrid,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";

interface ButtonGridProps {
  onNumberClick: (num: string) => void;
  onOperationClick: (op: string) => void;
  onFunctionClick: (fn: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onClearEntryClick: () => void;
  onBackspaceClick: () => void;
  onMemoryClick: (action: string) => void;
  onDecimalClick: () => void;
  onToggleSignClick: () => void;
  onPercentageClick: () => void;
  onScientificFunctionClick: (fn: string) => void;

  // Estados
  currentOperation?: string | null;
  memoryValue?: number;
  isScientificMode?: boolean;
  isErrorState?: boolean;
  currentResult?: string;

  // Configuraciones
  buttonSize?: "compact" | "normal" | "large";
  layout?: "basic" | "scientific" | "financial";
  showLabels?: boolean;
  animateButtons?: boolean;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({
  onNumberClick,
  onOperationClick,
  onFunctionClick,
  onEqualsClick,
  onClearClick,
  onClearEntryClick,
  onBackspaceClick,
  onMemoryClick,
  onDecimalClick,
  onToggleSignClick,
  onPercentageClick,
  onScientificFunctionClick,

  // Estados con valores por defecto
  currentOperation = null,
  memoryValue = 0,
  isScientificMode = false,
  isErrorState = false,
  currentResult = "",

  // Configuraciones con valores por defecto
  buttonSize = "normal",
  layout = "basic",
  showLabels = false,
  animateButtons = true,
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [lastPressed, setLastPressed] = useState<string | null>(null);
  const [gridAnimation, setGridAnimation] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState<string | null>(null);

  // Efecto para animación de entrada
  useEffect(() => {
    setGridAnimation(true);
    const timer = setTimeout(() => setGridAnimation(false), 300);
    return () => clearTimeout(timer);
  }, [layout]);

  // Manejo de atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      // Evitar comportamiento predeterminado para teclas de calculadora
      if (/[\d+\-*/.=EnterEscapeBackspace%]/.test(key)) {
        e.preventDefault();
      }

      // Mapeo de teclas
      const keyMap: Record<string, () => void> = {
        "0": () => onNumberClick("0"),
        "1": () => onNumberClick("1"),
        "2": () => onNumberClick("2"),
        "3": () => onNumberClick("3"),
        "4": () => onNumberClick("4"),
        "5": () => onNumberClick("5"),
        "6": () => onNumberClick("6"),
        "7": () => onNumberClick("7"),
        "8": () => onNumberClick("8"),
        "9": () => onNumberClick("9"),
        "+": () => onOperationClick("add"),
        "-": () => onOperationClick("subtract"),
        "*": () => onOperationClick("multiply"),
        "/": () => onOperationClick("divide"),
        ".": () => onDecimalClick(),
        "=": () => onEqualsClick(),
        Enter: () => onEqualsClick(),
        Escape: () => onClearClick(),
        Backspace: () => onBackspaceClick(),
        "%": () => onPercentageClick(),
        m: () => e.ctrlKey && onMemoryClick("add"),
        M: () => e.ctrlKey && onMemoryClick("add"),
      };

      if (keyMap[key]) {
        setKeyboardFocus(key);
        keyMap[key]();
        setTimeout(() => setKeyboardFocus(null), 150);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    onNumberClick,
    onOperationClick,
    onEqualsClick,
    onClearClick,
    onBackspaceClick,
    onDecimalClick,
    onPercentageClick,
    onMemoryClick,
  ]);

  const handleButtonHover = (buttonId: string) => {
    if (animateButtons) {
      setHoveredButton(buttonId);
    }
  };

  const handleButtonLeave = () => {
    setHoveredButton(null);
  };

  const handleButtonPress = (buttonId: string) => {
    if (animateButtons) {
      setLastPressed(buttonId);
      setTimeout(() => setLastPressed(null), 300);
    }
  };

  // Configuraciones de tamaño
  const getSizeClasses = () => {
    switch (buttonSize) {
      case "compact":
        return "gap-1.5 p-2";
      case "large":
        return "gap-4 p-4";
      case "normal":
      default:
        return "gap-2.5 p-3";
    }
  };

  // Determinar qué funciones mostrar según el layout
  const getScientificFunctions = () => {
    if (layout === "financial") {
      return ["log", "exp", "pow", "sqrt", "mod"];
    }

    if (layout === "scientific") {
      return [
        "sin",
        "cos",
        "tan",
        "log",
        "ln",
        "exp",
        "sqrt",
        "cbrt",
        "pow",
        "factorial",
      ];
    }

    return ["sqrt", "square", "reciprocal"];
  };

  const scientificFunctions = getScientificFunctions();

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-gradient-to-br from-bg-200/30 to-bg-300/20 backdrop-blur-sm",
        "border border-bg-300/40 shadow-xl overflow-hidden",
        gridAnimation && "animate-pulse-glow",
        getSizeClasses()
      )}
    >
      {/* Efecto de fondo */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary-100/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary-200/3 rounded-full blur-3xl" />

        {/* Líneas de cuadrícula sutil */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-px bg-white left-1/4 absolute" />
          <div className="h-full w-px bg-white left-1/2 absolute" />
          <div className="h-full w-px bg-white left-3/4 absolute" />
          <div className="w-full h-px bg-white top-1/4 absolute" />
          <div className="w-full h-px bg-white top-1/2 absolute" />
          <div className="w-full h-px bg-white top-3/4 absolute" />
        </div>
      </div>

      {/* Header del grid */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "p-1.5 rounded-lg",
              layout === "scientific"
                ? "bg-primary-200/20 text-primary-200"
                : "bg-bg-300/30 text-text-200"
            )}
          >
            {layout === "scientific" ? (
              <Brain className="h-4 w-4" />
            ) : layout === "financial" ? (
              <Calculator className="h-4 w-4" />
            ) : (
              <Grid3x3 className="h-4 w-4" />
            )}
          </div>
          <span className="text-sm font-medium text-text-100">
            {layout === "scientific"
              ? "Científica"
              : layout === "financial"
              ? "Financiera"
              : "Básica"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {memoryValue !== 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary-200/10 border border-primary-200/20">
              <Zap className="h-3 w-3 text-primary-200" />
              <span className="text-xs text-primary-200">
                M: {memoryValue.toFixed(2)}
              </span>
            </div>
          )}
          <div className="h-4 w-px bg-bg-300/50" />
          <div className="text-xs text-text-200/70">
            {animateButtons ? "Animado" : "Estático"}
          </div>
        </div>
      </div>

      {/* Contenedor principal del grid */}
      <div
        className={cn(
          "grid grid-cols-4 gap-2 transition-all duration-300",
          layout === "scientific" && "grid-cols-5",
          layout === "financial" && "grid-cols-4"
        )}
      >
        {/* ========== PRIMERA FILA ========== */}
        {/* Memoria y funciones especiales */}
        <div
          className={cn(
            "col-span-4 grid grid-cols-4 gap-2 mb-2",
            layout === "scientific" && "col-span-5 grid-cols-5"
          )}
        >
          {/* Memoria */}
          <BasicButton
            label="MC"
            onClick={() => {
              onMemoryClick("clear");
              handleButtonPress("mc");
            }}
            variant="function"
            className={cn(
              hoveredButton === "mc" && "scale-105",
              lastPressed === "mc" && "animate-button-press"
            )}
            onMouseEnter={() => handleButtonHover("mc")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="MR"
            onClick={() => {
              onMemoryClick("recall");
              handleButtonPress("mr");
            }}
            variant="function"
            className={cn(
              hoveredButton === "mr" && "scale-105",
              lastPressed === "mr" && "animate-button-press"
            )}
            onMouseEnter={() => handleButtonHover("mr")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="M+"
            onClick={() => {
              onMemoryClick("add");
              handleButtonPress("mplus");
            }}
            variant="function"
            className={cn(
              hoveredButton === "mplus" && "scale-105",
              lastPressed === "mplus" && "animate-button-press"
            )}
            onMouseEnter={() => handleButtonHover("mplus")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="M-"
            onClick={() => {
              onMemoryClick("subtract");
              handleButtonPress("mminus");
            }}
            variant="function"
            className={cn(
              hoveredButton === "mminus" && "scale-105",
              lastPressed === "mminus" && "animate-button-press"
            )}
            onMouseEnter={() => handleButtonHover("mminus")}
            onMouseLeave={handleButtonLeave}
          />

          {/* Espacio extra para modo científico */}
          {layout === "scientific" && (
            <FunctionButton
              functionType="sin"
              onClick={() => {
                onScientificFunctionClick("sin");
                handleButtonPress("sin");
              }}
              mode={layout}
              showLabel={showLabels}
              className={cn(
                hoveredButton === "sin" && "scale-105",
                lastPressed === "sin" && "animate-button-press"
              )}
              onMouseEnter={() => handleButtonHover("sin")}
              onMouseLeave={handleButtonLeave}
            />
          )}
        </div>

        {/* ========== SEGUNDA FILA ========== */}
        {/* Clear y funciones básicas */}
        <div
          className={cn(
            "col-span-4 grid grid-cols-4 gap-2 mb-2",
            layout === "scientific" && "col-span-5 grid-cols-5"
          )}
        >
          <BasicButton
            label="CE"
            onClick={() => {
              onClearEntryClick();
              handleButtonPress("ce");
            }}
            variant="clear"
            className={cn(
              hoveredButton === "ce" && "scale-105",
              lastPressed === "ce" && "animate-button-press"
            )}
            onMouseEnter={() => handleButtonHover("ce")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="C"
            onClick={() => {
              onClearClick();
              handleButtonPress("c");
            }}
            variant="clear"
            className={cn(
              hoveredButton === "c" && "scale-105",
              lastPressed === "c" && "animate-button-press"
            )}
            onMouseEnter={() => handleButtonHover("c")}
            onMouseLeave={handleButtonLeave}
          />

          <OperationButton
            operation="backspace"
            onClick={() => {
              onBackspaceClick();
              handleButtonPress("backspace");
            }}
            className={cn(
              hoveredButton === "backspace" && "scale-105",
              lastPressed === "backspace" && "animate-button-press"
            )}
            onMouseEnter={() => handleButtonHover("backspace")}
            onMouseLeave={handleButtonLeave}
          />

          <OperationButton
            operation="divide"
            onClick={() => {
              onOperationClick("divide");
              handleButtonPress("divide");
            }}
            isActive={currentOperation === "divide"}
            className={cn(
              hoveredButton === "divide" && "scale-105",
              lastPressed === "divide" && "animate-button-press",
              keyboardFocus === "/" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("divide")}
            onMouseLeave={handleButtonLeave}
          />

          {/* Espacio extra para modo científico */}
          {layout === "scientific" && (
            <FunctionButton
              functionType="cos"
              onClick={() => {
                onScientificFunctionClick("cos");
                handleButtonPress("cos");
              }}
              mode={layout}
              showLabel={showLabels}
              className={cn(
                hoveredButton === "cos" && "scale-105",
                lastPressed === "cos" && "animate-button-press"
              )}
              onMouseEnter={() => handleButtonHover("cos")}
              onMouseLeave={handleButtonLeave}
            />
          )}
        </div>

        {/* ========== FILAS DE NÚMEROS Y OPERACIONES ========== */}
        {/* Fila 3: 7 8 9 × (y función científica si aplica) */}
        <div
          className={cn(
            "col-span-4 grid grid-cols-4 gap-2 mb-2",
            layout === "scientific" && "col-span-5 grid-cols-5"
          )}
        >
          <BasicButton
            label="7"
            onClick={() => {
              onNumberClick("7");
              handleButtonPress("7");
            }}
            variant="number"
            className={cn(
              hoveredButton === "7" && "scale-105",
              lastPressed === "7" && "animate-button-press",
              keyboardFocus === "7" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("7")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="8"
            onClick={() => {
              onNumberClick("8");
              handleButtonPress("8");
            }}
            variant="number"
            className={cn(
              hoveredButton === "8" && "scale-105",
              lastPressed === "8" && "animate-button-press",
              keyboardFocus === "8" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("8")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="9"
            onClick={() => {
              onNumberClick("9");
              handleButtonPress("9");
            }}
            variant="number"
            className={cn(
              hoveredButton === "9" && "scale-105",
              lastPressed === "9" && "animate-button-press",
              keyboardFocus === "9" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("9")}
            onMouseLeave={handleButtonLeave}
          />

          <OperationButton
            operation="multiply"
            onClick={() => {
              onOperationClick("multiply");
              handleButtonPress("multiply");
            }}
            isActive={currentOperation === "multiply"}
            className={cn(
              hoveredButton === "multiply" && "scale-105",
              lastPressed === "multiply" && "animate-button-press",
              keyboardFocus === "*" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("multiply")}
            onMouseLeave={handleButtonLeave}
          />

          {/* Espacio extra para modo científico */}
          {layout === "scientific" && (
            <FunctionButton
              functionType="tan"
              onClick={() => {
                onScientificFunctionClick("tan");
                handleButtonPress("tan");
              }}
              mode={layout}
              showLabel={showLabels}
              className={cn(
                hoveredButton === "tan" && "scale-105",
                lastPressed === "tan" && "animate-button-press"
              )}
              onMouseEnter={() => handleButtonHover("tan")}
              onMouseLeave={handleButtonLeave}
            />
          )}
        </div>

        {/* Fila 4: 4 5 6 - (y función científica si aplica) */}
        <div
          className={cn(
            "col-span-4 grid grid-cols-4 gap-2 mb-2",
            layout === "scientific" && "col-span-5 grid-cols-5"
          )}
        >
          <BasicButton
            label="4"
            onClick={() => {
              onNumberClick("4");
              handleButtonPress("4");
            }}
            variant="number"
            className={cn(
              hoveredButton === "4" && "scale-105",
              lastPressed === "4" && "animate-button-press",
              keyboardFocus === "4" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("4")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="5"
            onClick={() => {
              onNumberClick("5");
              handleButtonPress("5");
            }}
            variant="number"
            className={cn(
              hoveredButton === "5" && "scale-105",
              lastPressed === "5" && "animate-button-press",
              keyboardFocus === "5" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("5")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="6"
            onClick={() => {
              onNumberClick("6");
              handleButtonPress("6");
            }}
            variant="number"
            className={cn(
              hoveredButton === "6" && "scale-105",
              lastPressed === "6" && "animate-button-press",
              keyboardFocus === "6" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("6")}
            onMouseLeave={handleButtonLeave}
          />

          <OperationButton
            operation="subtract"
            onClick={() => {
              onOperationClick("subtract");
              handleButtonPress("subtract");
            }}
            isActive={currentOperation === "subtract"}
            className={cn(
              hoveredButton === "subtract" && "scale-105",
              lastPressed === "subtract" && "animate-button-press",
              keyboardFocus === "-" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("subtract")}
            onMouseLeave={handleButtonLeave}
          />

          {/* Espacio extra para modo científico */}
          {layout === "scientific" && (
            <FunctionButton
              functionType="log"
              onClick={() => {
                onScientificFunctionClick("log");
                handleButtonPress("log");
              }}
              mode={layout}
              showLabel={showLabels}
              className={cn(
                hoveredButton === "log" && "scale-105",
                lastPressed === "log" && "animate-button-press"
              )}
              onMouseEnter={() => handleButtonHover("log")}
              onMouseLeave={handleButtonLeave}
            />
          )}
        </div>

        {/* Fila 5: 1 2 3 + (y función científica si aplica) */}
        <div
          className={cn(
            "col-span-4 grid grid-cols-4 gap-2 mb-2",
            layout === "scientific" && "col-span-5 grid-cols-5"
          )}
        >
          <BasicButton
            label="1"
            onClick={() => {
              onNumberClick("1");
              handleButtonPress("1");
            }}
            variant="number"
            className={cn(
              hoveredButton === "1" && "scale-105",
              lastPressed === "1" && "animate-button-press",
              keyboardFocus === "1" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("1")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="2"
            onClick={() => {
              onNumberClick("2");
              handleButtonPress("2");
            }}
            variant="number"
            className={cn(
              hoveredButton === "2" && "scale-105",
              lastPressed === "2" && "animate-button-press",
              keyboardFocus === "2" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("2")}
            onMouseLeave={handleButtonLeave}
          />

          <BasicButton
            label="3"
            onClick={() => {
              onNumberClick("3");
              handleButtonPress("3");
            }}
            variant="number"
            className={cn(
              hoveredButton === "3" && "scale-105",
              lastPressed === "3" && "animate-button-press",
              keyboardFocus === "3" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("3")}
            onMouseLeave={handleButtonLeave}
          />

          <OperationButton
            operation="add"
            onClick={() => {
              onOperationClick("add");
              handleButtonPress("add");
            }}
            isActive={currentOperation === "add"}
            className={cn(
              hoveredButton === "add" && "scale-105",
              lastPressed === "add" && "animate-button-press",
              keyboardFocus === "+" && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("add")}
            onMouseLeave={handleButtonLeave}
          />

          {/* Espacio extra para modo científico */}
          {layout === "scientific" && (
            <FunctionButton
              functionType="ln"
              onClick={() => {
                onScientificFunctionClick("ln");
                handleButtonPress("ln");
              }}
              mode={layout}
              showLabel={showLabels}
              className={cn(
                hoveredButton === "ln" && "scale-105",
                lastPressed === "ln" && "animate-button-press"
              )}
              onMouseEnter={() => handleButtonHover("ln")}
              onMouseLeave={handleButtonLeave}
            />
          )}
        </div>

        {/* ========== ÚLTIMA FILA ========== */}
        {/* 0 . ± = (y funciones extra) */}
        <div
          className={cn(
            "col-span-4 grid gap-2",
            layout === "scientific" ? "grid-cols-5" : "grid-cols-4"
          )}
        >
          {/* Botón 0 (ancho doble en modo básico, normal en científico) */}
          <div
            className={cn(
              layout === "scientific" ? "col-span-2" : "col-span-2"
            )}
          >
            <BasicButton
              label="0"
              onClick={() => {
                onNumberClick("0");
                handleButtonPress("0");
              }}
              variant="number"
              size="wide"
              className={cn(
                hoveredButton === "0" && "scale-105",
                lastPressed === "0" && "animate-button-press",
                keyboardFocus === "0" && "ring-2 ring-primary-300"
              )}
              onMouseEnter={() => handleButtonHover("0")}
              onMouseLeave={handleButtonLeave}
            />
          </div>

          {/* Punto decimal */}
          <OperationButton
            operation="decimal"
            onClick={() => {
              onDecimalClick();
              handleButtonPress("decimal");
            }}
            className={cn(
              hoveredButton === "decimal" && "scale-105",
              lastPressed === "decimal" && "animate-button-press",
              keyboardFocus === "." && "ring-2 ring-primary-300"
            )}
            onMouseEnter={() => handleButtonHover("decimal")}
            onMouseLeave={handleButtonLeave}
          />

          {/* Toggle sign (±) */}
          <OperationButton
            operation="toggleSign"
            onClick={() => {
              onToggleSignClick();
              handleButtonPress("toggleSign");
            }}
            className={cn(
              hoveredButton === "toggleSign" && "scale-105",
              lastPressed === "toggleSign" && "animate-button-press"
            )}
            onMouseEnter={() => handleButtonHover("toggleSign")}
            onMouseLeave={handleButtonLeave}
          />

          {/* Botón de igual */}

          <div className="col-span-4 mt-3">
            <EqualsButton
              onClick={() => {
                onEqualsClick();
                handleButtonPress("equals");
              }}
              isActive={!!currentOperation}
              isLoading={false}
              isError={isErrorState}
              result={currentResult}
              size="normal"
              className={cn(
                "w-full h-20 md:h-24", // Altura más grande
                hoveredButton === "equals" && "scale-105",
                lastPressed === "equals" && "animate-button-press",
                keyboardFocus === "=" && "ring-4 ring-primary-300/50"
              )}
              onMouseEnter={() => handleButtonHover("equals")}
              onMouseLeave={handleButtonLeave}
            />
          </div>
        </div>

        {/* ========== FILA EXTRA PARA FUNCIONES CIENTÍFICAS ========== */}
        {layout === "scientific" && (
          <div className="col-span-5 grid grid-cols-5 gap-2 mt-2">
            {scientificFunctions.slice(5, 10).map((func, index) => (
              <FunctionButton
                key={func}
                functionType={func as any}
                onClick={() => {
                  onScientificFunctionClick(func);
                  handleButtonPress(func);
                }}
                mode={layout}
                showLabel={showLabels}
                className={cn(
                  hoveredButton === func && "scale-105",
                  lastPressed === func && "animate-button-press"
                )}
                onMouseEnter={() => handleButtonHover(func)}
                onMouseLeave={handleButtonLeave}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer con información */}
      <div className="mt-4 pt-3 border-t border-bg-300/30"></div>
    </div>
  );
};

export default ButtonGrid;
