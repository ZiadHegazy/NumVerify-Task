import { Navigate, redirect, useNavigate } from "react-router";
import React, { useEffect } from 'react'
import { verifyToken } from "../../API/Login";
import { NavComponent } from "./NavComponent";
import { Login } from "../Login/Login";
//  function RequireAuth(WrappedComponent){
//     const Component=(props)=>{
//         const navigate=useNavigate()
//         var flag=false;
//         const begin=async ()=>{
//             if(localStorage.getItem("token") && (await verifyToken())){
//                 flag=true;
            
        
                
//             }else{
              
//               alert("Login first")
              
//               window.location.href="/"
              
//             }
//           }
//           begin()
//         return flag? <WrappedComponent {...props}/>:<NavComponent/>
//     }
//     return Component
// }
export function RequireAuth(WrappedComponent){
    return class extends React.Component {
        
        componentDidMount() {
            console.log(`Component ${WrappedComponent.name} mounted`);
          
        }
    
        render() {
          
          const begin=async()=>{
            if(localStorage.getItem("token") && (await verifyToken())){
                
                
            }else{
              
              alert("Login first")
              
              window.location.href="/"
              
              
            }
          }
          begin()
          
          
          return <WrappedComponent {...this.props} />;
        }
      };
}

export default RequireAuth