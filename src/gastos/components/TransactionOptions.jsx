import { expenseCategories } from "../../utils"


export const TransactionOptions = ({category, onInputChange, type}) => {

    const categorys = expenseCategories

    const filteredCategories = categorys.filter(category => category.type === type)

    return (
        <select
            id="category"
            name="category"
            onChange={onInputChange}
            value={category}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Seleciona la categoria</option>
            {filteredCategories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.id.charAt(0).toUpperCase() + category.id.slice(1).toLowerCase()}
                </option>
            ))}
        </select>
    )
}
