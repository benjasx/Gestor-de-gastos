import { useDispatch, useSelector, } from "react-redux"
import { Link } from "react-router"
import { starLoginWithEmailAndPassword, startWitGoogleSingIn } from "../../store/auth"
import { useForm } from "../../hooks"
import { useMemo } from "react"

const formData = {
    email: '',
    password: '',
}

export const LoginPage = () => {

    const dispatch = useDispatch()
    const {status, errorMessage} = useSelector(state => state.auth)
    const {email, password, onInputChange} = useForm(formData)

    const isAutenticated = useMemo( () => status === 'checking', [status] )

    const onsubmit = (event) => {
        event.preventDefault()
        dispatch(starLoginWithEmailAndPassword({email, password}))
    }

    const onGoogleSingIn = () => {
        dispatch(startWitGoogleSingIn())
    }

    return (
        <form onSubmit={onsubmit} className="space-y-6 animate__animated animate__fadeIn animate__faster">
            <h2 className="text-2xl font-bold text-center">Bienvenido 🌕</h2>
            {errorMessage ? <p className="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">{errorMessage}</p> : null}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo Electronico
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={onInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={onInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
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
                    <Link to={'/auth/register'} className="font-bold text-indigo-600 hover:text-indigo-500">
                        No tienes una cuenta? 🥲
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isAutenticated}
                    className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Ingresar
                </button>
                <hr className="mt-2 divide-black" />
                <button
                    type="button"
                    disabled={isAutenticated}
                    onClick={onGoogleSingIn}
                    className="cursor-pointer mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Google
                </button>
            </div>
        </form>
    )
}
