const filter = item => item.price < 10;
const transform = item => ({
  name: item.name.toUpperCase(),
  price: item.price
});

const result = gems
  .filter(filter)
  .map(transform)
  .slice(0, 3);
