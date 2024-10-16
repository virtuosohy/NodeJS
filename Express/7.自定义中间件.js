const express = require('express');
const app = express();
//导入querystring模块
const querystring = require('querystring');



//定义解析表单数据的中间件
app.use(function(req,res,next){
   //* 1.定义str来接受客户端发送的数据
    let str = '';
    //* 2.监听data事件
    req.on('data', chunk => {
        str += chunk;
    })
    //* 3.监听end事件
req.on('end', () => {
  //* str中存放完整的请求体数据
  //* 将字符串里面的数据解析成对象格式
     const body =  querystring.parse(str)
    req.body = body;
    next();
     
})
})

app.post('/user', (req, res) => {
  res.send(req.body)
})


app.listen(80, () => {
  console.log('Server is running on port http://127.0.0.1')
});
