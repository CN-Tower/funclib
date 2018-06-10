describe('Type Methods:', function () {
    describe('#fn.isTypeOf()', function () {
        it(`fn.isTypeOf('string', 'str') should return true.`, function () {
            assert(fn.isTypeOf('string', 'str') === true);
        });
        it(`fn.isTypeOf([], 'obj') should return false.`, function () {
            assert(fn.isTypeOf([], 'obj') === false);
        });        
        it(`fn.isTypeOf({}, ['str', 'obj']) should return true.`, function () {
            assert(fn.isTypeOf({}, ['str', 'obj']) === true);
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
            assert(fn.isTypeOf(obj, 'obj') && fn.isEmpty(obj));
        });
    });
});
