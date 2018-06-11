var fs = require('fs');
var read = fs.createReadStream('../data/input.txt');
//设置第二个参数append
var write = fs.createWriteStream('../data/out.txt', { 'flags': 'a' });
//管道流读写操作
read.pipe(write);
console.log('执行完毕');
