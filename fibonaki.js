// This is a placeholder for the code

// Write code here to implement the Fibonacci logic

const fibonaki = (num) => {
  if (num <= 1) {
    return num;
  } else {
    return fibonaki(num - 1) + fibonaki(num - 2);
  }
};

module.exports = fibonaki;