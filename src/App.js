import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import GroceryStore from './components/GroceryStore';
import NeighborhoodSales from './components/NeighborhoodSales';
import Modal from './components/Modal';

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
import superepicfart from './assets/sounds/superepicfart.mp3';

import quang1 from './assets/quang/quang1.png';
import quang2 from './assets/quang/quang2.png';
import quang3 from './assets/quang/quang3.png';
import quang4 from './assets/quang/quang4.png';
import quang5 from './assets/quang/quang5.png';
import quang6 from './assets/quang/quang6.png';
import quang7 from './assets/quang/quang7.png';
import quang8 from './assets/quang/quang8.png';

function App() {
  const fartSounds = [fart1, fart2, fart3, fart4, fart5, fart6, fart7, fart8, fart9, fart10, fart11, superepicfart];
  const customImages = [quang1, quang2, quang3, quang4, quang5, quang6, quang7, quang8];
  const emojiVariants = ['💨', '💩', '🤮', '🚽', '🤢'];
  const fonts = ["'Comic Sans MS', sans-serif"];

  const [toots, setToots] = useState(0);
  const [floatingItems, setFloatingItems] = useState([]);
  const lastPlayed = useRef([]);
  const [fartCount, setFartCount] = useState(0);
  const [showSuperEpicAnimation, setShowSuperEpicAnimation] = useState(false);
  const [stomach, setStomach] = useState(0); 
  const [tolerance, setTolerance] = useState(0);
  const [storeOpen, setStoreOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [accident, setAccident] = useState(false);
  
  const [fartMultiplier, setFartMultiplier] = useState(1);

  const [jarSaleAnnouncement, setJarSaleAnnouncement] = useState("");

  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const clickTimestamps = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      clickTimestamps.current = clickTimestamps.current.filter(ts => now - ts <= 1000);
      setClicksPerSecond(clickTimestamps.current.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const playFart = () => {
    if (stomach >= 100) {
      setAccident(true);
      setToots(prev => Math.max(0, prev - 10));
      setTimeout(() => {
        setAccident(false);
        setStomach(50); 
      }, 3000);
      return;
    }

    clickTimestamps.current.push(Date.now());

    const newCount = fartCount + fartMultiplier;
    setFartCount(newCount);

    let randomIndex;
    if (newCount === 100) {
      randomIndex = fartSounds.length - 1;
      setShowSuperEpicAnimation(true);
      setTimeout(() => setShowSuperEpicAnimation(false), 3000);
    } else if (newCount < 100) {
      let availableIndices = [];
      for (let i = 0; i < fartSounds.length - 1; i++) {
        if (!lastPlayed.current.includes(i)) {
          availableIndices.push(i);
        }
      }
      if (availableIndices.length === 0) {
        availableIndices = Array.from({ length: fartSounds.length - 1 }, (_, index) => index);
      }
      randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      let availableIndices = [];
      for (let i = 0; i < fartSounds.length; i++) {
        if (!lastPlayed.current.includes(i)) {
          availableIndices.push(i);
        }
      }
      if (availableIndices.length === 0) {
        availableIndices = Array.from({ length: fartSounds.length }, (_, index) => index);
      }
      randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }
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
      ...customImages.map(src => ({ type: 'image', src }))
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

  const handleNeighborSale = () => {
    if (fartCount < 100) {
      alert(`${fartCount}/100 farts - Not enough farts to sell a jar!`);
      return;
    }
    setFartCount(prev => prev - 100);
    const earnedToots = Math.floor(Math.random() * 9) + 5;
    setToots(prev => prev + earnedToots);
    setSalesOpen(false);
    
    setJarSaleAnnouncement(`Jar sold! You earned ${earnedToots} Toots.`);
    setTimeout(() => {
      setJarSaleAnnouncement("");
    }, 3000);
  };

  const handleBuyItem = (item) => {
    if (item.currency === "farts") {
      if (fartCount < item.price) {
        alert("Not enough farts!");
        return;
      }
      setFartCount(prev => prev - item.price);
      if (item.multiplierIncrease) {
        setFartMultiplier(prev => prev + item.multiplierIncrease);
        alert(`Fart Multiplier increased to ${fartMultiplier + item.multiplierIncrease}!`);
      }
      return;
    } else {
      if (toots < item.price) {
        alert("Not enough Toots!");
        return;
      }
      setToots(prev => prev - item.price);
      setStomach(prev => Math.min(100, prev + item.stomachFill));
      
      if (item.category === 'Dairy') {
        let riskRoll = Math.random();
        if (riskRoll > tolerance / 10) {
          alert("Fart Failure! Tummy ache – no boost this time.");
          return;
        } else {
          setTolerance(prev => Math.min(10, prev + 1));
        }
      }
      
      setToots(prev => prev + item.boost);
    }
  };

  return (
    <div className="App">
      {storeOpen && (
        <Modal onClose={() => setStoreOpen(false)}>
          <GroceryStore onBuyItem={handleBuyItem} />
        </Modal>
      )}
      {salesOpen && (
        <Modal onClose={() => setSalesOpen(false)}>
          <NeighborhoodSales onSale={handleNeighborSale} />
        </Modal>
      )}
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

      {showSuperEpicAnimation && (
        <div className="super-epic-animation">
          <h1>SUPER EPIC FART UNLOCKED!</h1>
        </div>
      )}

      {jarSaleAnnouncement && (
        <div className="jar-sale-announcement">
          <h1>{jarSaleAnnouncement}</h1>
        </div>
      )}

      <header className="App-header">
        <h1>Fartastic Fun!</h1>
        <p>Fart Count: {fartCount}</p>
        <p className="clicks-per-second" style={{ fontSize: '0.8em' }}>
          Clicks per second: {clicksPerSecond}
        </p>
        <p>Toots: {toots}</p>
        <p>Stomach: {stomach} / 100</p>
        <p>Tolerance: {tolerance} / 10</p>
        <button className="fart-button" onClick={playFart}>
          Make a Fart Noise!
        </button>
        <div className="action-buttons">
          <button className="store-button" onClick={() => setStoreOpen(true)}>
            Open Grocery Store
          </button>
          <button className="sales-button" onClick={() => setSalesOpen(true)}>
            Visit Neighbors
          </button>
        </div>
      </header>
      
      {accident && (
         <div className="accident-modal">
            <h2>Oh no! Your stomach is overfilled—clean up time!</h2>
         </div>
      )}
    </div>
  );
}

export default App;
