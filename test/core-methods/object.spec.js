/**@server-*/ module.exports = function (fn, assert) { /**@server=|*/
  describe('Object Methods:', function () {
    describe('#fn.len()', function () {
      it(`fn.len(obj) should return length of the obj.`, function () {
        const obj1 = { name: 'Tom' };
        const obj2 = ['hello!'];
        const obj3 = (a, b) => { };
        assert(fn.len(obj1) === 1, fn.len(obj2) === 1, fn.len(obj3) === 2);
      });
    });
    describe('#fn.has()', function () {
      it(`fn.has({name: 'Tom', age: 20}, 'name') should equal true.`, function () {
        assert(fn.has({ name: 'Tom', age: 20 }, 'name'));
      });
      it(`fn.has({name: 'Tom', age: 20}, 'sex') should equal false.`, function () {
        assert(!fn.has({ name: 'Tom', age: 20 }, 'sex'));
      });
      it(`fn.has(null, 'name') should equal false.`, function () {
        assert(!fn.has(null, 'name'));
      });
    });
    describe('#fn.get()', function () {
      let obj;
      beforeEach(function() {
        obj = {
          name: 'Obj',
          id: 'Obj_001',
          metadata: {
            subObj: {
              name: 'subOjb',
              id: 'subOjb_001'
            }
          }
        };
      });
      it(`fn.get(obj, '/metadata/subObj/name') should return 'subOjb'.`, function () {
        assert(fn.get(obj, '/metadata/subObj/name') === 'subOjb');
      });
      it(`fn.get(obj, '/metadata/subArr/id') should return undefined.`, function () {
        assert(fn.get(obj, '/metadata/subArr/id') === undefined);
      });
      it(`fn.get(obj, '/metadata/subArr/id', ['arr', 'udf']) should return true.`, function () {
        assert(fn.get(obj, '/metadata/subArr/id', ['arr', 'udf']) === undefined);
      });
      it(`fn.get(obj, '/metadata/subObj/name', 'arr', 'str') should return 'subOjb'.`, function () {
        assert(fn.get(obj, '/metadata/subObj/name', 'arr', 'str') === 'subOjb');
      });
      it(`fn.get(obj, '.metadata.subObj.name', 'arr', 'str') should return 'subOjb'.`, function () {
        assert(fn.get(obj, '.metadata.subObj.name', 'arr', 'str') === 'subOjb');
      });
    });
    describe('#fn.pick()', function () {
      it(`fn.pick({name: 'Tom', age: 28}) should return {}.`, function () {
        assert.deepEqual(fn.pick({name: 'Tom', age: 28}), {});
      });
      it(`fn.pick({name: 'Tom', age: 28}, 'name') should return {name: 'Tom'}.`, function () {
        assert.deepEqual(fn.pick({name: 'Tom', age: 28}, 'name'), {name: 'Tom'});
      });
      it(`fn.pick({name: 'Tom', age: 28}, ['name', 'age', 'sex']) should return {name: 'Tom', age: 28}.`, function () {
        assert.deepEqual(fn.pick({name: 'Tom', age: 28}, ['name', 'age', 'sex']), {name: 'Tom', age: 28});
      });
      it(`fn.pick({name: 'Tom', age: 28}, (k, v) => v === 28) should return {age: 28}.`, function () {
        assert.deepEqual(fn.pick({name: 'Tom', age: 28}, (k, v) => v === 28), {age: 28});
      });
      it(`fn.pick({name: 'Tom', age: 28}, 'name', 'age') should return {name: 'Tom', age: 28}.`, function () {
        assert.deepEqual(fn.pick({name: 'Tom', age: 28}, 'name', 'age'), {name: 'Tom', age: 28});
      });
    });
    describe('#fn.extend()', function () {
      let tom, jerry;
      beforeEach(function () {
        tom = { name: 'Tom' };
        jerry = { name: 'Jerry', age: 28, sex: 'm' };
      })
      it(`fn.extend(dist, src) should extend dist by src.`, function () {
        fn.extend(tom, jerry);
        assert.deepEqual(tom, { name: 'Jerry', age: 28, sex: 'm' });
      });
      it(`fn.extend(dist, src, props) should extend dist by src and props.`, function () {
        fn.extend(tom, jerry, ['age', 'sex']);
        assert.deepEqual(tom, { name: 'Tom', age: 28, sex: 'm' });
      });
      it(`fn.extend(dist, src, ...props) should extend dist by src and props.`, function () {
        fn.extend(tom, jerry, 'name', 'age', 'sex');
        assert.deepEqual(tom, { name: 'Jerry', age: 28, sex: 'm' });
      });
    });
    describe('#fn.forIn()', function () {
      it(`fn.forIn(obj, callback) should traverse the keys of obj.`, function () {
        const tom = { name: 'Tom', age: 28 };
        let tmpStr = '';
        fn.forIn(tom, p => tmpStr += tom[p]);
        assert(tmpStr === 'Tom28');
      });
    });
    describe('#fn.deepCopy()', function () {
      it(`fn.deepCopy(obj) should return a duplicate of obj.`, function () {
        const tom = [{ name: 'Tom', age: 28 }];
        const tom2 = fn.deepCopy(tom);
        tom2[0].age = 22;
        assert(tom[0].age === 28 && tom2[0].age === 22);
      });
    });
    describe('#fn.isEmpty()', function () {
      it(`fn.isEmpty({}) should return true.`, function () {
        assert(fn.isEmpty({}));
      });
      it(`fn.isEmpty([]) should return true.`, function () {
        assert(fn.isEmpty([]));
      });
      it(`fn.isEmpty(null) should return false.`, function () {
        assert(!fn.isEmpty(null));
      });
    });
    describe('#fn.isDeepEqual()', function () {
      it(`fn.isDeepEqual([], {}) should return false.`, function () {
        assert(!fn.isDeepEqual([], {}));
      });
      it(`fn.isDeepEqual([{name: 'tom', age: 22}], [{age: 22, name: 'tom'}]) should return true.`, function () {
        assert(fn.isDeepEqual([{name: 'tom', age: 22}], [{age: 22, name: 'tom'}]));
      });
      it(`fn.isDeepEqual([{name: 'tom', age: 22}], [{age: 22, name: 'tom'}], true) should return false.`, function () {
        assert(!fn.isDeepEqual([{name: 'tom', age: 22}], [{age: 22, name: 'tom'}], true));
      });
    });
  });
/**@server-*/ } /**@server=|*/
