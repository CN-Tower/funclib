(function() {
  const root = this;
  const $ = root.$ || root.jquery;
  const previousfn = root.fn;

  /*pxfunc*/

  const fn = new PxFunc();

  fn['version'] = '1.0.1';
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
    define('pxfunc', [], function() {
      return fn;
    });
  }
}.call(this));





