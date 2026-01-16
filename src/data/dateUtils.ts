// src/utils/dateUtils.ts

/**
 * Utilidades para manejo de fechas en español
 */

// Nombres en español
export const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
export const WEEKDAYS_FULL = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
export const MONTHS = [
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
export const MONTHS_SHORT = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

/**
 * Obtiene el primer día del mes
 */
export const getFirstDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Obtiene el último día del mes
 */
export const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Obtiene días del mes actual y adyacentes para llenar el grid (6 semanas × 7 días)
 */
export const getMonthDaysGrid = (date: Date): Date[][] => {
  const firstDay = getFirstDayOfMonth(date);
  const lastDay = getLastDayOfMonth(date);

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

/**
 * Verifica si dos fechas son el mismo día
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/**
 * Verifica si una fecha es hoy
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(date, today);
};

/**
 * Verifica si una fecha pertenece al mes actual
 */
export const isCurrentMonth = (date: Date, currentMonth: Date): boolean => {
  return (
    date.getMonth() === currentMonth.getMonth() &&
    date.getFullYear() === currentMonth.getFullYear()
  );
};

/**
 * Verifica si una fecha es fin de semana
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Domingo, 6 = Sábado
};

/**
 * Formatea fecha en español completo
 */
export const formatDateSpanish = (date: Date): string => {
  return `${WEEKDAYS_FULL[date.getDay()]}, ${date.getDate()} de ${
    MONTHS[date.getMonth()]
  } de ${date.getFullYear()}`;
};

/**
 * Formatea fecha corta
 */
export const formatDateShort = (date: Date): string => {
  return `${date.getDate()} ${
    MONTHS_SHORT[date.getMonth()]
  } ${date.getFullYear()}`;
};

/**
 * Formatea hora
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Añade días a una fecha
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Añade meses a una fecha
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Obtiene el nombre del mes
 */
export const getMonthName = (date: Date): string => {
  return MONTHS[date.getMonth()];
};

/**
 * Obtiene el nombre corto del mes
 */
export const getMonthShortName = (date: Date): string => {
  return MONTHS_SHORT[date.getMonth()];
};

/**
 * Obtiene el año
 */
export const getYear = (date: Date): number => {
  return date.getFullYear();
};

/**
 * Obtiene el número de días en un mes
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Obtiene el primer día de la semana (domingo) para una fecha
 */
export const getWeekStart = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() - day);
  return result;
};

/**
 * Obtiene el último día de la semana (sábado) para una fecha
 */
export const getWeekEnd = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() + (6 - day));
  return result;
};

/**
 * Verifica si una fecha está en un rango
 */
export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  return date >= start && date <= end;
};

/**
 * Obtiene la diferencia en días entre dos fechas
 */
export const getDaysDifference = (date1: Date, date2: Date): number => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};
