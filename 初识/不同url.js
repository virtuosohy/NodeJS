// 1.导入 http 模块
const http = require('http')
// 2.创建 web 服务器实例
const server = http.createServer()
// 3.为服务器实例绑定 request 事件，监听客户端的请求
server.on('request' ,function(req , res) {
   const url = req.url
   let content = '<h1>404 Not Found!</h1>'   //* 定义默认的响应内容
if(url === '/'||url === '/index.html') {
  content = '<h1>首页</h1>'   //* 定义首页的响应内容
} else if(url === '/about.html') {
  content = '<h1>关于</h1>'   //* 定义关于的响应内容
} 
 res.setHeader('Content-Type','text/html;charset=utf8')
 res
})
// 4.启动服务器
server.listen(80,() => {
    console.log('http server running at http://127.0.0.1')
})