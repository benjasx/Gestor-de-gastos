import { Plus, } from "lucide-react";
import { TransactionItem } from "../components";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

export const MainLayout = () => {
    const { gastos,mainIngresos,gastosTotales, saladoDisponible} = useSelector(state => state.gastos);
    const lastSixTransactions = Array.isArray(gastos)
        ? gastos.slice(0, 6)
        : [];

    return (
        <>
            < main className="flex-grow flex flex-col" >
                {/* Sección superior con los círculos de balance */}
                < div className="flex items-start flex-shrink-0" >
                    <div className="relative bg-white/95 shadow-2xl rounded-full w-48 h-48 sm:w-56 sm:h-56 flex flex-col justify-center items-center text-center mt-10 ml-10 sm:ml-0">
                        <span className="text-blue-600 text-3xl sm:text-4xl font-bold leading-tight">${saladoDisponible}</span>
                        <span className="text-blue-500 text-base sm:text-lg mt-1">Disponibles</span>
                    </div>
                    <div className="flex flex-col space-y-5 ml-auto pl-2">
                        <div className="bg-green-500 shadow-lg rounded-full w-32 h-32 sm:w-36 sm:h-36 flex flex-col justify-center items-center text-center text-white">
                            <span className="text-base sm:text-lg">Ingresos</span>
                            <span className="text-lg sm:text-xl font-bold mt-1">${mainIngresos}</span>
                        </div>
                        <div className="bg-red-500 shadow-lg rounded-full w-32 h-32 sm:w-36 sm:h-36 flex flex-col justify-center items-center text-center text-white">
                            <span className="text-base sm:text-lg">Gastos</span>
                            <span className="text-lg sm:text-xl font-bold mt-1">${gastosTotales}</span>
                        </div>
                    </div>
                </div >

                {/* Nueva sección de Últimos Movimientos */}
                < div className="mt-12 flex-grow" >
                    <h2 className="text-xl text-center font-bold text-blue-950 mb-4 sm:text-white">{lastSixTransactions.length === 0 ? 'No hay Movimientos' : 'Últimos movimientos'}</h2>
                    <div className="space-y-3">
                        {lastSixTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
                    </div>
                    <div className="text-center mt-6">
                        {gastos.length > 6 &&
                            <button className="bg-slate-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-700 transition-colors">
                                Ver mas
                            </button>
                        }
                    </div>
                </div >
            </main >

            <div className="absolute bottom-5 right-0 z-20">
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
