const inquirer = require('inquirer')
const config = require('../../config')
const download = require('download-git-repo')  
const myAction = async (project,args) =>{
// console.log('创建项目',project)
// console.log('其他参数',args)
  const answer =  await inquirer.prompt([
    {
      type:'list',
      name:'famework',
      choices:config.framwork,
      message:'请选择框架'
    }
   ])
  //  console.log(answer);
   //下载代码
download('direct:'+config.framworkUrl[answer.framwork],project,{clone:true},(err)=>{
  console.log(err);
  
})
   
}
module.exports = myAction;