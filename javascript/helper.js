"use strict";

const internals = {};

exports.getPrimes = internals.getPrimes = function (n) {
  // Sieve of Sundaram
  let nNew = n / 2;
  let marked = [];
  let primes = [];
  for (let i = 0; i < nNew + 1; i++) {
    marked[i] = false;
  }
  for (let i = 1; i <= nNew; i++) {
    for (let j = i; i + j + 2 * i * j <= nNew; j++) {
      marked[i + j + 2 * i * j] = true;
    }
  }
  if (n > 2) {
    primes.push(2);
  }
  for (let i = 1; i < nNew; i++) {
    if (!marked[i]) {
      primes.push(2 * i + 1);
    }
  }
  return primes;
};

exports.isPrime = internals.isPrime = function (num) {
  if (num <= 1) {
    return false;
  } else if (num <= 3) {
    return true;
  }
  if (num % 2 === 0 || num % 3 === 0) {
    return false;
  }
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  return true;
};

exports.gcd = internals.gcd = function (a, b) {
  if (b == 0) return a;
  else return internals.gcd(b, a % b);
};

exports.getDivisors = internals.getDivisors = function (n) {
  let count = 1;
  let factorization = "";
  const bases = [];
  const exponents = [];
  if (internals.isPrime(n)) {
    bases.push(n);
    exponents.push(1);
    return { count: 2, factorization: n + "", bases, exponents };
  }
  const primes = internals.getPrimes(Math.floor(Math.sqrt(n)));
  const primesLength = primes.length;
  let number = n;
  let exponent = 0;
  for (let i = 0; i < primesLength; i++) {
    while (number % primes[i] === 0 && !bases.includes(primes[i])) {
      exponent += 1;
      number /= primes[i];
      if (internals.isPrime(number) && number !== primes[i]) {
        bases.push(number);
        exponents.push(1);
      }
    }
    if (exponent > 0) {
      bases.push(primes[i]);
      exponents.push(exponent);
    }
    exponent = 0;
    number = n;
  }
  for (let i = 0; i < bases.length; i++) {
    count *= exponents[i] + 1;
    if (exponents[i] > 1) {
      factorization +=
        bases[i] + "**" + exponents[i] + (i === bases.length - 1 ? "" : "*");
    } else factorization += bases[i] + (i === bases.length - 1 ? "" : "*");
  }
  return { count, factorization, bases, exponents };
};

exports.isLeapYear = internals.isLeapYear = function (year) {
  if (year % 100 === 0) {
    if (year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
};

internals.handleCarry = function (array) {
  let i = array.length - 1;
  while (i >= 0) {
    if (array[i] > 9) {
      let temp = array[i];
      array[i] = temp % 10;
      if (i > 0) {
        array[i - 1] += Math.floor(temp / 10);
      } else {
        array = [Math.floor(temp / 10)].concat(array);
      }
    }
    i = i - 1;
  }
  return array;
};

internals.prependZeros = function (array, n) {
  for (let i = 0; i < n; i++) {
    array.unshift(0);
  }
  return array;
};

exports.bigNumberSum = internals.bigNumberSum = function (s, t) {
  let augend = s;
  let addend = t;
  let result = [];
  if (typeof s === "string" && typeof t === "string") {
    while (s[0] === "0") {
      s = s.slice(1);
    }
    augend = Array.from(s, Number);

    while (t[0] === "0") {
      t = t.slice(1);
    }
    addend = Array.from(t, Number);
  }
  if (augend.length < addend.length) {
    [augend, addend] = [addend, augend];
  }
  const deltaLength = augend.length - addend.length;
  if (deltaLength > 0) {
    addend = internals.prependZeros(addend, deltaLength);
  }
  for (let i = 0; i < augend.length; i++) {
    result[i] = augend[i] + addend[i];
  }
  result = internals.handleCarry(result);
  return result;
};

exports.bigNumberMultiply = internals.bigNumberMultiply = function (s, t) {
  let multiplicand = s;
  let multiplier = t;
  if (typeof s === "string" && typeof t === "string") {
    while (s[0] === "0") {
      s = s.slice(1);
    }
    multiplicand = Array.from(s, Number);

    while (t[0] === "0") {
      t = t.slice(1);
    }
    multiplier = Array.from(t, Number);
  }
  let product = Array.from(
    { length: multiplier.length + multiplicand.length - 1 },
    () => 0
  );
  for (let i = 0; i < multiplier.length; i++) {
    for (let j = 0; j < multiplicand.length; j++) {
      product[i + j] += multiplicand[j] * multiplier[i];
    }
  }
  product = internals.handleCarry(product);
  return product;
};
