describe('Url Methods:', function () {
    describe('#fn.parseQueryString()', function () {
        it(`fn.parseQueryString(url) should return a paramsObj`, function () {
            const url = 'https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10';
            assert.deepEqual(fn.parseQueryString(url), {
                wd: '百度',
                rsv_spt: '10'
            });
        });
        it(`fn.parseQueryString('www.baidu.com?a=123&b=%26') deepEqual '{
            a: '123',
            b: '&'
        }' should return true`, function () {
            let url = 'www.baidu.com?a=123&b=%26'
            assert.deepEqual(fn.parseQueryString(url), {
                a: '123',
                b: '&'
            });
        });
        it(`fn.parseQueryString('') deepEqual '{}' should return true`, function () {
            let url = ''
            assert.deepEqual(fn.parseQueryString(url), {})
        });
    });

    describe('#fn.stringifyQueryString()', function () {
        it(`fn.stringifyQueryString({
            wd: '百度',
            rsv_spt: '10'
        }) === '?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10'  should return true`, function () {
            let param = {
                wd: '百度',
                rsv_spt: '10'
            }
            assert(fn.stringifyQueryString(param) === '?wd=%E7%99%BE%E5%BA%A6&rsv_spt=10')
        });
    });
});
