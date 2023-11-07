// Day 4 Task - JavaScript

// Task 1: Reverse a String
const reverseString = (str) => {
  return str.split('').reverse().join('');
};

// Task 2: Find the largest number in an array
const findLargestNumber = (arr) => {
  return Math.max(...arr);
};

// Task 3: Check if a number is prime
const isPrime = (num) => {
  for(let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if(num % i === 0) {
      return false;
    }
  }
  return num > 1;
};

// Task 4: Find the factorial of a number
const factorial = (num) => {
  if(num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
};

// Task 5: Reverse an array
const reverseArray = (arr) => {
  return arr.reverse();
};

// Task 6: Remove duplicates from an array
const removeDuplicates = (arr) => {
  return Array.from(new Set(arr));
};

// Task 7: Check if a string is palindrome
const isPalindrome = (str) => {
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
};

module.exports = {
  reverseString,
  findLargestNumber,
  isPrime,
  factorial,
  reverseArray,
  removeDuplicates,
  isPalindrome
};