import React, { useState } from 'react';
import MySketch from './Sketch';
import './App.css';

const App = () => {
  const [showSketch, setShowSketch] = useState(false);
  const [key, setKey] = useState(0);

  const regenerate = () => {
    setKey(prevKey => prevKey + 1);
    setShowSketch(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="typeText">this meeting could have been an email</h1>
        {showSketch && <div className="sketchContainer" key={key}><MySketch /></div>}
        <button className="ctaButton" onClick={regenerate}>make cool thing</button>
      </header>
    </div>
  );
}

export default App;
