const filter = item => item.price < 10;
const transform = item => ({
  name: item.name.toUpperCase(),
  price: item.price
});

const result = _
  .chain(gems)
  .filter(filter)
  .map(transform)
  .take(3)
  .value();
