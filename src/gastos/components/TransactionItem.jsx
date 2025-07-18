// Componente para un solo item de la lista de transacciones
export const TransactionItem = ({ transaction }) => {
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