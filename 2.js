#!/usr/bin/env node

function printHelp(){
    console.log("1.js Rachit");
    console.log("");
    console.log("usage:");
    console.log("--help     print this help");
    console.log("--name       say hellp to {NAME}");
    console.log("--file       read file to {File}");
}
var args = require('minimist')(process.argv.slice(2),{string: "file"});
//console.log(args)
if(args.help || !args.file){
    printHelp();
    process.exit(1);
}

var say = require('./helloworld');
say.say(args.file , function(err ,contents){
    console.log("asjkdhaskj")
    console.log(contents.toString())
}
)
