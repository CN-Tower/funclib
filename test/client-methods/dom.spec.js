describe('Dom Methods:', function () {
  describe('#fn.fullScreen()', function () {
    before(function () {
      fn.fullScreen(document.querySelector('html'));
    });
    it(`fn.fullScreen() should make the element full screen.`, function () {
      fn.defer(() => assert(fn.isFullScreen()));
    });
  });
  describe('#fn.exitFullScreen()', function () {
    before(function () {
      fn.exitFullScreen();
    });
    it(`fn.exitFullScreen() should make the element exit full screen.`, function () {
      fn.defer(() => assert(!fn.isFullScreen()));
    });
  });
  describe('#fn.isFullScreen()', function () {
    it.skip(`fn.isFullScreen() check is the element full screen.`, function () {
      assert(!fn.isFullScreen());
    });
  });
});