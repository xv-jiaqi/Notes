const func = function() {
  console.log('func is executed!');
};

const a1 = true || func(); // func 未执行

const a2 = false || func(); // func 执行了

const b1 = true && func(); // func 执行了

const b2 = false && func(); // func 未执行
