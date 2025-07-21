import { Type } from "lucide-react";
import { categoryIcons, paymentMethods } from "../../utils";

// Componente para un solo item de la lista de transacciones
export const TransactionItem = ({ transaction }) => {
    const { amount, category,type, date, paymentMethod, description } = transaction;
    const IconComponent = categoryIcons[category] || categoryIcons['Otros'];
    const IconPaymetethod = paymentMethods[paymentMethod]
    return (
        <div className="flex items-center bg-gray-100/90 p-3 rounded-lg border border-gray-200/50">
            <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <IconComponent className="text-blue-500" size={32} />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-gray-800">{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</p>
                <p className={`${type === 'ingreso' ? 'text-blue-500 font-bold' : 'text-red-500 font-bold'}`}>${Number(amount).toFixed(2)}</p>
                {/* <span>{description}</span> */}
            </div>
            <div className="text-right flex flex-col items-end">
                <p className="text-sm text-gray-500">{date}</p>
                <IconPaymetethod className="text-blue-500" size={28} />
            </div>
        </div>
    );
}