import { ArrowLeftCircle } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, replace, useNavigate } from "react-router"
import { startNewGasto } from "../../store/gastos"
import { useForm } from "../../hooks"
import 'sweetalert2/dist/sweetalert2.min.css' 
import { useEffect } from "react"
import Swal from "sweetalert2"

const formdata = {
  category: "",
  amount: "",
  description: "",
  paymentMethod: "",
  date: "",
}

export const AddNewGasto = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {messageSaved, isSaving} = useSelector(state => state.gastos)
  const {
    category,amount,description,paymentMethod,date,onInputChange,formState,

  } = useForm(formdata)
  const onClicNewNote = (e) => {
    e.preventDefault()
    dispatch(startNewGasto(formState,navigate))
  }

  useEffect(() => {
    if(messageSaved.length > 0){
      Swal.fire('Registro Guardado', messageSaved, 'success')
    }
  })

  return (
    <div className=" inset-0 flex items-center justify-center">
      <form onSubmit={onClicNewNote} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
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
            onChange={onInputChange}
            value={category}
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
            onChange={onInputChange}
            value={amount}
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
            onChange={onInputChange}
            value={description}
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
            onChange={onInputChange}
            value={paymentMethod}
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
            onChange={onInputChange}
            value={date}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
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
