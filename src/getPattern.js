import isUdf from './isUdf';
import has from './has';
import keys from './keys';
import contains from './contains';
var patterns = require('./_config').patterns;


/**
 * [fn.getPattern]获取一个通用的正则表达式
 * @param type_ : string
 * @param limit : boolean = true
 */
function getPattern(type_, limit) {
  if (!type_) return;
  if (isUdf(limit)) limit = true;
  if (contains(['all', 'list'], type_)) return keys(patterns);
  if (!has(patterns, type_)) return UDF;
  var pattern = patterns[type_];
  return limit ? new RegExp('^(' + pattern.source.replace(/^(\^|\$)$/mg, '') + ')$') : pattern;
}

export default getPattern;