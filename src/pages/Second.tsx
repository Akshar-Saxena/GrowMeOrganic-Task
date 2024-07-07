import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Second() {
    const navigate = useNavigate()

    useEffect(() => {
        const temp = localStorage.getItem("data") || null
        if (temp == null)
            navigate("/")
        temp != null && console.log(JSON.parse(temp))
    })

    return (
        <div>Second</div>
    )
}

export default Second