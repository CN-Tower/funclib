import rest from './rest';
import patternBase from './_patternBase';


/**
 * [fn.testPattern]用一个或几个通用正则测试
 * @param srcStr : string
 * @param type_  : 'cnChar'|'dbChar'|'email'|'phone'|'telephone'|'idCard'|'uuid'|'base64Code'|'domain'|
 * 'port'|'ip'|'ipUrl'|'domainUrl'|'url'|'ipWithPortUrl'|'domainWithPortUrl'|'withPortUrl'
 * @param types  : ...string[]
 * @param limit  : boolean = true
 */
var testPattern = rest(function (srcStr, type_, types) {
  if (!srcStr || !type_) return false;
  return patternBase(srcStr, [type_].concat(types), true);
});

export default testPattern;