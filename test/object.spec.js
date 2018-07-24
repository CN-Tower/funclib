describe('Object Methods:', function () {
    describe('#fn.len()', function () {
        it(`fn.len(obj) should return length of the obj.`, function () {
            const obj1 = {name: 'Tom'};
            const obj2 = ['hello!'];
            const obj3 = (a, b) => {};
            assert(fn.len(obj1) === 1, fn.len(obj2) === 1, fn.len(obj3) === 2);
        });
    });
    describe('#fn.forIn()', function () {
        it(`fn.forIn(obj, callback) should traverse the keys of obj.`, function () {
            const tom = {name: 'Tom', age: 28};
            let tmpStr = '';
            fn.forIn(tom, p => tmpStr += tom[p]);
            assert(tmpStr === 'Tom28');
        });
    });
    describe('#fn.overlay()', function () {
        let tom, jerry;
        beforeEach(function() {
            tom = {name: 'Tom'};
            jerry = {name: 'Jerry', age: 28, sex: 'm'};
        })
        it(`fn.overlay(dist, src) should overlay dist by src.`, function () {
            fn.overlay(tom, jerry);
            assert(tom.name === 'Jerry');
        });
        it(`fn.overlay(dist, src, props) should overlay dist by src and props.`, function () {
            fn.overlay(tom, jerry, ['age', 'sex']);
            assert(tom.name === 'Tom' && tom.age === 28);
        });
    });
    describe('#fn.deepCopy()', function () {
        it(`fn.deepCopy(obj) should return a duplicate of obj.`, function () {
            const tom = {name: 'Tom', age: 28};
            const tom2 = fn.deepCopy(tom);
            tom2.age = 22;
            assert(tom.age === 28 && tom2.age === 22);
        });
    });
    describe('#fn.get()', function () {
        it(`fn.get(obj, layers) should return the inner prop of obj or undefined.`, function () {
            const obj = {
                name: 'Obj',
                id: 'Obj_001',
                metadata: {
                    subObj: {
                        name: 'subOjb',
                        id: 'subOjb_001'
                    }
                }
            };
            const p1 = fn.get(obj, '/metadata/subObj/name');
            const p2 = fn.get(obj, '/metadata/subArr/id');
            assert(p1 === 'subOjb', p2 === undefined);
        });
    });
});
