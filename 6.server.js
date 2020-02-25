function handleHttp(req , res){
    if(req.method == "GET"){
        if(/^\/\d+(?=$|[\/?#])/.test(req.url)){
            req.addListener("end",function(){
                req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html")
                staticServer.serve(req,res);
            });
            req.resume();
        }
        else{
            res.writeHead(403);
            res.end("Get out!");
        }
    }
    else{
        res.writeHead(403);
        res.end("Get outta here");
    }
}

var http  = require('http');

var host = "localhost";
var port = 8500;
var httpServer = http.createServer(handleHttp).listen(port , host);

var ASQ = require('asynquence');
var nodeStatic = require("node-static");
var staticServer = new nodeStatic.Server(__dirname);