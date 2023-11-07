// Day 7 Task

// Easy Level
// 1. Find the length of an array using built-in array methods.
let arr = [1, 2, 3, 4, 5];
let length = arr.length;

// 2. Find the sum of all elements in an array using a loop.
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}

// 3. Check if a number is prime.
function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Medium Level
// 1. Reverse a string.
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 2. Check if a string is a palindrome.
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

// 3. Count the number of vowels in a string.
function countVowels(str) {
  return str.split('').filter(char => 'aeiouAEIOU'.includes(char)).length;
}

// Hard Level
// 1. Find the maximum sum of a subarray in an array.
function maxSubarraySum(arr) {
  let maxSum = 0;
  let currentSum = 0;
  for (let i = 0; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

// 2. Find the longest substring without repeating characters.
function longestSubstringWithoutRepeat(str) {
  let maxLength = 0;
  let start = 0;
  let seenChars = new Map();
  for (let i = 0; i < str.length; i++) {
    if (seenChars.has(str[i]) && start <= seenChars.get(str[i])) {
      start = seenChars.get(str[i]) + 1;
    } else {
      maxLength = Math.max(maxLength, i - start + 1);
    }
    seenChars.set(str[i], i);
  }
  return maxLength;
}

// 3. Implement a queue using two stacks.
class Queue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  enqueue(value) {
    this.inStack.push(value);
  }

  dequeue() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.pop();
  }

  isEmpty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}