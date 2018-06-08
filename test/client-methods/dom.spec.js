describe('DOM Methods:', function () {
    describe('#fn.fullScreen()', function () {
        before(function() {
            fn.fullScreen($('html')[0]);
        });
        it(`fn.fullScreen() should make the element full screen.`, function () {
            setTimeout(function() {
                assert(fn.checkIsFullScreen($('html')[0]) === true);
            });
        });
    });
    describe('#fn.exitFullScreen()', function () {
        before(function() {
            fn.exitFullScreen($('html')[0]);
        });
        it(`fn.exitFullScreen() should make the element exit full screen.`, function () {
            setTimeout(function() {
                assert(fn.checkIsFullScreen($('html')[0]) === false);
            });
        });
    });
    describe('#fn.checkIsFullScreen()', function () {
        it(`fn.checkIsFullScreen() check is the element full screen.`, function () {
            assert(fn.checkIsFullScreen($('html')[0]) === false);
        });
    });
});
