import React, { useState } from 'react';

function Calculator() {
  const [result, setResult] = useState(0);
  const [number, setNumber] = useState(0);

  const handleAdd = () => {
    setResult(result + number);
  };

  const handleSubtract = () => {
    setResult(result - number);
  };

  const handleMultiply = () => {
    setResult(result * number);
  };

  const handleDivide = () => {
    setResult(result / number);
  };

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={handleAdd}>+</button>
      <button onClick={handleSubtract}>-</button>
      <button onClick={handleMultiply}>*</button>
      <button onClick={handleDivide}>/</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default Calculator;