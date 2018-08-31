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
    it(`fn.random(5, 10) should return a Int between [5, 10).`, function () {
      const rdnum = fn.random(5, 10);
      assert(fn.typeOf(rdnum, 'num') && 5 <= rdnum && rdnum < 10);
    });
  });
  describe('#fn.rdid()', function () {
    it(`fn.rdid() should return an random ID with a length of 12.`, function () {
      assert(/^[0-9A-Z]{12}$/.test(fn.rdid()));
    });
    it(`fn.rdid(6) should return an random ID with a length of 6.`, function () {
      assert(/^[0-9A-Z]{6}$/.test(fn.rdid(6)));
    });
  });
  describe('#fn.rdcolor()', function () {
    it(`fn.rdcolor() should return an random color.`, function () {
      assert(/^#[0-9a-fA-F]{6}$/.test(fn.rdcolor()));
    });
  });
});
