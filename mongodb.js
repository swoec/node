var MongoClient = require('mongodb').MongoClient;
const JSON = require('circular-json');
var url = 'mongodb://localhost:27017/runoob';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbase = db.db("runoob");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });

   var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbase.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });

 var myobj1 =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
    dbase.collection("site").insertMany(myobj1, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });

  dbase.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
    });


   var whereStr = {"name":'菜鸟教程'};  // 查询条件
    dbase.collection("site").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });


    var whereStr = {"name":'菜鸟教程'};  // 查询条件
    var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    dbase.collection("site").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    });


    var whereStr = {"type":'en'};  // 查询条件
    var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    dbase.collection("site").updateMany(whereStr, updateStr, function(err, res) {
        if (err) throw err;
         console.log(res.result.nModified + " 条文档被更新");
        db.close();
    });

    var whereStr = {"name":'菜鸟教程'};  // 查询条件
    dbase.collection("site").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });

    dbase.collection("site").deleteMany(whereStr, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " 条文档被删除");
        db.close();
    });

    var mysort = { type: 1 };
    dbase.collection("site").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });

   dbase.collection("site").find().limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  });

  dbase.collection("site").find().skip(2).limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  });


 dbase.collection('orders').aggregate([
        { $lookup:
            {
                from: 'products',           // 右集合
                localField: 'product_id',   // 左集合 join字段
                foreignField: '_id',        // 右集合 join字段
                as: 'orderdetails'          // 新生成字段（类型array）
            }
        }
    ], function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
   });

// 删除 test 集合
/*
    dbase.collection("test").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
        if (err) throw err;
        if (delOK) console.log("集合已删除");
        db.close();
    });*/

});
