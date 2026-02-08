// src/pages/Profile.tsx
import React from "react";
import Layout from "../layout/Layout";
import ProfileHeader from "../../components/profile/ProfileHeader";
import IdentityCard from "../../components/profile/IdentityCard";
import PersonalStats from "../../components/profile/PersonalStats";
import SecurityPanel from "../../components/profile/SecurityPanel";

const Profile = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* Header con banner personalizable */}
        <ProfileHeader />

        <div className="space-y-8">
          {/* Tarjeta de identidad */}
          <IdentityCard />

          {/* Estadísticas personales */}
          <PersonalStats />

          {/* Panel de seguridad */}
          <SecurityPanel />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-bg-300/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-text-200/70 text-sm">
                Última actualización: Hoy a las{" "}
                {new Date().toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-text-200">
                    Todas las funciones activas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
