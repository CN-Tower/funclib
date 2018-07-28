describe('Array Methods:', function () {
    describe('#fn.array()', function () {
        it(`fn.array(5) should return a range.`, function () {
            const tmpArr = fn.array(5);
            assert(tmpArr.length === 5 && tmpArr.join('' === '01234'));
        });
    });
    describe('#fn.toArray()', function () {
        it(`fn.toArr('funclib') should return an Array.`, function () {
            assert(fn.toArray('funclib')[0] === fn.toArray(['funclib'])[0]);
        });
    });
    describe('#fn.find()', function () {
        var persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}];
        it(`fn.find(persons, {Jerry: 'Tom'}) should return Jerry's info.`, function () {
            var tom = fn.find(persons, {name: 'Jerry'});
            assert.deepEqual(tom, {name:'Jerry', age: 18});
        });
        it(`fn.find(persons, ps => ps.name === 'Tom') should return Tom's info.`, function () {
            var tom = fn.find(persons, ps => ps.name === 'Tom');
            assert.deepEqual(tom, {name:'Tom', age: 22});
        });
    });
    describe('#fn.filter()', function () {
        var persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}];
        it(`fn.filter(persons, {name: 'Tom'}) should return Toms's info.`, function () {
            var toms = fn.filter(persons, {name: 'Tom'});
            assert.deepEqual(toms, [{name:'Tom', age: 22}]);
        });
        it(`fn.filter(persons, ps => ps.name === 'Tom') should return Tom's info.`, function () {
            var toms = fn.filter(persons, ps => ps.name === 'Tom');
            assert.deepEqual(toms, [{name:'Tom', age: 22}]);
        });
    });
    describe('#fn.reject()', function () {
        var persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}];
        it(`fn.reject(persons, {name: 'Tom'}) should return not Toms's info.`, function () {
            var tom = fn.reject(persons, {name: 'Tom'});
            assert.deepEqual(tom, [{name:'Jerry', age: 18}]);
        });
        it(`fn.reject(persons, ps => ps.name === 'Tom') should return not Tom's info.`, function () {
            var tom = fn.reject(persons, ps => ps.name === 'Tom');
            assert.deepEqual(tom, [{name:'Jerry', age: 18}]);
        });
    });
    describe('#fn.contains()', function () {
        var persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}];
        it(`fn.contains(persons, {name: 'Tom'}) should return is Tom in persons.`, function () {
            assert(fn.contains(persons, {name: 'Tom'}) === true);
        });
        it(`fn.contains(persons, ps => ps.name === 'Tom') should return is Tom in persons.`, function () {
            var tom = fn.contains(persons, ps => ps.name === 'Tom');
            assert(fn.contains(persons, ps => ps.name === 'Tom') === true);
        });
        it(`fn.contains(persons, ps => ps.name === 'Tom') should return is Tom in persons.`, function () {
            assert(fn.contains(['Tom', 'Jerry', 'Marry'], 'Tom') === true);
        });
    });
    describe('#fn.indexOf()', function () {
        var persons = [{name:'Tom', age: 22}, {name:'Jerry', age: 18}];
        it(`fn.indexOf(persons, {name: 'Tom'}) should return Tom's index in persons.`, function () {
            var tomIdx = fn.indexOf(persons, {name: 'Tom'});
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
            fn.forEach(['a', 'b'], function(x) {tmpStr += x});
            assert(tmpStr === 'ab');
        });
    });
    describe('#fn.sortBy()', function () {
        it(`fn.sortBy(5) should return a sorted strArr.`, function () {
            const person = [{name: 'Tom', age: 22}, {name: 'Jerry', age: 18}];
            const person1 = fn.deepCopy(fn.sortBy(person, 'age'));
            const person2 = fn.sortBy(person, 'age', true);
            assert(person1[0].name === 'Jerry' && person2[0].name === 'Tom');
        });
    });
});
