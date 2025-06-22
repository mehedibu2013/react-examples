import React, { useEffect, useState } from 'react';
import './ProgressBar.css'; // optional external styling

const ProgressBar = () => {
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    // Trigger fill after mount
    const timeout = setTimeout(() => {
      setWidth('100%');
    }, 10); // small delay ensures transition applies

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-fill" style={{ width }}></div>
    </div>
  );
};

export default ProgressBar;
