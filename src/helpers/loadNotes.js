import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadGastos = async(uid = '') => {
    
    if (!uid) throw new Error('El UID del usuario no existe')
    
    const collectionRef = collection(FirebaseDB, `${uid}/historico/gastos`)
    const docs = await getDocs(collectionRef)
    
    const gastos = []
    docs.forEach(doc => {
        gastos.push({ id: doc.id, ...doc.data() })
    })

    return gastos
}

