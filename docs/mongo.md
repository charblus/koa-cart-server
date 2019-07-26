
启动
```shell
mongod --config /usr/local/etc/mongod.conf

```


mongo

[MongoDB的安装启动和常用命令](https://www.jianshu.com/p/5cbc50a3f78c)

```
mongo   
db 
show dbs 
use carts
db
show collections  |   show tables 
db.users.insert({userid:"admin",password:"123456"})  // 插入
db.users.find()     // 查看数据
exit
```

1. 增 -- 插入
> db.collection.insert({userid:"admin",password:"123456"}) 
> db.collection.insertOne():向指定集合中插入一条文档数据
> db.collection.insertMany():向指定集合中插入多条文档数据
```
#  插入单条数据

> var document = db.collection.insertOne({"a": 3})
> document
{
        "acknowledged" : true,
        "insertedId" : ObjectId("571a218011a82a1d94c02333")
}

#  插入多条数据
> var res = db.collection.insertMany([{"b": 3}, {'c': 4}])
> res
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("571a22a911a82a1d94c02337"),
                ObjectId("571a22a911a82a1d94c02338")
        ]
}
```

2. 删 -- 清空集合数据
> db.contact.remove({})   // 清空contact集合数据


3. 查
> db.contact.find().pretty()  // 查看contact集合下所有内容
> db.contact.find({"_id":2338377732129792})    // 按字段指定值查询数据

4. 改
> db.contact.update({name:"user1"},{name:"jack"})  // 覆盖
> db.contact.update({name:”user1”},{$set:{address:”bj”}},0,1)  // 更新，有则改之 无则添之

