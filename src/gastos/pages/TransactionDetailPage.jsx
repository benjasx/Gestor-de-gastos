import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { categoryIcons, paymentMethods } from '../../utils';
import { formatMoney } from '../../helpers/formatMoney';
import { startDeletingGasto } from '../../store/gastos/thunks';

export const TransactionDetailPage = () => {
    const { transactionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { gastos, isSaving, messageSaved } = useSelector(state => state.gastos);
    const [transaction, setTransaction] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        if (gastos.length > 0) {
            const foundTransaction = gastos.find(tx => tx.id === transactionId);
            if (foundTransaction) {
                setTransaction(foundTransaction);
            } else {
                // Si no se encuentra la transacción, redirigir a la página principal
                navigate('/control-gastos');
            }
        }
    }, [transactionId, gastos, navigate]);

    const handleDelete = () => {
        setShowConfirmDelete(true);
    };

    const confirmDelete = () => {
        dispatch(startDeletingGasto(transactionId, navigate));
    };

    const cancelDelete = () => {
        setShowConfirmDelete(false);
    };

    if (!transaction) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Cargando...</p>
            </div>
        );
    }

    const { amount, category, type, date, paymentMethod, description, createdAt } = transaction;
    const IconComponent = categoryIcons[category] || categoryIcons['Otros'];
    const IconPaymentMethod = paymentMethods[paymentMethod];

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white flex items-center bg-blue-600 p-2 rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Volver
                </button>

                <button
                    onClick={handleDelete}
                    disabled={isSaving}
                    className="text-white flex items-center bg-red-600 p-2 rounded-md cursor-pointer hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Eliminar
                </button>
            </div>

            {messageSaved && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {messageSaved}
                </div>
            )}

            {showConfirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">¿Estás seguro?</h3>
                        <p className="mb-6">Esta acción eliminará permanentemente la transacción y no se puede deshacer.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isSaving}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                            >
                                {isSaving ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <IconComponent className="text-blue-500" size={48} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                        </h1>
                        <p className={`text-xl ${type === 'ingreso' ? 'text-blue-500' : 'text-red-500'} font-bold`}>
                            {formatMoney(Number(amount))}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between ">
                        <span className="text-gray-600">Tipo:</span>
                        <span className="font-medium">{type === 'ingreso' ? 'Ingreso' : 'Gasto'}</span>
                    </div>

                    <div className="flex justify-between ">
                        <span className="text-gray-600">Método de pago:</span>
                        <div className="flex items-center">
                            <IconPaymentMethod className="text-blue-500 mr-2" size={20} />
                            <span className="font-medium">{paymentMethod}</span>
                        </div>
                    </div>

                    <div className="flex justify-between ">
                        <span className="text-gray-600">Fecha:</span>
                        <span className="font-medium">{date}</span>
                    </div>

                    {description && (
                        <div className="">
                            <span className="text-gray-600">Descripción:</span>
                            <p className="mt-1 font-medium">{description}</p>
                        </div>
                    )}

                    <div className="flex justify-between pt-2">
                        <span className="text-gray-600">Fecha de creación:</span>
                        <span className="font-medium">
                            {createdAt ? new Date(createdAt).toLocaleString() : 'No disponible'}
                        </span>
                    </div>
                    <span className='text-center block text-gray-400'>Detalles del movimiento</span>
                </div>
            </div>
        </div>
    );
};