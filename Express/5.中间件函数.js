const express = require('express');

const app = express();

const m = function(req,res,next){
    console.log('中间件函数')
    next()
}

app.use(m)

//* 挂载路由
app.get('/aa', (req, res) => {res.send('get request')})

app.listen(80, () => {
  console.log('Server is running at http://127.0.0.1');
});
