/**@server+*//* module.exports = function (fn, assert) { /**@server=|*/
  describe('Type Methods:', function () {
    describe('#fn.typeOf()', function () {
      it(`fn.typeOf('string', 'str') should return true.`, function () {
        assert(fn.typeOf('string', 'str'));
      });
      it(`fn.typeOf('string', 'str') should return true.`, function () {
        assert(fn.typeOf('string', 'str'));
      });
      it(`fn.typeOf([], 'obj') should return false.`, function () {
        assert(!fn.typeOf([], 'obj'));
      });
      it(`fn.typeOf(undefined, 'udf') should return false.`, function () {
        assert(fn.typeOf(undefined, 'udf'));
      });
      it(`fn.typeOf(new Date(), 'dat') should return true.`, function () {
        assert(fn.typeOf(new Date(), 'dat'));
      });
      it(`fn.typeOf(null, 'nul') should return false.`, function () {
        assert(fn.typeOf(null, 'nul'));
      });
      it(`fn.typeOf(false, 'bol') should return false.`, function () {
        assert(fn.typeOf(false, 'bol'));
      });
      it(`fn.typeOf({}, ['str', 'obj']) should return true.`, function () {
        assert(fn.typeOf({}, ['str', 'obj']));
      });
      it(`fn.typeOf({}, 'str', 'obj') should return true.`, function () {
        assert(fn.typeOf({}, 'str', 'obj'));
      });
    });
    describe('#fn.typeVal()', function () {
      it(`fn.typeVal('string', 'str') should return string.`, function () {
        assert(fn.typeVal('string', 'str') === 'string');
      });
      it(`fn.typeVal([], 'obj') should return false.`, function () {
        assert(!fn.typeVal([], 'obj'));
      });
      it(`fn.typeVal({}, ['str', 'obj']) should return {}.`, function () {
        const obj = fn.typeVal({}, ['str', 'obj']);
        assert(fn.typeOf(obj, 'obj') && fn.len(obj) === 0);
      });
      it(`fn.typeVal({}, 'str', 'obj') should return {}.`, function () {
        assert.deepEqual(fn.typeVal({}, 'str', 'obj'), {});
      });
      it(`fn.typeVal({}, 'str', 'obj') should return {}.`, function () {
        assert(!fn.typeVal({}, 'str', 'arr'));
      });
    });
  });
/**@server+*//* } /**@server=|*/
