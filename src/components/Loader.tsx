import { LinearProgress } from "@mui/material"

function Loader() {
    return (
        <div className="w-full flex justify-center items-center absolute top-0 left-0 h-screen bg-gray-900">
            <div>
                <LinearProgress />
                <h1 className="font-bold text-lg mt-6">Getting things Ready for you..</h1>
            </div>
        </div>
    )
}

export default Loader