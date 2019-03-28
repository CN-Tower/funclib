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
    describe('#fn.isStr()', function () {
      it(`fn.isStr('str') should return true.`, function () {
        assert(fn.isStr('str'));
      });
      it(`fn.isStr(123) should return false.`, function () {
        assert(!fn.isStr(123));
      });
    });
    describe('#fn.isNum()', function () {
      it(`fn.isNum(123) should return true.`, function () {
        assert(fn.isNum(123));
      });
      it(`fn.isNum('123') should return false.`, function () {
        assert(!fn.isNum('123'));
      });
      it(`fn.isNum(NaN) should return false.`, function () {
        assert(!fn.isNum(NaN));
      });
      it(`fn.isNum(Infinity) should return false.`, function () {
        assert(!fn.isNum(Infinity));
      });
    });
    describe('#fn.isBol()', function () {
      it(`fn.isBol(false) should return true.`, function () {
        assert(fn.isBol(false));
      });
      it(`fn.isBol(123) should return false.`, function () {
        assert(!fn.isBol(123));
      });
    });
    describe('#fn.isFun()', function () {
      it(`fn.isFun(() => {}) should return true.`, function () {
        assert(fn.isFun(() => {}));
      });
      it(`fn.isFun(123) should return false.`, function () {
        assert(!fn.isFun(123));
      });
    });
    describe('#fn.isNul()', function () {
      it(`fn.isNul(null) should return true.`, function () {
        assert(fn.isNul(null));
      });
      it(`fn.isNul(123) should return false.`, function () {
        assert(!fn.isNul(123));
      });
    });
    describe('#fn.isUdf()', function () {
      it(`fn.isUdf(undefined) should return true.`, function () {
        assert(fn.isUdf(undefined));
      });
      it(`fn.isUdf(123) should return false.`, function () {
        assert(!fn.isUdf(123));
      });
    });
    describe('#fn.isErr()', function () {
      it(`fn.isErr(new Error()) should return true.`, function () {
        assert(fn.isErr(new Error()));
      });
      it(`fn.isErr(123) should return false.`, function () {
        assert(!fn.isErr(123));
      });
    });
    describe('#fn.isDat()', function () {
      it(`fn.isDat(new Date()) should return true.`, function () {
        assert(fn.isDat(new Date()));
      });
      it(`fn.isDat(123) should return false.`, function () {
        assert(!fn.isDat(123));
      });
    });
    describe('#fn.isReg()', function () {
      it(`fn.isReg(new RegExp('ptn')) should return true.`, function () {
        assert(fn.isReg(new RegExp('ptn')));
      });
      it(`fn.isReg(123) should return false.`, function () {
        assert(!fn.isReg(123));
      });
    });
    describe('#fn.isArr()', function () {
      it(`fn.isArr([]) should return true.`, function () {
        assert(fn.isArr([]));
      });
      it(`fn.isArr(123) should return false.`, function () {
        assert(!fn.isArr(123));
      });
    });
    describe('#fn.isObj()', function () {
      it(`fn.isObj({}) should return true.`, function () {
        assert(fn.isObj({}));
      });
      it(`fn.isObj(new Object()) should return true.`, function () {
        assert(fn.isObj(new Object()));
      });
      it(`fn.isObj(new (class A {})) should return true.`, function () {
        assert(fn.isObj(new (class A {})));
      });
      it(`fn.isObj(new Date()) should return true.`, function () {
        assert(!fn.isObj([]));
      });
      it(`fn.isObj(new Date()) should return true.`, function () {
        assert(!fn.isObj(/test/));
      });
      it(`fn.isObj(new Date()) should return true.`, function () {
        assert(!fn.isObj(Date));
      });
      it(`fn.isObj(new Date()) should return true.`, function () {
        assert(!fn.isObj(new Date()));
      });
      it(`fn.isObj(123) should return false.`, function () {
        assert(!fn.isObj(123));
      });
      it(`fn.isObj(null) should return false.`, function () {
        assert(!fn.isObj(null));
      });
    });
  });
/**@server+*//* } /**@server=|*/
