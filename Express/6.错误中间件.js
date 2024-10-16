const express = require('express');
const app = express();

//* 1.定义路由
app.get('/', (req, res) => {
 //* 人为制造错误
 throw new Error('This is a custom error!');
 res.send('home page')
});

app.use(function(err,req,res,next){
    console.log('发生了错误 ,' +err.message) //服务器打印错误消息
    res.send('Error ,' + err.message) //向客户端打印错误消息
})

app.listen(80, () => {
  console.log('Server is running on port http://127.0.0.1')
});
