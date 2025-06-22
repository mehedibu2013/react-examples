import React, { useState } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';

function App() {
  const [bars, setBars] = useState([]);

  const handleAdd = () => {
    setBars((prevBars) => [...prevBars, Date.now()]);
  };

  return (
    <div className="App">
      <button onClick={handleAdd}>Add</button>
      <div className="bars-container">
        {bars.map((barId) => (
          <ProgressBar key={barId} />
        ))}
      </div>
    </div>
  );
}

export default App;
