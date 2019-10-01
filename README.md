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
 
       //hello.js
      var http = require('http'),
      //ファイル読み込みのモジュール　
      fs = require('fs'),
      //ejs読み込みのモジュール
      ejs = require('ejs');

      var settings = require('./setting');
      var sever = http.createServer();

      //テンプレートの作成
      var template = fs.readFileSync(__dirname + '/html/hello.ejs','utf-8');
      //__dirname源氏あのヂィレクトリ
      //nの初期化
      var n = 0;
      sever.on('request' , function(req,res){
      //ejs 読み込み　
      n++;
      var date = ejs.render(template,{
        title: "hello",
        content: "<strong> World </strong>",
        n: n
      });

          res.writeHead(200, {'Content-Type' : 'text/html'});
          //Content-Typeをhtmlに変更　
          res.write(date);
          //取得した場合に返されるのは'date'
          res.end();

        });

      sever.listen(settings.port,settings.host);
      //settingの変数

      // control + cでサーバ止める　
            
#### [EJS連携・配列での取得]  
##### HTML FormでのPostを配列で取得する  

 ##### bbs.js  
      <!DOCTYPE html>
      <html lang = "ja">

      <head>
        <title>BBS</title>
          <meta charset="utf-8">
      </head>

      <body>
        <form method="post">
          <input type="text" name="name">
          <input type="submit"  value="post!">

          <ul>
            <% for(var i = 0; i < posts.length; i++){ %>
                    <li><%= posts[i] %></li>
            <%  } %>
          </ul>
        </form>
      </body>

      </html>  
      
##### setting.js  

      //setting.js
      //port hostの設定　

      exports.port = 1337;
      exports.host = '192.168.0.103';  
      
##### hello.js  

      var http = require('http'),
            //ファイル読み込みのモジュール　
      fs = require('fs'),
            //ejs読み込みのモジュール
      ejs = require('ejs');
            //ホームからの投稿処理モジュール　
      qs = require('querystring')
      
      var settings = require('./setting');
      var sever = http.createServer();

             //テンプレートの作成 __dirname現在のヂィレクトリ
      var template = fs.readFileSync(__dirname + '/html/bbs.ejs','utf-8');
     
             //投稿処理する配列
      var posts = [];
            //レスポンスの設定
      function renderForm(posts,res){
      var date = ejs.render(template,{
              posts: posts
              //postsの受け取り
       });
       
       res.writeHead(200, {'Content-Type' : 'text/html'});
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
              //データの受信終わったらの処理
     
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
      
   ### [Paiza Cloudでの運用]  
   #### Node.js、Express.js、JavaScript、MongoDBデータベースえお
   
   ### [Paiza Cloudでの  
