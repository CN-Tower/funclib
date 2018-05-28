"use strict";
exports.__esModule = true;
var funclib_1 = require("./src/app/funclib");
var fn = new funclib_1.Funclib(this);
console.log(fn.timeStamp(new Date()));
console.log(fn.fmtedDate('yy-MM-dd hh:mm', new Date()));

 fn.log("", {part: "end"}) 
