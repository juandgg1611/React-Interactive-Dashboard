import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Search,
  ChevronRight,
  Clock,
  TrendingUp,
  HelpCircle,
  BookOpen,
  Zap,
  Filter,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface HelpSearchProps {
  onSearch: (query: string) => void;
  compact?: boolean;
  placeholder?: string;
  className?: string;
  suggestions?: string[]; 
  onSuggestionClick?: (query: string) => void; 
}

const HelpSearch: React.FC<HelpSearchProps> = ({
  onSearch,
  compact = false,
  placeholder = "Buscar ayuda, tutoriales, preguntas frecuentes...",
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Búsquedas populares predefinidas
  const popularSearches = [
    "Cómo crear una meta de ahorro",
    "Importar transacciones desde banco",
    "Configurar presupuesto mensual",
    "Entender analíticas con IA",
    "Categorizar gastos automáticamente",
    "Exportar datos en Excel o PDF",
    "Configurar alertas de gasto",
    "Usar el simulador financiero",
    "Conectar múltiples cuentas",
    "Generar reportes automáticos",
  ];

  // Categorías de búsqueda
  const searchCategories = [
    { id: "tutorials", name: "Tutoriales", icon: BookOpen, color: "#61bc84" },
    {
      id: "faq",
      name: "Preguntas Frecuentes",
      icon: HelpCircle,
      color: "#8FBC8F",
    },
    {
      id: "guides",
      name: "Guías Paso a Paso",
      icon: TrendingUp,
      color: "#2E8B57",
    },
    { id: "videos", name: "Video Tutoriales", icon: Clock, color: "#345e37" },
  ];

  // Efecto para cargar búsquedas recientes del localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("helpRecentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Efecto para sugerencias en tiempo real
  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = popularSearches.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setSearchQuery(trimmedQuery);

    // Guardar en búsquedas recientes
    const updatedSearches = [
      trimmedQuery,
      ...recentSearches.filter((s) => s !== trimmedQuery),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("helpRecentSearches", JSON.stringify(updatedSearches));

    // Ejecutar búsqueda
    onSearch(trimmedQuery);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleCategorySearch = (categoryName: string) => {
    setSearchQuery(categoryName);
    handleSearch(categoryName);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("helpRecentSearches");
  };

  // Versión compacta
  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/5 to-primary-200/5 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-200/60 group-hover:text-primary-200 transition-colors z-10" />
            <Input
              type="text"
              placeholder={placeholder}
              className="pl-9 pr-10 bg-bg-200/60 backdrop-blur-md border-bg-300/60 text-text-100 placeholder:text-text-200/50 rounded-xl text-sm shadow-lg hover:border-primary-200/30 focus:border-primary-200 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
            />

            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-text-200 hover:text-primary-200"
                onClick={handleClearSearch}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-bg-200/95 backdrop-blur-md border border-bg-300/60 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-3 hover:bg-bg-300/30 transition-colors duration-200 flex items-center justify-between group"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 text-text-200/50 group-hover:text-primary-200 transition-colors" />
                  <span className="text-sm text-text-100 group-hover:text-primary-200 transition-colors">
                    {suggestion}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-text-200/30 group-hover:text-primary-200 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Versión completa
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Barra de búsqueda principal */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/5 to-primary-200/5 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-200/60 group-hover:text-primary-200 transition-colors duration-300 z-10" />
          <Input
            type="text"
            placeholder={placeholder}
            className="pl-12 pr-12 py-6 bg-bg-200/60 backdrop-blur-md border-bg-300/60 text-text-100 placeholder:text-text-200/50 rounded-2xl text-base shadow-xl hover:border-primary-200/30 focus:border-primary-200 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
          />

          {/* Botón de búsqueda */}
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-200 hover:text-primary-200 bg-primary-100/10 hover:bg-primary-100/20"
              onClick={() => handleSearch(searchQuery)}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Sugerencias de búsqueda */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-bg-200/95 backdrop-blur-md border border-bg-300/60 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2 border-b border-bg-300/40">
              <div className="text-xs text-text-200/70 px-3 py-1">
                Sugerencias populares
              </div>
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-3 hover:bg-bg-300/30 transition-colors duration-200 flex items-center justify-between group"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 text-text-200/50 group-hover:text-primary-200 transition-colors" />
                  <span className="text-text-100 group-hover:text-primary-200 transition-colors">
                    {suggestion}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-text-200/30 group-hover:text-primary-200 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Búsquedas recientes */}
      {recentSearches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-text-200">
              <Clock className="h-4 w-4" />
              <span>Búsquedas recientes</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-text-200/60 hover:text-primary-200"
              onClick={handleClearRecent}
            >
              Limpiar
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-bg-300/20 text-text-200 border-bg-300/40 hover:bg-primary-100/10 hover:text-primary-200 hover:border-primary-200/50 cursor-pointer transition-all group"
                onClick={() => handleSuggestionClick(search)}
              >
                <Search className="h-3 w-3 mr-1.5 text-text-200/50 group-hover:text-primary-200" />
                {search}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Búsquedas populares */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-text-200">
          <TrendingUp className="h-4 w-4" />
          <span>Búsquedas populares</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {popularSearches.slice(0, 6).map((search, index) => (
            <button
              key={index}
              className="p-3 rounded-lg bg-gradient-to-br from-bg-300/10 to-bg-300/5 border border-bg-300/30 hover:border-primary-200/30 transition-all duration-300 cursor-pointer group text-left"
              onClick={() => handleSuggestionClick(search)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-3.5 w-3.5 text-primary-200/60 group-hover:text-primary-200 transition-colors" />
                  <span className="text-sm text-text-100 group-hover:text-primary-200 transition-colors">
                    {search}
                  </span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-text-200/30 group-hover:text-primary-200 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas de búsqueda */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100/10 to-primary-200/5 border border-primary-200/20 text-center">
          <div className="text-2xl font-bold text-primary-200">1,245</div>
          <div className="text-xs text-text-200/70 mt-1">Artículos</div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-accent-100/10 to-accent-100/5 border border-accent-100/20 text-center">
          <div className="text-2xl font-bold text-accent-100">94%</div>
          <div className="text-xs text-text-200/70 mt-1">Resuelven dudas</div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary-300/10 to-primary-300/5 border border-primary-300/20 text-center">
          <div className="text-2xl font-bold text-primary-300">24/7</div>
          <div className="text-xs text-text-200/70 mt-1">Soporte IA</div>
        </div>
      </div>
    </div>
  );
};

export default HelpSearch;
