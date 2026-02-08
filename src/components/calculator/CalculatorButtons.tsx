// src/components/calculator/CalculatorButtons.tsx
import React, { useState, useEffect, useCallback } from "react";
import ButtonGrid from "./ButtonGrid";
import ScientificCalculator from "./ScientificCalculator";
import FinancialCalculator from "./FinancialCalculator";
import { cn } from "../../lib/utils";
import {
  Settings,
  Grid3x3,
  Calculator,
  Brain,
  Zap,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  RotateCcw,
  Type,
  Grid,
} from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";

interface CalculatorButtonsProps {
  // Handlers de eventos
  onNumberClick: (num: string) => void;
  onOperationClick: (operation: string) => void;
  onFunctionClick: (func: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onClearEntryClick: () => void;
  onBackspaceClick: () => void;
  onMemoryClick: (action: string) => void;
  onDecimalClick: () => void;
  onToggleSignClick: () => void;
  onPercentageClick: () => void;
  onScientificFunctionClick: (func: string) => void;

  // Estados actuales
  currentOperation?: string | null;
  memoryValue?: number;
  isErrorState?: boolean;
  currentResult?: string;

  // Nuevos props necesarios para las vistas específicas
  displayValue: string;
  history: string;
  onButtonClick: (value: string) => void;
  onBackspace: () => void;

  // Configuraciones iniciales
  initialLayout?: "basic" | "scientific" | "financial";
  initialButtonSize?: "compact" | "normal" | "large";
  initialShowLabels?: boolean;
  initialAnimateButtons?: boolean;

  // Nueva prop para controlar si se muestra display interno
  hideInternalDisplay?: boolean;
}

const CalculatorButtons: React.FC<CalculatorButtonsProps> = ({
  // Handlers
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

  // Estados
  currentOperation = null,
  memoryValue = 0,
  isErrorState = false,
  currentResult = "",

  // Nuevos props
  displayValue,
  history,
  onButtonClick,
  onBackspace,

  // Configuraciones iniciales
  initialLayout = "basic",
  initialButtonSize = "normal",
  initialShowLabels = false,
  initialAnimateButtons = true,

  // Nueva prop
  hideInternalDisplay = false,
}) => {
  // Estados de configuración
  const [layout, setLayout] = useState<"basic" | "scientific" | "financial">(
    initialLayout,
  );
  const [buttonSize, setButtonSize] = useState<"compact" | "normal" | "large">(
    initialButtonSize,
  );
  const [showLabels, setShowLabels] = useState(initialShowLabels);
  const [animateButtons, setAnimateButtons] = useState(initialAnimateButtons);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [buttonOpacity, setButtonOpacity] = useState(100);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Estados de animación
  const [gridScale, setGridScale] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [highlightedOperation, setHighlightedOperation] = useState<
    string | null
  >(null);

  // Efecto para destacar operación actual
  useEffect(() => {
    if (currentOperation) {
      setHighlightedOperation(currentOperation);
      const timer = setTimeout(() => setHighlightedOperation(null), 300);
      return () => clearTimeout(timer);
    }
  }, [currentOperation]);

  // Efecto para animación de cambio de layout
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Handler combinado para los botones (para las nuevas vistas)
  const handleCombinedClick = useCallback(
    (value: string) => {
      // Determinar qué tipo de click es y llamar al handler correcto
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(value)) {
        onNumberClick(value);
      } else if (["+", "-", "*", "/"].includes(value)) {
        onOperationClick(value);
      } else if (value === "=") {
        onEqualsClick();
      } else if (value === "C" || value === "CE") {
        onClearClick();
      } else if (value === "⌫") {
        onBackspaceClick();
      } else if (["M+", "M-", "MR", "MC"].includes(value)) {
        onMemoryClick(value);
      } else if (value === ".") {
        onDecimalClick();
      } else if (value === "%") {
        onPercentageClick();
      } else {
        // Para funciones científicas y otras
        onButtonClick(value);
      }
    },
    [
      onNumberClick,
      onOperationClick,
      onEqualsClick,
      onClearClick,
      onBackspaceClick,
      onMemoryClick,
      onDecimalClick,
      onPercentageClick,
      onButtonClick,
    ],
  );

  // Handlers para operaciones con efectos adicionales
  const handleNumberClick = useCallback(
    (num: string) => {
      if (soundEnabled) {
        playNumberSound(num);
      }
      if (vibrationEnabled && "vibrate" in navigator) {
        navigator.vibrate?.(5);
      }
      onNumberClick(num);
    },
    [onNumberClick, soundEnabled, vibrationEnabled],
  );

  const handleOperationClick = useCallback(
    (operation: string) => {
      if (soundEnabled) {
        playOperationSound(operation);
      }
      if (vibrationEnabled && "vibrate" in navigator) {
        navigator.vibrate?.(10);
      }

      // Animación de destello para operación
      setHighlightedOperation(operation);

      onOperationClick(operation);
    },
    [onOperationClick, soundEnabled, vibrationEnabled],
  );

  const handleEqualsClick = useCallback(() => {
    if (soundEnabled) {
      playEqualsSound();
    }
    if (vibrationEnabled && "vibrate" in navigator) {
      navigator.vibrate?.(20);
    }

    // Animación de escala para igual
    setGridScale(1.02);
    setTimeout(() => setGridScale(1), 150);

    onEqualsClick();
  }, [onEqualsClick, soundEnabled, vibrationEnabled]);

  const handleScientificFunctionClick = useCallback(
    (func: string) => {
      if (soundEnabled) {
        playFunctionSound(func);
      }
      if (vibrationEnabled && "vibrate" in navigator) {
        navigator.vibrate?.(15);
      }

      // Animación especial para funciones científicas
      if (layout === "scientific") {
        setGridScale(0.98);
        setTimeout(() => setGridScale(1), 200);
      }

      onScientificFunctionClick(func);
    },
    [onScientificFunctionClick, soundEnabled, vibrationEnabled, layout],
  );

  // Funciones de sonido
  const playNumberSound = (num: string) => {
    // Implementación simple - en producción usaría Web Audio API
    console.log(`Playing sound for number ${num}`);
  };

  const playOperationSound = (operation: string) => {
    console.log(`Playing sound for operation ${operation}`);
  };

  const playEqualsSound = () => {
    console.log("Playing equals sound");
  };

  const playFunctionSound = (func: string) => {
    console.log(`Playing sound for function ${func}`);
  };

  // Handlers para configuración
  const handleLayoutChange = (
    newLayout: "basic" | "scientific" | "financial",
  ) => {
    setIsTransitioning(true);
    setLayout(newLayout);

    // Animación de transición
    setGridScale(0.95);
    setTimeout(() => setGridScale(1), 300);
  };

  const handleButtonSizeChange = (size: "compact" | "normal" | "large") => {
    setButtonSize(size);

    // Animación de ajuste de tamaño
    setGridScale(size === "compact" ? 0.9 : size === "large" ? 1.05 : 1);
    setTimeout(() => setGridScale(1), 200);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);

    // Animación de transición a pantalla completa
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
      setGridScale(1.05);
      setTimeout(() => setGridScale(1), 300);
    } else {
      document.exitFullscreen?.();
      setGridScale(0.95);
      setTimeout(() => setGridScale(1), 300);
    }
  };

  const handleResetSettings = () => {
    setLayout(initialLayout);
    setButtonSize(initialButtonSize);
    setShowLabels(initialShowLabels);
    setAnimateButtons(initialAnimateButtons);
    setButtonOpacity(100);

    // Animación de reset
    setGridScale(0.9);
    setTimeout(() => setGridScale(1), 400);
  };

  // Renderizar icono de layout
  const getLayoutIcon = () => {
    switch (layout) {
      case "scientific":
        return <Brain className="h-4 w-4" />;
      case "financial":
        return <Calculator className="h-4 w-4" />;
      case "basic":
      default:
        return <Grid3x3 className="h-4 w-4" />;
    }
  };

  // Renderizar nombre del layout
  const getLayoutName = () => {
    switch (layout) {
      case "scientific":
        return "Científica";
      case "financial":
        return "Financiera";
      case "basic":
      default:
        return "Básica";
    }
  };

  // Renderizar la vista según el layout
  const renderCalculatorView = () => {
    const commonProps = {
      displayValue,
      history,
      onButtonClick: handleCombinedClick,
      onClear: onClearClick,
      onEquals: onEqualsClick,
      onBackspace: onBackspace,
      isError: isErrorState,
    };

    switch (layout) {
      case "scientific":
        return (
          <ScientificCalculator
            {...commonProps}
            hideDisplay={hideInternalDisplay}
          />
        );

      case "financial":
        return (
          <FinancialCalculator
            {...commonProps}
            hideDisplay={hideInternalDisplay}
          />
        );

      case "basic":
      default:
        return (
          <div
            className={cn(
              "transition-all duration-300 ease-out",
              isTransitioning && "opacity-80",
            )}
            style={{
              transform: `scale(${gridScale})`,
              opacity: `${buttonOpacity}%`,
            }}
          >
            <ButtonGrid
              // Handlers
              onNumberClick={handleNumberClick}
              onOperationClick={handleOperationClick}
              onFunctionClick={onFunctionClick}
              onEqualsClick={handleEqualsClick}
              onClearClick={onClearClick}
              onClearEntryClick={onClearEntryClick}
              onBackspaceClick={onBackspaceClick}
              onMemoryClick={onMemoryClick}
              onDecimalClick={onDecimalClick}
              onToggleSignClick={onToggleSignClick}
              onPercentageClick={onPercentageClick}
              onScientificFunctionClick={handleScientificFunctionClick}
              // Estados
              currentOperation={highlightedOperation || currentOperation}
              memoryValue={memoryValue}
              isErrorState={isErrorState}
              currentResult={currentResult}
              // Configuraciones
              layout={layout}
              buttonSize={buttonSize}
              showLabels={showLabels}
              animateButtons={animateButtons}
              // Props para ocultar display
              displayValue={displayValue}
              history={history}
              hideDisplay={hideInternalDisplay}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Panel de configuración */}
      <div className="bg-gradient-to-br from-bg-200/40 to-bg-300/20 backdrop-blur-sm rounded-xl border border-bg-300/40 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Lado izquierdo: Info y modo actual */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  layout === "scientific"
                    ? "bg-accent-100/20 text-accent-100"
                    : layout === "financial"
                      ? "bg-primary-200/20 text-primary-200"
                      : "bg-primary-200/20 text-primary-200",
                )}
              >
                {getLayoutIcon()}
              </div>
              <div>
                <div className="text-sm font-medium text-text-100">
                  Calculadora {getLayoutName()}
                </div>
                <div className="text-xs text-text-200/70">
                  {layout === "scientific"
                    ? "Funciones trigonométricas, logaritmos, potencias"
                    : layout === "financial"
                      ? "Préstamos, inversiones, conversión de divisas"
                      : "Operaciones aritméticas básicas"}
                </div>
              </div>
            </div>

            {/* Indicadores de estado */}
            <div className="hidden md:flex items-center gap-3">
              {memoryValue !== 0 && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary-200/10 border border-primary-200/20">
                  <Zap className="h-3 w-3 text-primary-200" />
                  <span className="text-xs text-primary-200">
                    Memoria: {memoryValue.toFixed(2)}
                  </span>
                </div>
              )}

              {isErrorState && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs text-red-400">Error</span>
                </div>
              )}
            </div>
          </div>

          {/* Lado derecho: Controles */}
          <div className="flex items-center gap-2">
            {/* Selector de layout */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-bg-300/50 text-text-200 hover:text-primary-200 hover:border-primary-200/30"
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Modo
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-bg-200 border-bg-300/40"
              >
                <DropdownMenuLabel>Seleccionar Modo</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleLayoutChange("basic")}
                  className={cn(
                    "cursor-pointer",
                    layout === "basic" && "bg-primary-200/10 text-primary-200",
                  )}
                >
                  <Grid3x3 className="h-4 w-4 mr-2" />
                  Básica
                  <span className="ml-auto text-xs text-text-200/60">
                    Simple
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLayoutChange("scientific")}
                  className={cn(
                    "cursor-pointer",
                    layout === "scientific" &&
                      "bg-accent-100/10 text-accent-100",
                  )}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Científica
                  <span className="ml-auto text-xs text-text-200/60">
                    Avanzado
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLayoutChange("financial")}
                  className={cn(
                    "cursor-pointer",
                    layout === "financial" &&
                      "bg-primary-200/10 text-primary-200",
                  )}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Financiera
                  <span className="ml-auto text-xs text-text-200/60">
                    Profesional
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Botón de configuración (solo para modo básico) */}
            {layout === "basic" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/50 text-text-200 hover:text-primary-200 hover:border-primary-200/30"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-bg-200 border-bg-300/40"
                >
                  <DropdownMenuLabel>Configuración</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Tamaño de botones */}
                  <div className="px-2 py-1.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-200">
                        Tamaño de botones
                      </span>
                      <span className="text-xs text-text-200/60">
                        {buttonSize}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {(["compact", "normal", "large"] as const).map((size) => (
                        <Button
                          key={size}
                          size="sm"
                          variant={buttonSize === size ? "default" : "outline"}
                          onClick={() => handleButtonSizeChange(size)}
                          className={cn(
                            "flex-1",
                            buttonSize === size
                              ? "bg-primary-200/20 border-primary-200/30 text-primary-200"
                              : "border-bg-300/50 text-text-200",
                          )}
                        >
                          {size === "compact"
                            ? "S"
                            : size === "normal"
                              ? "M"
                              : "L"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* Opciones de visualización */}
                  <div className="space-y-2 px-2 py-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Type className="h-4 w-4 text-text-200/70" />
                        <span className="text-sm text-text-200">
                          Mostrar labels
                        </span>
                      </div>
                      <Switch
                        checked={showLabels}
                        onCheckedChange={setShowLabels}
                        className="data-[state=checked]:bg-primary-200"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-text-200/70" />
                        <span className="text-sm text-text-200">
                          Animaciones
                        </span>
                      </div>
                      <Switch
                        checked={animateButtons}
                        onCheckedChange={setAnimateButtons}
                        className="data-[state=checked]:bg-primary-200"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {theme === "dark" ? (
                          <Moon className="h-4 w-4 text-text-200/70" />
                        ) : (
                          <Sun className="h-4 w-4 text-text-200/70" />
                        )}
                        <span className="text-sm text-text-200">Sonidos</span>
                      </div>
                      <Switch
                        checked={soundEnabled}
                        onCheckedChange={setSoundEnabled}
                        className="data-[state=checked]:bg-primary-200"
                      />
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* Opacidad */}
                  <div className="px-2 py-1.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-200">Opacidad</span>
                      <span className="text-xs text-text-200/60">
                        {buttonOpacity}%
                      </span>
                    </div>
                    <Slider
                      value={[buttonOpacity]}
                      onValueChange={([value]) => setButtonOpacity(value)}
                      max={100}
                      min={60}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <DropdownMenuSeparator />

                  {/* Acciones */}
                  <div className="space-y-1 px-2 py-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-bg-300/50 text-text-200 hover:text-primary-200"
                      onClick={handleFullscreenToggle}
                    >
                      {isFullscreen ? (
                        <>
                          <Minimize2 className="h-4 w-4 mr-2" />
                          Salir de pantalla completa
                        </>
                      ) : (
                        <>
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Pantalla completa
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-bg-300/50 text-text-200 hover:text-red-400 hover:border-red-400/30"
                      onClick={handleResetSettings}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Restablecer configuración
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Renderizar la vista según el layout */}
      {renderCalculatorView()}

      {/* Información de ayuda */}
      <div className="bg-gradient-to-br from-bg-200/20 to-bg-300/10 backdrop-blur-sm rounded-xl border border-bg-300/30 p-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="space-y-1">
            <div className="text-text-200/70">Atajos de teclado</div>
            <div className="text-text-100 font-medium">
              0-9, +, -, *, /, Enter
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-text-200/70">Cambiar modo</div>
            <div className="text-text-100 font-medium">
              Ctrl+B: Básica, Ctrl+S: Científica, Ctrl+F: Financiera
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-text-200/70">Modo actual</div>
            <div className="text-text-100 font-medium">{getLayoutName()}</div>
          </div>

          <div className="space-y-1">
            <div className="text-text-200/70">Funciones</div>
            <div className="text-text-100 font-medium">
              {layout === "scientific"
                ? "25+ funciones"
                : layout === "financial"
                  ? "Herramientas financieras"
                  : "Operaciones básicas"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorButtons;
