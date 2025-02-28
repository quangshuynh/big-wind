import React, { useState, useRef } from 'react';
import './App.css';
import fart1 from './assets/sounds/fart1.mp3';
import fart2 from './assets/sounds/fart2.mp3';
import fart3 from './assets/sounds/fart3.mp3';
import fart4 from './assets/sounds/fart4.mp3';
import fart5 from './assets/sounds/fart5.mp3';
import fart6 from './assets/sounds/fart6.mp3';
import fart7 from './assets/sounds/fart7.mp3';
import fart8 from './assets/sounds/fart8.mp3';
import fart9 from './assets/sounds/fart9.mp3';
import fart10 from './assets/sounds/fart10.mp3';
import fart11 from './assets/sounds/fart11.mp3';

function App() {
  const fartSounds = [
    fart1,
    fart2,
    fart3,
    fart4,
    fart5,
    fart6,
    fart7,
    fart8,
    fart9,
    fart10,
    fart11,
  ];

  const emojiVariants = ['💨', '💩', '🤮'];
  const fonts = [
    "'Comic Sans MS', cursive, sans-serif",
    // "'Arial Black', Gadget, sans-serif",
    // "'Courier New', Courier, monospace",
    // "Impact, Charcoal, sans-serif",
  ];

  const [emojis, setEmojis] = useState([]);
  const lastPlayed = useRef([]);

  const playFart = () => {
    let availableIndices = [];
    for (let i = 0; i < fartSounds.length; i++) {
      if (!lastPlayed.current.includes(i)) {
        availableIndices.push(i);
      }
    }
    if (availableIndices.length === 0) {
      availableIndices = fartSounds.map((_, index) => index);
    }
    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];

    lastPlayed.current.push(randomIndex);
    if (lastPlayed.current.length > 3) {
      lastPlayed.current.shift();
    }

    const randomSound = fartSounds[randomIndex];
    const audio = new Audio(randomSound);
    audio.play();

    const count = 5;
    for (let i = 0; i < count; i++) {
      const id = Date.now() + '-' + i;
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      const angle = Math.random() * 2 * Math.PI;
      const distance = 100 + Math.random() * 200;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      const duration = 1 + Math.random() * 0.5;
      const emoji =
        emojiVariants[Math.floor(Math.random() * emojiVariants.length)];
      const font = fonts[Math.floor(Math.random() * fonts.length)];
      const fontSize = 2 + Math.random() * 1 + 'rem';

      const newEmoji = { id, left, top, dx, dy, duration, emoji, font, fontSize };

      setEmojis(prev => [...prev, newEmoji]);

      setTimeout(() => {
        setEmojis(prev => prev.filter(e => e.id !== id));
      }, duration * 1000);
    }
  };

  return (
    <div className="App">
      <div className="emoji-container">
        {emojis.map(e => (
          <div
            key={e.id}
            className="floating-emoji"
            style={{
              left: `${e.left}%`,
              top: `${e.top}%`,
              animationDuration: `${e.duration}s`,
              '--dx': `${e.dx}px`,
              '--dy': `${e.dy}px`,
              fontFamily: e.font,
              fontSize: e.fontSize,
            }}
          >
            {e.emoji}
          </div>
        ))}
      </div>

      <header className="App-header">
        <h1>Fartastic Fun!</h1>
        <button className="fart-button" onClick={playFart}>
          Make a Fart Noise!
        </button>
      </header>
    </div>
  );
}

export default App;