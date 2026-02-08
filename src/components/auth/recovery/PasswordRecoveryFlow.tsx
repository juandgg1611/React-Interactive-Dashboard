// src/components/auth/recovery/PasswordRecoveryFlow.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Key,
  Mail,
  Shield,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  Brain,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Zap,
  Smartphone,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { VerificationCodeInput } from "./VerificationCodeInput";
import { NewPasswordForm } from "./NewPasswordForm";
import { RecoverySuccess } from "./RecoverySuccess";

export const PasswordRecoveryFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const [verificationMethod, setVerificationMethod] = useState<"email" | "sms">(
    "email"
  );

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simular llamada API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(2);
    } catch (error) {
      console.error("Error enviando código:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeComplete = (code: string) => {
    console.log("Código recibido:", code);
    setTimeout(() => setStep(3), 500);
  };

  const handleResendCode = () => {
    console.log("Reenviando código...");
  };

  const handlePasswordSubmit = (newPassword: string) => {
    console.log("Nueva contraseña establecida:", newPassword);
    setStep(4);
  };

  const handleContinueToLogin = () => {
    navigate("/login");
  };

  const handleSecuritySettings = () => {
    navigate("/configuracion/seguridad");
  };

  // Textos y estilos por paso
  const stepConfig = {
    1: {
      icon: <Key className="h-5 w-5" />,
      title: "Recuperar Acceso",
      description:
        "Ingresa tu correo electrónico para enviarte un código de verificación",
      color: "from-primary-100 to-primary-200",
    },
    2: {
      icon: <Shield className="h-5 w-5" />,
      title: "Verificación de Seguridad",
      description:
        "Ingresa el código de 6 dígitos que hemos enviado a tu correo",
      color: "from-accent-100 to-accent-dark",
    },
    3: {
      icon: <Lock className="h-5 w-5" />,
      title: "Nueva Contraseña",
      description: "Crea una contraseña segura para proteger tu cuenta",
      color: "from-primary-200 to-primary-300",
    },
    4: {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "¡Recuperación Exitosa!",
      description: "Tu contraseña ha sido actualizada exitosamente",
      color: "from-primary-300 to-primary-bright",
    },
  };

  const currentStep = stepConfig[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-100/5 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />

        {/* Partículas animadas */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-primary-300/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-lg shadow-primary-100/20">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-300 rounded-full animate-ping" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-100">
                  Finanzas<span className="text-primary-200">IA</span>
                </h1>
                <p className="text-xs text-text-200/70">
                  Recuperación de Contraseña
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-text-200">
                <Calendar className="h-4 w-4" />
                <span>
                  {time.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-text-200">
                <Clock className="h-4 w-4" />
                <span>
                  {time.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tarjeta de progreso */}
            <div className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-primary-100/10 transition-all duration-300 rounded-2xl p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${currentStep.color} shadow-lg`}
                    >
                      {currentStep.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-100">
                        {currentStep.title}
                      </h3>
                      <p className="text-sm text-text-200">
                        {currentStep.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-bg-300/50 border border-bg-300/70">
                    <Sparkles className="h-4 w-4 text-primary-300" />
                    <span className="text-sm text-text-200">
                      Paso {step} de 4
                    </span>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-text-200">
                    <span>Correo</span>
                    <span>Código</span>
                    <span>Contraseña</span>
                    <span>Completado</span>
                  </div>
                  <div className="h-2 bg-bg-200/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 transition-all duration-700 ease-out`}
                      style={{ width: `${(step - 1) * 33.33}%` }}
                    />
                  </div>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <div
                        key={stepNum}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                          step === stepNum
                            ? "bg-gradient-to-br from-primary-200 to-primary-300 text-white scale-110 shadow-lg shadow-primary-200/40"
                            : step > stepNum
                              ? "bg-primary-100/30 text-primary-200"
                              : "bg-bg-300/50 text-text-200/50"
                        }`}
                      >
                        {stepNum < step ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          stepNum
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consejos de seguridad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary-100/10 to-transparent border border-primary-100/20 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary-100/20">
                        <Zap className="h-5 w-5 text-primary-200" />
                      </div>
                      <h4 className="font-semibold text-text-100">
                        Recuperación Rápida
                      </h4>
                    </div>
                    <p className="text-sm text-text-200">
                      El proceso completo toma menos de 2 minutos. Mantén tu
                      información a mano.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-accent-100/10 to-transparent border border-accent-100/20 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-accent-100/20">
                        <ShieldCheck className="h-5 w-5 text-accent-100" />
                      </div>
                      <h4 className="font-semibold text-text-100">
                        Máxima Seguridad
                      </h4>
                    </div>
                    <p className="text-sm text-text-200">
                      Todos los datos se transmiten con encriptación de 256-bit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Métodos alternativos */}
            {step === 2 && (
              <div className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-primary-100/10 transition-all duration-300 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-text-100 mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary-200" />
                  Métodos Alternativos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setVerificationMethod("email")}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      verificationMethod === "email"
                        ? "border-primary-200/50 bg-primary-100/10"
                        : "border-bg-300/50 bg-bg-300/30 hover:border-primary-200/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          verificationMethod === "email"
                            ? "bg-primary-100/20"
                            : "bg-bg-300"
                        }`}
                      >
                        <Mail className="h-4 w-4 text-primary-200" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-text-100">
                          Correo Electrónico
                        </h4>
                        <p className="text-sm text-text-200">
                          Código enviado a tu email
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setVerificationMethod("sms")}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      verificationMethod === "sms"
                        ? "border-primary-200/50 bg-primary-100/10"
                        : "border-bg-300/50 bg-bg-300/30 hover:border-primary-200/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          verificationMethod === "sms"
                            ? "bg-primary-100/20"
                            : "bg-bg-300"
                        }`}
                      >
                        <Smartphone className="h-4 w-4 text-primary-200" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-text-100">SMS</h4>
                        <p className="text-sm text-text-200">
                          Código enviado a tu teléfono
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Preguntas frecuentes */}
            <div className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-primary-100/10 transition-all duration-300 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-text-100 mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary-200" />
                Preguntas Frecuentes
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-text-100">
                    ¿No recibí el código de verificación?
                  </h4>
                  <p className="text-sm text-text-200">
                    Revisa tu carpeta de spam o solicita un reenvío después de
                    45 segundos.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-text-100">
                    ¿Cuánto tiempo tengo para completar la recuperación?
                  </h4>
                  <p className="text-sm text-text-200">
                    El código expira en 5 minutos. Cada paso debe completarse en
                    orden.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="lg:col-span-1">
            <div className="border-0 bg-gradient-to-b from-bg-200/70 to-bg-300/50 backdrop-blur-xl shadow-2xl shadow-primary-100/5 rounded-2xl overflow-hidden border border-bg-300/30 hover:border-primary-200/20 transition-all duration-300">
              <div className={`h-1 bg-gradient-to-r ${currentStep.color}`} />

              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Paso 1: Ingresar email */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-text-100 flex items-center gap-2">
                            {currentStep.icon}
                            {currentStep.title}
                          </h3>
                          <p className="text-text-200">
                            {currentStep.description}
                          </p>
                        </div>

                        <form
                          onSubmit={handleEmailSubmit}
                          className="space-y-6"
                        >
                          <div className="space-y-3">
                            <label
                              htmlFor="email"
                              className="block text-text-200 text-sm font-medium"
                            >
                              Correo Electrónico
                            </label>
                            <div className="relative group">
                              <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="investigador@institucion.edu"
                                autoComplete="email"
                                className="w-full px-4 py-3 pl-11 bg-bg-300/30 backdrop-blur-sm border border-bg-300/50 rounded-xl text-text-100 placeholder:text-text-200/50 focus:outline-none focus:border-primary-200/50 focus:ring-2 focus:ring-primary-200/20 transition-all duration-300 autofill:bg-bg-300/30 autofill:text-text-100"
                                required
                                autoFocus
                              />
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-200/60" />
                            </div>
                            <p className="text-xs text-text-200/60 flex items-center gap-2">
                              <AlertCircle className="h-3 w-3" />
                              Usa el correo institucional asociado a tu cuenta
                            </p>
                          </div>

                          <button
                            type="submit"
                            disabled={isLoading || !email}
                            className={`w-full py-3 px-4 rounded-xl font-semibold text-text-100 transition-all duration-300 flex items-center justify-center ${
                              isLoading || !email
                                ? "bg-bg-300/50 cursor-not-allowed"
                                : "bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 hover:shadow-lg hover:shadow-primary-200/25"
                            }`}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Enviando código...
                              </>
                            ) : (
                              "Continuar →"
                            )}
                          </button>
                        </form>

                        <div className="pt-4 border-t border-bg-300/50">
                          <button
                            onClick={() => navigate("/login")}
                            className="text-primary-200 hover:text-primary-300 text-sm font-medium transition-colors flex items-center justify-center mx-auto group"
                          >
                            <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                            Volver al inicio de sesión
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Paso 2: Código de verificación */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-text-100 flex items-center gap-2">
                            {currentStep.icon}
                            {currentStep.title}
                          </h3>
                          <p className="text-text-200">
                            Hemos enviado un código de 6 dígitos a:{" "}
                            <span className="font-semibold text-primary-200">
                              {email.replace(/(.{2})(.*)(?=@)/, "$1*****")}
                            </span>
                          </p>
                        </div>

                        <VerificationCodeInput
                          email={email}
                          onCodeComplete={handleCodeComplete}
                          onResendCode={handleResendCode}
                        />

                        <div className="pt-4 border-t border-bg-300/50">
                          <button
                            onClick={() => setStep(1)}
                            className="text-primary-200 hover:text-primary-300 text-sm font-medium transition-colors flex items-center justify-center mx-auto group"
                          >
                            <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                            Usar otro correo electrónico
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Paso 3: Nueva contraseña */}
                    {step === 3 && (
                      <NewPasswordForm
                        onPasswordSubmit={handlePasswordSubmit}
                        onCancel={() => setStep(2)}
                      />
                    )}

                    {/* Paso 4: Éxito */}
                    {step === 4 && (
                      <RecoverySuccess
                        email={email}
                        onContinue={handleContinueToLogin}
                        onSecuritySettings={handleSecuritySettings}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Footer académico */}
            <div className="mt-6 text-center">
              <p className="text-text-200/60 text-xs backdrop-blur-sm bg-bg-300/20 rounded-lg p-3">
                Sistema de Investigación Financiera • Versión 1.0
                <br />
                Proyecto de Tesis • {new Date().getFullYear()} • Todos los
                derechos académicos reservados
              </p>
            </div>
          </div>
        </div>

        {/* Enlace para volver */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-200 hover:text-primary-300 transition-colors group"
          >
            <div className="w-6 h-px bg-bg-300/50 group-hover:bg-primary-200 transition-colors" />
            <span>Regresar al portal principal</span>
            <div className="w-6 h-px bg-bg-300/50 group-hover:bg-primary-200 transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
};
