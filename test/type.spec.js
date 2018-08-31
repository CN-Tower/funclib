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
  describe('#fn.typeVal()', function () {
    it(`fn.typeVal('string', 'str') should return string.`, function () {
      assert(fn.typeVal('string', 'str') === 'string');
    });
    it(`fn.typeVal([], 'obj') should return false.`, function () {
      assert(fn.typeVal([], 'obj') === false);
    });
    it(`fn.typeVal({}, ['str', 'obj']) should return {}.`, function () {
      const obj = fn.typeVal({}, ['str', 'obj']);
      assert(fn.typeOf(obj, 'obj') && fn.len(obj) === 0);
    });
  });
});
