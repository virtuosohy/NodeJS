#!  /usr/bin/env node

// console.log('hello world');
// process.argv   // 获取命令行参数


const {program} = require('commander');


program.option('-f --framwork <framwork>', '创建框架')
program.parse(process.argv)

// program.parse(process.argv)


