// src/components/layout/Layout.tsx 
import React from "react";
import Sidebar from "./Sidebar";
import { cn } from "../../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
      <Sidebar />

      {/* Contenido principal con padding para la sidebar */}
      <main className="pl-64 transition-all duration-300 min-h-screen">
        {/* Fondo animado */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-primary-300/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-accent-100/5 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />

          {/* Partículas animadas */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-primary-300/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Contenido */}
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
