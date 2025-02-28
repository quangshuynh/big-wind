import React, { useState } from 'react';
import '../static/NeighborhoodSales.css';

const neighbors = [
  { name: "Mr. Poop", request: "unique air freshener" },
  { name: "Ms. Petunia", request: "vintage jar of mystery" },
  { name: "Kai Fan", request: "a jar that smells... interesting" },
];

const NeighborhoodSales = ({ onSale }) => {
  const [showDecline, setShowDecline] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleDecline = () => {
    if (cooldown) return; 
    setCooldown(true);
    setShowDecline(true);

    setTimeout(() => {
      setShowDecline(false);
    }, 3000);

    setTimeout(() => {
      setCooldown(false);
    }, 10000);
  };

  const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

  return (
    <div className="neighborhood-sales">
      <h2>Neighbor Request</h2>
      <p>{randomNeighbor.name} needs a {randomNeighbor.request}.</p>
      <button onClick={onSale}>Sell Jar</button>
      <button onClick={handleDecline} disabled={cooldown}>
        {cooldown ? "Please wait..." : "Decline"}
      </button>
      {showDecline && (
        <div className="decline-announcement">
          <h1>Maybe next time!</h1>
        </div>
      )}
    </div>
  );
};

export default NeighborhoodSales;