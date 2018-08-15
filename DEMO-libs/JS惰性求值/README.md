## 求值策略

全文搬运自[JavaScript 中的惰性计算](https://github.com/zh-rocco/fe-notes/issues/4)

> 在计算机科学中，求值策略(Evaluation strategy)是确定编程语言中表达式的求值的一组（通常确定性的）规则。重点典型的位于函数或算子上——求值策略定义何时和以何种次序求值给函数的实际参数，什么时候把它们代换入函数，和代换以何种形式发生。 -- [维基百科](https://en.wikipedia.org/wiki/Evaluation_strategy)

### 严格求值（Strict evaluation）

严格求值下，传给函数的实际参数总是在调用这个函数之前被求值。

> 多数现存编程语言对函数使用严格求值。

### 非严格求值 / 惰性求值（Non-strict evaluation）

非严格求值下，传给函数的实际参数并不会立即求值，是否需要求值依赖于这个实际参数在函数执行中有没有被使用。

## JS 中的惰性计算

### 短路求值（Short-circuit evaluation）

```javascript
const func = function() {
  console.log('func is executed!');
  return 'some value form func.';
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
```

### ES6 中的默认参数

> 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。 -- [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/function)

```javascript
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
```

**从第 1 次调用 `a` 方法可以看出：**

- 默认参数 `func` 并不会在 `a` 方法定义时执行
- 默认参数 `func` 在 `a` 方法体执行前调用，而不是实际参数被使用时调用

**从第 1、2 次调用 `a` 方法可以看出（观察 counter 值）：**

- 每次 `a` 方法被调用时，默认参数 `func` 都会重新执行，即：每次都重新计算默认值表达式的值

**从第 2、3 次调用 `a` 方法可以看出（观察 counter 值）：**

- `a` 方法被传入参数后，默认参数 `func` 不会执行

## 缓存

memoize.js

```javascript
const memoize = function(func) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }

  const cache = new Map();
  const memorized = function(...args) {
    const key = typeof args[0] === undefined ? func : args[0];

    if (!cache.has(key)) {
      cache.set(key, func.apply(this, args));
    }

    return cache.get(key);
  };

  memorized.isMemorized = true;

  return memorized;
};

module.exports = memoize;
```

示例 1：

```javascript
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
console.log(memorizedFunc2());

// console:

// func is executed!
// func
// func
// func2 is executed!
// func2
```

示例 2（斐波那契函数）：

```javascript
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
```

## 惰性数组

未完待续...

## 参考

- [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
- [Javascript 中的求值策略](https://zhuanlan.zhihu.com/p/33035557)
- [Lodash memoize](https://github.com/lodash/lodash/blob/master/memoize.js)

## 相关笔记：

- [JavaScript 中的参数传递策略](https://github.com/zh-rocco/fe-notes/issues/3)
- [快速求斐波那契算法](https://gist.github.com/zh-rocco/cacafafa9c20dc998500cceff7f558be)
