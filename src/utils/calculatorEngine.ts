export class CalculatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CalculatorError";
  }
}

export const evaluateExpression = (expression: string): number => {
  try {
    // Limpiar expresión
    let cleanExpr = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, Math.PI.toString())
      .replace(/e/g, Math.E.toString());

    // Validar expresión
    if (!isValidExpression(cleanExpr)) {
      throw new CalculatorError("Expresión inválida");
    }

    // Evaluar expresión
    const result = Function(`'use strict'; return (${cleanExpr})`)();

    // Validar resultado
    if (!isFinite(result)) {
      throw new CalculatorError("Resultado no finito");
    }

    if (Math.abs(result) > Number.MAX_SAFE_INTEGER) {
      throw new CalculatorError("Número demasiado grande");
    }

    return result;
  } catch (error) {
    if (error instanceof CalculatorError) {
      throw error;
    }
    throw new CalculatorError("Error en el cálculo");
  }
};

export const calculateFunction = (fn: string, value: number): number => {
  switch (fn) {
    case "sqrt":
      if (value < 0) throw new CalculatorError("Raíz de número negativo");
      return Math.sqrt(value);
    case "square":
      return Math.pow(value, 2);
    case "cube":
      return Math.pow(value, 3);
    case "sin":
      return Math.sin(value * (Math.PI / 180)); // Grados a radianes
    case "cos":
      return Math.cos(value * (Math.PI / 180));
    case "tan":
      if (Math.abs(value % 180) === 90) {
        throw new CalculatorError("Tangente indefinida");
      }
      return Math.tan(value * (Math.PI / 180));
    case "log":
      if (value <= 0) throw new CalculatorError("Log de número no positivo");
      return Math.log10(value);
    case "ln":
      if (value <= 0) throw new CalculatorError("Ln de número no positivo");
      return Math.log(value);
    case "exp":
      return Math.exp(value);
    case "factorial":
      if (value < 0 || !Number.isInteger(value)) {
        throw new CalculatorError("Factorial no definido");
      }
      if (value > 170) throw new CalculatorError("Número demasiado grande");
      let result = 1;
      for (let i = 2; i <= value; i++) {
        result *= i;
      }
      return result;
    case "reciprocal":
      if (value === 0) throw new CalculatorError("División por cero");
      return 1 / value;
    default:
      throw new CalculatorError("Función no soportada");
  }
};

export const formatNumber = (num: number): string => {
  if (!isFinite(num)) {
    return "Error";
  }

  // Para números muy grandes o muy pequeños usar notación científica
  if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(8);
  }

  // Redondear para evitar errores de punto flotante
  const rounded = Math.round(num * 1e12) / 1e12;

  // Formatear con separadores de miles y decimales limitados
  const parts = rounded.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (parts[1]) {
    // Limitar decimales a 12
    parts[1] = parts[1].slice(0, 12).replace(/0+$/, "");
    if (parts[1].length === 0) {
      return parts[0];
    }
    return parts.join(".");
  }

  return parts[0];
};

const isValidExpression = (expr: string): boolean => {
  // Validar caracteres permitidos
  const validChars = /^[0-9+\-*/.()πe\s]+$/;
  if (!validChars.test(expr.replace(/\s/g, ""))) {
    return false;
  }

  // Validar paréntesis balanceados
  let balance = 0;
  for (const char of expr) {
    if (char === "(") balance++;
    if (char === ")") balance--;
    if (balance < 0) return false;
  }
  if (balance !== 0) return false;

  // Validar operadores consecutivos
  const operatorPattern = /[+\-*/]{2,}/;
  if (operatorPattern.test(expr)) {
    return false;
  }

  return true;
};
