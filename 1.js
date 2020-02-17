#!/usr/bin/env node

function printHelp(){
    console.log("1.js Rachit");
    console.log("");
    console.log("usage:");
    console.log("--help     print this help");
    console.log("--name       say hellp to {NAME}");
}
var args = require('minimist')(process.argv.slice(2),{string: "name"});

if(args.help || !args.name){
    printHelp();
    process.exit(1);
}
var name = args.name;
console.log("Hello "+name);