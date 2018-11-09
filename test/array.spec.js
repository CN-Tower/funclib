describe('Array Methods:', function () {
  describe('#fn.array()', function () {
    it(`fn.array(5) should return a range.`, function () {
      const tmpArr = fn.array(5);
      assert(tmpArr.length === 5 && tmpArr.join('' === '01234'));
    });
    it(`fn.array(5, 'x') should return a Array filled by 'x'.`, function () {
      const tmpArr = fn.array(5, 'x');
      assert.deepEqual(tmpArr, ['x', 'x', 'x', 'x', 'x']);
    });
    it(`fn.array(5, i => i + i) should return a range.`, function () {
      const tmpArr = fn.array(5, i => i + i);
      assert.deepEqual(tmpArr, [0, 2, 4, 6, 8]);
    });
  });
  describe('#fn.toArray()', function () {
    it(`fn.toArray('funclib') should return an Array.`, function () {
      assert.deepEqual(fn.toArray('funclib')[0], fn.toArray(['funclib'])[0]);
    });
    it(`fn('funclib').toArray() should return an Array.`, function () {
      assert.deepEqual(fn('funclib').toArray(), ['funclib']);
    });
  });
  describe('#fn.find()', function () {
    var persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
    it(`fn.find(persons, {name: 'Jerry'}) should return Jerry's info.`, function () {
      var tom = fn.find(persons, { name: 'Jerry' });
      assert.deepEqual(tom, { name: 'Jerry', age: 18 });
    });
    it(`fn(persons).find({name: 'Tom'}) should return Tom's info.`, function () {
      var tom = fn(persons).find({ name: 'Tom' });
      assert.deepEqual(tom, { name: 'Tom', age: 22 });
    });
    it(`fn.find(persons, ps => ps.name === 'Tom') should return Tom's info.`, function () {
      var tom = fn.find(persons, ps => ps.name === 'Tom');
      assert.deepEqual(tom, { name: 'Tom', age: 22 });
    });
    it(`fn(persons).find(ps => ps.name === 'Tom') should return Tom's info.`, function () {
      var tom = fn(persons).find(ps => ps.name === 'Tom');
      assert.deepEqual(tom, { name: 'Tom', age: 22 });
    });
  });
  describe('#fn.filter()', function () {
    var persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
    it(`fn.filter(persons, {name: 'Tom'}) should return Toms's info.`, function () {
      var toms = fn.filter(persons, { name: 'Tom' });
      assert.deepEqual(toms, [{ name: 'Tom', age: 22 }]);
    });
    it(`fn.filter(persons, ps => ps.name === 'Tom') should return Tom's info.`, function () {
      var toms = fn.filter(persons, ps => ps.name === 'Tom');
      assert.deepEqual(toms, [{ name: 'Tom', age: 22 }]);
    });
  });
  describe('#fn.reject()', function () {
    var persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
    it(`fn.reject(persons, {name: 'Tom'}) should return not Toms's info.`, function () {
      var tom = fn.reject(persons, { name: 'Tom' });
      assert.deepEqual(tom, [{ name: 'Jerry', age: 18 }]);
    });
    it(`fn.reject(persons, ps => ps.name === 'Tom') should return not Tom's info.`, function () {
      var tom = fn.reject(persons, ps => ps.name === 'Tom');
      assert.deepEqual(tom, [{ name: 'Jerry', age: 18 }]);
    });
  });
  describe('#fn.contains()', function () {
    var persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
    it(`fn.contains(persons, {name: 'Tom'}) should return is Tom in persons.`, function () {
      assert(fn.contains(persons, { name: 'Tom' }) === true);
    });
    it(`fn.contains(persons, ps => ps.name === 'Tom') should return is Tom in persons.`, function () {
      var tom = fn.contains(persons, ps => ps.name === 'Tom');
      assert(fn.contains(persons, ps => ps.name === 'Tom') === true);
    });
    it(`fn.contains(persons, ps => ps.name === 'Tom') should return is Tom in persons.`, function () {
      assert(fn.contains(['Tom', 'Jerry', 'Marry'], 'Tom') === true);
    });
  });
  describe('#fn.drop()', function () {
    const arr = [null, undefined, false, {}, [], 0, 'test'];
    it(`fn.drop(arr) should return [0, 'test'].`, function () {
      assert.deepEqual(fn.drop(arr), [0, 'test']);
    });
    it(`fn.drop(arr, true) should return ['test'].`, function () {
      assert.deepEqual(fn.drop(arr, true), ['test']);
    });
  });
  describe('#fn.flatten()', function () {
    const arr = [1, [2, 3, [4, [5]], 6], 7];
    it(`fn.flatten(arr) should return [1, 2, 3, [4, [5]], 6, 7].`, function () {
      assert.deepEqual(fn.flatten(arr), [1, 2, 3, [4, [5]], 6, 7]);
    });
    it(`fn.flatten(arr, true) should return [1, 2, 3, 4, 5, 6, 7].`, function () {
      assert.deepEqual(fn.flatten(arr, true), [1, 2, 3, 4, 5, 6, 7]);
    });
  });
  describe('#fn.pluck()', function () {
    var persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
    it(`fn.pluck(persons, 'name') should return ['Tom', 'Jerry'].`, function () {
      assert.deepEqual(fn.pluck(persons, 'name'), ['Tom', 'Jerry']);
    });
  });
  describe('#fn.uniq()', function () {
    var arr1 = [0, {}, 0, false, null, false, [], [], {}, 'test', 'test']
    var persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 22 }];
    it(`fn.uniq(arr1) should return [0, {}, false, null, [], 'test'].`, function () {
      assert.deepEqual(fn.uniq(arr1), [0, {}, false, null, [], 'test']);
    });
    it(`fn.uniq(arr1, false) should return [0, {}, false, null, [], [], {}, 'test'].`, function () {
      assert.deepEqual(fn.uniq(arr1, false), [0, {}, false, null, [], [], {}, 'test']);
    });
    it(`fn.uniq(persons, '/name') should return persons.`, function () {
      assert.deepEqual(fn.uniq(persons, '/name'), persons);
    });
    it(`fn.uniq(persons, '/age') should return Tom's info.`, function () {
      assert.deepEqual(fn.uniq(persons, '/age'), [{ name: 'Tom', age: 22 }]);
    });
  });
  describe('#fn.indexOf()', function () {
    var persons = [{ name: 'Tom', age: 22 }, { name: 'Jerry', age: 18 }];
    it(`fn.indexOf(persons, {name: 'Tom'}) should return Tom's index in persons.`, function () {
      var tomIdx = fn.indexOf(persons, { name: 'Tom' });
      assert(tomIdx === 0);
    });
    it(`fn.indexOf(persons, ps => ps.name === 'Tom') should return Tom's index in persons.`, function () {
      var tomIdx = fn.indexOf(persons, ps => ps.name === 'Tom');
      assert(tomIdx === 0);
    });
  });
  describe('#fn.forEach()', function () {
    it(`fn.forEach(['a', 'b'], function(x) {}) should return 'ab'.`, function () {
      var tmpStr = '';
      fn.forEach(['a', 'b'], function (x) { tmpStr += x });
      assert(tmpStr === 'ab');
    });
  });
  describe('#fn.sortBy()', function () {
    const person = [{ name: 'Tom', age: 22 }, { name: 'Bob', age: null }, { name: 'Jerry', age: 18 }];
    it(`fn.sortBy(person, 'age') should return a sorted strArr.`, function () {
      const person1 = fn.sortBy(person, 'age');
      assert(person1[0].name === 'Bob' && person1[person1.length - 1].name === 'Tom');
    });
    it(`fn.sortBy(person, 'age', true) should return a sorted strArr.`, function () {
      const person2 = fn.sortBy(person, 'age', true);
      assert(person2[0].name === 'Tom' && person2[person2.length - 1].name === 'Bob');
    });
  });
});
