describe('Type Methods:', function () {
    describe('#fn.typeOf()', function () {
        it(`fn.typeOf('string', 'str') should return true.`, function () {
            assert(fn.typeOf('string', 'str') === true);
        });
        it(`fn.typeOf([], 'obj') should return false.`, function () {
            assert(fn.typeOf([], 'obj') === false);
        });        
        it(`fn.typeOf({}, ['str', 'obj']) should return true.`, function () {
            assert(fn.typeOf({}, ['str', 'obj']) === true);
        });
    });
    describe('#fn.typeValue()', function () {
        it(`fn.typeValue('string', 'str') should return string.`, function () {
            assert(fn.typeValue('string', 'str') === 'string');
        });
        it(`fn.typeValue([], 'obj') should return false.`, function () {
            assert(fn.typeValue([], 'obj') === false);
        });        
        it(`fn.typeValue({}, ['str', 'obj']) should return {}.`, function () {
            const obj = fn.typeValue({}, ['str', 'obj']);
            assert(fn.typeOf(obj, 'obj') && fn.isEmpty(obj));
        });
    });
});
