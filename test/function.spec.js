describe('Function Methods:', function () {
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
