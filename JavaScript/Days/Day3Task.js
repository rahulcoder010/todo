// Day 3 Task - JavaScript

// Task 1: Reverse a string
function reverseString(str) {
    return str.split('').reverse().join('');
}
console.log(reverseString('Hello World'));

// Task 2: Find the factorial of a number
function factorial(num) {
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}
console.log(factorial(5));

// Task 3: Check if a number is prime
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
console.log(isPrime(17));

// Task 4: Calculate the Fibonacci sequence
function fibonacci(n) {
    if (n === 1) {
        return [0];
    } else if (n === 2) {
        return [0, 1];
    } else {
        let sequence = [0, 1];
        for (let i = 2; i < n; i++) {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
        }
        return sequence;
    }
}
console.log(fibonacci(8));

// Task 5: Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}
console.log(celsiusToFahrenheit(25));

// Task 6: Check if a string is a palindrome
function isPalindrome(str) {
    let reversed = str.split('').reverse().join('');
    return str === reversed;
}
console.log(isPalindrome('level'));

// Task 7: Sort an array in ascending order
function sortArray(arr) {
    return arr.sort((a, b) => a - b);
}
console.log(sortArray([5, 2, 9, 1, 3]));