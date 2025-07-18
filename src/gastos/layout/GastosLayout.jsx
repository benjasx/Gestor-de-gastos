import { Outlet } from "react-router"
import { NavBar } from "../components"


export const GastosLayout = () => {
    return (
        <>
            <div className="bg-slate-900 font-sans animate__animated animate__fadeIn animate__faster">
                {/* El contenedor principal ahora permite el scroll vertical si el contenido es muy largo */}
                <div className="relative min-h-screen w-full overflow-hidden max-w-md mx-auto">

                    {/* Formas curvas del fondo. Se usan `fixed` para que no se muevan con el scroll. */}
                    <div className="fixed -left-32 top-0 w-80 h-full bg-gray-100/90 rounded-full transform -rotate-45 scale-150"></div>
                    <div className="fixed -left-48 top-1/4 w-96 h-full bg-gray-100/50 rounded-full transform -rotate-45 scale-150"></div>

                    {/* Contenedor para todo el contenido visible, con un z-index para estar por encima del fondo. */}
                    <div className="relative z-10 p-6 flex flex-col min-h-screen">
                        <NavBar />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
