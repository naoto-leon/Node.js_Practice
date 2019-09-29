
var http = require('fs');
fs = require('./setting')
var settings = require('./setting')
var sever = http.createServer();
sever.on('request', function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.write('hello world');
  res.end();
});

sever.listen(settings.port,settings.host);
console.log("Sever listing...");

// control + cでサーバ止める　
