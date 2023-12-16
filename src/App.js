import "./styles/globals.scss";

import React, { useState, useEffect, useRef } from "react";
import { pickRandomEmoticonSubCategory } from "./emojis";

import Add from "./components/Add";
import Picker from "./components/Picker";

const names = [
    "Test",
    "Test2",
    "Test3",
    "Test4",
    "Test5",
    "Test6",
    "Test7",
    "Test8",
    "Test9",
];
const lastSelect = "Test";

// Function to shuffle the array in-place
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
};

const finalArray = names.filter((name) => {
    return name !== lastSelect;
});

shuffleArray(finalArray);

const emoticonLibraryArray = pickRandomEmoticonSubCategory();

const App = () => {
    // State to manage the value
    const [roster, setRoster] = useState([]);

    const handleKeyDown = (event) => {
        // Check if Ctrl key is pressed (event.ctrlKey) and the pressed key is 'a' (event.key === 'a')
        if ((event.ctrlKey || event.metaKey) && event.key === "a") {
            // Your custom logic here
            console.log("Ctrl + A pressed!");
        }
    };
    const min = 500;
    const intervalMax = min; // randomNumber // 500;

    // Key for local storage
    const storageKey = "testArray";

    // Function to set the array in local storage and update state
    const setLocalStorageArray = (array) => {
        localStorage.setItem(storageKey, JSON.stringify(array));
        setRoster(array);
    };

    // Function to get the array from local storage
    const getLocalStorageArray = () => {
        const storedArray = localStorage.getItem(storageKey);
        setRoster(JSON.parse(storedArray) || []); // Set the state with the stored array or an empty array
    };

    // Use useEffect to load the value from local storage when the component mounts
    useEffect(() => {
        setLocalStorageArray(["Test", "Test2"]);
        getLocalStorageArray();
    }, []);

    console.log("RENDER APP");

    return (
        <div className="flex-container">
            {roster?.length ? (
                <Picker
                    intervalMax={intervalMax}
                    roster={finalArray}
                    emoticonLibraryArray={emoticonLibraryArray}
                />
            ) : (
                <Add />
            )}
        </div>
    );
};

export default App;
