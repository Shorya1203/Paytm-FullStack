import { useState, useEffect} from 'react'
import { BottomWarning } from '../components/BottomWarning'
import { Button } from '../components/Button'
import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { SubHeading } from '../components/SubHeading'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("token");

        if (userToken) {
        navigate("/dashboard"); 
        }
    }, []);

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className='flex flex-col justify-center'>
                <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                    <Heading label={'Sign in'}></Heading>
                    <SubHeading label="Enter your credentials to access your account"></SubHeading>
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                        placeholder={'shorya@gmail.com'} label={'Email'}></InputBox>
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                        placeholder={'123456'} label={'Password'}></InputBox>
                    <div>
                        <Button onClick={async () => {
                            const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                                username, password
                            })

                            localStorage.setItem("token", `Bearer ${response.data.token}`)
                            localStorage.setItem("username", response.data.username)
                        }} label={'Sign in'}></Button>
                    </div>
                    <BottomWarning label={"Dont have an account?"} buttonText={"Sign Up"} to={'/signup'}></BottomWarning>
                </div>
            </div>
        </div>

    )
}