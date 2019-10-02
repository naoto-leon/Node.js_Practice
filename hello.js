//hello.js
var http = require('http'),
//ファイル読み込みのモジュール　
fs = require('fs'),
//ejs読み込みのモジュール
ejs = require('ejs');
//ホームからの投稿処理モジュール　
qs = require('querystring')
var settings = require('./setting');
var sever = http.createServer();

//テンプレートの作成
var template = fs.readFileSync(__dirname + '/html/bbs.ejs','utf-8');
//__dirname源氏あのヂィレクトリ
//投稿処理する配列
var posts = [];
//レスポンスの設定
function renderForm(posts,res){
var date = ejs.render(template,{
posts: posts
 });
 res.writeHead(200, {'Content-Type' : 'text/html'});
 //Content-Typeをhtmlに変更　
 res.write(date);
 //取得した場合に返されるのは'date'
 res.end();
}

sever.on('request' , function(req,res){
//ejs 読み込み　
//投稿されたかどうか
if (req.method === 'POST') {
req.date = "";
req.on("readable",function(){
//データがどんどん送られてくる間の処理
req.date += req.read();
});

req.on("end", function(){
  //データの受信終わったら
var query = qs.parse(req.date);
//受信したデータを変数に
posts.push(query.name);
//Postsに送られたデータをpush
renderForm(posts,res);
});

}else{
  //formに配列とレスポンスを渡す
renderForm(posts,res);

}
  });

sever.listen(settings.port,settings.host);
//settingの変数

// control + cでサーバ止める　
