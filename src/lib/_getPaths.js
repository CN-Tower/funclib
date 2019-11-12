var contains = require('./contains');
var drop = require('./drop');

/**@function*/

function getPaths(pathStr) {
  return contains(pathStr, '.') ? drop(pathStr.split('.')) : drop(pathStr.split('/'));
}

/**@function*/
module.exports = getPaths;