import { useState } from 'react';
import NotesInput from './components/InputNotes';
import './App.css';

function App() {

  return (
    <div id='root'>
      <div style={{ padding: '20px' }}>
        <h1>Musical Notes Input</h1>
        <NotesInput />
      </div>
    </div>
  )
}

export default App
