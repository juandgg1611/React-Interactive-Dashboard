// src/components/calendar/CalendarControls.tsx
import React from "react";
import {
  Plus,
  Filter,
  Download,
  Settings,
  Grid,
  List,
  Calendar,
  Users,
  Bell,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CalendarControlsProps {
  selectedDate: Date | null;
  onAddEvent: () => void;
  viewMode: "month" | "week" | "day";
  onViewModeChange: (mode: "month" | "week" | "day") => void;
}

const CalendarControls: React.FC<CalendarControlsProps> = ({
  onAddEvent,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          {/* Botón principal - IGUAL que dashboard */}
          <Button
            onClick={onAddEvent}
            className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-200/30 hover:shadow-primary-200/40 transition-all duration-300 group"
          >
            <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
            Nuevo Evento
          </Button>

          {/* Botón de filtros - ESTILO DASHBOARD */}
          <Button
            variant="outline"
            className="border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50 group"
          >
            <Filter className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Filtros
            <ChevronDown className="h-3 w-3 ml-2 group-hover:rotate-180 transition-transform" />
          </Button>
        </div>

        {/* Selector de vista rápida */}
        <div className="flex items-center gap-2 bg-bg-200/40 backdrop-blur-md rounded-xl p-1 border border-bg-300/50">
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
            <Calendar className="h-3 w-3 mr-1.5" />
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
            <List className="h-3 w-3 mr-1.5" />
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
            <Grid className="h-3 w-3 mr-1.5" />
            Mes
          </Button>
        </div>
      </div>

      {/* Controles avanzados */}
      <div className="flex items-center gap-3">
        {/* Selector de densidad - MEJORADO */}
        <div className="flex items-center gap-2">
          <Select defaultValue="normal">
            <SelectTrigger className="w-[140px] h-9 border-bg-300/50 bg-bg-200/40 text-text-200 hover:border-primary-200/50 hover:text-primary-300 transition-colors">
              <SelectValue placeholder="Densidad" />
            </SelectTrigger>
            <SelectContent className="bg-bg-200/80 backdrop-blur-md border-bg-300">
              <SelectItem
                value="compact"
                className="text-text-200 hover:text-primary-300 focus:text-primary-300"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-text-200/60 rounded-full"></div>
                  Compacta
                </div>
              </SelectItem>
              <SelectItem
                value="normal"
                className="text-text-200 hover:text-primary-300 focus:text-primary-300"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary-200 rounded-full"></div>
                  Normal
                </div>
              </SelectItem>
              <SelectItem
                value="spacious"
                className="text-text-200 hover:text-primary-300 focus:text-primary-300"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-text-200/40 rounded-full"></div>
                  Espaciosa
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50 group"
            title="Exportar calendario"
          >
            <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50 group"
            title="Mostrar/Ocultar pasados"
          >
            <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50 group"
            title="Recordatorios"
          >
            <Bell className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50 group"
            title="Configuración"
          >
            <Settings className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarControls;
