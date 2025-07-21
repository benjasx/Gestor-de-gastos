import { collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore/lite";
import { addNewGasto, deleteMovimiento, isSavingNewCosto, limpiarMessage, setGastos, setSaldoDisponible, setSaveMessage, setViewGastos, setViewIngresos } from "./gastosSlice";
import { FirebaseDB } from "../../firebase/config";
import { loadGastos } from "../../helpers/loadNotes";
import { loadIngresos } from "../../helpers/loadIngresos";
import { loadMGastos } from "../../helpers/loadGastos";


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

            if (newGastoData.type === 'ingreso') {
                dispatch(obtenerIngresos()); // Llama al thunk para actualizar el total de ingresos
                dispatch(obtenerSaldoDisponible())
            }
            if (newGastoData.type === 'gasto') {
                dispatch(obtenerGastos()); // Llama al thunk para actualizar el total de ingresos
                dispatch(obtenerSaldoDisponible())
            }

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
            }, 1000); // Muestra el error por 3 segundos
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

export const obtenerIngresos = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe')
        const ingresos = await loadIngresos(uid)
        dispatch(setViewIngresos(ingresos))
    }
}

export const obtenerGastos = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe')
        const gastos = await loadMGastos(uid)
        dispatch(setViewGastos(gastos))
    }
}

export const obtenerSaldoDisponible = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const ingresos = await loadIngresos(uid)
        const gastos = await loadMGastos(uid)
        dispatch(setSaldoDisponible(ingresos - gastos))
    }
}


export const startDeletingGasto = (id, navigate) => {
    return async (dispatch, getState) => {
        dispatch(isSavingNewCosto());
        const { uid } = getState().auth;

        try {
            // Eliminar el documento de Firebase
            const docRef = doc(FirebaseDB, `${uid}/historico/gastos/${id}`);
            await deleteDoc(docRef);

            // Actualizar el estado
            dispatch(deleteMovimiento(id));

            // Actualizar los totales
            dispatch(obtenerIngresos());
            dispatch(obtenerGastos());
            dispatch(obtenerSaldoDisponible());

            // Mensaje de éxito
            dispatch(setSaveMessage('Transacción eliminada exitosamente.'));

            // Redireccionar después de un tiempo
            setTimeout(() => {
                dispatch(limpiarMessage());
                navigate('/control-gastos');
            }, 1000);

        } catch (error) {
            console.error('Error al eliminar la transacción:', error);
            dispatch(setSaveMessage('Error al eliminar la transacción.'));
            dispatch(isSavingNewCosto(false));

            setTimeout(() => {
                dispatch(limpiarMessage());
            }, 1000);
        }
    }
}



