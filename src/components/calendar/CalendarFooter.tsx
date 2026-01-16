// src/components/calendar/CalendarFooter.tsx
import React from "react";
import {
  Calendar,
  Clock,
  Zap,
  TrendingUp,
  Target,
  Sparkles,
  Users,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: string;
  type: "meeting" | "reminder" | "task" | "personal";
}

interface CalendarFooterProps {
  selectedDate: Date | null;
  events: CalendarEvent[];
  today: Date;
}

const CalendarFooter: React.FC<CalendarFooterProps> = ({
  selectedDate,
  events,
  today,
}) => {
  // Contar eventos por tipo
  const eventCounts = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Eventos de hoy
  const todaysEvents = events.filter(
    (event) => event.date.toDateString() === today.toDateString()
  );

  // Eventos próximos (próximos 7 días)
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const upcomingEvents = events.filter(
    (event) => event.date > today && event.date <= nextWeek
  ).length;

  // Eventos completados
  const completedEvents = events.filter((e) => e.type === "task").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Próximos eventos */}
      <div className="bg-bg-200/30 backdrop-blur-sm rounded-2xl border border-bg-300/40 p-6">
        <h3 className="text-lg font-bold text-text-100 mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary-200" />
          Próximos Eventos
        </h3>
        <div className="space-y-3">
          {events
            .filter((e) => e.date > today)
            .slice(0, 4)
            .map((event, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/30 hover:border-primary-200/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-text-100 group-hover:text-white transition-colors truncate">
                      {event.title}
                    </div>
                    <div className="text-sm text-text-200 mt-1 flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {event.date.toLocaleDateString("es-ES", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="h-1 w-1 bg-text-200/50 rounded-full"></span>
                      <Clock className="h-3 w-3" />
                      <span>9:00 AM</span>
                    </div>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 ml-2 mt-1"
                    style={{ backgroundColor: event.color }}
                  />
                </div>
              </div>
            ))}
          {events.filter((e) => e.date > today).length === 0 && (
            <div className="text-center py-4 text-text-200/70">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary-200/50" />
              <p>No hay eventos próximos</p>
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="bg-bg-200/30 backdrop-blur-sm rounded-2xl border border-bg-300/40 p-6">
        <h3 className="text-lg font-bold text-text-100 mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary-200" />
          Estadísticas del Mes
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/10 border border-primary-200/20">
                <Target className="h-4 w-4 text-primary-200" />
              </div>
              <div>
                <div className="text-sm text-text-200">Eventos totales</div>
                <div className="text-xl font-bold text-text-100">
                  {events.length}
                </div>
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-primary-200/10 text-primary-200">
              +{Math.floor(events.length * 0.15)} este mes
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-400/10 border border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-text-200">Completados</div>
                <div className="text-xl font-bold text-green-400">
                  {completedEvents}
                </div>
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
              {events.length > 0
                ? `${Math.round((completedEvents / events.length) * 100)}%`
                : "0%"}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 border border-yellow-500/20">
                <AlertCircle className="h-4 w-4 text-yellow-400" />
              </div>
              <div>
                <div className="text-sm text-text-200">Próximos 7 días</div>
                <div className="text-xl font-bold text-yellow-400">
                  {upcomingEvents}
                </div>
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400">
              {upcomingEvents > 0 ? "Preparados" : "Libre"}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-bg-300/20 to-bg-300/10 border border-bg-300/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-400/10 border border-blue-500/20">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-text-200">Reuniones</div>
                <div className="text-xl font-bold text-blue-400">
                  {eventCounts.meeting || 0}
                </div>
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
              {eventCounts.meeting
                ? `${Math.round((eventCounts.meeting / events.length) * 100)}%`
                : "0%"}
            </div>
          </div>
        </div>
      </div>

      {/* Distribución de eventos */}
      <div className="bg-bg-200/30 backdrop-blur-sm rounded-2xl border border-bg-300/40 p-6">
        <h3 className="text-lg font-bold text-text-100 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary-200" />
          Distribución por Tipo
        </h3>

        <div className="space-y-4">
          {[
            {
              type: "meeting",
              label: "Reuniones",
              color: "#2E8B57",
              count: eventCounts.meeting || 0,
              icon: Users,
            },
            {
              type: "task",
              label: "Tareas",
              color: "#61bc84",
              count: eventCounts.task || 0,
              icon: CheckCircle,
            },
            {
              type: "personal",
              label: "Personal",
              color: "#8FBC8F",
              count: eventCounts.personal || 0,
              icon: Sparkles,
            },
            {
              type: "reminder",
              label: "Recordatorios",
              color: "#c6ffe6",
              count: eventCounts.reminder || 0,
              icon: Bell,
            },
          ].map((item) => {
            const percentage =
              events.length > 0 ? (item.count / events.length) * 100 : 0;
            const Icon = item.icon;

            return (
              <div key={item.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon className="h-3 w-3" style={{ color: item.color }} />
                    </div>
                    <span className="text-sm text-text-200">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-text-100">
                      {item.count}
                    </span>
                    <span className="text-xs text-text-200/70 w-12 text-right">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="h-2 bg-bg-300/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color,
                      backgroundImage: `linear-gradient(90deg, ${item.color}, ${item.color}DD)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen */}
        <div className="mt-6 pt-4 border-t border-bg-300/30">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10">
              <div className="text-sm text-text-200">Hoy</div>
              <div
                className={`text-2xl font-bold ${
                  todaysEvents.length > 0 ? "text-primary-200" : "text-text-100"
                }`}
              >
                {todaysEvents.length}
              </div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-bg-300/20 to-bg-300/10">
              <div className="text-sm text-text-200">Densidad</div>
              <div className="text-2xl font-bold text-text-100">
                {events.length > 20
                  ? "Alta"
                  : events.length > 10
                  ? "Media"
                  : "Baja"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarFooter;
