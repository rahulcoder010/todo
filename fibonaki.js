const fibonaki = (n) => {
  if (n <= 0) {
    return [];
  }
  if (n === 1) {
    return [1];
  }
  const fibSequence = [1, 1];
  for (let i = 2; i < n; i++) {
    fibSequence.push(fibSequence[i - 1] + fibSequence[i - 2]);
  }
  return fibSequence;
};