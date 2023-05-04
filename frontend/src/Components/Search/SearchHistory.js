import { useState } from "react"
import { getAllSearch } from "../../API/Search"
import './SearchHistory.css'
import  withAuth  from "../Authentication/RequireAuth"
function SearchHistory(){
    const data = [
        { name: "Anom", age: 19, gender: "Male" },
        { name: "Megha", age: 19, gender: "Female" },
        { name: "Subham", age: 25, gender: "Male"},
      ]
    const[history,setHistory]=useState([{ name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male"}])
    const[first,setFirst]=useState(0)
    const begin=async()=>{
        setHistory(await getAllSearch())
        setFirst(1)
    }
    if(first==0){
        begin()
    }
    const RestofRows=()=>{
        var table=document.getElementById("tabletoadd")
        for(var i=0;i<history.length;i++){
            var tr=document.createElement("tr");
            var td1=document.createElement("td")
            var td2=document.createElement("td")
            var td3=document.createElement("td")
            td1.innerHTML=history[i].phoneNumber
            td2.innerHTML=history[i].status
            td3.innerHTML=history[i].date
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            table.appendChild(tr)
        }
    }
    return(
        <div className="SearchHistMainDiv">
            <div className="SearchHistFlex">
            <div className="FilterHistory"></div>
            <table id="tabletoadd">
             <tr>
                <th>Phone Number</th>
                <th>Valid</th>
                <th>Date</th>
            </tr>
            {history.map((row)=>{
                return(
                    <tr>
                        <td>{row.phoneNumber}</td>
                        <td>{row.status}</td>
                        <td>{row.date}</td>
                    </tr>
                )
            })}
            
            
            
           </table>
            </div>
            
        </div>
    )
}
export default withAuth(SearchHistory)