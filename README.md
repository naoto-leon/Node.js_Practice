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
      
***
   ### [Paiza Cloudでの運用]  
   #### Node.js、Express.js、JavaScript、MongoDBデータベースを使っての実装  
   
   ##### paizaでのnodejsの書き方はちょっと癖があるように感じる 
   ##### https://paiza.hatenablog.com/entry/2018/06/08/paizacloud_nodejs
   
   [1] コマンド　npm initでプロジェクトの作成。アプリネームを入力してEnter。  
   [2] コマンド　nmp install express --save ライブラリの導入  
   [3] コマンド　nmp install mongoose --save datebaceライブラリの導入  
 
  ##### sever.js   
      const express  = require('express');
      //web開発に必要なライブラリ　
      const app = express();
      //アプリの作成　
      const mongoose = require('mongoose');
      //datebase 
      const bodyParser = require('body-parser');
      //リクエストのパース　

      app.use(express.static(__dirname + '/public'));
      //静的ファイルの使用　public以下　
      app.use(bodyParser.json());
      //json形式で投げられた内容のパース

      mongoose.connect('mongodb://localhost/mydb');
      //datebaseにアクセス　

      //To doリストのモデルをdatebaseに作成
      const Todo = mongoose.model('Todo', {
          text : String
      });


      /////////
      // 実際のurlに対する処理
      /////////


      app.get('/api/todos', (req, res) => {
          Todo.find()
          //すべてのtodo一覧を取得　
        .then((todos) => {
             //取得したtosoの利用　
              res.json(todos);
             //一覧をjson形式で返す　
          })
          .catch((err) => {
                  res.send(err);
              //エラー処理
          })
      });

      app.post('/api/todos', (req, res) => {
          const todo = req.body;
          //入力ホームのないよ鵜を取得　
          Todo.create({
              //データベース上にtextとして追加
              text: todo.text,
          })
          .then((todo) =>{
              res.json(todo);
              //作成したtodoがかえってくるのでjsonとして返す
          })
              .catch((err) => {
                  res.send(err);
              //エラー処理
          });
      });

      //deleateの操作　

      app.delete('/api/todos/:todo_id',(req,res) =>{
          Todo.remove({
              _id : req.params.todo_id
              //削除するid(url)を選択
          })
            .then((todo) => {
                 res.send(todo); 
              //削除したら
          })
              .catch((err) => {
              res.send(err);
              //エラー処理
          });
      });

      app.get('/', (req, res) => {
          //アクセスした時に静的ファイルを返すようにしとく　
       res.sendfile('./public/index.html');
      });

      app.listen(3000, () => {
          console.log("My app listening on port 3000!");
      });

  ##### public/index.html  
  
        <!DOCTYPE html>
      <html>
          <head>
              <title>TodoList</title>
              <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
              <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css">
              <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.css">
                 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                 <script src="client.js"></script>
          </head>
          <body>
               <div class = "container">
                   <h1>Task List</h1>
                   <div class = "form-group">
                       <input type="text" name="name" class="new-todo-text form-control" placeholder="task">

                       <button type="submit" class ="btn btn-default" onclick="createTodo()">add</button>
                   </div>

                   <h2>Task New </h2>
                   <table class ="table table-striped task-table">
                       <thead>
                           <th>Task</th><th>&nbsp;</th>
                       </thead>

                       <tbody class="todos">
                           <tr class ="todo template" style="display: none;">
                               <td>
                                   <span class ="text"></span>
                                  <span class = "id" style="display: none;"></span>
                               </td>
                               <td>
                                   <button onclick="deleteTodo(this)">Delete</button>
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>
          </body>
      </html>
 
   ##### public/client.js  
   
      //todosを元にhtmlに変換
      function render(todos){
          $(".todos").children().not(".template").remove();
          //最初templateclass以外は削除
          const template = $(".todos").children(".template");
          //todosの下の子要素から.templateを取得

          todos.forEach((todo) => {
              const node = template.clone(true).show().removeClass("template")
              //templateを引数を持たせコピー
              node.find(".text").text(todo.text);
              //textはtodoの中のtext
            node.find(".id").text(todo._id);
            //idはtodoの中の_id 
            $(".todos").append(node);
            //todosの中の最後に作成したnodeの追加
          });
      }


      //サーバーから値の取得jsに変換
      function getTodos(){
          //todo一覧を取得　
          fetch('/api/todos')
          //feachでサーバーから一覧を取得
          .then((date) => date.json())
              //json形式として解釈してjsに変換
              .then((json) => {
                  const todos = json;
                  //jsonをtodosに割り当て
                  render(todos);
              });
          }


      //投稿した時の動作　

      function createTodo(){
          const text = $(".new-todo-text").val();
          //valで値の取り出し
          fetch('/api/todos',{
              //作成したtodoをサーバーへ
              method: "POST",
              headers:{
                  'Content-Type': 'application/json',
                  //json形式でサーバーへ
              },
              body: JSON.stringify({text: text}),
              //送信するデータをjson形式に変換してtextフィールドに格納
          })
          .then(() =>{
             getTodos();
             //送信できたら更新
          });
      }



       //削除した時の動作

       function deleteTodo(el){
           //elで受けとり 引数にthis
           const id = $(el).closest(".todo").find(".id").text();
           //todoのidを取得 一番近いtodoを取得してidのtextを取得
           fetch(`/api/todos/${id}`,{
               //サーバーへ削除の処理を投げる
               method: "DELETE"
           })
           .then(() =>{
              getTodos(); 
                     //送信できたら更新
           });
       }

      $(getTodos);

***
   ### [Web・Speech・APIをnodejsでhttps経由でUnityへ送る]  
   #### Node.js、unity、WebSocket、を使っての実装  
   
   ##### 環境構築が大変でした 
   #### [参考]
   ##### http://tips.hecomi.com/entry/20131202/1386004185 
   #####  https://qiita.com/nmxi/items/d3a0e787ca67e27ffd17
   #####  http://codedehitokoto.blogspot.com/2012/02/nodejshttps.html
   ##### https://dackdive.hateblo.jp/entry/2016/10/10/095800  
   ##### https://github.com/websockets/ws
   [1] websocket-sharpをコンパイルしてwebsocket-sharp.dllをunityにインポート。   
   [2] コマンド　npm install ws  ディレクトリ下でws(websoket)のインストール。npm list --depth=0 で確認  
   [3] コマンド　$ openssl genrsa -out key.pem 1024 $ openssl req -new -key key.pem -out csr.pem  [httpsサーバの準備]  
   
   ##### WSVoiceRecording.cs  
   
      using System.Collections;
      using System.Collections.Generic;
      using UnityEngine;
      using WebSocketSharp;

      public class WSVoiceRecording : MonoBehaviour
      {
          private WebSocket ws_;
          private void Awake()
          {
              //connect 
              ws_ = new WebSocket("ws://192.168.0.103:12002");

              //On catch message event
              ws_.OnMessage += (sender, e) =>
              {
                  Debug.Log(e.Data); // 認識結果
              };
              ws_.Connect();
          }

          private void OnApplicationQuit()
          {
              ws_.Close();
          }
      }
   
   ##### index.html  
   
         <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>Web Speech API WebSocket Sender</title>
        <script>
          (function() {
               // WebSocket でサーバと接続
            var ws = new WebSocket('wss://localhost:{CHROME_PORT}');

               // ここからテンプレ
               // Web Speech API で音声認識
            var recognition = new webkitSpeechRecognition();

              // 連続音声認識
            recognition.continuous = true;

              // エラー表示
            recognition.onerror = function(err) {
                console.error(err);
            }

             // 無音停止時に自動で再開
            recognition.onaudioend = function() {
                recognition.stop();
                setTimeout(function() {
                  recognition.start();
                }, 1000);
            }

             // 音声認識結果をサーバへ送信
            recognition.onresult = function(event) {
              for (var i = event.resultIndex; i < event.results.length; ++i) {
                var result = event.results[event.resultIndex][0].transcript;
                document.getElementById('result').innerHTML = result;
                ws.send(result);
                // 最終的にwsで送信
              }
            }

             // 音声認識開始　
            recognition.start();
          })();
        </script>
      </head>
      <body>
        <h1>recognition</h1>
        <div id="result"></div>
      </body>
      </html>

