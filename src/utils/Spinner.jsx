import { Loader2 } from "lucide-react"

export const Spinner = () => {
    return (
        <div className="min-h-screen bg-primary p-4 flex flex-col items-center justify-center">
            <div className="flex justify-center">
                <Loader2 className="size-20 animate-spin text-blue-800" />
            </div>
        </div>
    )
}
