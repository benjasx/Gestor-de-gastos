import {
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  Calendar,
} from "lucide-react";
import { TransactionItem } from "../components";
import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { formatMoney } from "../../helpers/formatMoney";

export const MainLayout = () => {
  // Corregí el typo de 'saladoDisponible' a 'saldoDisponible' si es posible en tu slice
  const {
    gastos,
    mainIngresos,
    gastosTotales,
    saladoDisponible: saldoDisponible,
  } = useSelector((state) => state.gastos);

  const lastSixTransactions = Array.isArray(gastos) ? gastos.slice(0, 6) : [];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/control-gastos/allTransactions`);
  };

  // Obtener fecha actual para el saludo
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex flex-col min-h-screen pb-20 animate__animated animate__fadeIn animate__faster">
      {/* Header de Bienvenida */}
      <header className="px-6 pt-8 mb-6">
        <p className="text-blue-200 text-sm font-medium flex items-center gap-2">
          <Calendar size={14} /> {today}
        </p>
        <h1 className="text-white text-3xl font-bold mt-1">Hola de nuevo 👋</h1>
      </header>

      <main className="px-6 flex-grow">
        {/* Tarjeta Principal de Saldo */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden mb-8">
          {/* Círculos decorativos de fondo */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10 text-center">
            <p className="text-blue-100 text-sm uppercase tracking-widest font-semibold mb-2">
              Saldo Disponible
            </p>
            <h2 className="text-white text-5xl font-black tracking-tight mb-6">
              {formatMoney(saldoDisponible)}
            </h2>

            <div className="flex justify-between items-center bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mb-1">
                  <ArrowUpCircle size={14} /> INGRESOS
                </div>
                <span className="text-white font-bold">
                  {formatMoney(mainIngresos)}
                </span>
              </div>

              <div className="w-[1px] h-10 bg-white/20"></div>

              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-rose-400 text-xs font-bold mb-1">
                  <ArrowDownCircle size={14} /> GASTOS
                </div>
                <span className="text-white font-bold">
                  {formatMoney(gastosTotales)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Movimientos */}
        <section className="bg-white/10 backdrop-blur-lg rounded-t-[2.5rem] -mx-6 px-6 pt-8 flex-grow shadow-inner border-t border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {lastSixTransactions.length === 0
                ? "Comienza hoy 🚀"
                : "Últimos movimientos"}
            </h3>
            {gastos.length > 6 && (
              <button
                onClick={handleClick}
                className="text-blue-300 text-sm font-bold hover:text-white transition-colors"
              >
                Ver todos
              </button>
            )}
          </div>

          <div className="space-y-4 pb-10">
            {lastSixTransactions.length > 0 ? (
              lastSixTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="transform transition-transform active:scale-95"
                >
                  <TransactionItem transaction={tx} />
                </div>
              ))
            ) : (
              <div className="text-center py-12 px-10">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="text-blue-300" size={32} />
                </div>
                <p className="text-blue-100 text-lg font-medium">
                  No hay registros aún
                </p>
                <p className="text-blue-300/60 text-sm">
                  Presiona el botón + para añadir tu primer gasto o ingreso.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Botón Flotante (FAB) */}
      <div className="fixed bottom-8 right-6 z-50">
        <NavLink
          to="/control-gastos/addNewGasto"
          className="bg-indigo-500 hover:bg-indigo-400 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(79,70,229,0.8)] transition-all transform hover:scale-110 active:scale-90"
        >
          <Plus size={36} strokeWidth={2.5} />
        </NavLink>
      </div>
    </div>
  );
};
