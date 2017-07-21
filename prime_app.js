#!/usr/bin/env node

var usage = function() {
    console.log("usage: prime_app <number>");
    process.exit(1);
};

var primeGen = require('./lib/prime-generator.js');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.on('exit', function() {
    rl.close();
});

var readInput = function() {
    console.log('');
    rl.question('Enter a lower bound: ', (answer) => {
	if (answer === 'Q' || answer === 'q') {
	    rl.close();
	    process.exit(0);
	}
	else {
	    low = parseInt(answer);
	    if (!isNaN(low) && low > 0 && low < n) {
		rl.question('Enter a upper bound: ', (answer) => {
		    if (answer === 'Q' || answer === 'q') {
			rl.close();
			process.exit(0);
		    }
		    else {
			high = parseInt(answer);
			if (!isNaN(high) && high > low && high <= n) {
			    primeGen.processRange(low, high, function(res) {
				console.log('Results:');
				console.log('Prime numbers: ' + JSON.stringify(res.range));
				console.log('Sum: ' + res.sum);
				console.log('Mean: ' + res.mean);
				readInput();
			    });
			}
			else {
			    console.log("Error: Invalid entry, enter a non-zero positive number between " + low + " and " + n);
			    console.log("Let's try again...");
			    readInput();
			}
		    }
		});
	    }
	    else {
		console.log("Error: Invalid entry, enter a non-zero positive number between 1 and " + n);
		console.log("Let's try again...");
		readInput();
	    }
	}
    });
};

// Begin execution
var args = process.argv.slice(2);
if (args.length != 1) 
    usage();

var n = parseInt(args[0]);
if (isNaN(n) || n < 1) {
    console.log("Error: Invalid entry, enter a non-zero positive number");
    usage();
    
}

var low = 0;
var high = 0;
console.log('Generated Prime Numbers from 1 to ' + n + "...");
console.log('Press Q|q to quit at any time...');
primeGen.generatePrimes(parseInt(args[0]), function() {
    readInput();
});
