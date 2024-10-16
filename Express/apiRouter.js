//* 路由模块

//* 1.导入 express
const express = require('express')

const router = express.Router()

//* 挂载路由
router.get('/get', (req, res) => {
  //* 通过req.query获取url上的数据
  const quary = req.query
res.send({
  status:0,
  msg: 'GET 请求成功', 
  data: quary   //* 返回数据 
})
})


//* 2.post请求
router.post('/post', (req, res) => {
  //* 通过req.body获取数据  
  const body = req.body
  res.send({
    status: 0,
    msg: 'POST 请求成功',
    data: body,
  })
})


//* 4.1导出路由
module.exports = router