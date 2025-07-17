import { Outlet } from "react-router"

export const LayoutAuth = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center px-5 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
