import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  ChevronRight,
  Clock,
  CheckCircle,
  PlayCircle,
  BookOpen,
  Video,
  Zap,
  Star,
  Target,
  Lock,
  Award,
  Sparkles,
} from "lucide-react";

interface TutorialCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  completed: boolean;
  progress?: number;
  type?: "video" | "article" | "interactive";
  module?: string;
  estimatedTime?: string;
  rewards?: {
    points: number;
    badge?: string;
  };
  onStart?: () => void;
  onReview?: () => void;
  locked?: boolean;
  featured?: boolean;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  duration,
  difficulty,
  completed,
  progress = 0,
  type = "article",
  module = "General",
  estimatedTime,
  rewards = { points: 10 },
  onStart,
  onReview,
  locked = false,
  featured = false,
}) => {
  // Configurar icono según tipo
  const getTypeIcon = () => {
    switch (type) {
      case "video":
        return {
          icon: Video,
          color: "text-red-400",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/20",
        };
      case "interactive":
        return {
          icon: PlayCircle,
          color: "text-purple-400",
          bgColor: "bg-purple-500/10",
          borderColor: "border-purple-500/20",
        };
      default:
        return {
          icon: BookOpen,
          color: "text-blue-400",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/20",
        };
    }
  };

  // Configurar color de dificultad
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Fácil":
        return {
          text: "text-green-400",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
          dot: "bg-green-400",
        };
      case "Intermedio":
        return {
          text: "text-yellow-400",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          dot: "bg-yellow-400",
        };
      case "Avanzado":
        return {
          text: "text-red-400",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
          dot: "bg-red-400",
        };
      default:
        return {
          text: "text-green-400",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
          dot: "bg-green-400",
        };
    }
  };

  const {
    icon: TypeIcon,
    color: typeColor,
    bgColor: typeBgColor,
    borderColor: typeBorderColor,
  } = getTypeIcon();
  const difficultyColors = getDifficultyColor();

  const handleClick = () => {
    if (locked) return;

    if (completed && onReview) {
      onReview();
    } else if (!completed && onStart) {
      onStart();
    }
  };

  return (
    <Card
      className={`border-0 backdrop-blur-md border transition-all duration-500 overflow-hidden group cursor-pointer ${
        locked
          ? "bg-gradient-to-br from-bg-300/20 to-bg-300/10 border-bg-300/40 opacity-70"
          : featured
          ? "bg-gradient-to-br from-primary-100/10 via-primary-200/5 to-primary-300/3 border-primary-200/30 hover:border-primary-200/50 hover:shadow-2xl shadow-xl"
          : "bg-gradient-to-br from-bg-200/50 to-bg-300/30 border-bg-300/40 hover:border-primary-200/30 hover:shadow-xl shadow-lg"
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Icono y tipo */}
          <div className="flex-shrink-0">
            <div
              className={`p-3 rounded-xl border ${typeBorderColor} ${typeBgColor} group-hover:scale-110 transition-transform duration-300`}
            >
              <TypeIcon className={`h-6 w-6 ${typeColor}`} />
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`font-bold truncate ${
                      locked
                        ? "text-text-200"
                        : "text-text-100 group-hover:text-primary-200"
                    } transition-colors`}
                  >
                    {title}
                  </h3>

                  {featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-400 border-yellow-500/20">
                      <Sparkles className="h-2.5 w-2.5 mr-1" />
                      Destacado
                    </Badge>
                  )}

                  {locked && <Lock className="h-4 w-4 text-text-200/60" />}
                </div>

                <p className="text-sm text-text-200/80 line-clamp-2">
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Dificultad */}
                <Badge
                  variant="outline"
                  className={`${difficultyColors.border} ${difficultyColors.text} text-xs`}
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${difficultyColors.dot} mr-1.5`}
                  ></div>
                  {difficulty}
                </Badge>

                {/* Duración */}
                <Badge className="bg-gradient-to-r from-bg-300/20 to-bg-300/10 text-text-200 border-bg-300/40">
                  <Clock className="h-3 w-3 mr-1" />
                  {duration}
                </Badge>
              </div>
            </div>

            {/* Información adicional */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Módulo */}
              <div className="flex items-center gap-1 text-xs text-text-200/70">
                <Target className="h-3 w-3" />
                <span>{module}</span>
              </div>

              {/* Tiempo estimado */}
              {estimatedTime && (
                <div className="flex items-center gap-1 text-xs text-text-200/70">
                  <Zap className="h-3 w-3" />
                  <span>{estimatedTime}</span>
                </div>
              )}

              {/* Recompensas */}
              <div className="flex items-center gap-1 text-xs text-text-200/70">
                <Award className="h-3 w-3" />
                <span>{rewards.points} puntos</span>
                {rewards.badge && (
                  <Badge className="ml-1 bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs px-1.5 py-0.5">
                    <Star className="h-2 w-2 mr-0.5" />
                    {rewards.badge}
                  </Badge>
                )}
              </div>
            </div>

            {/* Barra de progreso y acciones */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Estado */}
                {locked ? (
                  <div className="flex items-center gap-2 text-sm text-text-200/70">
                    <Lock className="h-4 w-4" />
                    <span>Completa tutoriales anteriores</span>
                  </div>
                ) : completed ? (
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>Completado</span>
                  </div>
                ) : progress > 0 ? (
                  <div className="flex items-center gap-3 flex-1 max-w-xs">
                    <div className="text-xs text-text-200/70">
                      {Math.round(progress)}%
                    </div>
                    <div className="flex-1 h-1.5 bg-bg-300/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-100 to-primary-200 rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-text-200/70">
                    Nuevo tutorial disponible
                  </div>
                )}
              </div>

              {/* Botón de acción */}
              <div className="flex-shrink-0">
                {locked ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled
                    className="text-text-200/50 cursor-not-allowed"
                  >
                    <Lock className="h-3.5 w-3.5" />
                  </Button>
                ) : completed ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className={`border-green-500/30 text-green-400 hover:bg-green-500/10 group/btn ${
                      featured ? "hover:border-green-400/50" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onReview?.();
                    }}
                  >
                    Repasar
                    <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className={`group/btn ${
                      featured
                        ? "bg-gradient-to-r from-primary-100 to-primary-200 text-white hover:from-primary-200 hover:to-primary-300"
                        : "bg-gradient-to-r from-primary-100/10 to-primary-200/5 text-primary-200 hover:bg-primary-100/20 border border-primary-200/30"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStart?.();
                    }}
                  >
                    {type === "video"
                      ? "Ver video"
                      : type === "interactive"
                      ? "Comenzar"
                      : "Leer guía"}
                    <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores de progreso completado */}
        {completed && !locked && (
          <div className="mt-4 pt-4 border-t border-bg-300/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-text-200/70">
                <CheckCircle className="h-3 w-3 text-green-400" />
                <span>
                  Completado el {new Date().toLocaleDateString("es-ES")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 border-green-500/20 text-xs">
                  +{rewards.points} pts
                </Badge>

                {progress === 100 && (
                  <Badge className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
                    <Star className="h-2 w-2 mr-1" />
                    Perfecto
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Efecto de destello para destacados */}
        {featured && !locked && (
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-200/10 to-primary-300/5 rounded-full -translate-y-12 translate-x-12 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
        )}
      </CardContent>
    </Card>
  );
};

export default TutorialCard;
