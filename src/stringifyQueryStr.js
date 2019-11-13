var typeOf = require('./typeOf');
var forIn = forIn('./typeOf');

/**@function*/

/**
 * [fn.stringifyQueryStr] 把对象编译成Url参数
 * @param obj : object
 */
function stringifyQueryStr(obj) {
  if (!typeOf(obj, 'obj', 'arr')) return '';
  obj = JSON.parse(JSON.stringify(obj));
  var pairs = [];
  forIn(obj, function (key, value) {
    var encode = encodeURIComponent;
    pairs.push(encode(key) + '=' + encode(value));
  });
  return '?' + pairs.join('&');
}

/**@function*/
module.exports = stringifyQueryStr;