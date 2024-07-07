import { TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function First() {

    const navigate = useNavigate()

    interface inputData {
        name: String,
        phno: String,
        email: String,
    }

    const [data, setData] = useState<inputData>({
        name: "",
        phno: "",
        email: ""
    })

    const handleSubmit = () => {
        setData({ name: data.name.trim(), email: data.email.trim(), phno: data.phno.trim() })
        localStorage.setItem("data", JSON.stringify(data))
        navigate("/dashboard")
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-white font-bold text-4xl text-center pb-6">User Details</h1>
            <div className="flex bg-[#ffffff29] backdrop-blur-xl flex-col p-12 rounded-md drop-shadow-[4px_4px_4px_black] w-[400px] m-auto justify-between h-[40vh]">
                <TextField className="bg-[rgba(255, 255, 255, 0.224)] text-white" id="filled-basic" label="Name" variant="filled" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                <TextField className="bg-[rgba(255, 255, 255, 0.224)] text-white" id="filled-basic" label="Phone" variant="filled" value={data.phno} onChange={(e) => setData({ ...data, phno: e.target.value })} />
                <TextField className="bg-[rgba(255, 255, 255, 0.224)] text-white" id="filled-basic" label="Email" variant="filled" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
            <button className="bg-blue-800 outline oultine-1 oultine-white px-8 py-2 mt-6 rounded-xl hover:drop-shadow-[0px_0px_4px_white]" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default First