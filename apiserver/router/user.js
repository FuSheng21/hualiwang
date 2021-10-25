const express = require('express')
const db = require('../db')
const {formatData}=require('../utils')

const router = express.Router();
module.exports = router;
//  hua/user/list
router.get('/list', async (req, res) => {
    const sql = `select * from user`
    console.log(sql);
    const data = await db(sql)
        res.send(formatData.success(data))
})
router.post('/cartlist',async function(req,res){
        const cartlist=req.body.currenCartlist
        const {id}=req.query
        const sql=`update user set catlist='${cartlist}' where id=${id}`
        db(sql)
})
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const sql = `select * from user where id=${id}`
    const data = await db(sql)
    if(data.length>0){
        res.send(formatData.success(data))
    }else{
        res.send(formatData.fail())
    }
})