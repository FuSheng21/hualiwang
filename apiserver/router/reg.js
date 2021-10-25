const express=require('express')
const db=require('../db')
const {formatData}=require('../utils')

const router=express.Router()
module.exports=router
// http://localhost:3000/hua/reg/check
router.get('/check', async (req, res) => {
    const {
        username
    } = req.query;
    const sql = `select username from user where username='${username}'`
    const data = await db(sql)
    if (data.length > 0) {
        res.send(formatData.fail(data))
    } else {
        res.send(formatData.success(data))
    }
})

router.post('/', async (req, res) => {
        const {
            username,
            password
        } = req.query;
        const sql = `insert into user (username,password) values('${username}',${password})`
        console.log(sql);
        const data = await db(sql)
        if (data.insertId) {
            res.send(formatData.success())
        } else {}
        res.send(formatData.fail())
    }

)