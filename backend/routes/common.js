const express=require("express")
const router=express.Router()
const User=require("../models/User")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
router.post("/login",async function(req,res){
    var username=req.body.username
    var password=req.body.password
    var results=await User.find({Username:username,Password:password})
    if(results.length==0){
        res.json("error")

    }else{
        var token=jwt.sign({id:results[0].id,username:username,password:password},process.env.ACCESSTOKEN)
        res.json(token)
    }
})
router.post("/register",async function(req,res){
    var username=req.body.username
    var password=req.body.password
    var total=(await User.find({})).length
    var results=await User.find({Username:username})
    if(results.length==0){
        var object=new User({id:total+1, Username:username,Password:password})
        object.save()
        var token=jwt.sign({id:total+1,username:username,password:password},process.env.ACCESSTOKEN)
        res.json(token)


    }else{
        res.json("already exists")
    }
})
router.get("/verifyToken/:token",function(req,res){
    var token=req.params.token
    try{
        jwt.verify(token,process.env.ACCESSTOKEN)
        
        res.json("ok")
    }catch{
        res.json("error")
    }
})
module.exports=router