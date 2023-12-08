import React, { useState } from 'react';

function oddEven() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  const checkOddEven = () => {
    const num = parseInt(number);
    if (num % 2 === 0) {
      setResult('Even number');
    } else {
      setResult('Odd number');
    }
  }

  return (
    <div>
      <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
      <button onClick={checkOddEven}>Check</button>
      <p>{result}</p>
    </div>
  );
}

export default oddEven;