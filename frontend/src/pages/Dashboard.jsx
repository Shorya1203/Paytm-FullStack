import { useEffect, useLayoutEffect, useState } from 'react'
import { AppBar } from '../components/AppBar'
import { Users } from '../components/Users'
import { useNavigate } from 'react-router-dom'
import {Balance} from '../components/Balance'
import axios from 'axios'

export const Dashboard = () => {
    
    const [bal, setBal] = useState(0) ; 
    const navigate = useNavigate() ; 

    useEffect(() => {
        const userToken = localStorage.getItem('token') ; 

        if(!userToken) 
        {
            navigate('/signin') ;  
        } else {
            axios.get('http://localhost:3000/api/v1/account/balance',{
                headers: {
                    Authorization: userToken
                }
            }).then((response) => {
                setBal(response.data.balance) ; 
            })
            .catch((error) => {
                navigate('/signin')
            })
        }
    }, [navigate])

    return (
        <div>
            <AppBar></AppBar>
            <div className='m-8'>
                <Balance value = {bal}/>
                <Users/>
            </div>
        </div>

    )

    
}