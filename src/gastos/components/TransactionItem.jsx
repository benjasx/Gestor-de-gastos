import { useNavigate } from "react-router";
import { categoryIcons, paymentMethods } from "../../utils";


export const TransactionItem = ({ transaction }) => {
    const { amount, category, type, date, paymentMethod, description, id } = transaction;
    const IconComponent = categoryIcons[category] || categoryIcons['Otros'];
    const IconPaymetethod = paymentMethods[paymentMethod]

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/control-gastos/transaction/${id}`);
    };

    return (
        <div className="flex items-center bg-gray-100/90 p-3 rounded-lg border border-gray-200/50 cursor-pointer hover:bg-gray-200/90 transition-colors"
            onClick={handleClick}>
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