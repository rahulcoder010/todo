// Day 6: DSA Tasks

// Task 1: Reverse a String
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Task 2: Check Palindrome
function isPalindrome(str) {
    return str.toLowerCase() === str.toLowerCase().split('').reverse().join('');
}

// Task 3: Find the Longest Word
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

// Task 4: Title Case a Sentence
function titleCase(str) {
    var words = str.toLowerCase().split(' ');
  
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
  
    return words.join(' ');
}

// Task 5: Find the Largest Element in an Array
function findLargestElement(arr) {
    var largest = arr[0];
  
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > largest) {
            largest = arr[i];
        }
    }
  
    return largest;
}

// Task 6: Find the Smallest Element in an Array
function findSmallestElement(arr) {
    var smallest = arr[0];
  
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
        }
    }
  
    return smallest;
}

// Task 7: Calculate the Sum of All Elements in an Array
function calculateArraySum(arr) {
    var sum = 0;
  
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
  
    return sum;
}