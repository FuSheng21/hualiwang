const express=require('express')
const regRouter=require('./reg')
const loginRouter=require('./login')
const userRouter=require('./user')
const flowerRouter=require('./flower')

const router=express.Router();
module.exports=router

router.use(
    express.urlencoded({extended:false}),
    express.json()
)

router.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    next();
})

router.use('/user',userRouter)
router.use('/reg',regRouter)
router.use('/login',loginRouter)
router.use('/flower',flowerRouter)
