SELECT * FROM `01`.users;
 -- 演示where的使用
 -- id大于2
 -- select * FROM `01`.users where id>2
 
 -- 显示状态为0，id大于2
 -- select * FROM `01`.users where id>2 and status = 0
 select* from users order by status
 