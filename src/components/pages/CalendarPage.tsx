// src/pages/CalendarPage.tsx
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
  Filter,
  Target,
  Sparkles,
  Clock,
  Zap,
  Grid,
  List,
  Download,
  Settings,
  Eye,
  Users,
  Bell,
  ChevronDown,
  TrendingUp,
  CheckCircle,
  TrendingDown,
  CalendarDays,
  BarChart3,
  Target as TargetIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Layout from "../layout/Layout";

// Componentes del calendario
import CalendarGrid from "../calendar/CalendarGrid";
import CalendarFooter from "../calendar/CalendarFooter";

// Hook personalizado
import { useCalendar } from "../../hooks/useCalendar";

const CalendarPage = () => {
  const {
    currentDate,
    today,
    selectedDate,
    events,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    setSelectedDate,
  } = useCalendar();

  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [showEventForm, setShowEventForm] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar hora en tiempo real
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Calcular estadísticas
  const currentMonthEvents = events.filter(
    (e) =>
      e.date.getMonth() === currentDate.getMonth() &&
      e.date.getFullYear() === currentDate.getFullYear()
  );

  const uniqueEventDays = new Set(events.map((e) => e.date.toDateString()))
    .size;

  // Eventos por categoría (si existe la propiedad category)
  const eventsByCategory = events.reduce((acc, event) => {
    const category = event.category || "general";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Progreso del mes (días transcurridos vs eventos)
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const currentDay = currentDate.getDate();
  const monthProgress = Math.round((currentDay / daysInMonth) * 100);

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* ========== HEADER PRINCIPAL ========== */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-primary-200/5 to-primary-300/3 rounded-2xl blur-xl"></div>
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-4 -left-4 w-8 h-8 bg-primary-200/10 rounded-full blur-md animate-pulse"></div>
            <div className="absolute bottom-4 -right-4 w-12 h-12 bg-primary-100/5 rounded-full blur-lg"></div>
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary-200/20 to-primary-300/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="absolute -inset-1 bg-primary-100/10 rounded-xl blur-md"></div>

                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-primary-300/10 border border-primary-200/30 shadow-lg shadow-primary-200/15 backdrop-blur-sm">
                      <CalendarIcon className="h-8 w-8 text-primary-200 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300" />

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

                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-primary-300 bg-clip-text text-transparent">
                      Calendario Inteligente
                    </h1>
                    <p className="text-text-200/80 mt-2 max-w-2xl">
                      Organiza tus eventos y tareas con nuestra interfaz
                      avanzada
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                      <div className="relative h-2 w-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-text-200">
                      {events.length} eventos activos
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <Users className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      3 personas invitadas hoy
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-100/15 to-primary-200/10 border border-primary-200/20">
                    <CheckCircle className="h-3.5 w-3.5 text-primary-200" />
                    <span className="text-sm text-text-200">
                      85% de asistencia
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3 text-sm bg-bg-200/40 backdrop-blur-md rounded-xl px-4 py-3 border border-bg-300/50 shadow-lg hover:shadow-primary-200/10 transition-all duration-300">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-text-100">
                      <CalendarIcon className="h-4 w-4 text-primary-200" />
                      <span className="font-medium">
                        {currentTime.toLocaleDateString("es-ES", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-text-200 mt-1">
                      <Clock className="h-3.5 w-3.5 text-primary-200/70" />
                      <span className="text-sm">
                        {currentTime.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setShowEventForm(true)}
                  className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/30 hover:shadow-primary-200/40 transition-all duration-300 group"
                >
                  <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Nuevo Evento
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-text-100">
                    {currentDate.toLocaleDateString("es-ES", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousMonth}
                      className="h-9 w-9 p-0 border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50 hover:bg-primary-100/10"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToToday}
                      className="h-9 px-4 border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50 hover:bg-primary-100/10"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Hoy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextMonth}
                      className="h-9 w-9 p-0 border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50 hover:bg-primary-100/10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-bg-200/40 backdrop-blur-sm border border-bg-300/40 rounded-xl p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("day")}
                      className={`h-8 px-4 text-xs ${
                        viewMode === "day"
                          ? "bg-primary-200/20 text-primary-200 shadow-md"
                          : "text-text-200 hover:text-primary-200 hover:bg-bg-300/20"
                      }`}
                    >
                      Día
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("week")}
                      className={`h-8 px-4 text-xs ${
                        viewMode === "week"
                          ? "bg-primary-200/20 text-primary-200 shadow-md"
                          : "text-text-200 hover:text-primary-200 hover:bg-bg-300/20"
                      }`}
                    >
                      Semana
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("month")}
                      className={`h-8 px-4 text-xs ${
                        viewMode === "month"
                          ? "bg-primary-200/20 text-primary-200 shadow-md"
                          : "text-text-200 hover:text-primary-200 hover:bg-bg-300/20"
                      }`}
                    >
                      Mes
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50 hover:bg-primary-100/10 group"
                  >
                    <Filter className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Filtros
                    <ChevronDown className="h-3 w-3 ml-2 group-hover:rotate-180 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== GRID DEL CALENDARIO ========== */}
        {/* NOTA: Necesitarás actualizar CalendarGrid para usar border-green-400 en lugar de border-blue-400 */}
        <div className="mb-8 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md rounded-2xl border border-bg-300/40 p-6 shadow-xl">
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            events={events}
            onDateSelect={setSelectedDate}
            viewMode={viewMode}
          />
        </div>

        {/* ========== FOOTER ========== */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Próximos eventos */}
          <div className="bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md rounded-2xl border border-bg-300/40 p-6 shadow-xl">
            <h3 className="text-lg font-bold text-text-100 mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary-200" />
              Próximos Eventos
            </h3>
            <div className="space-y-3">
              {events
                .filter((e) => e.date > today)
                .slice(0, 3)
                .map((event, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-bg-300/10 border border-bg-300/40 hover:border-primary-200/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-text-100">
                          {event.title}
                        </div>
                        <div className="text-sm text-text-200 mt-1 flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3" />
                          {event.date.toLocaleDateString("es-ES", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                          {event.time && ` • ${event.time}`}
                        </div>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Estadísticas - MEJORADO */}
          <div className="bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md rounded-2xl border border-bg-300/40 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-100 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary-200" />
                Estadísticas del Mes
              </h3>
              <div className="text-xs text-text-200 bg-bg-300/30 px-2 py-1 rounded-lg">
                {currentDate.toLocaleDateString("es-ES", { month: "long" })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Total de eventos */}
              <div className="bg-gradient-to-br from-bg-200/30 to-bg-300/20 p-4 rounded-xl border border-bg-300/30 hover:border-primary-200/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary-100/10">
                    <CalendarDays className="h-4 w-4 text-primary-200" />
                  </div>
                  <div>
                    <div className="text-sm text-text-200">Total Eventos</div>
                    <div className="text-2xl font-bold text-text-100">
                      {events.length}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-text-200 mt-2">
                  <span className="text-green-400 font-medium">
                    {currentMonthEvents.length}
                  </span>{" "}
                  este mes
                </div>
              </div>

              {/* Días con eventos */}
              <div className="bg-gradient-to-br from-bg-200/30 to-bg-300/20 p-4 rounded-xl border border-bg-300/30 hover:border-primary-200/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-400/10">
                    <TargetIcon className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-text-200">Días Activos</div>
                    <div className="text-2xl font-bold text-green-400">
                      {uniqueEventDays}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-text-200 mt-2">
                  Días con eventos programados
                </div>
              </div>

              {/* Progreso del mes */}
              <div className="bg-gradient-to-br from-bg-200/30 to-bg-300/20 p-4 rounded-xl border border-bg-300/30 hover:border-primary-200/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary-300/10">
                    <TrendingUp className="h-4 w-4 text-primary-300" />
                  </div>
                  <div>
                    <div className="text-sm text-text-200">Progreso Mes</div>
                    <div className="text-2xl font-bold text-primary-300">
                      {monthProgress}%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-bg-300/30 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-gradient-to-r from-primary-200 to-primary-300 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${monthProgress}%` }}
                  />
                </div>
              </div>

              {/* Categorías */}
              <div className="bg-gradient-to-br from-bg-200/30 to-bg-300/20 p-4 rounded-xl border border-bg-300/30 hover:border-primary-200/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary-200/10">
                    <Zap className="h-4 w-4 text-primary-200" />
                  </div>
                  <div>
                    <div className="text-sm text-text-200">Categorías</div>
                    <div className="text-2xl font-bold text-primary-200">
                      {Object.keys(eventsByCategory).length}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-text-200 mt-2">
                  Tipos de eventos diferentes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón flotante */}
        <Button
          onClick={() => setShowEventForm(true)}
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-2xl shadow-primary-200/40 hover:shadow-primary-300/50 hover:scale-110 transition-all duration-300 z-50"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>

        {/* Footer inferior */}
        <div className="pt-6 border-t border-bg-300/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
            <div className="text-text-200/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-200 rounded-full animate-pulse" />
                <span>
                  Calendario sincronizado • Actualizado:{" "}
                  {currentTime.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-200 hover:text-primary-300 hover:bg-primary-100/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/60 text-text-200 hover:text-primary-300 hover:border-primary-200/50 hover:bg-primary-100/10"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
