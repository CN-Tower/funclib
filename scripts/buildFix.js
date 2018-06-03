const fs = require('fs');
const path = require('path');
const dist = path.resolve(__dirname, '../', 'dist', 'funclib.min.js');

let funclibMin = fs.readFileSync(dist, {encoding: 'utf8'})
    .replace(/module\.exports=e\(\)/, 'module.exports=new (e().Funclib)(t)')
    .replace(/define\(\[\],e\)/, 'define([t], function(t) {new (e().Funclib)(t)})')
    .replace(/\.fn=e\(\)/mg, '\.fn=new (e().Funclib)(t)');
fs.writeFileSync(dist, funclibMin, {encoding: 'utf8', flag: 'w'});