// Day 2 Task:
// 1. Reverse a string.
// 2. Find the first non-repeating character in a string.
// 3. Check if a string is a palindrome.
// 4. Find the largest number in an array.
// 5. Find the sum of elements in an array.
// 6. Sort an array in ascending order.
// 7. Remove duplicates from an array.

// 1. Reverse a string.
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 2. Find the first non-repeating character in a string.
function firstNonRepeatingChar(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return str[i];
    }
  }
  return null;
}

// 3. Check if a string is a palindrome.
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

// 4. Find the largest number in an array.
function findLargestNumber(arr) {
  return Math.max(...arr);
}

// 5. Find the sum of elements in an array.
function findSum(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}

// 6. Sort an array in ascending order.
function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}

// 7. Remove duplicates from an array.
function removeDuplicates(arr) {
  return [...new Set(arr)];
}