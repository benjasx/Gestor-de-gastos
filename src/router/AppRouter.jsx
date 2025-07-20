import { Route, Routes, BrowserRouter, Navigate } from "react-router"
import { LayoutAuth } from "../auth/layout/LayoutAuth"
import { RegisterPage, LoginPage } from "../auth/pages"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { GastosLayout, MainLayout, AddNewGasto} from "../gastos/layout"
import { Spinner } from "../utils/Spinner"


export const AppRouter = () => {

    const { status } = useCheckAuth()

    if (status === 'checking') {
        return <Spinner/>
    }

    return (
        <BrowserRouter>
            {status === "not-authenticated" ? <Routes>
                <Route path="auth" element={<LayoutAuth />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="*" element={<Navigate to={'/auth/login'} replace />} />
            </Routes> : <Routes>
                <Route path="control-gastos" element={<GastosLayout />}>
                    <Route index element={<MainLayout/>} />
                    <Route path="addNewGasto" element={<AddNewGasto/>} />
                </Route>
                <Route path="*" element={<Navigate to={'/control-gastos'} replace />} />
            </Routes>}

        </BrowserRouter>
    )
}