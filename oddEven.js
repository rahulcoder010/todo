import React, { useState } from 'react';

function OddEven() {
   const [number, setNumber] = useState('');
   const [result, setResult] = useState('');

   const checkOddEven = () => {
      const num = parseInt(number);
      if (isNaN(num)) {
         setResult("Invalid input");
         return;
      }
      if (num % 2 === 0) {
         setResult("Even");
      } else {
         setResult("Odd");
      }
   }

   return (
      <div>
         <input type="text" value={number} onChange={e => setNumber(e.target.value)} />
         <button onClick={checkOddEven}>Check</button>
         <p>{result}</p>
      </div>
   );
}

export default OddEven;