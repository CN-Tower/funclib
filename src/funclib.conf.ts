export const VERSION = 'v2.2.1';

export const MAIN_METHODS = [
    /* Type */
    'typeOf',
    'typeValue',

    /* Array */
    'array',
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
    'forIn',
    'overlay',
    'deepCopy',
    'get',

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
    'encodeHtml',
    'decodeHtml',
    'fmtCurrency',
    'cutString',

    /* RegExp */
    'getPattern',
    'matchPattern',

    /* Function */
    'throttle',
    'debounce',

    /* Url */
    'parseQueryString',
    'stringfyQueryString',
]

export const COLOR_LIST= {
    'grey': '\x1B[90m%s\x1B[0m',
    'blue': '\x1B[34m%s\x1B[0m',
    'cyan': '\x1B[36m%s\x1B[0m',
    'green': '\x1B[32m%s\x1B[0m',
    'magenta': '\x1B[35m%s\x1B[0m',
    'red': '\x1B[31m%s\x1B[0m',
    'yellow': '\x1B[33m%s\x1B[0m',
    'default': '%s\x1B[0m'
}
