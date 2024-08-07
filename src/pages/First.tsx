import { Alert, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function First() {

    const navigate = useNavigate()

    useEffect(() => {
        const msg = localStorage.getItem("toast") || undefined
        console.log(msg)
        setAlertMsg(msg != undefined ? msg : "No message")
        setTimeout(() => {
            setAlertMsg("No message")
            localStorage.removeItem("toast")
        }, 3000);
    }, [])

    interface inputData {
        name: string,
        phno: string,
        email: string,
    }

    const [data, setData] = useState<inputData>({
        name: "",
        phno: "",
        email: ""
    })

    const [alertMsg, setAlertMsg] = useState<String>("No message")

    const handleSubmit = () => {
        if (data.name == "" || data.phno == "" || data.email == "") {
            setAlertMsg("Enter each fields")
            setTimeout(() => {
                setAlertMsg("No message")
            }, 5000);
            return
        }
        if (!/^[5-9]\d{9}$/.test(data.phno)) {
            setAlertMsg("Enter a valid 10 digits phone number")
            setTimeout(() => {
                setAlertMsg("No message")
            }, 5000);
            return
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
            setAlertMsg("Enter a valid email address")
            setTimeout(() => {
                setAlertMsg("No message")
            }, 5000);
            return
        }
        setData({ name: data.name.trim(), email: data.email.trim(), phno: data.phno.trim() })
        localStorage.setItem("data", JSON.stringify(data))
        navigate("/dashboard")
    }

    return (
        <div className="flex flex-col h-screen bg-[url('https://i.pinimg.com/originals/3f/64/58/3f6458487cacd6d4120ea06f02856a47.jpg')] bg-cover bg-center w-[100%] justify-center items-center">
            {alertMsg != "No message" && <Alert className="absolute top-5 left-5" severity="error">{alertMsg}</Alert>}
            <div>
                <h1 className="text-white font-bold text-4xl text-center pb-6">User Details</h1>
                <div className="flex bg-[#ffffff29] backdrop-blur-xl flex-col p-12 rounded-md drop-shadow-[4px_4px_4px_black] w-[400px] m-auto justify-between h-[40vh]">
                    <TextField className="bg-[rgba(255, 255, 255, 0.224)] text-white" id="filled-basic" label="Name" variant="filled" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                    <TextField className="bg-[rgba(255, 255, 255, 0.224)] text-white" id="filled-basic" label="Phone" variant="filled" value={data.phno} onChange={(e) => setData({ ...data, phno: e.target.value })} />
                    <TextField className="bg-[rgba(255, 255, 255, 0.224)] text-white" id="filled-basic" label="Email" variant="filled" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                </div>
            </div>
            <button className="bg-blue-800 text-white outline oultine-1 oultine-white px-8 py-2 mt-6 rounded-xl hover:drop-shadow-[0px_0px_4px_white]" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default First