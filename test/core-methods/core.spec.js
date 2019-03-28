/**@server+*//* module.exports = function (fn, assert) { /**@server=|*/
describe('Tricks Methods:', function () {
  describe('#fn.chain()', function () {
    it(`fn.split('abcd', '') should return ['a', 'b', 'c', 'd'].`, function () {
      assert.deepEqual(fn.split('abcd', ''), ['a', 'b', 'c', 'd']);
    });
    it(`fn.map(persons, p => p.age) should return [22, 18].`, function () {
      const persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
      assert.deepEqual(fn.map(persons, p => p.age), [22, 18]);
    });
    it(`fn.slice(persons, 0, 1) should return tom.`, function () {
      const persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
      assert.deepEqual(fn.slice(persons, 0, 1), [{ name: 'Tom', age: 22 }]);
    });
    it(`fn(persons).find({name: 'Tom'}).val() should return Tom.`, function () {
      const persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
      const tom = fn(persons).find({name: 'Tom'}).val();
      assert.deepEqual(tom, { name: 'Tom', age: 22 });
    });
    it(`fn(persons).map(p => p.age).val() should return [22, 18].`, function () {
      const persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
      assert.deepEqual(fn(persons).map(p => p.age).val(), [22, 18]);
    });
    it(`fn.chain(persons).find({name: 'Tom'}).val() should return Tom.`, function () {
      const persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
      const tom = fn.chain(persons).find({name: 'Tom'}).val();
      assert.deepEqual(tom, { name: 'Tom', age: 22 });
    });
  });
});
/**@server+*//* } /**@server=|*/