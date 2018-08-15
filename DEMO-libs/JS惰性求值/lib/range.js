module.exports = (length = 0) => {
  return Array.from(new Array(length), (item, index) => index);
};
