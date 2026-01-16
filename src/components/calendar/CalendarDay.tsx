// src/components/calendar/CalendarDay.tsx
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Sparkles, Target, MoreVertical, Clock, Users } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  color: string;
  type: "meeting" | "reminder" | "task" | "personal";
  time?: string;
  participants?: number;
}

interface CalendarDayProps {
  day: number;
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  isHovered: boolean;
  events: CalendarEvent[];
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  currentMonth: number;
  disabled?: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  date,
  isToday,
  isSelected,
  isHovered,
  events,
  onSelect,
  onHoverStart,
  onHoverEnd,
  currentMonth,
  disabled = false,
}) => {
  // Verificar si el día pertenece al mes actual
  const isCurrentMonth = date.getMonth() === currentMonth;

  // Clases base del día - ESTILO DASHBOARD
  const dayClasses = cn(
    "relative min-h-[120px] p-3 rounded-xl border transition-all duration-300",
    "flex flex-col cursor-pointer", // QUITADO: overflow-hidden
    "group hover:shadow-lg",

    // Días del mes actual vs otros meses
    isCurrentMonth ? "bg-bg-300/10" : "bg-bg-300/5 opacity-40",

    // Borde según estado - ESTILO DASHBOARD
    isToday
      ? "ring-2 ring-primary-100 !ring-primary-100 ring-opacity-50 border-primary-200/30 !border-primary-200/30"
      : isSelected
      ? "bg-primary-100/20 border-primary-200/50 shadow-lg shadow-primary-200/20"
      : "border-bg-300/30 hover:border-primary-200/30 hover:bg-primary-100/10",

    // Efecto hover
    isHovered && !disabled && "bg-primary-100/10",

    // Días deshabilitados (de otros meses)
    disabled && "cursor-default opacity-30"
  );

  // Eventos para mostrar
  const visibleEvents = events.slice(0, 2);
  const hasMoreEvents = events.length > 2;

  return (
    <div
      className={dayClasses}
      onClick={!disabled ? onSelect : undefined}
      onMouseEnter={!disabled ? onHoverStart : undefined}
      onMouseLeave={!disabled ? onHoverEnd : undefined}
    >
      {/* Fondo con gradiente sutil en hover - ESTILO DASHBOARD */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/5 to-primary-200/3 rounded-xl" />
      )}

      {/* Número del día */}
      <div className="relative z-10 flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "text-lg font-bold transition-all duration-300",
              isToday
                ? "text-green-400" // CAMBIADO A VERDE
                : isSelected
                ? "text-primary-200"
                : isCurrentMonth
                ? "text-text-100"
                : "text-text-200/60",
              disabled && "text-text-200/40"
            )}
          >
            {day > 0 ? day : ""}
          </span>

          {isToday && (
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />{" "}
              {/* CAMBIADO A VERDE */}
              <div className="relative w-2 h-2 bg-green-400 rounded-full animate-pulse" />{" "}
              {/* CAMBIADO A VERDE */}
            </div>
          )}
        </div>

        {/* Indicador de eventos - ESTILO DASHBOARD */}
        {events.length > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              {events.slice(0, 2).map((event, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full border border-bg-300"
                  style={{ backgroundColor: event.color }}
                />
              ))}
            </div>
            {events.length > 2 && (
              <span className="text-xs text-text-200/60">
                +{events.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Lista de eventos - ESTILO DASHBOARD - CORREGIDO: SIN SCROLL */}
      <div className="flex-1 space-y-1.5">
        {" "}
        {/* QUITADO: overflow-y-auto */}
        {visibleEvents.map((event, index) => (
          <div
            key={event.id}
            className={cn(
              "relative p-2 rounded-lg text-xs transition-all duration-300",
              "group/event hover:scale-[1.02] hover:shadow-md"
            )}
            style={{
              backgroundColor: `${event.color}20`,
              borderLeft: `3px solid ${event.color}`,
            }}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <span
                  className="font-medium truncate"
                  style={{ color: event.color }}
                >
                  {event.title}
                </span>
                {event.type === "meeting" && event.participants && (
                  <div className="flex items-center gap-0.5">
                    <Users className="h-2.5 w-2.5 text-text-200/60" />
                    <span className="text-[10px] text-text-200/60">
                      {event.participants}
                    </span>
                  </div>
                )}
              </div>

              {event.time && (
                <div className="flex items-center gap-1 text-[10px] text-text-200/70">
                  <Clock className="h-2 w-2" />
                  <span>{event.time}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Indicador de más eventos - ESTILO DASHBOARD */}
        {hasMoreEvents && (
          <div className="pt-1 border-t border-bg-300/30">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-200/60">+{events.length - 2} más</span>
              <MoreVertical className="h-3 w-3 text-text-200/40 group-hover:text-primary-200/60 transition-colors" />
            </div>
          </div>
        )}
      </div>

      {/* Indicador de día actual especial */}
      {isToday && !disabled && (
        <div className="absolute bottom-1.5 right-1.5">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30"></div>{" "}
            {/* CAMBIADO A VERDE */}
            <div className="relative w-1.5 h-1.5 bg-green-400 rounded-full"></div>{" "}
            {/* CAMBIADO A VERDE */}
          </div>
        </div>
      )}

      {/* Efecto de selección activa */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-primary-200/30 rounded-xl pointer-events-none" />
      )}

      {/* Efecto de brillo en hover */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 border border-primary-200/20 rounded-xl pointer-events-none" />
      )}
    </div>
  );
};

export default CalendarDay;
