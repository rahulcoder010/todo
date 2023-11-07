// Day 5 Task: 
// 1. Write a function to reverse a string.
// 2. Write a function to check if a string is a palindrome.
// 3. Write a function to find the longest word in a string.
// 4. Write a function to capitalize the first letter of each word in a string.
// 5. Write a function to count the number of occurrences of a specific character in a string.
// 6. Write a function to find the largest element in an array.
// 7. Write a function to remove duplicate elements from an array.

function reverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  const reversed = reverseString(str);
  return str === reversed;
}

function findLongestWord(str) {
  let longestWord = "";
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }
  
  return longestWord;
}

function capitalizeFirstLetter(str) {
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    const firstLetter = words[i][0].toUpperCase();
    words[i] = firstLetter + words[i].substring(1);
  }
  
  return words.join(" ");
}

function countOccurrences(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  
  return count;
}

function findLargestElement(arr) {
  let largest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  
  return largest;
}

function removeDuplicates(arr) {
  return arr.filter((value, index, arr) => {
    return arr.indexOf(value) === index;
  });
}