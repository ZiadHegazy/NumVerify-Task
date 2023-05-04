const api="http://localhost:8000/searches"
export const getAllSearch=async()=>{
    const result=await fetch(`${api}/allsearch/${localStorage.getItem("token")}`)
    const j= await result.json()
    if(j=="error"){
        return "error"

    }else{
        return j
    }
}
export const getMyAllSearch=async()=>{
    const result=await fetch(`${api}/myallsearch/${localStorage.getItem("token")}`)
    const j= await result.json()
    if(j=="error"){
        return "error"

    }else{
        return j
    }
}
export const filterAllSearch=async(number,date,status)=>{
    var tempnumber= number!=""? number:"-1"
    var tempdate= date!=""? date:"-1"
    var tempstatus=status!=""? status:"-1"
    const result=await fetch(`${api}/filterSearch/${tempnumber}/${tempdate}/${tempstatus}/${localStorage.getItem("token")}`)
    const j= await result.json()
    if(j=="error"){
        return "error"

    }else{
        return j
    }

}
export const filterMySearch=async(number,date,status)=>{
    var tempnumber= number!=""? number:"-1"
    var tempdate= date!=""? date:"-1"
    var tempstatus=status!=""? status:"-1"
    const result=await fetch(`${api}/filterMySearch/${tempnumber}/${tempdate}/${tempstatus}/${localStorage.getItem("token")}`)
    const j= await result.json()
    if(j=="error"){
        return "error"

    }else{
        return j
    }

}
export const numberSearch=async(number)=>{
    var myHeaders = new Headers();
    myHeaders.append("apikey", "FdOZJn536vDZFOtIguv3dqiS4gKLueED");
    const results=await fetch(`https://api.apilayer.com/number_verification/validate?number=${number}`,{
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    })
    const final=await results.json()
    const j=await fetch(`${api}/search/${localStorage.getItem("token")}`,{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            status: final.valid+"",
            number: number
        })
      })
    return final
}