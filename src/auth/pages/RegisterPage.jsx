import { useDispatch } from "react-redux"
import { Link } from "react-router"
import { useForm } from "../../hooks"
import { useState } from "react"
import { strartCreatingUserWithEmailAndPassword } from "../../store/auth/thunks"

const formData = {
    displayName: '',
    email: '',
    password: '',
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo no es valido'],
    password: [(value) => value.length > 6, 'La contraseña debe tener más de 6 caracteres'],
    displayName: [(value) => value.length > 4, 'El nombre debe de ser mayor de 4 caracter'],
}


export const RegisterPage = () => {
    const dispatch = useDispatch()

    const [formSubmitted, setFormSubmitted] = useState(false)

    
    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations)
    
    const onsubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)
        if (!isFormValid) return
        dispatch(strartCreatingUserWithEmailAndPassword(formState))
    }

    return (
        <form onSubmit={onsubmit} className="space-y-6 animate__animated animate__fadeIn animate__faster">
            <h2 className="text-2xl font-bold text-center">Registrate ahora 🤐</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre
                </label>
                <div className="mt-1">
                    <input
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="name"
                        type="text"
                        autoComplete="displayName"
                        name="displayName"
                        value={displayName}
                        onChange={onInputChange}
                    />
                </div>
                {(displayNameValid && formSubmitted) ? <p className="pl-2 text-red-500 text-sm font-medium mt-1">! {displayNameValid}</p> : null}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo Electronico
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {(emailValid && formSubmitted) ? <p className="pl-2 text-red-500 text-sm font-medium mt-1">! {emailValid}</p> : null}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {(passwordValid && formSubmitted) ? <p className="pl-2 text-red-500 text-sm font-medium mt-1">! {passwordValid}</p> : null}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Recordarme
                    </label>
                </div>

                <div className="text-sm">
                    <Link to={'/'} className=" font-bold text-indigo-600 hover:text-indigo-500">
                        Ya tienes cuenta? 😀
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Registate
                </button>

            </div>
        </form>
    )
}
