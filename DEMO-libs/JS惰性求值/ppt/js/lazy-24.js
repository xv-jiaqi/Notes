const func = function() {
  console.log('func is executed!');
  return 'func';
};

const memorizedFunc = memoize(func);

console.log(memorizedFunc());
console.log(memorizedFunc());
console.log(memorizedFunc());
