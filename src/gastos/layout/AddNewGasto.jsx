import { ArrowLeftCircle } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, replace, useNavigate } from "react-router"
import { startNewGasto } from "../../store/gastos"
import { useForm } from "../../hooks"
import 'sweetalert2/dist/sweetalert2.min.css'
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { TransactionOptions } from "../components/TransactionOptions"

const formdata = {
  type: "",
  category: "",
  amount: "",
  description: "",
  paymentMethod: "",
  date: "",
}

const formValidations = {
  type: [(value) => value.length >= 1, 'El tipo de transacción es requerido'],
  category: [(value) => value.length >= 1, 'La categoría es requerida'],
  amount: [
    (value) => !isNaN(value) && parseFloat(value) > 0, 'El monto debe ser un número mayor a 0',
    (value) => value.length >= 1, 'El monto es requerido',
  ],
  description: [(value) => value.length >= 5, 'La descripción debe tener al menos 10 caracteres'],
  paymentMethod: [(value) => value.length >= 1, 'El método de pago es requerido'],
  date: [(value) => value.length >= 1, 'La fecha es requerida'],
}



export const AddNewGasto = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formSubmitted, setFormSubmitted] = useState(false)
  const { messageSaved, isSaving } = useSelector(state => state.gastos)

  const {
    category, type, amount, description, paymentMethod, date, onInputChange, formState,
    isFormValid, typeValid, categoryValid, amountValid, descriptionValid, paymentMethodValid, dateValid
  } = useForm(formdata, formValidations)

  const onClicNewNote = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(startNewGasto(formState, navigate))
  }

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Registro Guardado', messageSaved, 'success')
    }
  })

  return (
    <>
      <div className=" inset-0 flex items-center justify-center animate__animated animate__fadeInLeft animate__faster">
        <form onSubmit={onClicNewNote} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tipo:
            </label>
            <select
              id="type"
              name="type"
              onChange={onInputChange}
              value={type}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleciona tipo de Movimiento</option>
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
            {(typeValid && formSubmitted) ? <p className="pl-2 text-red-500 text-sm font-medium mt-1">! {typeValid}</p> : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Categoria:
            </label>
            <TransactionOptions category={category} onInputChange={onInputChange} />
            {(categoryValid && formSubmitted) ? <p className="pl-2 text-red-500 text-sm font-medium mt-1">! {categoryValid}</p> : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Monto:
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min={1}
              placeholder="$500.20"
              onChange={onInputChange}
              value={amount}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {(amountValid && formSubmitted) ? <p className="pl-2 text-red-500 text-sm font-medium mt-1">! {amountValid}</p> : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Descripción:
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
            {(descriptionValid && formSubmitted) ? <p className="pl-2 text-red-500 text-sm font-medium mt-1">! {descriptionValid}</p> : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Metodo de pago:
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              onChange={onInputChange}
              value={paymentMethod}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona el metodo de pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Targeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
            {(paymentMethodValid && formSubmitted) ? <p className="pl-2 text-red-500 text-sm font-medium mt-1">! {paymentMethodValid}</p> : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="date"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Fecha:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={onInputChange}
              value={date}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {(dateValid && formSubmitted) ? <p className="pl-2 text-red-500 text-sm font-medium mt-1">! {dateValid}</p> : null}
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Agregar Registro
          </button>
        </form>

      </div>
      <div className="absolute bottom-3 z-20">
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
