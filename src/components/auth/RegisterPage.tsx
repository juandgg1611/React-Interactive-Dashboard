// src/components/auth/RegisterPage.tsx - CON TU PALETA EXACTA
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Brain,
  Key,
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  Building,
  FileText,
  ArrowRight,
  Check,
  X,
  TrendingUp,
  Zap,
  BarChart3,
  Users,
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
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { registerSchema, type RegisterFormData } from "../../lib/validation";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [time, setTime] = useState(new Date());
  const [passwordScore, setPasswordScore] = useState(0);
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({});

  // Animación de tiempo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      institution: "",
      academicLevel: "",
      researchField: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const watchedPassword = watch("password");
  const watchedEmail = watch("email");
  const watchedFullName = watch("fullName");

  // Evaluar fortaleza de contraseña
  useEffect(() => {
    if (!watchedPassword) {
      setPasswordScore(0);
      return;
    }

    let score = 0;
    const hasUpper = /[A-Z]/.test(watchedPassword);
    const hasLower = /[a-z]/.test(watchedPassword);
    const hasNumber = /\d/.test(watchedPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(watchedPassword);
    const length = watchedPassword.length;

    if (hasUpper) score += 20;
    if (hasLower) score += 20;
    if (hasNumber) score += 20;
    if (hasSpecial) score += 20;
    if (length >= 8) score += 10;
    if (length >= 12) score += 10;

    setPasswordScore(Math.min(score, 100));
  }, [watchedPassword]);

  const getPasswordStrength = () => {
    if (passwordScore >= 80)
      return {
        label: "Fuerte",
        color: "text-primary-300",
        bg: "bg-primary-200/10",
        border: "border-primary-200/30",
      };
    if (passwordScore >= 60)
      return {
        label: "Moderada",
        color: "text-accent-100",
        bg: "bg-accent-100/10",
        border: "border-accent-100/30",
      };
    if (passwordScore >= 40)
      return {
        label: "Débil",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
      };
    return {
      label: "Muy débil",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
    };
  };

  const passwordStrength = getPasswordStrength();

  // Validaciones en tiempo real
  const validatePassword = (password: string) => {
    const requirements = [
      { met: password.length >= 8, text: "Mínimo 8 caracteres" },
      { met: /[A-Z]/.test(password), text: "Una mayúscula" },
      { met: /[a-z]/.test(password), text: "Una minúscula" },
      { met: /\d/.test(password), text: "Un número" },
      {
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        text: "Un carácter especial",
      },
    ];
    return requirements;
  };

  const passwordRequirements = validatePassword(watchedPassword || "");

  // Navegación entre pasos
  const nextStep = async () => {
    if (currentStep === 1) {
      const isValidStep = await trigger([
        "fullName",
        "email",
        "institution",
        "academicLevel",
      ]);
      if (isValidStep) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      const isValidStep = await trigger([
        "password",
        "confirmPassword",
        "researchField",
      ]);
      if (isValidStep && watchedPassword === watch("confirmPassword")) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Auto-completar con perfiles de ejemplo
  const fillExampleProfile = (type: "student" | "researcher" | "professor") => {
    const profiles = {
      student: {
        fullName: "María González",
        email: "maria.gonzalez@universidad.edu",
        institution: "Universidad Nacional",
        academicLevel: "Pregrado",
        researchField: "Finanzas Personales",
      },
      researcher: {
        fullName: "Dr. Carlos Rodríguez",
        email: "carlos.rodriguez@instituto.edu",
        institution: "Instituto de Investigación",
        academicLevel: "Doctorado",
        researchField: "Machine Learning Financiero",
      },
      professor: {
        fullName: "Prof. Ana Martínez",
        email: "ana.martinez@facultad.edu",
        institution: "Facultad de Ingeniería",
        academicLevel: "Maestría",
        researchField: "Análisis Predictivo",
      },
    };

    const profile = profiles[type];
    Object.entries(profile).forEach(([key, value]) => {
      setValue(key as keyof RegisterFormData, value as any);
    });
    trigger();
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    // Simulación de registro
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Registro exitoso:", {
      ...data,
      registeredAt: new Date().toISOString(),
      userId: `USR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    });

    // Navegar a dashboard
    navigate("/dashboard");
  };

  // Efectos de animación para progreso
  useEffect(() => {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.classList.remove("w-0");
      progressBar.classList.add(`w-${currentStep * 33}`);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 overflow-hidden">
      {/* Fondo animado mejorado */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-100/5 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
        {/* Partículas animadas */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-primary-300/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
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
                  Registro de Investigador
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

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Progreso y beneficios */}
          <div className="lg:col-span-2 space-y-8">
            {/* Barra de progreso animada */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-primary-100/10 transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary-100/20 border border-primary-100/30">
                        <TrendingUp className="h-6 w-6 text-primary-200" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-100">
                          Progreso de Registro
                        </h3>
                        <p className="text-sm text-text-200">
                          Completa los pasos para unirte a la investigación
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-primary-100/20 text-primary-200 border-primary-100/30">
                      Paso {currentStep} de 3
                    </Badge>
                  </div>

                  {/* Barra de progreso animada */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-text-200">
                      <span>Información Personal</span>
                      <span>Credenciales</span>
                      <span>Confirmación</span>
                    </div>
                    <div className="h-2 bg-bg-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-full bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 transition-all duration-1000 ease-out progress-bar"
                        style={{ width: `${currentStep * 33.33}%` }}
                      />
                    </div>
                    <div className="flex justify-between">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            step === currentStep
                              ? "bg-primary-200 text-white scale-110 shadow-lg shadow-primary-200/30"
                              : step < currentStep
                              ? "bg-primary-100/30 text-primary-200"
                              : "bg-bg-300 text-text-200/50"
                          }`}
                        >
                          {step < currentStep ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            step
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Indicadores de paso actual */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        currentStep === 1
                          ? "border-primary-200/50 bg-primary-100/10"
                          : "border-bg-300/50 bg-bg-300/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            currentStep === 1
                              ? "bg-primary-100/20"
                              : currentStep > 1
                              ? "bg-primary-100/10"
                              : "bg-bg-300"
                          }`}
                        >
                          <User className="h-4 w-4 text-primary-200" />
                        </div>
                        <h4 className="font-medium text-text-100">
                          Datos Personales
                        </h4>
                      </div>
                      <p className="text-sm text-text-200">
                        Información académica y de contacto
                      </p>
                    </div>

                    <div
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        currentStep === 2
                          ? "border-primary-200/50 bg-primary-100/10"
                          : "border-bg-300/50 bg-bg-300/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            currentStep === 2
                              ? "bg-primary-100/20"
                              : currentStep > 2
                              ? "bg-primary-100/10"
                              : "bg-bg-300"
                          }`}
                        >
                          <Shield className="h-4 w-4 text-primary-200" />
                        </div>
                        <h4 className="font-medium text-text-100">Seguridad</h4>
                      </div>
                      <p className="text-sm text-text-200">
                        Credenciales y preferencias de investigación
                      </p>
                    </div>

                    <div
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        currentStep === 3
                          ? "border-primary-200/50 bg-primary-100/10"
                          : "border-bg-300/50 bg-bg-300/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            currentStep === 3
                              ? "bg-primary-100/20"
                              : "bg-bg-300"
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary-200" />
                        </div>
                        <h4 className="font-medium text-text-100">
                          Confirmación
                        </h4>
                      </div>
                      <p className="text-sm text-text-200">
                        Revisión y aceptación de términos
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Beneficios de registro */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-primary-100/10 transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-text-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-200" />
                  Beneficios Exclusivos
                </CardTitle>
                <CardDescription className="text-text-200">
                  Como investigador registrado obtendrás acceso a:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-bg-300/40 backdrop-blur-sm rounded-xl p-4 border border-bg-300/50 hover:border-primary-200/50 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary-100/20 group-hover:bg-primary-100/30 transition-colors">
                        <BarChart3 className="h-5 w-5 text-primary-200" />
                      </div>
                      <h4 className="font-semibold text-text-100">
                        Dashboard Avanzado
                      </h4>
                    </div>
                    <p className="text-sm text-text-200">
                      Acceso completo a herramientas de análisis predictivo con
                      visualizaciones en tiempo real.
                    </p>
                  </div>

                  <div className="bg-bg-300/40 backdrop-blur-sm rounded-xl p-4 border border-bg-300/50 hover:border-accent-100/50 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-accent-100/20 group-hover:bg-accent-100/30 transition-colors">
                        <Brain className="h-5 w-5 text-accent-100" />
                      </div>
                      <h4 className="font-semibold text-text-100">
                        Modelos de ML
                      </h4>
                    </div>
                    <p className="text-sm text-text-200">
                      Utiliza nuestros modelos entrenados para análisis
                      financiero con 95% de precisión.
                    </p>
                  </div>

                  <div className="bg-bg-300/40 backdrop-blur-sm rounded-xl p-4 border border-bg-300/50 hover:border-primary-300/50 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary-300/10 group-hover:bg-primary-300/20 transition-colors">
                        <Users className="h-5 w-5 text-primary-300" />
                      </div>
                      <h4 className="font-semibold text-text-100">
                        Comunidad Académica
                      </h4>
                    </div>
                    <p className="text-sm text-text-200">
                      Conéctate con otros investigadores y comparte hallazgos en
                      un entorno seguro.
                    </p>
                  </div>

                  <div className="bg-bg-300/40 backdrop-blur-sm rounded-xl p-4 border border-bg-300/50 hover:border-primary-200/50 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary-100/20 group-hover:bg-primary-100/30 transition-colors">
                        <FileText className="h-5 w-5 text-primary-200" />
                      </div>
                      <h4 className="font-semibold text-text-100">
                        Exportación de Datos
                      </h4>
                    </div>
                    <p className="text-sm text-text-200">
                      Exporta tus análisis en múltiples formatos para
                      publicaciones académicas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ejemplos de perfiles */}
            <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20 hover:shadow-primary-100/10 transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-text-100 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary-200" />
                  Perfiles de Ejemplo
                </CardTitle>
                <CardDescription className="text-text-200">
                  Rellena automáticamente con perfiles de investigación comunes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 border-bg-300/50 hover:border-primary-100/50 hover:bg-primary-100/10 transition-all group"
                    onClick={() => fillExampleProfile("student")}
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-primary-200" />
                        <span className="font-semibold text-text-100">
                          Estudiante
                        </span>
                      </div>
                      <p className="text-xs text-text-200">
                        Perfil básico para proyectos de pregrado
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 border-bg-300/50 hover:border-accent-100/50 hover:bg-accent-100/10 transition-all group"
                    onClick={() => fillExampleProfile("researcher")}
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-accent-100" />
                        <span className="font-semibold text-text-100">
                          Investigador
                        </span>
                      </div>
                      <p className="text-xs text-text-200">
                        Para proyectos de investigación avanzada
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 border-bg-300/50 hover:border-primary-300/50 hover:bg-primary-300/10 transition-all group"
                    onClick={() => fillExampleProfile("professor")}
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-primary-300" />
                        <span className="font-semibold text-text-100">
                          Profesor
                        </span>
                      </div>
                      <p className="text-xs text-text-200">
                        Para uso académico y supervisión de tesis
                      </p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                      Registro de Investigador
                    </div>
                  </CardTitle>
                  <div className="relative">
                    <Sparkles className="h-5 w-5 text-primary-300 animate-pulse" />
                  </div>
                </div>
                <CardDescription className="text-text-200">
                  Completa tu información para unirte a la investigación
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Paso 1: Información Personal */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-text-100 flex items-center gap-2">
                        <User className="h-5 w-5 text-primary-200" />
                        Información Personal
                      </h3>

                      <div className="space-y-3">
                        <Label htmlFor="fullName" className="text-text-200">
                          Nombre Completo
                        </Label>
                        <div className="relative group">
                          <Input
                            id="fullName"
                            placeholder="Dr. Juan Pérez Martínez"
                            className={`pl-10 bg-bg-300/30 backdrop-blur-sm border transition-all duration-300 ${
                              errors.fullName
                                ? "border-red-500/50 focus-visible:ring-red-500/20"
                                : watchedFullName && !errors.fullName
                                ? "border-primary-200/40 focus-visible:ring-primary-200/20"
                                : "border-bg-300/50 focus-visible:ring-primary-200/20"
                            } text-text-100 placeholder:text-text-200/50`}
                            {...register("fullName")}
                          />
                          <User className="absolute left-3 top-3 h-4 w-4 text-text-200/60" />
                        </div>
                        {errors.fullName && (
                          <div className="flex items-center gap-2 text-sm text-red-400 animate-fade-in">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.fullName.message}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-text-200">
                          Correo Institucional
                        </Label>
                        <div className="relative group">
                          <Input
                            id="email"
                            type="email"
                            placeholder="investigador@institucion.edu"
                            className={`pl-10 bg-bg-300/30 backdrop-blur-sm border transition-all duration-300 ${
                              errors.email
                                ? "border-red-500/50 focus-visible:ring-red-500/20"
                                : watchedEmail && !errors.email
                                ? "border-primary-200/40 focus-visible:ring-primary-200/20"
                                : "border-bg-300/50 focus-visible:ring-primary-200/20"
                            } text-text-100 placeholder:text-text-200/50`}
                            {...register("email")}
                          />
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-text-200/60" />
                        </div>
                        {errors.email && (
                          <div className="flex items-center gap-2 text-sm text-red-400 animate-fade-in">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.email.message}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="institution" className="text-text-200">
                          Institución
                        </Label>
                        <div className="relative group">
                          <Input
                            id="institution"
                            placeholder="Universidad Nacional"
                            className={`pl-10 bg-bg-300/30 backdrop-blur-sm border transition-all duration-300 ${
                              errors.institution
                                ? "border-red-500/50 focus-visible:ring-red-500/20"
                                : "border-bg-300/50 focus-visible:ring-primary-200/20"
                            } text-text-100 placeholder:text-text-200/50`}
                            {...register("institution")}
                          />
                          <Building className="absolute left-3 top-3 h-4 w-4 text-text-200/60" />
                        </div>
                        {errors.institution && (
                          <div className="flex items-center gap-2 text-sm text-red-400 animate-fade-in">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.institution.message}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="academicLevel"
                            className="text-text-200"
                          >
                            Nivel Académico
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setValue("academicLevel", value)
                            }
                          >
                            <SelectTrigger className="bg-bg-300/30 backdrop-blur-sm border-bg-300/50 text-text-200">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent className="bg-bg-200/80 backdrop-blur-sm border-bg-300">
                              <SelectItem value="Pregrado">Pregrado</SelectItem>
                              <SelectItem value="Maestría">Maestría</SelectItem>
                              <SelectItem value="Doctorado">
                                Doctorado
                              </SelectItem>
                              <SelectItem value="Postdoctorado">
                                Postdoctorado
                              </SelectItem>
                              <SelectItem value="Profesor">Profesor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="researchField"
                            className="text-text-200"
                          >
                            Área de Investigación
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setValue("researchField", value)
                            }
                          >
                            <SelectTrigger className="bg-bg-300/30 backdrop-blur-sm border-bg-300/50 text-text-200">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent className="bg-bg-200/80 backdrop-blur-sm border-bg-300">
                              <SelectItem value="Finanzas Personales">
                                Finanzas Personales
                              </SelectItem>
                              <SelectItem value="Machine Learning">
                                Machine Learning
                              </SelectItem>
                              <SelectItem value="Análisis Predictivo">
                                Análisis Predictivo
                              </SelectItem>
                              <SelectItem value="Data Science">
                                Data Science
                              </SelectItem>
                              <SelectItem value="Economía">Economía</SelectItem>
                              <SelectItem value="Otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        className="border-bg-300/70 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
                        onClick={() => navigate("/login")}
                      >
                        ← Volver al Login
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300"
                      >
                        Continuar →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Paso 2: Credenciales */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-text-100 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary-200" />
                        Seguridad y Credenciales
                      </h3>

                      {/* Fortaleza de contraseña */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-text-200">
                            Contraseña
                          </Label>
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border backdrop-blur-sm ${passwordStrength.border} ${passwordStrength.bg} ${passwordStrength.color}`}
                          >
                            {passwordStrength.label}
                          </div>
                        </div>

                        <div className="relative group">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••"
                            className={`pl-10 pr-10 bg-bg-300/30 backdrop-blur-sm border transition-all duration-300 ${
                              errors.password
                                ? "border-red-500/50 focus-visible:ring-red-500/20"
                                : watchedPassword && !errors.password
                                ? "border-primary-200/40 focus-visible:ring-primary-200/20"
                                : "border-bg-300/50 focus-visible:ring-primary-200/20"
                            } text-text-100`}
                            {...register("password")}
                          />
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-text-200/60" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-text-200/60 hover:text-primary-300 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {/* Barra de fortaleza */}
                        <div className="space-y-2">
                          <Progress value={passwordScore} className="h-2" />
                          <div className="grid grid-cols-5 gap-1">
                            {[0, 25, 50, 75, 100].map((value) => (
                              <div
                                key={value}
                                className={`h-1 rounded-full transition-all duration-500 ${
                                  passwordScore >= value
                                    ? passwordScore >= 80
                                      ? "bg-primary-200"
                                      : passwordScore >= 60
                                      ? "bg-accent-100"
                                      : passwordScore >= 40
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                    : "bg-bg-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Requisitos de contraseña */}
                        <div className="space-y-2">
                          {passwordRequirements.map((req, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm transition-all duration-300"
                            >
                              {req.met ? (
                                <CheckCircle2 className="h-4 w-4 text-primary-200 animate-fade-in" />
                              ) : (
                                <X className="h-4 w-4 text-text-200/60" />
                              )}
                              <span
                                className={
                                  req.met
                                    ? "text-primary-200"
                                    : "text-text-200/60"
                                }
                              >
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Confirmar contraseña */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-text-200"
                        >
                          Confirmar Contraseña
                        </Label>
                        <div className="relative group">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••••"
                            className={`pl-10 pr-10 bg-bg-300/30 backdrop-blur-sm border transition-all duration-300 ${
                              errors.confirmPassword ||
                              watch("confirmPassword") !== watchedPassword
                                ? "border-red-500/50 focus-visible:ring-red-500/20"
                                : watch("confirmPassword") &&
                                  watch("confirmPassword") === watchedPassword
                                ? "border-primary-200/40 focus-visible:ring-primary-200/20"
                                : "border-bg-300/50 focus-visible:ring-primary-200/20"
                            } text-text-100`}
                            {...register("confirmPassword")}
                          />
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-text-200/60" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-text-200/60 hover:text-primary-300 transition-colors"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        {errors.confirmPassword && (
                          <div className="flex items-center gap-2 text-sm text-red-400 animate-fade-in">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.confirmPassword.message}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        className="border-bg-300/70 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
                        onClick={prevStep}
                      >
                        ← Paso Anterior
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300"
                      >
                        Continuar →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Paso 3: Confirmación */}
                {currentStep === 3 && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6 animate-fade-in-up">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-text-100 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary-200" />
                          Confirmación Final
                        </h3>

                        <div className="bg-bg-300/30 rounded-xl p-4 border border-bg-300/50">
                          <h4 className="font-semibold text-text-100 mb-3">
                            Resumen de Registro
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-text-200">Nombre:</span>
                              <span className="text-text-100">
                                {watch("fullName")}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-200">
                                Institución:
                              </span>
                              <span className="text-text-100">
                                {watch("institution")}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-200">
                                Nivel Académico:
                              </span>
                              <span className="text-text-100">
                                {watch("academicLevel")}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-200">
                                Área de Investigación:
                              </span>
                              <span className="text-text-100">
                                {watch("researchField")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <input
                              type="checkbox"
                              id="acceptTerms"
                              className="mt-1 rounded border-bg-300 bg-bg-300/30 text-primary-200 focus:ring-primary-200"
                              {...register("acceptTerms")}
                            />
                            <Label
                              htmlFor="acceptTerms"
                              className="text-sm text-text-200 cursor-pointer"
                            >
                              Acepto los términos y condiciones del proyecto de
                              investigación, el protocolo ético #TESIS-2024-001
                              y autorizo el uso de mis datos exclusivamente con
                              fines académicos y de investigación.
                            </Label>
                          </div>
                          {errors.acceptTerms && (
                            <div className="flex items-center gap-2 text-sm text-red-400 animate-fade-in">
                              <AlertCircle className="h-4 w-4" />
                              <span>{errors.acceptTerms.message}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          variant="outline"
                          className="border-bg-300/70 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
                          onClick={prevStep}
                        >
                          ← Paso Anterior
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 shadow-lg shadow-primary-100/25 hover:shadow-primary-200/35 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Registrando...
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                <Check className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span>Completar Registro</span>
                              </div>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>

              <CardFooter className="pt-6 border-t border-bg-300/50">
                <div className="text-center w-full">
                  <p className="text-text-200 text-sm">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      to="/login"
                      className="text-primary-200 hover:text-primary-300 font-semibold transition-colors"
                    >
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </CardFooter>
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

export default RegisterPage;
