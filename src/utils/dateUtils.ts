// src/utils/dateUtils.ts
export const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Si dateUtils no existe, crearlo con las funciones básicas:
export const getMonthDaysGrid = (date: Date): Date[][] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Primer día del mes
  const firstDay = new Date(year, month, 1);
  // Último día del mes
  const lastDay = new Date(year, month + 1, 0);

  // Primer día de la primera semana del grid
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

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isCurrentMonth = (date: Date, currentMonth: Date): boolean => {
  return (
    date.getMonth() === currentMonth.getMonth() &&
    date.getFullYear() === currentMonth.getFullYear()
  );
};

export const formatDateSpanish = (date: Date): string => {
  const weekdays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
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

  return `${weekdays[date.getDay()]}, ${date.getDate()} de ${
    months[date.getMonth()]
  } de ${date.getFullYear()}`;
};
