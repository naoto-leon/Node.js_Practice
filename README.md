# Node.js_Practice
Node.js チートシート　

#### [サーバ設定]  

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

#### [HTML連携]  

##### /html/hello.html

    <!DOCTYPE html>
        <html lang="en" dir="ltr">
     <head>
       <meta charset="utf-8">
       <title></title>
       </head>
       <body>
           <h1>hello</h1>
       </body>
    </html>
    
 ##### setting.js 
 
     //setting.js
    //port hostの設定　

    exports.port = 1337;
    exports.host = '192.168.0.103';

 ##### hello.js 
 
    var http = require('http');
    //ファイル読み込みのモジュール　
    
    fs = require('fs')
    var settings = require('./setting')
    var sever = http.createServer();
    sever.on('request' , function(req,res){
      
      fs.readFile(__dirname + '/html/hello.html','utf-8',function(err, date){
                      //読み込み　__dirname は現在のdirctryの取得　function(err, date) コールバック関数
       if (err) {
                //エラー処理
             res.writeHead(404, {'Content-Type': 'text/plain'});
             res.write("Not found");
             return res.end();
       }
       
             res.writeHead(200, {'Content-Type': 'text/html'});
                          //Content-Typeをhtmlに変更　
             res.write(date);
                          //取得した場合に返されるのは'date'
             res.end();

       });
     });

    sever.listen(settings.port,settings.host);
                        //settingの変数

                       // control + cでサーバ止める　
                       
#### [EJS連携]        

 ##### hello.ejs  
 
      <!DOCTYPE html>
      <html>
          <!-- nodeを使う場合 (-)はエスケープ　 -->
          <h1><%= title %></h1>
          <p><%- content %></p>
          <p><%= n %> views</p>

      </html>

 ##### setting.js  
            //port hostの設定　

            exports.port = 1337;
            exports.host = '192.168.0.103';  
            
 ##### hello.js   
 
 
            
