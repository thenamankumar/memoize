const memoize = require('../src/');

const fibonacci = num => {
  function fib(n) {
    if (fib.cache[n] === undefined) {
      fib.cache[n] = fib(n - 1) + fib(n - 2);
    }

    return fib.cache[n];
  }
  fib.cache = [0, 1, 1];

  return fib(num);
};

const from = 100;
const to = 500;
const loops = 1000;
let timeStart, timeStop;

// fibonacci without memoization
timeStart = new Date();
for (let i = 0; i < loops; i++) {
  for (let num = from; num < to; num++) {
    fibonacci(num);
  }
}
timeStop = new Date();
const timeWithout = timeStop - timeStart;

// fibonacci with memoization
const fibonacciM = memoize(fibonacci);
timeStart = new Date();
for (let i = 0; i < loops; i++) {
  for (let num = from; num < to; num++) {
    fibonacciM(num);
  }
}
timeStop = new Date();
const timeWith = timeStop - timeStart;

console.log(`fromt: ${from}, to: ${to}, loops: ${loops}`);
console.log(`time without memoization: ${timeWithout}`);
console.log(`time with memoization: ${timeWith}`);
