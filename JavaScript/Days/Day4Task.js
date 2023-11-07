// Day 4

// 1. Find the longest word in a string
function findLongestWord(str) {
  var words = str.split(' ');
  var longestWord = '';
  
  for (var i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }
  
  return longestWord;
}

// 2. Reverse a string
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 3. Check for Palindromes
function palindrome(str) {
  var cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  var reversedStr = reverseString(cleanedStr);
  
  return cleanedStr === reversedStr;
}

// 4. Find the factorial of a number
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  
  return num;
}

// 5. Return the largest numbers in subarrays
function largestOfFour(arr) {
  return arr.map(function(subArr) {
    return Math.max.apply(null, subArr);
  });
}

// 6. Confirm the ending of a string
function confirmEnding(str, target) {
  return str.slice(-target.length) === target;
}

// 7. Repeat a string
function repeatStringNumTimes(str, num) {
  if (num <= 0) {
    return '';
  }
  
  var repeatedStr = '';
  
  for (var i = 0; i < num; i++) {
    repeatedStr += str;
  }
  
  return repeatedStr;
}