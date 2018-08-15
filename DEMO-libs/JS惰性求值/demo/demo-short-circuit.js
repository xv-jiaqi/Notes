// 短路求值

const func = function() {
  console.log('func is executed!');
};

console.log('a1: start');
const a1 = true || func(); // func 未执行
console.log('a1: end\n');

console.log('a2: start');
const a2 = false || func(); // func 执行了
console.log('a2: end\n');

console.log('b1: start');
const b1 = true && func(); // func 执行了
console.log('b1: end\n');

console.log('b2: start');
const b2 = false && func(); // func 未执行
console.log('b2: end\n');

// console:

// a1: start
// a1: end

// a2: start
// func is executed!
// a2: end

// b1: start
// func is executed!
// b1: end

// b2: start
// b2: end
