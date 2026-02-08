import React, { useState, useEffect } from "react";
import BasicButton from "./BasicButton";
import CalculatorDisplay from "./CalculatorDisplay";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FinancialCalculatorProps {
  displayValue: string;
  history: string;
  onButtonClick: (value: string) => void;
  onClear: () => void;
  onEquals: () => void;
  onBackspace: () => void;
  hideDisplay?: boolean;
}

type FinancialTab = "currency" | "loan" | "investment" | "converter";

// Interfaz para la respuesta de la API (basada en la respuesta que muestras)
interface ApiResponse {
  current: {
    usd: number;
    eur: number;
    date: string;
  };
  previous?: {
    usd: number;
    eur: number;
    date: string;
  };
  changePercentage?: {
    usd: number;
    eur: number;
  };
}

// Interfaz para las tasas BCV
interface BcvRates {
  EUR: number;
  CNY: number;
  TRY: number;
  RUB: number;
  USD: number;
  VES: number;
}

// Tipo para las claves de bcvRates
type CurrencyCode = keyof BcvRates;

const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({
  displayValue,
  history,
  onButtonClick,
  onClear,
  onEquals,
  onBackspace,
  hideDisplay = false,
}) => {
  // Estados principales
  const [activeTab, setActiveTab] = useState<FinancialTab>("currency");
  const [showFinancePanel, setShowFinancePanel] = useState(false);

  // Estados de datos financieros
  const [currencyFrom, setCurrencyFrom] = useState<CurrencyCode>("USD");
  const [currencyTo, setCurrencyTo] = useState<CurrencyCode>("VES");
  const [amountToConvert, setAmountToConvert] = useState<string>("100");
  const [loanAmount, setLoanAmount] = useState<string>("10000");
  const [interestRate, setInterestRate] = useState<string>("5.5");
  const [loanTerm, setLoanTerm] = useState<string>("5");
  const [investmentAmount, setInvestmentAmount] = useState<string>("5000");
  const [roiRate, setRoiRate] = useState<string>("7");
  const [investmentTerm, setInvestmentTerm] = useState<string>("3");

  // Estados para la API
  const [bcvRates, setBcvRates] = useState<BcvRates>({
    EUR: 440.4768495,
    CNY: 53.27401438,
    TRY: 8.51257385,
    RUB: 4.87376281,
    USD: 370.2544,
    VES: 1.0,
  });
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // TU API KEY - REEMPLAZA ESTO CON TU KEY REAL
  const API_KEY =
    "a37f147c890a759b23ab7e7f3c3ea9b4d2c07e8fcb7572416ebafb24f552018f";
  const API_URL = "https://api.dolarvzla.com/public/exchange-rate";

  // Función para obtener tasas de la API
  const fetchExchangeRates = async () => {
    setIsLoadingRates(true);
    setErrorMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "x-dolarvzla-key": API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      console.log("API Response:", data); // Para debug

      if (!data.current) {
        throw new Error("Formato de respuesta inválido");
      }

      // Formatear la fecha
      const formattedDate = new Date(data.current.date).toLocaleDateString(
        "es-VE",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      );

      // Obtener tasas de la respuesta
      const usdRate = data.current.usd;
      const eurRate = data.current.eur;

      // Validar que las tasas sean números válidos
      if (isNaN(usdRate) || isNaN(eurRate)) {
        throw new Error("Tasas inválidas en la respuesta");
      }

      // Calcular otras monedas basadas en USD (tasas aproximadas)
      // Estos factores pueden necesitar ajuste
      const cnyFactor = 0.144; // 1 USD ≈ 6.94 CNY
      const tryFactor = 0.023; // 1 USD ≈ 43.48 TRY
      const rubFactor = 0.013; // 1 USD ≈ 76.00 RUB

      const updatedRates: BcvRates = {
        USD: usdRate,
        EUR: eurRate,
        CNY: usdRate * cnyFactor,
        TRY: usdRate * tryFactor,
        RUB: usdRate * rubFactor,
        VES: 1.0,
      };

      setBcvRates(updatedRates);
      setLastUpdated(formattedDate);
    } catch (error) {
      console.error("Error obteniendo tasas BCV:", error);
      setErrorMessage(
        "No se pudieron cargar las tasas actualizadas. Usando valores guardados.",
      );

      // Usar valores por defecto con fecha actual
      const now = new Date().toLocaleDateString("es-VE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setLastUpdated(now + " (cached)");
    } finally {
      setIsLoadingRates(false);
    }
  };

  // Cargar tasas al montar el componente
  useEffect(() => {
    fetchExchangeRates();

    // Actualizar cada 5 minutos (300000 ms)
    const intervalId = setInterval(fetchExchangeRates, 300000);

    return () => clearInterval(intervalId);
  }, []);

  // Iconos SVG profesionales
  const icons = {
    currency: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      </svg>
    ),
    loan: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    investment: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 20l9-5-9-5-9 5 9 5z" />
        <path d="M12 15l9-5-9-5-9 5 9 5z" />
        <path d="M12 10l9-5-9-5-9 5 9 5z" />
      </svg>
    ),
    converter: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M8 7h12M8 13h12M8 19h12M4 7h.01M4 13h.01M4 19h.01" />
      </svg>
    ),
    finance: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    chevron: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    ),
    refresh: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M23 4v6h-6M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
    loading: (
      <svg
        className="w-4 h-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  };

  // Tabs financieras (solo las 4 solicitadas)
  const financialTabs = [
    {
      id: "currency" as FinancialTab,
      label: "Divisas BCV",
      icon: icons.currency,
    },
    {
      id: "converter" as FinancialTab,
      label: "Conversor",
      icon: icons.converter,
    },
    { id: "loan" as FinancialTab, label: "Préstamos", icon: icons.loan },
    {
      id: "investment" as FinancialTab,
      label: "Inversiones",
      icon: icons.investment,
    },
  ];

  // Funciones de cálculo - CORREGIDAS con validaciones
  const calculateCurrencyConversion = () => {
    try {
      const amount = parseFloat(amountToConvert);
      const rateFrom = bcvRates[currencyFrom];
      const rateTo = bcvRates[currencyTo];

      if (isNaN(amount) || !rateFrom || !rateTo) {
        return "0.00";
      }

      const result = (amount * rateFrom) / rateTo;
      return isNaN(result) ? "0.00" : result.toFixed(2);
    } catch (error) {
      console.error("Error en cálculo de conversión:", error);
      return "0.00";
    }
  };

  const getConversionRate = () => {
    try {
      const rateFrom = bcvRates[currencyFrom];
      const rateTo = bcvRates[currencyTo];

      if (!rateFrom || !rateTo || rateFrom === 0) {
        return "0.000000";
      }

      const rate = rateTo / rateFrom;
      return isNaN(rate) ? "0.000000" : rate.toFixed(6);
    } catch (error) {
      console.error("Error obteniendo tasa de conversión:", error);
      return "0.000000";
    }
  };

  const calculateLoanPayment = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (P > 0 && r > 0 && n > 0) {
      const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return monthly.toFixed(2);
    }
    return "0.00";
  };

  const calculateFutureValue = () => {
    const P = parseFloat(investmentAmount);
    const r = parseFloat(roiRate) / 100;
    const n = parseFloat(investmentTerm);

    if (P > 0 && r > 0 && n > 0) {
      const futureValue = P * Math.pow(1 + r, n);
      return futureValue.toFixed(2);
    }
    return "0.00";
  };

  // Botones financieros COMPLETOS: PV, FV, PMT, NPV, IRR, ROI
  const financialButtons = [
    { label: "PV", value: "PV(", tooltip: "Valor Presente" },
    { label: "FV", value: "FV(", tooltip: "Valor Futuro" },
    { label: "PMT", value: "PMT(", tooltip: "Pago Periódico" },
    { label: "NPV", value: "NPV(", tooltip: "Valor Presente Neto" },
    { label: "IRR", value: "IRR(", tooltip: "Tasa Interna de Retorno" },
    { label: "ROI", value: "ROI(", tooltip: "Retorno sobre Inversión" },
  ];

  // Botones de calculadora básica - TAMAÑO AUMENTADO
  const basicButtons = [
    // Fila 1
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
    ],
    // Fila 2
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
    ],
    // Fila 3
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
    ],
    // Fila 4
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
    ],
    // Fila 5 - TAMAÑO AUMENTADO
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
        label: "%",
        value: "%",
        variant: "operation" as const,
        tooltip: "Porcentaje",
      },
    ],
  ];

  const handleButtonClick = (value: string) => {
    if (value === "CE" || value === "C") onClear();
    else if (value === "⌫") onBackspace();
    else if (value === "=") onEquals();
    else onButtonClick(value);
  };

  // Renderizar contenido del tab financiero - CORREGIDO
  const renderFinanceContent = () => {
    switch (activeTab) {
      case "currency":
        return (
          <div className="space-y-4">
            {/* Panel de tasas con estado de carga */}
            <div className="bg-bg-300/10 rounded-xl p-4 border border-bg-300/20">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-text-100">
                    Tasas BCV Oficiales
                  </h4>
                  {isLoadingRates && (
                    <div className="flex items-center gap-1 text-xs text-primary-200">
                      {icons.loading}
                      <span>Cargando...</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchExchangeRates}
                    disabled={isLoadingRates}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      "hover:bg-bg-300/30 disabled:opacity-50 disabled:cursor-not-allowed",
                      isLoadingRates ? "text-primary-200" : "text-text-200",
                    )}
                    title="Actualizar tasas"
                  >
                    {isLoadingRates ? icons.loading : icons.refresh}
                  </button>
                  <span className="text-xs text-text-200/60 bg-bg-300/30 px-2 py-1 rounded">
                    {lastUpdated || "Cargando..."}
                  </span>
                </div>
              </div>

              {/* Mensaje de error */}
              {errorMessage && (
                <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-xs text-red-300">{errorMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(Object.keys(bcvRates) as CurrencyCode[]).map((currency) => {
                  const rate = bcvRates[currency];
                  // Verificar que rate existe antes de usar toFixed
                  const displayRate = rate !== undefined ? rate : 0;
                  const formattedRate = !isNaN(displayRate)
                    ? displayRate.toFixed(2)
                    : "0.00";
                  const formattedDetail = !isNaN(displayRate)
                    ? displayRate.toFixed(4)
                    : "0.0000";

                  return (
                    <div
                      key={currency}
                      className={cn(
                        "bg-bg-200/50 rounded-lg p-3 transition-all duration-300",
                        currency === "USD" || currency === "EUR"
                          ? "ring-1 ring-primary-200/30"
                          : "",
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text-100">
                            {currency}
                          </span>
                          {(currency === "USD" || currency === "EUR") && (
                            <span className="text-xs px-1.5 py-0.5 bg-primary-200/20 text-primary-200 rounded">
                              Live
                            </span>
                          )}
                        </div>
                        <span className="text-primary-200 font-bold">
                          {formattedRate} Bs
                        </span>
                      </div>
                      <div className="text-xs text-text-200/60 mt-1">
                        1 {currency} = {formattedDetail} VES
                      </div>
                      {currency === "USD" || currency === "EUR" ? (
                        <div className="text-xs text-green-400/80 mt-1">
                          ✓ Actualizado desde API
                        </div>
                      ) : (
                        <div className="text-xs text-text-200/40 mt-1">
                          Calculado relativo
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Información de la API */}
              <div className="mt-3 pt-3 border-t border-bg-300/20">
                <p className="text-xs text-text-200/60">
                  <span className="text-primary-200">USD y EUR:</span> Tasas
                  oficiales BCV en tiempo real.
                  <span className="text-text-200/40 ml-2">
                    Otras monedas: Calculadas relativamente.
                  </span>
                </p>
              </div>
            </div>
          </div>
        );

      case "converter":
        return (
          <div className="space-y-4">
            {/* Estado de carga en conversor */}
            {isLoadingRates && (
              <div className="flex items-center justify-center p-3 bg-bg-300/10 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-primary-200">
                  {icons.loading}
                  <span>Actualizando tasas...</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-200 mb-2">
                  Convertir de
                </label>
                <Select
                  value={currencyFrom}
                  onValueChange={(value) =>
                    setCurrencyFrom(value as CurrencyCode)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(bcvRates) as CurrencyCode[]).map(
                      (currency) => (
                        <SelectItem key={currency} value={currency}>
                          <div className="flex items-center justify-between w-full">
                            <span>{currency}</span>
                            {(currency === "USD" || currency === "EUR") && (
                              <span className="text-xs text-primary-200">
                                ✓ Live
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-200 mb-2">
                  a
                </label>
                <Select
                  value={currencyTo}
                  onValueChange={(value) =>
                    setCurrencyTo(value as CurrencyCode)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(bcvRates) as CurrencyCode[]).map(
                      (currency) => (
                        <SelectItem key={currency} value={currency}>
                          <div className="flex items-center justify-between w-full">
                            <span>{currency}</span>
                            {(currency === "USD" || currency === "EUR") && (
                              <span className="text-xs text-primary-200">
                                ✓ Live
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-200 mb-2">
                Monto a convertir
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amountToConvert}
                  onChange={(e) =>
                    setAmountToConvert(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  className="w-full bg-bg-300/20 border border-bg-300/30 rounded-lg px-4 py-3 text-text-100"
                  placeholder="0.00"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-200">
                  {currencyFrom}
                </span>
              </div>
            </div>

            <div className="bg-primary-100/10 rounded-lg p-4 border border-primary-200/20">
              <div className="text-center">
                <div className="text-sm text-text-200 mb-2">Resultado</div>
                <div className="text-2xl font-bold text-primary-200">
                  {calculateCurrencyConversion()} {currencyTo}
                </div>
                <div className="text-xs text-text-200/60 mt-2">
                  1 {currencyFrom} = {getConversionRate()} {currencyTo}
                </div>
                <div className="text-xs text-text-200/40 mt-1">
                  {lastUpdated &&
                    `Tasas actualizadas: ${lastUpdated.split(" ")[0]}`}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClear();
                const rateFrom = bcvRates[currencyFrom];
                const rateTo = bcvRates[currencyTo];
                if (rateFrom && rateTo && rateFrom !== 0) {
                  onButtonClick(`${amountToConvert}*(${rateTo}/${rateFrom})`);
                  onEquals();
                }
              }}
              className="w-full px-4 py-3 bg-primary-200 hover:bg-primary-300 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoadingRates}
            >
              {isLoadingRates ? (
                <div className="flex items-center justify-center gap-2">
                  {icons.loading}
                  <span>Cargando tasas...</span>
                </div>
              ) : (
                "Insertar conversión en calculadora"
              )}
            </button>
          </div>
        );

      // ... resto de los casos (loan, investment) igual que antes
      case "loan":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-200 mb-2">
                Monto del préstamo (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-200">
                  $
                </span>
                <input
                  type="text"
                  value={loanAmount}
                  onChange={(e) =>
                    setLoanAmount(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  className="w-full bg-bg-300/20 border border-bg-300/30 rounded-lg pl-8 pr-4 py-3 text-text-100"
                  placeholder="10000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-200 mb-2">
                  Tasa de interés (% anual)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={interestRate}
                    onChange={(e) =>
                      setInterestRate(e.target.value.replace(/[^0-9.]/g, ""))
                    }
                    className="w-full bg-bg-300/20 border border-bg-300/30 rounded-lg px-4 py-3 text-text-100"
                    placeholder="5.5"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-200">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-200 mb-2">
                  Plazo (años)
                </label>
                <input
                  type="text"
                  value={loanTerm}
                  onChange={(e) =>
                    setLoanTerm(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full bg-bg-300/20 border border-bg-300/30 rounded-lg px-4 py-3 text-text-100"
                  placeholder="5"
                />
              </div>
            </div>

            <div className="bg-bg-300/20 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-200">Pago mensual estimado:</span>
                <span className="text-xl font-bold text-primary-200">
                  ${calculateLoanPayment()}
                </span>
              </div>
              <div className="text-sm text-text-200/60">
                Total a pagar: $
                {(
                  parseFloat(calculateLoanPayment()) *
                  parseFloat(loanTerm) *
                  12
                ).toFixed(2)}
              </div>
            </div>

            <button
              onClick={() => {
                onClear();
                onButtonClick(
                  `PMT(${interestRate}/100/12, ${loanTerm}*12, ${loanAmount})`,
                );
                onEquals();
              }}
              className="w-full px-4 py-3 bg-primary-200 hover:bg-primary-300 text-white font-medium rounded-lg transition-colors"
            >
              Calcular préstamo en USD
            </button>
          </div>
        );

      case "investment":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-200 mb-2">
                Inversión inicial (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-200">
                  $
                </span>
                <input
                  type="text"
                  value={investmentAmount}
                  onChange={(e) =>
                    setInvestmentAmount(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  className="w-full bg-bg-300/20 border border-bg-300/30 rounded-lg pl-8 pr-4 py-3 text-text-100"
                  placeholder="5000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-200 mb-2">
                  ROI anual (%)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={roiRate}
                    onChange={(e) =>
                      setRoiRate(e.target.value.replace(/[^0-9.]/g, ""))
                    }
                    className="w-full bg-bg-300/20 border border-bg-300/30 rounded-lg px-4 py-3 text-text-100"
                    placeholder="7"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-200">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-200 mb-2">
                  Período (años)
                </label>
                <input
                  type="text"
                  value={investmentTerm}
                  onChange={(e) =>
                    setInvestmentTerm(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full bg-bg-300/20 border border-bg-300/30 rounded-lg px-4 py-3 text-text-100"
                  placeholder="3"
                />
              </div>
            </div>

            <div className="bg-bg-300/20 rounded-lg p-4">
              <div className="text-center">
                <div className="text-text-200 mb-1">Valor futuro estimado</div>
                <div className="text-2xl font-bold text-primary-200">
                  ${calculateFutureValue()}
                </div>
                <div className="text-sm text-text-200/60 mt-2">
                  Ganancia estimada: $
                  {(
                    parseFloat(calculateFutureValue()) -
                    parseFloat(investmentAmount)
                  ).toFixed(2)}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClear();
                onButtonClick(
                  `FV(${roiRate}/100, ${investmentTerm}, 0, -${investmentAmount})`,
                );
                onEquals();
              }}
              className="w-full px-4 py-3 bg-primary-200 hover:bg-primary-300 text-white font-medium rounded-lg transition-colors"
            >
              Calcular inversión
            </button>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 text-text-200/50">
              {financialTabs.find((t) => t.id === activeTab)?.icon}
            </div>
            <p className="text-text-200 text-lg font-medium">
              {financialTabs.find((t) => t.id === activeTab)?.label}
            </p>
            <p className="text-text-200/60 mt-2">Funcionalidad en desarrollo</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-w-7xl mx-auto">
      {/* SECCIÓN 1: CALCULADORA NORMAL */}
      <div className="bg-bg-200/30 rounded-2xl border border-bg-300/20 p-6">
        {/* Display principal (condicional) */}
        {!hideDisplay && (
          <div className="mb-6">
            <CalculatorDisplay value={displayValue} history={history} />
          </div>
        )}

        {/* Calculadora básica COMPLETA */}
        <div className="space-y-4">
          {/* Botones financieros COMPLETOS: 6 botones */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
            {financialButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => onButtonClick(btn.value)}
                className="px-3 py-3 text-sm bg-bg-300/20 hover:bg-bg-300/30 rounded-lg border border-bg-300/30 transition-colors text-text-100 flex items-center justify-center"
                title={btn.tooltip}
              >
                <span className="font-medium">{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Grid de botones de calculadora - TAMAÑO IGUAL A CIENTÍFICA */}
          <div className="space-y-2">
            {basicButtons.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-2">
                {row.map((btn) => (
                  <BasicButton
                    key={btn.value}
                    label={btn.label}
                    onClick={() => handleButtonClick(btn.value)}
                    variant={btn.variant}
                    tooltip={btn.tooltip}
                    className={cn("h-16")}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Botón para abrir/cerrar panel financiero */}
        <div className="mt-8 pt-6 border-t border-bg-300/20">
          <button
            onClick={() => setShowFinancePanel(!showFinancePanel)}
            className="w-full flex items-center justify-between px-4 py-4 bg-bg-300/10 hover:bg-bg-300/20 rounded-xl border border-bg-300/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  showFinancePanel
                    ? "bg-primary-100/20 text-primary-200"
                    : "bg-bg-300/20 text-text-200",
                )}
              >
                {icons.finance}
              </div>
              <div className="text-left">
                <div className="font-semibold text-text-100">
                  {showFinancePanel
                    ? "Ocultar herramientas financieras"
                    : "Mostrar herramientas financieras"}
                </div>
                <div className="text-sm text-text-200/70">
                  Divisas BCV en tiempo real, conversor, préstamos e inversiones
                </div>
              </div>
            </div>
            <div
              className={cn(
                "transition-transform duration-300",
                showFinancePanel ? "rotate-180" : "",
              )}
            >
              {icons.chevron}
            </div>
          </button>
        </div>
      </div>

      {/* SECCIÓN 2: PANEL FINANCIERO (DESPLEGABLE) - SOLO 4 TABS */}
      {showFinancePanel && (
        <div className="bg-bg-200/30 rounded-2xl border border-bg-300/20 p-6 animate-in slide-in-from-top duration-300 mt-6">
          {/* Tabs de navegación financiera - SOLO 4 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {financialTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200",
                  "border hover:scale-[1.02]",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary-100/20 to-primary-200/10 border-primary-200/40 text-text-100 shadow-lg"
                    : "bg-bg-200/50 border-bg-300/30 text-text-200 hover:bg-bg-300/30",
                )}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Contenido del tab financiero activo */}
          <div className="min-h-[400px]">{renderFinanceContent()}</div>

          {/* Footer informativo */}
          <div className="mt-8 pt-6 border-t border-bg-300/20">
            <div className="text-sm text-text-200/70">
              <span className="text-primary-200 font-medium">Nota:</span> Las
              tasas USD y EUR son oficiales del BCV en tiempo real. Otras
              monedas son calculadas relativamente. Última actualización:{" "}
              {lastUpdated}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialCalculator;
