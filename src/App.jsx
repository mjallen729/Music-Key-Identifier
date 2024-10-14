import { useState } from 'react';
import NotesInput from './components/InputNotes';
import './App.css';

function App() {
  const [found, setFound] = useState([]);

  return (
    <div id='root'>
      <div style={{ padding: '20px' }}>
        <h1>Musical Notes Input</h1>
        <NotesInput onSubmit={setFound}/>
      </div>
    </div>
  )
}

export default App
