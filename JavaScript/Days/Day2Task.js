// File: JavaScript/Days/Day2Task.js

// Day 2 Task:
// 1. Reverse a string
// 2. Find the maximum and minimum values in an array
// 3. Convert a number to a string
// 4. Find the length of a string
// 5. Create a function that takes two numbers as arguments and returns their sum
// 6. Check if a given number is prime or not
// 7. Generate the Fibonacci sequence up to a certain number

// 1. Reverse a string
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 2. Find the maximum and minimum values in an array
function findMaxMin(arr) {
  let max = arr[0];
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return [max, min];
}

// 3. Convert a number to a string
function numberToString(num) {
  return num.toString();
}

// 4. Find the length of a string
function findStringLength(str) {
  return str.length;
}

// 5. Create a function that takes two numbers as arguments and returns their sum
function sumNumbers(num1, num2) {
  return num1 + num2;
}

// 6. Check if a given number is prime or not
function isPrime(num) {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

// 7. Generate the Fibonacci sequence up to a certain number
function generateFibonacciSequence(num) {
  if (num <= 0) {
    return [];
  } else if (num === 1) {
    return [0];
  } else if (num === 2) {
    return [0, 1];
  }

  const fibonacciSequence = [0, 1];

  while (fibonacciSequence[fibonacciSequence.length - 1] + fibonacciSequence[fibonacciSequence.length - 2] <= num) {
    fibonacciSequence.push(fibonacciSequence[fibonacciSequence.length - 1] + fibonacciSequence[fibonacciSequence.length - 2]);
  }

  return fibonacciSequence;
}