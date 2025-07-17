import { Route, Routes, BrowserRouter, Navigate } from "react-router"
import { LayoutAuth } from "../auth/layout/LayoutAuth"
import { RegisterPage, LoginPage } from "../auth/pages"
import { ControlPage } from "../gastos/pages"
import { useCheckAuth } from "../hooks/useCheckAuth"


export const AppRouter = () => {

    const { status } = useCheckAuth()

    if (status === 'checking') {
        return <div>Checking...</div>
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
                <Route path="/control-gastos" element={<ControlPage />} />
                <Route path="*" element={<Navigate to={'/control-gastos'} replace />} />
            </Routes>}

        </BrowserRouter>
    )
}