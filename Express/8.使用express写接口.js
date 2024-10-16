const express = require('express');

const app = express();

//* 解析post请求体
app.use(express.urlencoded({ extended: false }));

//* 要在路由之前配置cors中间件
const cors = require('cors')
app.use(cors())

const router =require('./apiRouter.js');
//* 注册路由到app上
app.use('/api', router);


app.listen(80, () => {
  console.log('Server is running at http://127.0.0.1');
});
