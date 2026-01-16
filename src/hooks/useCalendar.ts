// src/hooks/useCalendar.ts
import { useState, useEffect } from "react";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: string;
  type: "meeting" | "reminder" | "task" | "personal";
  time?: string;
  description?: string;
  participants?: number;
  category?: string;
}

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Días de la semana
  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Meses
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

  // Fecha actual
  const today = new Date();

  // Obtener días del mes actual para grid
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);

    // Día de la semana del primer día
    const firstDayIndex = firstDay.getDay();

    // Total de días en el mes
    const totalDays = lastDay.getDate();

    // Crear array de días
    const daysArray: number[] = [];

    // Añadir días del mes anterior para completar la primera semana
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      daysArray.push(-(prevMonthLastDay - i));
    }

    // Añadir días del mes actual
    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(i);
    }

    // Añadir días del próximo mes para completar la última semana
    const nextMonthDays = 42 - daysArray.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      daysArray.push(-i);
    }

    return daysArray;
  };

  // Navegación
  const goToPreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    const todayDate = new Date();
    setCurrentDate(todayDate);
    setSelectedDate(todayDate);
  };

  // Manejo de eventos
  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = (eventId: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, ...updates } : event
      )
    );
  };

  const removeEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  // Datos de ejemplo para eventos - MÁS COMPLETOS Y REALISTAS
  useEffect(() => {
    const exampleEvents: CalendarEvent[] = [
      {
        id: "1",
        title: "Reunión de equipo semanal",
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          15,
          10,
          0
        ),
        color: "#2E8B57",
        type: "meeting",
        time: "10:00 AM",
        description: "Revisión de objetivos del sprint",
        participants: 8,
      },
      {
        id: "2",
        title: "Entrega de proyecto final",
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          20,
          17,
          0
        ),
        color: "#61bc84",
        type: "task",
        time: "5:00 PM",
        description: "Presentación al cliente",
        participants: 3,
      },
      {
        id: "3",
        title: "Cita médica anual",
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          8,
          11,
          30
        ),
        color: "#8FBC8F",
        type: "personal",
        time: "11:30 AM",
        description: "Checkup general",
        participants: 1,
      },
      {
        id: "4",
        title: "Recordatorio: Pago de servicios",
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          25,
          9,
          0
        ),
        color: "#c6ffe6",
        type: "reminder",
        time: "9:00 AM",
        description: "Electricidad y agua",
      },
      {
        id: "5",
        title: "Almuerzo con inversionistas",
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          12,
          13,
          0
        ),
        color: "#2E8B57",
        type: "meeting",
        time: "1:00 PM",
        description: "Restaurante El Jardín",
        participants: 4,
      },
      {
        id: "6",
        title: "Revisión de código",
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          18,
          15,
          30
        ),
        color: "#61bc84",
        type: "task",
        time: "3:30 PM",
        description: "Pull request #452",
      },
      {
        id: "7",
        title: "Aniversario de bodas",
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          22,
          19,
          0
        ),
        color: "#8FBC8F",
        type: "personal",
        time: "7:00 PM",
        description: "Cena especial",
        participants: 2,
      },
      {
        id: "8",
        title: "Recordatorio: Cumpleaños mamá",
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          28,
          0,
          0
        ),
        color: "#c6ffe6",
        type: "reminder",
        description: "Comprar regalo y flores",
      },
    ];

    setEvents(exampleEvents);
  }, []);

  // Obtener eventos para un día específico
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  // Obtener eventos del mes actual
  const getCurrentMonthEvents = () => {
    return events.filter(
      (event) =>
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  // Estadísticas
  const getEventStats = () => {
    const currentMonthEvents = getCurrentMonthEvents();
    const todayEvents = getEventsForDate(today);

    return {
      total: events.length,
      currentMonth: currentMonthEvents.length,
      today: todayEvents.length,
      byType: {
        meeting: events.filter((e) => e.type === "meeting").length,
        task: events.filter((e) => e.type === "task").length,
        personal: events.filter((e) => e.type === "personal").length,
        reminder: events.filter((e) => e.type === "reminder").length,
      },
    };
  };

  return {
    currentDate,
    daysInMonth: getDaysInMonth(),
    weekDays,
    months,
    today,
    selectedDate,
    events,
    eventStats: getEventStats(),
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    setSelectedDate,
    addEvent,
    updateEvent,
    removeEvent,
    getEventsForDate,
    getCurrentMonthEvents,
  };
};
