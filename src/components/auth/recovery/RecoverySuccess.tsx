// src/components/auth/recovery/RecoverySuccess.tsx
import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Mail,
  Lock,
  Sparkles,
  PartyPopper,
  Bell,
  Smartphone,
  Key,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";

interface RecoverySuccessProps {
  email: string;
  onContinue: () => void;
  onSecuritySettings?: () => void;
}

export const RecoverySuccess: React.FC<RecoverySuccessProps> = ({
  email,
  onContinue,
  onSecuritySettings,
}) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [securityActions] = useState([
    {
      id: 1,
      title: "Activar 2FA",
      icon: ShieldCheck,
      description: "Añade una capa extra de seguridad",
    },
  ]);

  // Confeti solo por 3 segundos
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatEmail = (email: string) => {
    const [username, domain] = email.split("@");
    return `${username.charAt(0)}***@${domain}`;
  };

  return (
    <div className="space-y-8">
      {/* Confeti simplificado */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1"
              style={{
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: "50%",
              }}
              initial={{ y: -100, opacity: 1, scale: 0 }}
              animate={{
                y: window.innerHeight,
                opacity: 0,
                scale: [0, 1, 0.5],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random(),
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Header de éxito - Simplificado */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-100/30 to-primary-200/20 border-2 border-primary-200/30 shadow-xl shadow-primary-100/10">
            <CheckCircle2 className="h-16 w-16 text-primary-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-bold text-text-100">
            ¡Contraseña Restablecida!
          </h1>
          <p className="text-text-200">Tu cuenta está protegida nuevamente</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary-100/20 to-primary-200/10 border border-primary-100/20"
        >
          <Sparkles className="h-3 w-3 text-primary-300" />
          <span className="text-xs text-primary-200 font-medium">
            Proceso completado con éxito
          </span>
        </motion.div>
      </div>

      {/* Información clave - Muy simplificada */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        {/* Confirmación de envío */}
        <div className="bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary-100/20">
              <Mail className="h-5 w-5 text-primary-200" />
            </div>
            <div>
              <h3 className="font-semibold text-text-100">
                Confirmación Enviada
              </h3>
              <p className="text-sm text-text-200">
                Hemos enviado una notificación a:
              </p>
            </div>
          </div>
          <div className="text-sm text-text-100 bg-bg-300/30 rounded-lg p-3 text-center">
            {formatEmail(email)}
          </div>
        </div>

        {/* Acciones tomadas */}
        <div className="bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent-100/20">
              <ShieldCheck className="h-5 w-5 text-accent-100" />
            </div>
            <div>
              <h3 className="font-semibold text-text-100">
                Medidas de Seguridad Activadas
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-300/20">
              <div className="w-2 h-2 rounded-full bg-primary-200"></div>
              <span className="text-sm text-text-200">
                Sesiones anteriores cerradas
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-300/20">
              <div className="w-2 h-2 rounded-full bg-primary-200"></div>
              <span className="text-sm text-text-200">
                Historial de seguridad actualizado
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-300/20">
              <div className="w-2 h-2 rounded-full bg-primary-200"></div>
              <span className="text-sm text-text-200">
                Nueva contraseña establecida
              </span>
            </div>
          </div>
        </div>

        {/* Recomendaciones rápidas */}
        <div className="bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 rounded-xl p-5">
          <h3 className="font-semibold text-text-100 mb-4">
            Recomendaciones de Seguridad
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {securityActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * action.id }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-300/20 hover:bg-bg-300/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary-100/20">
                    <Icon className="h-4 w-4 text-primary-200" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-text-100">
                      {action.title}
                    </div>
                    <div className="text-xs text-text-200">
                      {action.description}
                    </div>
                  </div>
                  <button
                    onClick={onSecuritySettings}
                    className="text-xs text-primary-200 hover:text-primary-300 font-medium"
                  >
                    Configurar
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Botones de acción - Simplificados */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        <button
          onClick={onContinue}
          className="w-full py-3 px-6 bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-200/20 flex items-center justify-center"
        >
          <PartyPopper className="h-5 w-5 mr-2" />
          Iniciar Sesión
        </button>
      </motion.div>

      {/* Mensaje final muy breve */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center pt-4 border-t border-bg-300/30"
      >
        <p className="text-xs text-text-200">
          Tu cuenta está protegida con encriptación de 256-bit
        </p>
      </motion.div>
    </div>
  );
};
