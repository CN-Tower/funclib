/**@server+*//* module.exports = function (fn, assert) { /**@server=|*/
  describe('RegExp Methods:', function () {
    describe('#fn.setPattern()', function () {
      it(`fn.setPattern('myPtn', /test_/) should set A pattern.`, function () {
        fn.setPattern('myPtn', /test_/);
        test1 = fn.matchPattern('test', 'myPtn');
        test2 = fn.matchPattern('test_', 'myPtn');
        test3 = fn.matchPattern('test_x', 'myPtn');
        test4 = fn.matchPattern('test_x', 'myPtn', false);
        assert(!test1 && test2 && !test3 && test4);
      });
    });
    describe('#fn.getPattern()', function () {
      it(`fn.getPattern("email") should return a pattern.`, function () {
        const pattern = fn.getPattern("email");
        assert(pattern instanceof RegExp);
      });
    });
    describe('#fn.testPattern()', function () {
      it(`fn.testPattern(email, 'email') should return true.`, function () {
        const email = 'cntower@yahoo.com';
        assert(fn.testPattern(email, 'email') === true);
      });
      it(`fn.testPattern(url, 'url') should return true.`, function () {
        const url = 'http://www.ora.com:80/goodparts?query=a123#fragment';
        assert(fn.testPattern(url, 'url') === true);
      });
    });
    describe('#fn.matchPattern()', function () {
      it(`fn.matchPattern(email, 'email') should return true.`, function () {
        const email = 'cntower@yahoo.com';
        assert(fn.matchPattern(email, 'email')[0] === email);
      });
      it(`fn.matchPattern(email, 'mobPhone', 'email') should return true.`, function () {
        const email = 'cntower@yahoo.com';
        assert(fn.matchPattern(email, 'mobPhone', 'email'));
      });
      it(`fn.matchPattern(mobPhone, 'email') should return false.`, function () {
        const mobPhone = '18770347138';
        const email = 'cntower@yahoo.com';
        assert(!fn.matchPattern(mobPhone, 'email'));
      });
    });
  });
/**@server+*//* } /**@server=|*/
