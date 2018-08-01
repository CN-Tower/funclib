describe('String Methods:', function () {
    const html = '<div></div>';
    const htmlStr = '&lt;div&gt;&lt;/div&gt;';
    describe('#fn.encodeHtml()', function () {
        it(`fn.encodeHtml(html) should return a encoded string.`, function () {
            assert(fn.encodeHtml(html) === htmlStr);
        });
    });
    describe('#fn.decodeHtml()', function () {
        it(`fn.decodeHtml(htmlStr) should return a html tag.`, function () {
            assert(fn.decodeHtml(htmlStr) === html);
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
    describe('#fn.cutString()', function () {
        const str = 'Hello, 世界';
        it(`fn.cutString(str, 5) should return a subStr.`, function () {
            assert(fn.cutString(str, 5) === 'Hello...');
        });
    });
});
