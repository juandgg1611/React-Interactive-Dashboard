// src/components/auth/recovery/VerificationCodeInput.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Clock,
  RefreshCw,
  Mail,
  Smartphone,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

interface VerificationCodeInputProps {
  codeLength?: number;
  onCodeComplete: (code: string) => void;
  onResendCode: () => void;
  countdownSeconds?: number;
  email?: string;
  verificationMethod?: "email" | "sms";
}

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  codeLength = 6,
  onCodeComplete,
  onResendCode,
  countdownSeconds = 300,
  email = "",
  verificationMethod = "email",
}) => {
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(""));
  const [countdown, setCountdown] = useState(countdownSeconds);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Manejar cambio en cada input
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    setError(null);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus al siguiente input
    if (value !== "" && index < codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Verificar si el código está completo
    const fullCode = newCode.join("");
    if (fullCode.length === codeLength) {
      validateCode(fullCode);
    }
  };

  // Validar código
  const validateCode = async (fullCode: string) => {
    setIsValidating(true);
    setError(null);

    try {
      // Simular validación
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Aquí iría la validación real con tu backend
      // Por ahora simulamos éxito
      onCodeComplete(fullCode);
    } catch (err) {
      setError("Código incorrecto. Intenta nuevamente.");
      // Limpiar inputs en caso de error
      setCode(Array(codeLength).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsValidating(false);
    }
  };

  // Manejar teclas
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];

      if (code[index] !== "" && code[index] !== undefined) {
        // Si hay un dígito, lo elimina
        newCode[index] = "";
      } else if (index > 0) {
        // Si está vacío, va al anterior
        newCode[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }

      setCode(newCode);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Pegar código completo
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    const pastedCode = pastedData.slice(0, codeLength).split("");

    const newCode = [...code];
    pastedCode.forEach((digit, index) => {
      if (index < codeLength) {
        newCode[index] = digit;
      }
    });

    setCode(newCode);

    // Auto-focus al último dígito pegado
    const lastIndex = Math.min(pastedCode.length - 1, codeLength - 1);
    inputRefs.current[lastIndex]?.focus();

    // Si el código está completo, validar
    if (pastedCode.length === codeLength) {
      validateCode(pastedCode.join(""));
    }
  };

  // Temporizador
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Reenviar código
  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onResendCode();
      setCountdown(countdownSeconds);
      setCanResend(false);
      setCode(Array(codeLength).fill(""));
      inputRefs.current[0]?.focus();

      // Mostrar mensaje de éxito
      setTimeout(() => {
        setError(null);
      }, 3000);
    } catch (err) {
      setError("Error al reenviar. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Icono según método
  const MethodIcon = verificationMethod === "email" ? Mail : Smartphone;

  return (
    <div className="space-y-6">
      {/* Información del método */}
      <div className="bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-100/20">
            <MethodIcon className="h-5 w-5 text-primary-200" />
          </div>
          <div>
            <p className="text-sm text-text-200">
              Código enviado por{" "}
              {verificationMethod === "email" ? "correo" : "SMS"}
            </p>
            <p className="font-medium text-text-100">
              {email.replace(/(.{2})(.*)(?=@)/, "$1*****")}
            </p>
          </div>
        </div>
      </div>

      {/* Inputs de código */}
      <div className="space-y-4">
        <label className="block text-sm text-text-200">
          Ingresa el código de {codeLength} dígitos:
        </label>

        <div className="flex justify-center gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-bg-300/30 backdrop-blur-sm text-text-100 focus:outline-none focus:border-primary-200/50 transition-all duration-200 ${
                digit !== ""
                  ? "border-primary-200/50 shadow-lg shadow-primary-200/10"
                  : "border-bg-300/50"
              }`}
              autoFocus={index === 0}
              disabled={isValidating}
            />
          ))}
        </div>

        {/* Estado de validación */}
        {isValidating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary-200"
          >
            <div className="w-4 h-4 border-2 border-primary-200 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Validando código...</span>
          </motion.div>
        )}
      </div>

      {/* Temporizador */}
      <div className="text-center">
        <div
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm ${
            countdown > 60
              ? "bg-primary-100/10 text-primary-200"
              : countdown > 30
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-red-500/10 text-red-400"
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>El código expira en {formatTime(countdown)}</span>
        </div>
      </div>

      {/* Mensajes de error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
        >
          <AlertCircle className="h-5 w-5 text-red-400" />
          <span className="text-sm text-red-400">{error}</span>
        </motion.div>
      )}

      {/* Acciones */}
      <div className="space-y-3">
        <button
          onClick={handleResend}
          disabled={!canResend || isLoading}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            canResend && !isLoading
              ? "bg-gradient-to-r from-primary-100/10 to-primary-200/10 border border-primary-200/30 text-primary-200 hover:bg-primary-100/20"
              : "bg-bg-300/30 text-text-200/50 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-200 border-t-transparent rounded-full animate-spin" />
              Reenviando...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              {canResend
                ? "Reenviar código"
                : `Espera ${formatTime(countdown)}`}
            </>
          )}
        </button>

        <div className="text-center">
          <p className="text-sm text-text-200">
            ¿Problemas con el código?{" "}
            <button className="text-primary-200 hover:text-primary-300 font-medium">
              Contactar soporte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
