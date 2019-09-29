var http = require('http');
//モジュールの読み込み　
var server = http.createServer();
//サーバー立てる　
server.on('request',function(req, res){
  //イベントの設定
res.writeHead(200, {'Content-Type': 'text/plain'});
//200はHTTPステータスコード
res.write('hello world');
res.end();

});

//severの待ち受け状態　
server.listen(1337,'192.168.0.103');

//node sever.js (console)
//controal + c サーバ止める　
