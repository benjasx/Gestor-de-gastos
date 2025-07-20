import { collection, getDocs, orderBy, query } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadIngresos = async (uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe')

    const collectionRef = collection(FirebaseDB, `${uid}/historico/gastos`)
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const docs = await getDocs(q)


    const ingresos = []
    docs.forEach(doc => {
        const data = doc.data();
        if (data.type === 'ingreso') {
            ingresos.push(data.amount)
        }
    })
    const ingresoTotal = () => {
        let total = 0
        for (let i = 0; i < ingresos.length; i++) {
            total += Number(ingresos[i])
        }
        return total
    }

    return ingresoTotal()
}