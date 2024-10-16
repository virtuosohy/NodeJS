const express = require('express');

const app = express();

app.get('/' , (req,res)=>{res.send({name:'ls',age:'18'})})
app.listen(80, () => {
  console.log('Server is running at http://127.0.0.1');
});
