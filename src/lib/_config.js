/**@config*/

var version = '3.5.10';

var undefined, UDF = undefined
  , _global = typeof global == 'object' && global && global.Object === Object && global
  , _self = typeof self == 'object' && self && self.Object === Object && self
  , _exports = typeof exports == 'object' && exports && !exports.nodeType && exports
  , _module = _exports && typeof module == 'object' && module && !module.nodeType && module
  , root = _global || _self || Function('return this')()
  , oldFn = root.fn;

var deCodes = ['&', '<', '>', ' ', '\'', '"']
  , enCodes = ['&amp;', '&lt;', '&gt;', '&nbsp;', '&#39;', '&quot;'];

/**
 * 常用的正则表达式收集
 */
var patterns = {
  cnChar: /[\u4e00-\u9fa5]/,
  dbChar: /[^x00-xff]/,
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  mobPhone: /(\+?0?86\-?)?1[3456789]\d{9}/,
  telPhone: /((d{3,4})|d{3,4}-)?d{7,8}/,
  idCard: /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/,
  uuid: /[0-9a-zA-Z]{8}-([0-9a-zA-Z]{4}-){3}[0-9a-zA-Z]{12}/,
  base64Code: /([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/,
  domain: /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/,
  port: /([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/,
  ip: /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/,
  url_: /(\/([^?#]*))?(\?([^#]*))?(#(.*))?/
};
patterns['ipUrl'] = new RegExp('http(s)?://' + patterns.ip.source + '(:' + patterns.port.source + ')?' + patterns.url_.source);
patterns['domainUrl'] = new RegExp('http(s)?://' + patterns.domain.source + '(:' + patterns.port.source + ')?' + patterns.url_.source);
patterns['url'] = new RegExp('http(s)?://(' + patterns.ip.source + '|' + patterns.domain.source + ')(:' + patterns.port.source + ')?' + patterns.url_.source);

var colorList = {
  'grey': '\x1B[90m%s\x1B[0m',
  'blue': '\x1B[34m%s\x1B[0m',
  'cyan': '\x1B[36m%s\x1B[0m',
  'green': '\x1B[32m%s\x1B[0m',
  'magenta': '\x1B[35m%s\x1B[0m',
  'red': '\x1B[31m%s\x1B[0m',
  'yellow': '\x1B[33m%s\x1B[0m',
  'default': '%s\x1B[0m'
};

/**@config*/
module.exports = {
  version: version,
  UDF: UDF,
  root: root,
  oldFn: oldFn,
  deCodes: deCodes,
  enCodes: enCodes,
  patterns: patterns,
  colorList: colorList
};
