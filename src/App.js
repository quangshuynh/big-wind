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
import quang1 from './assets/quang/quang1.png';
import quang2 from './assets/quang/quang2.png';
import quang3 from './assets/quang/quang3.png';
import quang4 from './assets/quang/quang4.png';
import quang5 from './assets/quang/quang5.png';
import quang6 from './assets/quang/quang6.png';
import quang7 from './assets/quang/quang7.png';
import quang8 from './assets/quang/quang8.png';

function App() {
  const fartSounds = [fart1, fart2, fart3, fart4, fart5, fart6, fart7, fart8, fart9, fart10, fart11];
  const quangImages = [quang1, quang2, quang3, quang4, quang5, quang6, quang7, quang8];

  const emojiVariants = ['💨', '💩', '🤮', '🚽', '🤢'];
  const fonts = ["'Comic Sans MS', cursive, sans-serif"];
  
  const [floatingItems, setFloatingItems] = useState([]);
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

    setFloatingItems([]);

    const allUnique = [
      ...emojiVariants.map(emoji => ({ type: 'emoji', content: emoji })),
      ...quangImages.map(src => ({ type: 'image', src }))
    ];

    const shuffled = allUnique.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);

    const newItems = selected.map((item, index) => {
      const id = Date.now() + '-' + index;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const angle = Math.random() * 2 * Math.PI;
      const distance = 100 + Math.random() * 200;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const duration = 1 + Math.random() * 0.5; 

      if (item.type === 'emoji') {
        const font = fonts[Math.floor(Math.random() * fonts.length)];
        const fontSize = 2 + Math.random() * 1 + 'rem';
        return { ...item, id, left, top, dx, dy, duration, font, fontSize };
      } else {
        return { ...item, id, left, top, dx, dy, duration };
      }
    });

    setFloatingItems(newItems);

    newItems.forEach(item => {
      setTimeout(() => {
        setFloatingItems(prev => prev.filter(i => i.id !== item.id));
      }, item.duration * 1000);
    });
  };

  return (
    <div className="App">
      <div className="emoji-container">
        {floatingItems.map(item =>
          item.type === 'emoji' ? (
            <div
              key={item.id}
              className="floating-emoji"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDuration: `${item.duration}s`,
                '--dx': `${item.dx}px`,
                '--dy': `${item.dy}px`,
                fontFamily: item.font,
                fontSize: item.fontSize,
              }}
            >
              {item.content}
            </div>
          ) : (
            <img
              key={item.id}
              className="floating-emoji"
              src={item.src}
              alt="Floating Quang"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDuration: `${item.duration}s`,
                '--dx': `${item.dx}px`,
                '--dy': `${item.dy}px`,
                width: '50px',
                height: 'auto',
              }}
            />
          )
        )}
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