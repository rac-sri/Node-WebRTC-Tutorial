function handleHttp(req , res){
    if(req.method == "GET"){
        if(/^\/\d+(?=$|[\/?#])/.test(req.url)){
            req.addListener("end",function(){
                req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html")
                staticServer.serve(req,res);
            });
            req.resume();
        }
        else if(req.url === "/jquery.js"){
            staticServer.serve(req,res);
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

    socket.on("typeit", function(msg){
        socket.broadcast.emit("messages" , msg);
    })

    socket.on("spy", function(x,y){
        socket.broadcast.emit("spy",{x:x , y:y});
    })
    
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