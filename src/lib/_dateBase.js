var isDat = require('./isDat');

/**@function*/

function dateBase(time) {
  if (isDat(time)) return time;
  time = String(time);
  return new Date(time.match(/^[0-9]*$/) ? +time : time);
}

/**@function*/
module.exports = dateBase;