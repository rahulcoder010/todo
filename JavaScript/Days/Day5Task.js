// Day 5

// Task 1: Write a JavaScript program to calculate the factorial of a number.
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Task 2: Write a JavaScript program to check if a number is prime or not.
function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Task 3: Write a JavaScript program to reverse a string.
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Task 4: Write a JavaScript program to find the largest of three given integers.
function findLargestInteger(a, b, c) {
  return Math.max(a, b, c);
}

// Task 5: Write a JavaScript program to check if a given string is a palindrome or not.
function isPalindrome(str) {
  let reverseStr = str.split("").reverse().join("");
  return str === reverseStr;
}

// Task 6: Write a JavaScript program to sort an array of numbers in ascending order.
function sortArrayAscending(arr) {
  return arr.sort((a, b) => a - b);
}

// Task 7: Write a JavaScript program to find the sum of natural numbers up to a given limit.
function sumOfNaturalNumbers(limit) {
  let sum = 0;
  for (let i = 1; i <= limit; i++) {
    sum += i;
  }
  return sum;
}