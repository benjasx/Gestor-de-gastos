import { LogOut, Menu } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../store/auth"


export const NavBar = () => {
    const dispacth = useDispatch()
    const { displayName } = useSelector(state => state.auth)

    const onLogout = () => {
        dispacth(startLogout())
    }
    return (

        < header className="flex justify-between items-center mb-16 text-white flex-shrink-0" >
            <button className="p-2 rounded-lg transition-colors hover:bg-slate-800 hidden">
                <Menu size={28} />
            </button>
            <h1 className="text-xl font-semibold">{displayName}</h1>
            <button onClick={onLogout} className="p-2 rounded-lg transition-colors hover:bg-red-800 cursor-pointer">
                <LogOut size={28} />
            </button>
        </header >

    )
}
