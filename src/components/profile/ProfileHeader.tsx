// ProfileHeader.tsx - VERSIÓN COMPLETA CON BANNER PERSONALIZABLE
import React, { useState, useRef } from "react";
import {
  Camera,
  Edit3,
  Check,
  X,
  Image as ImageIcon,
  Upload,
  Trash2,
  Wand2,
  Palette,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";

const ProfileHeader = () => {
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [tempBanner, setTempBanner] = useState<string | null>(null);
  const [bannerFilter, setBannerFilter] = useState("normal");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Banners por defecto con gradientes
  const defaultBanners = [
    "bg-gradient-to-r from-primary-100 via-primary-200 to-accent-100",
    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-green-500 via-teal-500 to-blue-500",
    "bg-gradient-to-r from-orange-500 via-red-500 to-purple-500",
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  ];

  const [selectedDefaultBanner, setSelectedDefaultBanner] = useState(0);

  // Filtros CSS para banners
  const bannerFilters = {
    normal: "",
    blur: "blur(2px)",
    brightness: "brightness(1.2)",
    contrast: "contrast(1.2)",
    saturate: "saturate(1.5)",
    sepia: "sepia(0.3)",
  };

  // Manejar carga de banner
  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecciona una imagen válida");
        return;
      }

      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen no debe superar los 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setTempBanner(e.target?.result as string);
        setIsEditingBanner(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Aplicar nuevo banner
  const applyBannerChange = () => {
    if (tempBanner) {
      setBannerImage(tempBanner);
    } else {
      setBannerImage(null);
      setSelectedDefaultBanner(selectedDefaultBanner);
    }
    setIsEditingBanner(false);
  };

  // Cancelar cambios
  const cancelBannerChange = () => {
    setIsEditingBanner(false);
    setTempBanner(null);
  };

  // Seleccionar banner por defecto
  const selectDefaultBanner = (index: number) => {
    setSelectedDefaultBanner(index);
    setTempBanner(null);
  };

  // Eliminar banner personalizado
  const removeCustomBanner = () => {
    setBannerImage(null);
    setTempBanner(null);
    setIsEditingBanner(false);
  };

  // Activar carga de archivo
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl shadow-2xl group">
      {/* Banner principal */}
      <div className="relative h-72 w-full overflow-hidden">
        {/* Banner actual */}
        {bannerImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{
              backgroundImage: `url(${bannerImage})`,
              filter: bannerFilters[bannerFilter as keyof typeof bannerFilters],
            }}
          />
        ) : (
          <div
            className={`absolute inset-0 ${defaultBanners[selectedDefaultBanner]} animate-gradient transition-all duration-500`}
            style={{
              filter: bannerFilters[bannerFilter as keyof typeof bannerFilters],
            }}
          />
        )}

        {/* Overlay oscuro para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-100/95 via-bg-100/50 to-transparent" />

        {/* Efectos de partículas */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-6 -left-6 w-32 h-32 bg-primary-200/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 -right-10 w-40 h-40 bg-accent-100/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-primary-300/20 rounded-full animate-float" />
          <div
            className="absolute top-1/2 left-1/3 w-8 h-8 bg-accent-100/15 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Contenido del header */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100/20 to-primary-200/20 backdrop-blur-sm">
                  <Sparkles className="h-8 w-8 text-primary-200" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-text-100 bg-gradient-to-r from-text-100 via-primary-200 to-accent-100 bg-clip-text text-transparent">
                  Mi Perfil Personal
                </h1>
              </div>
              <p className="text-text-200/90 text-lg max-w-2xl">
                Gestiona tu identidad, personaliza tu experiencia y controla tu
                seguridad financiera
              </p>
            </div>

            {/* Estado del banner */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-full bg-bg-100/80 backdrop-blur-sm border border-primary-200/30">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary-200 rounded-full animate-pulse" />
                  <span className="text-sm text-primary-200">
                    {bannerImage
                      ? "Banner personalizado"
                      : `Banner ${selectedDefaultBanner + 1}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición de banner */}
      {isEditingBanner && (
        <div className="absolute inset-0 bg-bg-100/95 backdrop-blur-md z-20 p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-100 flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary-200" />
                Personalizar Banner
              </h2>
              <p className="text-text-200 mt-1">
                Elige un diseño o sube tu propia imagen
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                onClick={applyBannerChange}
              >
                <Check className="h-4 w-4 mr-2" />
                Aplicar
              </Button>
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={cancelBannerChange}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
            {/* Opción: Subir imagen */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-100 flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary-200" />
                Subir imagen personalizada
              </h3>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerUpload}
              />

              <div
                className="border-2 border-dashed border-primary-200/30 rounded-2xl p-8 text-center hover:border-primary-200/50 hover:bg-primary-200/5 transition-all cursor-pointer"
                onClick={triggerFileInput}
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-200/20 inline-block mb-4">
                  <Upload className="h-8 w-8 text-primary-200" />
                </div>
                <h4 className="text-text-100 font-medium mb-2">
                  Haz clic para subir
                </h4>
                <p className="text-sm text-text-200">
                  PNG, JPG o WEBP (max 5MB)
                </p>
              </div>

              {/* Vista previa de imagen subida */}
              {tempBanner && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-text-100 mb-3">
                    Vista previa:
                  </h4>
                  <div
                    className="h-32 rounded-xl border-2 border-primary-200/30"
                    style={{
                      backgroundImage: `url(${tempBanner})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Opción: Banners por defecto */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-100 flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary-200" />
                Banners por defecto
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {defaultBanners.map((banner, index) => (
                  <div
                    key={index}
                    className={`h-24 rounded-xl cursor-pointer border-2 transition-all ${selectedDefaultBanner === index ? "border-primary-200 ring-2 ring-primary-200/30" : "border-bg-300/40 hover:border-primary-200/30"}`}
                    onClick={() => selectDefaultBanner(index)}
                  >
                    <div className={`h-full rounded-xl ${banner}`} />
                  </div>
                ))}
              </div>

              {/* Filtros */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-text-100 mb-3 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary-200" />
                  Aplicar filtro
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(bannerFilters).map(([key, value]) => (
                    <Button
                      key={key}
                      size="sm"
                      variant={bannerFilter === key ? "default" : "outline"}
                      className={
                        bannerFilter === key
                          ? "bg-primary-200 hover:bg-primary-300"
                          : "border-bg-300/40 text-text-200 hover:border-primary-200/30 hover:text-primary-200"
                      }
                      onClick={() => setBannerFilter(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-6 pt-6 border-t border-bg-300/40">
                <div className="flex gap-3">
                  {bannerImage && (
                    <Button
                      variant="outline"
                      className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                      onClick={removeCustomBanner}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar personalizado
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-1 border-accent-100/30 text-accent-100 hover:bg-accent-100/10"
                    onClick={triggerFileInput}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Subir nueva
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="mt-6 pt-6 border-t border-bg-300/40">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100/10 to-primary-200/10">
                <Edit3 className="h-5 w-5 text-primary-200" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-100">
                  Consejos para tu banner
                </h4>
                <p className="text-sm text-text-200 mt-1">
                  • Usa imágenes con resolución alta (mínimo 1920x400)
                  <br />
                  • Evita texto importante que pueda quedar cubierto
                  <br />• Los colores claros funcionan mejor con el modo oscuro
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input oculto para carga de archivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBannerUpload}
      />
    </div>
  );
};

export default ProfileHeader;
