const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '315316',
  database: '01'
});

// *测试mysql是否连接成功
// db.query('SELECT 1', (err, results) => {
//   if (err) {
//     console.log('mysql连接失败');
//   }
//   console.log(results);
// })


// *查询user表中的数据
db.query('select * from users', (err, results) => {
  if (err) {
    console.log('查询失败');
  } else {
    console.log(results);
  }
})

// *查询user表中的数据
db.query('select * from users', (err, results) => {
  if (err) {
    console.log('查询失败');
  } else {
    console.log(results);
  }
})

// //* 添加数据
db.query('insert into users(username,password) values("admin","123456")', (err, results) => {
  if (err) {
    console.log('添加失败');
  } else {
    console.log(results);
  }
})

// * 修改数据
db.query('update users set username="admin123" where id=4', (err, results) => {
  if (err) {
    console.log('修改失败');
  } else {
    console.log(results);
  } })

