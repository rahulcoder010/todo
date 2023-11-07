// Day 7 Task


// Easy Level Tasks:


// Task 1: Write a function to check if a given number is prime or not.
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

// Task 2: Write a function that takes an array of numbers and returns the sum of all the numbers.
function sumArray(numbers) {
   let sum = 0;
   for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
   }
   return sum;
}

// Task 3: Write a function to reverse a given string.
function reverseString(str) {
   let reversed = '';
   for (let i = str.length - 1; i >= 0; i--) {
      reversed += str[i];
   }
   return reversed;
}


// Medium Level Tasks:


// Task 4: Write a function to find the maximum and minimum elements in an array.
function findMinMax(array) {
   let min = array[0];
   let max = array[0];
   
   for (let i = 1; i < array.length; i++) {
      if (array[i] < min) {
         min = array[i];
      }
      if (array[i] > max) {
         max = array[i];
      }
   }
   
   return [min, max];
}

// Task 5: Write a function to check if two strings are anagrams of each other.
function areAnagrams(str1, str2) {
   const sortedStr1 = str1.toLowerCase().split('').sort().join('');
   const sortedStr2 = str2.toLowerCase().split('').sort().join('');
   
   return sortedStr1 === sortedStr2;
}

// Task 6: Write a function to remove duplicates from an array.
function removeDuplicates(array) {
   const uniqueArray = [];
   for (let i = 0; i < array.length; i++) {
      if (!uniqueArray.includes(array[i])) {
         uniqueArray.push(array[i]);
      }
   }
   return uniqueArray;
}


// Hard Level Tasks:


// Task 7: Write a function to find the first repeated element in an array.
function findFirstRepeatedElement(array) {
   const visitedElements = [];
   
   for (let i = 0; i < array.length; i++) {
      if (visitedElements.includes(array[i])) {
         return array[i];
      }
      visitedElements.push(array[i]);
   }
   
   return undefined;
}


// Task 8: Write a function to find the longest palindromic substring in a given string.
function longestPalindromicSubstring(str) {
   let longest = '';
   
   for (let start = 0; start < str.length; start++) {
      for (let end = start + 1; end <= str.length; end++) {
         const substring = str.slice(start, end);
         if (isPalindrome(substring) && substring.length > longest.length) {
            longest = substring;
         }
      }
   }
   
   return longest;
}

function isPalindrome(str) {
   return str === str.split('').reverse().join('');
}

// Task 9: Write a function to sort an array of integers in ascending order using the bubble sort algorithm.
function bubbleSort(array) {
   const length = array.length;
   for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
         if (array[j] > array[j + 1]) {
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
         }
      }
   }
   return array;
}

// Task 10: Write a function to find the maximum sum of a subarray of a given array.
function maximumSubarraySum(array) {
   let maxSum = array[0];
   let currentSum = array[0];
   
   for (let i = 1; i < array.length; i++) {
      currentSum = Math.max(currentSum + array[i], array[i]);
      maxSum = Math.max(currentSum, maxSum);
   }
   
   return maxSum;
}