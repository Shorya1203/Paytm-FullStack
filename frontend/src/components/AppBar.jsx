import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { use, useEffect, useState } from "react";
import axios from "axios";

export const AppBar = () => {

    const navigate = useNavigate() ; 
    const [user, setUser] = useState("U")

    useEffect(() => {
        const userToken = localStorage.getItem("token") ; 

        if(!userToken) {
            navigate('/signin')
        }
        else {
            setUser(localStorage.getItem('username'))
        }
    },[])

    const signOutHandler = () => {
        localStorage.removeItem("token") ; 
        navigate('/signin')
    }
    
    return (
   
        <div className="shadow h-14 flex justify-between items-center md:px-10">
            <Link to={"/dashboard"}>
                <div className="flex flex-col justify-center h-full ml-4 font-bold">
                PayTM App
                </div>
            </Link>
            <div className="flex items-center justify-center gap-2">
                <Button label={"Sign Out"} onClick={signOutHandler} />
                <div className="flex flex-col justify-center h-full mr-4">
                {user?.firstName}
                </div>
                <div className="rounded-full h-10 w-10 p-4 bg-slate-200 flex justify-center mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {(user?.[0]).toUpperCase()}
                </div>
                </div>
            </div>
         </div>
    );
}