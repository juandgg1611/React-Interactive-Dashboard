// src/components/landing/MobileNavMenu.tsx
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Menu,
  X,
  Github,
  HelpCircle,
  ArrowRight,
  GraduationCap,
  Brain,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface MobileNavMenuProps {
  onNavigateToFeatures: () => void;
  onNavigateToHelp: () => void;
  onNavigateToGithub: () => void;
  onNavigateToLogin: () => void;
  onNavigateToUniversity: () => void;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  onNavigateToFeatures,
  onNavigateToHelp,
  onNavigateToGithub,
  onNavigateToLogin,
  onNavigateToUniversity,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-4 z-50 p-2 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 text-white shadow-lg shadow-primary-100/25 hover:shadow-primary-200/35 transition-all duration-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Menú desplegable */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-all duration-300",
          isOpen
            ? "bg-black/50 backdrop-blur-sm"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
      >
        {/* Panel del menú */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-72 bg-gradient-to-b from-neutral-900 to-neutral-800 shadow-2xl transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 pt-20">
            {/* Logo en el menú móvil */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-300 rounded-xl flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-100">FinanzasIA</h2>
                <p className="text-xs text-text-200/70">Proyecto de Tesis</p>
              </div>
            </div>

            {/* Items del menú */}
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-text-200 hover:text-primary-300 hover:bg-bg-300/30"
                onClick={() => {
                  onNavigateToFeatures();
                  setIsOpen(false);
                }}
              >
                <span>Características</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-text-200 hover:text-primary-300 hover:bg-bg-300/30"
                onClick={() => {
                  onNavigateToHelp();
                  setIsOpen(false);
                }}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                <span>Ayuda & Soporte</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-text-200 hover:text-primary-300 hover:bg-bg-300/30"
                onClick={() => {
                  onNavigateToGithub();
                  setIsOpen(false);
                }}
              >
                <Github className="h-4 w-4 mr-2" />
                <span>GitHub</span>
              </Button>

              <div className="pt-4 border-t border-bg-300/30">
                <Button
                  className="w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 mb-3"
                  onClick={() => {
                    onNavigateToLogin();
                    setIsOpen(false);
                  }}
                >
                  <span className="flex items-center">
                    Comenzar Ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-primary-300/50 text-primary-300 hover:bg-primary-300/10"
                  onClick={() => {
                    onNavigateToUniversity();
                    setIsOpen(false);
                  }}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span>Portal Universitario</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavMenu;
