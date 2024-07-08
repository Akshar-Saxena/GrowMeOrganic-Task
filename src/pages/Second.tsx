import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Loader from "../components/Loader";
import { Checkbox } from "@mui/material";


function Second() {

    interface posts {
        "userId": number,
        "id": number,
        "title": String,
        "body": String
    }

    const jsonData = [
        {
            "department": "customer_service",
            "sub_departments": [
                "support",
                "customer_success"
            ]
        },
        {
            "department": "design",
            "sub_departments": [
                "graphic_design",
                "product_design",
                "web_design"
            ]
        }
    ]

    const captialize = (str: String) => {
        let newStr: string = ""
        for (let i = 0; i < str.length; i++) {
            if (i === 0) {
                newStr += str[i].toUpperCase()
                continue;
            }
            if (str[i].toUpperCase() == str[i]) {
                newStr += " " + str[i]
                continue;
            }
            newStr += str[i]
        }
        return newStr
    }

    const navigate = useNavigate()
    const [loading, setLoading] = useState<Boolean>(true)
    const [rows, setRows] = useState<posts[]>()
    const [open1, setOpen1] = useState<boolean>(false)
    const [open2, setOpen2] = useState<boolean>(false)
    const [check1, setCheck1] = useState<boolean>(false)
    const [check2, setCheck2] = useState<boolean>(false)
    const [check11, setCheck11] = useState<boolean>(false)
    const [check12, setCheck12] = useState<boolean>(false)
    const [check21, setCheck21] = useState<boolean>(false)
    const [check22, setCheck22] = useState<boolean>(false)
    const [check23, setCheck23] = useState<boolean>(false)
    const [col, setCol] = useState<GridColDef<(posts[])[number]>[]>()

    const fetchApi = () => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setRows(response.data)
                let temp: GridColDef<(posts[])[number]>[] = [];
                Object.keys(response.data[0]).forEach(element => {
                    temp.push({ field: element, headerName: captialize(element), width: element.toLowerCase().includes("id") ? 75 : 225, editable: element == "id" ? false : true })
                });
                setCol(temp)
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
            })
            .catch(err => {
                console.log("Error occurred while fetching posts : " + err.message)
                setLoading(false)
            })
    }

    useEffect(() => {
        const temp = localStorage.getItem("data") || null
        if (temp == null) {
            localStorage.setItem("toast", "Enter the User Details Before Accessing the Page")
            navigate("/")
        }
        fetchApi()
    }, [])


    return (
        <div>
            {loading ? <Loader /> : <div className={`bg-[url('https://i.pinimg.com/originals/3f/64/58/3f6458487cacd6d4120ea06f02856a47.jpg')] bg-center bg-cover bg-no-repeat text-white flex justify-center items-center h-[100vh] w-[200%] bg-fixed`}>
                <div className="flex w-full h-screen">
                    <div className="w-screen h-screen flex justify-center items-center">
                        <button className="absolute right-5 bg-gray-800 p-4 px-7 rounded-xl bottom-5 hover:outline shadow-lg shadow-gray-700 hover:outline-1 hover:outline-white" onClick={() => {
                            scrollTo(3000, 0)
                        }}>Take to Component 2</button>
                        <button className="absolute left-5 bg-red-800 py-2 px-5 rounded-xl top-5 hover:outline shadow-lg shadow-red-700 hover:outline-1 hover:outline-white" onClick={() => {
                            setLoading(true)
                            localStorage.removeItem("data")
                            navigate("/")
                        }}>Logout</button>
                        <div className="bg-[#ffffff39] backdrop-blur-md p-10 pt-5 rounded-xl shadow-[2px_2px_10px_#ffffff39] flex flex-col w-[60%] h-[500px]">
                            <h1 className="font-bold text-2xl mb-5 text-center">Component - 1</h1>
                            {rows != undefined && col != undefined && <DataGrid
                                rows={rows}
                                columns={col}
                                className="cursor-pointer"
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                sx={{
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: '#1976d2',
                                    },
                                    '& .MuiDataGrid-cell': {
                                        color: 'white',
                                    },
                                    '& .MuiDataGrid-footerContainer': {
                                        backgroundColor: '#1976d2',
                                    },
                                    '& .MuiDataGrid-row:hover': {
                                        backgroundColor: 'black',
                                    },
                                }}
                                pageSizeOptions={[10]}
                            />}
                        </div>
                    </div>
                    <div className="w-screen relative flex flex-col justify-start items-center h-screen">
                        <button className="absolute right-5 bg-gray-800 p-4 px-7 rounded-xl bottom-5 hover:outline shadow-lg shadow-gray-700 hover:outline-1 hover:outline-white" onClick={() => {
                            scrollTo(0, 0)
                        }}>Take to Component 1</button>
                        <div className="bg-[#ffffff4e] w-[400px] mt-[20vh] backdrop-blur-md p-6 rounded-xl shadow-[2px_2px_10px_#ffffff39]">
                            <h1 className="font-bold text-2xl mb-5 text-center">Component-2</h1>
                            <ul>
                                {jsonData.map((element, id) => (
                                    <div key={id} className="flex flex-col">
                                        <div className="flex justify-start items-center"><img onClick={() => {
                                            if (id == 0) {
                                                setOpen1(!open1)
                                            }
                                            else {
                                                setOpen2(!open2)
                                            }
                                        }} className="font-bold w-[15px] text-lg cursor-pointer" src={id == 0 ? (open1 ? "./minus.png" : "./plus.png") : (open2 ? "./minus.png" : "./plus.png")} />
                                            <Checkbox onClick={() => {
                                                if (id == 0) {
                                                    setCheck1(!check1)
                                                    setCheck11(!check1)
                                                    setCheck12(!check1)
                                                }
                                                else {
                                                    setCheck2(!check2)
                                                    setCheck21(!check2)
                                                    setCheck22(!check2)
                                                    setCheck23(!check2)
                                                }
                                            }} checked={id == 0 ? check1 || (check11 && check12) : check2 || (check21 && check22 && check23)} />
                                            <label>{element.department}</label></div>
                                        {open1 && id == 0 && <ul className="flex ml-20 flex-col">
                                            {element.sub_departments.map((ele, id) => (
                                                <div>
                                                    <Checkbox onClick={() => {
                                                        if (id == 0) {
                                                            setCheck11(!check11)
                                                        }
                                                        else {
                                                            setCheck12(!check12)
                                                        }
                                                    }} checked={check1 || (id == 0 ? check11 : check12)} />
                                                    <label>{ele}</label>
                                                </div>
                                            ))}
                                        </ul>}
                                        {open2 && id == 1 && <ul className="flex ml-20 flex-col">
                                            {element.sub_departments.map((ele, id) => (
                                                <div>
                                                    <Checkbox onClick={() => {
                                                        if (id == 0) {
                                                            setCheck21(!check21)
                                                        }
                                                        else if (id == 1) {
                                                            setCheck22(!check22)
                                                        }
                                                        else {
                                                            setCheck23(!check23)
                                                        }
                                                    }} checked={check2 || (id == 0 ? check21 : id == 1 ? check22 : check23)} />
                                                    <label>{ele}</label>
                                                </div>
                                            ))}
                                        </ul>}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div></div >}
        </div >
    )
}

export default Second