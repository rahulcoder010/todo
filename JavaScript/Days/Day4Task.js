// Day4Task.js

// Task 1: Reverse a string
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Task 2: Check if a string is a palindrome
function isPalindrome(str) {
  return str === reverseString(str);
}

// Task 3: Find the first non-repeated character in a string
function firstNonRepeatedChar(str) {
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (str.indexOf(char) === i && str.indexOf(char, i + 1) === -1) {
      return char;
    }
  }
  return null;
}

// Task 4: Capitalize the first letter of each word in a string
function capitalizeWords(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    let word = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    words[i] = word;
  }
  return words.join(" ");
}

// Task 5: Calculate the factorial of a number
function factorial(num) {
  if (num === 0) {
    return 1;
  }
  return num * factorial(num - 1);
}

// Task 6: Check if a number is prime
function isPrime(num) {
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

// Task 7: Calculate the fibonacci sequence for a given number of terms
function fibonacci(num) {
  let fibSeq = [0, 1];
  for (let i = 2; i < num; i++) {
    let nextNum = fibSeq[i - 1] + fibSeq[i - 2];
    fibSeq.push(nextNum);
  }
  return fibSeq;
}