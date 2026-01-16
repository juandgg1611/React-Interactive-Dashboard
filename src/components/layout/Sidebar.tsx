// src/components/layout/Sidebar.tsx
import React, { useState } from "react";
import {
  Home,
  FileText,
  PieChart,
  Target,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
  Wallet,
  TrendingUp,
  Brain,
  Zap,
  User,
  CreditCard,
  Calendar,
  DollarSign,
  Calculator,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// Necesitamos importar PlusCircle
import { PlusCircle } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  isActive?: boolean;
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  const userData = {
    name: "Juan Oberto",
    email: "juan.oberto@investigacion.edu",
    avatar: "JO",
    role: "Investigador Premium",
    plan: "Pro",
  };

  // Items de navegación principales
  const mainNavItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      id: "transactions",
      label: "Transacciones",
      icon: <FileText className="h-5 w-5" />,
      path: "/transactions",
      badge: 3,
    },
    {
      id: "budgets",
      label: "Presupuestos",
      icon: <PieChart className="h-5 w-5" />,
      path: "/budgets",
      badge: 1,
    },
    {
      id: "goals",
      label: "Mis Metas",
      icon: <Target className="h-5 w-5" />,
      path: "/savings-goals",
    },
    {
      id: "analytics",
      label: "Analítica",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/analytics",
    },
    {
      id: "calculator",
      label: "Calculadora",
      icon: <Calculator className="h-5 w-5" />,
      path: "/calculator",
    },
    {
      id: "calendar",
      label: "Calendario",
      icon: <Calendar className="h-5 w-5" />,
      path: "/calendar",
    },
    {
      id: "settings",
      label: "Configuración",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  const handleNavigation = (item: NavItem) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col border-r border-bg-300/30 bg-gradient-to-b from-bg-200/80 to-bg-300/40 backdrop-blur-xl z-50 transition-all duration-300",
        isCollapsed ? "w-24" : "w-72" // Cambiado de w-20 a w-24 colapsado, de w-64 a w-72 expandido
      )}
    >
      {/* Logo y toggle */}
      <div className="flex items-center justify-between p-6 border-b border-bg-300/30">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-lg shadow-primary-100/20">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-300 rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-100">
                Finanzas<span className="text-primary-200">IA</span>
              </h1>
              <p className="text-xs text-text-200/70">
                {userData.plan} Edition
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-lg shadow-primary-100/20">
              <Brain className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Perfil de usuario */}
      {!isCollapsed && (
        <div className="p-6 border-b border-bg-300/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary-200/30">
              <AvatarFallback className="bg-primary-100/20 text-primary-200 text-lg font-bold">
                {userData.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-100 truncate">
                {userData.name}
              </h3>
              <p className="text-xs text-text-200/70 truncate">
                {userData.role}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-primary-300 rounded-full animate-pulse" />
                <span className="text-xs text-primary-300">Conectado</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navegación principal */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="space-y-1 px-4">
          <h3
            className={cn(
              "text-xs font-semibold text-text-200/50 uppercase tracking-wider mb-3 px-3",
              isCollapsed && "text-center px-0"
            )}
          >
            {isCollapsed ? "..." : "Navegación"}
          </h3>

          {mainNavItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start h-12 px-3 rounded-xl mb-1 transition-all duration-200 group",
                isActive(item.path)
                  ? "bg-gradient-to-r from-primary-100/20 to-primary-200/10 border-l-4 border-primary-200 text-primary-200"
                  : "text-text-200 hover:text-primary-300 hover:bg-bg-300/30"
              )}
              onClick={() => handleNavigation(item)}
            >
              <div className="relative">
                <div
                  className={cn(
                    "transition-transform duration-200",
                    isActive(item.path) && "scale-110"
                  )}
                >
                  {item.icon}
                </div>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-[10px] text-white rounded-full flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>

              {!isCollapsed && (
                <>
                  <span className="ml-3 font-medium">{item.label}</span>
                  {isActive(item.path) && (
                    <div className="ml-auto w-2 h-2 bg-primary-300 rounded-full animate-pulse" />
                  )}
                </>
              )}
            </Button>
          ))}
        </div>

        {/* Acción rápida - Registrar transacción */}
        {!isCollapsed && (
          <div className="mt-8 px-4">
            <Button
              className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-100/25 hover:shadow-primary-200/35 transition-all duration-300"
              onClick={() => navigate("/transactions/new")}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Nueva Transacción
            </Button>
          </div>
        )}
      </div>

      {/* Footer de sidebar */}
      <div className="border-t border-bg-300/30 p-4">
        {!isCollapsed ? (
          <div className="space-y-3">
            {/* Notificaciones */}
            <Button
              variant="ghost"
              className="w-full justify-start text-text-200 hover:text-primary-300 hover:bg-bg-300/30"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5" />
              <span className="ml-3">Notificaciones</span>
              <span className="ml-auto h-4 w-4 bg-primary-200 text-[10px] text-white rounded-full flex items-center justify-center">
                5
              </span>
            </Button>

            {/* Ayuda */}
            <Button
              variant="ghost"
              className="w-full justify-start text-text-200 hover:text-primary-300 hover:bg-bg-300/30"
              onClick={() => navigate("/help")}
            >
              <HelpCircle className="h-5 w-5" />
              <span className="ml-3">Ayuda & Soporte</span>
            </Button>

            {/* Cerrar sesión */}
            <Button
              variant="ghost"
              className="w-full justify-start text-text-200 hover:text-red-400 hover:bg-red-500/10 mt-4"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Cerrar Sesión</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-text-200 hover:text-primary-300 hover:bg-bg-300/30"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-primary-200 rounded-full text-[8px] flex items-center justify-center">
                5
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-text-200 hover:text-primary-300 hover:bg-bg-300/30"
              onClick={() => navigate("/help")}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-text-200 hover:text-red-400 hover:bg-red-500/10"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Versión y estado */}
        {!isCollapsed && (
          <div className="mt-4 pt-4 border-t border-bg-300/30 text-center">
            <p className="text-xs text-text-200/50">v1.0.0 • Sistema AI</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs text-green-500">
                Todos los sistemas operativos
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

// Necesitamos crear un componente Badge
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
      className
    )}
  >
    {children}
  </span>
);

export default Sidebar;
