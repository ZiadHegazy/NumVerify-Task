import { useState } from "react"
import { filterAllSearch, getAllSearch } from "../../API/Search"
import './SearchHistory.css'
import './SearchPage.css'
import  withAuth  from "../Authentication/RequireAuth"
function SearchHistory(){
    const [filternumber,setFilterNumber]=useState("")
    const [filterDate,setFilterDate]=useState("")
    const [filterValid,setFilterValid]=useState("")
    const data = [
        { name: "Anom", age: 19, gender: "Male" },
        { name: "Megha", age: 19, gender: "Female" },
        { name: "Subham", age: 25, gender: "Male"},
      ]
    const[history,setHistory]=useState([{ name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male"}])
    const[filteredHistory,setFilteredHistory]=useState([])
    const[first,setFirst]=useState(0)
    const begin=async()=>{
        setHistory(await getAllSearch())
        setFirst(1)
    }
    if(first==0){
        begin()
    }
    const handleNumber=(event)=>{
        setFilterNumber(event.target.value)
    }
    const handleValid=(event)=>{
        if(event.target.value=="all"){
            setFilterValid("")
        }else{
            setFilterValid(event.target.value)
        }
        
    }
    const handleDate=(event)=>{
        var arr=event.target.value.split("-")
        var day=arr[2]
        var month=arr[1]
        var year=arr[0]
        var date=day+"-"+month+"-"+year
        setFilterDate(date)
        
    }
    const handleFilter=async()=>{
        const results=await filterAllSearch(filternumber,filterDate,filterValid)
        setHistory(results)


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
            <div className="FilterHistory">
                <label><strong>Filter By</strong></label>
                <input className="SearchPageSearchbarHistory" onChange={handleDate} type="date" placeholder="Search date"/>
                <input className="SearchPageSearchbar" onChange={handleNumber} type="text" placeholder="Enter number"/>
                <select className="SearchPageSearchbarHistory"  onChange={handleValid} placeholder="Select validity">
                    <option>all</option>
                    <option>true</option>
                    <option>false</option>
                </select>
                <button onClick={handleFilter} className="SearchPagesearchbtn">Filter</button>
            </div>
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