import React, { useState, useEffect } from 'react';

const ApiDisplay = () => {
  const [result, setResult] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL + '/api/ms1?param1=dan';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Data:', data);
        setResult(data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setResult('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {result ? <p>Result: {result}</p> : <p>Loading...</p>}
    </div>
  );
};

export default ApiDisplay;