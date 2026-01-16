import React, { useState } from "react";
import {
  X,
  Plus,
  DollarSign,
  Calendar,
  Tag,
  FileText,
  MapPin,
  Camera,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

interface QuickTransactionFormProps {
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

const QuickTransactionForm: React.FC<QuickTransactionFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "food",
    date: new Date().toISOString().split("T")[0],
    tags: [] as string[],
    location: "",
    notes: "",
  });

  const [currentTag, setCurrentTag] = useState("");

  const categories = [
    { value: "food", label: "Alimentación", icon: "🍎" },
    { value: "transport", label: "Transporte", icon: "🚗" },
    { value: "entertainment", label: "Entretenimiento", icon: "🎬" },
    { value: "shopping", label: "Compras", icon: "🛍️" },
    { value: "utilities", label: "Servicios", icon: "💡" },
    { value: "health", label: "Salud", icon: "🏥" },
    { value: "education", label: "Educación", icon: "📚" },
    { value: "salary", label: "Salario", icon: "💰" },
  ];

  const tagSuggestions = [
    "supermercado",
    "restaurante",
    "online",
    "urgente",
    "recurrente",
    "trabajo",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transacción creada:", formData);
    onSubmit?.(formData);
    onClose();
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleIAAssist = () => {
    // Simular sugerencia IA
    setFormData((prev) => ({
      ...prev,
      category: "food",
      tags: ["supermercado", "comida"],
      description: "Compra de alimentos",
    }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="border-0 bg-gradient-to-br from-bg-200 to-bg-300 border border-bg-300/50 shadow-2xl max-w-md max-h-[90vh] overflow-y-auto p-0">
        {/* Header personalizado */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-bg-200 to-bg-200/95 backdrop-blur-sm border-b border-bg-300/50 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary-200" />
              <h2 className="text-text-100 text-2xl font-bold">
                Nueva Transacción
              </h2>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-text-100 hover:text-primary-200 hover:bg-bg-300/30 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Contenido del formulario */}
        <div className="p-6 pt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de transacción */}
            <div className="space-y-3">
              <Label className="text-text-100">Tipo de Transacción</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={formData.type === "expense" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, type: "expense" })}
                  className={`${
                    formData.type === "expense"
                      ? "bg-gradient-to-r from-red-500 to-red-400 text-white"
                      : "border-bg-300/50 text-text-200 hover:text-red-400"
                  }`}
                >
                  Gasto
                </Button>
                <Button
                  type="button"
                  variant={formData.type === "income" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, type: "income" })}
                  className={`${
                    formData.type === "income"
                      ? "bg-gradient-to-r from-green-500 to-green-400 text-white"
                      : "border-bg-300/50 text-text-200 hover:text-green-400"
                  }`}
                >
                  Ingreso
                </Button>
              </div>
            </div>

            {/* Monto */}
            <div className="space-y-3">
              <Label
                htmlFor="amount"
                className="text-text-100 flex items-center gap-2"
              >
                <DollarSign className="h-4 w-4" />
                Monto
              </Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="bg-bg-300/30 border-bg-300/50 text-text-100 pl-8"
                  placeholder="0.00"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-200">
                  $
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="text-text-100 flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Descripción
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-bg-300/30 border-bg-300/50 text-text-100"
                placeholder="¿En qué gastaste?"
                required
              />
            </div>

            {/* Categoría */}
            <div className="space-y-3">
              <Label className="text-text-100 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Categoría
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="bg-bg-300/30 border-bg-300/50 text-text-100">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="bg-bg-200/90 backdrop-blur-md border-bg-300">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fecha */}
            <div className="space-y-3">
              <Label
                htmlFor="date"
                className="text-text-100 flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Fecha
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="bg-bg-300/30 border-bg-300/50 text-text-100"
                required
              />
            </div>

            {/* Etiquetas */}
            <div className="space-y-3">
              <Label className="text-text-100">Etiquetas</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-primary-100/20 text-primary-200 border-primary-100/30"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-xs hover:text-red-400"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Añadir etiqueta..."
                  className="bg-bg-300/30 border-bg-300/50 text-text-100 flex-1"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-primary-100/20 text-primary-200 border-primary-100/30 hover:bg-primary-100/30"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {tagSuggestions.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (!formData.tags.includes(tag)) {
                        setFormData((prev) => ({
                          ...prev,
                          tags: [...prev.tags, tag],
                        }));
                      }
                    }}
                    className="text-xs border-bg-300/50 text-text-200 hover:text-primary-300 h-6 px-2"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4 border-t border-bg-300/30">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-bg-300/50 text-text-200 hover:text-primary-300"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-primary-200/30 text-primary-200 hover:bg-primary-100/10"
                onClick={handleIAAssist}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                IA
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 text-white shadow-lg shadow-primary-100/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Transacción
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickTransactionForm;
