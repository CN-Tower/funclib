import { EPROTONOSUPPORT } from "constants";

(function() {
  const root = this;
  const previousfn = root.fn;

  /*funclib*/

  const fn = new Funclib(root);

  fn['noConflict'] = function() {
    root.fn = previousfn;
    return this;
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = fn;
    }
    exports.fn = fn;
  } else {
    root.fn = fn;
  }

  if (typeof define === 'function' && define.amd) {
    define('funclib', [], function() {
      return fn;
    });
  }
}.call(this));
