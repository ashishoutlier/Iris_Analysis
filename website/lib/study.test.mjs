import {test} from 'node:test';
import assert from 'node:assert/strict';
import {selectRecords,averages} from './study.mjs';
const data=[{species:'setosa',petal_length:1,sepal_length:4},{species:'setosa',petal_length:3,sepal_length:6},{species:'virginica',petal_length:8,sepal_length:10}];
test('species selection preserves measurements',()=>assert.deepEqual(selectRecords(data,'setosa'),data.slice(0,2)));
test('means use only selected specimens and exclude missing values',()=>{
 assert.equal(averages(data.slice(0,2),['petal_length']).petal_length,2);
 assert.equal(averages([{petal_length:2},{petal_length:null}],['petal_length']).petal_length,2);
 assert.equal(averages([],['petal_length']).petal_length,null);
});
