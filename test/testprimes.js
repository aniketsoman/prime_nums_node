#!/usr/bin/env node

const primeGen = require('../lib/prime-generator');
const assert = require('assert');

function testGeneratePrimes(n, expected, message) {
    primeGen.generatePrimes(n, () => {
	primeGen.processRange(1, n, (res) => {
	    console.log(message + " -> " + n);
	    console.log("Actual => " + JSON.stringify(res) + ", Expected => " + JSON.stringify(expected));
	    assert.deepEqual(res, expected);
	});
    });    

};

function testRange(l, h, expected, message) {
    primeGen.processRange(l, h, (res) => {
	console.log(message + " -> " + l + ".." + h);
	console.log("Actual => " + JSON.stringify(res) + ", Expected => " + JSON.stringify(expected));
	assert.deepEqual(res, expected);
    });
};

testGeneratePrimes('hi', {range:[],sum:0,mean:0}, 'Input non number');
testGeneratePrimes('hi', {range:[],sum:0,mean:0}, 'Input zero');
testGeneratePrimes('hi', {range:[],sum:0,mean:0}, 'Input negative');
testGeneratePrimes(7, {range:[1,2,3,5,7],sum:18,mean:3.6}, 'Valid input 1');
testGeneratePrimes(100, { range: 
   [ 1,
     2,
     3,
     5,
     7,
     11,
     13,
     17,
     19,
     23,
     29,
     31,
     37,
     41,
     43,
     47,
     53,
     59,
     61,
     67,
     71,
     73,
     79,
     83,
     89,
     97 ],
  sum: 1061,
  mean: 40.80769230769231 }, 'Valid input 2');

testRange(-1, 0, { range: [], sum: 0, mean: 0 }, "Invalid Range 1 - Negative low");
testRange(0, 101, { range: [], sum: 0, mean: 0 }, "Invalid Range 2 - zero low ");
testRange(9, 3, { range: [], sum: 0, mean: 0 }, "Invalid Range 3 - low > high");
testRange(3, 9, { range: [ 3, 5, 7 ], sum: 15, mean: 5 }, "Valid Range");
testRange(2, 200, { range: 
   [ 2,
     3,
     5,
     7,
     11,
     13,
     17,
     19,
     23,
     29,
     31,
     37,
     41,
     43,
     47,
     53,
     59,
     61,
     67,
     71,
     73,
     79,
     83,
     89,
     97 ],
  sum: 1060,
		    mean: 42.4 }, "high > generated numbers gives available numbers");
