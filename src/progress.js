var isObj = require('./isObj');
var isFun = require('./isFun');
var has = require('./has');
var get = require('./get');
var contains = require('./contains');
var typeVal = require('./typeVal');
var timeout = require('./timeout');
var interval = require('./interval');

/**@function*/

var pgBarId = '#FN_PG_BAR', pgSpiId = '#FN_PG_SPI';

/**
 * [fn.progress] 进度显示工具
 * @param title: string
 * @param options: object [?]
 * title: string
 * width: number = 40
 * type : 'bar'|'spi' = 'bar'
 * split: boolean = true
 */
function progress(title, options) {
  timeout(pgBarId).stop(), interval(pgSpiId).stop();
  var progressBar, duration, pgType;
  if (isObj(title)) {
    options = title, title = UDF;
  }
  if (!options) options = {};
  title = typeVal(title, 'str') || get(options, '/title', 'str') || 'funclib ' + version;
  options.title = title;
  pgType = get(options, '/type', 'str');
  if (has(options, 'isSplit', 'bol') ? options.isSplit : true) console.log('');
  if (pgType === 'bar' || !contains(['bar', 'spi'], pgType)) {
    var Pgbar = eval('require("progress")');
    var prog = (options.title || '[fn.progress]') + ' [:bar] :percent';
    pgType = 'bar';
    duration = 250;
    progressBar = new Pgbar(prog, {
      complete: '=', incomplete: ' ',
      width: options['width'] || 40,
      total: options['total'] || 20
    });
    tick('+');
  }
  else {
    var stream = process.stderr;
    var flag = '/';
    interval(pgSpiId, 180, function () {
      stream.clearLine();
      stream.cursorTo(0);
      stream.write(chalk(flag, 'cyan') + ' ' + title);
      flag = match(flag, { '/': '-', '-': '\\', '\\': '|', '|': '/', '@dft': '-' });
    });
  }

  /**
   * [fn.progress.stop] 结束进度条，结束后触发回调
   * @param onStopped : function [?]
   */
  progress.stop = function (onStopped) {
    if (pgType === 'bar') {
      duration = 600;
      tick('-', function () {
        pgType = null;
        if (isFun(onStopped)) onStopped();
      });
    }
    else {
      interval(pgSpiId).stop();
      pgType = null;
      if (isFun(onStopped)) onStopped();
    }
  }

  /**
   * [fn.progress.clear] 立即结束进度条，并触发回调
   * @param onStopped : function [?]
   */
  progress.clear = function (onStopped) {
    if (pgType === 'bar') {
      pgType = null;
      progressBar.complete = true;
      timeout(pgBarId).stop();
    }
    else {
      pgType = null;
      interval(pgSpiId).stop();
    }
    if (isFun(onStopped)) onStopped();
  }

  function tick(tickType, onStopped, limited) {
    timeout(pgBarId, duration, function () {
      if (!limited) progressBar.tick();
      switch (tickType) {
        case '+': duration += 300; break;
        case '-': duration -= duration * 0.2; break;
      };
      if (!progressBar.complete) {
        var isLimit = tickType === '+' && progressBar.curr === progressBar.total -1;
        tick(tickType, onStopped, isLimit);
      }
      else if (onStopped) {
        onStopped();
      }
    });
  }
}

/**@function*/
module.exports = progress;