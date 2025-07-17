import { Menu, LogOut, Clapperboard, ShoppingCart, CreditCard, CircleDollarSign, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';



// Datos de ejemplo para las transacciones
const transactions = [
    { id: 1, icon: Clapperboard, category: 'Netflix', amount: -270.00, date: '14 julio 2025', paymentIcon: CreditCard, paymentIconColor: 'text-blue-500' },
    { id: 2, icon: ShoppingCart, category: 'Despensa', amount: -1800.00, date: '14 julio 2025', paymentIcon: CircleDollarSign, paymentIconColor: 'text-green-500' },
    { id: 3, icon: Clapperboard, category: 'Netflix', amount: -270.00, date: '14 julio 2025', paymentIcon: CircleDollarSign, paymentIconColor: 'text-green-500' },
    { id: 4, icon: Clapperboard, category: 'Netflix', amount: -270.00, date: '14 julio 2025', paymentIcon: CreditCard, paymentIconColor: 'text-blue-500' },
    { id: 5, icon: Clapperboard, category: 'Netflix', amount: -270.00, date: '14 julio 2025', paymentIcon: CreditCard, paymentIconColor: 'text-blue-500' },
    { id: 6, icon: Clapperboard, category: 'Netflix', amount: -270.00, date: '14 julio 2025', paymentIcon: CreditCard, paymentIconColor: 'text-blue-500' },
];

// Componente para un solo item de la lista de transacciones
function TransactionItem({ transaction }) {
    const { icon: Icon, category, amount, date, paymentIcon: PaymentIcon, paymentIconColor } = transaction;
    return (
        <div className="flex items-center bg-gray-100/90 p-3 rounded-lg border border-gray-200/50">
            <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <Icon className="text-blue-600" size={24} />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-gray-800">{category}</p>
                <p className="text-red-500 font-medium">${amount.toFixed(2)}</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-500">{date}</p>
                <PaymentIcon className={`ml-auto mt-1 ${paymentIconColor}`} size={28} />
            </div>
        </div>
    );
}


// Este es el componente principal de la aplicación.
export const ControlPage = () => {

    const dispacth = useDispatch()
    const { displayName } = useSelector(state => state.auth)

    const onLogout = () => {
        dispacth(startLogout())
    }
    return (
        <div className="bg-slate-900 font-sans animate__animated animate__fadeIn animate__faster">
            {/* El contenedor principal ahora permite el scroll vertical si el contenido es muy largo */}
            <div className="relative min-h-screen w-full overflow-hidden max-w-md mx-auto">

                {/* Formas curvas del fondo. Se usan `fixed` para que no se muevan con el scroll. */}
                <div className="fixed -left-32 top-0 w-80 h-full bg-gray-100/90 rounded-full transform -rotate-45 scale-150"></div>
                <div className="fixed -left-48 top-1/4 w-96 h-full bg-gray-100/50 rounded-full transform -rotate-45 scale-150"></div>

                {/* Contenedor para todo el contenido visible, con un z-index para estar por encima del fondo. */}
                <div className="relative z-10 p-6 flex flex-col min-h-screen">

                    {/* Cabecera de la aplicación */}
                    <header className="flex justify-between items-center mb-16 text-white flex-shrink-0">
                        <button className="p-2 rounded-lg transition-colors hover:bg-slate-800">
                            <Menu size={28} />
                        </button>
                        <h1 className="text-xl font-semibold">{displayName}</h1>
                        <button onClick={onLogout} className="p-2 rounded-lg transition-colors hover:bg-slate-800">
                            <LogOut size={28} />
                        </button>
                    </header>

                    {/* Contenido principal */}
                    <main className="flex-grow flex flex-col">
                        {/* Sección superior con los círculos de balance */}
                        <div className="flex items-start flex-shrink-0">
                            <div className="relative bg-white/95 shadow-2xl rounded-full w-48 h-48 sm:w-56 sm:h-56 flex flex-col justify-center items-center text-center mt-10 ml-10 sm:ml-0">
                                <span className="text-blue-600 text-3xl sm:text-4xl font-bold leading-tight">$150,270.00</span>
                                <span className="text-blue-500 text-base sm:text-lg mt-1">Disponibles</span>
                            </div>
                            <div className="flex flex-col space-y-5 ml-auto pl-2">
                                <div className="bg-green-500 shadow-lg rounded-full w-32 h-32 sm:w-36 sm:h-36 flex flex-col justify-center items-center text-center text-white">
                                    <span className="text-base sm:text-lg">Ingresos</span>
                                    <span className="text-lg sm:text-xl font-bold mt-1">$150,270.00</span>
                                </div>
                                <div className="bg-red-500 shadow-lg rounded-full w-32 h-32 sm:w-36 sm:h-36 flex flex-col justify-center items-center text-center text-white">
                                    <span className="text-base sm:text-lg">Gastos</span>
                                    <span className="text-lg sm:text-xl font-bold mt-1">$150,270.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Nueva sección de Últimos Movimientos */}
                        <div className="mt-12 flex-grow">
                            <h2 className="text-xl font-bold text-blue-300 mb-4">Últimos movimientos</h2>
                            <div className="space-y-3">
                                {transactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
                            </div>
                            <div className="text-center mt-6">
                                <button className="bg-slate-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-700 transition-colors">
                                    Ver mas
                                </button>
                            </div>
                        </div>
                    </main>

                </div>

                {/* Botón de Acción Flotante (FAB) */}
                <div className="absolute bottom-5 right-6 z-20">
                    <button className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                        <Plus size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
}


