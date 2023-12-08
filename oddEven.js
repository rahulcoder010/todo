// oddEven.js

import React from 'react';

const OddEven = () => {
  const [number, setNumber] = React.useState('');
  const [result, setResult] = React.useState('');

  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };

  const handleButtonClick = () => {
    const num = parseInt(number);
    if (isNaN(num)) {
      setResult('Please enter a valid number');
    } else {
      setResult(num % 2 === 0 ? 'Even' : 'Odd');
    }
  };

  return (
    <div>
      <input type="text" value={number} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Check</button>
    </div>
  );
};

export default OddEven;