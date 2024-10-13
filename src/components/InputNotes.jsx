// src/NotesInput.js
import React, { useState, useRef } from 'react';

const NotesInput = () => {
  const [notes, setNotes] = useState(['']); // Start with one input box
  const inputRefs = useRef([]); // Create a ref to store references to the input boxes
  const allowedNotes = new Set(['A','B','C','D','E','F','G', '']);

  // Handle the change in input fields
  const handleChange = (index, value) => {
    let newNotes = [...notes];
    let capitalizedNote = value.charAt(0).toUpperCase();

    // use if chaining to check all the conditions each time
    if (!allowedNotes.has(capitalizedNote)) {
      newNotes[index] = '';
      return;
    
    }
    
    newNotes[index] = capitalizedNote + value.slice(1, 2);
    setNotes(newNotes);

  };

  // Handle the Enter key press
  const handleKeyDown = (index, event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission

      if (notes.length >= 7 || notes[notes.length - 1] === '') {
        return;
      }
      
      setNotes(prevNotes => {
        var newNotes = [...prevNotes, '']; // Add a new input box
        
        setTimeout(() => {
          inputRefs.current[newNotes.length - 1].focus(); // Focus the last input box
        }, 0);
        return newNotes;

      });
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted notes:', notes);
    // TODO handle the notes submission logic (e.g., send to API)
    
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
