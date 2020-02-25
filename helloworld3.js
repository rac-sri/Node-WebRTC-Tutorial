function readFile(filename , cb){
   return ASQ(function(done){
       var stream = fs.createReadStream(filename);
       stream.on("data" , function(chunk){
        //if buffer size exceeded it gets called several time importing file in chunks
           contents += chunk;
       });
       stream.on("end" , function(){
           done(contents);
       })
   })};

function delayMsg(done , contents){
    setTimeout(function(){
        done(contents);
    },1000)
}
function asq(filename){
    return readFile(filename).then(delayMsg);
}
var fs = require('fs');
var ASQ = require('asynquence');
require('asynquence-contrib');
module.exports = {asq};