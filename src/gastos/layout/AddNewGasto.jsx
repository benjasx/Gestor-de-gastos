import { ArrowLeftCircle } from "lucide-react"
import { NavLink } from "react-router"

export const AddNewGasto = () => {
  return (
    <div className=" inset-0 flex items-center justify-center animate__animated animate__fadeIn animate__faster">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Netflix">Netflix</option>
            <option value="Despensa">Despensa</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="$$$"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="paymentMethod"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Payment Method:
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select payment method</option>
            <option value="creditCard">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Expense
        </button>
      </form>
      <div className="absolute bottom-2 right-2 z-20">
        <NavLink
          to="/"
          className="bg-red-500 text-white size-14 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
        >
          <ArrowLeftCircle size={32} />
        </NavLink>
      </div>
    </div>
  )
}
