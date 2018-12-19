/**@server+*//*
module.exports = function (fn, assert) {
/**@server=|*/
  describe('RegExp Methods:', function () {
    describe('#fn.getPattern()', function () {
      it(`fn.getPattern("email") should return a pattern.`, function () {
        const pattern = fn.getPattern("email");
        assert(pattern instanceof RegExp);
      });
    });
    describe('#fn.matchPattern()', function () {
      it(`fn.matchPattern(email, 'email') should return true.`, function () {
        const email = 'cntower@yahoo.com'
        assert(fn.matchPattern(email, 'email'));
      });
      it(`fn.matchPattern(mobPhone, 'email') should return false.`, function () {
        const mobPhone = '18770347138'
        const email = 'cntower@yahoo.com'
        assert(!fn.matchPattern(mobPhone, 'email'));
      });
    });
  });
/**@server+*//*
}
/**@server=|*/
