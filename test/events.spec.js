describe('Event Methods:', function () {
    describe('#fn.getKeyCodeByName()', function () {
        it(`fn.getKeyCodeByName('Ctrl') should return 17.`, function () {
            assert(fn.getKeyCodeByName('Ctrl') === 17);
        });
    });
    describe('#fn.getKeyNameByCode()', function () {
        it(`fn.getKeyNameByCode(17) should return 'Ctrl'.`, function () {
            assert(fn.getKeyNameByCode(17) === 'Ctrl');
        });
    });
});
