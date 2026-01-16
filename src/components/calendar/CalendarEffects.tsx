// src/components/calendar/CalendarEffects.tsx
import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { Sparkles, Target, Zap, Clock, TrendingUp } from "lucide-react";

interface CalendarEffectsProps {
  selectedDate: Date | null;
  isTransitioning: boolean;
  transitionDirection?: "left" | "right";
  hasEvents: boolean;
  eventCount: number;
}

const CalendarEffects: React.FC<CalendarEffectsProps> = ({
  selectedDate,
  isTransitioning,
  transitionDirection = "right",
  hasEvents,
  eventCount,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Efecto de partículas flotantes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Clase Particle
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${
          Math.random() > 0.5 ? "46, 139, 87" : "97, 188, 132"
        }, ${Math.random() * 0.2 + 0.05})`;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebotar en bordes
        if (this.x > this.canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > this.canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }

        // Mantener en canvas
        this.x = Math.max(0, Math.min(this.x, this.canvas.width));
        this.y = Math.max(0, Math.min(this.y, this.canvas.height));
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    // Inicializar partículas
    const particles = Array.from({ length: 30 }, () => new Particle(canvas));

    // Animación
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      // Conectar partículas cercanas
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach((particle2) => {
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(97, 188, 132, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Efecto de transición entre meses
  const transitionClasses = cn(
    "absolute inset-0 pointer-events-none z-10",
    isTransitioning && "animate-in fade-in-0 duration-300",
    transitionDirection === "left"
      ? "slide-in-from-right-full"
      : "slide-in-from-left-full"
  );

  return (
    <>
      {/* Canvas de partículas flotantes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 0 }}
      />

      {/* Efecto de transición */}
      {isTransitioning && (
        <div className={transitionClasses}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/10 via-transparent to-primary-300/10" />
        </div>
      )}

      {/* Efecto de selección de fecha */}
      {selectedDate && (
        <div className="absolute inset-0 pointer-events-none z-5">
          {/* Rayos de luz desde la fecha seleccionada */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-px h-16 bg-gradient-to-b from-primary-300/30 to-transparent"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-32px)`,
                  animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Efectos decorativos en esquinas */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none">
        <div className="absolute top-8 left-8 w-32 h-32 bg-gradient-to-br from-primary-100/5 to-transparent rounded-full blur-xl" />
        <div className="absolute top-4 left-4 w-8 h-8 bg-primary-200/10 rounded-full animate-pulse" />
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none">
        <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-tl from-primary-300/5 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-primary-100/10 rounded-full animate-pulse" />
      </div>

      {/* Efecto de eventos próximos */}
      {hasEvents && eventCount > 0 && (
        <div className="absolute top-4 right-4 pointer-events-none z-20">
          <div className="relative">
            {/* Pulso de notificación */}
            <div className="absolute -inset-2 bg-primary-300/20 rounded-full animate-ping" />

            {/* Icono con contador */}
            <div className="relative bg-gradient-to-br from-primary-100/30 to-primary-200/20 backdrop-blur-sm border border-primary-200/30 rounded-xl p-2 shadow-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary-200 animate-pulse" />
                <span className="text-xs font-medium text-text-100">
                  {eventCount} evento{eventCount !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Indicador de tendencia */}
              <div className="absolute -bottom-1 -right-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-30" />
                  <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-200 flex items-center justify-center">
                    <TrendingUp className="h-2.5 w-2.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Efecto de tiempo real */}
      <div className="absolute bottom-4 left-4 pointer-events-none z-20">
        <div className="flex items-center gap-2 bg-bg-200/40 backdrop-blur-sm border border-bg-300/50 rounded-xl px-3 py-2 shadow-lg">
          <Clock className="h-3.5 w-3.5 text-primary-200 animate-pulse" />
          <span className="text-xs text-text-200">
            Actualizando en tiempo real
          </span>
        </div>
      </div>

      {/* Líneas de guía sutiles */}
      <div className="absolute inset-0 pointer-events-none z-1">
        {/* Líneas verticales */}
        <div className="absolute top-0 bottom-0 left-1/7 w-px bg-gradient-to-b from-transparent via-bg-300/20 to-transparent" />
        <div className="absolute top-0 bottom-0 left-2/7 w-px bg-gradient-to-b from-transparent via-bg-300/20 to-transparent" />
        <div className="absolute top-0 bottom-0 left-3/7 w-px bg-gradient-to-b from-transparent via-bg-300/20 to-transparent" />
        <div className="absolute top-0 bottom-0 left-4/7 w-px bg-gradient-to-b from-transparent via-bg-300/20 to-transparent" />
        <div className="absolute top-0 bottom-0 left-5/7 w-px bg-gradient-to-b from-transparent via-bg-300/20 to-transparent" />
        <div className="absolute top-0 bottom-0 left-6/7 w-px bg-gradient-to-b from-transparent via-bg-300/20 to-transparent" />

        {/* Líneas horizontales */}
        <div className="absolute left-0 right-0 top-1/6 h-px bg-gradient-to-r from-transparent via-bg-300/20 to-transparent" />
        <div className="absolute left-0 right-0 top-2/6 h-px bg-gradient-to-r from-transparent via-bg-300/20 to-transparent" />
        <div className="absolute left-0 right-0 top-3/6 h-px bg-gradient-to-r from-transparent via-bg-300/20 to-transparent" />
        <div className="absolute left-0 right-0 top-4/6 h-px bg-gradient-to-r from-transparent via-bg-300/20 to-transparent" />
        <div className="absolute left-0 right-0 top-5/6 h-px bg-gradient-to-r from-transparent via-bg-300/20 to-transparent" />
      </div>

      {/* Efecto de brillo en bordes */}
      <div className="absolute -inset-1 bg-gradient-to-br from-primary-100/5 via-transparent to-primary-300/5 rounded-2xl blur-xl pointer-events-none" />

      {/* Efecto de resplandor en hover de días */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-100/2 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      </div>
    </>
  );
};

export default CalendarEffects;
