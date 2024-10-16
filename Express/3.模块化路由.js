const express = require('express');

const app = express();

//* 导入路由模块
const router = require('./4.Router.js');
//* 注册路由
app.use(router);


app.listen(80, () => {
  console.log('Server is running at http://127.0.0.1:80');
});
