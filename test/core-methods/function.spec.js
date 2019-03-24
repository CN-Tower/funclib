/**@server+*//* module.exports = function (fn, assert) { /**@server=|*/
  describe('Function Methods:', function () {
    describe('#rest()', function () {
      it(`fn.rest(null) should throw a error`, function () {
        try {
          fn.rest(null);
          assert(false);
        } catch (e) {
          assert( e instanceof TypeError );
        };
      });
      it(`fn.rest(function(args) {})(1,2) args should return [1, 2]`, function () {
        fn.rest(function(args) {
          assert.deepEqual(args, [1, 2]);
        })(1, 2)
      });
    });

    describe('#debounce()', function () {
      it.skip(`fn.debounce(200,function(){return true}) should return true`, function (done) {
        let num = 0
        fn.interval('debunce', 20, function () {
          fn.debounce(500, function () {
            num++;
            assert(num === 1);
            done();
            return true;
          });
        }, 20);
        fn.timeout(800, () => fn.interval('debunce', false));
      });
    });

    describe('#throttle()', function () {
      it.skip(`fn.throttle(200, function(){return true}) should return true`, function (done) {
        let num = 0;
        fn.interval('throttle', 20, function () {
          fn.throttle(200, function () {
            num++;
            return true;
          });
        });
        fn.timeout(805, function () {
          assert(num === Math.floor(805 / 200));
          done();
        });
      });
    });
  });
/**@server+*//* } /**@server=|*/
