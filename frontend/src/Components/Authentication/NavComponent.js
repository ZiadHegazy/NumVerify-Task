import { useEffect } from "react"
import { useNavigate } from "react-router"

export const NavComponent=()=>{
    const navigate=useNavigate()
    useEffect(()=>{
        
    navigate("/")
    })
    
    return(
        <div>

        </div>
    )
}