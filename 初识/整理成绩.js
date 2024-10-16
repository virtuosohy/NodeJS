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
