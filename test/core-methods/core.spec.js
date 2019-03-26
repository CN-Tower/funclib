/**@server+*//* module.exports = function (fn, assert) { /**@server=|*/
describe('Tricks Methods:', function () {
  describe('#fn.chain()', function () {
    it(`fn(persons).find({name: 'Tom'}).val() should return Tom.`, function () {
      const persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
      const tom = fn(persons).find({name: 'Tom'}).val();
      assert.deepEqual(tom, { name: 'Tom', age: 22 });
    });
    it(`fn.chain(persons).find({name: 'Tom'}).val() should return Tom.`, function () {
      const persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
      const tom = fn.chain(persons).find({name: 'Tom'}).val();
      assert.deepEqual(tom, { name: 'Tom', age: 22 });
    });
  });
});
/**@server+*//* } /**@server=|*/