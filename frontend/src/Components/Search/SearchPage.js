import { useNavigate } from 'react-router'
import './SearchPage.css'
import { useState } from 'react'
import { numberSearch } from '../../API/Search'
import LinearProgress from "@mui/material/LinearProgress"
import  withAuth  from '../Authentication/RequireAuth'

function SearchPage(){
    const navigate=useNavigate()
    const[loading,setLoading]=useState(false)
    const[result,setResult]=useState("")
    const [number,setNumber]=useState("")
    const handleNumber=(event)=>{
        setResult("")
        setNumber(event.target.value)
    }
    const handleSearch=async()=>{
       setLoading(true)
       const result=await numberSearch(number)
       
       setResult(result)
       
       setLoading(false)
       
    }
    const Row=()=>{
        return(
           <table>
             <tr>
                <th>Phone Number</th>
                <th>Valid</th>
            </tr>
            <tr>
            <td>{number}</td>
                <td>{result.valid+""}</td>
            </tr>
           </table>
        )
    }
    return(
        <div className="SearchPageMaindiv">
            <div className="SearchPageflex">
                <h1>Search for a number</h1>
                <input onChange={handleNumber} className='SearchPageSearchbar' type='text' placeholder='Enter a phone number'/>
                <button onClick={handleSearch} className='SearchPagesearchbtn'>Search</button>
                <button onClick={()=>navigate("/searchHistory")} className='SearchPagesearchbtn'>Search History</button>
                {loading? <label>Loading ...</label>: (result!=""? <Row/>:<div></div>)}
            </div>

        </div>
    )
}
export default withAuth(SearchPage)