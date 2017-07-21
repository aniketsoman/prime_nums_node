/**
   - Generate Prime numbers
*/
var rHost = '127.0.0.1';
var rPort = '6379';
var redis = require('redis')
var rClient = redis.createClient(rPort, rHost);
rClient.on('connect', function() {
});

process.on('exit', function() {
    rClient.end(true);
});

var fetchFromRecords = function(n) {
    return new Promise(
	function(resolve, reject) {
	    rClient.get(n, function(err, reply) {
		if(reply)
		    resolve(reply);
		else
		    reject();
	    });
	});
};

var isPrime = function(n) {
    for(var j = 2; j <= Math.sqrt(n); ++j) {
	var otherDivisor = n / j;
	if (n % j == 0)
	    return false;
    }
    rClient.set(n, "prime");
    return true;
};

var getPrimesForRange = function(low, high, results, cb) {
    if (low > high) {
	if (typeof cb === 'function')
	    cb(results);
    }
    else {
	fetchFromRecords(low).then(
	    function(reply) {
		results.range.push(low);
		results.sum += low;
		results.mean = results.sum / results.range.length;
		return getPrimesForRange(low+1, high, results, cb);
	    },
	    function() {
		return getPrimesForRange(low+1, high, results, cb);
	    });
    }
};

exports.generatePrimes = function(n, cb) {
    if (typeof n === 'number' && n > 0) {
	var self = this;
	var primeNums = [];
	fetchFromRecords(n).then(
	    function(reply) {
		return self.generatePrimes(0, cb);
	    },
	    function() {
		isPrime(n);
		return self.generatePrimes(n-1, cb);
	    });
    }
    else
	if (typeof cb === 'function')
	    cb();
};

exports.processRange = function(low, high, cb) {
    var results = {range: [], sum: 0, mean: 0};
    if (typeof low === 'number' &&
	typeof high === 'number' &&
	low > 0 && high > 0)
	return getPrimesForRange(low, high, results, cb);
    else
	if (typeof cb === 'function')
	    cb(results);
};

