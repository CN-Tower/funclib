/**@server+*//* module.exports = function (fn, assert) { /**@server=|*/
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
    describe('#fn.timestamp()', function () {
      it(`fn.timestamp() should return NaN.`, function () {
        assert(isNaN(fn.timestamp()));
      });
      it(`fn.timestamp(new Date()) should return a timestamp.`, function () {
        assert(/^[0-9]{13}$/.test(fn.timestamp(new Date())) === true);
      });
    });
    describe('#fn.time()', function () {
      it(`fn.time() should return NaN.`, function () {
        assert(isNaN(fn.time()));
      });
      it(`fn.time(new Date()) should return a time.`, function () {
        assert(/^[0-9]{13}$/.test(fn.time(new Date())) === true);
      });
    });
    describe('#fn.asUtcTime()', function () {
      it(`fn.asUtcTime() should return NaN.`, function () {
        assert(isNaN(fn.asUtcTime()));
      });
      it(`fn.asUtcTime(new Date()) should return a timestamp.`, function () {
        assert(/^[0-9]{13}$/.test(fn.asUtcTime(new Date())) === true);
      });
    });
    describe('#fn.asXyzTime()', function () {
      it(`fn.asXyzTime() should return NaN.`, function () {
        assert(isNaN(fn.asXyzTime()));
      });
      it(`fn.asXyzTime(new Date()) should return a timestamp.`, function () {
        assert(/^[0-9]{13}$/.test(fn.asXyzTime(new Date())) === true);
      });
      it(`fn.asXyzTime(new Date()) should return a timestamp.`, function () {
        assert(/^[0-9]{13}$/.test(fn.asXyzTime(new Date(), 1000)) === true);
      });
    });
    describe('#fn.fmtDate()', function () {
      it(`fn.fmtDate('yy-MM-dd hh:mm:ss', 'abcd') should return ''.`, function () {
        assert(fn.fmtDate('yy-MM-dd hh:mm:ss', 'abcd') === '');
      });
      it(`fn.fmtDate('yy-MM-dd hh:mm:ss', new Date()) should return a fmted date string.`, function () {
        const t1 = fn.fmtDate('yy-MM-dd hh:mm:ss', new Date());
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
    describe('#fn.fmtUtcDate()', function () {
      it(`fn.fmtUtcDate('yy-MM-dd hh:mm:ss', 'abcd') should return ''.`, function () {
        assert(fn.fmtUtcDate('yy-MM-dd hh:mm:ss', 'abcd') === '');
      });
      it(`fn.fmtUtcDate('yy-MM-dd hh:mm:ss', new Date()) should return a fmted date string.`, function () {
        const t1 = fn.fmtUtcDate('yy-MM-dd hh:mm:ss', new Date());
        assert(/^\d\d-\d\d-\d\d\s\d\d:\d\d:\d\d$/.test(t1) === true);
      });
      it.skip(`fn.fmtUtcDate(yyyy-MM-dd hh:mm', time) should return a fmted date string.`, function () {
        const t2 = fn.fmtUtcDate('yyyy-MM-dd hh:mm', 1528259400000);
        // assert(t2 === '2018-06-06 04:30');
        assert(/^\d\d\d\d-\d\d-\d\d\s\d\d:\d\d$/.test(t2) === true);
      });
      it(`fn.fmtUtcDate('yy-MM-dd hh:mm', date) should return a fmted date string.`, function () {
        const t3 = fn.fmtUtcDate('yy-MM-dd hh:mm', new Date('2018-06-06 12:30'));
        // assert(t3 === '18-06-06 04:30');
        assert(/^\d\d-\d\d-\d\d\s\d\d:\d\d$/.test(t3) === true);
      });
    });
    describe('#fn.fmtXyzDate()', function () {
      it(`fn.fmtXyzDate('yy-MM-dd hh:mm:ss', 'abcd') should return ''.`, function () {
        assert(fn.fmtXyzDate('yy-MM-dd hh:mm:ss', 'abcd') === '');
      });
      const offset = 5.5 * 60 * 60 * 1000;
      it(`fn.fmtXyzDate('yy-MM-dd hh:mm:ss', new Date(), offset) should return a fmted date string.`, function () {
        const t1 = fn.fmtXyzDate('yy-MM-dd hh:mm:ss', new Date(), offset);
        assert(/^\d\d-\d\d-\d\d\s\d\d:\d\d:\d\d$/.test(t1) === true);
      });
      it.skip(`fn.fmtXyzDate(yyyy-MM-dd hh:mm', time) should return a fmted date string.`, function () {
        const t2 = fn.fmtXyzDate('yyyy-MM-dd hh:mm', 1528259400000, offset);
        // assert(t2 === '2018-06-06 10:00');
        assert(/^\d\d\d\d-\d\d-\d\d\s\d\d:\d\d$/.test(t2) === true);
      });
      it(`fn.fmtXyzDate('yy-MM-dd hh:mm', date) should return a fmted date string.`, function () {
        const t3 = fn.fmtXyzDate('yy-MM-dd hh:mm', new Date('2018-06-06 12:30'), offset);
        // assert(t3 === '2018-06-06 10:00');
        assert(/^\d\d-\d\d-\d\d\s\d\d:\d\d$/.test(t3) === true);
      });
    });
  });
/**@server+*//* } /**@server=|*/
