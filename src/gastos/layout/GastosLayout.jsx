import { Outlet } from "react-router";
import { NavBar } from "../components";

export const GastosLayout = () => {
  return (
    <div className="bg-[#0f172a] font-sans min-h-screen w-full selection:bg-blue-500/30">
      {/* Contenedor principal con límite de ancho para móviles/tablets */}
      <div className="relative min-h-screen w-full max-w-md mx-auto bg-slate-950 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* FONDO DECORATIVO: Luces de Neón sutiles en lugar de círculos grises */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Resplandor superior izquierdo */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>

          {/* Resplandor central derecho */}
          <div className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]"></div>

          {/* Resplandor inferior */}
          <div className="absolute -bottom-24 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

        {/* CONTENIDO: Z-index alto para estar sobre los glows */}
        <div className="relative z-10 flex flex-col min-h-screen animate__animated animate__fadeIn animate__faster">
          {/* NavBar: Le damos un pequeño espacio superior */}
          <div className="px-6 pt-4">
            <NavBar />
          </div>

          {/* El Outlet donde se renderizan MainLayout, AllTransactions, etc. */}
          <div className="flex-grow px-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
