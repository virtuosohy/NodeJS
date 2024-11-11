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

// program.parse(process.argv)


