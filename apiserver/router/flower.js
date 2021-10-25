
const express = require('express')
const db = require('../db')
const {
    formatData
} = require('../utils')

const router = express.Router()
module.exports = router
/* 爱情鲜花 */
router.get('/aiqing', async (req, res) => {
    const sql = `select * from aiqing limit 0,8`
    const data = await db(sql)
    res.send(formatData.success(data))
})
router.get('/pre-aiqing', async (req, res) => {
    //从url获取当前页
    let paege = req.query.paege * 1
    //查数据库总数
    let sql = `select * from aiqing`
    let data = await db(sql)
    //计算总页码数（30条数据一页）
    let Number = Math.ceil(data.length * 1 / 30)
    /* select * from 表名 limit 开始索引值，获取数据数量   */
    //如果当前页码为1,则归零（索引值）
    if (paege == 1) {
        paege = 0
    } else {
        paege = (paege - 1) * 30
    }
    //拼接sql语句
    sql += ` limit ${paege},30`
    data = await db(sql)
    //返回数据和总页码回前端
    res.send(formatData.success({
        data,
        paeNum: Number
    }))

})
/* 永生花 */
router.get('/yongsheng', async (req, res) => {
    const sql = `select * from yongsheng limit 0,8`
    const data = await db(sql)
    res.send(formatData.success(data))
})
router.get('/pre-yongsheng', async (req, res) => {
    let paege = req.query.paege * 1
    let sql = `select * from yongsheng`
    let data = await db(sql)
    let Number = Math.ceil(data.length * 1 / 30)
    if (paege == 1) {
        paege = 0
    } else {
        paege = (paege - 1) * 30
    }
    sql += ` limit ${paege},30`
    data = await db(sql)
    res.send(formatData.success({
        data,
        paeNum: Number
    }))
})
/* 送长辈鲜花 */
router.get('/zhangbei', async (req, res) => {
    const sql = `select * from zhangbei limit 0,8`
    const data = await db(sql)
    res.send(formatData.success(data))
})
router.get('/pre-zhangbei', async (req, res) => {
    let paege = req.query.paege * 1
    let sql = `select * from zhangbei`
    let data = await db(sql)
    let Number = Math.ceil(data.length * 1 / 30)
    if (paege == 1) {
        paege = 0
    } else {
        paege = (paege - 1) * 30
    }
    sql += ` limit ${paege},30`
    data = await db(sql)
    res.send(formatData.success({
        data,
        paeNum: Number
    }))
})
/* 礼品 */
router.get('/lipin', async (req, res) => {
    const sql = `select * from lipin limit 0,10`
    const data = await db(sql)
    res.send(formatData.success(data))
})
router.get('/pre-lipin', async (req, res) => {
    let paege = req.query.paege * 1
    let sql = `select * from lipin`
    let data = await db(sql)
    let Number = Math.ceil(data.length * 1 / 30)
    if (paege == 1) {
        paege = 0
    } else {
        paege = (paege - 1) * 30
    }
    sql += ` limit ${paege},30`
    data = await db(sql)
    res.send(formatData.success({
        data,
        paeNum: Number
    }))
})
/* 详情页 */
router.get('/details',async function (req, res) {
    const id = req.query.id
    const sql = `SELECT * from aiqing where id=${id} UNION SELECT * from yongsheng where id=${id} UNION SELECT * from zhangbei where id=${id} UNION SELECT * from lipin where id=${id}`
    const data = await db(sql)
    res.send(formatData.success(data))
})