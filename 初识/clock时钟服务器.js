//* 1.1  导入http模块
const http = require('http');
//* 1.2   导入fs模块
const fs = require('fs');
//* 1.3  导入path模块
const path = require('path');


//* 2.1  创建http服务器
let server = http.createServer();
//* 2.2  监听http服务器
server.on('request' ,function(req , res) {
   //* 3.1  获取客户端请求的url地址 
      const url = req.url
      //* 3.2  把请求的url映射为具体文的存放路径
      let fpath = ''
      if (url === '/') {
        fpath = path.join(__dirname , './clock/index.html')
      }else {
        fpath = path.join(__dirname ,'./clock', url)
      }

       //*  4.1 根据文件路径读取文件内容
        fs.readFile(fpath ,'utf8', function (err, dataStr) {
           //* 4.2  如果文件读取失败，则返回404页面 
          if (err) return res.end('404 not found')
          //* 4.3  如果文件读取成功，则返回文件内容
          
          res.end(dataStr)
})
})
//* 2.3    启动服务器
server.listen(80,() => {
    console.log('http server running at http://127.0.0.1')
})