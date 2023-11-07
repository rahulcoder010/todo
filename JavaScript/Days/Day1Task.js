// Day 1 Task - Easy level
// Topic: Arrays

// Task 1: Declare an empty array named 'fruits'
var fruits = [];

// Task 2: Add 3 elements - 'apple', 'banana', and 'mango' to the 'fruits' array
fruits.push('apple');
fruits.push('banana');
fruits.push('mango');

// Task 3: Log the length of the 'fruits' array to the console
console.log(fruits.length);

// Day 1 Task - Medium level
// Topic: Loops

// Task 1: Using a loop, log all the elements in the 'fruits' array to the console
for (var i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Task 2: Using a loop, log all the elements in the 'fruits' array in reverse order to the console
for (var i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}

// Day 1 Task - Hard level
// Topic: Functions

// Task 1: Create a function named 'double' that takes a number as parameter and returns the double of that number
function double(num) {
  return num * 2;
}

// Task 2: Use the 'double' function to double the value of each element in the 'fruits' array and store the doubled values in a new array named 'doubledFruits'
var doubledFruits = [];
for (var i = 0; i < fruits.length; i++) {
  doubledFruits.push(double(fruits[i]));
}