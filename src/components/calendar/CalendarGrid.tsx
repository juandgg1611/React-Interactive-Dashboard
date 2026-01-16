// src/components/calendar/CalendarGrid.tsx
import React, { useState } from "react";
import { CalendarEvent } from "../../hooks/useCalendar";
import CalendarDay from "./CalendarDay";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  viewMode: "month" | "week" | "day";
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  events,
  onDateSelect,
  viewMode,
}) => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Obtener la grid de días del mes
  const getMonthDaysGrid = (date: Date): Date[][] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);

    // Primer día de la primera semana del grid (domingo de la semana que contiene el 1er día)
    const startDay = new Date(firstDay);
    startDay.setDate(startDay.getDate() - startDay.getDay());

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    // Generar 42 días (6 semanas × 7 días)
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDay);
      currentDate.setDate(startDay.getDate() + i);
      currentWeek.push(currentDate);

      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    return weeks;
  };

  const monthGrid = getMonthDaysGrid(currentDate);
  const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Manejar selección de fecha
  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
  };

  // Manejar hover de fecha
  const handleDateHover = (date: Date | null) => {
    setHoveredDate(date);
  };

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  // Verificar si una fecha está seleccionada
  const isDateSelected = (date: Date): boolean => {
    return selectedDate
      ? selectedDate.toDateString() === date.toDateString()
      : false;
  };

  // Verificar si es hoy
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Verificar si es del mes actual
  const isCurrentMonth = (date: Date, currentMonth: Date): boolean => {
    return (
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  };

  return (
    <div className="w-full">
      {/* Días de la semana - HEADER */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {WEEKDAYS.map((day: string, index: number) => (
          <div
            key={index}
            className={`
              text-center py-3 rounded-xl 
              bg-gradient-to-b from-bg-300/30 to-bg-300/15 
              border border-bg-300/40 
              transition-all duration-300
              ${
                index === 0 || index === 6
                  ? "text-primary-200/80"
                  : "text-text-100"
              }
            `}
          >
            <span className="text-sm font-semibold md:text-base">{day}</span>
          </div>
        ))}
      </div>

      {/* Grid de días */}
      <div className="grid grid-cols-7 gap-2">
        {monthGrid.map((week: Date[], weekIndex: number) => (
          <React.Fragment key={weekIndex}>
            {week.map((date: Date, dayIndex: number) => {
              const dayEvents = getEventsForDate(date);
              const dayIsToday = isToday(date);
              const dayIsSelected = isDateSelected(date);
              const dayIsHovered =
                hoveredDate?.toDateString() === date.toDateString();
              const isInCurrentMonth = isCurrentMonth(date, currentDate);
              const dayNumber = date.getDate();

              return (
                <CalendarDay
                  key={`${weekIndex}-${dayIndex}`}
                  day={dayNumber}
                  date={date}
                  isToday={dayIsToday}
                  isSelected={dayIsSelected}
                  isHovered={dayIsHovered}
                  events={dayEvents}
                  onSelect={() => handleDateSelect(date)}
                  onHoverStart={() => handleDateHover(date)}
                  onHoverEnd={() => handleDateHover(null)}
                  currentMonth={currentDate.getMonth()}
                  disabled={!isInCurrentMonth}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
