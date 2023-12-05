```javascript
function fibonacci(n) {
  var fib = [0, 1];
  for (var i = 2; i < n + 1; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}
```