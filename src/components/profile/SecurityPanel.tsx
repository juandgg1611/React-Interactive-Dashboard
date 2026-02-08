// SecurityPanel.tsx
import React, { useState } from "react";
import {
  Shield,
  Key,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";

const SecurityPanel = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [devices] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      os: "iOS 17",
      lastActive: "Ahora",
      current: true,
    },
    {
      id: 2,
      name: "MacBook Pro",
      os: "macOS Sonoma",
      lastActive: "Hace 2 días",
      current: false,
    },
    {
      id: 3,
      name: "iPad Air",
      os: "iPadOS 17",
      lastActive: "Hace 1 semana",
      current: false,
    },
  ]);

  const [securityActions] = useState([
    {
      id: 1,
      action: "Cambio de contraseña",
      date: "15/01/2024",
      status: "success",
    },
    {
      id: 2,
      action: "Nuevo dispositivo",
      date: "10/01/2024",
      status: "warning",
    },
    {
      id: 3,
      action: "Inicio de sesión desde IP nueva",
      date: "05/01/2024",
      status: "info",
    },
  ]);

  const handleLogoutAll = () => {
    // Lógica para cerrar sesión en todos los dispositivos
    console.log("Cerrando sesión en todos los dispositivos...");
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-text-100 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/10">
            <Shield className="h-5 w-5 text-red-400" />
          </div>
          <span>Seguridad y Privacidad</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-8">
          {/* Autenticación de dos factores */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-2 flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary-200" />
                  Autenticación de Dos Factores (2FA)
                </h3>
                <p className="text-sm text-text-200">
                  Agrega una capa extra de seguridad a tu cuenta
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
                className="data-[state=checked]:bg-primary-200"
              />
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-primary-100/10 border border-primary-200/20">
              {twoFactorEnabled ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="font-medium text-text-100">
                      2FA Activado
                    </div>
                    <div className="text-sm text-text-200">
                      Tu cuenta está protegida con autenticación en dos pasos
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div>
                    <div className="font-medium text-text-100">
                      2FA Desactivado
                    </div>
                    <div className="text-sm text-text-200">
                      Activa para mayor seguridad
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Cambio de contraseña */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
            <h3 className="text-lg font-semibold text-text-100 mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary-200" />
              Cambiar Contraseña
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-text-200 mb-2 block">
                  Contraseña actual
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 rounded-lg bg-bg-300/30 border border-bg-300/60 text-text-100 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-text-200 hover:text-primary-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-text-200 mb-2 block">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  className="w-full p-3 rounded-lg bg-bg-300/30 border border-bg-300/60 text-text-100"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="text-sm text-text-200 mb-2 block">
                  Confirmar nueva contraseña
                </label>
                <input
                  type="password"
                  className="w-full p-3 rounded-lg bg-bg-300/30 border border-bg-300/60 text-text-100"
                  placeholder="••••••••"
                />
              </div>

              <Button className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 w-full">
                Cambiar Contraseña
              </Button>
            </div>
          </div>

          {/* Dispositivos conectados */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10 border border-bg-300/40">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-100 mb-2 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary-200" />
                  Dispositivos Conectados
                </h3>
                <p className="text-sm text-text-200">
                  {devices.length} dispositivos tienen acceso a tu cuenta
                </p>
              </div>
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={handleLogoutAll}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar en todos
              </Button>
            </div>

            <div className="space-y-4">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-bg-300/20 hover:bg-bg-300/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${device.current ? "bg-green-500/20" : "bg-bg-300/40"}`}
                    >
                      <Smartphone
                        className={`h-5 w-5 ${device.current ? "text-green-400" : "text-text-200"}`}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-text-100">
                        {device.name}
                      </div>
                      <div className="text-sm text-text-200">
                        {device.os} • {device.lastActive}
                      </div>
                    </div>
                  </div>
                  {device.current ? (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400">Actual</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Cerrar sesión
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Historial de seguridad */}
          <div>
            <h3 className="text-lg font-semibold text-text-100 mb-4">
              Historial de Seguridad
            </h3>
            <div className="space-y-3">
              {securityActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-bg-300/20"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded ${
                        action.status === "success"
                          ? "bg-green-500/20"
                          : action.status === "warning"
                            ? "bg-yellow-500/20"
                            : "bg-blue-500/20"
                      }`}
                    >
                      <CheckCircle
                        className={`h-4 w-4 ${
                          action.status === "success"
                            ? "text-green-400"
                            : action.status === "warning"
                              ? "text-yellow-400"
                              : "text-blue-400"
                        }`}
                      />
                    </div>
                    <span className="text-sm text-text-100">
                      {action.action}
                    </span>
                  </div>
                  <span className="text-sm text-text-200">{action.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityPanel;
