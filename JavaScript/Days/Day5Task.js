// Day 5 Task: 

// Task 1: Write a function to find the maximum and minimum elements in an array
// Task 2: Write a function to remove all duplicates from an array
// Task 3: Write a function to reverse a string
// Task 4: Write a function to check if a string is a palindrome or not
// Task 5: Write a function to sort an array of numbers in ascending order
// Task 6: Write a function to calculate the factorial of a number
// Task 7: Write a function to check if a number is prime or not

// Task 1:
function findMinMax(arr) {
  let min = arr[0];
  let max = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  
  return { min, max };
}

// Task 2:
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Task 3:
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Task 4:
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

// Task 5:
function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}

// Task 6:
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  
  return num * factorial(num - 1);
}

// Task 7:
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