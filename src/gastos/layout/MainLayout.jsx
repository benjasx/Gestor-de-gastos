import { Plus, } from "lucide-react";
import { TransactionItem } from "../components";
import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { formatMoney } from "../../helpers/formatMoney";

export const MainLayout = () => {
    const { gastos, mainIngresos, gastosTotales, saladoDisponible } = useSelector(state => state.gastos);
    const lastSixTransactions = Array.isArray(gastos)
        ? gastos.slice(0, 6)
        : [];

    const navigate = useNavigate();

    const handleClick = () => {

        navigate(`/control-gastos/allTransactions`);
    };
    return (
        <>
            < main className="flex-grow flex flex-col animate__animated animate__fadeInRight animate__faster" >

                {/* Sección superior con los círculos de balance */}
                < div className="flex items-start flex-shrink-0" >
                    <div className="relative bg-white/95 shadow-2xl rounded-full size-46 mt-15 sm:w-56 sm:h-56 flex flex-col justify-center items-center text-center sm:ml-0">
                        <span className="text-blue-600 text-3xl sm:text-4xl font-bold leading-tight text-shadow">{formatMoney(saladoDisponible)}</span>
                        <span className="text-blue-500 text-base sm:text-lg mt-1 text-shadow">Disponibles</span>
                    </div>
                    <div className="flex flex-col space-y-5 ml-auto pl-2 pr-5">
                        <div className="bg-gradient-to-br from-blue-300 to-blue-500 shadow-lg rounded-full w-32 h-32 sm:w-36 sm:h-36 flex flex-col justify-center items-center text-center text-white">
                            <span className="text-base sm:text-lg text-shadow">Ingresos</span>
                            <span className="text-lg sm:text-xl font-bold mt-1 text-shadow">{formatMoney(mainIngresos)}</span>
                        </div>
                        <div className="bg-gradient-to-br from-red-400 to-red-500 shadow-lg rounded-full w-32 h-32 sm:w-36 sm:h-36 flex flex-col justify-center items-center text-center text-white">
                            <span className="text-base sm:text-lg">Gastos</span>
                            <span className="text-lg sm:text-xl font-bold mt-1">{formatMoney(gastosTotales)}</span>
                        </div>
                    </div>
                </div >

                {/* Nueva sección de Últimos Movimientos */}
                < div className="mt-12 flex-grow" >
                    <h2 className="text-xl text-center font-bold text-blue-950 mb-4 sm:text-white">{lastSixTransactions.length === 0 ? 'Registra un Movimiento 😀' : 'Últimos movimientos'}</h2>
                    <div className="space-y-3">
                        {lastSixTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
                    </div>
                    <div className="text-center mt-6">
                        {gastos.length > 6 &&
                            <button onClick={handleClick} className="bg-slate-800 cursor-pointer text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-700 transition-colors">
                                Ver mas
                            </button>
                        }
                    </div>
                </div >
            </main >

            <div className="absolute bottom-5 right-3 z-20">
                <NavLink
                    to="/control-gastos/addNewGasto"
                    className="bg-red-500 text-white size-14 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                >
                    <Plus size={32} />
                </NavLink>
            </div>
        </>
    )
}
