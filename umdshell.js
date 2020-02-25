(function UMD(name , context , definition){
    if(typeof module !== "undefined" && module.exports){}
    else if(typeof define === "function" && define.amd{}
    else {context[name] = definition(name , context);}
})("YourMOduleName" , this , function DEF(name ,context){
    var publicAPI = {/*..*/};
    return publicAPI;
})