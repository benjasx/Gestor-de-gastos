import { useNavigate } from "react-router";
import { categoryIcons, paymentMethods } from "../../utils";
import { ChevronRight } from "lucide-react"; // Importamos un icono de flecha para indicar clic

export const TransactionItem = ({ transaction }) => {
  const { amount, category, type, date, paymentMethod, description, id } =
    transaction;

  const IconComponent = categoryIcons[category] || categoryIcons["Otros"];
  const IconPaymentMethod = paymentMethods[paymentMethod];
  const isIncome = type === "ingreso";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/control-gastos/transaction/${id}`);
  };

  return (
    <div
      className="group flex items-center bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-[0.98]"
      onClick={handleClick}
    >
      {/* Contenedor del Icono de Categoría */}
      <div
        className={`flex-shrink-0 p-3 rounded-xl ${
          isIncome
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-rose-500/20 text-rose-400"
        }`}
      >
        <IconComponent size={24} strokeWidth={2} />
      </div>

      {/* Información central: Categoría y Descripción */}
      <div className="flex-grow ml-4 overflow-hidden">
        <p className="font-bold text-white text-base truncate leading-tight">
          {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </p>
        <p className="text-slate-400 text-xs truncate mt-1">
          {description || "Sin descripción"}
        </p>
      </div>

      {/* Información derecha: Monto, Fecha y Método */}
      <div className="flex flex-col items-end ml-2">
        <p
          className={`text-lg font-black tracking-tight ${
            isIncome ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {isIncome ? "+" : "-"}${Number(amount).toFixed(2)}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
            {date}
          </span>
          {IconPaymentMethod && (
            <IconPaymentMethod size={14} className="text-slate-400" />
          )}
          <ChevronRight
            size={16}
            className="text-slate-600 group-hover:text-white transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
