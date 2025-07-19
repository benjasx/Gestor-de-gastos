import { collection, doc, setDoc } from "firebase/firestore/lite";
import { addNewGasto, isSavingNewCosto, limpiarMessage, setGastos } from "./gastosSlice";
import { FirebaseDB } from "../../firebase/config";
import { loadGastos } from "../../helpers/loadNotes";


export const startNewGasto = (data, navigate) => {
    return async (dispatch, getState) => {

        dispatch(isSavingNewCosto())
        //console.log(getState().auth)
        const { uid } = getState().auth;
        //const { category, amount, description, paymentMethod, date } = data
        //console.log(data);
        const newGastoData = { ...data }

        const newDoc = doc(collection(FirebaseDB, `${uid}/historico/gastos`))
        await setDoc(newDoc, data)

        newGastoData.id = newDoc.id;
        //console.log(data);
        dispatch(addNewGasto(newGastoData))
        setTimeout(() => {
            dispatch(limpiarMessage())
            navigate('/')
        }, 1000)
    }
}

export const startLoadingGastos = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe')
        const gastos = await loadGastos(uid)
        dispatch(setGastos(gastos))
    }
}