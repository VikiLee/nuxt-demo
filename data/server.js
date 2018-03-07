
/**
 * 测试用，模拟要跨域的api
 * 运行：node server.js
 */
var http = require('http');
var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send({name:"张三",age:40});
});

var server = http.createServer(app);
server.listen(8080);