const express=require("express")
const router=express.Router()
const User=require("../models/User")
const Search=require("../models/Search")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
router.post("/search/:token",async function(req,res){
    var number=req.body.number
    var token=req.params.token
    var user=jwt.verify(token,process.env.ACCESSTOKEN)
    var resultUser=await User.find({id:user.id})
    var history=resultUser[0].history
    
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();
    var date1=date+"-"+month+"-"+year
    var status=req.body.status
    var allsearch=(await Search.find({})).length;
    history.push(allsearch+1)
    await User.findOneAndUpdate({id:user.id},{history:history})
    var object=new Search({id:allsearch+1,phoneNumber:number,status:status,date:date1})
    object.save()

    res.json({number:number,status:status})


})
router.get("/allsearch/:token",async function(req,res){
    try{
        var token=req.params.token
        var user=jwt.verify(token,process.env.ACCESSTOKEN)
        var results=await Search.find({})
        res.json(results)
    }catch{
        res.json("error")
    }

})
router.get("/myallsearch/:token",async function(req,res){
    try{
        var token=req.params.token
        var user=jwt.verify(token,process.env.ACCESSTOKEN)
        var results=await Search.find({})
        var userFind=await User.find({id:user.id})
        var history=userFind[0].history
        var finalarr=[];
        for(var i=0;i<results.length;i++){
            if(history.includes(results[i].id)){
                finalarr.push(results[i])
            }
        }
        res.json(finalarr)
    }catch{
        res.json("error")
    }

})
router.get("/filterSearch/:number/:date/:status/:token",async function(req,res){
    try{
        var token=req.params.token
        var user=jwt.verify(token,process.env.ACCESSTOKEN)
        var number=req.params.number
        var date=req.params.date
        var status=req.params.status
        var query={}
        if(number!=-1){
            query.phoneNumber=number
        }
        if(date != -1){
            query.date=date
        }
        if(status!=-1){
            query.status=status
        }
        
        console.log({phoneNumber:query.phoneNumber,date:query.date,status:query.status})
        var results=await Search.find(query)
        
        res.json(results)
    }catch{
        res.json("error")
    }
})
router.get("/filterMySearch/:number/:date/:status/:token",async function(req,res){
    try{
        var token=req.params.token
        var user=jwt.verify(token,process.env.ACCESSTOKEN)
        var foundUser=await User.findOne({id:user.id})
        var number=req.params.number
        var date=req.params.date
        var status=req.params.status
        var query={}
        if(number!=-1){
            query.number=number
        }
        if(date != -1){
            query.date=date
        }
        if(status!=-1){
            query.status=status
        }
        var results=await Search.find({query})
        var history=foundUser.history
        var finalarr=[]
        for(var i=0;i<results.length;i++){
            if(history.includes(results[i].id)){
                finalarr.push(results[i])
            }
        }
        res.json(finalarr)
    }catch{
        res.json("error")
    }
})
module.exports=router