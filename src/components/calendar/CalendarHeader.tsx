// src/components/calendar/CalendarHeader.tsx
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "../ui/button";

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  viewMode: "month" | "week" | "day";
  onViewModeChange: (mode: "month" | "week" | "day") => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
  viewMode,
  onViewModeChange,
}) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="mb-8 relative">
      {/* Fondo con gradiente sutil - EXACTO como dashboard */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-primary-200/5 to-primary-300/3 rounded-2xl blur-xl"></div>

      {/* Efectos de partículas - EXACTO como dashboard */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute top-4 -left-4 w-8 h-8 bg-primary-200/10 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-4 -right-4 w-12 h-12 bg-primary-100/5 rounded-full blur-lg"></div>
      </div>

      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Icono con efectos especiales - IGUAL que dashboard */}
              <div className="relative group">
                {/* Brillos externos */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-200/20 to-primary-300/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-primary-100/10 rounded-xl blur-md"></div>

                {/* Icono principal */}
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-primary-300/10 border border-primary-200/30 shadow-lg shadow-primary-200/15 backdrop-blur-sm">
                  <CalendarIcon className="h-8 w-8 text-primary-200 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300" />

                  {/* Efecto de fecha en el icono */}
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                      <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-200 flex items-center justify-center">
                        <Sparkles className="h-2.5 w-2.5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Títulos con gradiente - IGUAL que dashboard */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                  Calendario Inteligente
                </h1>
                <p className="text-text-200/80 mt-2 max-w-2xl">
                  Navega por tus eventos y tareas con precisión
                </p>
              </div>
            </div>

            {/* Stats en tiempo real - ESTILO DASHBOARD */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-20"></div>
                  <div className="relative h-2 w-2 bg-primary-300 rounded-full"></div>
                </div>
                <span className="text-sm text-text-200">
                  {currentDate.toLocaleDateString("es-ES", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                <Target className="h-3.5 w-3.5 text-primary-200" />
                <span className="text-sm text-text-200">
                  Vista{" "}
                  {viewMode === "month"
                    ? "mensual"
                    : viewMode === "week"
                    ? "semanal"
                    : "diaria"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Controles de navegación - ESTILO COMPACTO */}
            <div className="flex items-center gap-2 bg-bg-200/40 backdrop-blur-md rounded-xl p-2 border border-bg-300/50 shadow-lg">
              <Button
                onClick={onPreviousMonth}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                title="Mes anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                onClick={onToday}
                variant="ghost"
                size="sm"
                className="px-3 h-8 text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                title="Ir a hoy"
              >
                Hoy
              </Button>

              <Button
                onClick={onNextMonth}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
                title="Mes siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Selector de vista - MEJORADO */}
            <div className="flex items-center gap-1 bg-bg-200/40 backdrop-blur-md rounded-xl p-1 border border-bg-300/50 shadow-lg">
              <Button
                onClick={() => onViewModeChange("day")}
                variant="ghost"
                size="sm"
                className={`h-8 px-3 text-xs transition-all duration-300 ${
                  viewMode === "day"
                    ? "bg-primary-200/20 text-primary-400 shadow-md"
                    : "text-text-200 hover:text-primary-400 hover:bg-primary-200/10"
                }`}
              >
                Día
              </Button>
              <Button
                onClick={() => onViewModeChange("week")}
                variant="ghost"
                size="sm"
                className={`h-8 px-3 text-xs transition-all duration-300 ${
                  viewMode === "week"
                    ? "bg-primary-200/20 text-primary-400 shadow-md"
                    : "text-text-200 hover:text-primary-400 hover:bg-primary-200/10"
                }`}
              >
                Semana
              </Button>
              <Button
                onClick={() => onViewModeChange("month")}
                variant="ghost"
                size="sm"
                className={`h-8 px-3 text-xs transition-all duration-300 ${
                  viewMode === "month"
                    ? "bg-primary-200/20 text-primary-400 shadow-md"
                    : "text-text-200 hover:text-primary-400 hover:bg-primary-200/10"
                }`}
              >
                Mes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
