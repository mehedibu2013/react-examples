import React from 'react';
import './App.css';
import ATMPrototype from './components/ATMPrototype';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100 py-8">
        <ATMPrototype />
      </div>
    </div>
  );
};

export default App;