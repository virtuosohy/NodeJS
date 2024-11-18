​	

# 壹-初识

## 一.回顾

### 1.为什么 JavaScript 可以在浏览器中被执行

不同的浏览器使用不同的 JavaScript 解析引擎：

- Chrome 浏览器 => V8
- Firefox 浏览器 => OdinMonkey（奥丁猴）
- Safri 浏览器 => JSCore
- IE 浏览器 => Chakra（查克拉）

### 2.为什么 JavaScript 可以操作 DOM 和 BOM

每个浏览器都内置了 DOM、BOM 这样的 API函数，因此，浏览器中的 JavaScript 才可以调
用它们。



### 3.浏览器中的 JavaScript 运行环境

Chrome浏览器里面：

① V8 引擎负责解析和执行 JavaScript 代码。
② 内置 API (DOM，BOM、XMLHttpRequest)是由运行环境提供的特殊接口，只能在所属的运行环境中被调用。



## 二. Node.js 简介

### 1.什么是 Node.js

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
Node.js 的官网地址： https://nodejs.org/zh-cn/



### 2.Node.js 中的 JavaScript 运行环境

V8引擎+内置API(fs，path,http,querystring...)

> 注意：

① 浏览器是 JavaScript 的前端运行环境。
② Node.js 是 JavaScript 的后端运行环境。
③ Node.js 中无法调用 DOM 和 BOM 等浏览器内置 API。



# 贰-内置API

## 一.fs文件系统模块

fs 模块是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。

例如：

- fs.readFile() 方法，用来读取指定文件中的内容
- fs.writeFile() 方法，用来向指定的文件中写入内容

如果要在 JavaScript 代码中，使用 fs 模块来操作文件，则需要使用如下的方式先导入它：

```js
const fs = require('fs')
```





### 1.读取指定文件中的内容

#### fs.readFile() 的语法格式

使用 fs.readFile() 方法，可以读取指定文件中的内容，语法格式如下：

```js
fs.readFile(path[,options],callback)
```

- 参数1：**必选**参数，字符串，表示文件的路径。


- 参数2：可选参数，表示以什么编码格式来读取文件。
- 参数3：**必选**参数，文件读取完成后，通过回调函数拿到读取的结果。



### 2. 向指定的文件中写入内容

#### fs.writeFile() 的语法格式

使用 fs.writeFile() 方法，可以向指定的文件中写入内容，语法格式如下：

```js
fs.writeFile(file,data[,options],callback)
```



- 参数1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。
- 参数2：必选参数，表示要写入的内容。
- 参数3：可选参数，表示以什么格式写入文件内容，默认值是 utf8。
- 参数4：必选参数，文件写入完成后的回调函数。



### 3.练习 - 考试成绩整理

核心实现步骤
① 导入需要的 fs 文件系统模块
② 使用 fs.readFile() 方法，读取素材目录下的 成绩.txt 文件
③ 判断文件是否读取失败
④ 文件读取成功后，处理成绩数据
⑤ 将处理完成的成绩数据，调用 fs.writeFile() 方法，写入到新文件 成绩-ok.txt 中



```js
const fs = require('fs')

fs.readFile('./files/成绩.txt', 'utf8', function (err, dataStr) {
  if(err){
    return console.log('文件读取失败' + err.message)  
  }
  // console.log('文件读取成功，内容是：' + result)

  //* 按照空格进行分割， 
 const arrOld = dataStr.split(' ')

 
  //* 循环分割后的数组  ，对字符串的替换操作  
const arrNew = [ ]
arrOld.forEach(item =>{
  arrNew.push(item.replace('=' ,':'))
})


  //* 把新数组的每一项，进行合并，得到一个新数组

  const newstr = arrNew.join('\r\n')
  console.log(newstr);
  
})

```





### 4.fs 模块 - 路径动态拼接的问题

解决方案：

```
__dirname
```



------



## 二.path路径模块

### 1.路径拼接

path.join()

使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串，语法格式如下：

```js
path.join([..paths])
```

参数解读：

- ...paths  路径片段的序列
- 返回值: 



### 2.获取路径中的文件名

path.basename() 的语法格式
使用 path.basename() 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，语法格式如下：

```js
path.basename(path[,ext])
```

参数解读：

- path  必选参数，表示一个路径的字符串
- ext  可选参数，表示文件扩展名
- 返回:  表示路径中的最后一部分

### 3.获取路径中的文件扩展名

path.extname() 的语法格式
使用 path.extname() 方法，可以获取路径中的扩展名部分，语法格式如下：

```js
path.extname(path)
```

参数解读：
path 必选参数，表示一个路径的字符串
返回:  返回得到的扩展名字符串



------



## 三.http模块

### 1.服务器相关概念

回顾：什么是客户端、什么是服务器？
在网络节点中，负责消费资源的电脑，叫做客户端；负责对外提供网络资源的电脑，叫做服务器。
http 模块是 Node.js 官方提供的、用来创建 web 服务器的模块。通过 http 模块提供的 http.createServer() 方法，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。



服务器和普通电脑的区别在于，服务器上安装了 web 服务器软件，例如：IIS、Apache(PHP) 等。通过安装这些服务器软件，
就能把一台普通的电脑变成一台 web 服务器。

#### 1.IP

IP 地址的格式：通常用“点分十进制”表示成（a.b.c.d）的形式，其中，a,b,c,d 都是 0~255 之间的十进制整数。例如：用点分十进表示的 IP地址（192.168.1.1）

> 注意：

① 互联网中每台 Web 服务器，都有自己的 IP 地址，例如：大家可以在 Windows 的终端中运行 ping www.baidu.com 命令，即可查看到百度服务器的 IP 地址。
② 在开发期间，自己的电脑既是一台服务器，也是一个客户端，为了方便测试，可以在自己的浏览器中输入 127.0.0.1 这个IP 地址，就能把自己的电脑当做一台服务器进行访问了。



#### 2.域名地址

尽管 IP 地址能够唯一地标记网络上的计算机，但IP地址是一长串数字，不直观，而且不便于记忆，于是人们又发明了另一套字符型的地址方案，即所谓的**域名（Domain Name）地址。**

IP地址和域名是一一对应的关系，这份对应关系存放在一种叫做域名服务器(DNS，Domain name server)的电脑中。使用者只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器实现。因此，域名服务器就是提供 IP 地址和域名之间的转换服务的服务器。
注意：
① 单纯使用 IP 地址，互联网中的电脑也能够正常工作。但是有了域名的加持，能让互联网的世界变得更加方便。
② 在开发测试期间， 127.0.0.1 对应的域名是 localhost，它们都代表我们自己的这台电脑，在使用效果上没有任何区别。



#### 3.端口号

计算机中的端口号，就好像是现实生活中的门牌号一样。通过门牌号，外卖小哥可以在整栋大楼众多的房间中，准确把外卖送到你的手中。
同样的道理，在一台电脑中，可以运行成百上千个 web 服务。每个 web 服务都对应一个唯一的端口号。客户端发送过来的网络请求，通过端口号，可以被准确地交给对应的 web 服务进行处理。

> 注意：

① 每个端口号不能同时被多个 web 服务占用。
② 在实际应用中，URL 中的 80 端口可以被省略。



### 2.创建最基本的 web 服务器

① 导入 http 模块
② 创建 web 服务器实例
③ 为服务器实例绑定 `request` 事件，监听客户端的请求
④ 启动服务器



步骤1 - 导入 http 模块
如果希望在自己的电脑上创建一个 web 服务器，从而对外提供 web 服务，则需要导入 http 模块：

导入http模块

```js
const http = require('http')
```



步骤2 - 创建 web 服务器实例
调用 http.createServer() 方法，即可快速创建一个 web 服务器实例：

```js
const server = http.createServer()
```



 步骤3 - 为服务器实例绑定 request 事件
为服务器实例绑定 request 事件，即可监听客户端发送过来的网络请求：

```js
server.on('request' ,(req , res) => {
    //只要有客户端请求服务器，就会触发request事件，从而调用事件处理函数
    console.log('成功')
})
```



步骤4 - 启动服务器
调用服务器实例的 .listen() 方法，即可启动当前的 web 服务器实例：

```js
server.listen(80,() => {
    console.log('http server running at http://127.0.0.1')
})
```





整体代码：

```js
// 1.导入 http 模块
const http = require('http')
// 2.创建 web 服务器实例
const server = http.createServer()
// 3.为服务器实例绑定 request 事件，监听客户端的请求
server.on('request' ,function(req , res) {
    //只要有客户端请求服务器，就会触发request事件，从而调用事件处理函数
    console.log('someone visit our website')
})
// 4.启动服务器
server.listen(80,() => {
    console.log('http server running at http://127.0.0.1')
})
```





#### req 请求对象

只要服务器接收到了客户端的请求，就会调用通过 server.on() 为服务器绑定的 request 事件处理函数。
如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式：

```js
server.on('request' ,function(req , res) {
    //req是请求对象，它包含了与客户端相关的数据和属性
    //req.url是客户端请求的url地址
    //req.method是客户端的method请求类型
    const str = `URl is ${req.url},and require method is ${req.method}`
    console.log(str)
})
```





#### res 响应对象

在服务器的 request 事件处理函数中，如果想访问与服务器相关的数据或属性，可以使用如下的方式：

使用res.end方法，向客户端相应一些内容

```js
res.end()
```





#### 解决中文乱码问题

当调用 res.end() 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：

```js
server.on('request' ,function(req , res) {
    //req是请求对象，它包含了与客户端相关的数据和属性
    //req.url是客户端请求的url地址
    //req.method是客户端的method请求类型
    const str = `URl 是 ${req.url},请求方法是 ${req.method}`
    //防止乱码，需要设置响应头
     res.setHeader('Content-Type','text/html;charset=utf8')
    console.log(str)
     res.end(str)
})
```



#### 根据不同的 url 响应不同的 html 内容

##### 核心实现步骤

① 获取请求的 url 地址
② 设置默认的响应内容为 404 Not found
③ 判断用户请求的是否为 / 或 /index.html 首页
④ 判断用户请求的是否为 /about.html 关于页面
⑤ 设置 Content-Type 响应头，防止中文乱码
⑥ 使用 res.end() 把内容响应给客户端



```js
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
 res.end(content)
})
// 4.启动服务器
server.listen(80,() => {
    console.log('http server running at http://127.0.0.1')
})
```





### 3. 案例 - 实现 clock 时钟的 web 服务器

#### 1.核心思路

把文件的实际存放路径，作为每个资源的请求 url 地址。



#### 2.实现步骤

① 导入需要的模块
② 创建基本的 web 服务器
③ 将资源的请求 url 地址映射为文件的存放路径
④ 读取文件内容并响应给客户端
⑤ 优化资源的请求路径



```js
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

```





------



# 叁-模块化

模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组
合、分解和更换的单元

编程领域中的模块化，就是遵守固定的规则，把一个大文件拆成独立并互相依赖的多个小模块。





## 1.Node.js 中模块的分类

Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是：

- 内置模块（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）
- 自定义模块（用户创建的每个 .js 文件，都是自定义模块）
- 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）

## 2.模块作用域

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域。



### 模块作用域的好处

防止了全局变量污染的问题



### 向外共享模块作用域中的成员

#### 1.module 对象

在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息



#### 2.module.exports 对象

在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。



a.js

```js
module.exports.username = 'a'
```



b.js

```js
const m = require('./a.js')
console.log(m)    //打印出： username:'a'
```



#### 3.exports 对象

由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 exports 对象。默认情况下，exports 和 module.exports 指向同一个对象。最终共享的结果，还是以 module.exports 指向的对象为准



### Node.js 中的模块化规范

Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖

CommonJS 规定：
① 每个模块内部，module 变量代表当前模块。
② module 变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。
③ 加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。





## 3.包和npm

Node.js 中的第三方模块又叫做包。

由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低。
包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。
包和内置模块之间的关系，类似于 jQuery 和 浏览器内置 API 之间的关系。，



### devDependencies 节点

如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 devDependencies 节点中。
与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中。



### i5ting_toc

i5ting_toc 是一个可以把 md 文档转为 html 页面的小工具，使用步骤如下

```bash
 npm install -g i5ting_toc
 i5ting_toc -f 要转换的md文件路径 -o
```









# 肆-Express

## 1.初识 Express

### 1.1 Express 简介

官方给出的概念：Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。
通俗的理解：Express 的作用和 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的。
Express 的本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。



最常见的两种服务器，分别是：

- Web 网站服务器：专门对外提供 Web 网页资源的服务器。

- API 接口服务器：专门对外提供 API 接口的服务器。

  使用 Express，我们可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器。

### 1.2 Express 的基本使用

#### 安装

```bash
npm i express@版本
```



#### 创建服务器

```js
const express = require('express');

const app = express();

app.listen(80, () => {
  console.log('Server is running at http://127.0.0.1');
});

```



#### 监听 GET 请求

通过 app.get() 方法，可以监听客户端的 GET 请求，具体的语法格式如下：

```js
app.get('请求URL' , function(req,res){函数})
```

> req：请求对象
>
> res：响应对象



#### 监听 POST 请求

通过 app.post() 方法，可以监听客户端的 POST 请求，具体的语法格式如下：

```js
app.post('请求URL' , function(req,res){函数})
```



#### 把内容响应给客户端

通过 res.send() 方法，可以把处理好的内容，发送给客户端：

```js
app.get('请求URL' , function(req,res){
    
    res.send({内容})
})
```





#### 获取 URL 中携带的查询参数

通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

```js
app.get('请求URL' , function(req,res){
    
    console.log(req.query)
})
```



#### 获取 URL 中的动态参数

通过 req.params 对象，可以访问到 URL 中，通过 `:` 匹配到的动态参数：

```js
app.get('user/:id' , function(req,res){
    //这里的id是一个动态参数
    console.log(req.params)
})
```





### 1.3 托管静态资源

#### express.static()

express 提供了一个非常好用的函数，叫做 express.static()，通过它，我们可以非常方便地创建一个静态资源服务器，
例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了

```js
app.use(express.static('目录'))
```

> 注意：Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态文件的目录名不会出现在 URL 中。

如果要托管多个静态资源目录，请多次调用 express.static() 函数：
访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件。



#### 挂载路径前缀

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

```js
app.use('./目录',express.static('目录'))
```



### 1.4 nodemon

在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。
现在，我们可以使用 nodemon（https://www.npmjs.com/package/nodemon） 这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。





## 2. Express路由

### 2.1路由的概念

在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。
Express 中的路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数，格式如下：

```js
app.METHOD(path,handler)
```



路由匹配的注意点：
① 按照定义的先后顺序进行匹配
② 请求类型和请求的URL同时匹配成功，才会调用对应的处理函数



### 2.2路由的使用

```js
app.get('/', (req, res) => {res.send('get request')})
```



#### 模块化路由

为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。
将路由抽离为单独模块的步骤如下：
① 创建路由模块对应的 .js 文件
② 调用 express.Router() 函数创建路由对象
③ 向路由对象上挂载具体的路由
④ 使用 module.exports 向外共享路由对象
⑤ 使用 app.use() 函数注册路由模块

```js
//* 路由模块

//* 1.导入 express
const express = require('express')

//* 2.创建路由对象
const router = express.Router()

//* 3.挂载具体路由
app.get('/user/list', (req, res) => {res.send('user list')})
app.post('/user/add', (req, res) => {res.send('add user')})
//* 4.1导出路由
module.exports = router
```



#### 注册路由模块

```js
//导入
const router = require('./4.Router.js');
//注册路由
app.use(router);

```





## 3.Express 中间件

### 3.1概念

中间件（Middleware ），特指业务流程的中间处理环节

中间件的格式：

```js
app.get('/',function(req ,res,next){
    next();
})
```



#### next函数的作用

next 函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。



### 3.2实现

#### 1.定义中间件函数

```js
const m = function(req,res,next){
    console.log('中间件函数')
    next()
}
```

 

#### 2.全局生效的中间件

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。
通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件，示例代码如下：

```js
const m = function(req,res,next){
    console.log('中间件函数')
    next()
}

app.use(m)
```





#### 3.局部生效的中间件

不使用 app.use() 定义的中间件，叫做局部生效的中间件

```js
app.get('/' ,mw1 ,(req ,res) =>{res.send('xxx')})
```





### 3.3 中间件的分类



#### 应用级别的中间件

通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件，



#### 路由级别的中间件

绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不
过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上，

```js
const app = express();
const router = express.Router()

router.use(function(req,res,next){
    next()
    
})

app.use('/',router)
```





#### 错误级别的中间件

错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
格式：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)

```js
app.get('/' ,function(req,res){
    throw new Error('服务器内部发生了错误')
    res.send('ssss')
})
app.use(function(err,req,res,next){
    console.log('发生了错误' +err.message) //服务器打印错误消息
    res,send('Error' + err.message) //向客户端打印错误消息
})
```

> 注意：错误级别的中间件，必须注册在所有路由之后！



#### Express内置的中间件

自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：
① express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
② express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
③ express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）



### 3.4 自定义中间件

需求描述与实现步骤
自己手动模拟一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据。
实现步骤：
① 定义中间件
② 监听 req 的 data 事件

> 在中间件中，需要监听 req 对象的 data 事件，来获取客户端发送到服务器的数据。如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以 data 事件可能会触发多次，每一次触发 data 事件时，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接。

③ 监听 req 的 end 事件
④ 使用 querystring 模块解析请求体数据
⑤ 将解析出来的数据对象挂载为 req.body
⑥ 将自定义中间件封装为模块



## 4.使用 Express 写接口

### 4.1 创建基本的服务器

```js
const express = require('express');

const app = express();


app.listen(80, () => {
  console.log('Server is running at http://127.0.0.1');
});

```





### 4.2 创建 API 路由模块



apiRouter.js

```js
//* 路由模块

//* 1.导入 express
const express = require('express')

const router = express.Router()

//* 挂载路由


//* 4.1导出路由
module.exports = router
```

app.js	

```js
const router =require('./apiRouter');
//* 注册路由到app上
app.use('/api', router);

```



### 编写 GET 接口

app.js

```js
const express = require('express');

const app = express();

const router =require('./apiRouter.js');
//* 注册路由到app上
app.use('/api', router);


app.listen(80, () => {
  console.log('Server is running at http://127.0.0.1');
});

```

apiRouter.js	

```js
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


//* 4.1导出路由
module.exports = router
```



### 编写 POST接口



app.js

```js
const express = require('express');

const app = express();

//* 解析post请求体
app.use(express.urlencoded({ extended: false }));

const router =require('./apiRouter.js');
//* 注册路由到app上
app.use('/api', router);


app.listen(80, () => {
  console.log('Server is running at http://127.0.0.1');
});

```



apiRouter

```js
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
```



### CORS 跨域资源共享

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。
使用步骤分为如下 3 步：
① 运行 npm install cors 安装中间件
② 使用 const cors = require('cors') 导入中间件
③ 在路由之前调用 app.use(cors()) 配置中间件



CORS （Cross-Origin Resource Sharing，跨域资源共享）由一系列 HTTP 响应头组成，这些 HTTP 响应头决定
浏览器是否阻止前端 JS 代码跨域获取资源。
浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，
就可以解除浏览器端的跨域访问限制



#### CORS 响应头部 - Access-Control-Allow-Origin

响应头部中可以携带一个 Access-Control-Allow-Origin 字段，其语法如下:

```js
Access-Control-Allow-Origin :<origin> | *
```



其中，origin 参数的值指定了允许访问该资源的外域 URL。
例如，下面的字段值将只允许来自 http://baidu.com 的请求：

```js
res.setHeader('Access-Control-Allow-Origin' ,'http://baidu.com ')
```

如果指定了 Access-Control-Allow-Origin 字段的值为通配符 *，表示允许来自任何域的请求，示例代码如下：

```js
res.setHeader('Access-Control-Allow-Origin' ,'*')
```



#### CORS 响应头部 - Access-Control-Allow-Headers

默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头：
Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、
Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

 

如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外
的请求头进行声明，否则这次请求会失败！

```js
res.setHeader('Access-Control-Allow-Header' ,'xxxx')
```



#### CORS 响应头部 - Access-Control-Allow-Methods

默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。
如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods
来指明实际请求所允许使用的 HTTP 方法。

```js
res.setHeader('Access-Control-Allow-Methods' ,'POST, GET, DELETE')
//允许所有
res.setHeader('Access-Control-Allow-Methods' ,'*')
```







------



# 伍-数据库

市面上的数据库有很多种，最常见的数据库有如下几个：

- MySQL 数据库（目前使用最广泛、流行度最高的开源免费数据库；Community + Enterprise）
- Oracle 数据库（收费）
- SQL Server 数据库（收费）
- Mongodb 数据库（Community + Enterprise）

其中，MySQL、Oracle、SQL Server 属于传统型数据库（又叫做：关系型数据库 或 SQL 数据库），这三者的
设计理念相同，用法比较类似。
而 Mongodb 属于新型数据库（又叫做：非关系型数据库 或 NoSQL 数据库），它在一定程度上弥补了传统型
数据库的缺陷。



## 传统型数据库的数据组织结构

### 1.Excel 的数据组织结构

每个 Excel 中，数据的组织结构分别为工作簿、工作表、数据行、列这 4 大部分组成



### 2.传统型数据库的数据组织结构

在传统型数据库中，数据的组织结构分为数据库(database)、数据表(table)、数据行(row)、字段(field)这 4 大部分组成。

### 启动mysql

services.msc中启动mysql

或者是

```bash
net stop/start mysql80
```



###  

## 使用 SQL 管理数据库

### 什么是 SQL

SQL（英文全称：Structured Query Language）是结构化查询语言，专门用来访问和处理数据库的编程语言。能够让
我们以编程的形式，操作数据库里面的数据。
三个关键点：
① SQL 是一门数据库编程语言
② 使用 SQL 语言编写出来的代码，叫做 SQL 语句
③ SQL 语言只能在关系型数据库中使用（例如 MySQL、Oracle、SQL Server）。非关系型数据库（例如 Mongodb）
不支持 SQL 语言



重点掌握如何使用 SQL 从数据表中：
查询数据（select） 、插入数据（insert into） 、更新数据（update） 、删除数据（delete）
额外需要掌握的 4 种 SQL 语法：
where 条件、and 和 or 运算符、order by 排序、count(*) 函数



### SQL 的 SELECT 语句

SELECT 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）。语法格式如下



```mysql
--查询所有的数据
select* FORM 表名称
--查询指定  的数据
select 列名称 FORM 表名称
```



### SQL 的 INSERT INTO 语句

INSERT INTO 语句用于向数据表里面插入数据行

```mysql
--列和值一样对应
insert into table_name(列1，列2)  values(值1，值2)
```

> 向users表里面插入一条`username`为`jack`，`password`为`789`的用户数据

```mysql
insert into `01`.users (username , password) values ('jack' ,'789');
SELECT username FROM `01`.users;
```





### SQL 的 UPDATE 语句

用于修改表中的数据

```mysql
update 表名称 set 列名称 = 新值 where 列名称 =某值
```

> 把表中id为1的用户密码改为888888

```mysql
update `01`.users set password="888888"  where id=1;
```

> 更新某一行的若干列
>
> 把id为2的俩个数据更新

```mysql
update `01`.users set username="二",password="admin"  where id=2;
```



### SQL 的 DELETE 语句

用于删除表中的行

```mysql
delete from 表名 where 列名称 = 值
```

> 删除id=1

```mysql
delete from `01`.users where id=1;
```



### SQl的where语句

1. 语法
   WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准

```mysql
--查询语句中的where条件
select 列名称 FROM 表名称 WHERE 列 运算符
--更新语句中的where条件
update 列名称 set 列=新值 WHERE 列 运算符
--删除语句中的where条件
delete  FROM 表名称 WHERE 列 运算符 值
```





#### 限定select查询条件

```mysql
--查询id大于2的人
select* from users where id>2

--查询username不等于jack
select* from users where username<>'admin'
```



### SQL 的 AND 和 OR 运算符

AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来。
AND 表示必须同时满足多个条件，相当于 JavaScript 中的 `&&` 运算符，例如 if (a !== 10 && a !== 20)
OR 表示只要满足任意一个条件即可，相当于 JavaScript 中的 `||` 运算符，例如 if(a !== 10 || a !== 20)



### SQL 的 ORDER BY 子句

ORDER BY 语句用于根据指定的列对结果集进行排序。
ORDER BY 语句默认按照**升序**对记录进行排序。
如果您希望按照降序对记录进行排序，可以使用 **DESC** 关键字。

```mysql
select* from users order by status
```



在项目中操作数据库的步骤
① 安装操作 MySQL 数据库的第三方模块（mysql）
② 通过 mysql 模块连接到 MySQL 数据库
③ 通过 mysql 模块执行 SQL 语句







## 在项目中操作 MySQL

### 测试 mysql 模块能否正常工作

调用 db.query() 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果：

```mysql
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'xxxxx',
  database: '01'
});

// *测试mysql是否连接成功
db.query('SELECT 1', (err, results) => {
  if (err) {
    console.log('mysql连接失败');
  }
  console.log(results);
})
```





### 查询数据

```js
db.query('select * from users', (err, results) => {
  if (err) {
    console.log('查询失败');
  } else {
    console.log(results);
  }
})
```



### 插入数据

向 users 表中新增数据， 其中 username 为 admin，password 为 123456。示例代码如下

```js
//* 添加数据
db.query('insert into users(username,password) values("admin","123456")', (err, results) => {
  if (err) {
    console.log('添加失败');
  } else {
    console.log(results);
  }
})
```



插入多个

```js
const user = { username:'' ,password:''}

const sqlstr = 'insert into users set ? '

db.query(sqlstr,users,(err，result）=> {
    //成功或者失败
}
```







### 更新数据

```js
// * 修改数据
db.query('update users set username="admin123" where id=4', (err, results) => {
  if (err) {
    console.log('修改失败');
  } else {
    console.log(results);
  } })

```







# 陆-前后端身份认证

**身份验证**

服务端渲染推荐使用 Session 认证机制， 前后端分离推荐使用 JWT 认证机制



## Session 认证机制

### HTTP 协议的无状态性

了解 HTTP 协议的无状态性是进一步学习 Session 认证机制的必要前提。
HTTP 协议的无状态性，指的是客户端的每次 HTTP 请求都是独立的，连续多个请求之间没有直接的关系，服务器不会主动保留每次 HTTP 请求的状态。

如何突破 HTTP 无状态的限制，在 Web 开发中的专业术语叫做 `Cookie`



### Cookie

Cookie 是存储在用户浏览器中的一段不超过 4 KB 的字符串。它由一个名称（Name）、一个值（Value）和其它几个用
于控制 Cookie 有效期、安全性、使用范围的可选属性组成。
不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器。



### Cookie 在身份认证中的作用

客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的 Cookie，客户端会自动
将 Cookie 保存在浏览器中。随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie，通过请求头的形式发送给服务器，服务器即可验明客户端的身份。



### Cookie 不具有安全性

由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 API，因此 Cookie 很容易被伪造，不具有安全性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器

![72948034951](C:\Users\huipu\AppData\Local\Temp\1729480349518.png)





## 在 Express 中使用 Session 认证

#### 安装 express-session 中间件

```bash
npm install express-session
```



#### 配置 express-session 中间件

express-session 中间件安装成功后，需要通过 app.use() 来注册 session 中间件，示例代码如下：

```js
const session = require('express-session')
app.use(
  session({
    secret: 'aaaa',
    resave: false,
    saveUninitialized: true,
  })
)
```



#### 向 session 中存数据

当 express-session 中间件配置成功后，即可通过 req.session 来访问和使用 session 对象，从而存储用户的关键信息：

```js
// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  req.session.user = req.body // 用户的信息
  req.session.islogin = true // 用户的登录状态

  res.send({ status: 0, msg: '登录成功' })
})
```



#### 从 session 中取数据

可以直接从 req.session 对象上获取之前存储的数据，示例代码如下

```js
app.get('/api/username', (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  })
})
```





#### 清空 session

调用 req.session.destroy() 函数，即可清空服务器保存的 session 信息。

```js
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})
```





## 使用JWT验证

![72981782296](C:\Users\huipu\AppData\Local\Temp\1729817822969.png)



用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。



### JWT 的组成部分

JWT 通常由三部分组成，分别是 Header（头部）、Payload（有效荷载）、Signature（签名）。
三者之间使用英文的“.”分隔，格式如下：

```
Header.Payload.Signature

```

Payload 部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。

 Header 和 Signature 是安全性相关的部分，只是为了保证 Token 的安全性。



### JWT的使用方式

客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中。
此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。推荐的做法是把 JWT 放在 HTTP
请求头的 Authorization 字段中，

```
Authorization:Bearer <token>

```



### 安装 JWT 相关的包

运行如下命令，安装如下两个 JWT 相关的包

```bash
npm install jsonwebtoken express-jwt
```









# 柒.自定义脚手架

需要涵盖：

- 创建自定义全局命令
- 命令参数接受处理
- 终端交互
- 下载远程代码
- 项目初始化完成的提示

## 创建自定义全局命令

> 终端使用bash

#### 1、创建bin文件夹，里面cli.js

在bin上层文件夹

```bash
npm init 
project name//(自定义)
npm link  //(挂载到全局)
```



#### 2.在cli.js中

需要引入commander   

> npm i  commander

> --help选项参数处理

```javascript
#!  /usr/bin/env node

// console.log('hello world');
// process.argv   // 获取命令行参数

const {program} = require('commander');

program.option('-f --framwork <framwork>', '创建框架')

program.parse(process.argv)
```



## commander自定义命令

```javascript
#!  /usr/bin/env node

const {program} = require('commander');


program.option('-f --framwork <framwork>', '创建框架')
program
.command('create <project>[other...]')
.alias('crt')   // 缩写
.description('创建项目')  
.action((project,args) =>{
console.log('创建项目',project)
console.log('其他参数',args)
})

program.parse(process.argv)




```



## 逻辑代码模块化拆分

 在主文件夹创建lib文件夹，里面创建core

有help.js

```javascript
const myhelp = function(program){
  program.option('-f --framwork <framwork>', '创建框架')
}
module.exports = myhelp

```

mycommander.js

```javascript
const myaction = require('./action.js');
const mycommander = function (program){
program
.command('create <project>[other...]')
.alias('crt')   // 缩写
.description('创建项目')  
.action(myaction)

}

module.exports = mycommander;

```

action.js

```javascript
const myAction = (project,args) =>{
console.log('创建项目',project)
console.log('其他参数',args)
}
module.exports = myAction;
```

主文件夹/bin/cli.js

```javascript
#!  /usr/bin/env node

const {program} = require('commander');
const myhelp = require('../lib/core/help')
myhelp(program)

const mycommander = require('../lib/core/mycommander')
mycommander(program)

program.parse(process.argv)

// program.parse(process.argv)



```





## 命令行问答交互工具 inquirer

首先npm i inquirer

action.js

```javascript
const inquirer = require('inquirer')
const config = require('../../config')
const myAction = (project,args) =>{
// console.log('创建项目',project)
// console.log('其他参数',args)
   inquirer.prompt([
    {
      type:'list',
      name:'famework',
      choices:config.framwork,
      message:'请选择框架'
    }
   ]).then(answer =>{
    console.log('你选择的框架是',answer.famework);
   }
   )

}
module.exports = myAction;
```



在主文件创建config.js

```javascript
module.exports ={
framwork:['express','koa','egg','thinkjs']

}
```





# 捌.MongoDB

一个基于文件存储的分布式NoSQL数据库

使用场景：对数据处理有高要求

​                   需要借助缓存层来处理数据

## 指令

> 展示数据库使用情况

```sql
show dbs
```



> 进入库

```sql
use  xxx
```



> 新建库

```sql
use newname
//必须填入数据
db.cc.insert(x:1)
```



> 删除库

```sql
db.dropDatabase()
```



> 查看集合列表

```sql
show collections
```



> 删除集合

```sql
db.cc.drop()
```



> 增加

```sql
db.cc.insertOne({name:a,age:1})

db.cc.insertMany([
{name:a,age:1},
{name:b,age:2}
])
```



> 查找

```sql
db.cc.find({})
```



> 修改

```sql
bd.cc.update($set:)
```



> 删除

```false
db.cc.delete
```

