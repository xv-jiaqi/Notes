class Stream {
  constructor(value) {
    this.value = value;

    Object.defineProperty(this, 'next', {
      get() {
        return new Stream(value + 1);
      }
    });
  }

  takeUntil(n, accumulator = []) {
    if (n < this.value) {
      return;
    }

    if (n === this.value) {
      return accumulator;
    }

    accumulator.push(this.value);

    return this.next.takeUntil(n, accumulator);
  }
}

const stream = new Stream(0);
console.log(stream.takeUntil(5));
