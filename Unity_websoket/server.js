var https = require('https');
//https通信
var fs    = require('fs');
//モジュール読み込み
var ws    = require('ws').Server;
//ws読み込み

var CHROME_PORT = 12001;
var UNITY_PORT  = 12002;
//portの設定

// WebSpeech API を Chrome で走らせるための HTTPS サーバ
var server = https.createServer({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
	//httpsはkeyとcertが必要　
},
function(req, res) {
	fs.readFile('index.html', function(err, data) {
		//htmlファイルの読み込み
		if (err) {
			res.writeHead(500);
			res.end('Internal Server Error');
			//err処理
		} else {
			res.writeHead(200);
			res.end(data.toString().replace('{CHROME_PORT}', CHROME_PORT));
//dateを書き出して処理完了
		}
	});
}).listen(CHROME_PORT);

// Unity と WebSocket によるコネクションをはる
var unityWebSockets = [];
// 配列
var unityServer = new ws({port: UNITY_PORT});
//ws port
unityServer.on('connection', function(ws) {
	console.log('Unity connected!');
	unityWebSockets.push(ws);
	//wsへpush通信
	ws.on('close', function() {
		console.log('Unity disconnected...');
		unityWebSockets.splice(unityWebSockets.indexOf(ws), 1);
		//spliceでインデックスを削除　
	});
});

// Web Speech API の結果を取ってくる
var chromeVoiceRecogServer = new ws({server: server});
//WebSocketのインスタンスを作成
chromeVoiceRecogServer.on('connection', function(ws) {
	console.log('Chrome connected!');

	ws.on('message', function(word) {
		//wordで帰ってくるものを取得　
		console.log('recognized:', word);
		unityWebSockets.forEach(function(unityWebSocket) {
			unityWebSocket.send(word);
			//	unityWebSocketへ送信
		});
	}).on('close', function() {
		console.log('Chrome disconnected...');
	});
});
