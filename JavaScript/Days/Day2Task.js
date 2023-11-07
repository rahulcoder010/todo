// Day 2 Task

//Task 1: Implement a function to find the maximum and minimum elements in an array.
function findMaxAndMin(arr) {
  let max = arr[0];
  let min = arr[0];

  arr.forEach((num) => {
    if (num > max) {
      max = num;
    } else if (num < min) {
      min = num;
    }
  });

  return { max, min };
}

//Task 2: Implement a function to find the sum of all elements in an array.
function findSum(arr) {
  let sum = 0;

  arr.forEach((num) => {
    sum += num;
  });

  return sum;
}

//Task 3: Implement a function to find the average of all elements in an array.
function findAverage(arr) {
  let sum = findSum(arr);

  return sum / arr.length;
}

//Task 4: Implement a function to check if a given number is prime or not.
function isPrime(num) {
  if (num <= 1) {
    return false;
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

//Task 5: Implement a function to find all prime numbers within a given range.
function findPrimesInRange(start, end) {
  let primes = [];

  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return primes;
}

//Task 6: Implement a function to reverse a given string.
function reverseString(str) {
  return str.split('').reverse().join('');
}

//Task 7: Implement a function to check if a given string is a palindrome.
function isPalindrome(str) {
  let reversedStr = reverseString(str);

  return str === reversedStr;
}