import React, { useState } from "react";
import { Bell, Mail, Smartphone, Zap, Volume2, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: "email" | "push" | "both";
  icon: React.ReactNode;
}

const BudgetNotifications: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "1",
      name: "Alertas de Límite",
      description: "Notificaciones al alcanzar 80%, 90% y 100% del presupuesto",
      enabled: true,
      type: "both",
      icon: <Bell className="h-5 w-5 text-primary-200" />,
    },
    {
      id: "2",
      name: "Resumen Semanal",
      description: "Reporte semanal de gastos y progreso",
      enabled: true,
      type: "email",
      icon: <Mail className="h-5 w-5 text-primary-200" />,
    },
    {
      id: "3",
      name: "Alertas en Tiempo Real",
      description: "Notificaciones push por gastos grandes",
      enabled: true,
      type: "push",
      icon: <Zap className="h-5 w-5 text-primary-200" />,
    },
    {
      id: "4",
      name: "Recordatorios",
      description: "Recordatorios para registrar gastos pendientes",
      enabled: false,
      type: "both",
      icon: <Volume2 className="h-5 w-5 text-primary-200" />,
    },
    {
      id: "5",
      name: "Modo Nocturno",
      description: "Silenciar notificaciones durante la noche",
      enabled: true,
      type: "push",
      icon: <Moon className="h-5 w-5 text-primary-200" />,
    },
  ]);

  const [quietHours, setQuietHours] = useState("22:00-07:00");

  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const updateSettingType = (id: string, type: NotificationSetting["type"]) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, type } : setting
      )
    );
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-sm border border-bg-300/30 shadow-xl shadow-black/20">
      <CardHeader>
        <CardTitle className="text-text-100 flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary-200" />
          Notificaciones y Alertas
        </CardTitle>
        <p className="text-sm text-text-200">
          Personaliza cómo recibes alertas de presupuesto
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Configuraciones individuales */}
          <div className="space-y-4">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="p-4 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-bg-300/30">
                      {setting.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-text-100">
                          {setting.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            setting.type === "email"
                              ? "border-blue-400/30 text-blue-400"
                              : setting.type === "push"
                              ? "border-green-400/30 text-green-400"
                              : "border-purple-400/30 text-purple-400"
                          }`}
                        >
                          {setting.type === "email"
                            ? "Email"
                            : setting.type === "push"
                            ? "Push"
                            : "Ambos"}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-200 mt-1">
                        {setting.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      value={setting.type}
                      onValueChange={(value: NotificationSetting["type"]) =>
                        updateSettingType(setting.id, value)
                      }
                    >
                      <SelectTrigger className="w-28 bg-bg-300/30 border-bg-300/50 text-text-100 text-xs h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-bg-200/80 backdrop-blur-sm border-bg-300">
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="push">Push</SelectItem>
                        <SelectItem value="both">Ambos</SelectItem>
                      </SelectContent>
                    </Select>

                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => toggleSetting(setting.id)}
                      className="data-[state=checked]:bg-primary-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Horario silencioso */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-bg-300/30 to-bg-300/20 border border-bg-300/40">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-text-100 flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Horario Silencioso
                </h4>
                <p className="text-sm text-text-200">
                  No recibir notificaciones durante estas horas
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-primary-200/30 text-primary-200"
              >
                Activo
              </Badge>
            </div>

            <div className="space-y-3">
              <Select value={quietHours} onValueChange={setQuietHours}>
                <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-bg-200/80 backdrop-blur-sm border-bg-300">
                  <SelectItem value="22:00-07:00">
                    22:00 - 07:00 (Recomendado)
                  </SelectItem>
                  <SelectItem value="23:00-08:00">23:00 - 08:00</SelectItem>
                  <SelectItem value="00:00-09:00">00:00 - 09:00</SelectItem>
                  <SelectItem value="none">Desactivado</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center justify-between text-sm text-text-200">
                <span>Noche</span>
                <span>Día</span>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-bg-300/50 text-text-200 hover:text-primary-300"
              onClick={() =>
                setSettings(settings.map((s) => ({ ...s, enabled: false })))
              }
            >
              Desactivar Todas
            </Button>
            <Button
              className="flex-1 bg-primary-100 hover:bg-primary-200"
              onClick={() =>
                setSettings(settings.map((s) => ({ ...s, enabled: true })))
              }
            >
              Activar Todas
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetNotifications;
