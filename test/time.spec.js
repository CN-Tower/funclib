describe('Time Methods:', function () {
  describe('#fn.interval()', function () {
    it.skip(`fn.interval(timerId, duration, callback) should create a interval timer.`, function (done) {
      let count = 0;
      fn.interval(() => {
        count++
        if (count === 5) fn.interval('test').stop();
      }, 1000, 'test');
      fn.timeout(() => {
        assert(count === 5);
        done();
      }, 5500);
    });
  });
  describe('#fn.time()', function () {
    it(`fn.time() should return a time stamp.`, function () {
      assert(/^[0-9]{13}$/.test(fn.time()) === true);
    });
  });
  describe('#fn.fmtDate()', function () {
    it(`fn.fmtDate('yy-MM-dd hh:mm:ss') should return a fmted date string.`, function () {
      const t1 = fn.fmtDate('yy-MM-dd hh:mm:ss');
      assert(/^\d\d-\d\d-\d\d\s\d\d:\d\d:\d\d$/.test(t1) === true);
    });
    it.skip(`fn.fmtDate(yyyy-MM-dd hh:mm', time) should return a fmted date string.`, function () {
      const t2 = fn.fmtDate('yyyy-MM-dd hh:mm', 1528259400000);
      assert(t2 === '2018-06-06 12:30');
    });
    it(`fn.fmtDate('yy-MM-dd hh:mm', date) should return a fmted date string.`, function () {
      const t3 = fn.fmtDate('yy-MM-dd hh:mm', new Date('2018-06-06 12:30'));
      assert(t3 === '18-06-06 12:30');
    });
  });
});
