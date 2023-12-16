
import './styles/globals.scss';

import React, { useState, useEffect, useRef } from 'react';


const names = ['Test', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test7', 'Test8', 'Test9']
const lastSelect = 'Test';

// Function to shuffle the array in-place
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
};

const finalArray = names.filter(name => {
  console.log(name); console.log(lastSelect)
  console.log(name === lastSelect);
  return name !== lastSelect
});

console.log(finalArray);

shuffleArray(finalArray);




const App = () => {
  const handleKeyDown = (event) => {
    // Check if Ctrl key is pressed (event.ctrlKey) and the pressed key is 'a' (event.key === 'a')
    if (event.ctrlKey && event.key === 'a') {
      // Your custom logic here
      console.log('Ctrl + A pressed!');
    }
  };
  const min = 500;
const max = 1500;

const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

const intervalMax = min // randomNumber // 500;


  return <div onKeyDown={handleKeyDown} className="flex-container"><Select intervalMax={intervalMax} /></div>;
};

const Select = ({intervalMax}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const intervalIdRef = useRef(null);
  const intervalDurationRef = useRef(10); // Initial interval duration in milliseconds
  const runIntervalRef = useRef(true); // Initial interval duration in milliseconds
  const divCount = finalArray.length;
  console.log(finalArray.length);



console.log("IntervalMax: ", intervalMax)


  useEffect(() => {
    const handleInterval = () => {
      if (runIntervalRef.current === false) {
        return;
      }
      // Clear the selected class for the previous index
      if (selectedIndex !== null) {
        document.getElementById(`div-${selectedIndex}`).classList.remove('selected');
      }

      // Generate a random index for the next div
      const newIndex = Math.floor(Math.random() * divCount);
      
      // Animate selected boxes in order
      // let newIndex = selectedIndex + 1;
      // newIndex = newIndex > divCount - 1 ? 0 : newIndex


      // Add the selected class to the new index
      document.getElementById(`div-${newIndex}`).classList.add('selected');

      // Update the selected index in the state
      setSelectedIndex(newIndex);

      // Check if the total time has reached 1 second (1000 milliseconds)
      console.log('Interval: ', intervalDurationRef.current);
      if (intervalDurationRef.current < intervalMax && runIntervalRef.current) {
        // Update the interval duration dynamically
        intervalDurationRef.current *= 1.2;
      } else {
        // Stop the interval when 1 second is reached
        runIntervalRef.current = false
        clearInterval(intervalIdRef.current);
        console.log(selectedIndex);
      }
    };

    // Start the initial interval
    intervalIdRef.current = setInterval(handleInterval, intervalDurationRef.current);

    // Clean up interval when the component unmounts
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [selectedIndex, divCount, intervalMax]);

  // Render the 9 divs
  const divs = Array.from({ length: divCount }, (_, index) => (
    <div contentEditable="true" key={index} id={`div-${index}`} className={`box ${index === selectedIndex ? 'selected' : ''}`}>{finalArray[index]} </div>
  ));

  return <div className="container">{divs}</div>;
}

export default App;

