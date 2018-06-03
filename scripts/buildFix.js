const fs = require('fs');
const path = require('path');
const dist = path.resolve(__dirname, '../', 'dist', 'funclib.min.js');

let funclibMin = fs.readFileSync(dist, {encoding: 'utf8'})
    .replace(/factory\(\)/mg, 'new (factory().Funclib)(root)')
    .replace(/define\(\[\], factory\)/, 'define([root], function(root) {new (factory().Funclib)(root)})');
fs.writeFileSync(dist, funclibMin, {encoding: 'utf8', flag: 'w'});