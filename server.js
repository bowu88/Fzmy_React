'use strict'
const http = require("http");
const url  = require("url");
const process = require('child_process');
const qs   = require('querystring');
var config = require("./webpack.config.js");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var compiler = webpack(config);
var webPackServer = new WebpackDevServer(webpack(config),{
	  stats: { colors: true },
	  hot:true
})
webPackServer.listen(8080, '127.0.0.1', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('\x1b[32m\x1b[1mListening at localhost:8080');
});

const server = http.createServer(function(req,res){
    var query = url.parse(req.url).query;
	res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin":"http://127.0.0.1:8080"
    });
    if(req.url.indexOf("favico") >-1){
    	res.end(null);
    	return;
    }
    let _res = res;
    var link = qs.parse(query).link;
    if(!query.match("&.*")){ //POST提交
        var reqData = "";
        req.addListener("data",function(chunk){
            reqData += chunk;
        }).addListener("end",function(){
          console.log(reqData);
          var post = http.request({
            host:url.parse(link).host,
            port:80,
            path:url.parse(link).path,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(reqData.length)
            }
          },function(postRes){
            var data= "";
            postRes.setEncoding("utf8");
            postRes.on("data",function(chunk){
              data+=chunk;
              console.log(data);
            }).on("end",function(){
              console.log(data);
              _res.end(data);
            })
          });
          post.write(reqData);
          post.end();
        })
    }else{
        http.get(link+"?"+query.match("&.*")[0], function(res) {
          var resData = [];
          res.on("data", function(chunk){
              resData.push(chunk);
          })
          .on("end", function(){
            _res.end(resData.join(""));
          });
        }).on('error', function(e) {
                _res.end(JSON.stringify(e));
        });
    }
})
// process.exec("npm run process");
server.listen(8081);
console.log("\x1b[32m\x1b[1mproxy server on the 8081:");