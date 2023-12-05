// start.js

// Write code for star pattern

const n = 5;

// outer loop to handle number of rows
for (let i = 1; i <= n; i++) {
  // inner loop to handle number of columns
  for (let j = 1; j <= i; j++) {
    // printing star
    console.log("*");
  }
  // ending line after each row
  console.log("\n");
}