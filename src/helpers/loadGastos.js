import { collection, getDocs, orderBy, query } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadMGastos = async (uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe')

    const collectionRef = collection(FirebaseDB, `${uid}/historico/gastos`)
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const docs = await getDocs(q)


    const gastos = []
    docs.forEach(doc => {
        const data = doc.data();
        if (data.type === 'gasto') {
            gastos.push(data.amount)
        }
    })
    const gastoTotal = () => {
        let total = 0
        for (let i = 0; i < gastos.length; i++) {
            total += Number(gastos[i])
        }
        return total
    }
    
    return gastoTotal()
}