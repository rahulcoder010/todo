// Day 6 Task

// Easy Level Task 

// 1. Write a function to find the maximum of two numbers.

function maxOfTwoNumbers(num1, num2) {
  return Math.max(num1, num2);
}

// 2. Write a function to check if a number is even or odd.

function checkEvenOrOdd(num) {
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

// 3. Write a function to check if a string is palindrome or not.

function checkPalindrome(str) {
  return str === str.split("").reverse().join("");
}

// 4. Write a function to calculate the factorial of a number.

function calculateFactorial(num) {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

// Medium Level Task

// 5. Write a function to find the sum of the digits of a number.

function sumOfDigits(num) {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

// 6. Write a function to convert celsius to fahrenheit.

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// 7. Write a function to generate a random number between a given range.

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Hard Level Task

// 8. Write a function to find the length of the longest word in a sentence.

function findLongestWordLength(sentence) {
  let words = sentence.split(" ");
  let maxLength = 0;

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > maxLength) {
      maxLength = words[i].length;
    }
  }

  return maxLength;
}

// 9. Write a function to check if a number is a prime number.

function checkPrimeNumber(num) {
  if (num <= 1) {
    return false;
  } else if (num === 2) {
    return true;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

// 10. Write a function to reverse a string.

function reverseString(str) {
  return str.split("").reverse().join("");
}