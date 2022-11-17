"use strict";

// x = y + d, z = y - d; y = 2 * d +/- sqrt(4 * d * d - n)
// 6min35sec
const helper = require("./helper");

const isSingleton = function (n) {
  let count = 0;
  let divisors = helper.genDivisors(n).sort((a, b) => a - b);
  let divisorsCount = divisors.length;
  for (let i = 0; i < divisorsCount / 2; i++) {
    let a = n / divisors[i];
    let b = divisors[i];
    let diff = a - b;
    let sum = a + b;
    if (diff % 2 === 0 && sum % 4 === 0) {
      let k = diff / 2;
      let d = sum / 4;
      if (d > k && k !== 0) {
        count += 2;
      } else {
        count += 1;
      }
    }
    if (count > 1) {
      return false;
    }
  }
  if (count === 1) {
    return true;
  } else {
    return false;
  }
};

const p136Solution = function (limit) {
  let numbersCount = 0;
  for (let i = 1; i < limit; i++) {
    if (isSingleton(i)) {
      numbersCount++;
    }
  }
  return numbersCount;
};

console.log(p136Solution(5 * 10 ** 7));
