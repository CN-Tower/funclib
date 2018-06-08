describe('Array Methods:', function () {
    describe('#fn.array()', function () {
        it(`fn.array(5) should return a range.`, function () {
            const tmpArr = fn.array(5);
            assert(tmpArr.length === 5 && tmpArr.join('' === '01234'));
        });
    });
    describe('#fn.toArr()', function () {
        it(`fn.toArr('funclib') should return an Array.`, function () {
            assert(fn.toArr('funclib')[0] === fn.toArr(['funclib'])[0]);
        });
    });
    describe('#fn.sortByField()', function () {
        it(`fn.sortByField(5) should return a sorted strArr.`, function () {
            const person = [{name: 'Tom', age: 22}, {name: 'Jerry', age: 18}];
            const person1 = fn.deepCopy(fn.sortByField(person, 'age'));
            const person2 = fn.sortByField(person, 'age', true);
            assert(person1[0].name === 'Jerry' && person2[0].name === 'Tom');
        });
    });
});
