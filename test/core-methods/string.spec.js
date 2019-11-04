/**@server+*//* module.exports = function (fn, assert) { /**@server=|*/
  describe('String Methods:', function () {
    describe('#fn.match()', function () {
      it(`fn.match('b', false) should throw an error.`, function () {
        try {
          fn.match('b', false);
          assert(false);
        } catch (e) {
          assert(true);
        }
      });
      it(`fn.match('b', {'a': 'aaa', 'b': 'bbb'}) should return 'bbb'.`, function () {
        assert(fn.match('b', { 'a': 'aaa', 'b': 'bbb' }) === 'bbb');
      });
      it(`fn.match('a', {'a': '@next', 'b': () => 'bbb'}) should return 'bbb'.`, function () {
        assert(fn.match('a', { 'a': '@next', 'b': () => 'bbb' }) === 'bbb');
      });
      it(`fn.match('a', {'a': '@next', 'b': () => 'bbb'}, false) should return a function.`, function () {
        assert(fn.match('a', { 'a': '@next', 'b': () => 'bbb' }, false)() === 'bbb');
      });
      it(`fn.match('b', {'a': 'aa', 'b': '@next', 'c': '@next'}) should return undefined.`, function () {
        assert(fn.match('b', {'a': 'aa', 'b': '@next', 'c': '@next'}) === undefined);
      });
      it(`fn.match('b', {'a': 'aa', 'b': '@next', 'c': '@next', 'default': 'ddd'}) should return 'ddd'.`, function () {
        assert(fn.match('b', {'a': 'aa', 'b': '@next', 'c': '@next', 'default': 'ddd'}) === 'ddd');
      });
      it(`fn.match('b', {'a': 'aa', 'b': '@next', 'c': 'ccc', 'd': 'ddd'}) should return 'ccc'.`, function () {
        assert(fn.match('b', {'a': 'aa', 'b': '@next', 'c': 'ccc', 'd': 'ddd'}) === 'ccc');
      });
      it(`fn.match('b', {'a': 'aa', 'b': '@next', 'c': '@next', 'd': 'ddd'}) should return 'ddd'.`, function () {
        assert(fn.match('b', {'a': 'aa', 'b': '@next', 'c': '@next', 'd': 'ddd'}) === 'ddd');
      });
      it(`fn.match('c', {'a': 'aaa', 'b': () => 'bbb'}) should return undefined.`, function () {
        assert(fn.match('c', { 'a': 'aaa', 'b': () => 'bbb' }) === undefined);
      });
      it(`fn.match('c', {'a': 'aaa', 'default': 'ddd'}) should return 'ddd'.`, function () {
        assert(fn.match('c', { 'a': 'aaa', 'default': 'ddd' }) === 'ddd');
      });
      it(`fn.match('c', {'a': 'aaa', 'default': s => ccc }) should return 'ccc'.`, function () {
        assert(fn.match('c', {
          'a': 'aaa', 'default': s => {
            if (s === 'c') return 'ccc';
          }
        }) === 'ccc');
      });
    });
    const html = '<div></div>';
    const htmlStr = '&lt;div&gt;&lt;/div&gt;';
    describe('#fn.escape()', function () {
      it(`fn.escape(html) should return a encoded string.`, function () {
        assert(fn.escape(html) === htmlStr);
      });
    });
    describe('#fn.unescape()', function () {
      it(`fn.unescape(htmlStr) should return a html tag.`, function () {
        assert(fn.unescape(htmlStr) === html);
      });
    });
    describe('#fn.pretty()', function () {
      it(`fn.pretty([{}]) should return a fmted str.`, function () {
        assert(fn.pretty([{}]).match(/\n\s*/));
      });
    });
    describe('#fn.capitalize()', function () {
      it(`fn.capitalize('abc') should return 'Abc'.`, function () {
        assert(fn.capitalize('abc') === 'Abc');
      });
    });
    describe('#fn.fmtCurrency()', function () {
      it(`fn.fmtCurrency(8888888) should return '8,888,888.00'.`, function () {
        assert(fn.fmtCurrency(8888888) === '8,888,888.00');
      });
    });
    describe('#fn.maskString()', function () {
      it(`fn.maskString(18770347037, 3, 4) should return '187****7037'.`, function () {
        assert(fn.maskString(18770347037, 3, 4) === '187****7037');
      });
      it(`fn.maskString(18770347037, 3) should return '187********'.`, function () {
        assert(fn.maskString(18770347037, 3) === '187********');
      });
      it(`fn.maskString('18770347037', 3, 4, 'x') should return '187****7037'.`, function () {
        assert(fn.maskString('18770347037', 3, 4, 'x') === '187xxxx7037');
      });
      it(`fn.maskString('测试双字节', 2, 1) should return '测试**字节'.`, function () {
        assert(fn.maskString('测试双字节', 2, 1) === '测试**字节');
      });
    });
    describe('#fn.cutString()', function () {
      const str = 'Hello, 世界';
      it(`fn.cutString(str, 5) should return a subStr.`, function () {
        assert(fn.cutString(str, 5) === 'Hello...');
      });
    });
    describe('#fn.parseQueryStr()', function () {
      it(`fn.parseQueryStr(url) should return a paramsObj`, function () {
        const url = 'https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10';
        assert.deepEqual(fn.parseQueryStr(url), {
          wd: '百度',
          rsv_spt: '10'
        });
      });
      it(`fn.parseQueryStr('www.baidu.com?a=123&b=%26') deepEqual '{
            a: '123',
            b: '&'
        }' should return true`, function () {
          let url = 'www.baidu.com?a=123&b=%26'
          assert.deepEqual(fn.parseQueryStr(url), {
            a: '123',
            b: '&'
          });
        });
      it(`fn.parseQueryStr('') deepEqual '{}' should return true`, function () {
        let url = ''
        assert.deepEqual(fn.parseQueryStr(url), {})
      });
    });
    describe('#fn.stringifyQueryStr()', function () {
      it(`fn.stringifyQueryStr({
            wd: '百度',
            rsv_spt: '10'
        }) === '?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10'  should return true`, function () {
          let param = {
            wd: '百度',
            rsv_spt: '10'
          }
          assert(fn.stringifyQueryStr(param) === '?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10')
        });
    });
  });
/**@server+*//* } /**@server=|*/
