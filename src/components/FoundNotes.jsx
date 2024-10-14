import React, { useState, useEffect } from 'react';

const FoundNotes = (props) => {
  const [foundNotes, setFoundNotes] = useState([]);

  // whenever the passed notelist changes we update the foundNotes, which updates the output
  useEffect(() => {
    setFoundNotes(props.noteList);
    console.log('FOUND NOTES:', foundNotes);

  }, [props.noteList]);
  
  return (
    <div className='found-notes'>
      <p className='found-notes-title'>Valid Keys:</p>
      {foundNotes.map(note => <p>{note}</p>)}
    </div>
  )
}

export default FoundNotes;