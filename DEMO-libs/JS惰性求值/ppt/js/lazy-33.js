const _chain = function*(arr) {
  for (let i of arr) {
    yield i;
    this.__index__++;
  }
};

const _filter = function*(flow, condition) {
  for (const data of flow) {
    if (condition(data, this.__index__, this.__value__)) {
      yield data;
    }
  }
};

const _map = function*(flow, transform) {
  for (const data of flow) {
    yield transform(data, this.__index__, this.__value__);
  }
};

const _stop = function*(flow, condition) {
  for (const data of flow) {
    yield data;
    if (condition()) {
      break;
    }
  }
};

const _take = function(flow, num) {
  let _count = 0;
  const _filter = function() {
    _count++;
    return _count >= num;
  };
  return _stop(flow, _filter);
};

class Lazy {
  constructor(value) {
    if (!(value instanceof Array)) {
      throw new TypeError('Only array is supported.');
    }
    this.__index__ = 0;
    this.__value__ = value;
    this.__iterator__ = _chain.call(this, value);
  }

  [Symbol.iterator]() {
    return this.__iterator__;
  }

  static chain(value) {
    return new Lazy(value);
  }

  map(callback) {
    this.__iterator__ = _map.call(this, this.__iterator__, callback);
    return this;
  }

  filter(callback) {
    this.__iterator__ = _filter.call(this, this.__iterator__, callback);
    return this;
  }

  take(num) {
    this.__iterator__ = _take.call(this, this.__iterator__, num);
    return this;
  }

  value() {
    const result = [];

    for (let n of this) {
      result.push(n);
    }

    return result;
  }
}
