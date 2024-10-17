-- 查询所有表单数据
-- SELECT * FROM `01`.users;
-- 查询username数据
SELECT username FROM `01`.users;

-- 插入一条username为jack，password为789的用户数据
insert into `01`.users (username , password) values ('jack' ,'789');
SELECT * FROM `01`.users;

-- 把表中id为1的用户密码改为888888
update `01`.users set password="888888"  where id=1;
SELECT * FROM `01`.users;

-- 把id为2的俩个数据更新
update `01`.users set username="二",password="admin"  where id=2;
SELECT * FROM `01`.users;

-- 删除id=1
delete from `01`.users where id=1;
SELECT * FROM `01`.users;


