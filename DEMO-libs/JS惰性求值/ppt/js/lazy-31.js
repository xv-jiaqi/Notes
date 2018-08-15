const filter = item => item.price < 10;
const transform = item => ({
  name: item.name.toUpperCase(),
  price: item.price
});

const result = [];

for (let i = 0, len = gems.length; i < len; i++) {
  const item = gems[i];
  if (filter(item)) {
    result.push(transform(item));
  }
  if (result.length > 2) {
    break;
  }
}
