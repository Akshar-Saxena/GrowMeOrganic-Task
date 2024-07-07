import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Loader from "../components/Loader";


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
                continue
            }
            if (str[i].toUpperCase() == str[i]) {
                newStr += " " + str[i]
                continue
            }
            newStr += str[i]
        }
        return newStr
    }

    const navigate = useNavigate()
    const [loading, setLoading] = useState<Boolean>(true)
    const [rows, setRows] = useState<posts[]>()
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
            {loading ? <Loader /> : <div className="bg-[#ffffff39] backdrop-blur-md p-10 pt-5 rounded-xl shadow-[2px_2px_10px_#ffffff39]">
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
            </div>}
        </div>
    )
}

export default Second