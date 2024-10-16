const { log } = require('console')
const fs = require('fs')

fs.writeFile('./files/1.txt', 'bbb', function (err) {
  console.log(err);
  //*  默认err是null
 if(err){
    return console.log('文件写入失败' + err.message)  
  }
  console.log('文件写入成功')
})
