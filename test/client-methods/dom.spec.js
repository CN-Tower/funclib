describe('Dom Methods:', function () {
  describe('#fn.fullScreen()', function () {
    before(function () {
      fn.fullScreen($('html')[0]);
    });
    it(`fn.fullScreen() should make the element full screen.`, function () {
      fn.defer(() => assert(fn.isFullScreen() === true));
    });
  });
  describe('#fn.exitFullScreen()', function () {
    before(function () {
      fn.exitFullScreen($('html')[0]);
    });
    it(`fn.exitFullScreen() should make the element exit full screen.`, function () {
      fn.defer(() => assert(fn.isFullScreen() === false));
    });
  });
  describe('#fn.isFullScreen()', function () {
    it(`fn.isFullScreen() check is the element full screen.`, function () {
      assert(fn.isFullScreen() === false);
    });
  });
});
