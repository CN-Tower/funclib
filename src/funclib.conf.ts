export const VERSION = 'v2.2.10';

export type Types = 'arr' | 'obj' | 'fun' | 'str' | 'num' | 'bol' | 'udf' | string | string[];

export const MAIN_METHODS = [
  /* Type */
  'typeOf',
  'typeVal',

  /* Array */
  'array',
  'toArr',
  'toArray',
  'find',
  'filter',
  'reject',
  'contains',
  'drop',
  'flatten',
  'pluck',
  'uniq',
  'indexOf',
  'forEach',
  'sortBy',

  /* Object */
  'len',
  'has',
  'get',
  'pick',
  'forIn',
  'extend',
  'deepCopy',
  'isEmpty',
  'isDeepEqual',

  /* Math */
  'random',
  'rdid',
  'rdcolor',

  /* Time */
  'interval',
  'timeout',
  'defer',
  'time',
  'fmtDate',

  /* String */
  'match',
  'pretty',
  'escape',
  'unescape',
  'encodeHtml',
  'decodeHtml',
  'capitalize',
  'fmtCurrency',
  'cutString',
  'parseQueryStr',
  'stringifyQueryStr',

  /* RegExp */
  'getPattern',
  'matchPattern',

  /* Function */
  'throttle',
  'debounce',

  /* Log */
  'log'
]
