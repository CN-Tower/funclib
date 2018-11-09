describe('Cookie Methods:', function () {
  describe('#fn.setCookie()', function () {
    before(function () {
      fn.setCookie('user', 'Tom');
    });
    it.skip(`fn.setCookie() should set a cookie.`, function () {
      assert(fn.getCookie('user') === 'Tom');
    });
  });
  describe('#fn.getCookie()', function () {
    before(function () {
      fn.setCookie('pwd', 'Tom_123');
    });
    it.skip(`fn.getCookie() should got a cookie.`, function () {
      assert(fn.getCookie('pwd') === 'Tom_123');
    });
  });
  describe('#fn.removeCookie()', function () {
    before(function () {
      fn.removeCookie('user');
      fn.removeCookie('pwd');
    });
    it.skip(`fn.removeCookie() should remove a cookie.`, function () {
      const user = fn.getCookie('user');
      const pwd = fn.getCookie('pwd');
      assert(!!user === false && !!pwd === false);
    });
  });
});
