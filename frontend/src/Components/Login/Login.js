import './Login.css'
import {useState} from 'react'
import {useNavigate} from 'react-router'
import { login } from '../../API/Login';
export function Login(){
    const navigate=useNavigate()
    const[username,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const handleusername=(event)=>{
        setUserName(event.target.value)
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value)
    }
    const handleLogin=async ()=>{
        const result=await login(username,password)
        if(result=="ok"){
            navigate("/home")
        }
    }
    return(
        <div className='LoginMainDiv'>
            <div className='LoginFlexColumn'>
                <h1>Sign in</h1>
                <input onChange={handleusername} className='Loginusername' placeholder='Enter username'/>
                <input onChange={handlePassword} type='password' className='Loginusername' placeholder='Enter password'/>
                <button className='LoginLoginbtn' onClick={handleLogin}>Login</button>
                <button className='LoginLoginbtn'onClick={()=>navigate("/register")}>Register</button>
            </div>
        </div>
    )
}