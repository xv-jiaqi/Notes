// 需求
// (1) 商品名转为大写
// (2) 取出三个价格低于 10 的商品

const _ = require('../lib/lazy');

const gems = [
  { name: 'Sunstone', price: 4 },
  { name: 'Amethyst', price: 15 },
  { name: 'Prehnite', price: 20 },
  { name: 'Sugilite', price: 7 },
  { name: 'Diopside', price: 3 },
  { name: 'Feldspar', price: 13 },
  { name: 'Dioptase', price: 2 },
  { name: 'Sapphire', price: 20 }
];

let filterCounter = 0;
let transformCounter = 0;

const filter = item => {
  filterCounter++;
  console.log('filter is run.');
  return item.price < 10;
};
const transform = (item, index, array) => {
  transformCounter++;
  console.log('transform is run.');
  // console.log(item, index);
  return {
    name: item.name.toUpperCase(),
    price: item.price
  };
};

let result;

result = _
  .chain(gems)
  .filter(filter)
  .map(transform)
  .take(3)
  .value();

// const a = Lazy.chain(gems);
// const b = a.filter(filter);
// const c = b.map(transform);
// const d = c.take(3);
// result = d.value();

console.log('filterCounter:', filterCounter);
console.log('transformCounter:', transformCounter);
console.log(result);

// console:

// filter is run.
// transform is run.
// filter is run.
// filter is run.
// filter is run.
// transform is run.
// filter is run.
// transform is run.
// filterCounter: 5
// transformCounter: 3
// [
//   { name: 'SUNSTONE', price: 4 },
//   { name: 'SUGILITE', price: 7 },
//   { name: 'DIOPSIDE', price: 3 }
// ]
