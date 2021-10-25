const express=require('express')
const db=require('../db')
const {formatData}=require('../utils')

const router=express.Router()
module.exports=router;
// http://localhost:3000/hua/login
router.post('/',async (req,res)=>{
    const {username,password}=req.query;
    const sql=`select id,username,catlist from user where username='${username}' and password=${password}`
    const data=await db(sql);
    let resData=data[0]
    if(data.length>0){
        res.send(formatData.success(resData))
    }else{
        res.send(formatData.fail())
    }
})