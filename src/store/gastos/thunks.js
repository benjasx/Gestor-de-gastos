import { collection, doc, setDoc, Timestamp } from "firebase/firestore/lite";
import { addNewGasto, isSavingNewCosto, limpiarMessage, setGastos, setSaveMessage } from "./gastosSlice";
import { FirebaseDB } from "../../firebase/config";
import { loadGastos } from "../../helpers/loadNotes";


export const startNewGasto = (data, navigate) => {
    return async (dispatch, getState) => {
        dispatch(isSavingNewCosto());
        const { uid } = getState().auth;

        const newGastoData = { ...data };
        newGastoData.createdAt = Timestamp.now();

        try { // Añade un bloque try-catch para manejar errores de guardado
            const newDoc = doc(collection(FirebaseDB, `${uid}/historico/gastos`));
            await setDoc(newDoc, newGastoData);

            const updatedGastos = await loadGastos(uid);
            dispatch(setGastos(updatedGastos));

            // *** ¡Aquí se despacha el mensaje de éxito! ***
            dispatch(setSaveMessage('Movimiento guardado exitosamente.'));

            // Mantén el setTimeout para la redirección y limpiar el mensaje
            setTimeout(() => {
                dispatch(limpiarMessage()); // Limpia el mensaje después de 1 segundo (o lo que dure la redirección)
                navigate('/');
            }, 1000);

        } catch (error) {
            console.error('Error al guardar el Movimiento:', error);
            // Si hay un error, puedes despachar un mensaje de error
            dispatch(setSaveMessage('Error al guardar el Movimiento.'));
            dispatch(isSavingNewCosto(false)); // Detén el estado de guardado

            // Opcional: limpiar el mensaje de error después de un tiempo
            setTimeout(() => {
                dispatch(limpiarMessage());
            }, 3000); // Muestra el error por 3 segundos
        }
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