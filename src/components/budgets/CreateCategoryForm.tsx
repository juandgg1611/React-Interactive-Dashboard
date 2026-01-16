import React, { useState } from "react";
import {
  X,
  Plus,
  Sparkles,
  DollarSign,
  Tag,
  Palette,
  Target,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Slider } from "../../components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { CategoryIcons, CategoryIconType, iconNames } from "./CategoryIcons";
import { Badge } from "../../components/ui/badge";

interface CreateCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoryData: {
    name: string;
    icon: CategoryIconType;
    limit: number;
    color: string;
  }) => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<CategoryIconType>("other");
  const [limit, setLimit] = useState(500);
  const [selectedColor, setSelectedColor] = useState("#2E8B57");

  // Colores de tu paleta
  const colorOptions = [
    { value: "#2E8B57", label: "Verde Principal", name: "primary-100" },
    { value: "#61bc84", label: "Verde Claro", name: "primary-200" },
    { value: "#8FBC8F", label: "Verde Aceituna", name: "accent-100" },
    { value: "#c6ffe6", label: "Verde Brillante", name: "primary-300" },
    { value: "#345e37", label: "Verde Oscuro", name: "accent-200" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      icon: selectedIcon,
      limit,
      color: selectedColor,
    });
    // Reset form
    setName("");
    setSelectedIcon("other");
    setLimit(500);
    setSelectedColor("#2E8B57");
    onClose(); // Cerrar después de crear
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // Solo permitir cerrar si el usuario cancela explícitamente
        // O puedes usar: if (!open && confirm('¿Deseas cancelar?')) onClose();
        // Por ahora, solo cerramos cuando el usuario hace clic en "Cancelar"
      }}
    >
      <DialogContent
        className="border-0 bg-gradient-to-br from-bg-200 to-bg-300 border border-bg-300/50 shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto p-0"
        // BLOQUEAR CERRADO AUTOMÁTICO:
        onInteractOutside={(e: Event) => {
          e.preventDefault();
        }}
        onPointerDownOutside={(e: Event) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e: Event) => {
          e.preventDefault();
        }}
      >
        {/* Tu header personalizado - SIN el DialogHeader de shadcn */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-bg-200 to-bg-200/95 backdrop-blur-sm border-b border-bg-300/50 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary-200" />
              <h2 className="text-text-100 text-2xl font-bold">
                Crear Nueva Categoría
              </h2>
            </div>

            {/* SOLAMENTE TU X BLANCA */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 text-text-100 hover:text-primary-200 hover:bg-bg-300/30 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>
        </div>

        {/* Contenido del formulario */}
        <div className="p-6 pt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre de la categoría */}
            <div className="space-y-3">
              <Label
                htmlFor="category-name"
                className="text-text-100 flex items-center gap-2"
              >
                <Tag className="h-4 w-4" />
                Nombre de la Categoría
              </Label>
              <Input
                id="category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Comida, Transporte, Entretenimiento..."
                className="bg-bg-300/30 border-bg-300/50 text-text-100 placeholder:text-text-200/50 focus-visible:ring-primary-200"
                required
              />
            </div>

            {/* Selección de Icono */}
            <div className="space-y-3">
              <Label className="text-text-100 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Seleccionar Icono
              </Label>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
                {iconNames.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setSelectedIcon(iconName)}
                    className={`
                      p-3 rounded-xl border-2 transition-all duration-200
                      flex flex-col items-center justify-center gap-1
                      hover:scale-105 hover:shadow-lg
                      ${
                        selectedIcon === iconName
                          ? "border-primary-200 bg-primary-100/20 shadow-lg shadow-primary-100/20"
                          : "border-bg-300/50 bg-bg-300/20 hover:border-primary-200/50"
                      }
                    `}
                  >
                    <div
                      className={selectedIcon === iconName ? "scale-110" : ""}
                    >
                      {CategoryIcons[iconName]}
                    </div>
                    <span className="text-xs text-text-200 capitalize truncate">
                      {iconName.length > 10
                        ? iconName.substring(0, 8) + "..."
                        : iconName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Límite de presupuesto */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-text-100 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Límite de Presupuesto Mensual
                </Label>
                <Badge className="bg-primary-100/20 text-primary-200 border-primary-100/30">
                  {formatCurrency(limit)}
                </Badge>
              </div>

              <Slider
                value={[limit]}
                onValueChange={([value]) => setLimit(value)}
                min={50}
                max={5000}
                step={50}
                className="my-6"
              />

              <div className="grid grid-cols-5 gap-2">
                {[100, 300, 500, 1000, 2000].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    onClick={() => setLimit(amount)}
                    className={`
                      border-bg-300/50 text-text-200 hover:text-primary-300
                      ${
                        limit === amount
                          ? "border-primary-200 bg-primary-100/10 text-primary-200"
                          : ""
                      }
                    `}
                  >
                    {formatCurrency(amount)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selección de Color */}
            <div className="space-y-3">
              <Label className="text-text-100 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Color de la Categoría
              </Label>
              <div className="grid grid-cols-5 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={`
                      p-4 rounded-xl transition-all duration-200
                      flex flex-col items-center gap-2
                      hover:scale-105 hover:shadow-lg
                      ${
                        selectedColor === color.value
                          ? "ring-2 ring-offset-2 ring-offset-bg-200 ring-primary-200 shadow-lg"
                          : ""
                      }
                    `}
                    style={{ backgroundColor: color.value }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full ${
                        selectedColor === color.value ? "bg-white/20" : ""
                      }`}
                    />
                    <span className="text-xs text-text-100 font-medium">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Vista previa */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-bg-300/30 to-bg-300/10 border border-bg-300/40">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-text-100 font-medium">Vista Previa</h4>
                <Badge className="bg-primary-100/20 text-primary-200 border-primary-100/30">
                  <Target className="h-3 w-3 mr-1" />
                  Vista previa
                </Badge>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-bg-300/20">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: selectedColor + "20" }}
                >
                  {CategoryIcons[selectedIcon]}
                </div>
                <div className="flex-1">
                  <h5 className="text-text-100 font-medium">
                    {name || "Nombre de categoría"}
                  </h5>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-text-200">
                      Límite: {formatCurrency(limit)}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-bg-300/50 text-text-200"
                    >
                      {selectedIcon}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-text-100 font-medium">
                    {formatCurrency(0)}
                  </div>
                  <div className="text-xs text-text-200">Gastado</div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4 border-t border-bg-300/30">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-bg-300/50 text-text-200 hover:text-primary-300 hover:border-primary-200/50"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-100/20 hover:shadow-primary-200/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Categoría
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-primary-200/30 text-primary-200 hover:bg-primary-100/10 hover:text-primary-300 hover:border-primary-300/50"
                onClick={() => {
                  // Sugerencia automática con IA (placeholder)
                  setName("Categoría Sugerida");
                  setSelectedIcon("shopping");
                  setLimit(750);
                }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                IA
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryForm;
