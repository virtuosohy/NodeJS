const myaction = require('./action.js');
const mycommander = function (program){
program
.command('create <project>[other...]')
.alias('crt')   // 缩写
.description('创建项目')  
.action(myaction)

}

module.exports = mycommander;
