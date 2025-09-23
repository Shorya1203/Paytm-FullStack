import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import axios from "axios";

export const Users = () => {

    const [users, setUsers] = useState([]) ; 
    const [filter, setFilter] = useState("") ; 


    useEffect(() => {

        const userToken = localStorage.getItem("token") ;

        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorization: userToken
            }
        })
        .then((response) => {
            setUsers(response.data.user)
        }) ; 
    }, [filter])


    return (
        <>
            <div className = 'font-bold mt-6 text-lg'> Users </div>
            <div className="mt-4 mb-10">
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }}
                type = 'text'
                placeholder="Search Users..."
                className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {users.map((user) => (
                    <User key = {user} user = {user}/>
                ))}
            </div>
        </>
    )
}

function User({user}) 
{
    const navigate = useNavigate() ; 

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div>
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {user.firstName[0].toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className = "flex flex-col justify-center h-full">
                    <div className="font-bold text-md">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className = "flex flex-col justify-center h-full">
                <Button onClick = {(e) => {
                    navigate('/send?id=' + user.username + "&name=" + user.firstName
                    )}}
                    label = {"Send Money"}/>
            </div>
        </div>
    )
}