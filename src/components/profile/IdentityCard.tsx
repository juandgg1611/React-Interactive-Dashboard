// IdentityCard.tsx
import React, { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Phone,
  Edit2,
  Save,
  X,
  Camera,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const IdentityCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: "Juan Oberto",
    email: "juan.oberto@investigacion.edu",
    role: "Investigador Premium",
    location: "Maracaibo, Venezuela",
    phone: "+58 412 1234-5678",
    birthday: "16 de Noviembre, 2005",
    joinDate: "Noviembre 2025",
    status: "Activo",
  });

  const [tempData, setTempData] = useState(userData);

  // Manejar cambio de avatar
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar cambios
  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
  };

  // Cancelar edición
  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
  };

  // Manejar cambio de inputs
  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-200/50 to-bg-300/30 backdrop-blur-md border border-bg-300/40 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-text-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/20">
              <User className="h-5 w-5 text-primary-200" />
            </div>
            <span>Identidad del Usuario</span>
          </div>

          {isEditing ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-primary-200/30 text-primary-200 hover:bg-primary-200/10"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-primary-200/30 shadow-2xl">
                {avatar ? (
                  <AvatarImage src={avatar} alt={userData.name} />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-primary-100 to-primary-200 text-3xl font-bold">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <label htmlFor="avatar-upload">
                  <div className="absolute inset-0 bg-bg-100/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="h-8 w-8 text-primary-200" />
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              )}
            </div>

            <div className="mt-4 text-center lg:text-left">
              <div className="px-3 py-1 rounded-full bg-primary-100/20 inline-block">
                <span className="text-sm font-medium text-primary-200">
                  {userData.status}
                </span>
              </div>
              <p className="text-xs text-text-200 mt-2">
                Miembro desde: {userData.joinDate}
              </p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna 1 */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-text-200 flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  Nombre completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-2 rounded-lg bg-bg-300/30 border border-primary-200/30 text-text-100"
                  />
                ) : (
                  <div className="text-lg font-semibold text-text-100">
                    {userData.name}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-text-200 flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  Correo electrónico
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-2 rounded-lg bg-bg-300/30 border border-primary-200/30 text-text-100"
                  />
                ) : (
                  <div className="text-text-100">{userData.email}</div>
                )}
              </div>

              <div>
                <label className="text-sm text-text-200 flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Cumpleaños
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.birthday}
                    onChange={(e) =>
                      handleInputChange("birthday", e.target.value)
                    }
                    className="w-full p-2 rounded-lg bg-bg-300/30 border border-primary-200/30 text-text-100"
                  />
                ) : (
                  <div className="text-text-100">{userData.birthday}</div>
                )}
              </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-text-200 flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  Ubicación
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full p-2 rounded-lg bg-bg-300/30 border border-primary-200/30 text-text-100"
                  />
                ) : (
                  <div className="text-text-100">{userData.location}</div>
                )}
              </div>

              <div>
                <label className="text-sm text-text-200 flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4" />
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={tempData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full p-2 rounded-lg bg-bg-300/30 border border-primary-200/30 text-text-100"
                  />
                ) : (
                  <div className="text-text-100">{userData.phone}</div>
                )}
              </div>

              <div>
                <label className="text-sm text-text-200 mb-2 block">
                  Rol / Ocupación
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full p-2 rounded-lg bg-bg-300/30 border border-primary-200/30 text-text-100"
                  />
                ) : (
                  <div className="text-text-100">{userData.role}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityCard;
