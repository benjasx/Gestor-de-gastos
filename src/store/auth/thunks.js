import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, singInWithGoogle } from "../../firebase/provider"
import { checkingCredentials, login, logout } from "./";


//para iniciar sesion con google
export const startWitGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();
        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result))
    }
}

//para crear usuario con email y password
export const strartCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        //: llamar al backend y esperar la respuesta (provider)
        const { ok, uid, photoURL, errorMessage } = await registerWithEmailPassword({ email, password, displayName })
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, displayName, email, photoURL }))
    }
}

//para iniciar sesion con email y password
export const starLoginWithEmailAndPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({ email, password })
        if (!result.ok) return dispatch(logout(result))
        dispatch(login(result))
    }
}

//para cerrar sesion
export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        /* dispatch(limpiarGastos()) */
        dispatch(logout());
    }
}



