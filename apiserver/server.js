const express = require('express')
const router = require('./router')

const app = express()

app.use(express.static('../public'))

// 数据接口
app.use('/hua',router)


app.listen(3000,()=>{
    console.log('server is running at port 3000')
})