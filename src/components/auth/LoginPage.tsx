// src/components/auth/LoginPage.tsx - CON ESTILO DEL LANDING
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  TrendingUp,
  DollarSign,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ChevronRight,
  Brain,
  Key,
  User,
  BookOpen,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { loginSchema, type LoginFormData } from "../../lib/validation";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [securityLevel, setSecurityLevel] = useState<"low" | "medium" | "high">(
    "low"
  );
  const [time, setTime] = useState(new Date());

  // Declarar el form hook PRIMERO
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Obtener valores vigilados
  const emailValue = watch("email");
  const password = watch("password");

  // Animación de partículas
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Evaluar seguridad de contraseña
  useEffect(() => {
    if (!password) {
      setSecurityLevel("low");
      return;
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    let score = 0;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;
    if (length >= 8) score++;
    if (length >= 12) score++;

    if (score >= 5) setSecurityLevel("high");
    else if (score >= 3) setSecurityLevel("medium");
    else setSecurityLevel("low");
  }, [password]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Intento de login:", {
        email: data.email,
        timestamp: new Date().toISOString(),
        securityLevel,
        device: "web",
      });

      navigate("/dashboard");
    } catch (error) {
      setLoginError(
        "Error de conexión con el servidor. Por favor, intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAccess = (role: "student" | "researcher" | "admin") => {
    const credentials = {
      student: {
        email: "estudiante@universidad.edu",
        password: "Estudiante2024!",
      },
      researcher: {
        email: "investigador@tesis.edu",
        password: "Investigador$2024",
      },
      admin: { email: "admin@finanzas.edu", password: "Admin@Seguro2024" },
    };

    setValue("email", credentials[role].email);
    setValue("password", credentials[role].password);
    setValue("rememberMe", true);
  };

  // FUNCIONES CON TU PALETA EXACTA
  const getSecurityColor = () => {
    switch (securityLevel) {
      case "high":
        return "from-primary-200 to-primary-300"; // #61bc84 to #c6ffe6
      case "medium":
        return "from-accent-100 to-primary-200"; // #8FBC8F to #61bc84
      default:
        return "from-bg-300 to-bg-200"; // #454545 to #2d2d2d
    }
  };

  const getSecurityBorderColor = () => {
    switch (securityLevel) {
      case "high":
        return "border-green-500";
      case "medium":
        return "border-yellow-500";
      default:
    }
  };
  const getSecurityBadgeColor = () => {
    switch (securityLevel) {
      case "high":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      default:
        return "text-red-400 bg-red-500/10 border-red-500/30";
    }
  };

  <span className="text-xs cursor-help">
    {securityLevel === "high" ? (
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-green-500/30 text-green-400 backdrop-blur-sm bg-green-500/10">
        ✓ Alta
      </div>
    ) : securityLevel === "medium" ? (
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-yellow-500/30 text-yellow-400 backdrop-blur-sm bg-yellow-500/10">
        ⚠ Media
      </div>
    ) : (
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-red-500/30 text-red-400 backdrop-blur-sm bg-red-500/10">
        ✗ Baja
      </div>
    )}
  </span>;
  const getSecurityText = () => {
    switch (securityLevel) {
      case "high":
        return "Alta seguridad";
      case "medium":
        return "Seguridad media";
      default:
        return "Seguridad baja";
    }
  };

  const getSecurityTextColor = () => {
    switch (securityLevel) {
      case "high":
        return "text-primary-300";
      case "medium":
        return "text-accent-100";
      default:
        return "text-bg-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-100/5 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
      </div>

      {/* Contenido principal */}
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
                <p className="text-xs text-text-200/70">Inicio de sesión</p>
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

        {/* Grid principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Contexto */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tarjeta principal - CON TRANSPARENCIA COMO EL LANDING */}
            <div className="bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-primary-100/10 transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary-100/20 border border-primary-100/30">
                  <BookOpen className="h-6 w-6 text-primary-200" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-100">
                    Sistema de Investigación Financiera
                  </h2>
                  <p className="text-text-200">
                    Plataforma académica para análisis predictivo
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-bg-300/40 backdrop-blur-sm rounded-xl p-4 border border-bg-300/50 hover:border-primary-200/50 transition-all duration-300 group hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary-100/20 group-hover:bg-primary-100/30 transition-colors">
                      <BarChart3 className="h-5 w-5 text-primary-200" />
                    </div>
                    <h3 className="font-semibold text-text-100">
                      Análisis Predictivo
                    </h3>
                  </div>
                  <p className="text-sm text-text-200">
                    Modelos de ML para proyección financiera con 94% de
                    precisión validada.
                  </p>
                </div>

                <div className="bg-bg-300/40 backdrop-blur-sm rounded-xl p-4 border border-bg-300/50 hover:border-accent-100/50 transition-all duration-300 group hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent-100/20 group-hover:bg-accent-100/30 transition-colors">
                      <DollarSign className="h-5 w-5 text-accent-100" />
                    </div>
                    <h3 className="font-semibold text-text-100">
                      Gestión Inteligente
                    </h3>
                  </div>
                  <p className="text-sm text-text-200">
                    Automatización de presupuestos y seguimiento de metas
                    financieras.
                  </p>
                </div>

                <div className="bg-bg-300/40 backdrop-blur-sm rounded-xl p-4 border border-bg-300/50 hover:border-primary-300/50 transition-all duration-300 group hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary-300/10 group-hover:bg-primary-300/20 transition-colors">
                      <Shield className="h-5 w-5 text-primary-300" />
                    </div>
                    <h3 className="font-semibold text-text-100">
                      Seguridad Académica
                    </h3>
                  </div>
                  <p className="text-sm text-text-200">
                    Protección de datos con encriptación y protocolos de
                    investigación.
                  </p>
                </div>
              </div>

              {/* Indicadores de seguridad */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-200">
                    Nivel de seguridad de credenciales
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-6 rounded-full transition-all duration-500 ${
                            i <
                            (securityLevel === "high"
                              ? 3
                              : securityLevel === "medium"
                                ? 2
                                : 1)
                              ? securityLevel === "high"
                                ? "bg-green-500"
                                : securityLevel === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              : "bg-gray-800/50"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="h-2 bg-gray-800/60 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className={`h-full bg-gradient-to-r ${getSecurityColor()} transition-all duration-1000`}
                        style={{
                          width:
                            securityLevel === "high"
                              ? "100%"
                              : securityLevel === "medium"
                                ? "66%"
                                : "33%",
                        }}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${getSecurityTextColor()}`}
                    >
                      {getSecurityText()}
                    </span>
                  </div>
                </div>

                <div className="h-2 bg-bg-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className={`h-full bg-gradient-to-r ${getSecurityColor()} transition-all duration-1000`}
                    style={{
                      width:
                        securityLevel === "high"
                          ? "100%"
                          : securityLevel === "medium"
                            ? "66%"
                            : "33%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Información académica - CON TRANSPARENCIA */}
            <div className="bg-gradient-to-br from-bg-200/60 to-bg-300/40 backdrop-blur-sm rounded-2xl p-6 border border-bg-300/30 shadow-lg shadow-black/10 hover:shadow-primary-100/5 transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-text-100 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary-200" />
                Contexto de Investigación
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-200 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-text-200">
                      Proyecto de tesis para grado en Ingeniería de Sistemas.
                    </p>
                    <p className="text-xs text-text-200/60 mt-1">
                      Universidad Nacional • 2024-2025
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-200 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-text-200">
                      Desarrollo colaborativo supervisado por comité académico.
                    </p>
                    <p className="text-xs text-text-200/60 mt-1">
                      3 investigadores • 1 asesor principal
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-200 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-text-200">
                      Datos utilizados exclusivamente con fines de
                      investigación.
                    </p>
                    <p className="text-xs text-text-200/60 mt-1">
                      Protocolo ético aprobado #TESIS-2024-001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="lg:col-span-1">
            <Card className="border-0 bg-gradient-to-b from-bg-200/70 to-bg-300/50 backdrop-blur-xl shadow-2xl shadow-primary-100/5 overflow-hidden border border-bg-300/30 hover:border-primary-200/20 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300" />

              <CardHeader className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-2xl text-text-100">
                    <div className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-primary-200" />
                      Inicio de Sesión
                    </div>
                  </CardTitle>
                  <div className="relative">
                    <Sparkles className="h-5 w-5 text-primary-300 animate-pulse" />
                  </div>
                </div>
                <CardDescription className="text-text-200">
                  Credenciales requeridas
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  {/* Campo Email */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-text-200 flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4 text-primary-200" />
                      Identificación Institucional
                    </Label>

                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        placeholder="identificacion@institucion.edu"
                        className={`pl-10 bg-bg-300/30 backdrop-blur-sm border transition-all duration-300 ${
                          errors.email
                            ? "border-red-500/50 focus-visible:ring-red-500/30"
                            : emailValue && !errors.email
                              ? "border-primary-200/50 focus-visible:ring-primary-200/30"
                              : "border-bg-300/50 focus-visible:ring-primary-200/20"
                        } text-text-100 placeholder:text-text-200/50`}
                        disabled={isLoading}
                        {...register("email")}
                      />
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-text-200/60" />
                    </div>

                    {errors.email && (
                      <div className="flex items-center gap-2 text-sm text-red-400 animate-fade-in">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.email?.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Campo Contraseña */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-text-200 flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4 text-primary-200" />
                        Credencial de Acceso
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          {/* En el TooltipTrigger, reemplaza con esto: */}
                          <TooltipTrigger asChild>
                            <span className="text-xs cursor-help">
                              {securityLevel === "high" ? (
                                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-green-500/30 text-green-400 backdrop-blur-sm bg-green-500/10">
                                  ✓ Alta
                                </div>
                              ) : securityLevel === "medium" ? (
                                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-yellow-500/30 text-yellow-400 backdrop-blur-sm bg-yellow-500/10">
                                  ⚠ Media
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-red-500/30 text-red-400 backdrop-blur-sm bg-red-500/10">
                                  ✗ Baja
                                </div>
                              )}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-bg-200/80 backdrop-blur-sm border-bg-300">
                            <p className="text-sm text-text-100">
                              Nivel de seguridad de la credencial
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="relative group">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••"
                        className={`pl-10 pr-10 bg-bg-300/30 backdrop-blur-sm border transition-all duration-300 ${
                          errors.password
                            ? "border-red-500/50 focus-visible:ring-red-500/30"
                            : securityLevel === "high"
                              ? "border-primary-200/50 focus-visible:ring-primary-200/30"
                              : "border-bg-300/50 focus-visible:ring-primary-200/20"
                        } text-text-100`}
                        disabled={isLoading}
                        {...register("password")}
                      />
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-text-200/60" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-text-200/60 hover:text-primary-300 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {errors.password && (
                      <div className="flex items-center gap-2 text-sm text-red-400 animate-fade-in">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.password?.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Opciones */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rememberMe"
                          className="border-bg-300/70 data-[state=checked]:bg-primary-200 data-[state=checked]:border-primary-200"
                          disabled={isLoading}
                          {...register("rememberMe")}
                        />
                        <Label
                          htmlFor="rememberMe"
                          className="text-sm text-text-200 font-normal cursor-pointer select-none"
                        >
                          Mantener sesión de investigación
                        </Label>
                      </div>
                    </div>

                    {/* Perfiles de acceso */}
                    <div>
                      <Label className="text-sm text-text-200 mb-2 block">
                        <User className="h-4 w-4 inline mr-2 text-primary-200" />
                        Perfil de acceso rápido
                      </Label>
                      <Select
                        onValueChange={(value: any) => handleQuickAccess(value)}
                      >
                        <SelectTrigger className="bg-bg-300/30 backdrop-blur-sm border-bg-300/50 text-text-200 hover:border-primary-100/50">
                          <SelectValue placeholder="Seleccionar perfil de investigación..." />
                        </SelectTrigger>
                        <SelectContent className="bg-bg-200/80 backdrop-blur-sm border-bg-300">
                          <SelectItem
                            value="student"
                            className="text-text-100 hover:bg-bg-300/50 focus:bg-bg-300/50"
                          >
                            <div className="flex items-center gap-2 py-1">
                              <User className="h-4 w-4 text-primary-200" />
                              <div>
                                <div className="font-medium">
                                  Estudiante Investigador
                                </div>
                                <div className="text-xs text-text-200/70">
                                  Acceso básico a datos
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="researcher"
                            className="text-text-100 hover:bg-bg-300/50 focus:bg-bg-300/50"
                          >
                            <div className="flex items-center gap-2 py-1">
                              <Brain className="h-4 w-4 text-primary-200" />
                              <div>
                                <div className="font-medium">
                                  Investigador Principal
                                </div>
                                <div className="text-xs text-text-200/70">
                                  Acceso completo al sistema
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="admin"
                            className="text-text-100 hover:bg-bg-300/50 focus:bg-bg-300/50"
                          >
                            <div className="flex items-center gap-2 py-1">
                              <Shield className="h-4 w-4 text-primary-200" />
                              <div>
                                <div className="font-medium">
                                  Administrador Académico
                                </div>
                                <div className="text-xs text-text-200/70">
                                  Acceso administrativo completo
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-6 pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 shadow-lg shadow-primary-100/25 hover:shadow-primary-200/35 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    size="lg"
                    disabled={isLoading || !isValid || !isDirty}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Autenticando credenciales...
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <Key className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span>Acceder al Sistema de Investigación</span>
                        </div>
                      </>
                    )}
                  </Button>

                  <Separator className="bg-bg-300/50" />

                  {/* Enlaces uno al lado del otro - Más grandes */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      to="/register"
                      className="flex-1 min-w-[180px] py-3 px-4 bg-gradient-to-r from-primary-100/10 to-primary-200/5 hover:from-primary-100/20 hover:to-primary-200/10 border border-primary-100/20 hover:border-primary-200/40 text-primary-200 hover:text-primary-300 rounded-xl font-semibold transition-all duration-300 text-center group flex items-center justify-center gap-2"
                    >
                      <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Registro</span>
                    </Link>

                    <div className="text-text-200/50 text-sm hidden sm:block">
                      |
                    </div>

                    <Link
                      to="/recover-password"
                      className="flex-1 min-w-[180px] py-3 px-4 bg-gradient-to-r from-primary-100/10 to-primary-200/5 hover:from-primary-100/20 hover:to-primary-200/10 border border-primary-100/20 hover:border-primary-200/40 text-primary-200 hover:text-primary-300 rounded-xl font-semibold transition-all duration-300 text-center group flex items-center justify-center gap-2"
                    >
                      <Key className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Recuperar Acceso</span>
                    </Link>
                  </div>

                  {/* Versión vertical para móviles */}
                  <div className="sm:hidden flex flex-col gap-3">
                    <div className="text-center">
                      <p className="text-text-200 text-sm">
                        ¿Primera vez?{" "}
                        <Link
                          to="/register"
                          className="text-primary-200 hover:text-primary-300 font-semibold transition-colors"
                        >
                          Regístrate Aquí
                        </Link>
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-text-200 text-sm">
                        ¿Problemas de acceso?{" "}
                        <Link
                          to="/recover-password"
                          className="text-primary-200 hover:text-primary-300 font-semibold transition-colors"
                        >
                          Recuperar Contraseña
                        </Link>
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </form>
            </Card>

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

export default LoginPage;
