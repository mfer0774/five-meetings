import React, { useState } from 'react';
import MySketch from './Sketch';
import './App.css';

const App = () => {
  const slogans = [
    "let's not boil the ocean with that",
    "let's be sure to circle back on that",
    "we don't want to reinvent the wheel",
    "let's take this discussion offline",
    "this needs more bandwidth",
    "we need to leverage our synergy",
    "we're moving the goalposts",
    "we need a paradigm shift",
    "this will cause a sea change",
    "this is low-hanging fruit",
    "let's unpack this issue",
    "we're peeling the onion here",
    "we need to drill down on this",
    "this is a real game-changer",
    "this idea has legs",
    "let's put a pin in it",
    "it's on my radar",
    "let's deep dive on this",
    "we need to hit the ground running",
    "it's a win-win situation",
    "let's push the envelope"
  ];

  const [showSketch, setShowSketch] = useState(false);
  const [key, setKey] = useState(0);
  const [slogan, setSlogan] = useState("This meeting could have been an email");

  const regenerate = () => {
    setKey(prevKey => prevKey + 1);
    setShowSketch(true);
    const newSlogan = slogans[Math.floor(Math.random() * slogans.length)];
    setSlogan(newSlogan);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="typeText">{slogan}</h1>
        {showSketch && <div className="sketchContainer" key={key}><MySketch /></div>}
        <button className="ctaButton" onClick={regenerate}>Make it entertaining</button>
      </header>
    </div>
  );
}

export default App;
