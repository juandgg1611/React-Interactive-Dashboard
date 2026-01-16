import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  Globe,
  Send,
  Upload,
  Paperclip,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";

export interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  buttonText: string;
  status: "online" | "offline" | "busy";
  responseTime: string;
  available: boolean;
  onClick?: () => void;
}

export interface SupportModule {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color?: string;
}

export interface ContactSupportProps {
  /** Opciones de contacto disponibles */
  supportOptions?: SupportOption[];
  /** Módulos disponibles para seleccionar */
  modules?: SupportModule[];
  /** Tipos de consulta predefinidos */
  inquiryTypes?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  /** Callback al enviar el formulario */
  onSubmit?: (data: {
    name: string;
    email: string;
    module: string;
    inquiryType: string;
    message: string;
    attachments?: File[];
  }) => void;
  /** Tiempo estimado de respuesta (en horas) */
  estimatedResponseTime?: number;
  /** Si el formulario está en estado de carga */
  isLoading?: boolean;
  /** Si el formulario fue enviado exitosamente */
  isSuccess?: boolean;
  /** Mensaje de error */
  error?: string;
}

const ContactSupport: React.FC<ContactSupportProps> = ({
  supportOptions,
  modules = [],
  inquiryTypes = [],
  onSubmit,
  estimatedResponseTime = 24,
  isLoading = false,
  isSuccess = false,
  error,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    module: "",
    inquiryType: "",
    message: "",
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("email");

  // Opciones de contacto por defecto
  const defaultSupportOptions: SupportOption[] = [
    {
      id: "email",
      title: "Correo Electrónico",
      description: "Respuesta en menos de 24 horas",
      icon: Mail,
      buttonText: "Enviar email",
      status: "online",
      responseTime: "24 horas",
      available: true,
    },
    {
      id: "chat",
      title: "Chat en Vivo",
      description: "Disponible 9am - 6pm (GMT-5)",
      icon: MessageSquare,
      buttonText: "Iniciar chat",
      status: "online",
      responseTime: "5 minutos",
      available: true,
    },
    {
      id: "community",
      title: "Comunidad",
      description: "Foro de usuarios y preguntas",
      icon: Globe,
      buttonText: "Visitar foro",
      status: "online",
      responseTime: "Variable",
      available: true,
    },
  ];

  // Tipos de consulta por defecto
  const defaultInquiryTypes = [
    {
      value: "problem",
      label: "Problema técnico",
      description: "Errores o fallos en el sistema",
    },
    {
      value: "question",
      label: "Pregunta sobre uso",
      description: "Cómo usar una función específica",
    },
    {
      value: "feature",
      label: "Sugerencia de función",
      description: "Ideas para nuevas características",
    },
    {
      value: "billing",
      label: "Facturación",
      description: "Preguntas sobre pagos y suscripciones",
    },
    {
      value: "account",
      label: "Cuenta",
      description: "Gestión de cuenta y acceso",
    },
    {
      value: "other",
      label: "Otro",
      description: "Otras consultas no categorizadas",
    },
  ];

  // Módulos por defecto
  const defaultModules: SupportModule[] = [
    { id: "general", name: "General", icon: Globe, color: "#8FBC8F" }, // accent-100
    { id: "dashboard", name: "Dashboard", icon: Sparkles, color: "#2E8B57" }, // primary-100
    {
      id: "transactions",
      name: "Transacciones",
      icon: Upload,
      color: "#61bc84",
    }, // primary-200
    { id: "budgets", name: "Presupuestos", icon: Clock, color: "#345e37" }, // accent-200
    { id: "goals", name: "Metas", icon: Users, color: "#2E8B57" }, // primary-100
    { id: "analytics", name: "Analítica", icon: Sparkles, color: "#61bc84" }, // primary-200
    {
      id: "settings",
      name: "Configuración",
      icon: AlertCircle,
      color: "#8FBC8F",
    }, // accent-100
  ];

  const displayOptions = supportOptions || defaultSupportOptions;
  const displayModules = modules.length > 0 ? modules : defaultModules;
  const displayInquiryTypes =
    inquiryTypes.length > 0 ? inquiryTypes : defaultInquiryTypes;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 3); // Limitar a 3 archivos
      setAttachments(newFiles);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      ...formData,
      attachments,
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (isSuccess) {
    return (
      <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-md border border-green-500/20 shadow-2xl">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-text-100 mb-3">
            ¡Consulta enviada exitosamente!
          </h3>
          <p className="text-text-200/80 mb-6 max-w-md mx-auto">
            Hemos recibido tu consulta y nos pondremos en contacto contigo en
            las próximas{" "}
            <span className="font-semibold text-green-400">
              {estimatedResponseTime} horas
            </span>
            .
          </p>
          <div className="space-y-4 max-w-sm mx-auto">
            <div className="p-4 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
              <div className="text-sm text-text-200/70 mb-1">
                Número de seguimiento
              </div>
              <div className="text-lg font-mono font-bold text-text-100">
                #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300"
              onClick={() => window.location.reload()}
            >
              Enviar otra consulta
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Opciones de contacto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedOption === option.id;

          return (
            <Card
              key={option.id}
              className={`border-0 backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-br from-primary-100/20 to-primary-200/10 border-primary-200/40 shadow-lg shadow-primary-200/10"
                  : "bg-gradient-to-br from-bg-200/50 to-bg-300/30 border-bg-300/40 hover:border-primary-200/30"
              }`}
              onClick={() => {
                setSelectedOption(option.id);
                option.onClick?.();
              }}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div
                  className={`p-4 rounded-xl mb-4 transition-transform duration-300 ${
                    isSelected
                      ? "bg-gradient-to-br from-primary-100/30 to-primary-200/20 border border-primary-200/30 scale-110"
                      : "bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-200/20"
                  }`}
                >
                  <Icon className="h-8 w-8 text-primary-200" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-text-100 text-xl">
                    {option.title}
                  </h3>
                  {option.status === "online" && (
                    <div className="flex items-center gap-1 text-xs">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400">En línea</span>
                    </div>
                  )}
                </div>

                <p className="text-text-200/70 mb-4">{option.description}</p>

                <div className="mt-2 w-full">
                  <Button
                    className={`w-full ${
                      isSelected
                        ? "bg-gradient-to-r from-primary-100 to-primary-200 text-white hover:from-primary-200 hover:to-primary-300"
                        : "border-primary-200/40 text-primary-200 hover:bg-primary-100/10"
                    }`}
                    disabled={!option.available}
                  >
                    {option.buttonText}
                  </Button>
                </div>

                <div className="mt-4 text-xs text-text-200/60">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Respuesta: {option.responseTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator className="bg-bg-300/40" />

      {/* Formulario de contacto */}
      <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/30 to-primary-200/20 border border-primary-200/30">
              <Send className="h-7 w-7 text-primary-200" />
            </div>
            <div>
              <CardTitle className="text-text-100 text-2xl">
                Envíanos tu Consulta
              </CardTitle>
              <CardDescription className="text-text-200">
                Completa el formulario y nos pondremos en contacto contigo
              </CardDescription>
            </div>
          </div>

          {/* Indicador de tiempo de respuesta */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-200/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-text-200">
                Tiempo estimado de respuesta
              </div>
              <Badge className="bg-gradient-to-r from-primary-100/20 to-primary-200/20 text-primary-200">
                {estimatedResponseTime} horas
              </Badge>
            </div>
            <Progress value={75} className="h-1.5 bg-bg-300/50">
              <div className="h-full bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 rounded-full"></div>
            </Progress>
            <div className="text-xs text-text-200/70 mt-2">
              Nuestro equipo responde el 95% de las consultas dentro de este
              tiempo
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="text-red-400 text-sm">{error}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-200 mb-2 block">
                  Nombre completo *
                </label>
                <Input
                  required
                  className="bg-bg-300/40 border-bg-300/60 focus:border-primary-200 text-white placeholder:text-text-200/60"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-200 mb-2 block">
                  Correo electrónico *
                </label>
                <Input
                  required
                  type="email"
                  className="bg-bg-300/40 border-bg-300/60 focus:border-primary-200 text-white placeholder:text-text-200/60"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            {/* Detalles de la consulta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-200 mb-2 block">
                  Módulo relacionado *
                </label>
                <Select
                  value={formData.module}
                  onValueChange={(value) => handleInputChange("module", value)}
                >
                  <SelectTrigger className="bg-bg-300/40 border-bg-300/60 text-white placeholder:text-text-200/60">
                    <SelectValue placeholder="Selecciona un módulo" />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-200 border-bg-300">
                    {displayModules.map((module) => {
                      const ModuleIcon = module.icon;
                      return (
                        <SelectItem key={module.id} value={module.id}>
                          <div className="flex items-center gap-2">
                            <ModuleIcon
                              className="h-4 w-4"
                              style={{ color: module.color }}
                            />
                            {module.name}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-text-200 mb-2 block">
                  Tipo de consulta *
                </label>
                <Select
                  value={formData.inquiryType}
                  onValueChange={(value) =>
                    handleInputChange("inquiryType", value)
                  }
                >
                  <SelectTrigger className="bg-bg-300/40 border-bg-300/60 text-white placeholder:text-text-200/60">
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-200 border-bg-300">
                    {displayInquiryTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex flex-col">
                          <span>{type.label}</span>
                          {type.description && (
                            <span className="text-xs text-text-200/60">
                              {type.description}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Adjuntos */}
            <div>
              <label className="text-sm font-medium text-text-200 mb-2 block">
                Archivos adjuntos (opcional)
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex-1 cursor-pointer"
                  >
                    <div className="p-4 rounded-xl border-2 border-dashed border-bg-300/60 hover:border-primary-200/40 transition-colors duration-300 text-center group">
                      <Paperclip className="h-6 w-6 text-text-200/60 mx-auto mb-2 group-hover:text-primary-200 transition-colors" />
                      <div className="text-text-200 group-hover:text-primary-200 transition-colors">
                        Haz clic para adjuntar archivos
                      </div>
                      <div className="text-xs text-text-200/60 mt-1">
                        PNG, JPG, PDF, DOC (Máx. 5MB cada uno)
                      </div>
                    </div>
                  </label>
                </div>

                {/* Lista de archivos adjuntos */}
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-bg-300/20 border border-bg-300/40"
                      >
                        <div className="flex items-center gap-3">
                          <Paperclip className="h-4 w-4 text-text-200/60" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-text-100 truncate">
                              {file.name}
                            </div>
                            <div className="text-xs text-text-200/60">
                              {formatFileSize(file.size)}
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="text-text-200/60 hover:text-red-400 hover:bg-red-400/10"
                        >
                          Eliminar
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="text-sm font-medium text-text-200 mb-2 block">
                Mensaje detallado *
              </label>
              <Textarea
                required
                className="min-h-[150px] bg-bg-300/40 border-bg-300/60 focus:border-primary-200 resize-none text-white placeholder:text-text-200/60"
                placeholder="Describe tu problema o consulta con el mayor detalle posible. Incluye pasos para reproducir el problema, capturas de pantalla si es necesario, y qué resultado esperabas."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
              <div className="text-xs text-text-200/60 mt-2">
                Proporciona detalles específicos para que podamos ayudarte mejor
              </div>
            </div>

            {/* Botón de envío */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white py-6 text-lg shadow-lg shadow-primary-200/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Enviando consulta...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-3" />
                  Enviar consulta
                </>
              )}
            </Button>

            {/* Información adicional */}
            <div className="text-center text-xs text-text-200/60 pt-4 border-t border-bg-300/40">
              Al enviar esta consulta, aceptas nuestros{" "}
              <a href="#" className="text-primary-200 hover:underline">
                Términos de Servicio
              </a>{" "}
              y{" "}
              <a href="#" className="text-primary-200 hover:underline">
                Política de Privacidad
              </a>
              . Nos comprometemos a responder en menos de{" "}
              {estimatedResponseTime} horas.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSupport;
