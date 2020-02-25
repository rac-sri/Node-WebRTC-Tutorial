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
function handleIO(socket){
    function disconnect(){
        clearInterval(intv)
        console.log("client disconnected");
    }
    console.log("client connected");
    socket.on("disconnect",disconnect)
    var intv = setInterval(function(){
        socket.emit("hello", Math.random())
    },1000)
}
var http  = require('http');

var host = "localhost";
var port = 8500;
var httpServer = http.createServer(handleHttp).listen(port , host);

var ASQ = require('asynquence');
var nodeStatic = require("node-static");
var staticServer = new nodeStatic.Server(__dirname);

var io = require('socket.io').listen(httpServer);

io.on("connection" , handleIO);

io.configure(function(){
    io.enable("brower client minification");
    io.enable("brower client etag");
    io.set("log level", 1);
    io.set("transports" , [
        "websocket",
        "xhr-polling",
        "jsonp-polling"
    ])
})