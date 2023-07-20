import React, { useState } from 'react';
import './App.css';
import buttonImage from './buttonImage.png';
import buttonImageHover from './buttonImageHover.png';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState({
    years: '- -',
    months: '- -',
    days: '- -'
  });
  const [invalidDay, setInvalidDay] = useState(false);
  const [invalidMonth, setInvalidMonth] = useState(false);
  const [invalidYear, setInvalidYear] = useState(false);
  const [invalidYearMessage, setInvalidYearMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

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
      setAge({ years: '- -', months: '- -', days: '- -' });

      setInvalidDay(day === '' || parseInt(day) < 1 || parseInt(day) > 31 || isNaN(parseInt(day)));
      setInvalidMonth(month === '' || parseInt(month) < 1 || parseInt(month) > 12 || isNaN(parseInt(month)));

      validateYear();
    } else {
      const ageInMilliseconds = today - birthDate;
      const ageDate = new Date(ageInMilliseconds);
      const years = Math.abs(ageDate.getUTCFullYear() - 1970);
      const months = ageDate.getUTCMonth();
      const days = ageDate.getUTCDate() - 1;

      setAge({ years, months, days });
      setInvalidDay(false);
      setInvalidMonth(false);
      setInvalidYear(false);
    }
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const validateYear = () => {
    const currentYear = new Date().getFullYear();
    if (year === '' || isNaN(parseInt(year))) {
      setInvalidYear(true);
      setInvalidYearMessage('This field is required');
    } else if (parseInt(year) < 1900) {
      setInvalidYear(true);
      setInvalidYearMessage('Invalid Year');
    } else if (parseInt(year) > currentYear) {
      setInvalidYear(true);
      setInvalidYearMessage('Must be in the past');
    } else {
      setInvalidYear(false);
      setInvalidYearMessage('');
    }
  };

  return (
    <div className='white-background'>
      <div className="App">
        <div className="grid-container">
          {/* Day Input */}
          <div className="item">
            <span className={invalidDay ? 'invalid-label' : 'dates'}>DAY</span>
            <input
              className={`item ${invalidDay ? 'input-error' : 'input-XX'}`}
              placeholder="DD"
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            {invalidDay && <p className="error-message">{day === '' ? 'This field is required' : 'Must be a valid day'}</p>}
          </div>
          {/* Month Input */}
          <div className="item">
            <span className={invalidMonth ? 'invalid-label' : 'dates'}>MONTH</span>
            <input
              className={`item ${invalidMonth ? 'input-error' : 'input-XX'}`}
              placeholder="MM"
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            {invalidMonth && <p className="error-message">{month === '' ? 'This field is required' : 'Must be a valid month'}</p>}
          </div>
          {/* Year Input */}
          <div className="item">
            <span className={invalidYear ? 'invalid-label' : 'dates'}>YEAR</span>
            <input
              className={`item ${invalidYear ? 'input-error' : 'input-XX'}`}
              placeholder="YY"
              type="text" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            {invalidYear && <p className="error-message">{invalidYearMessage}</p>}
          </div>
        </div>
        {/* Button */}
        <div>
          <div className="Button">
            <button
              onClick={() => {
                validateYear();
                calculateAge();
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            >
              <img className="button-image" src={isHovered ? buttonImageHover : buttonImage} alt="button-image" />
            </button>
          </div>
          {/* Age Display */}
          <h1>
            <span>{age.years}</span> years
          </h1>
          <h1>
            <span>{age.months}</span> months
          </h1>
          <h1>
            <span>{age.days}</span> days
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;



// // we need to put the divs underneath the parent div and change their margins and padding
// import React, { useState } from 'react';
// import './App.css';
// import buttonImage from './buttonImage.png';
// import buttonImageHover from './buttonImageHover.png';


// function App() {
//   const [day, setDay] = useState('');
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [age, setAge] = useState({
//     years: '- -',
//     months: '- -',
//     days: '- -'
//   });
//   const [invalidDay, setInvalidDay] = useState(false);
//   const [invalidMonth, setInvalidMonth] = useState(false);
//   const [invalidYear, setInvalidYear] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [invalidYearMessage, setInvalidYearMessage] = useState('');


//   const calculateAge = () => {
//   const today = new Date();
//     const birthDate = new Date(year, month - 1, day);

//     if (
//       isNaN(birthDate) ||
//       birthDate > today ||
//       birthDate.getDate() !== parseInt(day) ||
//       birthDate.getMonth() !== parseInt(month) - 1 ||
//       birthDate.getFullYear() !== parseInt(year)
//     ) {
//       setAge({ years: '- -', months: '- -', days: '- -' });

//       setInvalidDay(day === '' || parseInt(day) < 1 || parseInt(day) > 31 || isNaN(parseInt(day)));
//       setInvalidMonth(month === '' || parseInt(month) < 1 || parseInt(month) > 12 || isNaN(parseInt(month)));
//       setInvalidYear(year === '' || parseInt(year) < 1900 || parseInt(year) > today.getFullYear() || isNaN(parseInt(year)));
//     } else {
//       const ageInMilliseconds = today - birthDate;
//       const ageDate = new Date(ageInMilliseconds);
//       const years = Math.abs(ageDate.getUTCFullYear() - 1970);
//       const months = ageDate.getUTCMonth();
//       const days = ageDate.getUTCDate() - 1;

//       setAge({ years, months, days });
//       setInvalidDay(false);
//       setInvalidMonth(false);
//       setInvalidYear(false);
//     }
//   };

//   const handleHover = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };
//   const validateInputs = () => {
//     const currentYear = new Date().getFullYear();
//     setInvalidDay(day === '' || parseInt(day) < 1 || parseInt(day) > 31 || isNaN(parseInt(day)));
//     setInvalidMonth(month === '' || parseInt(month) < 1 || parseInt(month) > 12 || isNaN(parseInt(month)));
//     if (year === '' || isNaN(parseInt(year))) {
//       setInvalidYear(true);
//       setInvalidYearMessage('This field is required');
//     } else if (parseInt(year) < 1900) {
//       setInvalidYear(true);
//       setInvalidYearMessage('Year must be greater than 1900');
//     } else if (parseInt(year) > currentYear) {
//       setInvalidYear(true);
//       setInvalidYearMessage('Must be in the past'); // Custom error message for future years
//     } else {
//       setInvalidYear(false);
//       setInvalidYearMessage(''); // Reset error message if year is valid
//     }
//   };

//   return (
//     <div className='white-background'>

//       <div className="App">
//         <div className="grid-container">
//           <div className="item">
//             <span className={invalidDay ? 'invalid-label' : 'dates'}>DAY</span>
//             <input
//               className={`item ${invalidDay ? 'input-error' : 'input-XX'}`}
//               placeholder="DD"
//               type="text"
//               value={day}
//               onChange={(e) => setDay(e.target.value)}
//             />
//             {invalidDay && <p className="error-message">{day === '' ? 'This field is required' : 'Must be a valid day'}</p>}
//           </div>
//           <div className="item">
//             <span className={invalidMonth ? 'invalid-label' : 'dates'}>MONTH</span>
//             <input
//               className={`item ${invalidMonth ? 'input-error' : 'input-XX'}`}
//               placeholder="MM"
//               type="text"
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//             />
//             {invalidMonth && <p className="error-message">{month === '' ? 'This field is required' : 'Must be a valid month'}</p>}
//           </div>
//           <div className="item">
//             <span className={invalidYear ? 'invalid-label' : 'dates'}>YEAR</span>
//             <input
//               className={`item ${invalidYear ? 'input-error' : 'input-XX'}`}
//               placeholder="YY"
//               type="text"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//             />
            
//           </div>

//         </div>
//         <div>
//           <div className="Button">
//             <button
//               onClick={() => {
//                 validateInputs();
//                 calculateAge();
//               }}
//               onMouseEnter={handleHover}
//               onMouseLeave={handleMouseLeave}
//             >
//               <img className="button-image" src={isHovered ? buttonImageHover : buttonImage} alt="button-image" />

//             </button>
//           </div>
//           <h1>
//             <span>{age.years}</span> years
//           </h1>
//           <h1>
//             <span>{age.months}</span> months
//           </h1>
//           <h1>
//             <span>{age.days}</span> days
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;