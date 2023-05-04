const api="http://localhost:8000"
export const login=async (username,password)=>{

    const result=await fetch(`${api}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
      })
    const j=await result.json();
    if(j=="error"){
        alert("Wrong username or password")
    }else{
        
        localStorage.setItem("token",j)
        return "ok"
    }
}
export const register =async(username,password)=>{
    const result=await fetch(`${api}/register`,{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
      })
    const j=await result.json()
    if(j=="already exists"){
        alert("Username already exists")
    }else{
        localStorage.setItem("token",j)
        return "ok"
    }
}
export const verifyToken=async ()=>{
    const result=await fetch(`${api}/verifyToken/${localStorage.getItem("token")}`)
    const j=await result.json()

    if(j=="error"){
        return false
    }else{
        return true
    }
}