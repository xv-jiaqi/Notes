// 默认参数
// 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

let counter = 0;

const func = function() {
  console.log('func is executed!');
  counter++;
  return 10;
};

const a = function(val = func()) {
  console.log('before use "val"');
  console.log('val:', val);
};

console.log('第 1 次执行');
a();
console.log('counter:', counter);
console.log('第 1 次结束\n');

console.log('第 2 次执行');
a();
console.log('counter:', counter);
console.log('第 2 次结束\n');

console.log('第 3 次执行');
a(20);
console.log('counter:', counter);
console.log('第 3 次结束\n');

// console:

// 第 1 次执行
// func is executed!
// before use "val"
// val: 10
// counter: 1
// 第 1 次结束

// 第 2 次执行
// func is executed!
// before use "val"
// val: 10
// counter: 2
// 第 2 次结束

// 第 3 次执行
// before use "val"
// val: 20
// counter: 2
// 第 3 次结束
