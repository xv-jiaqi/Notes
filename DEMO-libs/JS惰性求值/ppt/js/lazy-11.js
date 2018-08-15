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

a();

a(20);
