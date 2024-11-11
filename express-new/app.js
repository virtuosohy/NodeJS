const { log } = require('console');
const express = require('express');
const fs = require('fs');
const {promisify} = require('util');
const  app = express();
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
app.use(express.json());

app.get('/', async (req, res) => {
  try{
    let back = await readFile('./db.json', 'utf8')
    result = JSON.parse(back)
    res.send(result.users)
  } catch(err){
    res.status(500).json({err})
  }
})

app.post('/', async (req, res) => {
  // console.log(req.headers);  
  // console.log( req.body);
   let body = req.body;
   if(!body){
    res.status(403).json({error:"缺少用户信息"})
   }
   let back = await readFile('./db.json', 'utf8')
    const result = JSON.parse(back)
    body.id = result.users[result.users.length-1].id + 1
    result.users.push(body)
    try{
         let w =  await writeFile('./db.json', JSON.stringify(result))
         if(!w){
             res.status(200).send({message:"保存成功"})
         }
    }catch(err){
          res.status(500).json({err})
    }
   
})


app.listen(3000, () => {
    console.log('Server is running on port http://127.0.0.1:3000');
});

