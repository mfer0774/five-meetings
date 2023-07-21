import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import Thing from './Thing';
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
    "let's push the envelope",
    "we're going to build this plane while flying",
    "we need to create a value-add",
    "let's pivot this",
    "we need to align our strategies",
    "this is a bleeding-edge concept",
    "there seems to be a disconnect here"
  ];

  const [showSketch, setShowSketch] = useState(false);
  const [key, setKey] = useState(0);
  const [slogan, setSlogan] = useState("this meeting could have been an email");

  const regenerate = () => {
    setKey(prevKey => prevKey + 1);
    setShowSketch(true);
    const newSlogan = slogans[Math.floor(Math.random() * slogans.length)];
    setSlogan(newSlogan);
  };

  return (
    <div className="App">
      <header className="container">
        <h1 className="typeText">{slogan}</h1>
        {showSketch && <div className="sketchContainer" key={key}><Thing /></div>}
        <button className="ctaButton" onClick={regenerate}>make it interesting</button>
      </header>
      <footer className="footer">
        <a href="https://github.com/mfer0774/five-meetings" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
      </footer>
    </div>
  );
}

export default App;
