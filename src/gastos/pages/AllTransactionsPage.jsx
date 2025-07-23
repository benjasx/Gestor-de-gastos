import { useDispatch, useSelector } from "react-redux"
import { TransactionItem } from "../components"
import { ArrowLeftCircle } from "lucide-react"
import { NavLink } from "react-router"
import { useForm } from "../../hooks"
import { useMemo } from "react"
import { MyReport } from "../../utils/MyReport"


const formdata = {
    mes: (new Date().getMonth() + 1).toString().padStart(2, '0'),
    año: new Date().getFullYear().toString()
}

export const AllTransactionsPage = () => {
    const { gastos } = useSelector(state => state.gastos)
    const { mes, año, onInputChange } = useForm(formdata)

    // Transacciones filtradas basadas en el estado del formulario (mes y año)
    const filteredTransactions = useMemo(() => {
        let transactionsToFilter = gastos;

        // Filtro por Año
        if (año && año !== '') {
            transactionsToFilter = transactionsToFilter.filter(transaction => {
                const transactionYear = transaction.date.substring(0, 4); // 'YYYY-MM-DD' -> 'YYYY'
                return transactionYear === año;
            });
        }

        // Filtro por Mes (solo si se seleccionó un año o si quieres que funcione independientemente)
        // La lógica actual filtra por mes DESPUÉS de filtrar por año
        if (mes && mes !== '') { // Si hay un mes seleccionado
            transactionsToFilter = transactionsToFilter.filter(transaction => {
                const transactionMonth = transaction.date.substring(5, 7); // 'YYYY-MM-DD' -> 'MM'
                return transactionMonth === mes;
            });
        }

        return transactionsToFilter;
    }, [gastos, mes, año]); // Dependencias: re-filtra cuando 'gastos', 'mes' o 'año' cambian

    return (
        <>
            <div>
                <p className="font-bold text-right text-white text-xl">Todos los movimientos</p>
                <MyReport/>
                <div className="flex justify-end gap-2 items-center mt-5">

                    <select
                        id="mes"
                        name="mes"
                        onChange={onInputChange}
                        value={mes}
                        className="px-3 py-1 border border-blue-700 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
                    <select
                        id="año"
                        name="año"
                        onChange={onInputChange}
                        value={año}
                        className="px-3 py-1 border border-blue-700 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">año</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2 mt-5">
                {filteredTransactions.length === 0 ? (
                    <p className="mt-20 text-xl text-blue-500 text-center bg-white rounded-lg p-4 shadow-md flex items-center justify-center min-h-[200px]">No hay transacciones registrdas para el mes y año seleccionados.🥲</p>
                ) : (
                    filteredTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
                )}
            </div>
            <div className="absolute top-35 left-8 z-20">
                <NavLink
                    to="/"
                    className="bg-red-500 text-white size-14 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                >
                    <ArrowLeftCircle size={32} />
                </NavLink>
            </div>
        </>
    )
}
