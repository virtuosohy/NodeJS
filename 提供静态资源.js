const express = require('express');

const app = express();

app.use(express.static('./初识'));

app.listen(80, () => {
  console.log('Server is running at http://127.0.0.1');
});
