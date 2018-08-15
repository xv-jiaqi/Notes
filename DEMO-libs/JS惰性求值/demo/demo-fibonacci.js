const memoize = require('../lib/memoize');

let counter = 0;

let fib = function(n) {
  counter++;
  switch (n) {
    case 0:
      return 0;
    case 1:
      return 1;
    default:
      return fib(n - 1) + fib(n - 2);
  }
};

console.log('fib 20:', fib(20));
console.log('counter:', counter, '\n');

counter = 0;
fib = memoize(fib);

console.log('memorizedFib 20:', fib(20));
console.log('counter:', counter);

// console:

// fib 20: 6765
// counter: 21891

// memorizedFib 20: 6765
// counter: 21
