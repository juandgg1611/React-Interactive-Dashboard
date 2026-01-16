import { useState, useCallback } from "react";
import {
  evaluateExpression,
  formatNumber,
  calculateFunction,
  CalculatorError,
} from "../utils/calculatorEngine";

interface DisplayState {
  value: string;
  history: string;
  isError: boolean;
}

interface HistoryItem {
  expression: string;
  result: string;
  timestamp: Date;
}

export const useCalculator = () => {
  const [display, setDisplay] = useState<DisplayState>({
    value: "0",
    history: "",
    isError: false,
  });

  const [memory, setMemory] = useState<number>(0);
  const [operation, setOperation] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleNumber = useCallback(
    (num: string) => {
      setDisplay((current) => {
        if (current.isError) {
          return {
            value: num,
            history: "",
            isError: false,
          };
        }

        if (current.value === "0" || operation) {
          return {
            ...current,
            value: num,
            history: operation ? `${prevValue} ${operation} ${num}` : num,
          };
        }

        return {
          ...current,
          value: current.value + num,
          history: current.history + num,
        };
      });

      setOperation(null);
    },
    [operation, prevValue]
  );

  const handleOperation = useCallback(
    (op: string) => {
      if (display.isError) return;

      setPrevValue(display.value);
      setOperation(op);
      setDisplay((current) => ({
        ...current,
        history: `${current.value} ${op}`,
      }));
    },
    [display]
  );

  const handleEquals = useCallback(() => {
    if (!operation || display.isError) return;

    try {
      const expression = `${prevValue} ${operation} ${display.value}`;
      const result = evaluateExpression(expression);

      const newHistoryItem: HistoryItem = {
        expression,
        result: result.toString(),
        timestamp: new Date(),
      };

      setHistory((prev) => [...prev, newHistoryItem].slice(-20)); // Mantener solo últimas 20
      setDisplay({
        value: formatNumber(result),
        history: expression,
        isError: false,
      });
      setOperation(null);
      setPrevValue("");
    } catch (error) {
      setDisplay({
        value: "Error",
        history: "",
        isError: true,
      });
    }
  }, [operation, prevValue, display.value]);

  const handleClear = useCallback(() => {
    setDisplay({
      value: "0",
      history: "",
      isError: false,
    });
    setOperation(null);
    setPrevValue("");
  }, []);

  const handleClearEntry = useCallback(() => {
    setDisplay((current) => ({
      ...current,
      value: "0",
      isError: false,
    }));
  }, []);

  const handleBackspace = useCallback(() => {
    setDisplay((current) => {
      if (current.isError || current.value === "0") {
        return {
          value: "0",
          history: "",
          isError: false,
        };
      }

      if (current.value.length === 1) {
        return {
          ...current,
          value: "0",
        };
      }

      return {
        ...current,
        value: current.value.slice(0, -1),
      };
    });
  }, []);

  const handleMemory = useCallback(
    (action: "add" | "subtract" | "recall" | "clear") => {
      const currentValue = parseFloat(display.value) || 0;

      switch (action) {
        case "add":
          setMemory((prev) => prev + currentValue);
          break;
        case "subtract":
          setMemory((prev) => prev - currentValue);
          break;
        case "recall":
          setDisplay({
            value: memory.toString(),
            history: "",
            isError: false,
          });
          break;
        case "clear":
          setMemory(0);
          break;
      }
    },
    [display.value, memory]
  );

  const handleDecimal = useCallback(() => {
    setDisplay((current) => {
      if (current.isError) {
        return {
          value: "0.",
          history: "",
          isError: false,
        };
      }

      if (current.value.includes(".")) {
        return current;
      }

      return {
        ...current,
        value: current.value + ".",
      };
    });
  }, []);

  const handlePercentage = useCallback(() => {
    if (display.isError) return;

    const value = parseFloat(display.value) / 100;
    setDisplay({
      value: value.toString(),
      history: "",
      isError: false,
    });
  }, [display.isError, display.value]);

  const handleToggleSign = useCallback(() => {
    if (display.isError) return;

    const value = parseFloat(display.value) * -1;
    setDisplay((current) => ({
      ...current,
      value: value.toString(),
    }));
  }, [display.isError, display.value]);

  const handleFunction = useCallback(
    (fn: string) => {
      if (display.isError) return;

      try {
        const value = parseFloat(display.value);
        const result = calculateFunction(fn, value);

        const newHistoryItem: HistoryItem = {
          expression: `${fn}(${display.value})`,
          result: result.toString(),
          timestamp: new Date(),
        };

        setHistory((prev) => [...prev, newHistoryItem]);
        setDisplay({
          value: formatNumber(result),
          history: `${fn}(${display.value})`,
          isError: false,
        });
      } catch (error) {
        setDisplay({
          value: "Error",
          history: "",
          isError: true,
        });
      }
    },
    [display.isError, display.value]
  );

  const handleSquareRoot = useCallback(() => {
    handleFunction("sqrt");
  }, [handleFunction]);

  const handlePower = useCallback(() => {
    handleFunction("square");
  }, [handleFunction]);

  const handlePi = useCallback(() => {
    setDisplay({
      value: Math.PI.toString(),
      history: "π",
      isError: false,
    });
  }, []);

  const handleEuler = useCallback(() => {
    setDisplay({
      value: Math.E.toString(),
      history: "e",
      isError: false,
    });
  }, []);

  return {
    display,
    history,
    memory,
    operation,
    handleNumber,
    handleOperation,
    handleFunction,
    handleEquals,
    handleClear,
    handleClearEntry,
    handleBackspace,
    handleMemory,
    handleDecimal,
    handlePercentage,
    handleToggleSign,
    handleSquareRoot,
    handlePower,
    handlePi,
    handleEuler,
  };
};
