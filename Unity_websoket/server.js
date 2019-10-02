var https = require('https');
var fs    = require('fs');
var ws    = require('ws').Server;

var CHROME_PORT = 12001;
var UNITY_PORT  = 12002;

// WebSpeech API を Chrome で走らせるための HTTPS サーバ
var server = https.createServer({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, function(req, res) {
	fs.readFile('index.html', function(err, data) {
		if (err) {
			res.writeHead(500);
			res.end('Internal Server Error');
		} else {
			res.writeHead(200);
			res.end(data.toString().replace('{CHROME_PORT}', CHROME_PORT));
		}
	});
}).listen(CHROME_PORT);

// Unity と WebSocket によるコネクションをはる
var unityWebSockets = [];
var unityServer = new ws({port: UNITY_PORT});
unityServer.on('connection', function(ws) {
	console.log('Unity connected!');
	unityWebSockets.push(ws);
	ws.on('close', function() {
		console.log('Unity disconnected...');
		unityWebSockets.splice(unityWebSockets.indexOf(ws), 1);
	});
});

// Web Speech API の結果を取ってくる
var chromeVoiceRecogServer = new ws({server: server});
chromeVoiceRecogServer.on('connection', function(ws) {
	console.log('Chrome connected!');
	ws.on('message', function(word) {
		console.log('recognized:', word);
		unityWebSockets.forEach(function(unityWebSocket) {
			unityWebSocket.send(word);
		});
	}).on('close', function() {
		console.log('Chrome disconnected...');
	});
});
