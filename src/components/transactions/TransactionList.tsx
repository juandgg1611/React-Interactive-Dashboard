import React, { useState } from "react";
import {
  Plus,
  Filter,
  Search,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Calendar,
  Tag,
  DollarSign,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  description: string;
  category: string;
  categoryColor: string;
  date: string;
  time: string;
  tags: string[];
}

const TransactionList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Datos de ejemplo - transacciones
  const sampleTransactions: Transaction[] = [
    {
      id: "1",
      type: "expense",
      amount: 125.5,
      description: "Supermercado La Canasta",
      category: "Alimentación",
      categoryColor: "#2E8B57",
      date: "Hoy",
      time: "14:30",
      tags: ["supermercado", "comida"],
    },
    {
      id: "2",
      type: "income",
      amount: 2500,
      description: "Pago nómina",
      category: "Salario",
      categoryColor: "#61bc84",
      date: "Hoy",
      time: "09:00",
      tags: ["trabajo", "nómina"],
    },
    {
      id: "3",
      type: "expense",
      amount: 45.99,
      description: "Netflix Monthly",
      category: "Entretenimiento",
      categoryColor: "#8FBC8F",
      date: "Ayer",
      time: "20:15",
      tags: ["streaming", "suscripción"],
    },
    {
      id: "4",
      type: "expense",
      amount: 32.75,
      description: "Uber Centro Comercial",
      category: "Transporte",
      categoryColor: "#c6ffe6",
      date: "Ayer",
      time: "16:45",
      tags: ["taxi", "transporte"],
    },
    {
      id: "5",
      type: "transfer",
      amount: 500,
      description: "Transferencia a ahorros",
      category: "Ahorro",
      categoryColor: "#345e37",
      date: "15 Ene",
      time: "11:20",
      tags: ["ahorro", "inversión"],
    },
    {
      id: "6",
      type: "expense",
      amount: 89.99,
      description: "Compra en Amazon",
      category: "Compras",
      categoryColor: "#2E8B57",
      date: "14 Ene",
      time: "19:30",
      tags: ["online", "compras"],
    },
    {
      id: "7",
      type: "income",
      amount: 120,
      description: "Pago freelance",
      category: "Ingreso Extra",
      categoryColor: "#61bc84",
      date: "13 Ene",
      time: "15:00",
      tags: ["freelance", "extra"],
    },
    {
      id: "8",
      type: "expense",
      amount: 65.5,
      description: "Restaurante Italiano",
      category: "Alimentación",
      categoryColor: "#2E8B57",
      date: "12 Ene",
      time: "21:00",
      tags: ["restaurante", "cena"],
    },
  ];

  const categories = [
    { id: "all", name: "Todas", count: sampleTransactions.length },
    { id: "food", name: "Alimentación", count: 3 },
    { id: "transport", name: "Transporte", count: 1 },
    { id: "entertainment", name: "Entretenimiento", count: 1 },
    { id: "shopping", name: "Compras", count: 1 },
    { id: "income", name: "Ingresos", count: 2 },
  ];

  const filteredTransactions = sampleTransactions
    .filter((transaction) => {
      if (selectedCategory === "all") return true;
      if (selectedCategory === "income") return transaction.type === "income";
      return transaction.category.toLowerCase().includes(selectedCategory);
    })
    .filter((transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const displayedTransactions = showAllTransactions
    ? filteredTransactions
    : filteredTransactions.slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="h-4 w-4" />;
      case "expense":
        return <TrendingDown className="h-4 w-4" />;
      case "transfer":
        return <RefreshCw className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "text-green-400";
      case "expense":
        return "text-red-400";
      case "transfer":
        return "text-blue-400";
      default:
        return "text-text-200";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "income":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "expense":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "transfer":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-bg-300/30 text-text-200 border-bg-300/50";
    }
  };

  const handleViewAllTransactions = () => {
    setShowAllTransactions(true);
  };

  const handleViewDetails = (transactionId: string) => {
    // Navegar a la vista de detalles de la transacción
    console.log("Ver detalles de transacción:", transactionId);
  };

  const handleEditTransaction = (transactionId: string) => {
    console.log("Editar transacción:", transactionId);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    console.log("Eliminar transacción:", transactionId);
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-text-100 text-xl font-bold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary-200" />
              Lista de Transacciones
            </CardTitle>
            <p className="text-sm text-text-200">
              {showAllTransactions
                ? `${filteredTransactions.length} transacciones encontradas`
                : "Vista previa de las transacciones más recientes"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-bg-300/50 text-text-200 hover:text-primary-300"
              onClick={() => navigate("/transactions/new")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-bg-300/50 text-text-200 hover:text-primary-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Barra de búsqueda y filtros */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-200" />
            <Input
              placeholder="Buscar transacciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-bg-300/30 border-bg-300/50 text-text-100 placeholder:text-text-200/50"
            />
          </div>

          {/* Filtros de categoría */}
          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  whitespace-nowrap rounded-full px-4 py-2 h-auto
                  transition-all duration-200
                  ${
                    selectedCategory === category.id
                      ? "bg-primary-100/20 border-primary-100/50 text-primary-200"
                      : "border-bg-300/50 text-text-200 hover:border-primary-200/30 hover:text-primary-200"
                  }
                `}
              >
                {category.name}
                <Badge
                  className={`
                    ml-2 text-xs px-2 py-0.5
                    ${
                      selectedCategory === category.id
                        ? "bg-primary-100/30 text-primary-200"
                        : "bg-bg-300/30 text-text-200"
                    }
                  `}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de transacciones */}
        <div className="space-y-3">
          {displayedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="group bg-bg-300/10 hover:bg-bg-300/20 border border-bg-300/30 hover:border-primary-200/20 rounded-xl p-4 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                {/* Información izquierda */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Icono de tipo */}
                  <div
                    className={`
                      p-2 rounded-lg flex-shrink-0
                      ${getTypeBadgeColor(transaction.type)}
                    `}
                  >
                    {getTypeIcon(transaction.type)}
                  </div>

                  {/* Detalles */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-text-100 truncate">
                        {transaction.description}
                      </h3>
                      <Badge
                        className={`
                          text-xs px-2 py-0.5 flex-shrink-0
                          ${getTypeBadgeColor(transaction.type)}
                        `}
                      >
                        {transaction.type === "income"
                          ? "INGRESO"
                          : transaction.type === "expense"
                          ? "GASTO"
                          : "TRANSFERENCIA"}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-text-200">
                        <Tag className="h-3 w-3" />
                        <span
                          className="font-medium"
                          style={{ color: transaction.categoryColor }}
                        >
                          {transaction.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-text-200/70">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {transaction.date} • {transaction.time}
                        </span>
                      </div>

                      {/* Etiquetas */}
                      {transaction.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          {transaction.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs px-2 py-0.5 border-bg-300/50 text-text-200/70"
                            >
                              #{tag}
                            </Badge>
                          ))}
                          {transaction.tags.length > 2 && (
                            <span className="text-xs text-text-200/50">
                              +{transaction.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Monto y acciones */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  {/* Monto */}
                  <div
                    className={`
                      text-lg font-bold text-right
                      ${getTypeColor(transaction.type)}
                    `}
                  >
                    {transaction.type === "expense" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-text-200 hover:text-primary-200"
                      onClick={() => handleViewDetails(transaction.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-text-200 hover:text-primary-200"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-bg-200/90 backdrop-blur-md border-bg-300 w-48"
                      >
                        <DropdownMenuItem
                          className="text-text-100 hover:bg-bg-300/50 cursor-pointer"
                          onClick={() => handleEditTransaction(transaction.id)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar transacción
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                          onClick={() =>
                            handleDeleteTransaction(transaction.id)
                          }
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para ver todas las transacciones */}
        {!showAllTransactions && filteredTransactions.length > 5 && (
          <div className="mt-6 pt-4 border-t border-bg-300/40">
            <Button
              variant="outline"
              className="w-full border-primary-100/30 text-primary-200 hover:bg-primary-100/10 hover:text-primary-300 group"
              onClick={handleViewAllTransactions}
            >
              <div className="flex items-center justify-center gap-2">
                <span>Ver todas las transacciones</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Button>
            <p className="text-center text-xs text-text-200/70 mt-2">
              Mostrando 5 de {filteredTransactions.length} transacciones
            </p>
          </div>
        )}

        {/* Si ya se muestran todas las transacciones */}
        {showAllTransactions && (
          <div className="mt-6 pt-4 border-t border-bg-300/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-200">
                  Mostrando todas las {filteredTransactions.length}{" "}
                  transacciones
                </p>
                <p className="text-xs text-text-200/70">
                  Filtradas por:{" "}
                  {selectedCategory === "all"
                    ? "Todas las categorías"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-bg-300/50 text-text-200 hover:text-primary-300"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpiar filtros
              </Button>
            </div>
          </div>
        )}

        {/* Si no hay transacciones */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-bg-300/30 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-text-200/50" />
            </div>
            <h3 className="text-lg font-medium text-text-100 mb-2">
              No se encontraron transacciones
            </h3>
            <p className="text-text-200 mb-6">
              Intenta ajustar tus filtros o crear una nueva transacción
            </p>
            <Button
              variant="outline"
              className="border-primary-100/30 text-primary-200 hover:bg-primary-100/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear primera transacción
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
