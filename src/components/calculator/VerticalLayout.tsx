// src/components/calculator/VerticalLayout.tsx
import React from "react";
import { cn } from "../../lib/utils";

interface VerticalLayoutProps {
  display: React.ReactNode;
  controls: React.ReactNode;
  className?: string;
}

const VerticalLayout: React.FC<VerticalLayoutProps> = ({
  display,
  controls,
  className,
}) => {
  return (
    <div className={cn("space-y-6 max-w-6xl mx-auto", className)}>
      {/* Display - Más grande */}
      <div className="animate-fade-in">{display}</div>

      {/* Controles - Ocupa todo el ancho */}
      <div className="bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md rounded-2xl border border-bg-300/40 shadow-xl p-4 md:p-6">
        {controls}
      </div>
    </div>
  );
};

export default VerticalLayout;
