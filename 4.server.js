function handleHttp(req , res){
    if(req.method == "GET"){
        if(req.url ==="/"){
            res.writeHead(200 , {"Content-type" : "text/plain"});
            res.write("Hello World : ")
            res.end(Math.random().toString());
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
