import React, { useState, useEffect, useRef } from "react";

function Picker({ intervalMax, roster, emoticonLibraryArray }) {
    console.log("RENDER PICKER");

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [finished, setFinished] = useState(false);
    const intervalIdRef = useRef(null);
    const intervalDurationRef = useRef(10); // Initial interval duration in milliseconds
    const runIntervalRef = useRef(true); // Initial interval duration in milliseconds
    const divCount = roster.length;

    // console.log(roster);

    //  console.log(emoticonLibraryArray);

    useEffect(() => {
        const handleInterval = () => {
            if (runIntervalRef.current === false) {
                return;
            }
            // Clear the selected class for the previous index
            if (selectedIndex !== null) {
                document
                    .getElementById(`div-${selectedIndex}`)
                    .classList.remove("selected");
            }

            // Generate a random index for the next div
            const newIndex = Math.floor(Math.random() * divCount);

            // Animate selected boxes in order
            // let newIndex = selectedIndex + 1;
            // newIndex = newIndex > divCount - 1 ? 0 : newIndex

            // Add the selected class to the new index
            document
                .getElementById(`div-${newIndex}`)
                .classList.add("selected");

            // Update the selected index in the state
            setSelectedIndex(newIndex);

            // Check if the total time has reached 1 second (1000 milliseconds)
            if (
                intervalDurationRef.current < intervalMax &&
                runIntervalRef.current
            ) {
                // Update the interval duration dynamically
                intervalDurationRef.current *= 1.2;
            } else {
                // Stop the interval when 1 second is reached
                runIntervalRef.current = false;
                clearInterval(intervalIdRef.current);

                setTimeout(() => {
                    setFinished(true);
                }, 1000);
            }
        };

        // Start the initial interva)l
        intervalIdRef.current = setInterval(
            handleInterval,
            intervalDurationRef.current
        );

        // Clean up interval when the component unmounts
        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [selectedIndex, divCount, intervalMax]);

    // Render the 9 divs
    const divs = Array.from({ length: divCount }, (_, index) => (
        <div
            key={index}
            id={`div-${index}`}
            className={`box ${index === selectedIndex ? "selected" : ""} `}
        >
            <div>{emoticonLibraryArray[index]}</div>
            <div contentEditable="true">{roster[index]}</div>
        </div>
    ));

    console.log(runIntervalRef.current);

    return (
        <div className={`picker container ${finished ? "done" : ""}`}>
            {divs}
        </div>
    );
}

export default Picker;
