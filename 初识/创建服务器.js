// 1.导入 http 模块
const http = require('http')
// 2.创建 web 服务器实例
const server = http.createServer()
// 3.为服务器实例绑定 request 事件，监听客户端的请求
server.on('request' ,function(req , res) {
    //只要有客户端请求服务器，就会触发request事件，从而调用事件处理函数
    const str = `URl 是 ${req.url},请求方法是 ${req.method}`
    res.setHeader('Content-Type','text/html;charset=utf8')
    console.log(str)
    res.end(str)
})
// 4.启动服务器
server.listen(80,() => {
    console.log('http server running at http://127.0.0.1')
})