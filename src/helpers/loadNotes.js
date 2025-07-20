import { collection, getDocs, orderBy, query } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadGastos = async (uid = '') => {

    if (!uid) throw new Error('El UID del usuario no existe')

    const collectionRef = collection(FirebaseDB, `${uid}/historico/gastos`)
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const docs = await getDocs(q)

    const gastos = []
    docs.forEach(doc => {
        const data = doc.data();
        gastos.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toMillis() : null // Si createdAt existe, lo convierte. Si no, lo deja en null.
        });
    });

    console.log(gastos)
    return gastos
}

