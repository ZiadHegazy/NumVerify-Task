import { useState } from 'react'
import './Register.css'
import { register } from '../../API/Login'
import { useNavigate } from 'react-router'
export function Register(){
    const navigate=useNavigate()
    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")
    const[confirmPass,setConfirmPass]=useState("")
    const handleusername=(event)=>{
        setUserName(event.target.value)
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value)
    }
    const handleConfirmPassword=(event)=>{
        setConfirmPass(event.target.value)
    }
    const handleRegister=async()=>{
        if(password==confirmPass){
            const result=await register(username,password)
            if(result=="ok"){
                navigate("/home")
            }
        }else{
            alert("Password is not matching")
        }
    }
    return(
        <div className="RegisterMaindiv">
            <div className="Registerflexdiv">
                <h1>Register</h1>
                <input onChange={handleusername} className="Registerusername" type="text" placeholder="Enter username"/>
                <input onChange={handlePassword} className="Registerusername" type="password" placeholder="Enter password"/>
                <input onChange={handleConfirmPassword} className="Registerusername" type="password" placeholder="Confirm password"/>
                <button onClick={handleRegister} className='RegisterRegisterbtn'>Register</button>
            </div>

        </div>
    )
}