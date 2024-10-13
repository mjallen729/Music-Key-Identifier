// src/NotesInput.js
import React, { useState, useRef } from 'react';

const NotesInput = () => {
  const [notes, setNotes] = useState(['']); // Start with one input box
  const inputRefs = useRef([]); // Create a ref to store references to the input boxes

  // Handle the change in input fields
  const handleChange = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  // Handle the Enter key press
  const handleKeyDown = (index, event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      setNotes(prevNotes => {
        const newNotes = [...prevNotes, '']; // Add a new input box
        // Focus on the new input box after the state has updated
        setTimeout(() => {
          inputRefs.current[newNotes.length - 1].focus(); // Focus the last input box
        }, 0);
        return newNotes; // Return the updated notes array
      });
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted notes:', notes);
    // Handle the notes submission logic (e.g., send to API)
  };

  return (
    <form onSubmit={handleSubmit}>
      {notes.map((note, index) => (
        <input
          key={index}
          type="text"
          value={note}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          placeholder={`Note ${index + 1}`}
          ref={el => (inputRefs.current[index] = el)} // Assign the ref
          style={{ display: 'block', marginBottom: '10px' }} // Style for spacing
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default NotesInput;
