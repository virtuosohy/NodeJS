//* 路由模块

//* 1.导入 express
const express = require('express')

//* 2.创建路由对象
const router = express.Router()

//* 3.挂载具体路由
router.get('/user/list', (req, res) => {res.send('user list')})
router.post('/user/add', (req, res) => {res.send('add user')})
//* 4.1导出路由
module.exports = router