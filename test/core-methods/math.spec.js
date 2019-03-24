/**@server+*//* module.exports = function (fn, assert) { /**@server=|*/
  describe('Math Methods:', function () {
    describe('#fn.random()', function () {
      it(`fn.random() should return a Int between (0, 1).`, function () {
        const rdnum = fn.random();
        assert(fn.typeOf(rdnum, 'num') && 0 < rdnum && rdnum < 1);
      });
      it(`fn.random(5) should return a Int between [0, 5).`, function () {
        const rdnum = fn.random(5);
        assert(fn.typeOf(rdnum, 'num') && 0 <= rdnum && rdnum < 5);
      });
      it(`fn.random(5, true) should return a Int between [0, 5).`, function () {
        const rdnum = fn.random(5, true);
        assert(fn.typeOf(rdnum, 'num') && 0 <= rdnum && rdnum < 5);
      });
      it(`fn.random(5, 10) should return a Int between [5, 10).`, function () {
        const rdnum = fn.random(5, 10);
        assert(fn.typeOf(rdnum, 'num') && 5 <= rdnum && rdnum < 10);
      });
      it(`fn.random(10, 5) should return a Int between [10, 5).`, function () {
        const rdnum = fn.random(10, 5);
        assert(fn.typeOf(rdnum, 'num') && 5 < rdnum && rdnum <= 10);
      });
    });
    describe('#fn.gid()', function () {
      it(`fn.gid() should return an random ID with a length of 12.`, function () {
        assert(/^[0-9A-Z]{12}$/.test(fn.gid()));
      });
      it(`fn.gid(6) should return an random ID with a length of 6.`, function () {
        assert(/^[0-9A-Z]{6}$/.test(fn.gid(6)));
      });
    });
    describe('#fn.gcolor()', function () {
      it(`fn.gcolor() should return an random color.`, function () {
        assert(/^#[0-9a-fA-F]{6}$/.test(fn.gcolor()));
      });
    });
  });
/**@server+*//* } /**@server=|*/
