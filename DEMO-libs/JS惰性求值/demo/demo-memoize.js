const memoize = require('../lib/memoize');

const func = function() {
  console.log('func is executed!');
  return 'func';
};

const func2 = function() {
  console.log('func2 is executed!');
  return 'func2';
};

const memorizedFunc = memoize(func);
const memorizedFunc2 = memoize(func2);

console.log(memorizedFunc());
console.log(memorizedFunc());
console.log(memorizedFunc());
console.log(memorizedFunc2());

// console:

// func is executed!
// func
// func
// func
// func2 is executed!
// func2
