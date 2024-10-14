// src/NotesInput.js
import React, { useState, useRef } from 'react';
import FindNotes from '../services/FindKeyFromNotes';

const noteFinder = new FindNotes();

const NotesInput = (props) => {
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

    if (newNotes[index].length == 2) {
      if (newNotes[index][1] != '#' && newNotes[index][1] != 'b') {
        newNotes[index] = capitalizedNote;

      }

    }

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

    if (event.key === 'Backspace' && notes.length != 1 && notes[notes.length - 1] == '') {
      setNotes(prevNotes => {
        let newNotes = [...prevNotes.slice(0, prevNotes.length - 1)]; // Add a new input box

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
    let tmp = new Set([]);

    for (let i = 0; i < notes.length; ++i) {
      if (notes[i] != '') {
        tmp.add(notes[i]);

      }

    }

    console.log('Submitted notes:', tmp);
    let found = noteFinder.run(tmp);
    console.log('Result', found)

    props.onSubmit(found);
    
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
