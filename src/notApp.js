import React, { useState } from 'react';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    if (
      isNaN(birthDate) ||
      birthDate > today ||
      birthDate.getDate() !== parseInt(day) ||
      birthDate.getMonth() !== parseInt(month) - 1 ||
      birthDate.getFullYear() !== parseInt(year)
    ) {
      setAge('Invalid date');
    } else {
      const ageInMilliseconds = today - birthDate;
      const ageDate = new Date(ageInMilliseconds);
      const years = Math.abs(ageDate.getUTCFullYear() - 1970);
      const months = ageDate.getUTCMonth();
      const days = ageDate.getUTCDate() - 1;

      setAge(`${years} years, ${months} months, ${days} days`);
    }
  };

  return (
    <div className="App">
      <h1>Birthday Age Calculator</h1>
      <label>
        Day:
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </label>
      <label>
        Month:
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </label>
      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <button onClick={calculateAge}>Calculate Age</button>
      {age && <p>{age}</p>}
    </div>
  );
}

export default App;
