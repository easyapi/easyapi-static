var http = require('http');
var express = require('express');
var app = express();
app.use("/", express.static(__dirname + '/'));

// 创建服务端
http.createServer(app).listen('9696', function() {
    console.log('EasyStatic静态资源服务启动完成');
    console.log('http://localhost:9696');
});
