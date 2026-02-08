// src/components/auth/recovery/NewPasswordForm.tsx
import React, { useState, useEffect } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Zap,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

interface NewPasswordFormProps {
  onPasswordSubmit: (password: string) => void;
  onCancel?: () => void;
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  matchesConfirm: boolean;
}

export const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
  onPasswordSubmit,
  onCancel,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validation, setValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    matchesConfirm: false,
  });

  // Validar contraseña en tiempo real
  useEffect(() => {
    const newValidation: PasswordValidation = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      matchesConfirm: password === confirmPassword && password !== "",
    };

    setValidation(newValidation);
  }, [password, confirmPassword]);

  // Calcular fortaleza
  const calculateStrength = () => {
    const criteria = Object.values(validation);
    const passed = criteria.filter(Boolean).length;
    const total = criteria.length;
    const percentage = (passed / total) * 100;

    if (percentage >= 100)
      return {
        level: "Muy Fuerte",
        color: "text-primary-200",
        bg: "bg-primary-200",
      };
    if (percentage >= 80)
      return { level: "Fuerte", color: "text-green-400", bg: "bg-green-400" };
    if (percentage >= 60)
      return {
        level: "Moderada",
        color: "text-yellow-400",
        bg: "bg-yellow-400",
      };
    if (percentage >= 40)
      return { level: "Débil", color: "text-orange-400", bg: "bg-orange-400" };
    return { level: "Muy Débil", color: "text-red-400", bg: "bg-red-400" };
  };

  const strength = calculateStrength();
  const isFormValid = Object.values(validation).every(Boolean);

  // Generar sugerencia
  const generateSuggestion = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let suggestion = "";

    // Asegurar que tenga al menos un carácter de cada tipo
    suggestion += "A"; // Mayúscula
    suggestion += "b"; // Minúscula
    suggestion += "1"; // Número
    suggestion += "!"; // Especial

    // Añadir caracteres aleatorios hasta llegar a 12
    for (let i = 4; i < 12; i++) {
      suggestion += chars[Math.floor(Math.random() * chars.length)];
    }

    // Mezclar
    suggestion = suggestion
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return suggestion;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onPasswordSubmit(password);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-text-100 flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary-200" />
          Nueva Contraseña
        </h3>
        <p className="text-text-200">
          Crea una contraseña segura para proteger tu cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de contraseña */}
        <div className="space-y-3">
          <label className="block text-sm text-text-200">
            Nueva contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu nueva contraseña"
              autoComplete="new-password"
              className="w-full px-4 py-3 pl-11 pr-11 bg-bg-300/30 backdrop-blur-sm border border-bg-300/50 rounded-xl text-text-100 placeholder:text-text-200/50 focus:outline-none focus:border-primary-200/50 focus:ring-2 focus:ring-primary-200/20 transition-all duration-300 autofill:bg-bg-300/30 autofill:text-text-100"
              autoFocus
            />
            <Lock className="absolute left-3 top-3 h-4 w-4 text-text-200/60" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-text-200/60 hover:text-primary-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Campo de confirmación */}
        <div className="space-y-3">
          <label className="block text-sm text-text-200">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu nueva contraseña"
              autoComplete="new-password"
              className="w-full px-4 py-3 pl-11 pr-11 bg-bg-300/30 backdrop-blur-sm border border-bg-300/50 rounded-xl text-text-100 placeholder:text-text-200/50 focus:outline-none focus:border-primary-200/50 focus:ring-2 focus:ring-primary-200/20 transition-all duration-300 autofill:bg-bg-300/30 autofill:text-text-100"
            />
            <Lock className="absolute left-3 top-3 h-4 w-4 text-text-200/60" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-text-200/60 hover:text-primary-300 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Indicador de fortaleza */}
        <div className="bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-200">Seguridad:</span>
            <span className={`font-semibold ${strength.color}`}>
              {strength.level}
            </span>
          </div>

          <div className="h-2 bg-bg-300/50 rounded-full overflow-hidden mb-4">
            <motion.div
              className={`h-full ${strength.bg}`}
              initial={{ width: 0 }}
              animate={{
                width: `${(Object.values(validation).filter(Boolean).length / 6) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Requisitos */}
          <div className="space-y-2">
            {[
              {
                key: "minLength" as keyof PasswordValidation,
                label: "Mínimo 8 caracteres",
              },
              {
                key: "hasUppercase" as keyof PasswordValidation,
                label: "Una mayúscula (A-Z)",
              },
              {
                key: "hasLowercase" as keyof PasswordValidation,
                label: "Una minúscula (a-z)",
              },
              {
                key: "hasNumber" as keyof PasswordValidation,
                label: "Un número (0-9)",
              },
              {
                key: "hasSpecialChar" as keyof PasswordValidation,
                label: "Un carácter especial (!@#$...)",
              },
              {
                key: "matchesConfirm" as keyof PasswordValidation,
                label: "Las contraseñas coinciden",
              },
            ].map((req) => (
              <div key={req.key} className="flex items-center gap-2">
                {validation[req.key] ? (
                  <CheckCircle2 className="h-4 w-4 text-primary-200" />
                ) : (
                  <XCircle className="h-4 w-4 text-text-200/50" />
                )}
                <span
                  className={`text-sm ${validation[req.key] ? "text-primary-200" : "text-text-200/70"}`}
                >
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sugerencia */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-100/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary-100/20">
              <Zap className="h-4 w-4 text-primary-200" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-text-200 mb-2">
                💡 <span className="font-medium">Sugerencia:</span> Usa una
                contraseña única
              </p>
              <button
                type="button"
                onClick={() => {
                  const suggestion = generateSuggestion();
                  setPassword(suggestion);
                  setConfirmPassword(suggestion);
                }}
                className="text-xs text-primary-200 hover:text-primary-300 font-medium"
              >
                Generar contraseña segura
              </button>
            </div>
          </div>
        </motion.div>

        {/* Botones */}
        <div className="flex gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-bg-300/30 backdrop-blur-sm border border-bg-300/50 text-text-200 hover:text-text-100 rounded-xl font-medium transition-colors"
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
              isFormValid && !isSubmitting
                ? "bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white hover:shadow-lg hover:shadow-primary-200/20"
                : "bg-bg-300/30 text-text-200/50 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Estableciendo...
              </>
            ) : (
              "Restablecer Contraseña"
            )}
          </button>
        </div>
      </form>

      {/* Nota de seguridad */}
      <div className="pt-4 border-t border-bg-300/30">
        <div className="flex items-start gap-2 text-xs text-text-200/60">
          <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>
            Tu nueva contraseña se almacena de forma segura usando encriptación
            de 256-bit
          </span>
        </div>
      </div>
    </div>
  );
};
