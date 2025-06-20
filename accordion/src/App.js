import React from 'react';
import Accordion from './Accordion';

const customStyles = {
  backgroundColor: 'lightblue',
  color: 'darkblue',
  padding: '20px',
};

function App() {
  return (
    <div>
      <h1>React Accordion</h1>
      <Accordion styles={customStyles} />
    </div>
  );
}

export default App;