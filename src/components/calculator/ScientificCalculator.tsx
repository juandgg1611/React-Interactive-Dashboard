import React from "react";
import BasicButton from "./BasicButton";
import CalculatorDisplay from "./CalculatorDisplay";
import { cn } from "../../lib/utils";

interface ScientificCalculatorProps {
  displayValue: string;
  history: string;
  onButtonClick: (value: string) => void;
  onClear: () => void;
  onEquals: () => void;
  onBackspace: () => void;
  isError?: boolean;
  hideDisplay?: boolean;
}

const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({
  displayValue,
  history,
  onButtonClick,
  onClear,
  onEquals,
  onBackspace,
  isError = false,
  hideDisplay = false,
}) => {
  // Organización de funciones científicas por filas según el prompt
  const scientificFunctions = {
    // Fila 1: Funciones trigonométricas
    trigonometric: [
      { label: "sin", value: "sin(", tooltip: "Seno" },
      { label: "cos", value: "cos(", tooltip: "Coseno" },
      { label: "tan", value: "tan(", tooltip: "Tangente" },
      { label: "sin⁻¹", value: "asin(", tooltip: "Arcoseno" },
      { label: "cos⁻¹", value: "acos(", tooltip: "Arcocoseno" },
      { label: "tan⁻¹", value: "atan(", tooltip: "Arcotangente" },
    ],
    // Fila 2: Logaritmos/exponenciales
    logarithms: [
      { label: "log", value: "log(", tooltip: "Logaritmo base 10" },
      { label: "ln", value: "ln(", tooltip: "Logaritmo natural" },
      { label: "eˣ", value: "e^", tooltip: "Exponencial" },
      { label: "10ˣ", value: "10^", tooltip: "10 elevado a x" },
      { label: "log₂", value: "log2(", tooltip: "Logaritmo base 2" },
      { label: "e", value: "e", tooltip: "Número de Euler (2.7183)" },
    ],
    // Fila 3: Potencias/raíces
    powers: [
      { label: "x²", value: "^2", tooltip: "Al cuadrado" },
      { label: "x³", value: "^3", tooltip: "Al cubo" },
      { label: "xʸ", value: "^", tooltip: "Elevado a y" },
      { label: "√x", value: "sqrt(", tooltip: "Raíz cuadrada" },
      { label: "∛x", value: "cbrt(", tooltip: "Raíz cúbica" },
      { label: "ⁿ√x", value: "root(", tooltip: "Raíz n-ésima" },
    ],
    // Fila 4: Especiales
    specials: [
      { label: "π", value: "π", tooltip: "Pi (3.1416)" },
      { label: "e", value: "e", tooltip: "Número de Euler" },
      { label: "x!", value: "!", tooltip: "Factorial" },
      { label: "1/x", value: "1/", tooltip: "Recíproco" },
      { label: "|x|", value: "abs(", tooltip: "Valor absoluto" },
      { label: "mod", value: "mod", tooltip: "Módulo" },
    ],
    // Fila 5: Paréntesis y memoria
    parentheses: [
      {
        label: "(",
        value: "(",
        tooltip: "Abrir paréntesis",
        variant: "function" as const,
      },
      {
        label: ")",
        value: ")",
        tooltip: "Cerrar paréntesis",
        variant: "function" as const,
      },
      {
        label: "[",
        value: "[",
        tooltip: "Abrir corchete",
        variant: "function" as const,
      },
      {
        label: "]",
        value: "]",
        tooltip: "Cerrar corchete",
        variant: "function" as const,
      },
      {
        label: "M+",
        value: "M+",
        tooltip: "Añadir a memoria",
        variant: "memory" as const,
      },
      {
        label: "M-",
        value: "M-",
        tooltip: "Restar de memoria",
        variant: "memory" as const,
      },
    ],
  };

  // Botones numéricos y operaciones básicas en 4 filas
  const basicButtons = [
    // Fila 1 de básica
    [
      {
        label: "CE",
        value: "CE",
        variant: "clear" as const,
        tooltip: "Borrar entrada",
      },
      {
        label: "C",
        value: "C",
        variant: "clear" as const,
        tooltip: "Borrar todo",
      },
      {
        label: "⌫",
        value: "⌫",
        variant: "clear" as const,
        tooltip: "Retroceso",
      },
      {
        label: "÷",
        value: "/",
        variant: "operation" as const,
        tooltip: "Dividir",
      },
      {
        label: "MR",
        value: "MR",
        variant: "memory" as const,
        tooltip: "Recuperar memoria",
      },
      {
        label: "MC",
        value: "MC",
        variant: "memory" as const,
        tooltip: "Limpiar memoria",
      },
    ],
    // Fila 2 de básica
    [
      { label: "7", value: "7", variant: "number" as const },
      { label: "8", value: "8", variant: "number" as const },
      { label: "9", value: "9", variant: "number" as const },
      {
        label: "×",
        value: "*",
        variant: "operation" as const,
        tooltip: "Multiplicar",
      },
      {
        label: "x²",
        value: "^2",
        variant: "scientific" as const,
        tooltip: "Al cuadrado",
      },
      {
        label: "√x",
        value: "sqrt(",
        variant: "scientific" as const,
        tooltip: "Raíz cuadrada",
      },
    ],
    // Fila 3 de básica
    [
      { label: "4", value: "4", variant: "number" as const },
      { label: "5", value: "5", variant: "number" as const },
      { label: "6", value: "6", variant: "number" as const },
      {
        label: "−",
        value: "-",
        variant: "operation" as const,
        tooltip: "Restar",
      },
      {
        label: "sin",
        value: "sin(",
        variant: "scientific" as const,
        tooltip: "Seno",
      },
      {
        label: "cos",
        value: "cos(",
        variant: "scientific" as const,
        tooltip: "Coseno",
      },
    ],
    // Fila 4 de básica
    [
      { label: "1", value: "1", variant: "number" as const },
      { label: "2", value: "2", variant: "number" as const },
      { label: "3", value: "3", variant: "number" as const },
      {
        label: "+",
        value: "+",
        variant: "operation" as const,
        tooltip: "Sumar",
      },
      {
        label: "tan",
        value: "tan(",
        variant: "scientific" as const,
        tooltip: "Tangente",
      },
      { label: "π", value: "π", variant: "scientific" as const, tooltip: "Pi" },
    ],
    // Fila 5 de básica
    [
      {
        label: "0",
        value: "0",
        variant: "number" as const,
        className: "col-span-2",
      },
      {
        label: ".",
        value: ".",
        variant: "number" as const,
        tooltip: "Punto decimal",
      },
      { label: "=", value: "=", variant: "equals" as const },
      {
        label: "log",
        value: "log(",
        variant: "scientific" as const,
        tooltip: "Logaritmo base 10",
      },
      {
        label: "ln",
        value: "ln(",
        variant: "scientific" as const,
        tooltip: "Logaritmo natural",
      },
    ],
  ];

  const handleButtonClick = (value: string) => {
    if (value === "CE" || value === "C") onClear();
    else if (value === "⌫") onBackspace();
    else if (value === "=") onEquals();
    else onButtonClick(value);
  };

  return (
    <div className="flex flex-col w-full h-full max-w-7xl mx-auto">
      {/* Display principal con operación y resultado */}
      {!hideDisplay && (
        <div className="mb-4">
          <CalculatorDisplay
            value={displayValue}
            history={history}
            isError={isError}
          />
        </div>
      )}

      {/* Grid de botones científicos - Layout vertical completo */}
      <div className="flex-1 overflow-auto">
        {/* Fila 1: Funciones trigonométricas */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          {scientificFunctions.trigonometric.map((func) => (
            <BasicButton
              key={func.value}
              label={func.label}
              onClick={() => onButtonClick(func.value)}
              variant="scientific"
              tooltip={func.tooltip}
              className="h-16 text-sm"
            />
          ))}
        </div>

        {/* Fila 2: Logaritmos/exponenciales */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          {scientificFunctions.logarithms.map((func) => (
            <BasicButton
              key={func.value}
              label={func.label}
              onClick={() => onButtonClick(func.value)}
              variant="scientific"
              tooltip={func.tooltip}
              className="h-16 text-sm"
            />
          ))}
        </div>

        {/* Fila 3: Potencias/raíces */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          {scientificFunctions.powers.map((func) => (
            <BasicButton
              key={func.value}
              label={func.label}
              onClick={() => onButtonClick(func.value)}
              variant="scientific"
              tooltip={func.tooltip}
              className="h-16 text-sm"
            />
          ))}
        </div>

        {/* Fila 4: Especiales */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          {scientificFunctions.specials.map((func) => (
            <BasicButton
              key={func.value}
              label={func.label}
              onClick={() => onButtonClick(func.value)}
              variant="scientific"
              tooltip={func.tooltip}
              className="h-16 text-sm"
            />
          ))}
        </div>

        {/* Fila 5: Paréntesis y memoria */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          {scientificFunctions.parentheses.map((func) => (
            <BasicButton
              key={func.value}
              label={func.label}
              onClick={() => handleButtonClick(func.value)}
              variant={func.variant || "scientific"}
              tooltip={func.tooltip}
              className="h-16 text-sm"
            />
          ))}
        </div>

        {/* Separador visual */}
        <div className="my-4 border-t border-bg-300/30"></div>

        {/* Calculadora básica integrada - 5 filas */}
        {basicButtons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-6 gap-2 mb-2">
            {row.map((btn) => (
              <BasicButton
                key={btn.value}
                label={btn.label}
                onClick={() => handleButtonClick(btn.value)}
                variant={btn.variant}
                size="normal"
                tooltip={btn.tooltip}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Información científica mínima */}
      <div className="mt-4 pt-4 border-t border-bg-300/30">
        <p className="text-xs text-text-200/70 text-center">
          <span className="text-accent-100">🔬 Modo Científico:</span> Usa
          paréntesis para funciones complejas. Ej: sin(45) + cos(30)
        </p>
      </div>
    </div>
  );
};

export default ScientificCalculator;
