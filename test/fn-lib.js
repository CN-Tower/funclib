const assert = require('power-assert');
const fn = require('funclib');
const _fn = require('../src/lib');


fn.log('Testing lib methods', 'Server Test');

const specs = [
  {
    specPath: './core-methods/array.spec',
    libMtds: [
      'array', 'range', 'toArr', 'find', 'filter', 'reject', 'contains',
      'drop', 'flatten', 'pluck', 'uniq', 'indexOf', 'each', 'forEach', 'sortBy',
    ] 
  },
  {
    specPath: './core-methods/function.spec',
    libMtds: [
      'rest', 'debounce', 'throttle',
    ],
  },
  {
    specPath: './core-methods/math.spec',
    libMtds: [
      'random', 'randomId', 'randomColor', 'typeOf'
    ],
  },
  {
    specPath: './core-methods/object.spec',
    libMtds: [
      'len', 'has', 'get', 'set', 'pick', 'omit', 'extend', 'forIn',
      'deepCopy', 'isEmpty', 'isDeepEqual',
    ],
  },
  {
    specPath: './core-methods/pattern.spec',
    libMtds: [
      'setPattern', 'getPattern', 'testPattern', 'matchPattern',
    ],
  },
  {
    specPath: './core-methods/string.spec',
    libMtds: [
      'match', 'escape', 'unescape', 'pretty', 'capitalize', 'fmtCurrency',
      'maskString', 'cutString', 'parseQueryStr', 'stringifyQueryStr',
    ],
  },
  {
    specPath: './core-methods/time.spec',
    libMtds: [
      'interval', 'timestamp', 'time', 'asUtcTime', 'asXyzTime', 'fmtDate',
      'fmtUtcDate', 'fmtXyzDate',
    ],
  },
  {
    specPath: './core-methods/type.spec',
    libMtds: [
      'typeOf', 'typeVal', 'isStr', 'isNum', 'isBol', 'isFun', 'isNul', 'isUdf',
      'isErr', 'isDat', 'isReg', 'isArr', 'isObj', 'len',
    ],
  },
  { specPath: './server-methods/fileSys.spec', libMtds: [], },
  { specPath: './server-methods/progress.spec', libMtds: [], },
  { specPath: './server-methods/logs.spec', libMtds: [], },
];

specs.forEach(spec => {
  require(spec.specPath)(fn.pick(_fn, spec.libMtds), assert);
});